using CITNASDaily.Entities.Models;

namespace CITNASDaily.Entities.Dtos.OfficeDtos
{
    public class OfficeDto
    {
        public int Id { get; set; }
        public string? OfficeName { get; set; }
        public string? SuperiorFirstName { get; set; }
        public string? SuperiorMiddleName { get; set; }
        public string? SuperiorLastName { get; set; }
        public string FullName => string.IsNullOrWhiteSpace(SuperiorMiddleName) ? $"{SuperiorFirstName} {SuperiorLastName}" : $"{SuperiorFirstName} {SuperiorMiddleName} {SuperiorLastName}";
        public List<NAS>? NAS { get; set; }
    }
}
