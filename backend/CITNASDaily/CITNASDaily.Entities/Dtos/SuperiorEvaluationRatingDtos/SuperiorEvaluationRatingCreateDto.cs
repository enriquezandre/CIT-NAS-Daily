﻿using CITNASDaily.Entities.Models;
using System.ComponentModel.DataAnnotations;

namespace CITNASDaily.Entities.Dtos.SuperiorEvaluationRatingDto
{
    public class SuperiorEvaluationRatingCreateDto
    {


        [Required]
        public int NASId { get; set; }
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
    }
}
