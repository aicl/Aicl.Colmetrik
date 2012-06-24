Ext.define('App.controller.AuthRolePermission',{
	extend: 'Ext.app.Controller',
    stores: ['AuthRolePermission'],  
    models: ['AuthRolePermission'],
    views:  ['authrolepermission.List','authrolepermission.Form' ],
    refs:[
    	{ref: 'authrolepermissionList',    	 selector: 'authrolepermissionlist' },
    	{ref: 'authrolepermissionDeleteButton', selector: 'authrolepermissionlist button[action=delete]' },
    	{ref: 'authrolepermissionNewButton',    selector: 'authrolepermissionlist button[action=new]' },
    	{ref: 'authrolepermissionForm',    	 selector: 'authrolepermissionform' }, 
    	{ref: 'authrolepermissionSaveButton', 	 selector: 'authrolepermissionform button[action=save]' }
    ],

    init: function(application) {
    	    	
        this.control({
            'authrolepermissionlist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshButtons(selections);
                }
            },
            
            'authrolepermissionlist button[action=delete]': {
                click: function(button, event, options){
                	var grid = this.getAuthRolePermissionList();
                	var record = grid.getSelectionModel().getSelection()[0];
        			this.getAuthRolePermissionStore().remove(record);
                }
            },
            
            'authrolepermissionlist button[action=new]': {
            	click:function(button, event, options){
            		this.getAuthRolePermissionList().getSelectionModel().deselectAll();
            	}
            },
            
            'authrolepermissionform button[action=save]':{            	
            	click:function(button, event, options){
            		var model = this.getAuthRolePermissionStore();
            		var record = this.getAuthRolePermissionForm().getForm().getFieldValues(true);
            		this.getAuthRolePermissionStore().save(record);
            	}
            }
        });
    },
    
    onLaunch: function(application){
    	this.getAuthRolePermissionStore().on('write', function(store, operation, eOpts ){
    		var record =  operation.getRecords()[0];                                    
            if (operation.action != 'destroy') {
               this.getAuthRolePermissionList().getSelectionModel().select(record,true,true);
               this.refreshButtons([record]);
            }
    	}, this);
    },
        	
	refreshButtons: function(selections){	
		selections=selections||[];
		if (selections.length){
			this.getAuthRolePermissionNewButton().setDisabled(!this.getAuthRolePermissionStore().canCreate());
        	this.getAuthRolePermissionForm().getForm().loadRecord(selections[0]);
            this.getAuthRolePermissionSaveButton().setText('Update');
            this.getAuthRolePermissionDeleteButton().setDisabled(!this.getAuthRolePermissionStore().canDestroy());
            this.getAuthRolePermissionSaveButton().setDisabled(!this.getAuthRolePermissionStore().canUpdate());
        }
        else{
        	this.getAuthRolePermissionForm().getForm().reset();            
        	this.getAuthRolePermissionSaveButton().setText('Add');
        	this.getAuthRolePermissionDeleteButton().setDisabled(true);
        	this.getAuthRolePermissionNewButton().setDisabled(true);
        	this.getAuthRolePermissionSaveButton().setDisabled(!this.getAuthRolePermissionStore().canCreate());
        	this.getAuthRolePermissionForm().setFocus();
        };
        this.enableAll();
	},
	
	disableForm:function(){
		this.getAuthRolePermissionForm().setDisabled(true);
	},
	
	enableForm:function(){
		this.getAuthRolePermissionForm().setDisabled(false);	
	},

	disableList:function(){
		this.getAuthRolePermissionList().setDisabled(true);
	},
	
	enableList:function(){
		this.getAuthRolePermissionList().setDisabled(false);
	},
	
	disableAll: function(){
		this.getAuthRolePermissionList().setDisabled(true);
		this.getAuthRolePermissionForm().setDisabled(true);
	},
	
	enableAll: function(){
		this.getAuthRolePermissionList().setDisabled(false);
		this.getAuthRolePermissionForm().setDisabled(false);
	},
	
	onselectionchange:function(fn, scope){
		this.getAuthRolePermissionList().on('selectionchange', fn, scope);
	},
	
	onwrite:function(fn, scope){
		this.getAuthRolePermissionStore().on('write', fn, scope);
	}
	
});
