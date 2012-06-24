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
     	{xtype:'equipolist'},
       	{
			xtype:'panel',
			height:352,
			width:440,
			baseCls:'x-plain',
			layout: {
    		type: 'vbox'       
    		},
			items:[
				{ xtype:'equipoform'}
			]	
		}
    ]
    });
    var controller =this.getController('Equipo');
    controller.getEquipoStore().load();
    controller.refreshButtons();
},
    
controllers: ['Equipo']
    
});