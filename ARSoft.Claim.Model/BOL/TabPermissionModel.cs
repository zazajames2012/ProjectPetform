using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DataModel
{
    // *** Update by : Nutthapaphon Sopradisth ***
    // *** Update Date : 08/12/2015 13:00  ***
    public class TabPermissionModel
    {        
        public int JobStatusID { get; set; }
        public int TabIndex { get; set; }
        public int? ID { get; set; }
        public string TabName { get; set; }
        public string FunctionCode { get; set; }
        public bool EnabledDetailEdit { get; set; }
        public bool EnabledTab { get; set; }
        public bool EnabledFunction { get; set; }
        public bool IsAllowTab { get; set; }
        public bool IsAllowPrint { get; set; }
        public bool IsAllowSave { get; set; }
        public bool IsAllowOpenJob { get; set; }
        public bool IsAllowCancelJob { get; set; }
        public bool IsAllowCloseJob { get; set; }
        public bool IsEnableCloseJob { get; set; }
        public bool IsAllowDeleteJobEquipment { get; set; }
        //Add for Component permission
        public string[] ComponentsName { get; set; }
        public bool[] ComponentsIsAllowGrant { get; set; }
        public bool[] ComponentsIsAllowEdit { get; set; }
        public string RoleList { get; set; }
        public SysPermissionModel AllowTabPermissions { get; set; }

    }

    public class TabPermissionFunctionModel
    {
        public int TabIndex { get; set; }
        public string FunctionCode { get; set; }
        public bool IsAllow { get; set; }
    }

    public class JobPermissionFunctionModel
    {       
        public int JobID { get; set; }
        public int JobCategoryID { get; set; }
        public int UserID { get; set; }
        public string JobActionType { get; set; }
        public Nullable<bool> IsBufferOnsite { get; set; }
    }

    public class JobPermissionServiceWarrantyModel
    {
        public int JobID { get; set; }
        public string JobNo { get; set; }
        public Nullable<byte> WarrantyTypeID { get; set; }
        public Nullable<bool> BufferWarranty { get; set; }
        public Nullable<bool> StockWarranty { get; set; }
        public Nullable<bool> QuotationWarranty { get; set; }
        public Nullable<bool> ClaimWarranty { get; set; }
        public Nullable<bool> InternalRepairWarranty { get; set; }
        public Nullable<bool> Warranty06 { get; set; }
        public Nullable<int> BrandID { get; set; }
        public string BrandName { get; set; }
        public Nullable<int> ProductID { get; set; }
        public string ProductName { get; set; }
        public int BuID { get; set; }
        public bool IsClosedRepair { get; set; }
    }

    public class SysPermissionModel
    {
        public int ComponentID { get; set; }
        public string FunctionCode { get; set; }
        public bool IsAccess { get; set; }
        public bool IsAdd { get; set; }
        public bool IsDelete { get; set; }
        public bool IsEdit { get; set; }
        public bool IsView { get; set; }
        public string PermissionName { get; set; }
        public bool Allow { get; set; }

    }

}
