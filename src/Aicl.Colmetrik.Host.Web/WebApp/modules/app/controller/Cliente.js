Ext.define('App.controller.Cliente',{
	extend: 'Ext.app.Controller',
    stores: ['Cliente'],  
    models: ['Cliente'],
    views:  ['cliente.List','cliente.Form' ],
    refs:[
    	{ref: 'clienteList',    	 selector: 'clientelist' },
    	{ref: 'clienteDeleteButton', selector: 'clientelist button[action=delete]' },
    	{ref: 'clienteNewButton',    selector: 'clientelist button[action=new]' },
    	{ref: 'clienteForm',    	 selector: 'clienteform' }, 
    	{ref: 'clienteSaveButton', 	 selector: 'clienteform button[action=save]' }
    ],

    init: function(application) {
    	    	
        this.control({
            'clientelist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshButtons(selections);
                }
            },
            
            'clientelist button[action=delete]': {
                click: function(button, event, options){
                	var grid = this.getClienteList();
                	var record = grid.getSelectionModel().getSelection()[0];
        			this.getClienteStore().remove(record);
                }
            },
            
            'clientelist button[action=new]': {
            	click:function(button, event, options){
            		this.getClienteList().getSelectionModel().deselectAll();
            	}
            },
            
            'clienteform button[action=save]':{            	
            	click:function(button, event, options){
            		var model = this.getClienteStore();
            		var record = this.getClienteForm().getForm().getFieldValues(true);
            		this.getClienteStore().save(record);
            	}
            }
        });
    },
    
    onLaunch: function(application){
    	this.getClienteStore().on('write', function(store, operation, eOpts ){
    		var record =  operation.getRecords()[0];                                    
            if (operation.action != 'destroy') {
               this.getClienteList().getSelectionModel().select(record,true,true);
               this.refreshButtons([record]);
            }
    	}, this);
    },
        	
	refreshButtons: function(selections){	
		selections=selections||[];
		if (selections.length){
			this.getClienteNewButton().setDisabled(!this.getClienteStore().canCreate());
        	this.getClienteForm().getForm().loadRecord(selections[0]);
            this.getClienteSaveButton().setText('Update');
            this.getClienteDeleteButton().setDisabled(!this.getClienteStore().canDestroy());
            this.getClienteSaveButton().setDisabled(!this.getClienteStore().canUpdate());
        }
        else{
        	this.getClienteForm().getForm().reset();            
        	this.getClienteSaveButton().setText('Add');
        	this.getClienteDeleteButton().setDisabled(true);
        	this.getClienteNewButton().setDisabled(true);
        	this.getClienteSaveButton().setDisabled(!this.getClienteStore().canCreate());
        	this.getClienteForm().setFocus();
        };
        this.enableAll();
	},
	
	disableForm:function(){
		this.getClienteForm().setDisabled(true);
	},
	
	enableForm:function(){
		this.getClienteForm().setDisabled(false);	
	},

	disableList:function(){
		this.getClienteList().setDisabled(true);
	},
	
	enableList:function(){
		this.getClienteList().setDisabled(false);
	},
	
	disableAll: function(){
		this.getClienteList().setDisabled(true);
		this.getClienteForm().setDisabled(true);
	},
	
	enableAll: function(){
		this.getClienteList().setDisabled(false);
		this.getClienteForm().setDisabled(false);
	},
	
	onselectionchange:function(fn, scope){
		this.getClienteList().on('selectionchange', fn, scope);
	},
	
	onwrite:function(fn, scope){
		this.getClienteStore().on('write', fn, scope);
	}
	
});
