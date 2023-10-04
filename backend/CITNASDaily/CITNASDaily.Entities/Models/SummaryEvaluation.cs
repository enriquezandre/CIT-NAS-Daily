using System.ComponentModel.DataAnnotations;

namespace CITNASDaily.Entities.Models
{
    public class SummaryEvaluation
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public float SuperiorOverallRating { get; set; }
        [Required]
        public string? AcademicPerformance { get; set; }
        [Required]
        public string? TimekeepingStatus { get; set; }
        [Required]
        public string? EnrollmentAllowed { get; set; }
        [Required]
        public int UnitsAllowed { get; set; }
    }
}
