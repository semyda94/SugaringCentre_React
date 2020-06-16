using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Api.Domain
{
    public partial class ProductImage
    {
        [Key]
        [Column("ProductImage")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductImageId { get; set; }
        [Column("Product")]
        public int ProductId { get; set; }
        public string Image { get; set; }
        [JsonIgnore]
        public virtual Product ProductNavigation { get; set; }
    }
}