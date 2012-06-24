Ext.define('App.view.proveedor.List',{ 
    extend: 'Ext.grid.Panel',
    alias : 'widget.proveedorlist', 
    constructor: function(config){
    	config= config|| {};
    	config.store= config.store|| 'Proveedor',
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
		text: 'Nombre',
		dataIndex: 'Nombre',
		flex: 1,
		sortable: true
	},
	{
		text: 'NombreContacto',
		dataIndex: 'NombreContacto',
		sortable: true
	},
	{
		text: 'CargoContacto',
		dataIndex: 'CargoContacto',
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
		text: 'CodPostal',
		dataIndex: 'CodPostal',
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
		text: 'PaginaPrincipal',
		dataIndex: 'PaginaPrincipal',
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
