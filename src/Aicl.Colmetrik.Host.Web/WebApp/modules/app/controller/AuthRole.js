Ext.define('App.controller.AuthRole',{
	extend: 'Ext.app.Controller',
    stores: ['AuthRole'],  
    models: ['AuthRole'],
    views:  ['authrole.List','authrole.Form' ],
    refs:[
    	{ref: 'authroleList',    	 selector: 'authrolelist' },
    	{ref: 'authroleDeleteButton', selector: 'authrolelist button[action=delete]' },
    	{ref: 'authroleNewButton',    selector: 'authrolelist button[action=new]' },
    	{ref: 'authroleForm',    	 selector: 'authroleform' }, 
    	{ref: 'authroleSaveButton', 	 selector: 'authroleform button[action=save]' }
    ],

    init: function(application) {
    	    	
        this.control({
            'authrolelist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshButtons(selections);
                }
            },
            
            'authrolelist button[action=delete]': {
                click: function(button, event, options){
                	var grid = this.getAuthRoleList();
                	var record = grid.getSelectionModel().getSelection()[0];
        			this.getAuthRoleStore().remove(record);
                }
            },
            
            'authrolelist button[action=new]': {
            	click:function(button, event, options){
            		this.getAuthRoleList().getSelectionModel().deselectAll();
            	}
            },
            
            'authroleform button[action=save]':{            	
            	click:function(button, event, options){
            		var model = this.getAuthRoleStore();
            		var record = this.getAuthRoleForm().getForm().getFieldValues(true);
            		this.getAuthRoleStore().save(record);
            	}
            }
        });
    },
    
    onLaunch: function(application){
    	this.getAuthRoleStore().on('write', function(store, operation, eOpts ){
    		var record =  operation.getRecords()[0];                                    
            if (operation.action != 'destroy') {
               this.getAuthRoleList().getSelectionModel().select(record,true,true);
               this.refreshButtons([record]);
            }
    	}, this);
    },
        	
	refreshButtons: function(selections){	
		selections=selections||[];
		if (selections.length){
			this.getAuthRoleNewButton().setDisabled(!this.getAuthRoleStore().canCreate());
        	this.getAuthRoleForm().getForm().loadRecord(selections[0]);
            this.getAuthRoleSaveButton().setText('Update');
            this.getAuthRoleDeleteButton().setDisabled(!this.getAuthRoleStore().canDestroy());
            this.getAuthRoleSaveButton().setDisabled(!this.getAuthRoleStore().canUpdate());
        }
        else{
        	this.getAuthRoleForm().getForm().reset();            
        	this.getAuthRoleSaveButton().setText('Add');
        	this.getAuthRoleDeleteButton().setDisabled(true);
        	this.getAuthRoleNewButton().setDisabled(true);
        	this.getAuthRoleSaveButton().setDisabled(!this.getAuthRoleStore().canCreate());
        	this.getAuthRoleForm().setFocus();
        };
        this.enableAll();
	},
	
	disableForm:function(){
		this.getAuthRoleForm().setDisabled(true);
	},
	
	enableForm:function(){
		this.getAuthRoleForm().setDisabled(false);	
	},

	disableList:function(){
		this.getAuthRoleList().setDisabled(true);
	},
	
	enableList:function(){
		this.getAuthRoleList().setDisabled(false);
	},
	
	disableAll: function(){
		this.getAuthRoleList().setDisabled(true);
		this.getAuthRoleForm().setDisabled(true);
	},
	
	enableAll: function(){
		this.getAuthRoleList().setDisabled(false);
		this.getAuthRoleForm().setDisabled(false);
	},
	
	onselectionchange:function(fn, scope){
		this.getAuthRoleList().on('selectionchange', fn, scope);
	},
	
	onwrite:function(fn, scope){
		this.getAuthRoleStore().on('write', fn, scope);
	}
	
});
