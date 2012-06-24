using System;
using ServiceStack.ServiceHost;

namespace Aicl.Colmetrik.Model.Types
{
	[RestService("/AuthPermission/create","post")]
	[RestService("/AuthPermission/read","get")]
	[RestService("/AuthPermission/read/{Id}","get")]
	[RestService("/AuthPermission/update/{Id}","put")]
	[RestService("/AuthPermission/destroy/{Id}","delete")]
	public partial class AuthPermission
	{
	}
}