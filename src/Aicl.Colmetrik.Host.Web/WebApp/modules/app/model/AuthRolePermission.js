Ext.define('App.model.AuthRolePermission',{
	extend: 'Ext.data.Model',
	idProperty: 'Id',
	fields: 
	[
		{
			name: 'Id',
			type: 'int'
		},
		{
			name: 'IdAuthRole',
			type: 'int'
		},
		{
			name: 'IdAuthPermission',
			type: 'int'
		}
	]
});