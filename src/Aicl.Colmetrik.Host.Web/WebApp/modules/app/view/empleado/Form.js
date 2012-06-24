Ext.define('App.view.empleado.Form', {
    extend: 'Ext.form.Panel',
    alias : 'widget.empleadoform',
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
		name: 'Apellidos',
		fieldLabel: 'Apellidos',
		allowBlank: false,
		maxLength: 60,
		enforceMaxLength: true
	},
	{
		name: 'Nombre',
		fieldLabel: 'Nombre',
		allowBlank: false,
		maxLength: 60,
		enforceMaxLength: true
	},
	{
		name: 'Cargo',
		fieldLabel: 'Cargo',
		maxLength: 60,
		enforceMaxLength: true
	},
	{
		name: 'Tratamiento',
		fieldLabel: 'Tratamiento',
		maxLength: 60,
		enforceMaxLength: true
	},
	{
		xtype: 'datefield',
		name: 'FechaNacimiento',
		fieldLabel: 'FechaNacimiento',
		format: 'd.m.Y'
	},
	{
		xtype: 'datefield',
		name: 'FechaContratacion',
		fieldLabel: 'FechaContratacion',
		format: 'd.m.Y'
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
		maxLength: 30,
		enforceMaxLength: true
	},
	{
		name: 'Region',
		fieldLabel: 'Region',
		maxLength: 30,
		enforceMaxLength: true
	},
	{
		name: 'CodPostal',
		fieldLabel: 'CodPostal',
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
		name: 'TelDomicilio',
		fieldLabel: 'TelDomicilio',
		maxLength: 48,
		enforceMaxLength: true
	},
	{
		name: 'Extension',
		fieldLabel: 'Extension',
		maxLength: 8,
		enforceMaxLength: true
	},
	{
		name: 'Foto',
		fieldLabel: 'Foto',
		maxLength: 510,
		enforceMaxLength: true
	},
	{
		name: 'Notas',
		fieldLabel: 'Notas',
		maxLength: 1024,
		enforceMaxLength: true
	},
	{
		xtype: 'numberfield',
		allowDecimals: false,
		name: 'Jefe',
		fieldLabel: 'Jefe'
	},
	{
		name: 'Firma',
		fieldLabel: 'Firma',
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