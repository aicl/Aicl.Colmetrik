using System;
using System.ComponentModel.DataAnnotations;
using ServiceStack.Common;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;

namespace Aicl.Colmetrik.Model.Types
{

	public partial class AuthRolePermission:IHasId<System.Int32>{

		public AuthRolePermission(){}

		[AutoIncrement]
		public System.Int32 Id { get; set;} 

		public System.Int32 IdAuthRole { get; set;} 

		public System.Int32 IdAuthPermission { get; set;} 

	}
}
