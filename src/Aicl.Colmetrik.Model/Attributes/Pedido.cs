using System;
using ServiceStack.ServiceHost;

namespace Aicl.Colmetrik.Model.Types
{

    [RestService("/Pedido/create","post")]
    [RestService("/Pedido/read","get")]
    //[RestService("/Pedido/read/{Id}","get")] ponerlo por numero talvez ?
    [RestService("/Pedido/update/{Id}","put")]
    //[RestService("/Pedido/destroy/{Id}","delete")]
    public partial class Pedido
    {

    }
}

