using System.ComponentModel.DataAnnotations;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Entities.Models
{
	public class PerformanceEvaluation
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int NASId { get; set; }
        public NAS? NAS { get; set; }
        public Semesters Semester { get; set; }
        public int Year { get; set; }
        [Required]
        public float SuperiorOverallRating { get; set; }
        [Required]
        public string? AcademicPerformance { get; set; }
        [Required]
        public string? TimekeepingStatus { get; set; }
        [Required]
        public bool? EnrollmentAllowed { get; set; }
        [Required]
        public int UnitsAllowed { get; set; }
    }
}
