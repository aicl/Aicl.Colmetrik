Ext.define('App.controller.Empleado',{
	extend: 'Ext.app.Controller',
    stores: ['Empleado'],  
    models: ['Empleado'],
    views:  ['empleado.List','empleado.Form' ],
    refs:[
    	{ref: 'empleadoList',    	 selector: 'empleadolist' },
    	{ref: 'empleadoDeleteButton', selector: 'empleadolist button[action=delete]' },
    	{ref: 'empleadoNewButton',    selector: 'empleadolist button[action=new]' },
    	{ref: 'empleadoForm',    	 selector: 'empleadoform' }, 
    	{ref: 'empleadoSaveButton', 	 selector: 'empleadoform button[action=save]' }
    ],

    init: function(application) {
    	    	
        this.control({
            'empleadolist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshButtons(selections);
                }
            },
            
            'empleadolist button[action=delete]': {
                click: function(button, event, options){
                	var grid = this.getEmpleadoList();
                	var record = grid.getSelectionModel().getSelection()[0];
        			this.getEmpleadoStore().remove(record);
                }
            },
            
            'empleadolist button[action=new]': {
            	click:function(button, event, options){
            		this.getEmpleadoList().getSelectionModel().deselectAll();
            	}
            },
            
            'empleadoform button[action=save]':{            	
            	click:function(button, event, options){
            		var model = this.getEmpleadoStore();
            		var record = this.getEmpleadoForm().getForm().getFieldValues(true);
            		this.getEmpleadoStore().save(record);
            	}
            }
        });
    },
    
    onLaunch: function(application){
    	this.getEmpleadoStore().on('write', function(store, operation, eOpts ){
    		var record =  operation.getRecords()[0];                                    
            if (operation.action != 'destroy') {
               this.getEmpleadoList().getSelectionModel().select(record,true,true);
               this.refreshButtons([record]);
            }
    	}, this);
    },
        	
	refreshButtons: function(selections){	
		selections=selections||[];
		if (selections.length){
			this.getEmpleadoNewButton().setDisabled(!this.getEmpleadoStore().canCreate());
        	this.getEmpleadoForm().getForm().loadRecord(selections[0]);
            this.getEmpleadoSaveButton().setText('Update');
            this.getEmpleadoDeleteButton().setDisabled(!this.getEmpleadoStore().canDestroy());
            this.getEmpleadoSaveButton().setDisabled(!this.getEmpleadoStore().canUpdate());
        }
        else{
        	this.getEmpleadoForm().getForm().reset();            
        	this.getEmpleadoSaveButton().setText('Add');
        	this.getEmpleadoDeleteButton().setDisabled(true);
        	this.getEmpleadoNewButton().setDisabled(true);
        	this.getEmpleadoSaveButton().setDisabled(!this.getEmpleadoStore().canCreate());
        	this.getEmpleadoForm().setFocus();
        };
        this.enableAll();
	},
	
	disableForm:function(){
		this.getEmpleadoForm().setDisabled(true);
	},
	
	enableForm:function(){
		this.getEmpleadoForm().setDisabled(false);	
	},

	disableList:function(){
		this.getEmpleadoList().setDisabled(true);
	},
	
	enableList:function(){
		this.getEmpleadoList().setDisabled(false);
	},
	
	disableAll: function(){
		this.getEmpleadoList().setDisabled(true);
		this.getEmpleadoForm().setDisabled(true);
	},
	
	enableAll: function(){
		this.getEmpleadoList().setDisabled(false);
		this.getEmpleadoForm().setDisabled(false);
	},
	
	onselectionchange:function(fn, scope){
		this.getEmpleadoList().on('selectionchange', fn, scope);
	},
	
	onwrite:function(fn, scope){
		this.getEmpleadoStore().on('write', fn, scope);
	}
	
});
