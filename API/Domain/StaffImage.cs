using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        
        public virtual Staff StaffNavigation { get; set; }
    }
}