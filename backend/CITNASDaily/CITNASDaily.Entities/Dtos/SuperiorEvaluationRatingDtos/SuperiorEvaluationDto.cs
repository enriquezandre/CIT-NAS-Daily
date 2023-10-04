namespace CITNASDaily.Entities.Dtos.SuperiorEvaluationRatingDto
{
    public class SuperiorEvaluationDto
    {
        public int Id { get; set; }
        public int SuperiorId { get; set; }
        public float AttendanceAndPunctuality { get; set; }
        public float QualOfWorkOutput { get; set; }
        public float QualOfWorkInput { get; set; }
        public float AttitudeAndWorkBehaviour { get; set; }
        public float OverallAssessment { get; set; }
        public float OverallRating { get; set; }
    }
}
