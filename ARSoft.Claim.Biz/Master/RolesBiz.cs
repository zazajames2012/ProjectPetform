using ARSoft.Claim.DAL.Master;
using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.BOL.Authorization;
using ARSoft.Claim.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Biz.Master
{
    public class RolesBiz
    {
        private RolesDAL objDAL;

        public RolesBiz()
        {
            objDAL = new RolesDAL();
        }

        public List<RolesModel> GetRoleList(int? pageIndex, int? pageSize, string sort, RolesModel searchModel)
        {
            return objDAL.GetRoleList(pageIndex, pageSize, sort, searchModel);
        }
        public bool AddRoleItem(RolesModel model)
        {
            return objDAL.AddRoleItem(model);
        }
        public bool EditRoleItem(RolesModel model)
        {
            return objDAL.EditRoleItem(model);
        }
        public bool DeleteRoleItem(RolesModel model)
        {
            return objDAL.DeleteRoleItem(model);
        }
        public bool checkRoleExisting(RolesModel model,string mode)
        {
            return objDAL.CheckRoleExisting(model, mode);
        }
        public RolesModel GetRoleByID(int ID)
        {
            return objDAL.GetRoleByID(ID);
        }
    }
}
