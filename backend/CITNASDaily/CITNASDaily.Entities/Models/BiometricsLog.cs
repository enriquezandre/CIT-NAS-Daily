using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Entities.Models
{
	public class BiometricsLog
	{
		public int Id { get; set; }
		public DateTime Date { get; set; }
		public DateTime TimeIn { get; set; }
		public DateTime TimeOut { get; set; }
		public DateTime OverTimeIn { get; set; }
		public DateTime OverTimeOut { get; set; }
	}
}
