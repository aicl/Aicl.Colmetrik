using System;
using System.ComponentModel.DataAnnotations;
using ServiceStack.Common;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;

namespace Aicl.Colmetrik.Model.Types
{
	/// <summary>
	/// Description of Categoria.
	/// </summary>
	public partial class Categoria:IHasId<System.Int32>
	{
		public Categoria()
		{
		}
		
		[AutoIncrement]
		public int Id {get; set;}  
        
		[StringLength(80)]
		[Required]
        public string Nombre {get; set;} 
        
        [StringLength(1024)]
        public string Descripcion {get; set;} 
        
     
        
	}
}
