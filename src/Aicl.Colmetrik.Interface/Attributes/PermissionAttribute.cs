using System;
using System.Collections.Generic;
using System.Net;
using System.Linq;
﻿using ServiceStack.CacheAccess;
using ServiceStack.Common;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Auth;

namespace Aicl.Colmetrik.Interface
{
	public class PermissionAttribute:RequiredPermissionAttribute
	{
		public PermissionAttribute(params string[] permissions):base(ApplyTo.All, permissions)
		{
		}
		public PermissionAttribute(ApplyTo applyTo, params string[] permissions):base(applyTo, permissions)
		{
		}
		
		public override void Execute (IHttpRequest req, IHttpResponse res, object requestDto)
		{
			AuthenticateAttribute.AuthenticateIfBasicAuth(req, res);

			var session = req.GetSession();
			
			if(session!=null)
			{
				if ( HasAllPermissions(session)) return;
			}

			res.StatusCode = (int)HttpStatusCode.Unauthorized;
			res.StatusDescription = "Invalid Permissions";
			res.Close();
		}
				
	}
}