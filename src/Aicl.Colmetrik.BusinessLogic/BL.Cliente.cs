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
using ServiceStack.ServiceInterface.ServiceModel;
using Aicl.Colmetrik.Model.Types;
using Aicl.Colmetrik.Model.Operations;
using Aicl.Colmetrik.DataAccess;
using Mono.Linq.Expressions;

namespace Aicl.Colmetrik.BusinessLogic
{
	public static partial class BL
	{
		#region get
        public static Response<Cliente> Get(this Cliente request,
		                                   Factory factory,
		                                   IHttpRequest httpRequest)
        {
            var paginador= new Paginador(httpRequest);
            var queryString= httpRequest.QueryString;
			long? totalCount=null;
            
			ResponseStatus rs=null;
            var data = factory.Execute(proxy=>{

				int id;
				try{
	                if(int.TryParse(queryString["Id"], out id)){
						if(id!=default(int)) return proxy.Get<Cliente>(r=>r.Id==id);
					}

					var predicate = PredicateBuilder.True<Cliente>();

					string compania= queryString["NombreCompania"];
	            	if(!compania.IsNullOrEmpty()) 
					{
						predicate= predicate.AndAlso(r=>r.NombreCompania.Contains(compania));
	                }

					var visitor = ReadExtensions.CreateExpression<Cliente>();
					visitor.Where(predicate);
					if(paginador.PageNumber.HasValue)
	                {
						visitor.Select(r=> Sql.Count(r.Id));
	                    totalCount= proxy.Count(visitor);
	                    int rows= paginador.PageSize.HasValue? paginador.PageSize.Value:BL.PageSize;
						visitor.Select();
	                    visitor.Limit(paginador.PageNumber.Value*rows, rows);
	                }
	               
					visitor.OrderBy(r=>r.NombreCompania); 
	                return proxy.Get(visitor);
				}
				catch(Exception e)
				{
					rs= new ResponseStatus(){ErrorCode="GetClienteError",Message=e.Message, StackTrace=e.StackTrace};
					return new List<Cliente>();
				}
            });
            
            return new Response<Cliente>(){
                Data=data,
                TotalCount=totalCount,
				ResponseStatus= rs==null? new ResponseStatus():rs
            };
        }
		#endregion get
	}
}

