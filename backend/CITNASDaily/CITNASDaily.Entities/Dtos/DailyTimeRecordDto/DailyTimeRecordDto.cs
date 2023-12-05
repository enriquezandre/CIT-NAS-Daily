﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Entities.Dtos.DailyTimeRecordDto
{
    public class DailyTimeRecordDto
    {
        public int Id { get; set; }
        public string? LastName { get; set; }
        public string? MiddleName { get; set; }
        public string? FirstName { get; set; }
        public string? Date { get; set; }
        public string? Punch1 { get; set; }
        public string? Punch2 { get; set; }
        public string? Punch3 { get; set; }
        public string? Punch4 { get; set; }
        public string? OvertimeIn { get; set; }
        public string? OvertimeOut { get; set; }
        public string? WorkTime { get; set; }
        public string? TotalWorkTime { get; set; }
        public Semester Semester { get; set; }
        public int SchoolYear { get; set; }
    }
}
