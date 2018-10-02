using ARSoft.Claim.DAL.ErrorHandler;
using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.EntityFramework;
using ARSoft.Claim.Model.Enumeration;
using ARSoft.Utility;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DAL.Master
{
    public class SysUserDAL
    {
        public SysUsersModel GetSysUserById(int SysUserId)
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            var item = new SysUsersModel();

            try
            {
                var SysUser = ctx.uspGetSysUserRolesByUserID(SysUserId).First();

                item.ID = SysUser.ID;
                item.Username = SysUser.Username;
                item.Password = SysUser.Password;
                item.DisplayName = SysUser.DisplayName;
                item.Email = SysUser.Email;
                item.EmployeeID = SysUser.EmployeeID;
              //  item.Status = SysUser.Status;
                item.CreatedBy = SysUser.CreatedBy;
                item.CreatedDate = SysUser.CreatedDate;
                item.UpdatedBy = SysUser.UpdatedBy;
                item.UpdatedDate = SysUser.UpdatedDate;
                item.StrRoleID = SysUser.StrRoleID;
                item.EMP_NAME = SysUser.EMP_NAME;
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return item;
        }
        public List<SysUsersModel> getSysUsers(int? PageIndex, int? PageSize, string Sort, SysUsersModel sysuser)
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            var SysUser = new List<uspGetSysUsers_Result>();
            var resSysUser = new List<SysUsersModel>();

            try
            {
                SysUser = ctx.uspGetSysUsers(PageIndex, PageSize, Sort, sysuser.Username, sysuser.StrRoleID).ToList();

                foreach (var row in SysUser.ToList())
                {
                    var item = new SysUsersModel();
                    item.RowNumber = row.RowNumber;
                    item.RecordCount = row.RecordCount;
                    item.ID = row.ID;
                    item.Username = row.Username;
                    item.Password = row.Password;
                    item.DisplayName = row.DisplayName;
                    item.Email = row.Email;
                    item.EmployeeID = row.EmployeeID;
                   // item.Status = row.Status;
                    item.StatusTxt = item.Status == 1 ? EnumHelper.GetEnumDescription((Status)(int)Status.Active) : EnumHelper.GetEnumDescription((Status)(int)Status.Inactive);
                    resSysUser.Add(item);
                }
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return resSysUser;
        }

        public bool addSysUsers(SysUsersModel pSysUserModel)
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            bool results = false;

            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    var addSysUser = new SYS_USERS();
                    //var rowSysUserMax = ctx.uspGetMaxByTableColumnName("SYS_USERS", "ID").First();
                    //var maxSysUserID = rowSysUserMax.MAXID + 1;
                    var CreateDate = DateTime.Now;
                    var util = new CryptographyUtil();

                    //addSysUser.ID = Convert.ToInt32(maxSysUserID);
                    addSysUser.Username = pSysUserModel.Username;
                    addSysUser.Password = util.EncryptedMD5(pSysUserModel.Password);
                    addSysUser.DisplayName = pSysUserModel.DisplayName;
                    addSysUser.Email = pSysUserModel.Email;
                    addSysUser.EmployeeID = pSysUserModel.EmployeeID;
                    //addSysUser.Status = pSysUserModel.Status;
                    addSysUser.CreatedDate = CreateDate;
                    addSysUser.CreatedBy = pSysUserModel.CreatedBy;
                    addSysUser.UpdatedDate = CreateDate;
                    addSysUser.UpdatedBy = pSysUserModel.UpdatedBy;

                    ctx.SYS_USERS.Add(addSysUser);
                    ctx.SaveChanges();

                    if (!string.IsNullOrWhiteSpace(pSysUserModel.StrRoleID.Trim()))
                    {
                        var addSysUserRole = new SYS_USERS_ROLES();
                        foreach (string RoleID in pSysUserModel.StrRoleID.Trim().Split(','))
                        {
                            //var rowUserRoleMax = ctx.uspGetMaxByTableColumnName("SYS_USERS_ROLES", "ID").First();
                            //var maxUserRoleID = rowUserRoleMax.MAXID + 1;

                            //addSysUserRole.ID = Convert.ToInt32(maxUserRoleID);
                            addSysUserRole.UserID = addSysUser.ID;
                            addSysUserRole.RoleID = Convert.ToInt32(RoleID.Trim());
                            addSysUserRole.CreatedDate = CreateDate;
                            addSysUserRole.CreatedBy = pSysUserModel.CreatedBy;
                            addSysUserRole.UpdatedDate = CreateDate;
                            addSysUserRole.UpdatedBy = pSysUserModel.UpdatedBy;
                            //addSysUserRole.SYS_USERS = addSysUser;

                            ctx.SYS_USERS_ROLES.Add(addSysUserRole);
                            ctx.SaveChanges();
                        }
                    }

                    transaction.Commit();
                    results = true;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    errorBiz.WriteLog(ex);
                    throw ex;
                }
            }

            return results;
        }

        public bool editSysUsers(SysUsersModel pSysUserModel)
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            bool results = false;

            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    var UpdateDate = DateTime.Now;
                    var util = new CryptographyUtil();
                    string savePassword = "", oldPassword = "";
                    var SysUser = ctx.uspGetSysUserRolesByUserID(pSysUserModel.ID).First();
                    oldPassword = SysUser.Password;

                    if (string.IsNullOrWhiteSpace(pSysUserModel.Password))
                    {
                        savePassword = oldPassword;
                    }
                    else
                    {
                        if (pSysUserModel.Password == oldPassword)
                        {
                            savePassword = oldPassword;
                        }
                        else
                        {
                            savePassword = util.EncryptedMD5(pSysUserModel.Password);
                        }
                    }

                    var editSysUser = ctx.uspUpdateSysUserRolesByID(
                        pSysUserModel.ID
                        , pSysUserModel.Username
                        , savePassword
                        , pSysUserModel.DisplayName
                        , pSysUserModel.Email
                        , pSysUserModel.EmployeeID
                        , pSysUserModel.Status
                        , pSysUserModel.UpdatedBy
                        , UpdateDate
                        , pSysUserModel.StrRoleID);

                    transaction.Commit();
                    results = true;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    errorBiz.WriteLog(ex);
                    throw ex;
                }
            }

            return results;
        }

        public bool editRoleAssign(SysUsersModel pSysUserModel)
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            bool results = false;

            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    var UpdateDate = DateTime.Now;
                    string savePassword = string.Empty;

                    var SysUser = ctx.uspGetSysUserRolesByUserID(pSysUserModel.ID).First();

                    var editSysUser = ctx.uspUpdateSysUserInRolesByID(
                        pSysUserModel.ID
                        , pSysUserModel.UpdatedBy
                        , pSysUserModel.StrRoleID);

                    transaction.Commit();
                    results = true;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    errorBiz.WriteLog(ex);
                    throw ex;
                }
            }

            return results;
        }

        public bool delSysUsers(string UID)
        {
            var errorBiz = new ErrorHandlerControlDAL();
            bool results = false;

            using (CLAIMEntities ctx = new CLAIMEntities())
            {
                using (var transaction = ctx.Database.BeginTransaction())
                {
                    try
                    {
                        foreach (string UserID in UID.Split(','))
                        {
                            var delResult = ctx.uspDeleteSysUsersByID(Convert.ToInt32(UserID.Trim()));
                        }

                        transaction.Commit();
                        results = true;
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        errorBiz.WriteLog(ex);
                        throw ex;
                    }
                }
            }

            return results;
        }

        public Hashtable ValidateAddSysUser(SysUsersModel pSysUserModel)
        {
            Hashtable hashtable = new Hashtable();
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();

            try
            {
                var checkUsername = ctx.SYS_USERS.ToList<SYS_USERS>().Where(c => c.Username.ToLower() == pSysUserModel.Username.ToLower()).ToList();
                if (checkUsername.Count > 0)
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Data", null);
                    hashtable.Add("Message", "Username ต้องไม่ซ้ำกัน");
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Warning);
                    return hashtable;
                }

                var checkEmpID = ctx.SYS_USERS.ToList<SYS_USERS>().Where(c => c.EmployeeID == pSysUserModel.EmployeeID &&
                                                                              pSysUserModel.EmployeeID != null).ToList();
                if (checkEmpID.Count > 0)
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Data", null);
                    hashtable.Add("Message", "พนักงาน 1 คนมี User ได้ 1 Account เท่านั้น");
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Warning);
                    return hashtable;
                }

                hashtable.Add("Successfully", true);
                hashtable.Add("Data", null);
                hashtable.Add("Message", "การตรวจสอบความถูกต้องเรียบร้อย");
                hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return hashtable;
        }
        public Hashtable ValidateEditSysUser(SysUsersModel pSysUserModel)
        {
            Hashtable hashtable = new Hashtable();
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();

            try
            {
                var checkUsername = ctx.SYS_USERS.ToList<SYS_USERS>().Where(c => c.Username.ToLower() == pSysUserModel.Username.ToLower() &&
                                                                                 c.ID != pSysUserModel.ID).ToList();
                if (checkUsername.Count > 0)
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Data", null);
                    hashtable.Add("Message", "Username ต้องไม่ซ้ำกัน");
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Warning);
                    return hashtable;
                }

                var checkEmpID = ctx.SYS_USERS.ToList<SYS_USERS>().Where(c => c.EmployeeID == pSysUserModel.EmployeeID &&
                                                                              pSysUserModel.EmployeeID != null &&
                                                                              c.ID != pSysUserModel.ID).ToList();
                if (checkEmpID.Count > 0)
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Data", null);
                    hashtable.Add("Message", "พนักงาน 1 คนมี User ได้ 1 Account เท่านั้น");
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Warning);
                    return hashtable;
                }

                hashtable.Add("Successfully", true);
                hashtable.Add("Data", null);
                hashtable.Add("Message", "การตรวจสอบความถูกต้องเรียบร้อย");
                hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return hashtable;
        }
        public Hashtable ValidateDelSysUser(string UID)
        {
            Hashtable hashtable = new Hashtable();
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();

            try
            {
                foreach (var sUID in UID.Split(','))
                {
                    var UserID = Convert.ToInt32(sUID.Trim());
                    var uRole = (from u in ctx.SYS_USERS
                                 join ur in ctx.SYS_USERS_ROLES on u.ID equals ur.UserID
                                 join r in ctx.SYS_ROLES on ur.RoleID equals r.ID
                                 where u.ID == UserID
                                 && r.Admin == true
                                 select new
                                 {
                                     ID = u.ID,
                                     Username = u.Username,
                                     RoleName = r.RoleName
                                 }).ToList();

                    if (uRole.Count > 0)
                    {
                        hashtable.Add("Successfully", false);
                        hashtable.Add("Data", null);
                        hashtable.Add("Message", "ไม่สามารถลบข้อมูลได้ เนื่องจาก User เป็น Administrator ของระบบ!");
                        hashtable.Add("ResultType", (int)RESULT_TYPE.Warning);
                        return hashtable;
                    }
                }

                hashtable.Add("Successfully", true);
                hashtable.Add("Data", null);
                hashtable.Add("Message", "การตรวจสอบความถูกต้องเรียบร้อย");
                hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return hashtable;
        }
    }
}
