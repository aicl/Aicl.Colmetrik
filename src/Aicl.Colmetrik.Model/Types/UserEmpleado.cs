using System;
using System.ComponentModel.DataAnnotations;
using ServiceStack.Common;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;

namespace Aicl.Colmetrik.Model.Types
{
	[JoinTo(typeof(Empleado),"IdEmpleado","Id")]
	public class UserEmpleado:IHasId<Int32>
	{
		public UserEmpleado (){}

		[Index(true)]
		public int Id {get; set;} 

		[Index(true)]
		public int IdEmpleado {get; set;} 

		[BelongsTo(typeof(Empleado))]
		public string Apellidos {get; set;} 
        
        [BelongsTo(typeof(Empleado))]
        public string Nombre {get; set;} 

	}
}

