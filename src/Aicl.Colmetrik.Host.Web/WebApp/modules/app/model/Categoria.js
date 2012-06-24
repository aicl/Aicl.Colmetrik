Ext.define('App.model.Categoria',{
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
			name: 'Descripcion',
			type: 'string'
		}
	]
});