using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Domain
{
    public class ProductOrder
    {
        [Key]
        [Column("ProductOrder")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductOrderId { get; set; }
        [Column("Product")]
        public int ProductId { get; set; }
        [Column("Order")]
        public int OrderId { get; set; }
        
        public virtual Order OrderNavigation { get; set; }
        public virtual Product ProductNavigation { get; set; }
    }
}