Ext.define('App.store.Pedido',{
	extend: 'Aicl.data.Store',
	model: 'App.model.Pedido',
	constructor: function(config){
	config=config||{};
	config.storeId=config.storeId||'Pedido';
	config.pageSize= 18;
    config.remoteSort=true;
    config.proxy= Aicl.Util.createRestProxy({
    	//type: 'jsonp',
    	url: config.url||(Aicl.Util.getUrlApi()+'/Pedido'),
    	totalProperty: 'TotalCount',
    	storeId:config.storeId,
        pageParam:'page',
        limitParam:'limit',
        startParam:'start'
    });
	    
	if(arguments.length==0) this.callParent([config]);
	else this.callParent(arguments);}
});