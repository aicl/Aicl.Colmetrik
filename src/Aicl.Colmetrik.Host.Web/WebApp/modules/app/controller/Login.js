Ext.define('App.controller.Login',{
    extend:'Ext.app.Controller',
    init:function () {
        this.control({
          
            'login button[action=login]':{
                click:this.login
            },
            'login textfield':{
                specialkey:this.keyenter
            }
        });
    },
    views:[
        'Login'
    ],
    refs:[
         {ref:'loginWindow', selector:'login'},
         {ref:'loginForm', selector:'form'}
    ],
    
    login:function () {
    	var form = this.getLoginForm();
    	if(!form.getForm().isValid()){
    		Aicl.Util.msg('Empty fields','please write username and password');
    		return;
    	}
        var me=this;
    	var record = form.getValues();
				Aicl.Util.login({
					success : function(result) {
						me.getLoginWindow().hide()
						me.createMenu();
						me.startPolling();
					},
					failure : function(response, options) {
						console.log(arguments);
					},
					params : record
				});
    	
    },
    
    keyenter:function (item, event) {
        if (event.getKey() == event.ENTER) {
            this.login();
        }

    },
    
    createMenu: function(){
		var me = this;
		var buttons=[];
		var i=0;
		var grupos = Aicl.Util.getRoles();
		for(var grupo in grupos ){
			if(grupos[grupo].Directory){
				buttons[i]= Ext.create('Ext.Button', {
    				text    : grupos[grupo].Title,
    				directory:grupos[grupo].Directory,
    				scale   : 'small',
    				handler	: function(){
    				Ext.getDom('iframe-win').src = 'modules/'+this.directory;
    				}
				});
				i++;
			}
		};
		
		buttons[i]= Ext.create('Ext.Button', {
	    	text    : 'Salir',
	    	scale   : 'small',
	    	handler	: function(){
	    		Aicl.Util.logout({
	    			callback:function(result, success){
	    				me.stopPolling();
	    				vp.destroy();
	    				me.getLoginWindow().show();
	    			}
	    		});
	    	}
		});
		
    	var vp=Ext.create('Ext.Viewport', {
        	layout: {
        		type: 'border',
            	padding: 2
        	},
        	defaults: {
            	split: true
        	},
        	items: [{
            	region: 'west',
            	layout:'fit',
            	items:[{
            		layout: {                        
    	    			type: 'vbox',
        				align:'stretch'
    				},
    				defaults:{margins:'2 2 2 2'},
        			items:buttons
            	}],
            	collapsible: true,
            	split: true,
            	width: '18%'
        	},{
            	region: 'center',
            	layout:'fit',
            	items:[{
        			xtype : 'component',
        			id    : 'iframe-win', 
        			autoEl : {
	            		tag : 'iframe',
            			src : 'intro.html'
        			}
            	}]
        	}]
    	});
	},
	
	onLaunch: function(application){
		this.task={
		    run: function(){
		        Aicl.Util.executeAjaxRequest({url:Aicl.Util.getUrlApi()+'/Refresh', method:'GET'});
		    },
		    interval: 60000*15 // every 15 minutes
		};
		this.runner = new Ext.util.TaskRunner();
    },
    
    startPolling:function(){
    	this.runner.start(this.task);
    },
    
    stopPolling:function(){
    	if(this.runner && this.task)
    	 	this.runner.stop(this.task);
    }
    
});
