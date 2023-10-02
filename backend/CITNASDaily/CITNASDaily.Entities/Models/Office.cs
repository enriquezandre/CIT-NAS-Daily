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
		public int SuperiorId { get; set; }
		public Superior? Superior { get; set; }
		public List<NAS>? Nas { get; set; }
	}
}
