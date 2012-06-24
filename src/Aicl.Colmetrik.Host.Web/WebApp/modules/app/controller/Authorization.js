Ext.define('App.controller.Authorization',{
	extend: 'Ext.app.Controller',
    stores: ['Authorization'],  
    models: ['Authorization'],
    views:  ['authorization.List','authorization.Form' ],
    refs:[
    	{ref: 'authorizationList',    	 selector: 'authorizationlist' },
    	{ref: 'authorizationDeleteButton', selector: 'authorizationlist button[action=delete]' },
    	{ref: 'authorizationNewButton',    selector: 'authorizationlist button[action=new]' },
    	{ref: 'authorizationForm',    	 selector: 'authorizationform' }, 
    	{ref: 'authorizationSaveButton', 	 selector: 'authorizationform button[action=save]' }
    ],

    init: function(application) {
    	    	
        this.control({
            'authorizationlist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshButtons(selections);
                }
            },
            
            'authorizationlist button[action=delete]': {
                click: function(button, event, options){
                	var grid = this.getAuthorizationList();
                	var record = grid.getSelectionModel().getSelection()[0];
        			this.getAuthorizationStore().remove(record);
                }
            },
            
            'authorizationlist button[action=new]': {
            	click:function(button, event, options){
            		this.getAuthorizationList().getSelectionModel().deselectAll();
            	}
            },
            
            'authorizationform button[action=save]':{            	
            	click:function(button, event, options){
            		var model = this.getAuthorizationStore();
            		var record = this.getAuthorizationForm().getForm().getFieldValues(true);
            		this.getAuthorizationStore().save(record);
            	}
            }
        });
    },
    
    onLaunch: function(application){
    	this.getAuthorizationStore().on('write', function(store, operation, eOpts ){
    		var record =  operation.getRecords()[0];                                    
            if (operation.action != 'destroy') {
               this.getAuthorizationList().getSelectionModel().select(record,true,true);
               this.refreshButtons([record]);
            }
    	}, this);
    },
        	
	refreshButtons: function(selections){	
		selections=selections||[];
		if (selections.length){
			this.getAuthorizationNewButton().setDisabled(!this.getAuthorizationStore().canCreate());
        	this.getAuthorizationForm().getForm().loadRecord(selections[0]);
            this.getAuthorizationSaveButton().setText('Update');
            this.getAuthorizationDeleteButton().setDisabled(!this.getAuthorizationStore().canDestroy());
            this.getAuthorizationSaveButton().setDisabled(!this.getAuthorizationStore().canUpdate());
        }
        else{
        	this.getAuthorizationForm().getForm().reset();            
        	this.getAuthorizationSaveButton().setText('Add');
        	this.getAuthorizationDeleteButton().setDisabled(true);
        	this.getAuthorizationNewButton().setDisabled(true);
        	this.getAuthorizationSaveButton().setDisabled(!this.getAuthorizationStore().canCreate());
        	this.getAuthorizationForm().setFocus();
        };
        this.enableAll();
	},
	
	disableForm:function(){
		this.getAuthorizationForm().setDisabled(true);
	},
	
	enableForm:function(){
		this.getAuthorizationForm().setDisabled(false);	
	},

	disableList:function(){
		this.getAuthorizationList().setDisabled(true);
	},
	
	enableList:function(){
		this.getAuthorizationList().setDisabled(false);
	},
	
	disableAll: function(){
		this.getAuthorizationList().setDisabled(true);
		this.getAuthorizationForm().setDisabled(true);
	},
	
	enableAll: function(){
		this.getAuthorizationList().setDisabled(false);
		this.getAuthorizationForm().setDisabled(false);
	},
	
	onselectionchange:function(fn, scope){
		this.getAuthorizationList().on('selectionchange', fn, scope);
	},
	
	onwrite:function(fn, scope){
		this.getAuthorizationStore().on('write', fn, scope);
	}
	
});
