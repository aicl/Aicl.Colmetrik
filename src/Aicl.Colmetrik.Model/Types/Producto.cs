using System;
using System.ComponentModel.DataAnnotations;
using ServiceStack.Common;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;

namespace Aicl.Colmetrik.Model.Types
{
	/// <summary>
	/// Description of Producto.
	/// </summary>
	public partial class Producto:IHasId<System.Int32>
	{
		public Producto()
		{
		}
		
		[AutoIncrement]
		public int Id {get; set;}  
        
		[StringLength(500)]
		[Required]
        public string Nombre {get; set;} 
        
        public int? IdProveedor {get; set;}  
        public int? IdCategoria {get; set;}  
        
        [DecimalLength(18,2)]
        public decimal? PrecioUnidad {get; set;} 
        
        public bool Suspendido {get; set;} 
        
        [StringLength(4096)]
        public string Procedimiento {get; set;} 
		
	}
}