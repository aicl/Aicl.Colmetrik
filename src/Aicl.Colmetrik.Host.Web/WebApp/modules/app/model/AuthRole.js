Ext.define('App.model.AuthRole',{
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
		},
		{
			name: 'Directory',
			type: 'string'
		},
		{
			name: 'ShowOrder',
			type: 'string'
		},
		{
			name: 'Title',
			type: 'string'
		}
	]
});