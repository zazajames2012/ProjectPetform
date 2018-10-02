using ARSoft.Claim.DAL.Master;
using ARSoft.Claim.Model.BOL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Biz.Master
{
    public class SysUserBiz
    {
        private SysUserDAL objDAL;
        public SysUserBiz()
        {
            objDAL = new SysUserDAL();
        }

        public SysUsersModel GetSysUserById(int sysUserId)
        {
            return objDAL.GetSysUserById(sysUserId);
        }

        public List<SysUsersModel> GetSysUsers(int? pageIndex, int? pageSize, string sort, SysUsersModel sysuser)
        {
            return objDAL.getSysUsers(pageIndex, pageSize, sort, sysuser);
        }

        public bool addSysUsers(SysUsersModel pSysUserModel)
        {
            return objDAL.addSysUsers(pSysUserModel);
        }

        public bool editSysUsers(SysUsersModel pSysUserModel)
        {
            return objDAL.editSysUsers(pSysUserModel);
        }

        public bool editRoleAssign(SysUsersModel pSysUserModel)
        {
            return objDAL.editRoleAssign(pSysUserModel);
        }

        public bool delSysUsers(string UID)
        {
            return objDAL.delSysUsers(UID);
        }

        public Hashtable ValidateAddSysUser(SysUsersModel pSysUserModel)
        {
            return objDAL.ValidateAddSysUser(pSysUserModel);
        }

        public Hashtable ValidateEditSysUser(SysUsersModel pSysUserModel)
        {
            return objDAL.ValidateEditSysUser(pSysUserModel);
        }

        public Hashtable ValidateDelSysUser(string UID)
        {
            return objDAL.ValidateDelSysUser(UID);
        }
    }
}
