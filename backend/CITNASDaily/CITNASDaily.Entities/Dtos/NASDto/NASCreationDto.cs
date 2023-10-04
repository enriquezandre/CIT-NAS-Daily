using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CITNASDaily.Entities.Models;

namespace CITNASDaily.Entities.Dtos.NASDto
{
	public class NASCreationDto
	{

		[Required]
		public Guid UserId { get; set; }

		[Required]
		public int OfficeId { get; set; }

		[Required]
		[MaxLength(50)]
		public string? FirstName { get; set; }
		[MaxLength(50)]
		public string? MiddleName { get; set; }
		[Required]
		[MaxLength(50)]
		public string? LastName { get; set; }
		[Required]
		public string? Gender { get; set; }
		[Required]
		public DateTime BirthDate { get; set; }
		[Required]
		public string? Course { get; set; }
		[Required]
		public int YearLevel { get; set; }
		[Required]
		public int UnitsAllowed { get; set; }
		[Required]
		public DateTime DateStarted { get; set; }
	}
}
