Ext.define('App.store.AuthRole',{
	extend: 'Aicl.data.Store',
	model: 'App.model.AuthRole',
	constructor: function(config){config=config||{};config.storeId=config.storeId||'AuthRole';if(arguments.length==0) this.callParent([config]);else this.callParent(arguments);}
});