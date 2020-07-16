using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Api.Domain
{
    public partial class StaffImage
    {
        [Key]
        [Column("StaffImage")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StaffImageId { get; set; }
        [Column("Staff")]
        public int StaffId { get; set; }
        public string Image { get; set; }
        
        [JsonIgnore]
        public virtual Staff StaffNavigation { get; set; }
    }
}