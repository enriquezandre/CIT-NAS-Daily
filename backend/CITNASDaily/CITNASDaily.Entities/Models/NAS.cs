using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CITNASDaily.Entities.Models
{
	/// <summary>
	/// this is the class for NAS model
	/// </summary>
    public class NAS
    {
        public int NASId { get; set; }

		[ForeignKey("UserId"), DeleteBehavior(DeleteBehavior.Cascade)]
		public int UserId { get; set; }  
        public User? User { get; set; }

		[ForeignKey("OfficeId"), DeleteBehavior(DeleteBehavior.Cascade)]
		public int OfficeId { get; set; }
        public Office? Office { get; set; }

        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? Gender { get; set; }
        public DateOnly BirthDate { get; set; }
        public string? Course { get; set; }
        public int YearLevel { get; set; }
        public int UnitsAllowed { get; set; }
        public DateOnly DateStarted { get; set; }

		//fks with delete cascade behavior
		[ForeignKey("Activitiesd"), DeleteBehavior(DeleteBehavior.Cascade)]
		public int ActivitiesId { get; set; }
		public ActivitiesSummary? ActivitiesSummary { get; set; }

		[ForeignKey("SummaryEvaluationId"), DeleteBehavior(DeleteBehavior.Cascade)]
		public int SummaryEvaluationId { get; set; }
		public SummaryEvaluation? SummaryEvaluation { get; set; }
		[ForeignKey("TimekeepingId"), DeleteBehavior(DeleteBehavior.Cascade)]
		public int TimekeepingId { get; set; }
		public TimekeepingSummary? TimekeepingSummary { get; set;}
		[ForeignKey("BiometricsLogId"), DeleteBehavior(DeleteBehavior.Cascade)]
		public int BiometricsLogId { get; set; }
		public BiometricsLog? BiometricsLog { get; set; }
		[ForeignKey("ScheduleId"), DeleteBehavior(DeleteBehavior.Cascade)]
		public int ScheduleId { get; set; }
		public Schedule? Schedule { get; set; }
		[ForeignKey("GradesId"), DeleteBehavior(DeleteBehavior.Cascade)]
		public int GradesId { get; set; }
		public Grades? Grades { get; set; }
		[ForeignKey("ValidationId"), DeleteBehavior(DeleteBehavior.Cascade)]
		public int ValidationId { get; set; }
		public Validation? Validation { get; set; }
		[ForeignKey("SuperiorEvaluationId"), DeleteBehavior(DeleteBehavior.Cascade)]
		public int SuperiorValidationId { get; set; }
		public SuperiorEvaluationRating? SuperiorEvaluationRating { get; set; }
    }
}
