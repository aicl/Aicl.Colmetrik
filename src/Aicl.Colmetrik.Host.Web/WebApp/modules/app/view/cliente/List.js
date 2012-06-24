Ext.define('App.view.cliente.List',{ 
    extend: 'Ext.grid.Panel',
    alias : 'widget.clientelist', 
    constructor: function(config){
    	config= config|| {};
    	config.store= config.store|| 'Cliente',
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
		text: 'Nit',
		dataIndex: 'Nit',
		flex: 1,
		sortable: true
	},
	{
		text: 'NombreCompania',
		dataIndex: 'NombreCompania',
		sortable: true
	},
	{
		text: 'Nombrecontacto',
		dataIndex: 'Nombrecontacto',
		sortable: true
	},
	{
		text: 'Cargocontacto',
		dataIndex: 'Cargocontacto',
		sortable: true
	},
	{
		text: 'Direccion',
		dataIndex: 'Direccion',
		sortable: true
	},
	{
		text: 'Ciudad',
		dataIndex: 'Ciudad',
		sortable: true
	},
	{
		text: 'Region',
		dataIndex: 'Region',
		sortable: true
	},
	{
		text: 'Correo',
		dataIndex: 'EMail',
		sortable: true
	},
	{
		text: 'Pais',
		dataIndex: 'Pais',
		sortable: true
	},
	{
		text: 'Telefono',
		dataIndex: 'Telefono',
		sortable: true
	},
	{
		text: 'Fax',
		dataIndex: 'Fax',
		sortable: true
	},
	{
		text: 'Temperatura',
		dataIndex: 'Temperatura',
		sortable: true
	},
	{
		text: 'Volumen',
		dataIndex: 'Volumen',
		sortable: true
	},
	{
		text: 'TYF',
		dataIndex: 'TYF',
		sortable: true
	},
	{
		text: 'Humedad',
		dataIndex: 'Humedad',
		sortable: true
	},
	{
		text: 'Presion',
		dataIndex: 'Presion',
		sortable: true
	},
	{
		text: 'MagnitudesElectricas',
		dataIndex: 'MagnitudesElectricas',
		sortable: true
	},
	{
		text: 'NombreContacto2',
		dataIndex: 'NombreContacto2',
		sortable: true
	},
	{
		text: 'TelefonoContacto2',
		dataIndex: 'TelefonoContacto2',
		sortable: true
	},
	{
		text: 'Correo2',
		dataIndex: 'Correo2',
		sortable: true
	},
	{
		text: 'MasBal',
		dataIndex: 'MasBal',
		sortable: true
	},
	{
		text: 'OtrosServicios',
		dataIndex: 'OtrosServicios',
		sortable: true
	},
	{
		text: 'Contado',
		dataIndex: 'Contado',
		sortable: true
	},
	{
		text: 'Credito',
		dataIndex: 'Credito',
		sortable: true
	},
	{
		text: 'CantidadDias',
		dataIndex: 'CantidadDias',
		sortable: true
	},
	{
		text: 'Observaciones',
		dataIndex: 'Observaciones',
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
