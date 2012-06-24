Ext.define('App.view.producto.Form', {
    extend: 'Ext.form.Panel',
    alias : 'widget.productoform',
    ui:'default-framed',
    constructor: function(config){
    	config=config|| {};
    	config.frame=config.frame==undefined?false: config.frame;
    	config.margin=config.margin|| '0 0 0 5px';
    	config.bodyStyle = config.bodyStyle ||'padding:0px 0px 0px 0px';
    	config.width = config.width|| 365;
        config.height = config.height|| 240;
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
		name: 'Nombre',
		fieldLabel: 'Nombre',
		allowBlank: false,
		maxLength: 500,
		enforceMaxLength: true
	},
	{
		xtype: 'numberfield',
		allowDecimals: false,
		name: 'IdProveedor',
		fieldLabel: 'IdProveedor'
	},
	{
		xtype: 'numberfield',
		allowDecimals: false,
		name: 'IdCategoria',
		fieldLabel: 'IdCategoria'
	},
	{
		xtype: 'numberfield',
		name: 'PrecioUnidad',
		fieldLabel: 'PrecioUnidad'
	},
	{
		xtype: 'checkboxfield',
		name: 'Suspendido',
		fieldLabel: 'Suspendido',
		allowBlank: false
	},
	{
		name: 'Procedimiento',
		fieldLabel: 'Procedimiento',
		maxLength: 4096,
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