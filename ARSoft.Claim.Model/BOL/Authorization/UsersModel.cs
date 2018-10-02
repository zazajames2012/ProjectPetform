using ARSoft.Claim.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL.Authorization
{
    public class UsersModel
    {
        #region Properties
        public int ID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public string EmployeeName { get; set; }
        public string Email { get; set; }
        public Nullable<int> EmployeeID { get; set; }
        public byte Status { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        #endregion

        #region Method
        public UsersModel GetUser(string userName, string password)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                try
                {
                    List<SYS_USERS> listOfSysUsers = context.SYS_USERS.Where(u => u.Username == userName.Trim() && u.Password == password.Trim()).ToList<SYS_USERS>();
                    //List<SYS_USERS> listOfSysUsers = context.SYS_USERS.Where(u => u.Username == userName && u.Status == 1).ToList<SYS_USERS>();
                    if (listOfSysUsers != null && listOfSysUsers.Count() > 0)
                    {
                        this.ID = listOfSysUsers[0].ID;
                        this.Username = listOfSysUsers[0].Username;
                        this.Password = listOfSysUsers[0].Password;
                        this.DisplayName = listOfSysUsers[0].DisplayName;
                        this.Email = listOfSysUsers[0].Email;
                        this.EmployeeID = listOfSysUsers[0].EmployeeID;
                       // this.Status = listOfSysUsers[0].Status;
                        this.CreatedBy = listOfSysUsers[0].CreatedBy;
                        this.CreatedDate = listOfSysUsers[0].CreatedDate;
                        this.UpdatedBy = listOfSysUsers[0].UpdatedBy;
                        this.UpdatedDate = listOfSysUsers[0].UpdatedDate;

                        return this;
                    }

                    return null;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public UsersModel GetUserInfoByUser(string userName)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                try
                {
                    List<SYS_USERS> listOfSysUsers = context.SYS_USERS.Where(u => u.Username == userName).ToList<SYS_USERS>();
                    if (listOfSysUsers != null && listOfSysUsers.Count() > 0)
                    {
                        this.ID = listOfSysUsers[0].ID;
                        this.Username = listOfSysUsers[0].Username;
                        this.Password = listOfSysUsers[0].Password;
                        this.DisplayName = listOfSysUsers[0].DisplayName;
                        this.Email = listOfSysUsers[0].Email;
                        this.EmployeeID = listOfSysUsers[0].EmployeeID;
                       // this.Status = listOfSysUsers[0].Status;
                        this.CreatedBy = listOfSysUsers[0].CreatedBy;
                        this.CreatedDate = listOfSysUsers[0].CreatedDate;
                        this.UpdatedBy = listOfSysUsers[0].UpdatedBy;
                        this.UpdatedDate = listOfSysUsers[0].UpdatedDate;

                        return this;
                    }

                    return null;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public UsersModel GetPasswordByUser(string userName)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                try
                {
                    List<SYS_USERS> listOfSysUsers = context.SYS_USERS.Where(u => u.Username == userName).ToList<SYS_USERS>();
                    if (listOfSysUsers != null && listOfSysUsers.Count() > 0)
                    {
                        this.ID = listOfSysUsers[0].ID;
                        this.Username = listOfSysUsers[0].Username;
                        this.Password = listOfSysUsers[0].Password;
                        this.DisplayName = listOfSysUsers[0].DisplayName;
                        this.Email = listOfSysUsers[0].Email;
                        this.EmployeeID = listOfSysUsers[0].EmployeeID;
                        //this.Status = listOfSysUsers[0].Status;
                        this.CreatedBy = listOfSysUsers[0].CreatedBy;
                        this.CreatedDate = listOfSysUsers[0].CreatedDate;
                        this.UpdatedBy = listOfSysUsers[0].UpdatedBy;
                        this.UpdatedDate = listOfSysUsers[0].UpdatedDate;

                        return this;
                    }

                    return null;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public bool GetCurrentStatusUser(string userName)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                try
                {
                    List<SYS_USERS> listOfSysUsers = context.SYS_USERS.Where(u => u.Username == userName).ToList<SYS_USERS>();
                    if (listOfSysUsers != null)
                        return true;
                    else
                        return false;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public bool GetCurrentStatusUser(string userName, out int userId)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                try
                {
                    List<SYS_USERS> listOfSysUsers = context.SYS_USERS.Where(u => u.Username == userName).ToList<SYS_USERS>();
                    if (listOfSysUsers != null)
                    {
                        userId = listOfSysUsers[0].ID;
                        return true;
                    }
                    else
                    {
                        userId = 0;
                        return false;
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
        #endregion            
    }
}
