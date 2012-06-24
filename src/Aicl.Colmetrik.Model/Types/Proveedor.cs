using System;
using System.ComponentModel.DataAnnotations;
using ServiceStack.Common;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;

namespace Aicl.Colmetrik.Model.Types
{
	/// <summary>
	/// Description of Proveedor.
	/// </summary>
	public partial class Proveedor:IHasId<System.Int32>
	{
		public Proveedor()
		{
		}
		
		[AutoIncrement]
		public int Id {get; set;}  
        
		[StringLength(80)]
		[Required]
        public string Nombre {get; set;} 
        
        [StringLength(60)]
        public string NombreContacto {get; set;} 
        
        [StringLength(60)]
        public string CargoContacto {get; set;} 
        
        [StringLength(120)]
        public string Direccion {get; set;} 
		
        [StringLength(30)]
        public string Ciudad {get; set;} 
        
        [StringLength(1024)]
        public string Region {get; set;} 
        
        [StringLength(80)]
        public string CodPostal {get; set;} 
        
        [StringLength(30)]
        public string Pais {get; set;} 
        
        [StringLength(48)]
        public string Telefono {get; set;} 
        
        [StringLength(48)]
        public string Fax {get; set;} 
        
        [StringLength(1024)]
        public string PaginaPrincipal {get; set;} 
	}
}
 