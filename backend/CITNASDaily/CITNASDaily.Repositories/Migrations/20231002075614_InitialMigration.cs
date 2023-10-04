﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CITNASDaily.Repositories.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActivitiesSummary",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActivitiesOfTheDay = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SkillsLearned = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ValuesLearned = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivitiesSummary", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

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
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OAS",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                    OfficeId = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MiddleName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Superior", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Superior_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Office",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SuperiorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Office", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Office_Superior_SuperiorId",
                        column: x => x.SuperiorId,
                        principalTable: "Superior",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SuperiorEvaluationRating",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SuperiorId = table.Column<int>(type: "int", nullable: false),
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
                        name: "FK_SuperiorEvaluationRating_Superior_SuperiorId",
                        column: x => x.SuperiorId,
                        principalTable: "Superior",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NAS",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OfficeId = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MiddleName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BirthDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Course = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    YearLevel = table.Column<int>(type: "int", nullable: false),
                    UnitsAllowed = table.Column<int>(type: "int", nullable: false),
                    DateStarted = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SuperiorValidationId = table.Column<int>(type: "int", nullable: false),
                    SuperiorEvaluationRatingId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NAS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NAS_Office_OfficeId",
                        column: x => x.OfficeId,
                        principalTable: "Office",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NAS_SuperiorEvaluationRating_SuperiorEvaluationRatingId",
                        column: x => x.SuperiorEvaluationRatingId,
                        principalTable: "SuperiorEvaluationRating",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NAS_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
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

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "OAS" });

            migrationBuilder.CreateIndex(
                name: "IX_NAS_OfficeId",
                table: "NAS",
                column: "OfficeId");

            migrationBuilder.CreateIndex(
                name: "IX_NAS_SuperiorEvaluationRatingId",
                table: "NAS",
                column: "SuperiorEvaluationRatingId");

            migrationBuilder.CreateIndex(
                name: "IX_NAS_UserId",
                table: "NAS",
                column: "UserId");

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
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SuperiorEvaluationRating_SuperiorId",
                table: "SuperiorEvaluationRating",
                column: "SuperiorId");

            migrationBuilder.CreateIndex(
                name: "IX_TimekeepingSummary_NASId",
                table: "TimekeepingSummary",
                column: "NASId");

            migrationBuilder.CreateIndex(
                name: "IX_User_RoleId",
                table: "User",
                column: "RoleId");
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
                name: "TimekeepingSummary");

            migrationBuilder.DropTable(
                name: "NAS");

            migrationBuilder.DropTable(
                name: "Office");

            migrationBuilder.DropTable(
                name: "SuperiorEvaluationRating");

            migrationBuilder.DropTable(
                name: "Superior");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Role");
        }
    }
}