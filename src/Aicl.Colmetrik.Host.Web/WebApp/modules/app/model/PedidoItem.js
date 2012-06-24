Ext.define('App.model.PedidoItem',{
	extend: 'Ext.data.Model',
	idProperty: 'Id',
	fields: 
	[
		{
			name: 'Id',
			type: 'int'
		},
		{
			name: 'IdPedido',
			type: 'int'
		},
		{
			name: 'IdProducto',
			type: 'int'
		},
		{
			name: 'PrecioUnidad',
			type: 'number'
		},
		{
			name: 'Cantidad',
			type: 'int'
		},
		{
			name: 'Descuento',
			type: 'number'
		},
		{
			name: 'Nombre',
			type: 'string'
		},
		{
			name: 'Procedimiento',
			type: 'string'
		}
	]
});