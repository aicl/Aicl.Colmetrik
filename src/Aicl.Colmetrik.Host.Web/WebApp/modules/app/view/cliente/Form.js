Ext.define('App.view.cliente.Form', {
    extend: 'Ext.form.Panel',
    alias : 'widget.clienteform',
    ui:'default-framed',
    constructor: function(config){
    	config=config|| {};
    	config.frame=config.frame==undefined?false: config.frame;
    	config.margin=config.margin|| '0 0 0 5px';
    	config.bodyStyle = config.bodyStyle ||'padding:0px 0px 0px 0px';
    	config.width = config.width|| 365;
        config.height = config.height|| 350;
        config.autoScroll= config.autoScroll==undefined? true: config.autoScroll,
		config.fieldDefaults = config.fieldDefaults || {
            msgTarget: 'side',
            labelWidth: 120,
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
		xtype: 'hidden',
		name: 'Id'
	},
	{
		name: 'Nit',
		fieldLabel: 'Nit',
		allowBlank: false,
		maxLength: 26,
		enforceMaxLength: true
	},
	{
		name: 'NombreCompania',
		fieldLabel: 'NombreCompania',
		allowBlank: false,
		maxLength: 200,
		enforceMaxLength: true
	},
	{
		name: 'Nombrecontacto',
		fieldLabel: 'Nombrecontacto',
		maxLength: 60,
		enforceMaxLength: true
	},
	{
		name: 'Cargocontacto',
		fieldLabel: 'Cargocontacto',
		maxLength: 60,
		enforceMaxLength: true
	},
	{
		name: 'Direccion',
		fieldLabel: 'Direccion',
		maxLength: 120,
		enforceMaxLength: true
	},
	{
		name: 'Ciudad',
		fieldLabel: 'Ciudad',
		maxLength: 100,
		enforceMaxLength: true
	},
	{
		name: 'Region',
		fieldLabel: 'Region',
		maxLength: 60,
		enforceMaxLength: true
	},
	{
		name: 'EMail',
		fieldLabel: 'Correo',
		maxLength: 80,
		enforceMaxLength: true
	},
	{
		name: 'Pais',
		fieldLabel: 'Pais',
		maxLength: 30,
		enforceMaxLength: true
	},
	{
		name: 'Telefono',
		fieldLabel: 'Telefono',
		maxLength: 48,
		enforceMaxLength: true
	},
	{
		name: 'Fax',
		fieldLabel: 'Fax',
		maxLength: 48,
		enforceMaxLength: true
	},
	{
		name: 'Temperatura',
		fieldLabel: 'Temperatura',
		maxLength: 510,
		enforceMaxLength: true
	},
	{
		name: 'Volumen',
		fieldLabel: 'Volumen',
		maxLength: 510,
		enforceMaxLength: true
	},
	{
		name: 'TYF',
		fieldLabel: 'TYF',
		maxLength: 510,
		enforceMaxLength: true
	},
	{
		name: 'Humedad',
		fieldLabel: 'Humedad',
		maxLength: 510,
		enforceMaxLength: true
	},
	{
		name: 'Presion',
		fieldLabel: 'Presion',
		maxLength: 510,
		enforceMaxLength: true
	},
	{
		name: 'MagnitudesElectricas',
		fieldLabel: 'MagnitudesElectricas',
		maxLength: 510,
		enforceMaxLength: true
	},
	{
		name: 'NombreContacto2',
		fieldLabel: 'NombreContacto2',
		maxLength: 510,
		enforceMaxLength: true
	},
	{
		name: 'TelefonoContacto2',
		fieldLabel: 'TelefonoContacto2',
		maxLength: 510,
		enforceMaxLength: true
	},
	{
		name: 'Correo2',
		fieldLabel: 'Correo2',
		maxLength: 510,
		enforceMaxLength: true,
		vtype: 'email'
	},
	{
		name: 'MasBal',
		fieldLabel: 'MasBal',
		maxLength: 510,
		enforceMaxLength: true
	},
	{
		name: 'OtrosServicios',
		fieldLabel: 'OtrosServicios',
		maxLength: 510,
		enforceMaxLength: true
	},
	{
		name: 'Contado',
		fieldLabel: 'Contado',
		maxLength: 510,
		enforceMaxLength: true
	},
	{
		name: 'Credito',
		fieldLabel: 'Credito',
		maxLength: 510,
		enforceMaxLength: true
	},
	{
		name: 'CantidadDias',
		fieldLabel: 'CantidadDias',
		maxLength: 510,
		enforceMaxLength: true
	},
	{
		name: 'Observaciones',
		fieldLabel: 'Observaciones',
		maxLength: 510,
		enforceMaxLength: true
	}
];
 
        this.buttons = [{ 
            text:'Add',
            formBind: false,
            disabled:true,
            action:'save'      
	    }];
 
        this.callParent(arguments);
    }
});