using static CITNASDaily.Entities.Enums.Enums;

namespace CITNASDaily.Entities.Dtos.NASDtos
{
    public class NASSYAndSemUpdateDto
    {
        public int[]? NasIds { get; set; }
        public Semester Semester { get; set; }
        public int Year { get; set; }
    }
}