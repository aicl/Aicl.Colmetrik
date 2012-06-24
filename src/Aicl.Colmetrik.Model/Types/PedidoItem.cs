using System;
using System.ComponentModel.DataAnnotations;
using ServiceStack.Common;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;

namespace Aicl.Colmetrik.Model.Types
{
	/// <summary>
	/// Description of PedidoItem.
	/// </summary>
	
    [JoinTo(typeof(Producto), "IdProducto", "Id")]
    public partial class PedidoItem:IHasId<System.Int32>
	{
		public PedidoItem()
		{
		}
		
		[AutoIncrement]
		public int Id {get; set;}  
		
		public int IdPedido {get; set;}  

		public int IdProducto {get; set;}
		
		[DecimalLength(18,2)]
		public decimal PrecioUnidad {get; set;}  
        
		public int Cantidad {get; set;}  
		
		[DecimalLength(10,6)]
		public decimal Descuento {get; set;}  
	
        #region Join Producto
        [BelongsTo(typeof(Producto))]
        public string Nombre {get; set;} 

        //[BelongsTo(typeof(Producto), "PrecioUnidad")]
        //public decimal? PrecioProducto {get; set;} 
           
        [BelongsTo(typeof(Producto))]
        public string Procedimiento {get; set;}
        #endregion Join Producto

	}
}