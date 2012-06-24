using System;
using ServiceStack.ServiceHost;

namespace Aicl.Colmetrik.Model.Types
{

    [RestService("/PedidoItem/create","post")]
    [RestService("/PedidoItem/read","get")]
    [RestService("/PedidoItem/read/{IdPedido}","get")]
    [RestService("/PedidoItem/update/{Id}","put")]
    [RestService("/PedidoItem/destroy/{Id}","delete")]
    public partial class PedidoItem
    {

    }
}

