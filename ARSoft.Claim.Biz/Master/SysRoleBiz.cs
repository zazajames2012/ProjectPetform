using ARSoft.Claim.DAL.Master;
using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Biz.Master
{
    // *** Update by : Nutthapaphon Sopradisth ***
    // *** Update Date : 20/06/2016 13:00  ***
    public class RoleAssignmentBiz
    {
        private SysRoleDAL objDAL;
        public RoleAssignmentBiz()
        {
            objDAL = new SysRoleDAL();
        }

        #region Role Assignment Management
        public List<DllSysRoleModel> GetRoleList()
        {
            return objDAL.GetRoleList();
        }

        public List<SysRoleModel> GetSysRolePermissionList()
        {
            return objDAL.GetSysRolePermissionList();
        }

        public List<SysRoleModel> GetSysRolePermissionList(int type, int roleId, int level)
        {
            return objDAL.GetSysRolePermissionList(type, roleId, level);
        }

        public List<SysRoleModel> AdjustFormatSysRolePermission(List<SysRoleModel> list)
        {
            return objDAL.AdjustFormatSysRolePermission(list);
        }

        public List<SysRoleModel> GetChildSysRolePermissionList(int type, int roleId, int level, int parentId)
        {
            return objDAL.GetChildSysRolePermissionList(type, roleId, level, parentId);
        }

        public bool AddSysRolePermissionCollection(SysRoleModel[] sysRoleCollection)
        {
            return objDAL.AddSysRolePermissionCollection(sysRoleCollection);
        }

        public bool UpdateSysRolePermissionCollection(List<SysRolePermissionModel> list)
        {
            return objDAL.UpdateSysRolePermissionCollection(list);
        }

        public bool DeleteSysRolePermissionCollection(List<SysRolePermissionModel> list)
        {
            return objDAL.DeleteSysRolePermissionCollection(list);
        }

        public bool AddSysRolePermission(SysRolePermissionModel sysRolePermissionModel)
        {
            return objDAL.AddSysRolePermission(sysRolePermissionModel);
        }

        public bool AddSysRolePermission(SysRolePermissionModel sysRolePermissionModel, CLAIMEntities context)
        {
            return objDAL.AddSysRolePermission(sysRolePermissionModel, context);
        }

        public bool UpdateSysRolePermission(SysRolePermissionModel sysRolePermissionModel)
        {
            return objDAL.UpdateSysRolePermission(sysRolePermissionModel);
        }

        public bool UpdateSysRolePermission(SysRolePermissionModel sysRolePermissionModel, CLAIMEntities context)
        {
            return objDAL.UpdateSysRolePermission(sysRolePermissionModel, context);
        }

        public bool DeleteSysRolePermission(SysRolePermissionModel sysRolePermissionModel)
        {
            return objDAL.DeleteSysRolePermission(sysRolePermissionModel);
        }

        public bool CheckExistingSysRolePermission(SysRolePermissionModel sysRolePermissionModel)
        {
            return objDAL.CheckExistingSysRolePermission(sysRolePermissionModel);
        }

        public bool CheckExistingSysRolePermission(SysRolePermissionModel sysRolePermissionModel, CLAIMEntities context)
        {
            return objDAL.CheckExistingSysRolePermission(sysRolePermissionModel, context);
        }

        #endregion

    }
}
