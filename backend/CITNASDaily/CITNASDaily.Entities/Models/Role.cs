using System.ComponentModel.DataAnnotations;

namespace CITNASDaily.Entities.Models
{
    public class Role
    {
        public int RoleId { get; set; }
        
        [Required]
        public string? RoleName { get; set; }
    }
}
