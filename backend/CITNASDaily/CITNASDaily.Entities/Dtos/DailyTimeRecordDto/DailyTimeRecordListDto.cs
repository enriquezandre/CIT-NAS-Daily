using CITNASDaily.Entities.Dtos.DailyTimeRecordDto;
using static CITNASDaily.Entities.Enums.Enums;

public class DailyTimeRecordListDto
{
    public string? LastName { get; set; }
    public string? MiddleName { get; set; }
    public string? FirstName { get; set; }
    public Semester Semester { get; set; }
    public int SchoolYear { get; set; }
    public List<DailyTimeRecordDto>? DailyTimeRecords { get; set; }
}