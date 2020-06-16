using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain {
    public class ServiceStaff {
        // public ServiceStaff (int serviceStaffId, int serviceId, int staffId) {
        //     this.ServiceStaffId = serviceStaffId;
        //     this.ServiceId = serviceId;
        //     this.StaffId = staffId;
        // }

        [Key]
        [Column ("ServiceStaff")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ServiceStaffId { get; set; }

        [Column ("Service")]
        public int ServiceId { get; set; }

        [Column ("Staff")]
        public int StaffId { get; set; }

        public virtual Service ServiceNavigation { get; set; }
        public virtual Staff StaffNavigation { get; set; }
    }
}