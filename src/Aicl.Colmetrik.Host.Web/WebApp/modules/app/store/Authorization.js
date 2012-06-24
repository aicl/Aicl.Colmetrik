Ext.define('App.store.Authorization',{
	extend: 'Aicl.data.Store',
	model: 'App.model.Authorization',
	constructor: function(config){config=config||{};config.storeId=config.storeId||'Authorization';if(arguments.length==0) this.callParent([config]);else this.callParent(arguments);}
});