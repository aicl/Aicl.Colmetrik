Ext.define('App.controller.GestionPedido',{
	extend: 'Ext.app.Controller',
    stores: ['Pedido'],  
    models: ['Pedido'],
    views:  ['gestionpedido.Form'],
    refs:[
    	{ref: 'pedidoList',    	 selector: 'pedidolist' },
    	{ref: 'pedidoForm',    	 selector: 'pedidoform' }, 
    	{ref: 'resumenPedidoForm',    	 selector: 'resumenpedidoform' },
    	{ref: 'findText', 	 selector: 'pedidolist textfield[name=findCustomer]' }
    ],

    init: function(application) {
    	    	
        this.control({
            'pedidolist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshForm(selections);
                }
            },
            'pedidolist button[action=findCustomer]': {
                click: function(button, event, options){
                	var store = this.getPedidoStore();
                	store.getProxy().setExtraParam('NombreCompania', this.getFindText().getValue());
                	store.loadPage(1);
                }
            }
        });
    },
    
    onLaunch: function(application){
    },
        	
	refreshForm: function(selections){	
		selections=selections||[];
		if (selections.length){
        	this.getPedidoForm().getForm().loadRecord(selections[0]);
        }
        else{
        	this.getPedidoForm().getForm().reset();            
        };
	},
	
	onselectionchange:function(fn, scope){
		this.getPedidoList().on('selectionchange', fn, scope);
	},
	
	onwrite:function(fn, scope){
		this.getPedidoStore().on('write', fn, scope);
	}
	
});
