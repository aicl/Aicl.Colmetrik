using System;
using System.ComponentModel.DataAnnotations;
using ServiceStack.Common;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;

namespace Aicl.Colmetrik.Model.Types
{
	/// <summary>
	/// Description of Pedido.
	/// </summary>
    /// 
    [JoinTo(typeof(Cliente),"IdCliente","Id")]
    [JoinTo(typeof(Empleado),"IdEmpleado","Id",Order=1)]
    [JoinTo(typeof(EstadoEnvio),"IdEstadoEnvio","Id",Order=2)]
	public partial class Pedido:IHasId<System.Int32>
	{
		public Pedido()
		{
		}
		
		[AutoIncrement]
		public int Id {get; set;} 

		public int IdEmpleado {get; set;} 
		
		public DateTime? FechaPedido {get; set;} 
        public DateTime? FechaEntrega {get; set;} 
        public DateTime? FechaEnvio {get; set;} 
	
        public int IdEstadoEnvio {get; set;} 
        
        [DecimalLength(5,2)]
        public decimal Cargo {get; set;} 
        
		[StringLength(80)]
        public string Destinatario {get; set;} 
        
        [StringLength(120)]
        public string DireccionDestinatario {get; set;} 
        
        [StringLength(100)]
        public string CiudadDestinatario {get; set;} 
        
        [StringLength(100)]
        public string TelefonoDestinatario {get; set;} 
        
        [StringLength(100)]
        public string FaxDestinatario {get; set;} 
        
        [StringLength(30)]
        public string PaisDestinatario {get; set;} 
        
        [StringLength(510)]
        public string DiasDeServicio {get; set;}
    	
        public int IdCliente {get; set;} 


        #region Join Cliente
        [BelongsTo(typeof(Cliente))]
        public string Nit{get; set;} 

        [BelongsTo(typeof(Cliente))]
        public string NombreCompania{get; set;}

        [BelongsTo(typeof(Cliente))]
        public string EMail{get; set;}

        [BelongsTo(typeof(Cliente))]
        public string Ciudad{get; set;}

        [BelongsTo(typeof(Cliente))]
        public string Pais{get; set;}

        #endregion Join Cliente


        #region Join Empleado
        [BelongsTo(typeof(Empleado))]
        public string Nombre {get;set;}

        [BelongsTo(typeof(Empleado))]
        public string Apellidos {get;set;}
        #endregion Join Empleado


        #region Join EstadoEnvio
        [BelongsTo(typeof(EstadoEnvio),"Descripcion")]
        public string EstadoEnvio { get ; set;}
        #endregion Join EstadoEnvio

	}
}
