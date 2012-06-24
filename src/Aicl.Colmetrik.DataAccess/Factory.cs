using System;
using System.Data;
using System.Reflection;
using System.Collections.Generic;
using ServiceStack.OrmLite;
using ServiceStack.Common;
using ServiceStack.Common.Utils;
using ServiceStack.ServiceHost;
using ServiceStack.Redis;
using Aicl.Colmetrik.Model.Types;

namespace Aicl.Colmetrik.DataAccess
{
    public class Factory
    {
        public IDbConnectionFactory DbFactory {private get;set;}
        
        public IRedisClientsManager RedisClientsManager {private get;set;}
        
        public Factory(){}
        
        public  List<T> Get<T> (T request) where T:new()
        {
            Type type = typeof(T);
            string id =string.Empty;
            PropertyInfo pi= ReflectionUtils.GetPropertyInfo(type, OrmLiteConfig.IdField);
            if( pi!=null ){
                id= pi.GetValue(request, new object[]{}).ToString();
            }
                                            
            return (string.IsNullOrEmpty(id) || id=="0")?
                DbFactory.Exec( dbCmd => dbCmd.Select<T>()):
                    DbFactory.Exec( dbCmd =>
                    {
                        List<T> l = new List<T>();
                        T r= dbCmd.GetByIdOrDefault<T>(id);
                        if(r != null) l.Add(r); 
                        return l;
                    });
        }
        
        
        public  List<T> Post<T> (T request) where T:new(){

            DbFactory.Exec( (dbCmd) =>
            { 
                dbCmd.Insert<T>(request);
                Type type = typeof(T);

                PropertyInfo pi= ReflectionUtils.GetPropertyInfo(type, OrmLiteConfig.IdField);
            
                if( pi!=null && pi.GetValue(request, new object[]{}).ToString() =="0"){
                    var li = dbCmd.GetLastInsertId();
                    if(pi.PropertyType == typeof(short))
                        ReflectionUtils.SetProperty(request, pi, Convert.ToInt16(li));  
                    else if(pi.PropertyType == typeof(int))
                        ReflectionUtils.SetProperty(request, pi, Convert.ToInt32(li));  
                    else
                    ReflectionUtils.SetProperty(request, pi, Convert.ToInt64(li));
                }
            });
            
            List<T> l = new List<T>();
                                    
            l.Add(request);
            
            return l;
        }
        
        
        public  List<T> Put<T> (T request) where T:new(){

            DbFactory.Exec(
                    dbCmd => 
                    dbCmd.Update<T>(request)
            );
            List<T> l = new List<T>();
            l.Add(request);
            return l;
        }
        
        public  List<T> Delete<T> (T request) where T:new(){

            DbFactory.Exec(
                    dbCmd => 
                    dbCmd.Delete<T>(request)
            );
            return new List<T>();

        }


        public void Execute( Action<DALProxy> commands)
        {
            using(DALProxy proxy = new DALProxy()
            {
                RedisClientsManager=RedisClientsManager,
                DbConnectionFactory=DbFactory
            })
            {
                commands(proxy);
            }
        }

        public T Execute<T>( Func<DALProxy,T> commands)
        {
            using(DALProxy proxy = new DALProxy()
            {
                RedisClientsManager=RedisClientsManager,
                DbConnectionFactory=DbFactory
            })
            {
                return commands(proxy);
            }

        }


        /*
        internal void Exec( Action<IRedisClient> redisCommands)
        {
            using (IRedisClient redisClient = RedisClientsManager.GetClient() )
            {
                redisCommands(redisClient);
            }
        }

        
        internal void Exec( Action<IRedisClient, IDbCommand> commands)
        {
            using (IRedisClient redisClient = RedisClientsManager.GetClient() )
            {
                DbFactory.Exec(dbCmd=> commands(redisClient, dbCmd) );
            }
        }
        
        internal T Exec<T>( Func<IRedisClient, IDbCommand,T> commands)
        {
            using (IRedisClient redisClient = RedisClientsManager.GetClient() )
            {
                return DbFactory.Exec<T>(dbCmd=> commands(redisClient, dbCmd) );
            }
        }
        */
        



    }

}
