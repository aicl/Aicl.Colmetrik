Ext.define('App.model.AuthPermission',{
	extend: 'Ext.data.Model',
	idProperty: 'Id',
	fields: 
	[
		{
			name: 'Id',
			type: 'int'
		},
		{
			name: 'Name',
			type: 'string'
		}
	]
});