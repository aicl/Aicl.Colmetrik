Ext.define('App.model.Equipo',{
	extend: 'Ext.data.Model',
	idProperty: 'Id',
	fields: 
	[
		{
			name: 'Id',
			type: 'int'
		},
		{
			name: 'Nombre',
			type: 'string'
		},
		{
			name: 'Fabricante',
			type: 'string'
		},
		{
			name: 'Modelo',
			type: 'string'
		},
		{
			name: 'Rangos',
			type: 'string'
		},
		{
			name: 'Resolucion',
			type: 'string'
		},
		{
			name: 'Especificacion',
			type: 'string'
		},
		{
			name: 'DispositivoIndicadorAjuste',
			type: 'string'
		},
		{
			name: 'Otros',
			type: 'string'
		},
		{
			name: 'Manual',
			type: 'string'
		}
	]
});