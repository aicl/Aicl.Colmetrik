Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('App', '../app');
    
Ext.application({
name: 'App',
appFolder: '../app',
launch: function(){
    Ext.create('Ext.form.Panel',{
  	width:990,
    id:'panelModule',
    frame: true,
    renderTo: 'module',
    layout: {
        type: 'table',
        columns: 2
    },
    items:[
       	{
			colspan:2,
			//xtype:'panel',
			//height:496,
			//width:940,
			//baseCls:'x-plain',
			//layout: {
    		//type: 'hbox'
    		//},
			//items:[
				//{ 
				xtype:'gestionpedidoform'
				//}
			//]	
		}
    ]
    });
        
},
    
controllers: ['GestionPedido']
    
});


