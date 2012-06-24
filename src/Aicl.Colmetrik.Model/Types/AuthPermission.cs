using System;
using System.ComponentModel.DataAnnotations;
using ServiceStack.Common;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;

namespace Aicl.Colmetrik.Model.Types
{
	public partial class AuthPermission:IHasId<System.Int32>{

		public AuthPermission(){}

		[AutoIncrement]
		public System.Int32 Id { get; set;} 

		[Required]
		[StringLength(30)]
		public System.String Name { get; set;} 

	}
}
