using System;
using System.Collections.Generic;
using System.Linq;
﻿using ServiceStack.CacheAccess;
using ServiceStack.Common;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Auth;

using Aicl.Colmetrik.Model.Types;
using Aicl.Colmetrik.Model.Operations;
using Aicl.Colmetrik.DataAccess;
using Aicl.Colmetrik.BusinessLogic;
namespace Aicl.Colmetrik.Interface
{
	[RequiresAuthenticate]
	public class AuthorizationService:RestServiceBase<Authorization>
	{
		public Factory Factory{ get; set;}
		
		public override object OnPost (Authorization request)
		{
			
			return  request.Get(Factory, RequestContext);
			 
		}
		
	}
}