using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Entities.Models
{
	public class SuperiorEvaluationRating
	{
		public int Id { get; set; }
		[ForeignKey("SuperiorId")]
		public int SuperiorId { get; set; }
		public Superior? Superior { get; set; }
		public float AttendanceAndPunctuality { get; set; }
		public float QualOfWorkOutput { get; set; }
		public float QualOfWorkInput { get; set; }
		public float AttitudeAndWorkBehaviour { get; set; }
		public float OverallAssessment { get; set; }
		public float OverallRating { get; set; }
	}
}
