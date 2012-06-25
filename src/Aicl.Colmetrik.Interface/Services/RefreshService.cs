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

    public class RefreshService:AppRestService<Refresh>
    {
 
        public override object OnGet (Refresh request)
        {
            return new Response<Refresh>();
        }


        public override object OnPost (Refresh request)
        {
            return new Response<Refresh>();
        }
    }


    [RestService("/Refresh","post,get")]
    public class Refresh{
        public Refresh(){}
    }
}
