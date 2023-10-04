using System.ComponentModel.DataAnnotations;

namespace CITNASDaily.Entities.Models
{
    public class TimekeepingSummary
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int NASId { get; set; }
        public NAS NAS { get; set; }

		public bool Excused { get; set; }
		public bool Unexcused { get; set; }
		public bool FailedToPunch { get; set; }
		public bool LateOver10Mins { get; set; }
		public bool LateOver45Mins { get; set; }
    }
}
