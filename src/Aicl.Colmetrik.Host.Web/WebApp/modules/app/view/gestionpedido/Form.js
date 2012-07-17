Ext.define('App.view.gestionpedido.Form', {
    extend: 'Ext.form.Panel',
    alias : 'widget.gestionpedidoform',
    ui:'default-framed',
    constructor: function(config){
    	config=config|| {};
    	config.frame=config.frame==undefined?false: config.frame;
    	config.margin=config.margin|| '0 0 0 5px';
    	config.bodyStyle = config.bodyStyle ||'padding:0px 0px 0px 0px';
    	//config.width = config.width|| 365
        //config.height = config.height|| 594;
        config.autoScroll= config.autoScroll==undefined? true: config.autoScroll,
		config.fieldDefaults = config.fieldDefaults || {
            msgTarget: 'side',
            labelWidth: 80,
			labelAlign: 'right'
        };
        config.defaultType = config.defaultType|| 'textfield';
        config.defaults = config.defaults || {
            anchor: '100%',
			labelStyle: 'padding-left:4px;'
        };
		config.layout= {
            type: 'table',
            columns: 3
        };

		config.style= {	border: 0, padding: 0};

    	if (arguments.length==0 )
    		this.callParent([config]);
    	else
    		this.callParent(arguments);
    },
     
    initComponent: function() {
        this.items = [
	{ 
		xtype: 'toolbar',
		colspan:3,
	 	items: [{
			tooltip:'crear nueva cotizacion',
      		iconCls:'new_document',
        	action:'createEmpty'
        },{
            xtype:'textfield',
            emptyText:'Numero de la cotizacion',
            name: 'textFindCotizacion'
        },{
            tooltip:'abrir cotizacion',
            iconCls:'open_document',
            action: 'abrirCotizacion'
        },{
            tooltip:'Guardar cotizacion',
            iconCls:'save_document',
            action: 'guardarCotizacion'
        }]
	},
	{
		xtype:'fieldset',
		title: 'Oferta Para:',
		collapsible: false,
        defaultType: 'textfield',
        defaults: {anchor: '100%',width:325},
		height: 180,
        layout: 'anchor',
		items:[{		
			name: 'Destinatario',
			fieldLabel: 'Destinatario',
			maxLength: 80,
			enforceMaxLength: true
		},
		{
			name: 'DireccionDestinatario',
			fieldLabel: 'Direccion',
			maxLength: 120,
			enforceMaxLength: true
		},
		{
			name: '_TelefonoFaxDestinatario',
			fieldLabel: 'Telefono',
			maxLength: 100,
			enforceMaxLength: true
		},
		{
			name: '_CiudadPaisDestinatario',
			fieldLabel: 'Ciudad',
			maxLength: 100,
			enforceMaxLength: true
		}]
	}, 
	{
		xtype:'fieldset',
		title: 'Solicitado Por:',
		collapsible: false,
        defaultType: 'textfield',
        defaults: {anchor: '100%', width:325},
		height: 180,
        layout: 'anchor',
		items:[
			{
				name: 'NombreCompania',
				fieldLabel: 'Cliente'
			},
			{
				name: 'Nit',
				fieldLabel: 'Nit'
			},
			{
				name: 'EMail',
				fieldLabel: 'Correo'
			},
			{
				name: '_CiudadPais',
				fieldLabel: 'Ciudad'
			}
		]
    },
    {
		xtype:'fieldset',
		title: 'Oferta:',
		collapsible: false,
        defaultType: 'textfield',
        defaults: {anchor: '100%',width:230},
        layout: 'anchor',
		height: 180,
		items:[{
			name: 'Id',
			fieldLabel: 'Solicitud'
		},
	{
		xtype: 'datefield',
		name: 'FechaPedido',
		fieldLabel: 'FechaPedido',
		format: 'd.m.Y'
	},
	{
		xtype: 'datefield',
		name: 'FechaEntrega',
		fieldLabel: 'FechaEntrega',
		format: 'd.m.Y'
	},
	{
		xtype: 'datefield',
		name: 'FechaEnvio',
		fieldLabel: 'FechaEnvio',
		format: 'd.m.Y'
	},
	{
		name: 'EstadoEnvio',
		fieldLabel: 'VoBo DL',
		allowBlank: false
	}	
		]
    }
];
  
        this.callParent(arguments);
    }
});
