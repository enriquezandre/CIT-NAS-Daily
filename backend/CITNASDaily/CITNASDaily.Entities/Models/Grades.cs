using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Entities.Models
{
	public class Grades
	{
		public int Id { get; set; }
		public string? GradeFile { get; set; }
		public bool AllCoursesPassed { get; set; }
		public int NumberOfSubjectsFailed { get; set; }
	}
}
