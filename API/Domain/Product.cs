using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Api.Domain
{
    [Table("Product")]
    public partial class Product
    {
        public Product()
        {
            ProductCategory = new HashSet<ProductCategory>();
            ProductImages = new HashSet<ProductImage>();
            ProductSpecification = new HashSet<ProductSpecification>();
            OrderItems = new HashSet<OrderItem>();
        }
        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Product")]
        public int ProductId { get; set; }
        [MaxLength(255)]
        public string Title { get; set; }
        [Column("Description")]
        public string Desc { get; set; }
        public string ShortDescription { get; set; }
        [RegularExpression(@"^\d+\.\d{0,2}$")]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }
        [NotMapped] 
        public string CategorySelected { get; set; }

        [NotMapped] public int Qty { get; set; } = 1;

        [JsonIgnore] 
        public virtual ICollection<ProductCategory> ProductCategory { get; set; }
        public virtual ICollection<ProductSpecification> ProductSpecification { get; set; }
        public virtual ICollection<ProductImage> ProductImages { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}