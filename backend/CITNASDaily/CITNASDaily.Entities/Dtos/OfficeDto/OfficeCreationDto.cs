using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CITNASDaily.Entities.Models;

namespace CITNASDaily.Entities.Dtos.OfficeDto
{
	public class OfficeCreationDto
	{
		public int SuperiorId { get; set; }
		public string? Name { get; set; }
	}
}
