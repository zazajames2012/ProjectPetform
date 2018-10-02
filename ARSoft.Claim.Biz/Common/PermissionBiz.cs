using ARSoft.Claim.DAL.Common;
using ARSoft.Claim.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Biz.Common
{
    public class PermissionBiz
    {
        public List<SysPermissionModel> GetPermissionComponent(string FunctionCode, int UserID)
        {
            return PermissionDAL.GetPermissionComponent(FunctionCode, UserID);
        }
    }
}
