using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL
{
    public class SysRolePermissionModel
    {
        public int ID { get; set; }
        public int ComponentID { get; set; }
        public int PermissionID { get; set; }
        public int RoleID { get; set; }
        public bool Allow { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
    }
}
