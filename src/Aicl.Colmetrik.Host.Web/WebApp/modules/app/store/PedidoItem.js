Ext.define('App.store.PedidoItem',{
	extend: 'Aicl.data.Store',
	model: 'App.model.PedidoItem',
	constructor: function(config){config=config||{};config.storeId=config.storeId||'PedidoItem';if(arguments.length==0) this.callParent([config]);else this.callParent(arguments);}
});