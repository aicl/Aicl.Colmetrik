using System;
using System.ComponentModel.DataAnnotations;
using ServiceStack.Common;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;

namespace Aicl.Colmetrik.Model.Types
{
	/// <summary>
	/// Description of Empleado.
	/// </summary>
	public partial class Empleado:IHasId<System.Int32>
	{
		public Empleado()
		{
		}

		[AutoIncrement]
		public int Id {get; set;} 
		
		[StringLength(60)]
        [Required]
        [Index(false)]
        public string Apellidos {get; set;} 
        
        [StringLength(60)]
        [Required]
        [Index(false)]
        public string Nombre {get; set;} 
        
        [StringLength(60)]
        public string Cargo {get; set;}
        
        [StringLength(60)]
        public string Tratamiento {get; set;} 
        
        public DateTime? FechaNacimiento {get; set;} 
        public DateTime? FechaContratacion {get; set;} 
        
        [StringLength(120)]
        public string Direccion {get; set;}
        
        [StringLength(30)]
        public string Ciudad {get; set;}
        
        [StringLength(30)]
        public string Region {get; set;}
        
        [StringLength(80)]
        public string CodPostal {get; set;}
        
        [StringLength(30)]
        public string Pais {get; set;}
        
        [StringLength(48)]
        public string TelDomicilio {get; set;} 
        
        [StringLength(8)]
        public string Extension {get; set;} 
        
        [StringLength(510)]
        public string Foto {get; set;}
        
        [StringLength(1024)]
        public string Notas {get; set;} 
        
        public int? Jefe {get; set;} 
        
        [StringLength(510)]
        public string Firma {get; set;}
	}
}


/*
 CREATE TABLE Empleados
 (
	IdEmpleado int(11)  NOT NULL AUTO_INCREMENT,
	Apellidos {get; set;} 
	Nombre {get; set;} 
	Cargo {get; set;}
	Tratamiento {get; set;}
	FechaNacimiento date , 
	FechaContratacion date , 
	Direccion {get; set;}
	Ciudad {get; set;}
	Region {get; set;}
	CodPostal {get; set;}
	Pais {get; set;}
	TelDomicilio {get; set;} 
	Extension {get; set;} 
	Foto {get; set;}
	Notas varchar(1024), 
	Jefe int(11), 
	Firma {´get; set;}
	PRIMARY KEY (`IdEmpleado`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
 */