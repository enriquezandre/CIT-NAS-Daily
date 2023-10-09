﻿using CITNASDaily.Entities.Models;
using System.ComponentModel.DataAnnotations;

namespace CITNASDaily.Entities.Dtos.SuperiorEvaluationRatingDto
{
    public class SuperiorEvaluationDto
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int NASId { get; set; }
        public NAS? NAS { get; set; }
        [Required]
        public string Semester { get; set; }
        [Required]
        public int Year { get; set; }
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
