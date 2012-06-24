Ext.define('App.view.authentication.List',{ 
    extend: 'Ext.grid.Panel',
    alias : 'widget.authenticationlist', 
    constructor: function(config){
    	config= config|| {};
    	config.store= config.store|| 'Authentication',
        config.frame = config.frame==undefined? false:config.frame;
		config.selType = config.selType || 'rowmodel';
    	config.height = config.height||350;
    	config.width = config.width || 600;
    	config.viewConfig = config.viewConfig || {
        	stripeRows: true
	    };
        config.margin=config.margin|| '2 2 2 2';	
    	if (arguments.length==0 )
    		this.callParent([config]);
    	else
    		this.callParent(arguments); 
    },
    
    initComponent: function() {
        
        this.columns=[
	{
		text: 'UserName',
		dataIndex: 'UserName',
		flex: 1,
		sortable: true
	},
	{
		text: 'Password',
		dataIndex: 'Password',
		sortable: true
	}
];
 
        this.dockedItems=[{
            xtype: 'toolbar',
            items: [{
                text:'New',
                tooltip:'add new record',
                iconCls:'add',
                disabled:true,
                action: 'new'
            },'-',{
                text:'Delete',
                tooltip:'delete selected record',
                iconCls:'remove',
                disabled:true,
                action: 'delete'
            }]		
        }]
                
        this.callParent(arguments);
    }
});
