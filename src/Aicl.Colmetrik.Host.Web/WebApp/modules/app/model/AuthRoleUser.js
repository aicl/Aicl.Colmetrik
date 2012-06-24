Ext.define('App.model.AuthRoleUser',{
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
			name: 'IdUsuario',
			type: 'int'
		}
	]
});