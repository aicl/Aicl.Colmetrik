using System;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;
using ServiceStack.OrmLite;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.Common.Utils;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Auth;
using ServiceStack.CacheAccess;
using ServiceStack.ServiceHost;
using ServiceStack.DesignPatterns.Model;
using Aicl.Colmetrik.Model.Types;
using Aicl.Colmetrik.Model.Operations;
using Aicl.Colmetrik.DataAccess;

namespace Aicl.Colmetrik.BusinessLogic
{
    public static partial class BL
    {
        public static Response<Pedido> Get(this Pedido request,Factory factory,
                                           IAuthSession authSession,
                                           int? pageNumber=null, int? pageSize=null 
                                           )
        {
            long? totalCount=null;

            var predicate = PredicateBuilder.Null<Pedido>();

            var data = factory.Execute(proxy=>{
                var visitor = ReadExtensions.CreateExpression<Pedido>();
                if(!request.NombreCompania.IsNullOrEmpty())
                {
                    predicate= PredicateBuilder.Start<Pedido>(
                        r=>r.NombreCompania.Contains(request.NombreCompania));
                }

                if(pageNumber.HasValue)
                {
                    totalCount= proxy.Count<Pedido>(predicate, predicate.IsNull());
                    int rows= pageSize.HasValue? pageSize.Value:PageSize;
                    visitor.Limit(pageNumber.Value*rows, rows);
                }

                visitor.Where(predicate).OrderByDescending(r=>r.Id);

                return proxy.Get(visitor);
            });

                        
            return new Response<Pedido>(){
                Data=data,
                TotalCount=totalCount

            };
        }
    }


 

}

//http://stackoverflow.com/questions/5094489/how-do-i-dynamically-create-an-expressionfuncmyclass-bool-predicate-from-e
//http://0.0.0.0:8080/api/Pedido/read?NombreCompania=texa&format=json&page=1&limit=5
//http://0.0.0.0:8080/api/Pedido/read?format=json&page=1&limit=5