using Microsoft.EntityFrameworkCore.Migrations;

namespace NoteOnline.Migrations
{
    public partial class addNewUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "newUrl",
                table: "Contents",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "newUrl",
                table: "Contents");
        }
    }
}
