﻿using CITNASDaily.Entities.Dtos.SchoolYearDto;
using CITNASDaily.Entities.Dtos.StudentSemesterDto;

namespace CITNASDaily.Entities.Dtos.NASDtos
{
    public class NASDto
    {
        public int Id { get; set; }
        public Guid? UserId { get; set; }
        public string? Username { get; set; }
        public int? OfficeId { get; set; }
        public int? EnNo { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string FullName => $"{FirstName} {MiddleName} {LastName}";
        public string? Gender { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Course { get; set; }
        public int? YearLevel { get; set; }
        public int? UnitsAllowed { get; set; }
        public List<NASSchoolYearCreateDto>? SchoolYear { get; set; }
        public List<NASSemesterCreateDto>? Semester { get; set; }
        public DateTime? DateStarted { get; set; }
        public byte[]? Image { get; set; }
    }
}
