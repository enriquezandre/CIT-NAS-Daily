using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CITNASDaily.Repositories.Migrations
{
    /// <inheritdoc />
    public partial class CITNASDailyDataMigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RoleCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
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
                    NASId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    OfficeId = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MiddleName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BirthDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Course = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    YearLevel = table.Column<int>(type: "int", nullable: false),
                    UnitsAllowed = table.Column<int>(type: "int", nullable: false),
                    DateStarted = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SuperiorEvaluationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NAS", x => x.NASId);
                    table.ForeignKey(
                        name: "FK_NAS_Office_OfficeId",
                        column: x => x.OfficeId,
                        principalTable: "Office",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NAS_SuperiorEvaluationRating_SSuperiorEvaluationId",
                        column: x => x.SuperiorEvaluationId,
                        principalTable: "SuperiorEvaluationRating",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NAS_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_NAS_OfficeId",
                table: "NAS",
                column: "OfficeId");

            migrationBuilder.CreateIndex(
                name: "IX_NAS_SuperiorEvaluationId",
                table: "NAS",
                column: "SuperiorEvaluationId");

            migrationBuilder.CreateIndex(
                name: "IX_NAS_UserId",
                table: "NAS",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Office_SuperiorId",
                table: "Office",
                column: "SuperiorId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SuperiorEvaluationRating_SuperiorId",
                table: "SuperiorEvaluationRating",
                column: "SuperiorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
        }
    }
}
