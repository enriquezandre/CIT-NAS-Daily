using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITNASDaily.Entities.Models
{
	public class Superior
	{
		public int Id { get; set; }
		[ForeignKey("UserId")]
		public int UserId { get; set; }
		public User? User { get; set; }
		[ForeignKey("OfficeId")]
		public int OfficeId { get; set; }
		public Office? Office { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
	}
}
