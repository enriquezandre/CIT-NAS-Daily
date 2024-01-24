using CITNASDaily.Entities.Dtos.SchoolYearDto;

namespace CITNASDaily.Entities.Dtos.NASDtos
{
    public class NASUpdateDto
    {
        public int? OfficeId { get; set; }
        public int? YearLevel { get; set; }
        public string? Course { get; set; }
        public int? UnitsAllowed { get; set; }
    }
}