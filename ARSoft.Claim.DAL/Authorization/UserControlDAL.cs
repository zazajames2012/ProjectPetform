using ARSoft.Claim.Model.BOL.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DAL.Authorization
{
    public class UserControlDAL
    {
        public bool VerifyUser(string userName)
        {
            UsersModel user = new UsersModel();
            try
            {
                return user.GetUser(userName, this.GetPasswordByUser(userName)) != null ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool VerifyUser(string userName, string password)
        {
            UsersModel user = new UsersModel();
            try
            {
                return user.GetUser(userName, password) != null ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GetPasswordByUser(string userName)
        {
            UsersModel user = new UsersModel();
            try
            {
                return user.GetPasswordByUser(userName).Password;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool GetCurrentStatusUser(string userName)
        {
            UsersModel user = new UsersModel();
            try
            {
                return user.GetCurrentStatusUser(userName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool GetCurrentStatusUser(string userName, out int userId)
        {
            UsersModel user = new UsersModel();
            try
            {
                return user.GetCurrentStatusUser(userName, out userId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
