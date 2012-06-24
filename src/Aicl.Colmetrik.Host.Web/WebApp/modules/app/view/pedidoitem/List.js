Ext.define('App.view.pedidoitem.List',{ 
    extend: 'Ext.grid.Panel',
    alias : 'widget.pedidoitemlist', 
    constructor: function(config){
    	config= config|| {};
    	config.store= config.store|| 'PedidoItem',
        config.frame = config.frame==undefined? false:config.frame;
		config.selType = config.selType || 'rowmodel';
    	config.height = config.height||190;
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
		text: 'Nombre',
		dataIndex: 'Nombre',
		flex:1,
		renderer: function(value, metadata, record, store){
           	
            return "<p style='white-space:normal;color:black;'>" +value+'</p>';
        	
        }
	},
	{
		text: 'Cantidad',
		dataIndex: 'Cantidad',
		width:50,
		renderer: function(value, metadata, record, store){
           	if(value>=0){
            	return '<div class="x-cell-positive">'+Aicl.Util.formatInt(value)+'</div>';
        	}else{
            	return '<div class="x-cell-negative">'+Aicl.Util.formatInt(value)+'</div>';
        	}
        }
	},
	
	{
		text: 'PrecioUnidad',
		dataIndex: 'PrecioUnidad',
		width:90,
		renderer: function(value, metadata, record, store){
           	if(value>=0){
            	return '<div class="x-cell-positive">'+Aicl.Util.formatNumber(value)+'</div>';
        	}else{
            	return '<div class="x-cell-negative">'+Aicl.Util.formatNumber(value)+'</div>';
        	}
        }
	},
	
	{
		text: 'Descuento % ',
		dataIndex: 'Descuento',
		width:70,
		renderer: function(value, metadata, record, store){
           	if(value>=0){
            	return '<div class="x-cell-positive">'+Aicl.Util.formatNumber(value)+'</div>';
        	}else{
            	return '<div class="x-cell-negative">'+Aicl.Util.formatNumber(value)+'</div>';
        	}
        }
	}
	
];
 
        
                
        this.callParent(arguments);
    }
});
