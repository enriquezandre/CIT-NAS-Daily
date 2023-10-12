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

    }
}
