using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Entities.Models
{
	public class ActivitiesSummary
	{
		public int Id { get; set; }
		public string? ActivitiesOfTheDay { get; set; }
		public string? SkillsLearned { get; set; }
		public string? ValuesLearned { get; set; }
	}
}
