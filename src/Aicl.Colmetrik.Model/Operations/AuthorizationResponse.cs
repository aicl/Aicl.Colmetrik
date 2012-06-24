using System;
using System.Collections.Generic;
using ServiceStack.ServiceInterface.ServiceModel;
using Aicl.Colmetrik.Model.Types;

namespace Aicl.Colmetrik.Model.Operations
{
	public class AuthorizationResponse:IHasResponseStatus
	{
		public AuthorizationResponse ()
		{
			ResponseStatus= new ResponseStatus();
			Permissions= new List<string>();
			Roles = new List<AuthRole>();
		}
		
		public ResponseStatus ResponseStatus { get; set; }
		
		public List<string> Permissions {get; set;}
		public List<AuthRole> Roles {get; set;}
		
		
	}
}