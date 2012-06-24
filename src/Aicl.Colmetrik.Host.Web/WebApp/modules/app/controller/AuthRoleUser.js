Ext.define('App.controller.AuthRoleUser',{
	extend: 'Ext.app.Controller',
    stores: ['AuthRoleUser'],  
    models: ['AuthRoleUser'],
    views:  ['authroleuser.List','authroleuser.Form' ],
    refs:[
    	{ref: 'authroleuserList',    	 selector: 'authroleuserlist' },
    	{ref: 'authroleuserDeleteButton', selector: 'authroleuserlist button[action=delete]' },
    	{ref: 'authroleuserNewButton',    selector: 'authroleuserlist button[action=new]' },
    	{ref: 'authroleuserForm',    	 selector: 'authroleuserform' }, 
    	{ref: 'authroleuserSaveButton', 	 selector: 'authroleuserform button[action=save]' }
    ],

    init: function(application) {
    	    	
        this.control({
            'authroleuserlist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshButtons(selections);
                }
            },
            
            'authroleuserlist button[action=delete]': {
                click: function(button, event, options){
                	var grid = this.getAuthRoleUserList();
                	var record = grid.getSelectionModel().getSelection()[0];
        			this.getAuthRoleUserStore().remove(record);
                }
            },
            
            'authroleuserlist button[action=new]': {
            	click:function(button, event, options){
            		this.getAuthRoleUserList().getSelectionModel().deselectAll();
            	}
            },
            
            'authroleuserform button[action=save]':{            	
            	click:function(button, event, options){
            		var model = this.getAuthRoleUserStore();
            		var record = this.getAuthRoleUserForm().getForm().getFieldValues(true);
            		this.getAuthRoleUserStore().save(record);
            	}
            }
        });
    },
    
    onLaunch: function(application){
    	this.getAuthRoleUserStore().on('write', function(store, operation, eOpts ){
    		var record =  operation.getRecords()[0];                                    
            if (operation.action != 'destroy') {
               this.getAuthRoleUserList().getSelectionModel().select(record,true,true);
               this.refreshButtons([record]);
            }
    	}, this);
    },
        	
	refreshButtons: function(selections){	
		selections=selections||[];
		if (selections.length){
			this.getAuthRoleUserNewButton().setDisabled(!this.getAuthRoleUserStore().canCreate());
        	this.getAuthRoleUserForm().getForm().loadRecord(selections[0]);
            this.getAuthRoleUserSaveButton().setText('Update');
            this.getAuthRoleUserDeleteButton().setDisabled(!this.getAuthRoleUserStore().canDestroy());
            this.getAuthRoleUserSaveButton().setDisabled(!this.getAuthRoleUserStore().canUpdate());
        }
        else{
        	this.getAuthRoleUserForm().getForm().reset();            
        	this.getAuthRoleUserSaveButton().setText('Add');
        	this.getAuthRoleUserDeleteButton().setDisabled(true);
        	this.getAuthRoleUserNewButton().setDisabled(true);
        	this.getAuthRoleUserSaveButton().setDisabled(!this.getAuthRoleUserStore().canCreate());
        	this.getAuthRoleUserForm().setFocus();
        };
        this.enableAll();
	},
	
	disableForm:function(){
		this.getAuthRoleUserForm().setDisabled(true);
	},
	
	enableForm:function(){
		this.getAuthRoleUserForm().setDisabled(false);	
	},

	disableList:function(){
		this.getAuthRoleUserList().setDisabled(true);
	},
	
	enableList:function(){
		this.getAuthRoleUserList().setDisabled(false);
	},
	
	disableAll: function(){
		this.getAuthRoleUserList().setDisabled(true);
		this.getAuthRoleUserForm().setDisabled(true);
	},
	
	enableAll: function(){
		this.getAuthRoleUserList().setDisabled(false);
		this.getAuthRoleUserForm().setDisabled(false);
	},
	
	onselectionchange:function(fn, scope){
		this.getAuthRoleUserList().on('selectionchange', fn, scope);
	},
	
	onwrite:function(fn, scope){
		this.getAuthRoleUserStore().on('write', fn, scope);
	}
	
});
