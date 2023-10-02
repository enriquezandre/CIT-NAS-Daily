using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CITNASDaily.Entities.Models
{
    public class NAS
    {
		[Key]
        public int Id { get; set; }

		[Required] 
		public Guid UserId { get; set; }  
        public User? User { get; set; }

        [Required]
        public int OfficeId { get; set; }
        public Office? Office { get; set; }

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
        [Required]
        public int SuperiorValidationId { get; set; }
		public SuperiorEvaluationRating? SuperiorEvaluationRating { get; set; }
    }
}
