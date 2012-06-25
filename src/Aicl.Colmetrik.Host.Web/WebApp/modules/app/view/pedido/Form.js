Ext.define('App.view.pedido.Form', {
    extend: 'Ext.form.Panel',
    alias : 'widget.pedidoform',
    ui:'default-framed',
    constructor: function(config){
    	config=config|| {};
    	config.frame=config.frame==undefined?false: config.frame;
    	config.margin=config.margin|| '0 0 0 5px';
    	config.bodyStyle = config.bodyStyle ||'padding:0px 0px 0px 0px';
    	config.width = config.width|| 365
        config.height = config.height|| 494;
        config.autoScroll= config.autoScroll==undefined? true: config.autoScroll,
		config.fieldDefaults = config.fieldDefaults || {
            msgTarget: 'side',
            labelWidth: 90,
			labelAlign: 'right'
        };
        config.defaultType = config.defaultType|| 'textfield';
        config.defaults = config.defaults || {
            anchor: '100%',
			labelStyle: 'padding-left:4px;'
        };
    	if (arguments.length==0 )
    		this.callParent([config]);
    	else
    		this.callParent(arguments);
    },
     
    initComponent: function() {
        this.items = [
	
	{
		xtype:'fieldset',
		title: 'Oferta Para:',
		collapsible: true,
        defaultType: 'textfield',
        defaults: {anchor: '100%'},
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
		collapsible: true,
        defaultType: 'textfield',
        defaults: {anchor: '100%'},
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
		//title: 'Oferta:',
		//collapsible: false,
        defaultType: 'textfield',
        defaults: {anchor: '100%'},
        layout: 'anchor',
		items:[{
			name: 'Id',
			fieldLabel: 'Solicitud'
		}
		//
		,
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