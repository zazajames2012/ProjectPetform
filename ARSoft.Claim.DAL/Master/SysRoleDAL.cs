using ARSoft.Claim.DAL.ErrorHandler;
using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ARSoft.Utility;

namespace ARSoft.Claim.DAL.Master
{
    public class SysRoleDAL
    {
        #region Role Assignment Management
        public List<DllSysRoleModel> GetRoleList()
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var listOfData = new List<DllSysRoleModel>();
                var errorBiz = new ErrorHandlerControlDAL();

                try
                {
                    var roleEntities = context.uspGetRoles();
                    if (roleEntities == null && roleEntities.Count() == 0) return null;

                    foreach (var roleEntity in roleEntities)
                    {
                        var sysRoleModel = new DllSysRoleModel();

                        sysRoleModel.ID = roleEntity.ID;
                        sysRoleModel.RoleName = roleEntity.RoleName;

                        listOfData.Add(sysRoleModel);
                    }
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return listOfData;
            }
        }

        public List<SysRoleModel> GetSysRolePermissionList()
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var listOfSysRole = new List<SysRoleModel>();
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    var rolePermissionEntities = context.uspGetRolePermissions();
                    if (rolePermissionEntities == null) return null;

                    foreach (var rolePermissionEntity in rolePermissionEntities)
                    {
                        var sysRoleModel = new SysRoleModel();

                        sysRoleModel.ID = rolePermissionEntity.ID;
                        sysRoleModel.Caption = rolePermissionEntity.CAPTION;
                        sysRoleModel.ParentId = rolePermissionEntity.PARENTID == null ? 0 : (int)rolePermissionEntity.PARENTID;
                        sysRoleModel.Level = rolePermissionEntity.LEVELS;
                        sysRoleModel.ScreenSequence = (short)rolePermissionEntity.SCREENSEQUENCE;
                        sysRoleModel.AllowGrant = (Int32)rolePermissionEntity.Grant == 1 ? true : false;
                        sysRoleModel.AllowAdd = (bool)rolePermissionEntity.Add;
                        sysRoleModel.AllowEdit = (bool)rolePermissionEntity.Edit;
                        sysRoleModel.AllowDelete = (bool)rolePermissionEntity.Delete;
                        sysRoleModel.AllowView = (bool)rolePermissionEntity.View;
                        sysRoleModel.AllowSearch = (bool)rolePermissionEntity.Search;
                        sysRoleModel.HasChild = (bool)rolePermissionEntity.HasChild;

                        listOfSysRole.Add(sysRoleModel);
                    }
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return listOfSysRole;
            }
        }

        public List<SysRoleModel> GetSysRolePermissionList(int type, int roleId, int level)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var listOfSysRole = new List<SysRoleModel>();
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    var rolePermissionEntities = context.uspGetRolePermissionByRoleID(type, roleId, level);
                    if (rolePermissionEntities == null) return null;

                    foreach (var rolePermissionEntity in rolePermissionEntities)
                    {
                        var sysRoleModel = new SysRoleModel();

                        sysRoleModel.ID = rolePermissionEntity.ID;
                        sysRoleModel.ParentId = rolePermissionEntity.PARENTID == null ? 0 : (int)rolePermissionEntity.PARENTID;
                        sysRoleModel.Caption = rolePermissionEntity.CAPTION;
                        sysRoleModel.Level = rolePermissionEntity.LEVELS;
                        sysRoleModel.ScreenSequence = (short)rolePermissionEntity.SCREENSEQUENCE;
                        sysRoleModel.AllowGrant = (Int32)rolePermissionEntity.Grant == 1 ? true : false;
                        sysRoleModel.AllowAdd = (bool)rolePermissionEntity.Add;
                        sysRoleModel.AllowEdit = (bool)rolePermissionEntity.Edit;
                        sysRoleModel.AllowDelete = (bool)rolePermissionEntity.Delete;
                        sysRoleModel.AllowView = (bool)rolePermissionEntity.View;
                        sysRoleModel.AllowSearch = (bool)rolePermissionEntity.Search;
                        sysRoleModel.HasChild = (bool)rolePermissionEntity.HasChild;

                        listOfSysRole.Add(sysRoleModel);
                    }
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return AdjustFormatSysRolePermission(listOfSysRole);
            }
        }

        public List<SysRoleModel> AdjustFormatSysRolePermission(List<SysRoleModel> list)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var listOfSysRole = new List<SysRoleModel>();
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    foreach (var item in list)
                    {
                        if (item.Level == 1)
                        {
                            if (item.HasChild)
                            {
                                var sysRoleModel = new SysRoleModel();
                                sysRoleModel.ID = item.ID;
                                sysRoleModel.ParentId = item.ParentId;
                                sysRoleModel.Caption = item.Caption;
                                sysRoleModel.Level = item.Level;
                                sysRoleModel.ScreenSequence = item.ScreenSequence;
                                sysRoleModel.AllowGrant = item.AllowGrant;
                                sysRoleModel.AllowAdd = item.AllowAdd;
                                sysRoleModel.AllowEdit = item.AllowEdit;
                                sysRoleModel.AllowDelete = item.AllowDelete;
                                sysRoleModel.AllowView = item.AllowView;
                                sysRoleModel.AllowSearch = item.AllowSearch;
                                sysRoleModel.HasChild = item.HasChild;
                                listOfSysRole.Add(sysRoleModel);

                                for (int i = 0; i < list.Count(); i++)
                                {
                                    if (item.ID == list[i].ParentId)
                                    {
                                        var sysRoleChildModel = new SysRoleModel();
                                        sysRoleChildModel.ID = list[i].ID;
                                        sysRoleChildModel.ParentId = list[i].ParentId;
                                        sysRoleChildModel.Caption = list[i].Caption;
                                        sysRoleChildModel.Level = list[i].Level;
                                        sysRoleChildModel.ScreenSequence = list[i].ScreenSequence;
                                        sysRoleChildModel.AllowGrant = list[i].AllowGrant;
                                        sysRoleChildModel.AllowAdd = list[i].AllowAdd;
                                        sysRoleChildModel.AllowEdit = list[i].AllowEdit;
                                        sysRoleChildModel.AllowDelete = list[i].AllowDelete;
                                        sysRoleChildModel.AllowView = list[i].AllowView;
                                        sysRoleChildModel.AllowSearch = list[i].AllowSearch;
                                        sysRoleChildModel.HasChild = list[i].HasChild;
                                        listOfSysRole.Add(sysRoleChildModel);
                                    }
                                }
                            }
                            else
                            {
                                var sysRoleModel = new SysRoleModel();
                                sysRoleModel.ID = item.ID;
                                sysRoleModel.ParentId = item.ParentId;
                                sysRoleModel.Caption = item.Caption;
                                sysRoleModel.Level = item.Level;
                                sysRoleModel.ScreenSequence = item.ScreenSequence;
                                sysRoleModel.AllowGrant = item.AllowGrant;
                                sysRoleModel.AllowAdd = item.AllowAdd;
                                sysRoleModel.AllowEdit = item.AllowEdit;
                                sysRoleModel.AllowDelete = item.AllowDelete;
                                sysRoleModel.AllowView = item.AllowView;
                                sysRoleModel.AllowSearch = item.AllowSearch;
                                sysRoleModel.HasChild = item.HasChild;
                                listOfSysRole.Add(sysRoleModel);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return listOfSysRole;
            }
        }

        public List<SysRoleModel> GetChildSysRolePermissionList(int type, int roleId, int level, int parentId)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var listOfSysRole = new List<SysRoleModel>();
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    var rolePermissionEntities = context.uspGetChildRolePermissionByRoleID(type, roleId, level, parentId);
                    if (rolePermissionEntities == null) return null;

                    foreach (var rolePermissionEntity in rolePermissionEntities)
                    {
                        var sysRoleModel = new SysRoleModel();

                        sysRoleModel.ID = rolePermissionEntity.ID;
                        sysRoleModel.ParentId = rolePermissionEntity.PARENTID == null ? 0 : (int)rolePermissionEntity.PARENTID;
                        sysRoleModel.Caption = rolePermissionEntity.CAPTION;
                        sysRoleModel.Level = rolePermissionEntity.LEVELS;
                        sysRoleModel.ScreenSequence = (short)rolePermissionEntity.SCREENSEQUENCE;
                        sysRoleModel.AllowGrant = (Int32)rolePermissionEntity.Grant == 1 ? true : false;
                        sysRoleModel.AllowAdd = (bool)rolePermissionEntity.Add;
                        sysRoleModel.AllowEdit = (bool)rolePermissionEntity.Edit;
                        sysRoleModel.AllowDelete = (bool)rolePermissionEntity.Delete;
                        sysRoleModel.AllowView = (bool)rolePermissionEntity.View;
                        sysRoleModel.AllowSearch = (bool)rolePermissionEntity.Search;
                        sysRoleModel.HasChild = (bool)rolePermissionEntity.HasChild;

                        listOfSysRole.Add(sysRoleModel);
                    }
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return listOfSysRole;
            }
        }

        public bool AddSysRolePermissionCollection(SysRoleModel[] sysRoleCollection)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    var errorBiz = new ErrorHandlerControlDAL();
                    try
                    {
                        List<SysRolePermissionModel> listOfData = new List<SysRolePermissionModel>();
                        SysRolePermissionModel item;
                        for (int index = 0; index < sysRoleCollection.Count(); index++)
                        {
                            listOfData.Clear();
                            for (int i = 0; i < 5; i++)
                            {
                                item = new SysRolePermissionModel();

                                item.ComponentID = sysRoleCollection[index].ID;
                                item.RoleID = sysRoleCollection[index].RoleID;
                                item.CreatedBy = sysRoleCollection[index].CreatedBy;
                                item.UpdatedBy = sysRoleCollection[index].UpdatedBy;

                                item.CreatedDate = DateTime.Now;
                                item.PermissionID = (i + 1);

                                switch (i)
                                {
                                    case 0:
                                        if (sysRoleCollection[index].AllowGrant)
                                            item.Allow = true;
                                        else
                                            item.Allow = false;
                                        break;
                                    case 1:
                                        if (sysRoleCollection[index].AllowAdd)
                                            item.Allow = true;
                                        else
                                            item.Allow = false;
                                        break;
                                    case 2:
                                        if (sysRoleCollection[index].AllowEdit)
                                            item.Allow = true;
                                        else
                                            item.Allow = false;
                                        break;
                                    case 3:
                                        if (sysRoleCollection[index].AllowView)
                                            item.Allow = true;
                                        else
                                            item.Allow = false;
                                        break;
                                    case 4:
                                        if (sysRoleCollection[index].AllowDelete)
                                            item.Allow = true;
                                        else
                                            item.Allow = false;
                                        break;
                                    default:
                                        item.Allow = false;
                                        break;
                                }

                                listOfData.Add(item);
                            }

                            for (int j = 0; j < listOfData.Count; j++)
                            {
                                if (!this.CheckExistingSysRolePermission(listOfData[j], context))
                                    this.AddSysRolePermission(listOfData[j], context);
                                else
                                    this.UpdateSysRolePermission(listOfData[j], context);
                            }
                        }

                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        errorBiz.WriteLog(ex);
                        throw ex;
                    }

                    return true;
                }
            }
        }

        public bool UpdateSysRolePermissionCollection(List<SysRolePermissionModel> list)
        {
            int rowCount = 0;
            var errorBiz = new ErrorHandlerControlDAL();
            try
            {
                for (int i = 0; i < list.Count; i++)
                {
                    bool rowAffected = this.UpdateSysRolePermission(list[i]);
                    if (rowAffected) rowCount++;
                }
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return rowCount > 0 ? true : false;
        }

        public bool DeleteSysRolePermissionCollection(List<SysRolePermissionModel> list)
        {
            int rowCount = 0;
            var errorBiz = new ErrorHandlerControlDAL();
            try
            {
                for (int i = 0; i < list.Count; i++)
                {
                    bool rowAffected = this.DeleteSysRolePermission(list[i]);
                    if (rowAffected) rowCount++;
                }
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return rowCount > 0 ? true : false;
        }

        public bool AddSysRolePermission(SysRolePermissionModel sysRolePermissionModel)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                bool result = false;
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    SYS_ROLES_PERMISSIONS rolePermissionEntity = new SYS_ROLES_PERMISSIONS();

                    sysRolePermissionModel.MappingToEntity(rolePermissionEntity);
                    rolePermissionEntity.CreatedDate = DateTime.Now;
                    rolePermissionEntity.CreatedBy = sysRolePermissionModel.CreatedBy;

                    context.SYS_ROLES_PERMISSIONS.Add(rolePermissionEntity);
                    context.SaveChanges();
                    result = true;
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return result;
            }
        }

        public bool AddSysRolePermission(SysRolePermissionModel sysRolePermissionModel, CLAIMEntities context)
        {
            bool result = false;
            var errorBiz = new ErrorHandlerControlDAL();
            try
            {
                SYS_ROLES_PERMISSIONS rolePermissionEntity = new SYS_ROLES_PERMISSIONS();

                sysRolePermissionModel.MappingToEntity(rolePermissionEntity);
                rolePermissionEntity.CreatedDate = DateTime.Now;
                rolePermissionEntity.CreatedBy = sysRolePermissionModel.CreatedBy;

                context.SYS_ROLES_PERMISSIONS.Add(rolePermissionEntity);
                context.SaveChanges();
                result = true;
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return result;
        }

        public bool UpdateSysRolePermission(SysRolePermissionModel sysRolePermissionModel)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                bool result = false;
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    var rolePermissionEntity = context.SYS_ROLES_PERMISSIONS.Where(x => x.ComponentID == sysRolePermissionModel.ComponentID && x.PermissionID == sysRolePermissionModel.PermissionID && x.RoleID == sysRolePermissionModel.RoleID).FirstOrDefault();
                    if (rolePermissionEntity != null)
                    {
                        rolePermissionEntity.ComponentID = sysRolePermissionModel.ComponentID;
                        rolePermissionEntity.PermissionID = sysRolePermissionModel.PermissionID;
                        rolePermissionEntity.RoleID = sysRolePermissionModel.RoleID;
                        rolePermissionEntity.Allow = sysRolePermissionModel.Allow;
                        rolePermissionEntity.UpdatedBy = sysRolePermissionModel.UpdatedBy;
                        rolePermissionEntity.UpdatedDate = DateTime.Now;

                        context.SaveChanges();
                        result = true;
                    }
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return result;
            }
        }

        public bool UpdateSysRolePermission(SysRolePermissionModel sysRolePermissionModel, CLAIMEntities context)
        {
            bool result = false;
            var errorBiz = new ErrorHandlerControlDAL();
            try
            {
                var rolePermissionEntity = context.SYS_ROLES_PERMISSIONS.Where(x => x.ComponentID == sysRolePermissionModel.ComponentID && x.PermissionID == sysRolePermissionModel.PermissionID && x.RoleID == sysRolePermissionModel.RoleID).FirstOrDefault();
                if (rolePermissionEntity != null)
                {
                    rolePermissionEntity.ComponentID = sysRolePermissionModel.ComponentID;
                    rolePermissionEntity.PermissionID = sysRolePermissionModel.PermissionID;
                    rolePermissionEntity.RoleID = sysRolePermissionModel.RoleID;
                    rolePermissionEntity.Allow = sysRolePermissionModel.Allow;
                    rolePermissionEntity.UpdatedBy = sysRolePermissionModel.UpdatedBy;
                    rolePermissionEntity.UpdatedDate = DateTime.Now;

                    context.SaveChanges();
                    result = true;
                }
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return result;
        }

        public bool DeleteSysRolePermission(SysRolePermissionModel sysRolePermissionModel)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                bool result = false;
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    var rolePermissionEntity = context.SYS_ROLES_PERMISSIONS.Where(t => t.ID == sysRolePermissionModel.ID).FirstOrDefault();
                    if (rolePermissionEntity != null)
                    {
                        context.SYS_ROLES_PERMISSIONS.Remove(rolePermissionEntity);
                        context.SaveChanges();
                        result = true;
                    }
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return result;
            }
        }

        public bool CheckExistingSysRolePermission(SysRolePermissionModel sysRolePermissionModel)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    var rolePermissionEntity = context.SYS_ROLES_PERMISSIONS.Where(x => x.ComponentID == sysRolePermissionModel.ComponentID && x.PermissionID == sysRolePermissionModel.PermissionID && x.RoleID == sysRolePermissionModel.RoleID).FirstOrDefault();
                    if (rolePermissionEntity != null) return true;
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return false;
            }
        }

        public bool CheckExistingSysRolePermission(SysRolePermissionModel sysRolePermissionModel, CLAIMEntities context)
        {
            try
            {
                var rolePermissionEntity = context.SYS_ROLES_PERMISSIONS.Where(x => x.ComponentID == sysRolePermissionModel.ComponentID && x.PermissionID == sysRolePermissionModel.PermissionID && x.RoleID == sysRolePermissionModel.RoleID).FirstOrDefault();
                if (rolePermissionEntity != null) return true;
            }
            catch (Exception ex) { }

            return false;
        }

        #endregion

    }
}
