﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CITNASDaily.Repositories.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigrate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.CreateTable(
                name: "SummaryEvaluation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SuperiorOverallRating = table.Column<float>(type: "real", nullable: false),
                    AcademicPerformance = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TimekeepingStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EnrollmentAllowed = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UnitsAllowed = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SummaryEvaluation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OAS",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MiddleName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OAS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OAS_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Superior",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    OfficeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Superior", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Superior_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Office",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SuperiorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Office", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Office_Superior_SuperiorId",
                        column: x => x.SuperiorId,
                        principalTable: "Superior",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "NAS",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OfficeId = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MiddleName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BirthDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Course = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    YearLevel = table.Column<int>(type: "int", nullable: false),
                    UnitsAllowed = table.Column<int>(type: "int", nullable: false),
                    DateStarted = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NAS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NAS_Office_OfficeId",
                        column: x => x.OfficeId,
                        principalTable: "Office",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NAS_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            // this has to be made after NAS table is made
            migrationBuilder.CreateTable(
                name: "ActivitiesSummary",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NASId = table.Column<int>(type: "int", nullable: false),
                    DateOfEntry = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ActivitiesOfTheDay = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SkillsLearned = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ValuesLearned = table.Column<string>(type: "nvarchar(max)", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivitiesSummary", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivitiesSummary_NAS_NASId",
                        column: x => x.NASId,
                        principalTable: "NAS",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Schedule",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NASId = table.Column<int>(type: "int", nullable: false),
                    DayOfWeek = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BrokenSched = table.Column<bool>(type: "bit", nullable: false),
                    TotalHours = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedule", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Schedule_NAS_NASId",
                        column: x => x.NASId,
                        principalTable: "NAS",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SuperiorEvaluationRating",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NASId = table.Column<int>(type: "int", nullable: false),
                    Semester = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    AttendanceAndPunctuality = table.Column<float>(type: "real", nullable: false),
                    QualOfWorkOutput = table.Column<float>(type: "real", nullable: false),
                    QualOfWorkInput = table.Column<float>(type: "real", nullable: false),
                    AttitudeAndWorkBehaviour = table.Column<float>(type: "real", nullable: false),
                    OverallAssessment = table.Column<float>(type: "real", nullable: false),
                    OverallRating = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SuperiorEvaluationRating", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SuperiorEvaluationRating_NAS_NASId",
                        column: x => x.NASId,
                        principalTable: "NAS",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TimekeepingSummary",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NASId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimekeepingSummary", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimekeepingSummary_NAS_NASId",
                        column: x => x.NASId,
                        principalTable: "NAS",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NAS_OfficeId",
                table: "NAS",
                column: "OfficeId");

            migrationBuilder.CreateIndex(
                name: "IX_NAS_UserId",
                table: "NAS",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OAS_UserId",
                table: "OAS",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Office_SuperiorId",
                table: "Office",
                column: "SuperiorId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Schedule_NASId",
                table: "Schedule",
                column: "NASId");

            migrationBuilder.CreateIndex(
                name: "IX_Superior_UserId",
                table: "Superior",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SuperiorEvaluationRating_NASId",
                table: "SuperiorEvaluationRating",
                column: "NASId");

            migrationBuilder.CreateIndex(
                name: "IX_TimekeepingSummary_NASId",
                table: "TimekeepingSummary",
                column: "NASId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Username",
                table: "User",
                column: "Username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivitiesSummary");

            migrationBuilder.DropTable(
                name: "OAS");

            migrationBuilder.DropTable(
                name: "Schedule");

            migrationBuilder.DropTable(
                name: "SummaryEvaluation");

            migrationBuilder.DropTable(
                name: "SuperiorEvaluationRating");

            migrationBuilder.DropTable(
                name: "TimekeepingSummary");

            migrationBuilder.DropTable(
                name: "NAS");

            migrationBuilder.DropTable(
                name: "Office");

            migrationBuilder.DropTable(
                name: "Superior");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
