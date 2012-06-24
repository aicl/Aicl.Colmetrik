using System;
using System.Collections.Generic;
using ServiceStack.ServiceInterface.ServiceModel;

namespace Aicl.Colmetrik.Model.Operations
{
	public class Response<T>:IHasResponseStatus where T:new()
	{
        private long? totalCount;

		public Response ()
		{
			ResponseStatus= new ResponseStatus();
			Data= new List<T>();
		}
		
		public ResponseStatus ResponseStatus { get; set; }
		
		public List<T> Data {get; set;}

        public long? TotalCount {
            get {return totalCount.HasValue? totalCount.Value: Data.Count;}
            set { totalCount=value;}
        }
		
	}
}