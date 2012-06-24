Ext.define('App.store.Empleado',{
	extend: 'Aicl.data.Store',
	model: 'App.model.Empleado',
	constructor: function(config){config=config||{};config.storeId=config.storeId||'Empleado';if(arguments.length==0) this.callParent([config]);else this.callParent(arguments);}
});