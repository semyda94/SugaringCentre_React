using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Api.Domain
{
    [Table("Category")]
    public partial class Category
    {
        public Category()
        {
            ProductCategory = new HashSet<ProductCategory>();
        }
        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Category")]
        public int CategoryId { get; set; }
        [MaxLength(255)]
        public string Name { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<ProductCategory> ProductCategory { get; set; }
    }
}