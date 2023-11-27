﻿using System.ComponentModel.DataAnnotations;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Entities.Models
{
    public class DailyTimeRecord
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string? FirstName { get; set; }
        [MaxLength(50)]
        public string? MiddleName { get; set; }
        [Required]
        [MaxLength(50)]
        public string? LastName { get; set; }
        public string? Date { get; set; }
        public string? TimeIn { get; set; }
        public string? TimeOut { get; set; }
        public string? OvertimeIn { get; set; }
        public string? OvertimeOut { get; set; }
        public string? WorkTime { get; set; }
        public string? TotalWorkTime { get; set; }
        public Semester Semester { get; set; }
        public int SchoolYear { get; set; }
    }
}
