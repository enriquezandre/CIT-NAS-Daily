using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CITNASDaily.Repositories.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.RoleId);
                });

			migrationBuilder.CreateTable(
			name: "Superior",
			columns: table => new
			{
				SuperiorId = table.Column<int>(nullable: false)
					.Annotation("SqlServer:Identity", "1, 1"),
				UserId = table.Column<int>(nullable: false),
				OfficeId = table.Column<int>(nullable: false),
				FirstName = table.Column<string>(nullable: true),
				LastName = table.Column<string>(nullable: true)
			},
			constraints: table =>
			{
				table.PrimaryKey("PK_Superiors", x => x.SuperiorId);
				table.ForeignKey(
					name: "FK_Superior_Office_OfficeId",
					column: x => x.OfficeId,
					principalTable: "Offices",
					principalColumn: "OfficeId",
					onDelete: ReferentialAction.Cascade);
				table.ForeignKey(
					name: "FK_Superior_User_UserId",
					column: x => x.UserId,
					principalTable: "Users",
					principalColumn: "Id",
					onDelete: ReferentialAction.Cascade);
			});

			migrationBuilder.CreateTable(
			name: "SuperiorEvaluationRating",
			columns: table => new
			{
				SuperiorEvaluationId = table.Column<int>(nullable: false)
					.Annotation("SqlServer:Identity", "1, 1"),
				SuperiorId = table.Column<int>(nullable: false),
				AttendanceAndPunctuality = table.Column<float>(nullable: false),
				QualOfWorkOutput = table.Column<float>(nullable: false),
				QualOfWorkInput = table.Column<float>(nullable: false),
				AttitudeAndWorkBehaviour = table.Column<float>(nullable: false),
				OverallAssessment = table.Column<float>(nullable: false),
				OverallRating = table.Column<float>(nullable: false)
			},
			constraints: table =>
			{
				table.PrimaryKey("PK_SuperiorEvaluationRating", x => x.SuperiorEvaluationId);
				table.ForeignKey(
						name: "FK_SuperiorEvaluationRating_Superior_SuperiorId",
						column: x => x.SuperiorId,
						principalTable: "Superior",
						principalColumn: "SuperiorId",
						onDelete: ReferentialAction.Cascade);
			});

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
					OfficeId = table.Column<int>(type: "int", nullable: false)
						.Annotation("SqlServer:Identity", "1, 1"),
					SuperiorId = table.Column<int>(type: "int", nullable: false),
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Office", x => x.OfficeId);
					table.ForeignKey(
						name: "FK_Office_Superior_SuperiorId",
						column: x => x.SuperiorId,
						principalTable: "Superior",
						principalColumn: "SuperiorId",
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
					FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
					MiddleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
					LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
					Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
					BirthDate = table.Column<DateOnly>(type: "dateonly", nullable: true),
					Course = table.Column<string>(type: "nvarchar(max)", nullable: false),
					YearLevel = table.Column<int>(type: "int", nullable: false),
					UnitsAllowed = table.Column<int>(type: "int", nullable: false),
					DateStarted = table.Column<DateOnly>(type: "dateonly", nullable: true),
					SuperiorEvaluationId = table.Column<int>(type: "int", nullable: false)
					//may kulang pa here na mga fk :>>
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_NAS", x => x.NASId);
					table.ForeignKey(
						name: "FK_NAS_User_UserId",
						column: x => x.UserId,
						principalTable: "User",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
					table.ForeignKey(
						name: "FK_NAS_Office_OfficeId",
						column: x => x.OfficeId,
						principalTable: "Office",
						principalColumn: "OfficeId",
						onDelete: ReferentialAction.Cascade);
					table.ForeignKey(
						name: "FK_NAS_SuperiorEvaluation_SuperiorEvaluationId",
						column: x => x.SuperiorEvaluationId,
						principalTable: "SuperiorEvaluationRating",
						principalColumn: "SuperiorEvaluationId",
						onDelete: ReferentialAction.Cascade);
				});

			// Create an index for the Superior table
			migrationBuilder.CreateIndex(
				name: "IX_Superior_UserId",
				table: "Superior",
				column: "UserId");

			migrationBuilder.CreateIndex(
				name: "IX_Superior_OfficeId",
				table: "Superior",
				column: "OfficeId");

			// Create an index for the NAS table
			migrationBuilder.CreateIndex(
				name: "IX_NAS_UserId",
				table: "NAS",
				column: "UserId");

			migrationBuilder.CreateIndex(
				name: "IX_NAS_OfficeId",
				table: "NAS",
				column: "OfficeId");

			migrationBuilder.CreateIndex(
				name: "IX_NAS_SuperiorEvaluationId",
				table: "NAS",
				column: "SuperiorEvaluationId");

			// Create an index for the Office table
			migrationBuilder.CreateIndex(
				name: "IX_Office_SuperiorId",
				table: "Office",
				column: "SuperiorId");

			// Create an index for the SuperiorEvaluationRating table
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
				name: "User");
			migrationBuilder.DropTable(
				name: "Superior");
			migrationBuilder.DropTable(
                name: "Role");
        }
    }
}
