using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Entities.Models
{
	public class Schedule
	{
		public int Id { get; set; }
		public TimeOnly StartTime { get; set; }
		public TimeOnly EndTime { get; set; } = new TimeOnly();
		//brokensched
		//numOfSched
		public int TotalNumberOfHours { get; set; }
	}
}
