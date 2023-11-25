using System.ComponentModel.DataAnnotations;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Entities.Models
{
    public class DailyTimeRecord
    {
        [Key]
        public int Id { get; set; }
        public string? NasName { get; set; }
        public string? Date { get; set; }
        public string? TimeIn { get; set; }
        public string? TimeOut { get; set; }
        public string? OvertimeIn { get; set; }
        public string? OvertimeOut { get; set; }
        public string? WorkTime { get; set; }
        public string? TotalWorkTime { get; set; }
        [Required]
        public Semester Semester { get; set; }
        [Required]
        public int SchoolYear { get; set; }
    }
}
