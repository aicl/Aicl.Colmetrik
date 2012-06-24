using System;
using ServiceStack.ServiceHost;

namespace Aicl.Colmetrik.Model.Types
{
	[RestService("/login/{UserName}/{Password}","post,get")]
	[RestService("/login","post,get")]
	[RestService("/logout","delete")]
	public partial class Authentication
	{
	}
}