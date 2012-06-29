Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('App', 'modules/app');
    
Ext.application({
name: 'App',
appFolder: 'modules/app',

launch: function(){
	
	Aicl.Util.setUrlModules(location.protocol + '//' + location.host + '/WebApp/modules');
	
	Aicl.Util.setUrlApi(location.protocol + '//' + location.host + '/api');
	Aicl.Util.setHttpUrlApi(location.protocol + '//' + location.host + '/api'+'/json/asynconeway')
		
	Aicl.Util.setUrlLogin(location.protocol + '//' + location.host + '/api/login');
	Aicl.Util.setUrlLogout(location.protocol + '//' + location.host + '/api/logout');
	
	Aicl.Util.setPhotoDir(location.protocol + '//' + location.host +  '' + location.pathname+ 'photos');
	Aicl.Util.setEmptyImgUrl('../../resources/icons/fam/user.png');
	
    var loginWin = Ext.create('App.view.Login');
    loginWin.show();
},
    
controllers: ['Login']
    
});  
