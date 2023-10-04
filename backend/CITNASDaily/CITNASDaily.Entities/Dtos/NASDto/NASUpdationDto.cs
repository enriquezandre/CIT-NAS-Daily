using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CITNASDaily.Entities.Models;

namespace CITNASDaily.Entities.Dtos.NASDto
{
	public class NASUpdationDto
	{
		public string? Gender { get; set; }
		public DateTime BirthDate { get; set; }
		public string? Course { get; set; }
		public int YearLevel { get; set; }
		public int UnitsAllowed { get; set; }
	}
}
