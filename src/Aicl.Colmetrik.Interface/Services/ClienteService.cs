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
    //[Permission("Cliente.read")]
    //[Permission(ApplyTo.Post, "Cliente.create")] 
    //[Permission(ApplyTo.Put , "Cliente.update")] 
    //[Permission(ApplyTo.Delete, "Cliente.destroy")] *

    public class ClienteService:AppRestService<Cliente>
    {
 
        public override object OnGet (Cliente request)
        {
            return request.Get(Factory,RequestContext.Get<IHttpRequest>());
        }


		//public override object OnPost (Cliente request)
		//{
		//	return request.Get(Factory,RequestContext.Get<IHttpRequest>());
		//}
    }
}
