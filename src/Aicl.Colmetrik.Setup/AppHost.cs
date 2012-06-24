using System;
using System.Data;
using System.Reflection;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Configuration;
using Funq;
using ServiceStack.CacheAccess;
using ServiceStack.CacheAccess.Providers;
using ServiceStack.Redis;
using ServiceStack.Common.Web;
using ServiceStack.Common.Utils;
using ServiceStack.Configuration;
using ServiceStack.Logging;
using ServiceStack.Logging.Support.Logging;
using ServiceStack.Logging.Log4Net ;
using ServiceStack.WebHost.Endpoints;
using ServiceStack.ServiceInterface.Auth;
using ServiceStack.ServiceInterface;
using ServiceStack.OrmLite;
using ServiceStack.OrmLite.MySql;

using Aicl.Colmetrik.Model.Types;
using Aicl.Colmetrik.DataAccess;
using Aicl.Colmetrik.Interface;


namespace Aicl.Colmetrik.Setup
{
	public class AppHost:AppHostHttpListenerBase
	{
		private static ILog log;
		
		public AppHost (): base("Aicl.Colmetrik", typeof(AuthenticationService).Assembly)
		{
			LogManager.LogFactory = new ConsoleLogFactory();
			log = LogManager.GetLogger(typeof (AppHost));
		}
		
