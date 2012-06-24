Ext.define('App.store.AuthRolePermission',{
	extend: 'Aicl.data.Store',
	model: 'App.model.AuthRolePermission',
	constructor: function(config){config=config||{};config.storeId=config.storeId||'AuthRolePermission';if(arguments.length==0) this.callParent([config]);else this.callParent(arguments);}
});