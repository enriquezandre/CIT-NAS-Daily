using System.ComponentModel.DataAnnotations;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Entities.Models
{
    public class SuperiorEvaluationRating
	{
		[Key]
		public int Id { get; set; }
        [Required]
        public int NASId { get; set; }
        public NAS? NAS { get; set; }
        [Required]
        public Semester Semester { get; set; }

        [Required]
        public SchoolYear SchoolYear { get; set; }
        [Required]
        public float AttendanceAndPunctuality { get; set; }
        [Required]
        public float QualOfWorkOutput { get; set; }
        [Required]
        public float QualOfWorkInput { get; set; }
        [Required]
        public float AttitudeAndWorkBehaviour { get; set; }
        [Required]
        public float OverallAssessment { get; set; }
        [Required]
        public float OverallRating { get; set; }
	}
}
