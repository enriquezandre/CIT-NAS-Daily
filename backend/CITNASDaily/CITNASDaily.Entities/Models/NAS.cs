using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CITNASDaily.Entities.Models
{
	/// <summary>
	/// this is the class for NAS model
	/// </summary>
    public class NAS
    {
        public int Id { get; set; }
		[Key]
        public int Id { get; set; }

		[Required] 
		public Guid UserId { get; set; }  
        public User? User { get; set; }

        [Required]
        public int OfficeId { get; set; }
        public Office? Office { get; set; }

        [Required]
        [MaxLength(50)]
        public string? FirstName { get; set; }
        [MaxLength(50)]
        public string? MiddleName { get; set; }
        [Required]
        [MaxLength(50)]
        public string? LastName { get; set; }
        [Required]
        public string? Gender { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
        [Required]
        public string? Course { get; set; }
        [Required]
        public int YearLevel { get; set; }
        [Required]
        public int UnitsAllowed { get; set; }
        [Required]
        public DateTime DateStarted { get; set; }

		//fks with delete cascade behavior
		[ForeignKey("Activitiesd")]
		public int ActivitiesId { get; set; }
		public ActivitiesSummary? ActivitiesSummary { get; set; }

		[ForeignKey("SummaryEvaluationId")]
		public int SummaryEvaluationId { get; set; }
		public SummaryEvaluation? SummaryEvaluation { get; set; }
		[ForeignKey("TimekeepingId")]
		public int TimekeepingId { get; set; }
		public TimekeepingSummary? TimekeepingSummary { get; set;}
		[ForeignKey("BiometricsLogId")]
		public int BiometricsLogId { get; set; }
		public BiometricsLog? BiometricsLog { get; set; }
		[ForeignKey("ScheduleId")]
		public int ScheduleId { get; set; }
		public Schedule? Schedule { get; set; }
		[ForeignKey("GradesId")]
		public int GradesId { get; set; }
		public Grades? Grades { get; set; }
		[ForeignKey("ValidationId")]
		public int ValidationId { get; set; }
		public Validation? Validation { get; set; }
		[ForeignKey("SuperiorEvaluationId")]
		public int SuperiorValidationId { get; set; }
        [Required]
        public int SuperiorValidationId { get; set; }
		public SuperiorEvaluationRating? SuperiorEvaluationRating { get; set; }
	}
}
