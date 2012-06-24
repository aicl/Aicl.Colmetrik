using System;
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
using ServiceStack.OrmLite;
using ServiceStack.WebHost.Endpoints;
using ServiceStack.ServiceInterface.Auth;
using ServiceStack.ServiceInterface;
using ServiceStack.OrmLite.MySql;

using Aicl.Colmetrik.Model.Types;
using Aicl.Colmetrik.DataAccess;
using Aicl.Colmetrik.Interface;

namespace Aicl.Colmetrik.Host.Web
{
	public class AppHost:AppHostBase
	{
		private static ILog log;
		
		public AppHost (): base("Aicl.Colmetrik", typeof(AuthenticationService).Assembly)
		{

			var appSettings = new ConfigurationResourceManager();
			if (appSettings.Get("EnableLog4Net", false))
			{
				var cf="log4net.conf".MapHostAbsolutePath();
				log4net.Config.XmlConfigurator.Configure(
					new System.IO.FileInfo(cf));
				LogManager.LogFactory = new  Log4NetFactory();
			}
			else
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
						{ "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH" },
					},
				  DefaultContentType = ContentType.Json 
			});
							
									
			ConfigureApp(container);
			log.InfoFormat("AppHost Configured: " + DateTime.Now);
		}
				
		
		
		private void ConfigureApp(Container container){

			var appSettings = new ConfigurationResourceManager();
					
			double se= appSettings.Get("DefaultSessionExpiry", 480);
			AuthProvider.DefaultSessionExpiry=TimeSpan.FromMinutes(se);			

			
			string cacheHost= appSettings.Get("CacheHost", "localhost:6379");			
			int cacheDb= appSettings.Get("CacheDb",8);													
			string cachePassword= appSettings.Get("CachePassword",string.Empty);
					
			var p = new PooledRedisClientManager(new string[]{cacheHost},
						new string[]{cacheHost},
						cacheDb); 
						
			if(! string.IsNullOrEmpty(cachePassword))
			{
				using( IRedisClient rc = p.GetClient())
					rc.Password= cachePassword;
			}
			
			OrmLiteConfig.DialectProvider= MySqlDialectProvider.Instance;
			
			IDbConnectionFactory dbFactory = new OrmLiteConnectionFactory(
				ConfigUtils.GetConnectionString("ApplicationDb"));
						
			container.Register(appSettings);
			
			container.Register<Factory>(
				new Factory(){
					DbFactory=dbFactory,
					RedisClientsManager = p
				}
			);
			
			container.Register<ICacheClient>(p);
						
			Plugins.Add(new AuthFeature(
				 () => new AuthUserSession(), // or Use your own typed Custom AuthUserSession type
				new IAuthProvider[]
        	{
				new AuthenticationProvider(){SessionExpiry=TimeSpan.FromMinutes(se)}
				
        	})
			{
				IncludeAssignRoleServices=false, 
			});
		    				
			var cnFactory = new OrmLiteConnectionFactory(ConfigUtils.GetConnectionString("UserAuth")) ;
			
			OrmLiteAuthRepository authRepo = new OrmLiteAuthRepository(
				cnFactory
			);
			
			container.Register<IUserAuthRepository>(
				c => authRepo
			); //Use OrmLite DB Connection to persist the UserAuth and AuthProvider info

			
			if(appSettings.Get("EnableRegistrationFeature", false))
				Plugins.Add( new  RegistrationFeature());
						
		}
		
	}
}