using System.ComponentModel.DataAnnotations;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Entities.Models
{
    public class TimekeepingSummary
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int NASId { get; set; }
        [Required]
        public Semester Semester { get; set; }
        public int Year { get; set; }  
        public int? Excused { get; set; }
        public int? Unexcused { get; set; }
        public int? FailedToPunch { get; set; }
        public int? LateOver10mins { get; set; }
        public int? LateOver45mins { get; set; }
        public float? MakeUpDutyHours { get; set; }
    }
}
