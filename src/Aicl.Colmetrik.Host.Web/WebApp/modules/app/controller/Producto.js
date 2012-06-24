Ext.define('App.controller.Producto',{
	extend: 'Ext.app.Controller',
    stores: ['Producto'],  
    models: ['Producto'],
    views:  ['producto.List','producto.Form' ],
    refs:[
    	{ref: 'productoList',    	 selector: 'productolist' },
    	{ref: 'productoDeleteButton', selector: 'productolist button[action=delete]' },
    	{ref: 'productoNewButton',    selector: 'productolist button[action=new]' },
    	{ref: 'productoForm',    	 selector: 'productoform' }, 
    	{ref: 'productoSaveButton', 	 selector: 'productoform button[action=save]' }
    ],

    init: function(application) {
    	    	
        this.control({
            'productolist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshButtons(selections);
                }
            },
            
            'productolist button[action=delete]': {
                click: function(button, event, options){
                	var grid = this.getProductoList();
                	var record = grid.getSelectionModel().getSelection()[0];
        			this.getProductoStore().remove(record);
                }
            },
            
            'productolist button[action=new]': {
            	click:function(button, event, options){
            		this.getProductoList().getSelectionModel().deselectAll();
            	}
            },
            
            'productoform button[action=save]':{            	
            	click:function(button, event, options){
            		var model = this.getProductoStore();
            		var record = this.getProductoForm().getForm().getFieldValues(true);
            		this.getProductoStore().save(record);
            	}
            }
        });
    },
    
    onLaunch: function(application){
    	this.getProductoStore().on('write', function(store, operation, eOpts ){
    		var record =  operation.getRecords()[0];                                    
            if (operation.action != 'destroy') {
               this.getProductoList().getSelectionModel().select(record,true,true);
               this.refreshButtons([record]);
            }
    	}, this);
    },
        	
	refreshButtons: function(selections){	
		selections=selections||[];
		if (selections.length){
			this.getProductoNewButton().setDisabled(!this.getProductoStore().canCreate());
        	this.getProductoForm().getForm().loadRecord(selections[0]);
            this.getProductoSaveButton().setText('Update');
            this.getProductoDeleteButton().setDisabled(!this.getProductoStore().canDestroy());
            this.getProductoSaveButton().setDisabled(!this.getProductoStore().canUpdate());
        }
        else{
        	this.getProductoForm().getForm().reset();            
        	this.getProductoSaveButton().setText('Add');
        	this.getProductoDeleteButton().setDisabled(true);
        	this.getProductoNewButton().setDisabled(true);
        	this.getProductoSaveButton().setDisabled(!this.getProductoStore().canCreate());
        	this.getProductoForm().setFocus();
        };
        this.enableAll();
	},
	
	disableForm:function(){
		this.getProductoForm().setDisabled(true);
	},
	
	enableForm:function(){
		this.getProductoForm().setDisabled(false);	
	},

	disableList:function(){
		this.getProductoList().setDisabled(true);
	},
	
	enableList:function(){
		this.getProductoList().setDisabled(false);
	},
	
	disableAll: function(){
		this.getProductoList().setDisabled(true);
		this.getProductoForm().setDisabled(true);
	},
	
	enableAll: function(){
		this.getProductoList().setDisabled(false);
		this.getProductoForm().setDisabled(false);
	},
	
	onselectionchange:function(fn, scope){
		this.getProductoList().on('selectionchange', fn, scope);
	},
	
	onwrite:function(fn, scope){
		this.getProductoStore().on('write', fn, scope);
	}
	
});
