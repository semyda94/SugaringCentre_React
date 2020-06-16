using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Domain
{
    [Table("ProductSpecification")]
    public partial class ProductSpecification
    {
        [Key]
        [Column("ProductSpecification")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductSpecificationId { get; set; }
        [Column("Product")]
        public int ProductId { get; set; }
        [MaxLength(255)]
        public string Title { get; set; }
        public string Details { get; set; }
        
    }
}