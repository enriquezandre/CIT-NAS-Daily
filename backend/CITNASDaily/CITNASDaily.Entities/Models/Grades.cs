using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Entities.Models
{
	public class Grades
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public int NASId { get; set; }
		public NAS? NAS { get; set; }
		public string? GradeFile { get; set; }
		public bool AllCoursesPassed { get; set; }
		public int NumberOfSubjectsFailed { get; set; }
	}
}
