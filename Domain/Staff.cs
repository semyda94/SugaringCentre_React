using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Domain
{
    public partial class Staff
    {
        public Staff()
        {
            StaffImage = new HashSet<StaffImage>();
            ServiceStaff = new HashSet<ServiceStaff>();
            Leaves = new HashSet<Leave>();
        }
        
        [Key]
        [Column("Staff")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StaffId { get; set; }
        [Required]
        [MaxLength(255)]
        public string Username { get; set; }
        [Required]
        [MaxLength(255)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(255)]
        public string LastName { get; set; }
        [Required]
        [MaxLength(255)]
        public string Title { get; set; }
        public DateTime? Dob { get; set; }
        [MaxLength(64)]
        public string WorkingDaysOfWeek { get; set; }
        public DateTime? WorkingFrom { get; set; }
        public DateTime? WorkingTo { get; set; }

         [NotMapped]
        public string servicesStaff { get; set; }
        
        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual ICollection<StaffImage> StaffImage { get; set; }
        public virtual ICollection<ServiceStaff> ServiceStaff { get; set; }
        public virtual ICollection<Leave> Leaves { get; set; }

        public IEnumerable<int> GetWorkingDaysIds()
        {
            return this.WorkingDaysOfWeek.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse);
        }
    }
}