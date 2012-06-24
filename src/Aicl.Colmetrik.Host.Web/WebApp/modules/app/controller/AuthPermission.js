Ext.define('App.controller.AuthPermission',{
	extend: 'Ext.app.Controller',
    stores: ['AuthPermission'],  
    models: ['AuthPermission'],
    views:  ['authpermission.List','authpermission.Form' ],
    refs:[
    	{ref: 'authpermissionList',    	 selector: 'authpermissionlist' },
    	{ref: 'authpermissionDeleteButton', selector: 'authpermissionlist button[action=delete]' },
    	{ref: 'authpermissionNewButton',    selector: 'authpermissionlist button[action=new]' },
    	{ref: 'authpermissionForm',    	 selector: 'authpermissionform' }, 
    	{ref: 'authpermissionSaveButton', 	 selector: 'authpermissionform button[action=save]' }
    ],

    init: function(application) {
    	    	
        this.control({
            'authpermissionlist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshButtons(selections);
                }
            },
            
            'authpermissionlist button[action=delete]': {
                click: function(button, event, options){
                	var grid = this.getAuthPermissionList();
                	var record = grid.getSelectionModel().getSelection()[0];
        			this.getAuthPermissionStore().remove(record);
                }
            },
            
            'authpermissionlist button[action=new]': {
            	click:function(button, event, options){
            		this.getAuthPermissionList().getSelectionModel().deselectAll();
            	}
            },
            
            'authpermissionform button[action=save]':{            	
            	click:function(button, event, options){
            		var model = this.getAuthPermissionStore();
            		var record = this.getAuthPermissionForm().getForm().getFieldValues(true);
            		this.getAuthPermissionStore().save(record);
            	}
            }
        });
    },
    
    onLaunch: function(application){
    	this.getAuthPermissionStore().on('write', function(store, operation, eOpts ){
    		var record =  operation.getRecords()[0];                                    
            if (operation.action != 'destroy') {
               this.getAuthPermissionList().getSelectionModel().select(record,true,true);
               this.refreshButtons([record]);
            }
    	}, this);
    },
        	
	refreshButtons: function(selections){	
		selections=selections||[];
		if (selections.length){
			this.getAuthPermissionNewButton().setDisabled(!this.getAuthPermissionStore().canCreate());
        	this.getAuthPermissionForm().getForm().loadRecord(selections[0]);
            this.getAuthPermissionSaveButton().setText('Update');
            this.getAuthPermissionDeleteButton().setDisabled(!this.getAuthPermissionStore().canDestroy());
            this.getAuthPermissionSaveButton().setDisabled(!this.getAuthPermissionStore().canUpdate());
        }
        else{
        	this.getAuthPermissionForm().getForm().reset();            
        	this.getAuthPermissionSaveButton().setText('Add');
        	this.getAuthPermissionDeleteButton().setDisabled(true);
        	this.getAuthPermissionNewButton().setDisabled(true);
        	this.getAuthPermissionSaveButton().setDisabled(!this.getAuthPermissionStore().canCreate());
        	this.getAuthPermissionForm().setFocus();
        };
        this.enableAll();
	},
	
	disableForm:function(){
		this.getAuthPermissionForm().setDisabled(true);
	},
	
	enableForm:function(){
		this.getAuthPermissionForm().setDisabled(false);	
	},

	disableList:function(){
		this.getAuthPermissionList().setDisabled(true);
	},
	
	enableList:function(){
		this.getAuthPermissionList().setDisabled(false);
	},
	
	disableAll: function(){
		this.getAuthPermissionList().setDisabled(true);
		this.getAuthPermissionForm().setDisabled(true);
	},
	
	enableAll: function(){
		this.getAuthPermissionList().setDisabled(false);
		this.getAuthPermissionForm().setDisabled(false);
	},
	
	onselectionchange:function(fn, scope){
		this.getAuthPermissionList().on('selectionchange', fn, scope);
	},
	
	onwrite:function(fn, scope){
		this.getAuthPermissionStore().on('write', fn, scope);
	}
	
});
