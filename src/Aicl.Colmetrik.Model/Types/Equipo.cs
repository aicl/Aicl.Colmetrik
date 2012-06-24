using System;
using System.ComponentModel.DataAnnotations;
using ServiceStack.Common;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;

namespace Aicl.Colmetrik.Model.Types
{
	/// <summary>
	/// Description of Equipo.
	/// </summary>
	public partial class Equipo:IHasId<System.Int32>
	{
		public Equipo()
		{
		}
		
		[AutoIncrement]
		public int Id {get; set;}  
        
		[StringLength(100)]
		[Required]
        public string Nombre {get; set;} 
        
        [StringLength(100)]
        public string Fabricante {get; set;} 
        
        [StringLength(100)]
        public string Modelo {get; set;} 
        
        [StringLength(500)]
        public string Rangos {get; set;} 
		
        [StringLength(500)]
        public string Resolucion {get; set;} 
        
        [StringLength(510)]
        public string Especificacion {get; set;} 
        
        [StringLength(100)]
        public string DispositivoIndicadorAjuste {get; set;} 
        
        [StringLength(510)]
        public string Otros {get; set;} 
        
        [StringLength(510)]
        public string Manual {get; set;} 
	}
}
