using System;
using System.ComponentModel.DataAnnotations;
using ServiceStack.Common;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;

namespace Aicl.Colmetrik.Model.Types
{
    public partial class AuthRole:IHasId<System.Int32>{

        public AuthRole(){}

        [AutoIncrement]
        public System.Int32 Id { get; set;} 

        [Required]
        [StringLength(30)]
        public System.String Name { get; set;} 

        [StringLength(15)]
        public System.String Directory { get; set;} 
                
        [StringLength(2)]
        public System.String ShowOrder { get; set;} 

        [Required]
        [StringLength(30)]
        public System.String Title { get; set;} 

    }
}