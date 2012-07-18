using System;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;
using ServiceStack.OrmLite;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.Common.Utils;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Auth;
using ServiceStack.CacheAccess;
using ServiceStack.ServiceHost;
using ServiceStack.DesignPatterns.Model;
using ServiceStack.ServiceInterface.ServiceModel;
using Aicl.Colmetrik.Model.Types;
using Aicl.Colmetrik.Model.Operations;
using Aicl.Colmetrik.DataAccess;
using Mono.Linq.Expressions;

namespace Aicl.Colmetrik.BusinessLogic
{
    public static partial class BL
    {
		#region get
        public static Response<Pedido> Get(this Pedido request,
		                                   Factory factory,
		                                   IHttpRequest httpRequest)
        {

            var paginador= new Paginador(httpRequest);
            var queryString= httpRequest.QueryString;
			long? totalCount=null;

			ResponseStatus rs=null;
            
            var data = factory.Execute(proxy=>{

				try
				{
					int id;
	                if(int.TryParse(queryString["Id"], out id)){
						if(id!=default(int)) return proxy.Get<Pedido>(r=>r.Id==id);
					}

					var predicate = PredicateBuilder.True<Pedido>();

					string compania= queryString["NombreCompania"];
	            	if(!compania.IsNullOrEmpty()) 
					{
						predicate= predicate.AndAlso(r=>r.NombreCompania.Contains(compania));
	                }

					var visitor = ReadExtensions.CreateExpression<Pedido>();
					visitor.Where(predicate);
					if(paginador.PageNumber.HasValue)
	                {
						visitor.Select(r=> Sql.Count(r.Id));
						totalCount= proxy.Count(visitor); //proxy.Count(predicate);
	                    int rows= paginador.PageSize.HasValue? paginador.PageSize.Value:BL.PageSize;
						visitor.Select();
	                    visitor.Limit(paginador.PageNumber.Value*rows, rows);
	                }
	               
					visitor.OrderByDescending(r=>r.Id); 
	                return proxy.Get(visitor);
				}
				catch(Exception e)
				{
					rs= new ResponseStatus(){ErrorCode="GetClienteError",Message=e.Message, StackTrace=e.StackTrace};
					return new List<Pedido>();
				}
            });
            
            return new Response<Pedido>(){
                Data=data,
                TotalCount=totalCount,
				ResponseStatus=rs==null? new ResponseStatus():rs
            };
        }
		#endregion get

		#region post
		public static Response<Pedido> Post(this Pedido request,
		                                   Factory factory,
		                                   IHttpRequest httpRequest)
        {

			ResponseStatus rs=null;

			factory.Execute(proxy=>{
				try
				{
				var authSession= httpRequest.GetSession();
					var idUsuario=int.Parse(authSession.UserAuthId);
				var ue= proxy.FirstOrDefault<UserEmpleado>(q=>q.Id==idUsuario); 

				if(ue==default(UserEmpleado))
					throw new HttpError("El Usuario no tiene un Empleado asociado. El  usuario no puede insertar cotizaciones");

				var cliente= proxy.FirstOrDefault<Cliente>(q=>q.Id==request.IdCliente);
				if(cliente==default(Cliente))
					throw new HttpError(string.Format("No existe cliente con Id:'{0}'", request.IdCliente));

				var estadoEnvio= proxy.FirstOrDefault<EstadoEnvio>(q=> q.Id== request.IdEstadoEnvio);

				if(estadoEnvio==default(EstadoEnvio))
					throw new HttpError(string.Format("No existe estado envio con Id:'{0}'", request.IdEstadoEnvio));

				request.IdEmpleado=ue.IdEmpleado;

				proxy.Create(request);

				request.Nit= cliente.Nit;
				request.NombreCompania= cliente.NombreCompania;
				request.EMail= cliente.EMail;
				request.Pais= cliente.Pais;
				request.Ciudad= cliente.Ciudad;

				request.Apellidos= ue.Apellidos;
				request.Nombre= ue.Nombre;
				request.EstadoEnvio= estadoEnvio.Descripcion;
				}
				catch(Exception e)
				{
					rs= new ResponseStatus(){ErrorCode="GetClienteError",Message=e.Message, StackTrace=e.StackTrace};
				}


			});


			List<Pedido> data = new List<Pedido>();
			data.Add(request);
			
			return new Response<Pedido>(){
				Data=data,
				ResponseStatus= rs==null? new ResponseStatus():rs

			};
		}
		#endregion post

