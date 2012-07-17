using System;
using System.Reflection;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;
using ServiceStack.OrmLite;
using ServiceStack.Redis;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.Common.Utils;
using ServiceStack.ServiceInterface;
using ServiceStack.CacheAccess;
using ServiceStack.ServiceHost;
using ServiceStack.DesignPatterns.Model;
using Aicl.Colmetrik.Model.Types;

namespace Aicl.Colmetrik.DataAccess
{
    public class DALProxy:IDisposable
    {
		public static readonly double MinutosEnCache=7200; //60*24*5;

        private IDbTransaction dbTransaction=null;
        private IDbCommand dbCmd=null;
        private IDbConnection dbConn;

        private IRedisClient redisClient;

        internal IDbConnectionFactory DbConnectionFactory {private get;set;}
        
        internal IRedisClientsManager RedisClientsManager {private get;set;}

        public DALProxy(){}

        public void BeginDbTransaction()
        {
            if(dbTransaction==null)
                dbTransaction=CreateCommand().BeginTransaction();
        }

        public void CommitDbTransaction()
        {
            if(dbTransaction!=null)
            {
                dbTransaction.Commit();
                dbTransaction.Dispose();
                dbTransaction=null;
            }
        }

        public void RollbackDbTransaction()
        {
            if(dbTransaction!=null)
            {
                dbTransaction.Rollback();
                dbTransaction.Dispose();
                dbTransaction=null;
            }
        }


        public IDisposable AcquireLock(string lockKey, double timeOut)
        {
            return CreateRedisClient().AcquireLock(lockKey, TimeSpan.FromSeconds(timeOut));
        }

        private void Execute(Action<IRedisClient,IDbCommand> commandsFn)
        {
            commandsFn(CreateRedisClient(), CreateCommand());
        }


        private T Execute<T>(Func<IRedisClient,IDbCommand,T> commandsFn)
        {
            return commandsFn(CreateRedisClient(), CreateCommand());
        }


        private T Execute<T>(Func<IDbCommand,T> commandsFn)
        {
            return commandsFn(CreateCommand());
        }


        private void  Execute(Action<IDbCommand> commandsFn)
        {
            commandsFn(CreateCommand());
        }


        #region IDisposable implementation
        public void Dispose ()
        {
            if(redisClient!=null)
            {
                redisClient.Dispose();
            }

            RollbackDbTransaction();

            if(dbCmd!=null) 
            {
                dbCmd.Dispose();
                dbConn.Close();
                dbConn.Dispose();
            }
        }
		#endregion IDisposable implementation

        private IDbCommand CreateCommand(){
            if(dbCmd==null)
            {
                dbConn = DbConnectionFactory.OpenDbConnection();
                dbCmd  = dbConn.CreateCommand();
            }
            return dbCmd;
        }

        private IRedisClient CreateRedisClient(){
            if(redisClient==null) redisClient= RedisClientsManager.GetClient();
            return redisClient;
        }


        public void ExecuteBeforePost<T>(T newData)
        {
            //llamar triggers....
            //Buscar Aicl.Colmetrik.BeforePost.dll en el folder Triggers  (namespace= Aicl.Colmetrik.BeforePost )
            // dentro de ese dll clases que Implementan IBeforePost<T>  
            //con nombre typeof(T)NN  ( TriggerEgreso, TriggerEgreso00, TriggerEgreso01, etc....)
            //y correr el metodo Run<T>(proxy, newData)
            //command(this);
        }

        public void ExecuteBeforePut<T>(T newData, T oldData)
        {

        }

        public void ExecuteBeforePatch<T>(T newData, T oldData, string operation)
        {

        }


        public void ExecuteAfterPost<T>(T newData)
        {

        }

        public void ExecuteAfterPut<T>(T newData, T oldData)
        {

        }

        public void ExecuteAfterPatch<T>(T newData, T oldData, string operation)
        {

        }


		#region db
        public List<T> Get<T>( SqlExpressionVisitor<T> visitor)
            where T: new()
        {
            return Execute(dbCmd=>{
                return dbCmd.Select(visitor);
            });
        }

        public List<T> Get<T>(Expression<Func<T,bool>> predicate)
            where T: new()
        {
            return Execute(dbCmd=>{
                return dbCmd.Select(predicate);
            });
        }

        public List<T> Get<T>()
            where T: new()
        {
            return Execute(dbCmd=>{
                return dbCmd.Select<T>();
            });
        }


        public long Count<T>(SqlExpressionVisitor<T> expression)
            where T: IHasId<int>, new()
        {
            
            //expression.Select(r=> Sql.Count(r.Id));

            return Execute(dbCmd=>{
                return dbCmd.GetScalar<T,long>(expression) ;
            });
        }

        public T FirstOrDefault<T>(Expression<Func<T,bool>> predicate)
            where T: new()
        {
            return Execute(dbCmd=>{
                return dbCmd.FirstOrDefault(predicate);
            });
        }


		public void Create<T>(T request,SqlExpressionVisitor<T> visitor=null) 
			where T: IHasId<System.Int32>, new()
		{
			Execute(dbCmd=>{
				if(visitor==null) 
					dbCmd.Insert<T>(request);
				else 
					dbCmd.InsertOnly<T>(request,visitor);
				if(request.Id==default(int))
            	{
                	Type type = typeof(T);
                	PropertyInfo pi= ReflectionUtils.GetPropertyInfo(type, OrmLiteConfig.IdField);
                	var li = dbCmd.GetLastInsertId();
                	ReflectionUtils.SetProperty(request, pi, Convert.ToInt32(li));  
            	}
			});
		}

		public void Update<T>(T request,Expression<Func<T,bool>> predicate=null) 
			where T: IHasId<System.Int32>, new()
		{
			Execute(dbCmd=>{
				if(predicate==null) dbCmd.Update(request);
				else dbCmd.Update(request,predicate);
			});
		}
		#endregion db

    }
}