using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CITNASDaily.Repositories.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleOne : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "RoleId", "RoleName" },
                values: new object[] { 1, "OAS" });
		}

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Role",
                keyColumn: "RoleId",
                keyValue: 1);
        }
    }
}
