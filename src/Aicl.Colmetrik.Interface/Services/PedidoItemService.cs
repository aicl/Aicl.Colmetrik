
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
    //[Permission("PedidoItem.read")]
    //[Permission(ApplyTo.Post, "PedidoItem.create")] 
    //[Permission(ApplyTo.Put , "PedidoItem.update")] 
    //[Permission(ApplyTo.Delete, "PedidoItem.destroy")] *

    public class PedidoItemService:AppRestService<PedidoItem>
    {
 
        public override object OnGet (PedidoItem request)
        {
            var httpRequest = RequestContext.Get<IHttpRequest>();
            return request.Get(Factory,httpRequest.GetSession());
        }

    }
}

