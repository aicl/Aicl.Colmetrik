Ext.define('App.store.EstadoEnvio',{
	extend: 'Aicl.data.Store',
	model: 'App.model.EstadoEnvio',
	constructor: function(config){config=config||{};config.storeId=config.storeId||'EstadoEnvio';if(arguments.length==0) this.callParent([config]);else this.callParent(arguments);}
});