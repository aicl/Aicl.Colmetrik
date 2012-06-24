Ext.define('App.model.EstadoEnvio',{
	extend: 'Ext.data.Model',
	idProperty: 'Id',
	fields: 
	[
		{
			name: 'Id',
			type: 'int'
		},
		{
			name: 'Descripcion',
			type: 'string'
		}
	]
});