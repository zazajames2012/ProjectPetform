using ARSoft.Claim.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL.Authorization
{
    public class ApplicationModel
    {
        #region Properties
        public int ID { get; set; }
        public string Name { get; set; }
        public string ApplicationKey { get; set; }
        public Nullable<byte> CookieExpireDays { get; set; }
        public Nullable<byte> TokenExpireDays { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        #endregion

        #region Method
        public bool VerifyApplicationKey(string applicationKey)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                try
                {
                    var authorizedApps = context.SYS_AUTHORIZED_APPLICATIONS.Where(a => a.ApplicationKey == applicationKey).FirstOrDefault();
                    if (authorizedApps != null)
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

        public ApplicationModel GetApplication(string applicationKey)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                try
                {
                    List<SYS_AUTHORIZED_APPLICATIONS> listOfAuthorizedApps = context.SYS_AUTHORIZED_APPLICATIONS.Where(a => a.ApplicationKey == applicationKey).ToList<SYS_AUTHORIZED_APPLICATIONS>();
                    if (listOfAuthorizedApps != null)
                    {
                        this.ID = listOfAuthorizedApps[0].ID;
                        this.Name = listOfAuthorizedApps[0].Name;
                        this.ApplicationKey = listOfAuthorizedApps[0].ApplicationKey;
                        this.CookieExpireDays = listOfAuthorizedApps[0].CookieExpireDays;
                        this.TokenExpireDays = listOfAuthorizedApps[0].TokenExpireDays;
                        this.CreatedBy = listOfAuthorizedApps[0].CreatedBy;
                        this.CreatedDate = listOfAuthorizedApps[0].CreatedDate;
                        this.UpdatedBy = listOfAuthorizedApps[0].UpdatedBy;
                        this.UpdatedDate = listOfAuthorizedApps[0].UpdatedDate;

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

        public bool CheckTokenNeverExpireDate(string userName)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                bool result = false;
                try
                {
                    result = context.SYS_USERS.Where(t => t.Username.Trim().ToUpper() == userName.Trim().ToUpper()).FirstOrDefault().IsNeverExpireDate ?? false;
                }
                catch (Exception)
                {

                }
                return result;
            }
        }

        public string GetApplicationKey(int applicationId)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                try
                {
                    List<SYS_AUTHORIZED_APPLICATIONS> authorizedApps = context.SYS_AUTHORIZED_APPLICATIONS.Where(a => a.ID == applicationId).ToList<SYS_AUTHORIZED_APPLICATIONS>();
                    if (authorizedApps != null)
                        return authorizedApps[0].ApplicationKey;
                    else
                        return String.Empty;
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
