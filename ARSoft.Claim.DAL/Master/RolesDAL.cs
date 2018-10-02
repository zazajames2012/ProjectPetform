using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.EntityFramework;
using ARSoft.Claim.Model.Enumeration;

namespace ARSoft.Claim.DAL.Master
{
    public class RolesDAL
    {
        public List<RolesModel> GetRoleList(int? pageIndex, int? pageSize, string sort, RolesModel searchModel)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var enumHelper = new EnumHelper();
                var listOfRole = new List<RolesModel>();

                try
                {
                    var masterResult = context.uspGetListOfSysRole(pageIndex,pageSize,sort,searchModel.RoleName,searchModel.Description,searchModel.StrStatus);
                    if (masterResult == null) return null;
                    int iRow = 1;
                    foreach (var row in masterResult)
                    {
                        var item = new RolesModel();
                        item.RowNumber = iRow;
                        item.ID = row.ID;
                        item.RoleName = row.RoleName;
                        item.Description = row.Description;
                        item.Status = row.Status;
                        item.StatusName = EnumHelper.GetEnumDescription((Status)(int)row.Status);
                        item.Admin = row.Admin;
                        item.AdminStatus = EnumHelper.GetEnumDescription((AdminStatus)Convert.ToInt16(row.Admin));
                        //item.CreatedBy = row.CreatedBy;
                        //item.CreatedDate = row.CreatedDate;
                        //item.UpdateBy = row.UpdatedBy;
                        //item.UpdateDate = row.UpdatedDate;
                        listOfRole.Add(item);
                        iRow += 1;
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                return listOfRole;
            }
        }
        public bool AddRoleItem(RolesModel model)
        {
            var RoleID = GetLastRoleID();
            CLAIMEntities ctx = new CLAIMEntities();
            bool results = false;

            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    var addRole = new SYS_ROLES();
                    addRole.ID = RoleID;
                    addRole.RoleName = model.RoleName;
                    addRole.Description = model.Description;
                    addRole.Admin = false;
                    //addRole.Status = 1;
                    addRole.CreatedBy = 1;
                    addRole.CreatedDate = DateTime.Now;

                    ctx.SYS_ROLES.Add(addRole);
                    ctx.SaveChanges();

                    transaction.Commit();
                    results = true;

                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
            }
            return results;
        }

        public bool EditRoleItem(RolesModel model)
        {
            CLAIMEntities ctx = new CLAIMEntities();
            bool results = false;

            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    var editRole = ctx.SYS_ROLES.Where(item => item.ID == model.ID).FirstOrDefault();
                    var UpdateDate = DateTime.Now;

                    if (editRole != null)
                    {
                        editRole.RoleName = model.RoleName;
                        editRole.Description = model.Description;
                        //editRole.Status = model.Status;
                        editRole.Admin = model.Admin;
                        editRole.UpdatedBy = model.UpdatedBy;
                        editRole.UpdatedDate = UpdateDate;

                        ctx.SaveChanges();
                    }
                    transaction.Commit();
                    results = true;

                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
            }
            return results;
        }

        public bool DeleteRoleItem(RolesModel model)
        {
            CLAIMEntities ctx = new CLAIMEntities();
            bool results = false;
            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    var deleteRole = ctx.SYS_ROLES.Where(item => item.ID == model.ID ).FirstOrDefault();
                    var UpdateDate = DateTime.Now;

                    if (deleteRole != null)
                    {
                        //deleteRole.Status = 0;
                        deleteRole.UpdatedBy = model.UpdatedBy;
                        deleteRole.UpdatedDate = UpdateDate;

                        ctx.SaveChanges();
                    }
                    transaction.Commit();
                    results = true;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
            }
            return results;
        }

        public bool CheckRoleExisting(RolesModel model, string mode)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                //var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    List<SYS_ROLES> masterRoleItem;
                    if (mode == "Add")
                    {
                        masterRoleItem = context.SYS_ROLES.Where(s => (s.RoleName.Trim().ToUpper() == model.RoleName.Trim().ToUpper())).ToList();
                    }
                    else
                    {
                        masterRoleItem = null;
                    }

                    if (masterRoleItem != null && masterRoleItem.Count() > 0) return true;
                }
                catch (Exception ex)
                {
                    //errorBiz.WriteLog(ex);
                    throw ex;
                }

                return false;
            }
        }

        public RolesModel GetRoleByID(int ID)
        {
            var ctx = new CLAIMEntities();
            var item = new RolesModel();
            //var errorBiz = new ErrorHandlerControlDAL();

            try
            {
                var RoleModel = ctx.SYS_ROLES.Where(c => c.ID == ID).First();

                item.ID = RoleModel.ID;
                item.RoleName = RoleModel.RoleName;
                item.Description = RoleModel.Description;
                //item.Status = RoleModel.Status;
                //item.StatusName = EnumHelper.GetEnumDescription((Status)RoleModel.Status);
                item.Admin = RoleModel.Admin;
                item.AdminStatus = EnumHelper.GetEnumDescription((AdminStatus)Convert.ToInt16(RoleModel.Admin));
                item.CreatedBy = RoleModel.CreatedBy;
                item.CreatedDate = RoleModel.CreatedDate;
                //item.UpdatedBy = RoleModel.UpdatedBy.Value;
                //item.UpdatedDate = RoleModel.UpdatedDate.Value;
            }
            catch (Exception ex)
            {
                //errorBiz.WriteLog(ex);
                throw ex;
            }

            return item;
        }

        public int GetLastRoleID()
        {
            var ctx = new CLAIMEntities();
            return ctx.SYS_ROLES.OrderByDescending(u => u.ID).FirstOrDefault().ID + 1;
        }

    }
}
