using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ChangeOrderStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderItemOderItemId",
                table: "ProductOrder",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Product",
                table: "OrderItem",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProductOrder_OrderItemOderItemId",
                table: "ProductOrder",
                column: "OrderItemOderItemId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_Product",
                table: "OrderItem",
                column: "Product");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItem_Product_Product",
                table: "OrderItem",
                column: "Product",
                principalTable: "Product",
                principalColumn: "Product",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOrder_OrderItem_OrderItemOderItemId",
                table: "ProductOrder",
                column: "OrderItemOderItemId",
                principalTable: "OrderItem",
                principalColumn: "OrderItem",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItem_Product_Product",
                table: "OrderItem");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductOrder_OrderItem_OrderItemOderItemId",
                table: "ProductOrder");

            migrationBuilder.DropIndex(
                name: "IX_ProductOrder_OrderItemOderItemId",
                table: "ProductOrder");

            migrationBuilder.DropIndex(
                name: "IX_OrderItem_Product",
                table: "OrderItem");

            migrationBuilder.DropColumn(
                name: "OrderItemOderItemId",
                table: "ProductOrder");

            migrationBuilder.DropColumn(
                name: "Product",
                table: "OrderItem");
        }
    }
}