		public override void Configure(Container container)
		{
			//Permit modern browsers (e.g. Firefox) to allow sending of any REST HTTP Method
			base.SetConfig(new EndpointHostConfig
			{
				GlobalResponseHeaders =
					{
						{ "Access-Control-Allow-Origin", "*" },
						{ "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS" },
					},
				  DefaultContentType = ContentType.Json 
			});
						
			var config = new AppConfig(new ConfigurationResourceManager());
			container.Register(config);
						
            OrmLiteConfig.DialectProvider= MySqlDialectProvider.Instance;
			
			IDbConnectionFactory dbFactory = new OrmLiteConnectionFactory(
				ConfigUtils.GetConnectionString("ApplicationDb"));
			
			container.Register<Factory>(
				new Factory(){
					DbFactory=dbFactory
				}
			);
			

            log.InfoFormat("Configurando sistema de autenticacion");
			var cu = ConfigureAuth(container);

            log.InfoFormat("Configurando role Admin");
            ConfigurePermissions(dbFactory, cu);
			
			log.InfoFormat("AppHost Configured: " + DateTime.Now);
		}
		
		
        private void ConfigurePermissions(IDbConnectionFactory factory, CreatedUsers users)
        {

            var appSettings = new ConfigurationResourceManager();

            if (!appSettings.Get<bool>("CreatePermissionsTables", false) ||
                !appSettings.Get("AddUsers", false)) return ;

            factory.Exec(dbCmd=>{

                log.InfoFormat("Creando tablas");
                dbCmd.CreateTable<AuthPermission>();
                dbCmd.CreateTable<AuthRole>();
                dbCmd.CreateTable<AuthRolePermission>();
                dbCmd.CreateTable<AuthRoleUser>();
                log.InfoFormat("Tablas creadas");

                AuthRole aur= dbCmd.FirstOrDefault<AuthRole>(r=> r.Name=="Admin");
                if(aur==default(AuthRole))
                {
                    log.InfoFormat("Creando Admin Role");
                    aur= new AuthRole(){Name="Admin", Title="Admin"};
                    dbCmd.Insert(aur);
                    aur.Id=Convert.ToInt32(dbCmd.GetLastInsertId());
                    log.InfoFormat("Admin Role Creado");
                }

                AuthRoleUser auru= dbCmd.FirstOrDefault<AuthRoleUser>(r=> r.IdAuthRole==aur.Id &&
                                                                      r.IdUsuario==users.Admin.Id);
                if(auru==default(AuthRoleUser))
                {
                    log.InfoFormat("Asignando  Admin Role al usuario Admin");
                    auru=new AuthRoleUser(){IdUsuario=users.Admin.Id, IdAuthRole= aur.Id};
                    dbCmd.Insert(auru);
                    log.InfoFormat("Admin Role asignado al usuario Admin");
                }


             });

        }

		
		private CreatedUsers ConfigureAuth(Container container){
			
			var appSettings = new ConfigurationResourceManager();
			double se= appSettings.Get("DefaultSessionExpiry", 480);
			AuthProvider.DefaultSessionExpiry=TimeSpan.FromMinutes(se);			

			if (appSettings.Get("EnableRedisForAuthCache", false)){
				string cacheHost= appSettings.Get("AuthCacheHost", "localhost:6379");			
				int cacheDb= appSettings.Get("AuthCacheDb",8);				
										
				string cachePassword= appSettings.Get("AuthCachePassword",string.Empty);
						
				var p = new PooledRedisClientManager(new string[]{cacheHost},
							new string[]{cacheHost},
							cacheDb); 
				
				if(! string.IsNullOrEmpty(cachePassword))
					p.GetClient().Password= cachePassword;
				
				container.Register<ICacheClient>(p);
			}
			else
			{
				container.Register<ICacheClient>(new MemoryCacheClient());	
			}
			
			Plugins.Add(new AuthFeature(
				 () => new AuthUserSession(), // or Use your own typed Custom AuthUserSession type
				new IAuthProvider[]
        	{
				new AuthenticationProvider(){SessionExpiry=TimeSpan.FromMinutes(se)}
        	})
			{
				IncludeAssignRoleServices=false, 
			});
		    				
			var dbFactory = new OrmLiteConnectionFactory(ConfigUtils.GetConnectionString("UserAuth")) ;
			
			OrmLiteAuthRepository authRepo = new OrmLiteAuthRepository(
				dbFactory
			);
			
			container.Register<IUserAuthRepository>(
				c => authRepo
			); //Use OrmLite DB Connection to persist the UserAuth and AuthProvider info

			
			if (appSettings.Get("EnableRegistrationFeature", false))
				Plugins.Add( new  RegistrationFeature());
			
			
			
			if (!appSettings.Get("AddUsers", false)) return default(CreatedUsers);
			
			
			// addusers
			var oldL =MySqlDialectProvider.Instance.DefaultStringLength;
			
			MySqlDialectProvider.Instance.DefaultStringLength=64;
			if (appSettings.Get("RecreateAuthTables", false))
				authRepo.DropAndReCreateTables(); //Drop and re-create all Auth and registration tables
			else{
				authRepo.CreateMissingTables();   //Create only the missing tables				
			}
			MySqlDialectProvider.Instance.DefaultStringLength=oldL;
						
		    //Add admin user  
			string userName = "admin";
			string password = "aqPxym161t";
		
			List<string> permissions= new List<string>(
			new string[]{	
		
			});
			
            CreatedUsers cu = new CreatedUsers();

            var userAuth=authRepo.GetUserAuthByUserName(userName);

			if ( userAuth== default(UserAuth) ){
                log.InfoFormat("creando usuario:'{0}'", userName);
				List<string> roles= new List<string>();
				roles.Add(RoleNames.Admin);
			    string hash;
			    string salt;
			    new SaltedHash().GetHashAndSaltString(password, out hash, out salt);
			    authRepo.CreateUserAuth(new UserAuth {
				    DisplayName = userName,
			        Email = userName+"@mail.com",
			        UserName = userName,
			        FirstName = "",
			        LastName = "",
			        PasswordHash = hash,
			        Salt = salt,
					Roles =roles,
					Permissions=permissions
			    }, password);
                log.InfoFormat("Usuario:'{0}' creado", userName);
                userAuth= authRepo.GetUserAuthByUserName(userName);
			}
			
            cu.Admin= userAuth;

			userName = "alfredo.ramon";
			password = "74wdln12";
		
			permissions= new List<string>(
			new string[]{	
			
			});
			
            userAuth= authRepo.GetUserAuthByUserName(userName);
			if ( userAuth== default(UserAuth) ){
                log.InfoFormat("creando usuario:'{0}'", userName);
				List<string> roles= new List<string>();
				roles.Add("User");
				string hash;
			    string salt;
			    new SaltedHash().GetHashAndSaltString(password, out hash, out salt);
			    authRepo.CreateUserAuth(new UserAuth {
				    DisplayName = "Alfredo Ramon",
			        Email = "alfredoramon@colmetrik.com",
			        UserName = userName,
			        FirstName = "Alfredo",
			        LastName = "Ramon",
			        PasswordHash = hash,
			        Salt = salt,
					Roles =roles,
					Permissions=permissions
			    }, password);
                userAuth= authRepo.GetUserAuthByUserName(userName);
                log.InfoFormat("Usuario:'{0}' creado", userName);
			}

            cu.User= userAuth;

            return cu;
		}
		
	}

    public class CreatedUsers
    {
        public CreatedUsers(){}

        public UserAuth Admin {get; set;}
        public UserAuth User {get; set;}
    }
}