Ext.define('App.view.authrole.Form', {
    extend: 'Ext.form.Panel',
    alias : 'widget.authroleform',
    ui:'default-framed',
    constructor: function(config){
    	config=config|| {};
    	config.frame=config.frame==undefined?false: config.frame;
    	config.margin=config.margin|| '0 0 0 5px';
    	config.bodyStyle = config.bodyStyle ||'padding:0px 0px 0px 0px';
    	config.width = config.width|| 365;
        config.height = config.height|| 170;
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
		name: 'Name',
		fieldLabel: 'Name',
		allowBlank: false,
		maxLength: 30,
		enforceMaxLength: true
	},
	{
		name: 'Directory',
		fieldLabel: 'Directory',
		maxLength: 15,
		enforceMaxLength: true
	},
	{
		name: 'ShowOrder',
		fieldLabel: 'ShowOrder',
		maxLength: 2,
		enforceMaxLength: true
	},
	{
		name: 'Title',
		fieldLabel: 'Title',
		allowBlank: false,
		maxLength: 30,
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