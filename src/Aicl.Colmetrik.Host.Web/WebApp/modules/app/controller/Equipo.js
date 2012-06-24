Ext.define('App.controller.Equipo',{
	extend: 'Ext.app.Controller',
    stores: ['Equipo'],  
    models: ['Equipo'],
    views:  ['equipo.List','equipo.Form' ],
    refs:[
    	{ref: 'equipoList',    	 selector: 'equipolist' },
    	{ref: 'equipoDeleteButton', selector: 'equipolist button[action=delete]' },
    	{ref: 'equipoNewButton',    selector: 'equipolist button[action=new]' },
    	{ref: 'equipoForm',    	 selector: 'equipoform' }, 
    	{ref: 'equipoSaveButton', 	 selector: 'equipoform button[action=save]' }
    ],

    init: function(application) {
    	    	
        this.control({
            'equipolist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshButtons(selections);
                }
            },
            
            'equipolist button[action=delete]': {
                click: function(button, event, options){
                	var grid = this.getEquipoList();
                	var record = grid.getSelectionModel().getSelection()[0];
        			this.getEquipoStore().remove(record);
                }
            },
            
            'equipolist button[action=new]': {
            	click:function(button, event, options){
            		this.getEquipoList().getSelectionModel().deselectAll();
            	}
            },
            
            'equipoform button[action=save]':{            	
            	click:function(button, event, options){
            		var model = this.getEquipoStore();
            		var record = this.getEquipoForm().getForm().getFieldValues(true);
            		this.getEquipoStore().save(record);
            	}
            }
        });
    },
    
    onLaunch: function(application){
    	this.getEquipoStore().on('write', function(store, operation, eOpts ){
    		var record =  operation.getRecords()[0];                                    
            if (operation.action != 'destroy') {
               this.getEquipoList().getSelectionModel().select(record,true,true);
               this.refreshButtons([record]);
            }
    	}, this);
    },
        	
	refreshButtons: function(selections){	
		selections=selections||[];
		if (selections.length){
			this.getEquipoNewButton().setDisabled(!this.getEquipoStore().canCreate());
        	this.getEquipoForm().getForm().loadRecord(selections[0]);
            this.getEquipoSaveButton().setText('Update');
            this.getEquipoDeleteButton().setDisabled(!this.getEquipoStore().canDestroy());
            this.getEquipoSaveButton().setDisabled(!this.getEquipoStore().canUpdate());
        }
        else{
        	this.getEquipoForm().getForm().reset();            
        	this.getEquipoSaveButton().setText('Add');
        	this.getEquipoDeleteButton().setDisabled(true);
        	this.getEquipoNewButton().setDisabled(true);
        	this.getEquipoSaveButton().setDisabled(!this.getEquipoStore().canCreate());
        	this.getEquipoForm().setFocus();
        };
        this.enableAll();
	},
	
	disableForm:function(){
		this.getEquipoForm().setDisabled(true);
	},
	
	enableForm:function(){
		this.getEquipoForm().setDisabled(false);	
	},

	disableList:function(){
		this.getEquipoList().setDisabled(true);
	},
	
	enableList:function(){
		this.getEquipoList().setDisabled(false);
	},
	
	disableAll: function(){
		this.getEquipoList().setDisabled(true);
		this.getEquipoForm().setDisabled(true);
	},
	
	enableAll: function(){
		this.getEquipoList().setDisabled(false);
		this.getEquipoForm().setDisabled(false);
	},
	
	onselectionchange:function(fn, scope){
		this.getEquipoList().on('selectionchange', fn, scope);
	},
	
	onwrite:function(fn, scope){
		this.getEquipoStore().on('write', fn, scope);
	}
	
});
