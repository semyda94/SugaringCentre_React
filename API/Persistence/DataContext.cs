using Api.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options) 
        {
        }

        public virtual DbSet<Booking> Bookings { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderItem> OrderItems { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductCategory> ProductCategory { get; set; }
        public virtual DbSet<ProductImage> ProductImage { get; set; }
        public virtual DbSet<ProductSpecification> ProductSpecification { get; set; }
        public virtual DbSet<Staff> Staff {get; set;}
        public virtual DbSet<StaffImage> StaffImage { get; set; }
        public virtual DbSet<Service> Services { get; set; }
        public virtual DbSet<ServiceCategory> ServiceCategory { get; set; }
        public virtual DbSet<ServiceStaff> ServiceStaff { get; set; }
        public virtual DbSet<Leave> Leave { get; set; }
        public virtual DbSet<StaffAuthenticationInfo> StaffAuthenticationInfo { get; set; }
        public virtual DbSet<Subscription> Subscription { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)   {
            base.OnModelCreating(builder);
        }
    }
}