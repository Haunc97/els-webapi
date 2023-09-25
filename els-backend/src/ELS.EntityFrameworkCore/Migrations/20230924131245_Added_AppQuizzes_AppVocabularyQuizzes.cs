using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ELS.Migrations
{
    /// <inheritdoc />
    public partial class Added_AppQuizzes_AppVocabularyQuizzes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppQuizzes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalCount = table.Column<int>(type: "int", nullable: false),
                    CorrectCount = table.Column<int>(type: "int", nullable: false),
                    Percentage = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    CompletionTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    TenantId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppQuizzes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppVocabularyQuizzes",
                columns: table => new
                {
                    QuizId = table.Column<int>(type: "int", nullable: false),
                    VocabularyId = table.Column<int>(type: "int", nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppVocabularyQuizzes", x => new { x.QuizId, x.VocabularyId });
                    table.ForeignKey(
                        name: "FK_AppVocabularyQuizzes_AppQuizzes_QuizId",
                        column: x => x.QuizId,
                        principalTable: "AppQuizzes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppVocabularyQuizzes_AppVocabularies_VocabularyId",
                        column: x => x.VocabularyId,
                        principalTable: "AppVocabularies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppVocabularyQuizzes_VocabularyId",
                table: "AppVocabularyQuizzes",
                column: "VocabularyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppVocabularyQuizzes");

            migrationBuilder.DropTable(
                name: "AppQuizzes");
        }
    }
}
