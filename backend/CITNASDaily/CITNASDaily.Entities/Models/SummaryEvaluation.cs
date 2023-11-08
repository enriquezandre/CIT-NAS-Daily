using System.ComponentModel.DataAnnotations;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Entities.Models
{
    public class SummaryEvaluation
    {
        [Key]
        public int Id { get; set; }
        [Required] 
        public int nasId { get; set; }
        [Required]
        public Semester Semester { get; set; }
        [Required]
        public int SchoolYear { get; set; }
        [Required]
        public float SuperiorOverallRating { get; set; }
        public string? AcademicPerformance { get; set; }
        [Required]
        public string? TimekeepingStatus { get; set; }
        [Required]
        public bool EnrollmentAllowed { get; set; }
        public int UnitsAllowed { get; set; }
    }
}
