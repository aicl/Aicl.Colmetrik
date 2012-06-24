using System;
using System.ComponentModel.DataAnnotations;
using ServiceStack.Common;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;

namespace Aicl.Colmetrik.Model.Types
{

    public partial class Cliente:IHasId<System.Int32>
    {
        public Cliente ()
        {
        }

        [AutoIncrement]
        public int Id {get;set;}

        [StringLength(26)]
        [Required]
        [Index(true)]
        public string Nit {get;set;}

        [StringLength(200)]
        [Required]
        public string NombreCompania {get;set;}

        [StringLength(60)]
        public string  Nombrecontacto {get;set;}

        [StringLength(60)]
        public string  Cargocontacto {get;set;}

        [StringLength(120)]
        public string Direccion {get;set;}

        [StringLength(100)]
        public string Ciudad {get;set;}

        [StringLength(60)]
        public string Region {get;set;}

        [StringLength(80)]
        [Alias("Codpostal")]
        public string EMail {get;set;}

        [StringLength(30)]
        public string Pais {get;set;}

        [StringLength(48)]
        public string Telefono {get;set;}

        [StringLength(48)]
        public string Fax {get;set;}

        [StringLength(510)]
        public string Temperatura {get;set;}

        [StringLength(510)]
        public string Volumen {get;set;}

        [StringLength(510)]
        public string TYF {get;set;}

        [StringLength(510)]
        public string Humedad {get;set;}

        [StringLength(510)]
        public string Presion {get;set;}

        [StringLength(510)]
        public string MagnitudesElectricas {get;set;}

        [StringLength(510)]
        public string NombreContacto2{get;set;}

        [StringLength(510)]
        public string TelefonoContacto2 {get;set;}

        [StringLength(510)]
        public string Correo2 {get;set;}

        [StringLength(510)]
        public string MasBal {get;set;}

        [StringLength(510)]
        public string OtrosServicios {get;set;}

        [StringLength(510)]
        public string Contado {get;set;}

        [StringLength(510)]
        public string Credito {get;set;}

        [StringLength(510)]
        public string CantidadDias {get;set;}

        [StringLength(510)]
        public string Observaciones {get;set;}

    }
}
