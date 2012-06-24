Ext.define('App.store.AuthPermission',{
	extend: 'Aicl.data.Store',
	model: 'App.model.AuthPermission',
	constructor: function(config){config=config||{};config.storeId=config.storeId||'AuthPermission';if(arguments.length==0) this.callParent([config]);else this.callParent(arguments);}
});