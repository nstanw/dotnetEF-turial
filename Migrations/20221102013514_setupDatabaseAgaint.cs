using Microsoft.EntityFrameworkCore.Migrations;

namespace noteOnlineV01.Migrations
{
    public partial class setupDatabaseAgaint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "content",
                table: "Contents");

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

            migrationBuilder.AddColumn<string>(
                name: "DocumentId",
                table: "Contents",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NewUrl",
                table: "Contents",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "Contents",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DocumentId",
                table: "Contents");

            migrationBuilder.DropColumn(
                name: "NewUrl",
                table: "Contents");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "Contents");

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

            migrationBuilder.AddColumn<string>(
                name: "content",
                table: "Contents",
                type: "text",
                nullable: true);
        }
    }
}
