using CITNASDaily.Entities.Models;

namespace CITNASDaily.Entities.Dtos.OfficeDtos
{
    public class OfficeDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int SuperiorId { get; set; }
        public List<NAS>? NAS { get; set; }
    }
}
