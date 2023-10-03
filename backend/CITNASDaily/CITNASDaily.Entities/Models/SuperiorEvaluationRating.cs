﻿using System.ComponentModel.DataAnnotations;

namespace CITNASDaily.Entities.Models
{
    public class SuperiorEvaluationRating
	{
		[Key]
		public int Id { get; set; }

		[Required]
        public int SuperiorId { get; set; }
		public Superior? Superior { get; set; }
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
