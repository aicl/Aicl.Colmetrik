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
	public class RoleAttribute:RequiredRoleAttribute
	{
		public RoleAttribute(ApplyTo applyTo, params string[] roles)
			:base(applyTo, roles) {}

		public RoleAttribute(params string[] roles)
			: base(ApplyTo.All, roles) {}
		
		
		public override void Execute(IHttpRequest req, IHttpResponse res, object requestDto)
		{
			AuthenticateAttribute.AuthenticateIfBasicAuth(req, res);

			var session = req.GetSession();

			if(session!=null)
			{
				if (HasAllRoles(session)) return;
			}

			res.StatusCode = (int)HttpStatusCode.Unauthorized;
			res.StatusDescription = "Invalid Role";
			res.Close();
		}
	}
}