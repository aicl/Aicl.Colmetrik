using System;
using System.ComponentModel.DataAnnotations;
using ServiceStack.Common;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;

namespace Aicl.Colmetrik.Model.Types
{

	public partial class AuthRoleUser:IHasId<System.Int32>, IHasIdUsuario{

		public AuthRoleUser(){}

		[AutoIncrement]
		public System.Int32 Id { get; set;} 

		public System.Int32 IdAuthRole { get; set;} 

		public System.Int32 IdUsuario { get; set;} 

	}
}
