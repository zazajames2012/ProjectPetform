using ARSoft.Claim.DAL.ErrorHandler;
using ARSoft.Claim.DataModel;
using ARSoft.Claim.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DAL.Common
{
    public class PermissionDAL
    {
        public static List<SysPermissionModel> GetPermissionComponent(string FunctionCode, int UserID)
        {
            var ctx = new CLAIMEntities();
            var result = new List<SysPermissionModel>();
            try
            {
                var compernentID = ctx.SYS_COMPONENTS.First(m => m.FunctionCode == FunctionCode).ID;
                //var componentList = ctx.uspGetPermissionComponentByParentID(UserID, compernentID);
                //foreach(var item in componentList)
                //{
                //    var sysModel = new SysPermissionModel();
                //    sysModel.ComponentID = item.ComponentID;
                //    sysModel.Allow = item.Allow;
                //    sysModel.PermissionName = item.PermissionName;
                //    sysModel.FunctionCode = item.FunctionCode;
                //    result.Add(sysModel);
                //}
            }
            catch (Exception ex)
            {
                var objErr = ErrorHandlerControlDAL.GetLastInnerError(ex);

            }

            return result;
        }
    }
}
