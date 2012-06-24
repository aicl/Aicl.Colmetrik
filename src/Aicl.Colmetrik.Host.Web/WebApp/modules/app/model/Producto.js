Ext.define('App.model.Producto',{
	extend: 'Ext.data.Model',
	idProperty: 'Id',
	fields: 
	[
		{
			name: 'Id',
			type: 'int'
		},
		{
			name: 'Nombre',
			type: 'string'
		},
		{
			name: 'IdProveedor',
			type: 'int'
		},
		{
			name: 'IdCategoria',
			type: 'int'
		},
		{
			name: 'PrecioUnidad',
			type: 'number'
		},
		{
			name: 'Suspendido',
			type: 'boolean'
		},
		{
			name: 'Procedimiento',
			type: 'string'
		}
	]
});