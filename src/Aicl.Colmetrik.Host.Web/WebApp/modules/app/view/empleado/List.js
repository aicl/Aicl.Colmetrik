Ext.define('App.view.empleado.List',{ 
    extend: 'Ext.grid.Panel',
    alias : 'widget.empleadolist', 
    constructor: function(config){
    	config= config|| {};
    	config.store= config.store|| 'Empleado',
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
		text: 'Apellidos',
		dataIndex: 'Apellidos',
		flex: 1,
		sortable: true
	},
	{
		text: 'Nombre',
		dataIndex: 'Nombre',
		sortable: true
	},
	{
		text: 'Cargo',
		dataIndex: 'Cargo',
		sortable: true
	},
	{
		text: 'Tratamiento',
		dataIndex: 'Tratamiento',
		sortable: true
	},
	{
		text: 'FechaNacimiento',
		dataIndex: 'FechaNacimiento',
		sortable: true,
		renderer: Ext.util.Format.dateRenderer('d.m.Y')
	},
	{
		text: 'FechaContratacion',
		dataIndex: 'FechaContratacion',
		sortable: true,
		renderer: Ext.util.Format.dateRenderer('d.m.Y')
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
		text: 'TelDomicilio',
		dataIndex: 'TelDomicilio',
		sortable: true
	},
	{
		text: 'Extension',
		dataIndex: 'Extension',
		sortable: true
	},
	{
		text: 'Foto',
		dataIndex: 'Foto',
		sortable: true
	},
	{
		text: 'Notas',
		dataIndex: 'Notas',
		sortable: true
	},
	{
		text: 'Jefe',
		dataIndex: 'Jefe',
		sortable: true,
		renderer: function(value, metadata, record, store){
           	if(value>=0){
            	return '<div class="x-cell-positive">'+Aicl.Util.formatInt(value)+'</div>';
        	}else{
            	return '<div class="x-cell-negative">'+Aicl.Util.formatInt(value)+'</div>';
        	}
        }
	},
	{
		text: 'Firma',
		dataIndex: 'Firma',
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
