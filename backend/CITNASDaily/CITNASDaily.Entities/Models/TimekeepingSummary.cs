using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Entities.Models
{
	public class TimekeepingSummary
	{
		public int Id { get; set; }
		public bool Excused { get; set; }
		public bool Unexcused { get; set; }
		public bool FailedToPunch { get; set; }
		public bool LateOver10Mins { get; set; }
		public bool LateOver45Mins { get; set; }
	}
}
