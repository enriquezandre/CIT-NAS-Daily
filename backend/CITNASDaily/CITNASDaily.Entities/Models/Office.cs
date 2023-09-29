using System.ComponentModel.DataAnnotations.Schema;

namespace CITNASDaily.Entities.Models
{
	/// <summary>
	/// This is the class for the Office Model
	/// </summary>
	public class Office
	{
		public int Id { get; set; }
		[ForeignKey("SuperiorId")]
		public int SuperiorId { get; set; }
		public Superior? Superior { get; set; }
		public List<NAS>? Nas { get; set; }
	}
}
