using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Domain
{
    public partial class ProductCategory
    {
        [Key]
        [Column("ProductCategory")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductCategoryId { get; set; }
        [Column("Product")]
        public int ProductId { get; set; }
        [Column("Category")]
        public int CategoryId { get; set; }

        public virtual Category CategoryNavigation { get; set; }
        public virtual Product ProductNavigation { get; set; }
    }
}