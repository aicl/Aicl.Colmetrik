Ext.define('App.store.Proveedor',{
	extend: 'Aicl.data.Store',
	model: 'App.model.Proveedor',
	constructor: function(config){config=config||{};config.storeId=config.storeId||'Proveedor';if(arguments.length==0) this.callParent([config]);else this.callParent(arguments);}
});