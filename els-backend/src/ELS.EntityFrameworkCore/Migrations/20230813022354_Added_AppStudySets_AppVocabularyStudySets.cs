using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ELS.Migrations
{
    /// <inheritdoc />
    public partial class Added_AppStudySets_AppVocabularyStudySets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppStudySets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WordTypeConfig = table.Column<int>(type: "int", nullable: true),
                    LevelConfig = table.Column<int>(type: "int", nullable: true),
                    TenantId = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppStudySets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppVocabularyStudySets",
                columns: table => new
                {
                    StudySetId = table.Column<int>(type: "int", nullable: false),
                    VocabularyId = table.Column<int>(type: "int", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppVocabularyStudySets", x => new { x.StudySetId, x.VocabularyId });
                    table.ForeignKey(
                        name: "FK_AppVocabularyStudySets_AppStudySets_StudySetId",
                        column: x => x.StudySetId,
                        principalTable: "AppStudySets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppVocabularyStudySets_AppVocabularies_VocabularyId",
                        column: x => x.VocabularyId,
                        principalTable: "AppVocabularies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppVocabularyStudySets_VocabularyId",
                table: "AppVocabularyStudySets",
                column: "VocabularyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppVocabularyStudySets");

            migrationBuilder.DropTable(
                name: "AppStudySets");
        }
    }
}
