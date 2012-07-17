using System;
using System.Data;
using System.Text;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;
using ServiceStack.OrmLite;
using ServiceStack.Common;
using ServiceStack.Common.Utils;
using ServiceStack.DesignPatterns.Model;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Auth;
using ServiceStack.CacheAccess;
using ServiceStack.ServiceHost;
using ServiceStack.Redis;

using Aicl.Colmetrik.Model.Types;
using Aicl.Colmetrik.Model.Operations;
using Aicl.Colmetrik.DataAccess;

namespace Aicl.Colmetrik.BusinessLogic
{
    public static class AuthorizationExtensions
    {
                
        public static AuthorizationResponse Get(this Authorization request, 
                                                   Factory factory, IRequestContext requestContext){
            
            var httpRequest = requestContext.Get<IHttpRequest>();   
            IAuthSession session = httpRequest.GetSession();
                        
            if (!session.HasRole(RoleNames.Admin))
            {
                request.UserId= int.Parse(session.UserAuthId);
            }
            
            List<AuthRole> roles = new List<AuthRole>();
            List<string> permissions= new List<string>();
            
            List<AuthRoleUser> aur= new List<AuthRoleUser>();
            List<AuthRole> rol = new List<AuthRole>();
            List<AuthPermission> per = new List<AuthPermission>();
            List<AuthRolePermission> rol_per = new List<AuthRolePermission>();
           
            factory.Execute(proxy=>
            {
                aur= proxy.Get<AuthRoleUser>(r=>r.IdUsuario==request.UserId );
                rol= proxy.Get<AuthRole>(); //DAL.GetFromCache<AuthRole>(proxy);
                per= proxy.Get<AuthPermission>(); //DAL.GetFromCache<AuthPermission >(proxy);
                rol_per= proxy.Get<AuthRolePermission>(); //DAL.GetFromCache<AuthRolePermission >(proxy);

            });
                        
            foreach( var r in aur)
            {
                AuthRole ar= rol.First(x=>x.Id== r.IdAuthRole);
                roles.Add(ar);
                rol_per.Where(q=>q.IdAuthRole==ar.Id).ToList().ForEach(y=>{
                    AuthPermission up=  per.First( p=> p.Id== y.IdAuthPermission);
                    if( permissions.IndexOf(up.Name) <0)
                        permissions.Add(up.Name);
                }) ;
            };
                               
            return new AuthorizationResponse(){
                Permissions= permissions,
                Roles= roles

            };
        }
                
        
    }
    
}