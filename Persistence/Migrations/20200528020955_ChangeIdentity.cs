using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ChangeIdentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_AspNetUsers_StaffNavigationId",
                table: "Booking");

            migrationBuilder.DropForeignKey(
                name: "FK_Leave_AspNetUsers_StaffNavigationId",
                table: "Leave");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceStaff_AspNetUsers_StaffNavigationId",
                table: "ServiceStaff");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffImage_AspNetUsers_StaffNavigationId",
                table: "StaffImage");

            migrationBuilder.DropIndex(
                name: "IX_StaffImage_StaffNavigationId",
                table: "StaffImage");

            migrationBuilder.DropIndex(
                name: "IX_ServiceStaff_StaffNavigationId",
                table: "ServiceStaff");

            migrationBuilder.DropIndex(
                name: "IX_Leave_StaffNavigationId",
                table: "Leave");

            migrationBuilder.DropIndex(
                name: "IX_Booking_StaffNavigationId",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "StaffNavigationId",
                table: "StaffImage");

            migrationBuilder.DropColumn(
                name: "StaffNavigationId",
                table: "ServiceStaff");

            migrationBuilder.DropColumn(
                name: "StaffNavigationId",
                table: "Leave");

            migrationBuilder.DropColumn(
                name: "StaffNavigationId",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "Dob",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Staff",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "WorkingDaysOfWeek",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Staff",
                columns: table => new
                {
                    Staff = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(maxLength: 255, nullable: false),
                    LastName = table.Column<string>(maxLength: 255, nullable: false),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    Dob = table.Column<DateTime>(nullable: true),
                    WorkingDaysOfWeek = table.Column<string>(maxLength: 64, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Staff", x => x.Staff);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StaffImage_Staff",
                table: "StaffImage",
                column: "Staff");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceStaff_Staff",
                table: "ServiceStaff",
                column: "Staff");

            migrationBuilder.CreateIndex(
                name: "IX_Leave_Staff",
                table: "Leave",
                column: "Staff");

            migrationBuilder.CreateIndex(
                name: "IX_Booking_Staff",
                table: "Booking",
                column: "Staff");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_Staff_Staff",
                table: "Booking",
                column: "Staff",
                principalTable: "Staff",
                principalColumn: "Staff",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Leave_Staff_Staff",
                table: "Leave",
                column: "Staff",
                principalTable: "Staff",
                principalColumn: "Staff",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceStaff_Staff_Staff",
                table: "ServiceStaff",
                column: "Staff",
                principalTable: "Staff",
                principalColumn: "Staff",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StaffImage_Staff_Staff",
                table: "StaffImage",
                column: "Staff",
                principalTable: "Staff",
                principalColumn: "Staff",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_Staff_Staff",
                table: "Booking");

            migrationBuilder.DropForeignKey(
                name: "FK_Leave_Staff_Staff",
                table: "Leave");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceStaff_Staff_Staff",
                table: "ServiceStaff");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffImage_Staff_Staff",
                table: "StaffImage");

            migrationBuilder.DropTable(
                name: "Staff");

            migrationBuilder.DropIndex(
                name: "IX_StaffImage_Staff",
                table: "StaffImage");

            migrationBuilder.DropIndex(
                name: "IX_ServiceStaff_Staff",
                table: "ServiceStaff");

            migrationBuilder.DropIndex(
                name: "IX_Leave_Staff",
                table: "Leave");

            migrationBuilder.DropIndex(
                name: "IX_Booking_Staff",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "DisplayName",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "StaffNavigationId",
                table: "StaffImage",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StaffNavigationId",
                table: "ServiceStaff",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StaffNavigationId",
                table: "Leave",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StaffNavigationId",
                table: "Booking",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Dob",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Staff",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "AspNetUsers",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "WorkingDaysOfWeek",
                table: "AspNetUsers",
                type: "nvarchar(64)",
                maxLength: 64,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StaffImage_StaffNavigationId",
                table: "StaffImage",
                column: "StaffNavigationId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceStaff_StaffNavigationId",
                table: "ServiceStaff",
                column: "StaffNavigationId");

            migrationBuilder.CreateIndex(
                name: "IX_Leave_StaffNavigationId",
                table: "Leave",
                column: "StaffNavigationId");

            migrationBuilder.CreateIndex(
                name: "IX_Booking_StaffNavigationId",
                table: "Booking",
                column: "StaffNavigationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_AspNetUsers_StaffNavigationId",
                table: "Booking",
                column: "StaffNavigationId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Leave_AspNetUsers_StaffNavigationId",
                table: "Leave",
                column: "StaffNavigationId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceStaff_AspNetUsers_StaffNavigationId",
                table: "ServiceStaff",
                column: "StaffNavigationId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StaffImage_AspNetUsers_StaffNavigationId",
                table: "StaffImage",
                column: "StaffNavigationId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
