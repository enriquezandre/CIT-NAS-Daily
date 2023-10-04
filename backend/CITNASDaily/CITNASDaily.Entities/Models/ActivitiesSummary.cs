using System.ComponentModel.DataAnnotations;

namespace CITNASDaily.Entities.Models
{
    public class ActivitiesSummary
    {
		[Key]
        public int Id { get; set; }
		[Required]
		public int NASId { get; set; }
		public NAS? NAS { get; set; }
        [Required]
        public DateTime DateOfEntry { get; set; }
		[Required]
        public string? ActivitiesOfTheDay { get; set; }
        [Required]
        public string? SkillsLearned { get; set; }
        [Required]
        public string? ValuesLearned { get; set; }
    }
}
