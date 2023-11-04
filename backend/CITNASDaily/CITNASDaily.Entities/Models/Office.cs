using System.ComponentModel.DataAnnotations;

namespace CITNASDaily.Entities.Models
{
	/// <summary>
	/// This is the class for the Office Model
	/// </summary>
	public class Office
	{
		[Key]
		public int Id { get; set; }
		public string? Name { get; set; }	
		public int SuperiorId { get; set; }
		public List<NAS>? NAS { get; set; }
	}
}
