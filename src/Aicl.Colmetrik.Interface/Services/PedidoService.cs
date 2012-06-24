
using System;
﻿using ServiceStack.CacheAccess;
using ServiceStack.Common;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

using Aicl.Colmetrik.Model.Types;
using Aicl.Colmetrik.Model.Operations;
using Aicl.Colmetrik.DataAccess;
using Aicl.Colmetrik.BusinessLogic;

namespace Aicl.Colmetrik.Interface
{
    [RequiresAuthenticate]
    //[Permission("Pedido.read")]
    //[Permission(ApplyTo.Post, "Pedido.create")] 
    //[Permission(ApplyTo.Put , "Pedido.update")] 
    //[Permission(ApplyTo.Delete, "Pedido.destroy")] *

    public class PedidoService:AppRestService<Pedido>
    {
 
        public override object OnGet (Pedido request)
        {
            var httpRequest = RequestContext.Get<IHttpRequest>();
            int page;
            int? pageNumber=null;
            if (int.TryParse( httpRequest.QueryString["page"], out page))
                pageNumber=page-1;


            int limit;
            int? pageSize=null;

            if (int.TryParse( httpRequest.QueryString["limit"], out limit))
                pageSize=limit;

            string compania= httpRequest.QueryString["NombreCompania"];
            if(!compania.IsNullOrEmpty()) request.NombreCompania=compania;

            return request.Get(Factory,httpRequest.GetSession(),pageNumber,pageSize);
        }

    }
}
