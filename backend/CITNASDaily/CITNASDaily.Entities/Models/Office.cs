using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CITNASDaily.Entities.Models
{
	/// <summary>
	/// This is the class for the Office Model
	/// </summary>
	public class Office
	{
		public int OfficeId { get; set; }
		[ForeignKey("SuperiorId"), DeleteBehavior(DeleteBehavior.Cascade)]
		public int SuperiorId { get; set; }
		public Superior? Superior { get; set; }
		public List<NAS>? Nas { get; set; }
	}
}
