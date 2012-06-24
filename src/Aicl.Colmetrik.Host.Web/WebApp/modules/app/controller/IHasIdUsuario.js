Ext.define('App.controller.IHasIdUsuario',{
	extend: 'Ext.app.Controller',
    stores: ['IHasIdUsuario'],  
    models: ['IHasIdUsuario'],
    views:  ['ihasidusuario.List','ihasidusuario.Form' ],
    refs:[
    	{ref: 'ihasidusuarioList',    	 selector: 'ihasidusuariolist' },
    	{ref: 'ihasidusuarioDeleteButton', selector: 'ihasidusuariolist button[action=delete]' },
    	{ref: 'ihasidusuarioNewButton',    selector: 'ihasidusuariolist button[action=new]' },
    	{ref: 'ihasidusuarioForm',    	 selector: 'ihasidusuarioform' }, 
    	{ref: 'ihasidusuarioSaveButton', 	 selector: 'ihasidusuarioform button[action=save]' }
    ],

    init: function(application) {
    	    	
        this.control({
            'ihasidusuariolist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshButtons(selections);
                }
            },
            
            'ihasidusuariolist button[action=delete]': {
                click: function(button, event, options){
                	var grid = this.getIHasIdUsuarioList();
                	var record = grid.getSelectionModel().getSelection()[0];
        			this.getIHasIdUsuarioStore().remove(record);
                }
            },
            
            'ihasidusuariolist button[action=new]': {
            	click:function(button, event, options){
            		this.getIHasIdUsuarioList().getSelectionModel().deselectAll();
            	}
            },
            
            'ihasidusuarioform button[action=save]':{            	
            	click:function(button, event, options){
            		var model = this.getIHasIdUsuarioStore();
            		var record = this.getIHasIdUsuarioForm().getForm().getFieldValues(true);
            		this.getIHasIdUsuarioStore().save(record);
            	}
            }
        });
    },
    
    onLaunch: function(application){
    	this.getIHasIdUsuarioStore().on('write', function(store, operation, eOpts ){
    		var record =  operation.getRecords()[0];                                    
            if (operation.action != 'destroy') {
               this.getIHasIdUsuarioList().getSelectionModel().select(record,true,true);
               this.refreshButtons([record]);
            }
    	}, this);
    },
        	
	refreshButtons: function(selections){	
		selections=selections||[];
		if (selections.length){
			this.getIHasIdUsuarioNewButton().setDisabled(!this.getIHasIdUsuarioStore().canCreate());
        	this.getIHasIdUsuarioForm().getForm().loadRecord(selections[0]);
            this.getIHasIdUsuarioSaveButton().setText('Update');
            this.getIHasIdUsuarioDeleteButton().setDisabled(!this.getIHasIdUsuarioStore().canDestroy());
            this.getIHasIdUsuarioSaveButton().setDisabled(!this.getIHasIdUsuarioStore().canUpdate());
        }
        else{
        	this.getIHasIdUsuarioForm().getForm().reset();            
        	this.getIHasIdUsuarioSaveButton().setText('Add');
        	this.getIHasIdUsuarioDeleteButton().setDisabled(true);
        	this.getIHasIdUsuarioNewButton().setDisabled(true);
        	this.getIHasIdUsuarioSaveButton().setDisabled(!this.getIHasIdUsuarioStore().canCreate());
        	this.getIHasIdUsuarioForm().setFocus();
        };
        this.enableAll();
	},
	
	disableForm:function(){
		this.getIHasIdUsuarioForm().setDisabled(true);
	},
	
	enableForm:function(){
		this.getIHasIdUsuarioForm().setDisabled(false);	
	},

	disableList:function(){
		this.getIHasIdUsuarioList().setDisabled(true);
	},
	
	enableList:function(){
		this.getIHasIdUsuarioList().setDisabled(false);
	},
	
	disableAll: function(){
		this.getIHasIdUsuarioList().setDisabled(true);
		this.getIHasIdUsuarioForm().setDisabled(true);
	},
	
	enableAll: function(){
		this.getIHasIdUsuarioList().setDisabled(false);
		this.getIHasIdUsuarioForm().setDisabled(false);
	},
	
	onselectionchange:function(fn, scope){
		this.getIHasIdUsuarioList().on('selectionchange', fn, scope);
	},
	
	onwrite:function(fn, scope){
		this.getIHasIdUsuarioStore().on('write', fn, scope);
	}
	
});
