using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public partial class Subscription
    {
        [Key]
        [Column("Subscription")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SubscriptionId { get; set; }
        [MaxLength(255)]
        public string Email { get; set; }
    }
}