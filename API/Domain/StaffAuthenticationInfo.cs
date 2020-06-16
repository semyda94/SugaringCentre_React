using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Domain
{
    public class StaffAuthenticationInfo
    {
        [Key]
        [Column("AuthenticationInfo")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AuthenticationInfoId { get; set; }

        [MaxLength(255)]
        public string Username { get; set; }

        [MaxLength(512)]
        public string EncryptedPassword { get; set; }

        [Column("Staff")]
        public int StaffId { get; set; }
    }
}