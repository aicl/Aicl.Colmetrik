Ext.define('App.controller.Proveedor',{
	extend: 'Ext.app.Controller',
    stores: ['Proveedor'],  
    models: ['Proveedor'],
    views:  ['proveedor.List','proveedor.Form' ],
    refs:[
    	{ref: 'proveedorList',    	 selector: 'proveedorlist' },
    	{ref: 'proveedorDeleteButton', selector: 'proveedorlist button[action=delete]' },
    	{ref: 'proveedorNewButton',    selector: 'proveedorlist button[action=new]' },
    	{ref: 'proveedorForm',    	 selector: 'proveedorform' }, 
    	{ref: 'proveedorSaveButton', 	 selector: 'proveedorform button[action=save]' }
    ],

    init: function(application) {
    	    	
        this.control({
            'proveedorlist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshButtons(selections);
                }
            },
            
            'proveedorlist button[action=delete]': {
                click: function(button, event, options){
                	var grid = this.getProveedorList();
                	var record = grid.getSelectionModel().getSelection()[0];
        			this.getProveedorStore().remove(record);
                }
            },
            
            'proveedorlist button[action=new]': {
            	click:function(button, event, options){
            		this.getProveedorList().getSelectionModel().deselectAll();
            	}
            },
            
            'proveedorform button[action=save]':{            	
            	click:function(button, event, options){
            		var model = this.getProveedorStore();
            		var record = this.getProveedorForm().getForm().getFieldValues(true);
            		this.getProveedorStore().save(record);
            	}
            }
        });
    },
    
    onLaunch: function(application){
    	this.getProveedorStore().on('write', function(store, operation, eOpts ){
    		var record =  operation.getRecords()[0];                                    
            if (operation.action != 'destroy') {
               this.getProveedorList().getSelectionModel().select(record,true,true);
               this.refreshButtons([record]);
            }
    	}, this);
    },
        	
	refreshButtons: function(selections){	
		selections=selections||[];
		if (selections.length){
			this.getProveedorNewButton().setDisabled(!this.getProveedorStore().canCreate());
        	this.getProveedorForm().getForm().loadRecord(selections[0]);
            this.getProveedorSaveButton().setText('Update');
            this.getProveedorDeleteButton().setDisabled(!this.getProveedorStore().canDestroy());
            this.getProveedorSaveButton().setDisabled(!this.getProveedorStore().canUpdate());
        }
        else{
        	this.getProveedorForm().getForm().reset();            
        	this.getProveedorSaveButton().setText('Add');
        	this.getProveedorDeleteButton().setDisabled(true);
        	this.getProveedorNewButton().setDisabled(true);
        	this.getProveedorSaveButton().setDisabled(!this.getProveedorStore().canCreate());
        	this.getProveedorForm().setFocus();
        };
        this.enableAll();
	},
	
	disableForm:function(){
		this.getProveedorForm().setDisabled(true);
	},
	
	enableForm:function(){
		this.getProveedorForm().setDisabled(false);	
	},

	disableList:function(){
		this.getProveedorList().setDisabled(true);
	},
	
	enableList:function(){
		this.getProveedorList().setDisabled(false);
	},
	
	disableAll: function(){
		this.getProveedorList().setDisabled(true);
		this.getProveedorForm().setDisabled(true);
	},
	
	enableAll: function(){
		this.getProveedorList().setDisabled(false);
		this.getProveedorForm().setDisabled(false);
	},
	
	onselectionchange:function(fn, scope){
		this.getProveedorList().on('selectionchange', fn, scope);
	},
	
	onwrite:function(fn, scope){
		this.getProveedorStore().on('write', fn, scope);
	}
	
});
