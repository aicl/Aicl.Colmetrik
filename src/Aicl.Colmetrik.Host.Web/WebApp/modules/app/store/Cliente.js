Ext.define('App.store.Cliente',{
	extend: 'Aicl.data.Store',
	model: 'App.model.Cliente',
	constructor: function(config){config=config||{};config.storeId=config.storeId||'Cliente';if(arguments.length==0) this.callParent([config]);else this.callParent(arguments);}
});