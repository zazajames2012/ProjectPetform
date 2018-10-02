using ARSoft.Claim.DAL.ErrorHandler;
using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DAL.Agility
{
    public class SysRoleAgilityDAL
    {
        public List<DllSysRoleModel> GetSysRoleToDropDownList()
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            var ls = new List<DllSysRoleModel>();

            try
            {
                var roles = ctx.uspGetRoles();
                if (roles == null) return null;

                foreach (var role in roles)
                {
                    var sysRoleModel = new DllSysRoleModel();
                    sysRoleModel.ID = role.ID;
                    sysRoleModel.RoleName = role.RoleName;

                    ls.Add(sysRoleModel);
                }
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return ls;
        }
    }
}