		#region put
		public static Response<Pedido> Put(this Pedido request,
		                                   Factory factory,
		                                   IHttpRequest httpRequest)
        {
			factory.Execute(proxy=>{

				var old = proxy.FirstOrDefault<Pedido>(q=>q.Id== request.Id);
				if(old==default(Pedido))
					throw new HttpError(string.Format("No se puede actualizar.No existe cotizacion con Id:'{0}'.", request.Id));

				var authSession= httpRequest.GetSession();
				var ue= proxy.FirstOrDefault<UserEmpleado>(q=>q.Id==int.Parse(authSession.UserAuthId)); 

				if(ue==default(UserEmpleado))
					throw new HttpError("El Usuario no tiene un Empleado asociado. El  usuario no puede actualizar cotizaciones");

				if(old.IdEmpleado!=ue.IdEmpleado)
					throw new HttpError("El  usuario no puede actualizar las cotizaciones de otro empleado");

				var data = new Pedido();
				data.PopulateWith(old);

				if(request.Cargo!=data.Cargo)
                	data.Cargo=request.Cargo;

				if(!request.DiasDeServicio.IsNullOrEmpty() && request.DiasDeServicio!=data.DiasDeServicio)
					data.DiasDeServicio=request.DiasDeServicio;

				if(request.IdCliente!=default(int) && request.IdCliente!=data.IdCliente)
				{
					var cliente= proxy.FirstOrDefault<Cliente>(q=>q.Id==request.IdCliente);
					if(cliente==default(Cliente))
						throw new HttpError(string.Format("No existe cliente con Id:'{0}'", request.IdCliente));

					data.Nit= cliente.Nit;
					data.NombreCompania= cliente.NombreCompania;
					data.EMail= cliente.EMail;
					data.Pais= cliente.Pais;
					data.Ciudad= cliente.Ciudad;
				}

				if(!request.Destinatario.IsNullOrEmpty() && request.Destinatario!=data.Destinatario)
					data.Destinatario=request.DireccionDestinatario;

				if(!request.DireccionDestinatario.IsNullOrEmpty() && request.DireccionDestinatario!=data.DireccionDestinatario)
					data.DireccionDestinatario=request.DireccionDestinatario;

				if(!request.CiudadDestinatario.IsNullOrEmpty() && request.CiudadDestinatario!=data.DireccionDestinatario)
					data.CiudadDestinatario=request.CiudadDestinatario;

				if(!request.TelefonoDestinatario.IsNullOrEmpty() && request.TelefonoDestinatario!=data.TelefonoDestinatario)
					data.TelefonoDestinatario=request.TelefonoDestinatario;

				if(!request.FaxDestinatario.IsNullOrEmpty() && request.FaxDestinatario!=data.FaxDestinatario)
					data.FaxDestinatario=request.FaxDestinatario;

				if(!request.PaisDestinatario.IsNullOrEmpty() && request.PaisDestinatario!=data.PaisDestinatario)
					data.PaisDestinatario=request.PaisDestinatario;
	
            	request.PopulateWith(data);

				proxy.Update(request);

			});

			List<Pedido> ldata = new List<Pedido>();
			ldata.Add(request);
			
			return new Response<Pedido>(){
				Data=ldata
			};
		}
		#endregion put

    }

}

//http://stackoverflow.com/questions/5094489/how-do-i-dynamically-create-an-expressionfuncmyclass-bool-predicate-from-e
//http://0.0.0.0:8080/api/Pedido/read?NombreCompania=texa&format=json&page=1&limit=5
//http://0.0.0.0:8080/api/Pedido/read?format=json&page=1&limit=5