using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CITNASDaily.Entities.Models
{
	public class Superior
	{
		public int SuperiorId { get; set; }
		[ForeignKey("UserId"), DeleteBehavior(DeleteBehavior.Cascade)]
		public int UserId { get; set; }
		public User? User { get; set; }
		[ForeignKey("OfficeId"), DeleteBehavior(DeleteBehavior.Cascade)]
		public int OfficeId { get; set; }
		public Office? Office { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
	}
}
