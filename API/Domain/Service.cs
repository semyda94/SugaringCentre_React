using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Api.Domain
{
    [Table("Service")]
    public partial class Service
    {
        public Service()
        {
            Bookings = new HashSet<Booking>();
            ServiceStaff = new HashSet<ServiceStaff>();
        }
        
        [Key]
        [Column("Service")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ServiceId { get; set; }
        [Column("ServiceCategory")]
        public int ServiceCategoryId { get; set; }
        [MaxLength(255)]
        public string Title { get; set; }
        [Column("Description")]
        public string Desc { get; set; }
        public int Duration { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }
        public string Image { get; set; }
        [NotMapped]
        public string SelectedStaff { get; set; }

        public virtual ServiceCategory ServiceCategoryNavigation { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual ICollection<ServiceStaff> ServiceStaff { get; set; }
    }
}