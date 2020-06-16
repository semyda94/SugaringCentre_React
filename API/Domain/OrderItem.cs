using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Domain
{
    [Table("OrderItem")]
    public partial class OrderItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("OrderItem")]
        public int OderItemId { get; set; }
        [Column("Order")]
        public int OrderId { get; set; }
        [Column("Product")]
        public int ProductId { get; set; }
        [MaxLength(255)]
        public string Name { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }
        [Column("Quantity")]
        public int Qty { get; set; }
        
        public virtual Order OrderNavigation { get; set; }
        public virtual ICollection<ProductOrder> ProductOrders { get; set; }
    }
}