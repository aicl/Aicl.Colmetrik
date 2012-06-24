Ext.define('App.controller.Authentication',{
	extend: 'Ext.app.Controller',
    stores: ['Authentication'],  
    models: ['Authentication'],
    views:  ['authentication.List','authentication.Form' ],
    refs:[
    	{ref: 'authenticationList',    	 selector: 'authenticationlist' },
    	{ref: 'authenticationDeleteButton', selector: 'authenticationlist button[action=delete]' },
    	{ref: 'authenticationNewButton',    selector: 'authenticationlist button[action=new]' },
    	{ref: 'authenticationForm',    	 selector: 'authenticationform' }, 
    	{ref: 'authenticationSaveButton', 	 selector: 'authenticationform button[action=save]' }
    ],

    init: function(application) {
    	    	
        this.control({
            'authenticationlist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshButtons(selections);
                }
            },
            
            'authenticationlist button[action=delete]': {
                click: function(button, event, options){
                	var grid = this.getAuthenticationList();
                	var record = grid.getSelectionModel().getSelection()[0];
        			this.getAuthenticationStore().remove(record);
                }
            },
            
            'authenticationlist button[action=new]': {
            	click:function(button, event, options){
            		this.getAuthenticationList().getSelectionModel().deselectAll();
            	}
            },
            
            'authenticationform button[action=save]':{            	
            	click:function(button, event, options){
            		var model = this.getAuthenticationStore();
            		var record = this.getAuthenticationForm().getForm().getFieldValues(true);
            		this.getAuthenticationStore().save(record);
            	}
            }
        });
    },
    
    onLaunch: function(application){
    	this.getAuthenticationStore().on('write', function(store, operation, eOpts ){
    		var record =  operation.getRecords()[0];                                    
            if (operation.action != 'destroy') {
               this.getAuthenticationList().getSelectionModel().select(record,true,true);
               this.refreshButtons([record]);
            }
    	}, this);
    },
        	
	refreshButtons: function(selections){	
		selections=selections||[];
		if (selections.length){
			this.getAuthenticationNewButton().setDisabled(!this.getAuthenticationStore().canCreate());
        	this.getAuthenticationForm().getForm().loadRecord(selections[0]);
            this.getAuthenticationSaveButton().setText('Update');
            this.getAuthenticationDeleteButton().setDisabled(!this.getAuthenticationStore().canDestroy());
            this.getAuthenticationSaveButton().setDisabled(!this.getAuthenticationStore().canUpdate());
        }
        else{
        	this.getAuthenticationForm().getForm().reset();            
        	this.getAuthenticationSaveButton().setText('Add');
        	this.getAuthenticationDeleteButton().setDisabled(true);
        	this.getAuthenticationNewButton().setDisabled(true);
        	this.getAuthenticationSaveButton().setDisabled(!this.getAuthenticationStore().canCreate());
        	this.getAuthenticationForm().setFocus();
        };
        this.enableAll();
	},
	
	disableForm:function(){
		this.getAuthenticationForm().setDisabled(true);
	},
	
	enableForm:function(){
		this.getAuthenticationForm().setDisabled(false);	
	},

	disableList:function(){
		this.getAuthenticationList().setDisabled(true);
	},
	
	enableList:function(){
		this.getAuthenticationList().setDisabled(false);
	},
	
	disableAll: function(){
		this.getAuthenticationList().setDisabled(true);
		this.getAuthenticationForm().setDisabled(true);
	},
	
	enableAll: function(){
		this.getAuthenticationList().setDisabled(false);
		this.getAuthenticationForm().setDisabled(false);
	},
	
	onselectionchange:function(fn, scope){
		this.getAuthenticationList().on('selectionchange', fn, scope);
	},
	
	onwrite:function(fn, scope){
		this.getAuthenticationStore().on('write', fn, scope);
	}
	
});
