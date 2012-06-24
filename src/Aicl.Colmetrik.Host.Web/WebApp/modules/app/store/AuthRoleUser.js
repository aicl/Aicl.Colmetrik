Ext.define('App.store.AuthRoleUser',{
	extend: 'Aicl.data.Store',
	model: 'App.model.AuthRoleUser',
	constructor: function(config){config=config||{};config.storeId=config.storeId||'AuthRoleUser';if(arguments.length==0) this.callParent([config]);else this.callParent(arguments);}
});