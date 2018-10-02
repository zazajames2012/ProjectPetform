using ARSoft.Claim.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL.Authorization
{
    public class AuthorizationLogsModel
    {
        #region Properties
        public int ID { get; set; }
        public int ApplicationID { get; set; }
        public string Code { get; set; }
        public string Username { get; set; }
        public System.DateTime ExpireDate { get; set; }
        public string IPAddress { get; set; }
        public string HttpInfo { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public bool IsNeverExpireDate { get; set; }
        public string AuthorizationCode { get; set; }
        public string Token { get; set; }


        #endregion

        #region Method           
        public void InsertAuthorizationLog(AuthorizationLogsModel authorizationLogsModel)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                try
                {
                    SYS_AUTHORIZATION_LOGS authorizationLogs = new SYS_AUTHORIZATION_LOGS();

                    authorizationLogs.ApplicationID = authorizationLogsModel.ApplicationID;
                    authorizationLogs.Code = authorizationLogsModel.Code;
                    authorizationLogs.Username = authorizationLogsModel.Username;
                    if (!authorizationLogsModel.IsNeverExpireDate)
                    {
                        authorizationLogs.ExpireDate = authorizationLogsModel.ExpireDate;
                    }
                    authorizationLogs.IPAddress = authorizationLogsModel.IPAddress;
                    authorizationLogs.HttpInfo = authorizationLogsModel.HttpInfo;
                    authorizationLogs.IsNeverExpireDate = authorizationLogsModel.IsNeverExpireDate;
                    authorizationLogs.AuthorizationCode = authorizationLogsModel.AuthorizationCode;
                    authorizationLogs.CreatedDate = DateTime.Now;

                    context.SYS_AUTHORIZATION_LOGS.Add(authorizationLogs);
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public bool UpdateToken(string authorizationCode, string userName, string token)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                bool result = false;
                try
                {
                    if (this.UpdateTokenUser(context, userName, token))
                    {
                        var authorizationLogs = context.SYS_AUTHORIZATION_LOGS.Where(a => a.AuthorizationCode == authorizationCode && a.Username == Username).OrderByDescending(w => w.ID).FirstOrDefault();
                        if (authorizationLogs != null)
                        {
                            authorizationLogs.Token = token;
                            context.SaveChanges();
                        }
                        result = true;
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                return result;
            }
        }

        public bool UpdateExistingTokenApplicationLog(string userName, string token)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                bool result = false;
                try
                {
                    //string token = context.SYS_USERS.Where(t => t.Username.Trim().ToUpper() == userName.Trim().ToUpper()).FirstOrDefault().Token;
                    var authorizationLogs = context.SYS_AUTHORIZATION_LOGS.Where(t => t.Username.Trim().ToUpper() == userName.Trim().ToUpper()).OrderByDescending(w => w.ID).FirstOrDefault();
                    if (authorizationLogs != null)
                    {
                        authorizationLogs.Token = token;
                        context.SaveChanges();
                    }
                    result = true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                return result;
            }
        }

        public bool UpdateTokenUser(CLAIMEntities context, string userName, string token)
        {
            bool result = false;
            try
            {
                var authUser = context.SYS_USERS.Where(t => t.Username.Trim().ToUpper() == Username.Trim().ToUpper()).OrderByDescending(t => t.ID).FirstOrDefault();
                if (authUser != null)
                {
                    authUser.Token = token;
                    context.SaveChanges();
                }
                result = true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        public bool GetAuthorizationLog(string authorizationCode, string userName)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                try
                {
                    if (this.CheckExistingUserInAuthorizationLog(context, userName))
                    {
                        var authorizationLogs = (from a in context.SYS_AUTHORIZATION_LOGS
                                                 where a.Username == userName && a.AuthorizationCode == authorizationCode
                                                 select new AuthorizationLogsModel
                                                 {
                                                     Username = a.Username,
                                                     ID = a.ID
                                                 }).OrderByDescending(w => w.ID).FirstOrDefault();

                        return authorizationLogs != null ? true : false;
                    }
                    else
                    {
                        return true;
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public bool CheckExistingUserInAuthorizationLog(CLAIMEntities context, string userName)
        {
            try
            {
                var authUserLogsTotal = (from a in context.SYS_AUTHORIZATION_LOGS
                                         where a.Username.Trim().ToUpper() == userName.Trim().ToUpper()
                                         select a).OrderByDescending(t => t.ID).Count();

                return authUserLogsTotal > 0 ? true : false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool CheckExistingTokenByUserName(string userName, out string accessToken)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                bool result = false;
                accessToken = string.Empty;
                try
                {
                    var authUser = (from u in context.SYS_USERS
                                    where u.Username.Trim().ToUpper() == userName.Trim().ToUpper()
                                    select new
                                    {
                                        UserID = u.ID,
                                        Username = u.Username,
                                        IsNeverExpireDate = u.IsNeverExpireDate,
                                        Token = u.Token
                                    }).OrderByDescending(t => t.Username).FirstOrDefault();

                    if (String.IsNullOrEmpty(authUser.Token))
                    {
                        result = false;
                    }
                    else
                    {
                        accessToken = authUser.Token;
                        result = true;
                    }
                }
                catch (Exception) { }
                return result;
            }
        }

        public bool IsNeverTokenExpireDate(string userName)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                try
                {
                    var authUser = (from u in context.SYS_USERS
                                    where u.Username.Trim().ToUpper() == userName.Trim().ToUpper()
                                    select u).FirstOrDefault();

                    return (bool)authUser.IsNeverExpireDate;
                }
                catch (Exception) { }
                return false;
            }
        }

        public AuthorizationLogsModel GetAuthorizationLogByUser(string userName)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                string applicationId = String.Empty;
                try
                {
                    var authorizationLogs = (from a in context.SYS_AUTHORIZATION_LOGS
                                             where a.Username == userName
                                             select new AuthorizationLogsModel
                                             {
                                                 ID = a.ID,
                                                 ApplicationID = a.ApplicationID,
                                                 Code = a.Code,
                                                 Username = a.Username,
                                                 //ExpireDate = Convert.ToDateTime(a.ExpireDate) != null? Convert.ToDateTime(a.ExpireDate) : a.ExpireDate,
                                                 IPAddress = a.IPAddress,
                                                 HttpInfo = a.HttpInfo,
                                                 CreatedDate = a.CreatedDate,
                                                 IsNeverExpireDate = a.IsNeverExpireDate,
                                                 AuthorizationCode = a.AuthorizationCode,
                                                 Token = a.Token
                                             }).OrderByDescending(w => w.ID).FirstOrDefault();

                    return authorizationLogs;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public int GetAuthorizationLogIDByUser(string userName)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                string applicationId = String.Empty;
                try
                {
                    var authorizationLogs = (from a in context.SYS_AUTHORIZATION_LOGS
                                             where a.Username == userName
                                             select new AuthorizationLogsModel
                                             {
                                                 ID = a.ID,
                                             }).OrderByDescending(w => w.ID).FirstOrDefault();

                    return authorizationLogs != null ? authorizationLogs.ID : 1;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public string GetUserByAuthorizationCode(string authorizationCode)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                string applicationId = String.Empty;
                try
                {
                    var authorizationLogs = (from a in context.SYS_AUTHORIZATION_LOGS
                                             where a.AuthorizationCode == authorizationCode
                                             //where a.Username == "Admin"
                                             select new AuthorizationLogsModel
                                             {
                                                 ID = a.ID,
                                                 Username = a.Username
                                             }).OrderByDescending(w => w.ID).FirstOrDefault();

                    if (authorizationLogs != null)
                        return authorizationLogs.Username;
                    else
                        return String.Empty;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public UsersModel GetDisplayNameByUser(string Username)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                try
                {
                    var EmployeeName = String.Empty;
                    var SysUserModel = context.uspGetSysUsersByUserName(Username);
                    var empModel = SysUserModel.FirstOrDefault();
                    var sysUsers = new UsersModel();
                    sysUsers.ID = empModel.ID;
                    sysUsers.DisplayName = empModel.DisplayName;
                    sysUsers.EmployeeID = empModel.EmployeeID;
                    sysUsers.EmployeeName = empModel.EmployeeName;



                    if (sysUsers != null)
                        return sysUsers;
                    else
                        return null;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public bool VerifyExistingToken(string accessToken)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                //string applicationId = String.Empty;
                try
                {
                    // Check Token in SYS_USERS Table
                    //var authSysUsers = (from u in context.SYS_USERS
                    //                    where u.Token == accessToken
                    //                    select new AuthorizationLogsModel
                    //                    {
                    //                        ID = u.ID,
                    //                        Token = u.Token
                    //                    }).OrderByDescending(t => t.ID).FirstOrDefault();

                    //if (authSysUsers != null) return true;

                    //// Check Token in SYS_AUTHORIZATION_LOGS Table
                    //var authLogs = (from a in context.SYS_AUTHORIZATION_LOGS
                    //                where a.Token == accessToken
                    //                select new AuthorizationLogsModel
                    //                {
                    //                    ID = a.ID,
                    //                    Token = a.Token
                    //                }).OrderByDescending(w => w.ID).FirstOrDefault();

                    //if (authLogs != null)
                    //    return true;
                    //else
                    //    return false;

                    ObjectParameter resultOutput = new ObjectParameter("result", typeof(bool));
                    context.uspVerifyExistingToken(accessToken, resultOutput);
                    return (bool)resultOutput.Value;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }
        #endregion        
    }
}
