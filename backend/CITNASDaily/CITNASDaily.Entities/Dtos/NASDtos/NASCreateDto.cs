using CITNASDaily.Entities.Models;
using System.ComponentModel.DataAnnotations;

namespace CITNASDaily.Entities.Dtos.NASDtos
{
    public class NASCreateDto
    {
        [Required]
        public string? Username { get; set; }
        [Required]
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? Gender { get; set; }
        [Required]
        public DateTime? BirthDate { get; set; }
        [Required]
        public string? Course { get; set; }
        [Required]
        public int? YearLevel { get; set; }
        public int? UnitsAllowed { get; set; }
        [Required]
        public int? OfficeId { get; set; }
        public int? EnNo { get; set; }
        [Required]
        public DateTime? DateStarted { get; set; }
    }
}
