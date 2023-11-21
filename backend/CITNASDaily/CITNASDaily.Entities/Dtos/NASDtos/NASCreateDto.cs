﻿using CITNASDaily.Entities.Dtos.SchoolYearDto;
using CITNASDaily.Entities.Dtos.StudentSemesterDto;
using CITNASDaily.Entities.Models;
using System.ComponentModel.DataAnnotations;

namespace CITNASDaily.Entities.Dtos.NASDtos
{
    public class NASCreateDto
    {
        [Required]
        [RegularExpression(@"^\d{1,2}-\d{1,4}-\d{1,3}$", ErrorMessage = "Student ID input must follow 00-0000-000")]
        public string? StudentIDNo { get; set; }
        [Required]
        public string? Username { get; set; }
        [Required]
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? Gender { get; set; }
        [Required]
        public DateTime? BirthDate { get; set; }
        [Required]
        public string? Course { get; set; }
        [Required]
        public int? YearLevel { get; set; }
        public List<NASSchoolYearCreateDto>? SchoolYear { get; set; }
        public List<NASSemesterCreateDto>? Semester { get; set; }
        public int? UnitsAllowed { get; set; }
        [Required]
        public int? OfficeId { get; set; }
        public int? EnNo { get; set; }
        [Required]
        public DateTime? DateStarted { get; set; }
    }
}
