Ext.define('App.model.Authentication',{
	extend: 'Ext.data.Model',
	idProperty: '',
	fields: 
	[
		{
			name: 'UserName',
			type: 'string'
		},
		{
			name: 'Password',
			type: 'string'
		}
	]
});