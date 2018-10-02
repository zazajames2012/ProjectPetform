using ARSoft.Claim.DAL.Agility;
using ARSoft.Claim.Model.BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Biz.Agility
{
    public class SysRoleAgility
    {
        private SysRoleAgilityDAL objDAL;

        public SysRoleAgility()
        {
            objDAL = new SysRoleAgilityDAL();
        }

        public List<DllSysRoleModel> GetSysRoleToDropDownList()
        {
            return objDAL.GetSysRoleToDropDownList();
        }
    }
}
