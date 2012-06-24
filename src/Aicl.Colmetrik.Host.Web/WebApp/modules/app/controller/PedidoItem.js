Ext.define('App.controller.PedidoItem',{
	extend: 'Ext.app.Controller',
    stores: ['PedidoItem'],  
    models: ['PedidoItem'],
    views:  ['pedidoitem.List','pedidoitem.Form' ],
    refs:[
    	{ref: 'pedidoItemList',    	 selector: 'pedidoitemlist' },
    	{ref: 'pedidoItemForm',    	 selector: 'pedidoitemform' }
    ],

    init: function(application) {
    	    	
        this.control({
            'pedidoitemlist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshForm(selections);
                }
            }
        });
    },
    
    onLaunch: function(application){
    },
        	
	refreshForm: function(selections){	
		selections=selections||[];
		if (selections.length){
        	this.getPedidoItemForm().getForm().loadRecord(selections[0]);
        }
        else{
        	this.getPedidoItemForm().getForm().reset();
        };  
	},
		
	onselectionchange:function(fn, scope){
		this.getPedidoItemList().on('selectionchange', fn, scope);
	},
	
	onload:function(fn, scope){
		this.getPedidoItemStore().on('load', fn, scope);
	}
	
});
