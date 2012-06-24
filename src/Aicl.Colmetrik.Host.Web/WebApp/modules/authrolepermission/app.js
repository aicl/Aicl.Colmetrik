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
     	{xtype:'authrolepermissionlist'},
       	{
			xtype:'panel',
			height:352,
			width:440,
			baseCls:'x-plain',
			layout: {
    		type: 'vbox'       
    		},
			items:[
				{ xtype:'authrolepermissionform'}
			]	
		}
    ]
    });
    var controller =this.getController('AuthRolePermission');
    controller.getAuthRolePermissionStore().load();
    controller.refreshButtons();
},
    
controllers: ['AuthRolePermission']
    
});