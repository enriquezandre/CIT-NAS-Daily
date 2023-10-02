using CITNASDaily.Entities.Models;
using System.ComponentModel.DataAnnotations;

namespace CITNASDaily.Entities.Dtos.SuperiorEvaluationRatingDto
{
    public class SuperiorEvaluationCreateDto
    {

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

        //TODO: subject to change after implementing auth
        [Required]
        public int SuperiorId { get; set; }
    }
}
