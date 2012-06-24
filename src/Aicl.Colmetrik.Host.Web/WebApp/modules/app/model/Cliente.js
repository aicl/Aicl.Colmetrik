Ext.define('App.model.Cliente',{
	extend: 'Ext.data.Model',
	idProperty: 'Id',
	fields: 
	[
		{
			name: 'Id',
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
			name: 'Nombrecontacto',
			type: 'string'
		},
		{
			name: 'Cargocontacto',
			type: 'string'
		},
		{
			name: 'Direccion',
			type: 'string'
		},
		{
			name: 'Ciudad',
			type: 'string'
		},
		{
			name: 'Region',
			type: 'string'
		},
		{
			name: 'EMail',
			type: 'string'
		},
		{
			name: 'Pais',
			type: 'string'
		},
		{
			name: 'Telefono',
			type: 'string'
		},
		{
			name: 'Fax',
			type: 'string'
		},
		{
			name: 'Temperatura',
			type: 'string'
		},
		{
			name: 'Volumen',
			type: 'string'
		},
		{
			name: 'TYF',
			type: 'string'
		},
		{
			name: 'Humedad',
			type: 'string'
		},
		{
			name: 'Presion',
			type: 'string'
		},
		{
			name: 'MagnitudesElectricas',
			type: 'string'
		},
		{
			name: 'NombreContacto2',
			type: 'string'
		},
		{
			name: 'TelefonoContacto2',
			type: 'string'
		},
		{
			name: 'Correo2',
			type: 'string'
		},
		{
			name: 'MasBal',
			type: 'string'
		},
		{
			name: 'OtrosServicios',
			type: 'string'
		},
		{
			name: 'Contado',
			type: 'string'
		},
		{
			name: 'Credito',
			type: 'string'
		},
		{
			name: 'CantidadDias',
			type: 'string'
		},
		{
			name: 'Observaciones',
			type: 'string'
		}
	]
});