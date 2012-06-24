Ext.define('App.view.equipo.List',{ 
    extend: 'Ext.grid.Panel',
    alias : 'widget.equipolist', 
    constructor: function(config){
    	config= config|| {};
    	config.store= config.store|| 'Equipo',
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
		text: 'Fabricante',
		dataIndex: 'Fabricante',
		sortable: true
	},
	{
		text: 'Modelo',
		dataIndex: 'Modelo',
		sortable: true
	},
	{
		text: 'Rangos',
		dataIndex: 'Rangos',
		sortable: true
	},
	{
		text: 'Resolucion',
		dataIndex: 'Resolucion',
		sortable: true
	},
	{
		text: 'Especificacion',
		dataIndex: 'Especificacion',
		sortable: true
	},
	{
		text: 'DispositivoIndicadorAjuste',
		dataIndex: 'DispositivoIndicadorAjuste',
		sortable: true
	},
	{
		text: 'Otros',
		dataIndex: 'Otros',
		sortable: true
	},
	{
		text: 'Manual',
		dataIndex: 'Manual',
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
