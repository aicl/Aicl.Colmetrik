Ext.define('App.view.pedido.List',{ 
    extend: 'Ext.grid.Panel',
    alias : 'widget.pedidolist', 
    constructor: function(config){
    	config= config|| {};
    	config.store= config.store|| 'Pedido',
        config.frame = config.frame==undefined? false:config.frame;
		config.selType = config.selType || 'rowmodel';
    	config.height = config.height||494;
    	config.width = config.width || 600;
    	config.viewConfig = config.viewConfig || {
        	stripeRows: true
	    };
        config.margin=config.margin|| '2 2 2 2';	
        
        config.bbar= Ext.create('Ext.PagingToolbar', {
            store: config.store,
            displayInfo: true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display"
        });
        
    	if (arguments.length==0)
    		this.callParent([config]);
    	else
    		this.callParent(arguments); 
    },
    
    initComponent: function() {
        
        this.columns=[
        
    {
		text: 'Solicitud',
		dataIndex: 'Id',
		width:55
	},
	{
		text: 'VoBo',
		dataIndex: 'EstadoEnvio',
		width:80
	},
    {
		text: 'Cliente',
		dataIndex: 'NombreCompania',
		width:180
	},  
	{
		text: 'Nit',
		dataIndex: 'Nit'
		
	},
	{		
		text: 'Pedido',
		dataIndex: 'FechaPedido'
		,
		renderer: Ext.util.Format.dateRenderer('d.m.Y')
	},
	{
		text: 'Entrega',
		dataIndex: 'FechaEntrega',
		renderer: Ext.util.Format.dateRenderer('d.m.Y')
	},
	{
		text: 'Envio',
		dataIndex: 'FechaEnvio',

		renderer: Ext.util.Format.dateRenderer('d.m.Y')
	},
	
	{
		text: 'Cargo',
		dataIndex: 'Cargo',
		renderer: function(value, metadata, record, store){
           	if(value>=0){
            	return '<div class="x-cell-positive">'+Aicl.Util.formatNumber(value)+'</div>';
        	}else{
            	return '<div class="x-cell-negative">'+Aicl.Util.formatNumber(value)+'</div>';
        	}
        }
	},
	{
		text: 'Destinatario',
		dataIndex: 'Destinatario'
	},
	{
		text: 'DireccionDestinatario',
		dataIndex: 'DireccionDestinatario'
		
	},
	{
		text: 'TelefonoDestinatario',
		dataIndex: 'TelefonoDestinatario',
		renderer: function(value, metadata, record, store){
           	return value+ ' '+ record.get('FaxDestinatario');
		}
	},
	{
		text: 'CiudadDestinatario',
		dataIndex: 'CiudadDestinatario',
		renderer: function(value, metadata, record, store){
           	return value+ ' '+ record.get('PaisDestinatario');
		}
	},
	
	{
		text: 'DiasServicio',
		dataIndex: 'DiasDeServicio'
	},
	{
		text: 'Elaborado Por',
		dataIndex: 'Nombre',
		renderer: function(value, metadata, record, store){
           	return value+ ' '+ record.get('Apellidos');
        }
	}
];
 
        this.dockedItems=[{
            xtype: 'toolbar',
            items:[{
                xtype:'textfield',
                emptyText:'Nombre del Cliente',
                name: 'findCustomer'
            },{
                tooltip:'Buscar proveedor',
                iconCls:'find',
                action: 'findCustomer'
            }]		
        }]
                
        this.callParent(arguments);
    }
});
