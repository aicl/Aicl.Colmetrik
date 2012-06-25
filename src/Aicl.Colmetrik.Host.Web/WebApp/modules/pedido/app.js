Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('App', '../app');
    
Ext.application({
name: 'App',
appFolder: '../app',
launch: function(){
    Ext.create('Ext.form.Panel',{
  	width:990,
    id:'panelModule',
    frame: true,
    renderTo: 'module',
    layout: {
        type: 'table',
        columns: 2
    },
    items:[
     	{xtype:'pedidolist'},
       	{
			xtype:'panel',
			height:496,
			width:440,
			baseCls:'x-plain',
			layout: {
    		type: 'vbox'       
    		},
			items:[
				{ xtype:'pedidoform'}
			]	
		},
		{xtype:'pedidoitemlist'},
        {
			xtype:'panel',
			height:192,
			width:440,
			baseCls:'x-plain',
			layout: {
       			type: 'vbox'       
    		},
			items:[
				{ xtype:'pedidoitemform'}
			]	
		},
		{ xtype:'resumenpedidoform'}		
    ]
    });
    var controller =this.getController('Pedido');
    var rpf= controller.getResumenPedidoForm();
    var store = controller.getPedidoStore();
    //store.getProxy().setExtraParam('P_1', 'v_1');
    //store.getProxy().setExtraParam('P_2', 'v_2');	
    store.loadPage(1);
    
    var piController=this.getController('PedidoItem');
    
    piController.onload(
    function(piStore , records,  successful,  eOpts ){
    	var subtotal=0, iva =0, total =0;
    	if(successful){
    		if(piStore.count()>0){
    			var piForm= piController.getPedidoItemForm();
    			piForm.getForm().loadRecord(piStore.getAt(0));
    			piStore.each(function(rec){
    				var item= rec.get('Cantidad')*rec.get('PrecioUnidad');
    				subtotal+= item-item*rec.get('Descuento')/100.00;
    			},this);
    			var pr = store.getById(piStore.getAt(0).get('IdPedido'));
    			iva= subtotal*pr.get('Cargo')/100.00;
    			total= subtotal+iva;
    		}	
    	}
    	
    	rpf.getForm().setValues({
    		Subtotal:Aicl.Util.formatCurrency(subtotal),
    		Iva:Aicl.Util.formatCurrency(iva),
    		Total:Aicl.Util.formatCurrency(total)
    	});
    }, this);
        
    
        
    controller.onselectionchange(
    function( sm,  selections,  eOpts){
    	
    	var tiempo, realizadoPor;
    	if (selections.length){
    		var record= selections[0];
        	piController.getPedidoItemStore().load({params:{IdPedido: record.getId()}});
        	piController.getPedidoItemList().determineScrollbars();
        	tiempo= record.get('DiasDeServicio');
        	realizadoPor= record.get('_NombreApellidos');
        }
        else{
        	piController.refreshForm();
        	rpf.getForm().reset();
        	piController.getPedidoItemStore().removeAll();
        }
        
        rpf.getForm().setValues({
    		Tiempo:tiempo,
    		RealizadoPor:realizadoPor
    	});
        
    }, this);
        
},
    
controllers: ['Pedido','PedidoItem']
    
});

Ext.define('App.view.resumenpedido.Form', {
    extend: 'Ext.form.Panel',
    alias : 'widget.resumenpedidoform',
    ui:'default-framed',
    constructor: function(config){
    	config=config|| {};
    	config.frame=config.frame==undefined?false: config.frame;
    	config.margin=config.margin|| '2 2 2 2px';
    	config.bodyStyle = config.bodyStyle ||'padding:0px 0px 0px 0px';
    	config.width = config.width|| 600;
        config.height = config.height|| 160;
        config.autoScroll= config.autoScroll==undefined? true: config.autoScroll,
		config.fieldDefaults = config.fieldDefaults || {
            msgTarget: 'side',
            labelWidth: 180,
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
		name: 'Subtotal',
		fieldLabel: 'Subtotal'
	},
	{
		name: 'Iva',
		fieldLabel: 'Iva'
	},
	{
		name: 'Total',
		fieldLabel: 'Total'
	},
	{
		name: 'Tiempo',
		fieldLabel: 'Dias habiles para la prestacion del servicio'
	},
	{
		name: 'RealizadoPor',
		fieldLabel: 'Realizado por'
	}
];
  
        this.callParent(arguments);
    }
});