using System;
using System.ComponentModel.DataAnnotations;
using ServiceStack.Common;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;

namespace Aicl.Colmetrik.Model.Types
{
    public partial class EstadoEnvio:IHasId<System.Int32>
    {
        public EstadoEnvio ()
        {
        }

        [AutoIncrement]
        public int Id {get; set;}  
        
        [StringLength(200)]
        [Required]
        public string Descripcion {get; set;} 
        

    }
}

