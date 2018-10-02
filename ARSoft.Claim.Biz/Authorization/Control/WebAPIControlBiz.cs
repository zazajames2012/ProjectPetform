using ARSoft.Claim.DAL.Authorization;
using ARSoft.Claim.Model.BOL.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Biz.Authorization.Control
{
    public class WebAPIControlBiz
    {
        private WebAPIControlDAL objDAL;

        public WebAPIControlBiz()
        {
            objDAL = new WebAPIControlDAL();
        }
        public WebAPIControlBiz(int applicationId)
        {
            this.ApplicationID = applicationId;
            objDAL = new WebAPIControlDAL();
        }

        #region Properties
        public int ApplicationID { get; set; }

        private string cultureInfo = "en-US";
        public string AuthorizationCode { get; set; }
        public string Messages { get; set; }
        public string Token { get; set; }
        public string ErrorMessage { get; set; }

        //public ApplicationModel CurrentApplication { get; set; }
        #endregion

        #region Method        
        public AuthorizationCodeModel VerifyUserAuthorization(AuthorizationLogsModel userRequestAuthorization, string password, out string message)
        {
            return objDAL.VerifyUserAuthorization(userRequestAuthorization, password, out message);
        }

        public bool VerifyUserValid(AuthorizationLogsModel userRequestAuthorization, string password, out string message)
        {
            return objDAL.VerifyUserValid(userRequestAuthorization, password, out message);
        }

        private string GenerateAuthorizationCode(string applicationKey, string userName, ref DateTime refExpireDate, ref bool isEmptyExpireDate)
        {
            return objDAL.GenerateAuthorizationCode(applicationKey, userName, ref refExpireDate, ref isEmptyExpireDate);
        }

        public bool VerifyAuthorizationCode(string authorizationCode, string userName, out string message)
        {
            return objDAL.VerifyAuthorizationCode(authorizationCode, userName, out message);
        }

        public string GetAccessToken(string authorizationCode, string userName, out string message)
        {
            return objDAL.GetAccessToken(authorizationCode, userName, out message);
        }

        public string GenerateToken(string authorizationCode, string userName)
        {
            return objDAL.GenerateToken(authorizationCode, userName);
        }

        public bool VerifyToken(string accessToken, string authorizationCode, string userName, out string message)
        {
            return objDAL.VerifyToken(accessToken, authorizationCode, userName, out message);
        }

        public bool VerifyTokenExpireDate(string accessToken, out string message)
        {
            return objDAL.VerifyTokenExpireDate(accessToken, out message);
        }

        public string GetUserByAuthorizationCode(string authorizationCode)
        {
            return objDAL.GetUserByAuthorizationCode(authorizationCode);
        }

        public UsersModel GetDisplayNameByUser(string Username)
        {
            return objDAL.GetDisplayNameByUser(Username);
        }

        public bool VerifyExistingToken(string accessToken)
        {
            return objDAL.VerifyExistingToken(accessToken);
        }

        #endregion
    }
}
