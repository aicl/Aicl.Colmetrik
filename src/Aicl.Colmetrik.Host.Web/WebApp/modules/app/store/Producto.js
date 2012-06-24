Ext.define('App.store.Producto',{
	extend: 'Aicl.data.Store',
	model: 'App.model.Producto',
	constructor: function(config){config=config||{};config.storeId=config.storeId||'Producto';if(arguments.length==0) this.callParent([config]);else this.callParent(arguments);}
});