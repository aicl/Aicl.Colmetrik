Ext.define('App.view.pedidoitem.Form', {
    extend: 'Ext.form.Panel',
    alias : 'widget.pedidoitemform',
    ui:'default-framed',
    constructor: function(config){
    	config=config|| {};
    	config.frame=config.frame==undefined?false: config.frame;
    	config.margin=config.margin|| '0 0 0 5px';
    	config.bodyStyle = config.bodyStyle ||'padding:0px 0px 0px 0px';
    	config.width = config.width|| 365;
        config.height = config.height|| 190;
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
		xtype:'fieldset',
		title: 'Procedimiento:',
		collapsible: true,
        defaults: {anchor: '100%'},
        layout: 'anchor',
		items:[{
			xtype:'textareafield',
			name: 'Procedimiento',
			height:125
			
		}]
	}
];
 
        
 
        this.callParent(arguments);
    }
});