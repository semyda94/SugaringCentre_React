using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Domain
{
    public partial class Leave
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Leave")]
        public int LeaveId { get; set; }
        [Column("Staff")]
        public int StaffId { get; set; }
        public DateTime Date { get; set; }
        
        public virtual Staff StaffNavigation { get; set; }
    }
}