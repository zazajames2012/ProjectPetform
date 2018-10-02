using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL
{
    public class SysRoleModel
    {
        public int ID { get; set; }
        public string Caption { get; set; }
        public int ParentId { get; set; }
        public int Level { get; set; }
        public short ScreenSequence { get; set; }
        public bool AllowGrant { get; set; }
        public bool AllowSearch { get; set; }
        public bool AllowAdd { get; set; }
        public bool AllowEdit { get; set; }
        public bool AllowDelete { get; set; }
        public bool AllowView { get; set; }
        public bool HasChild { get; set; }
        public int RoleID { get; set; }
        public int CreatedBy { get; set; }
        public int UpdatedBy { get; set; }
    }

    public class DllSysRoleModel
    {
        public int ID { get; set; }
        public string RoleName { get; set; }
    }
    public class RolePermissionModel
    {
        public bool IsAdministrator { get; set; }
        public bool IsPurchaseManager { get; set; }
        public bool IsLeadASP { get; set; }
        public bool IsStockManager { get; set; }
        public bool IsStockAdmin { get; set; }
        public bool IsTechEngineerRepair { get; set; }
        public bool IsTechEngineerOnsite { get; set; }
        public bool IsBufferAdmin { get; set; }
        public bool IsProjectManager { get; set; }
        public bool IsSamUser { get; set; }
        public bool IsSale { get; set; }
        public bool IsAdminInventory { get; set; }
        public bool IsAdminBuffer { get; set; }

    }
}
