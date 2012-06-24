using System;
using ServiceStack.ServiceHost;

namespace Aicl.Colmetrik.Model.Types
{
    [RestService("/AuthRole/create","post")]
    [RestService("/AuthRole/read","get")]
    [RestService("/AuthRole/read/{Id}","get")]
    [RestService("/AuthRole/update/{Id}","put")]
    [RestService("/AuthRole/destroy/{Id}","delete")]
    public partial class AuthRole
    {
    }
}