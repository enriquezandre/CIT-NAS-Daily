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
					SummaryEvaluationId = table.Column<int>(type: "int", nullable: false)
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
						name: "FK_NAS_SummaryEvaluation_SummaryEvaluationId",
						column: x => x.SummaryEvaluationId,
						principalTable: "SummaryEvaluation",
						principalColumn: "SummaryEvaluationId",
						onDelete: ReferentialAction.Cascade);
				});
		}

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Role");
        }
    }
}
