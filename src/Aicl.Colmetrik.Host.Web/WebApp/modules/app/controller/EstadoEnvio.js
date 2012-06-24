Ext.define('App.controller.EstadoEnvio',{
	extend: 'Ext.app.Controller',
    stores: ['EstadoEnvio'],  
    models: ['EstadoEnvio'],
    views:  ['estadoenvio.List','estadoenvio.Form' ],
    refs:[
    	{ref: 'estadoenvioList',    	 selector: 'estadoenviolist' },
    	{ref: 'estadoenvioDeleteButton', selector: 'estadoenviolist button[action=delete]' },
    	{ref: 'estadoenvioNewButton',    selector: 'estadoenviolist button[action=new]' },
    	{ref: 'estadoenvioForm',    	 selector: 'estadoenvioform' }, 
    	{ref: 'estadoenvioSaveButton', 	 selector: 'estadoenvioform button[action=save]' }
    ],

    init: function(application) {
    	    	
        this.control({
            'estadoenviolist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshButtons(selections);
                }
            },
            
            'estadoenviolist button[action=delete]': {
                click: function(button, event, options){
                	var grid = this.getEstadoEnvioList();
                	var record = grid.getSelectionModel().getSelection()[0];
        			this.getEstadoEnvioStore().remove(record);
                }
            },
            
            'estadoenviolist button[action=new]': {
            	click:function(button, event, options){
            		this.getEstadoEnvioList().getSelectionModel().deselectAll();
            	}
            },
            
            'estadoenvioform button[action=save]':{            	
            	click:function(button, event, options){
            		var model = this.getEstadoEnvioStore();
            		var record = this.getEstadoEnvioForm().getForm().getFieldValues(true);
            		this.getEstadoEnvioStore().save(record);
            	}
            }
        });
    },
    
    onLaunch: function(application){
    	this.getEstadoEnvioStore().on('write', function(store, operation, eOpts ){
    		var record =  operation.getRecords()[0];                                    
            if (operation.action != 'destroy') {
               this.getEstadoEnvioList().getSelectionModel().select(record,true,true);
               this.refreshButtons([record]);
            }
    	}, this);
    },
        	
	refreshButtons: function(selections){	
		selections=selections||[];
		if (selections.length){
			this.getEstadoEnvioNewButton().setDisabled(!this.getEstadoEnvioStore().canCreate());
        	this.getEstadoEnvioForm().getForm().loadRecord(selections[0]);
            this.getEstadoEnvioSaveButton().setText('Update');
            this.getEstadoEnvioDeleteButton().setDisabled(!this.getEstadoEnvioStore().canDestroy());
            this.getEstadoEnvioSaveButton().setDisabled(!this.getEstadoEnvioStore().canUpdate());
        }
        else{
        	this.getEstadoEnvioForm().getForm().reset();            
        	this.getEstadoEnvioSaveButton().setText('Add');
        	this.getEstadoEnvioDeleteButton().setDisabled(true);
        	this.getEstadoEnvioNewButton().setDisabled(true);
        	this.getEstadoEnvioSaveButton().setDisabled(!this.getEstadoEnvioStore().canCreate());
        	this.getEstadoEnvioForm().setFocus();
        };
        this.enableAll();
	},
	
	disableForm:function(){
		this.getEstadoEnvioForm().setDisabled(true);
	},
	
	enableForm:function(){
		this.getEstadoEnvioForm().setDisabled(false);	
	},

	disableList:function(){
		this.getEstadoEnvioList().setDisabled(true);
	},
	
	enableList:function(){
		this.getEstadoEnvioList().setDisabled(false);
	},
	
	disableAll: function(){
		this.getEstadoEnvioList().setDisabled(true);
		this.getEstadoEnvioForm().setDisabled(true);
	},
	
	enableAll: function(){
		this.getEstadoEnvioList().setDisabled(false);
		this.getEstadoEnvioForm().setDisabled(false);
	},
	
	onselectionchange:function(fn, scope){
		this.getEstadoEnvioList().on('selectionchange', fn, scope);
	},
	
	onwrite:function(fn, scope){
		this.getEstadoEnvioStore().on('write', fn, scope);
	}
	
});
