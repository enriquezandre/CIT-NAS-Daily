using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace CITNASDaily.Entities.Models
{
    public class Superior
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int OfficeId { get; set; }
        public Office? Office { get; set; }

        [Required]
        [MaxLength(50)]
        public string? FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string? LastName { get; set; }
    }
}
