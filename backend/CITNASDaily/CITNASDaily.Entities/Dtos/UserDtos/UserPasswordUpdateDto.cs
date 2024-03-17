using System.ComponentModel.DataAnnotations;

namespace CITNASDaily.Entities.Dtos.UserDtos
{
    public class UserPasswordUpdateDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string CurrentPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
        [Required]
        public string RetypeNewPassword { get; set; }
    }
}
