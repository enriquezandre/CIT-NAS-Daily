﻿using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Entities.Dtos.SummaryEvaluationDtos
{
    public class SummaryEvaluationDto
    {
        public int Id { get; set; }
        public int nasId { get; set; }
        public Semester Semester { get; set; }
        public int? Year { get; set; }
        public float SuperiorOverallRating { get; set; }
        public string? AcademicPerformance { get; set; }
        public string? TimekeepingStatus { get; set; }
        public bool EnrollmentAllowed { get; set; }
        public int UnitsAllowed { get; set; }
    }
}