Ext.define('App.store.Authentication',{
	extend: 'Aicl.data.Store',
	model: 'App.model.Authentication',
	constructor: function(config){config=config||{};config.storeId=config.storeId||'Authentication';if(arguments.length==0) this.callParent([config]);else this.callParent(arguments);}
});