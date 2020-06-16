using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialProject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Category = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Category);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    Order = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Client = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    Amount = table.Column<decimal>(nullable: false),
                    ExternalId = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.Order);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    Product = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ShortDescription = table.Column<string>(nullable: true),
                    Price = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.Product);
                });

            migrationBuilder.CreateTable(
                name: "ServiceCategory",
                columns: table => new
                {
                    ServiceCategory = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceCategory", x => x.ServiceCategory);
                });

            migrationBuilder.CreateTable(
                name: "Staff",
                columns: table => new
                {
                    Staff = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Dob = table.Column<DateTime>(nullable: true),
                    WorkingDaysOfWeek = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Staff", x => x.Staff);
                });

            migrationBuilder.CreateTable(
                name: "StaffAuthenticationInfo",
                columns: table => new
                {
                    AuthenticationInfo = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(nullable: true),
                    EncryptedPassword = table.Column<string>(nullable: true),
                    Staff = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StaffAuthenticationInfo", x => x.AuthenticationInfo);
                });

            migrationBuilder.CreateTable(
                name: "Subscription",
                columns: table => new
                {
                    Subscription = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscription", x => x.Subscription);
                });

            migrationBuilder.CreateTable(
                name: "OrderItem",
                columns: table => new
                {
                    OrderItem = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Order = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Amount = table.Column<decimal>(nullable: false),
                    Quantity = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItem", x => x.OrderItem);
                    table.ForeignKey(
                        name: "FK_OrderItem_Order_Order",
                        column: x => x.Order,
                        principalTable: "Order",
                        principalColumn: "Order",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductCategory",
                columns: table => new
                {
                    ProductCategory = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Product = table.Column<int>(nullable: false),
                    Category = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCategory", x => x.ProductCategory);
                    table.ForeignKey(
                        name: "FK_ProductCategory_Category_Category",
                        column: x => x.Category,
                        principalTable: "Category",
                        principalColumn: "Category",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductCategory_Product_Product",
                        column: x => x.Product,
                        principalTable: "Product",
                        principalColumn: "Product",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductImage",
                columns: table => new
                {
                    ProductImage = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Product = table.Column<int>(nullable: false),
                    Image = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductImage", x => x.ProductImage);
                    table.ForeignKey(
                        name: "FK_ProductImage_Product_Product",
                        column: x => x.Product,
                        principalTable: "Product",
                        principalColumn: "Product",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductOrder",
                columns: table => new
                {
                    ProductOrder = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Product = table.Column<int>(nullable: false),
                    Order = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductOrder", x => x.ProductOrder);
                    table.ForeignKey(
                        name: "FK_ProductOrder_Order_Order",
                        column: x => x.Order,
                        principalTable: "Order",
                        principalColumn: "Order",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductOrder_Product_Product",
                        column: x => x.Product,
                        principalTable: "Product",
                        principalColumn: "Product",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductSpecification",
                columns: table => new
                {
                    ProductSpecification = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Product = table.Column<int>(nullable: false),
                    Title = table.Column<string>(maxLength: 255, nullable: true),
                    Details = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductSpecification", x => x.ProductSpecification);
                    table.ForeignKey(
                        name: "FK_ProductSpecification_Product_Product",
                        column: x => x.Product,
                        principalTable: "Product",
                        principalColumn: "Product",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Service",
                columns: table => new
                {
                    Service = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ServiceCategory = table.Column<int>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Duration = table.Column<int>(nullable: false),
                    Price = table.Column<decimal>(nullable: false),
                    Image = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Service", x => x.Service);
                    table.ForeignKey(
                        name: "FK_Service_ServiceCategory_ServiceCategory",
                        column: x => x.ServiceCategory,
                        principalTable: "ServiceCategory",
                        principalColumn: "ServiceCategory",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Leave",
                columns: table => new
                {
                    Leave = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Staff = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Leave", x => x.Leave);
                    table.ForeignKey(
                        name: "FK_Leave_Staff_Staff",
                        column: x => x.Staff,
                        principalTable: "Staff",
                        principalColumn: "Staff",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StaffImage",
                columns: table => new
                {
                    StaffImage = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Staff = table.Column<int>(nullable: false),
                    Image = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StaffImage", x => x.StaffImage);
                    table.ForeignKey(
                        name: "FK_StaffImage_Staff_Staff",
                        column: x => x.Staff,
                        principalTable: "Staff",
                        principalColumn: "Staff",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Booking",
                columns: table => new
                {
                    Booking = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Service = table.Column<int>(nullable: false),
                    Staff = table.Column<int>(nullable: false),
                    Client = table.Column<int>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    Time = table.Column<DateTime>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Message = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Booking", x => x.Booking);
                    table.ForeignKey(
                        name: "FK_Booking_Service_Service",
                        column: x => x.Service,
                        principalTable: "Service",
                        principalColumn: "Service",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Booking_Staff_Staff",
                        column: x => x.Staff,
                        principalTable: "Staff",
                        principalColumn: "Staff",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServiceStaff",
                columns: table => new
                {
                    ServiceStaff = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Service = table.Column<int>(nullable: false),
                    Staff = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceStaff", x => x.ServiceStaff);
                    table.ForeignKey(
                        name: "FK_ServiceStaff_Service_Service",
                        column: x => x.Service,
                        principalTable: "Service",
                        principalColumn: "Service",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServiceStaff_Staff_Staff",
                        column: x => x.Staff,
                        principalTable: "Staff",
                        principalColumn: "Staff",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Booking_Service",
                table: "Booking",
                column: "Service");

            migrationBuilder.CreateIndex(
                name: "IX_Booking_Staff",
                table: "Booking",
                column: "Staff");

            migrationBuilder.CreateIndex(
                name: "IX_Leave_Staff",
                table: "Leave",
                column: "Staff");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_Order",
                table: "OrderItem",
                column: "Order");

            migrationBuilder.CreateIndex(
                name: "IX_ProductCategory_Category",
                table: "ProductCategory",
                column: "Category");

            migrationBuilder.CreateIndex(
                name: "IX_ProductCategory_Product",
                table: "ProductCategory",
                column: "Product");

            migrationBuilder.CreateIndex(
                name: "IX_ProductImage_Product",
                table: "ProductImage",
                column: "Product");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOrder_Order",
                table: "ProductOrder",
                column: "Order");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOrder_Product",
                table: "ProductOrder",
                column: "Product");

            migrationBuilder.CreateIndex(
                name: "IX_ProductSpecification_Product",
                table: "ProductSpecification",
                column: "Product");

            migrationBuilder.CreateIndex(
                name: "IX_Service_ServiceCategory",
                table: "Service",
                column: "ServiceCategory");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceStaff_Service",
                table: "ServiceStaff",
                column: "Service");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceStaff_Staff",
                table: "ServiceStaff",
                column: "Staff");

            migrationBuilder.CreateIndex(
                name: "IX_StaffImage_Staff",
                table: "StaffImage",
                column: "Staff");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Booking");

            migrationBuilder.DropTable(
                name: "Leave");

            migrationBuilder.DropTable(
                name: "OrderItem");

            migrationBuilder.DropTable(
                name: "ProductCategory");

            migrationBuilder.DropTable(
                name: "ProductImage");

            migrationBuilder.DropTable(
                name: "ProductOrder");

            migrationBuilder.DropTable(
                name: "ProductSpecification");

            migrationBuilder.DropTable(
                name: "ServiceStaff");

            migrationBuilder.DropTable(
                name: "StaffAuthenticationInfo");

            migrationBuilder.DropTable(
                name: "StaffImage");

            migrationBuilder.DropTable(
                name: "Subscription");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Service");

            migrationBuilder.DropTable(
                name: "Staff");

            migrationBuilder.DropTable(
                name: "ServiceCategory");
        }
    }
}
