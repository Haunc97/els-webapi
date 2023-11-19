using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ELS.Migrations
{
    /// <inheritdoc />
    public partial class Added_DateRangeConfig_To_StudySet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DateRangeConfig",
                table: "AppStudySets",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateRangeConfig",
                table: "AppStudySets");
        }
    }
}
