Ext.define('App.store.Categoria',{
	extend: 'Aicl.data.Store',
	model: 'App.model.Categoria',
	constructor: function(config){config=config||{};config.storeId=config.storeId||'Categoria';if(arguments.length==0) this.callParent([config]);else this.callParent(arguments);}
});