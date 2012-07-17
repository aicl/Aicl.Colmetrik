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
            
            var data = factory.Execute(proxy=>{

				int id;
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
				if(paginador.PageNumber.HasValue)
                {
                    totalCount= proxy.Count(predicate);
                    int rows= paginador.PageSize.HasValue? paginador.PageSize.Value:BL.PageSize;
                    visitor.Limit(paginador.PageNumber.Value*rows, rows);
                }
               
				visitor.Where(predicate).OrderBy(r=>r.NombreCompania); 
                return proxy.Get(visitor);
            });
            
            return new Response<Cliente>(){
                Data=data,
                TotalCount=totalCount
            };
        }
		#endregion get
	}
}

