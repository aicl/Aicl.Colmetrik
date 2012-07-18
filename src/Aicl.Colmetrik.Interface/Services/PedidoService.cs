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
            return request.Get(Factory,RequestContext.Get<IHttpRequest>());
        }


		public override object OnPost (Pedido request)
		{
			return request.Post(Factory,RequestContext.Get<IHttpRequest>());
		}
    }
}
