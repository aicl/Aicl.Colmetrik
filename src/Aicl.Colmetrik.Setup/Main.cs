using System;
using ServiceStack.Configuration;

namespace Aicl.Colmetrik.Setup
{
	class MainClass
	{
		private static readonly string ListeningOn = ConfigUtils.GetAppSetting("ListeningOn");
		
		public static void Main (string[] args)
		{
			
			var appHost = new AppHost();
			appHost.Init();
			appHost.Start(ListeningOn);

			Console.WriteLine("Started listening on: " + ListeningOn);

			Console.WriteLine("AppHost Created at {0}, listening on {1}",
				DateTime.Now, ListeningOn);

			Console.WriteLine("ReadKey()");
			Console.ReadKey();
			
		}
	}
}