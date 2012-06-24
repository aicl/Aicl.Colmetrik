Ext.define('App.store.Equipo',{
	extend: 'Aicl.data.Store',
	model: 'App.model.Equipo',
	constructor: function(config){config=config||{};config.storeId=config.storeId||'Equipo';if(arguments.length==0) this.callParent([config]);else this.callParent(arguments);}
});