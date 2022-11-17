using Microsoft.EntityFrameworkCore.Migrations;

namespace NoteOnline.Migrations
{
    public partial class refactorContent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Url",
                table: "Contents",
                newName: "url");

            migrationBuilder.RenameColumn(
                name: "SetPassword",
                table: "Contents",
                newName: "setPassword");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Contents",
                newName: "password");

            migrationBuilder.RenameColumn(
                name: "Note",
                table: "Contents",
                newName: "note");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "url",
                table: "Contents",
                newName: "Url");

            migrationBuilder.RenameColumn(
                name: "setPassword",
                table: "Contents",
                newName: "SetPassword");

            migrationBuilder.RenameColumn(
                name: "password",
                table: "Contents",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "note",
                table: "Contents",
                newName: "Note");
        }
    }
}
