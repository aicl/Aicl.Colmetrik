using System;
using ServiceStack.ServiceHost;

namespace Aicl.Colmetrik.Model.Types
{

    [RestService("/Cliente/create","post")]
    [RestService("/Cliente/read","get")]
    [RestService("/Cliente/update/{Id}","put")]
    [RestService("/Cliente/destroy/{Id}","delete")]
    public partial class Cliente
    {

    }
}