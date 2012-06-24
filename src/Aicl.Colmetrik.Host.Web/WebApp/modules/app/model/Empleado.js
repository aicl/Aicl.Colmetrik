Ext.define('App.model.Empleado',{
	extend: 'Ext.data.Model',
	idProperty: 'Id',
	fields: 
	[
		{
			name: 'Id',
			type: 'int'
		},
		{
			name: 'Apellidos',
			type: 'string'
		},
		{
			name: 'Nombre',
			type: 'string'
		},
		{
			name: 'Cargo',
			type: 'string'
		},
		{
			name: 'Tratamiento',
			type: 'string'
		},
		{
			name: 'FechaNacimiento',
			type: 'date',
			convert: function(v){return Aicl.Util.convertToDate(v);}
		},
		{
			name: 'FechaContratacion',
			type: 'date',
			convert: function(v){return Aicl.Util.convertToDate(v);}
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
			name: 'CodPostal',
			type: 'string'
		},
		{
			name: 'Pais',
			type: 'string'
		},
		{
			name: 'TelDomicilio',
			type: 'string'
		},
		{
			name: 'Extension',
			type: 'string'
		},
		{
			name: 'Foto',
			type: 'string'
		},
		{
			name: 'Notas',
			type: 'string'
		},
		{
			name: 'Jefe',
			type: 'int'
		},
		{
			name: 'Firma',
			type: 'string'
		}
	]
});