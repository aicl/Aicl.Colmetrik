Ext.define('App.controller.Categoria',{
	extend: 'Ext.app.Controller',
    stores: ['Categoria'],  
    models: ['Categoria'],
    views:  ['categoria.List','categoria.Form' ],
    refs:[
    	{ref: 'categoriaList',    	 selector: 'categorialist' },
    	{ref: 'categoriaDeleteButton', selector: 'categorialist button[action=delete]' },
    	{ref: 'categoriaNewButton',    selector: 'categorialist button[action=new]' },
    	{ref: 'categoriaForm',    	 selector: 'categoriaform' }, 
    	{ref: 'categoriaSaveButton', 	 selector: 'categoriaform button[action=save]' }
    ],

    init: function(application) {
    	    	
        this.control({
            'categorialist': { 
                selectionchange: function( sm,  selections,  eOpts){
                	this.refreshButtons(selections);
                }
            },
            
            'categorialist button[action=delete]': {
                click: function(button, event, options){
                	var grid = this.getCategoriaList();
                	var record = grid.getSelectionModel().getSelection()[0];
        			this.getCategoriaStore().remove(record);
                }
            },
            
            'categorialist button[action=new]': {
            	click:function(button, event, options){
            		this.getCategoriaList().getSelectionModel().deselectAll();
            	}
            },
            
            'categoriaform button[action=save]':{            	
            	click:function(button, event, options){
            		var model = this.getCategoriaStore();
            		var record = this.getCategoriaForm().getForm().getFieldValues(true);
            		this.getCategoriaStore().save(record);
            	}
            }
        });
    },
    
    onLaunch: function(application){
    	this.getCategoriaStore().on('write', function(store, operation, eOpts ){
    		var record =  operation.getRecords()[0];                                    
            if (operation.action != 'destroy') {
               this.getCategoriaList().getSelectionModel().select(record,true,true);
               this.refreshButtons([record]);
            }
    	}, this);
    },
        	
	refreshButtons: function(selections){	
		selections=selections||[];
		if (selections.length){
			this.getCategoriaNewButton().setDisabled(!this.getCategoriaStore().canCreate());
        	this.getCategoriaForm().getForm().loadRecord(selections[0]);
            this.getCategoriaSaveButton().setText('Update');
            this.getCategoriaDeleteButton().setDisabled(!this.getCategoriaStore().canDestroy());
            this.getCategoriaSaveButton().setDisabled(!this.getCategoriaStore().canUpdate());
        }
        else{
        	this.getCategoriaForm().getForm().reset();            
        	this.getCategoriaSaveButton().setText('Add');
        	this.getCategoriaDeleteButton().setDisabled(true);
        	this.getCategoriaNewButton().setDisabled(true);
        	this.getCategoriaSaveButton().setDisabled(!this.getCategoriaStore().canCreate());
        	this.getCategoriaForm().setFocus();
        };
        this.enableAll();
	},
	
	disableForm:function(){
		this.getCategoriaForm().setDisabled(true);
	},
	
	enableForm:function(){
		this.getCategoriaForm().setDisabled(false);	
	},

	disableList:function(){
		this.getCategoriaList().setDisabled(true);
	},
	
	enableList:function(){
		this.getCategoriaList().setDisabled(false);
	},
	
	disableAll: function(){
		this.getCategoriaList().setDisabled(true);
		this.getCategoriaForm().setDisabled(true);
	},
	
	enableAll: function(){
		this.getCategoriaList().setDisabled(false);
		this.getCategoriaForm().setDisabled(false);
	},
	
	onselectionchange:function(fn, scope){
		this.getCategoriaList().on('selectionchange', fn, scope);
	},
	
	onwrite:function(fn, scope){
		this.getCategoriaStore().on('write', fn, scope);
	}
	
});
