using System;
using ServiceStack.ServiceHost;

namespace Aicl.Colmetrik.Model.Types
{
	[RestService("/AuthRolePermission/create","post")]
	[RestService("/AuthRolePermission/read","get")]
	[RestService("/AuthRolePermission/read/{Id}","get")]
	[RestService("/AuthRolePermission/update/{Id}","put")]
	[RestService("/AuthRolePermission/destroy/{Id}","delete")]
	public partial class AuthRolePermission
	{
	}
}