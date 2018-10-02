using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL
{
    public class SysUsersModel : BaseSearchModel
    {
        public int ID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public int? EmployeeID { get; set; }
        public byte Status { get; set; }
        public string StrRoleID { get; set; }
        public string EMP_NAME { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }

        //==========================//
        public string StatusTxt { get; set; }
    }
}
