Ext.define('App.store.IHasIdUsuario',{
	extend: 'Aicl.data.Store',
	model: 'App.model.IHasIdUsuario',
	constructor: function(config){config=config||{};config.storeId=config.storeId||'IHasIdUsuario';if(arguments.length==0) this.callParent([config]);else this.callParent(arguments);}
});