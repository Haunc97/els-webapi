using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ELS.Migrations
{
    /// <inheritdoc />
    public partial class Updated_AppVocabularyStudySets_Added_Id : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "AppVocabularyStudySets",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "AppVocabularyStudySets");
        }
    }
}
