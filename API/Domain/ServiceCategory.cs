using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Domain
{
    public partial class ServiceCategory
    {
        public ServiceCategory()
        {
            Services = new HashSet<Service>();
        }

        [Key]
        [Column("ServiceCategory")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ServiceCategoryId { get; set; }
        [MaxLength(255)]
        public string Title { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Service> Services { get; set; }
    }
}