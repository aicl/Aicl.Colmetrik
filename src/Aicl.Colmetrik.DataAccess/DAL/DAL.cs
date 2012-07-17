/*
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
    public static partial class DAL
    {
        public static readonly double MinutosEnCache=7200; //60*24*5;

        public static List<T> Get<T>( this DALProxy proxy, SqlExpressionVisitor<T> visitor)
            where T: new()
        {
            return proxy.Execute(dbCmd=>{
                return dbCmd.Select(visitor);
            });

        }

        public static List<T> Get<T>( this DALProxy proxy, Expression<Func<T,bool>> predicate)
            where T: new()
        {
            return proxy.Execute(dbCmd=>{
                return dbCmd.Select(predicate);
            });

        }

        public static List<T> Get<T>( this DALProxy proxy)
            where T: new()
        {
            return proxy.Execute(dbCmd=>{
                return dbCmd.Select<T>();
            });

        }


        public static long Count<T>( this DALProxy proxy,
                                    Expression<Func<T,bool>> predicate,
                                    bool excludeJoin=false
                                    )
            where T: IHasId<int>, new()
        {
            var expression= ReadExtensions.CreateExpression<T>();
            expression.ExcludeJoin=excludeJoin;
            expression.Select(r=> Sql.Count(r.Id)).Where(predicate);

            return proxy.Execute(dbCmd=>{
                return dbCmd.GetScalar<T,long>(expression) ;
            });
        }

        public static T FirstOrDefault<T>( this DALProxy proxy, Expression<Func<T,bool>> predicate)
            where T: new()
        {
            return proxy.Execute(dbCmd=>{
                return dbCmd.FirstOrDefault(predicate);
            });
        }


		public static void Create<T>(this DALProxy proxy,T request, 
		                                     SqlExpressionVisitor<T> visitor=null) 
			where T: IHasId<System.Int32>, new()
		{
			proxy.Execute(dbCmd=>{
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

		public static void Update<T>(this DALProxy proxy,T request, 
		                                     Expression<Func<T,bool>> predicate=null) 
			where T: IHasId<System.Int32>, new()
		{
			proxy.Execute(dbCmd=>{
				if(predicate==null) dbCmd.Update(request);
				else dbCmd.Update(request,predicate);
			});
		}


*/

 /*
        public static List<T> GetFromCache<T>(DALProxy proxy, int idUsuario)
            where T: IHasIdUsuario, new()
        {
            return proxy.Execute((redisClient,dbCmd)=>{

                var cacheKey = UrnId.Create<T>("IdUsuario", idUsuario.ToString());
            
                List<T> data = redisClient.GetFromCache(cacheKey, () =>{
                    List<T> r =dbCmd.Select<T>(q=> q.IdUsuario==idUsuario);
                    return r;
                },
                TimeSpan.FromMinutes(MinutosEnCache));
                
                return data;

            });
        }


        public static List<T> GetFromCache<T>(DALProxy proxy)
            where T: new()
        {
            return proxy.Execute((redisClient,dbCmd)=>{

                var cacheKey = string.Format("urn:{0}", typeof(T).Name);
            
                List<T> result = redisClient.GetFromCache(cacheKey, () =>{
                    return dbCmd.Select<T>();
                },
                TimeSpan.FromMinutes(MinutosEnCache));
    
                return result;

            });
        }

*/

//    }

//}

