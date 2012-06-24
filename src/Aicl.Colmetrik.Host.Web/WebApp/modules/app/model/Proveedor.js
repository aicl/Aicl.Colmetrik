Ext.define('App.model.Proveedor',{
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
			name: 'NombreContacto',
			type: 'string'
		},
		{
			name: 'CargoContacto',
			type: 'string'
		},
		{
			name: 'Direccion',
			type: 'string'
		},
		{
			name: 'Ciudad',
			type: 'string'
		},
		{
			name: 'Region',
			type: 'string'
		},
		{
			name: 'CodPostal',
			type: 'string'
		},
		{
			name: 'Pais',
			type: 'string'
		},
		{
			name: 'Telefono',
			type: 'string'
		},
		{
			name: 'Fax',
			type: 'string'
		},
		{
			name: 'PaginaPrincipal',
			type: 'string'
		}
	]
});