using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Entities.Dtos.ScheduleDtos
{
    public class ScheduleUpdateDto
    {
        public int NASId { get; set; }
        public DaysOfTheWeek DayOfWeek { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool BrokenSched { get; set; }
        public float TotalHours { get; set; }
    }
}
