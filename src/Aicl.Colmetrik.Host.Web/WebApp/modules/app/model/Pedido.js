Ext.define('App.model.Pedido',{
	extend: 'Ext.data.Model',
	idProperty: 'Id',
	fields: 
	[
		{
			name: 'Id',
			type: 'int'
		},
		{
			name: 'IdEmpleado',
			type: 'int'
		},
		{
			name: 'FechaPedido',
			type: 'date',
			convert: function(v){return Aicl.Util.convertToDate(v);}
		},
		{
			name: 'FechaEntrega',
			type: 'date',
			convert: function(v){return Aicl.Util.convertToDate(v);}
		},
		{
			name: 'FechaEnvio',
			type: 'date',
			convert: function(v){return Aicl.Util.convertToDate(v);}
		},
		{
			name: 'Cargo',
			type: 'number'
		},
		{
			name: 'Destinatario',
			type: 'string'
		},
		{
			name: 'DireccionDestinatario',
			type: 'string'
		},
		{
			name: 'CiudadDestinatario',
			type: 'string'
		},
		{
			name: 'TelefonoDestinatario',
			type: 'string'
		},
		{
			name: 'FaxDestinatario',
			type: 'string'
		},
		{
			name: 'PaisDestinatario',
			type: 'string'
		},
		{
			name: 'DiasDeServicio',
			type: 'string'
		},
		{
			name: 'IdCliente',
			type: 'int'
		},
		{
			name: 'Nit',
			type: 'string'
		},
		{
			name: 'NombreCompania',
			type: 'string'
		},
		{
			name: 'EMail',
			type: 'string'
		},
		{
			name: 'Ciudad',
			type: 'string'
		},
		{
			name: 'Pais',
			type: 'string'
		},
		{
			name: 'Nombre',
			type: 'string'
		},
		{
			name: 'Apellidos',
			type: 'string'
		},
		{
			name: 'EstadoEnvio',
			type: 'string'
		},
		{
			name:'_CiudadPais',
			type: 'string',
			convert: function(v,record){return record.data.Ciudad+' - '+ record.data.Pais;}
		},
		{
			name:'_CiudadPaisDestinatario',
			type: 'string',
			convert: function(v,record){return record.data.CiudadDestinatario+' - '+ record.data.PaisDestinatario;}
		},
		{
			name:'_TelefonoFaxDestinatario',
			type: 'string',
			convert: function(v,record){return record.data.TelefonoDestinatario+' - '+ record.data.FaxDestinatario;}
		},
		{
			name: '_NombreApellidos',
			type: 'string',
			convert: function(v,record){return record.data.Nombre+' '+ record.data.Apellidos;}
		}
	]
});