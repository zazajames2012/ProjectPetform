using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Collections;
using System.Web.Http.Cors;
using System.Configuration;
using ARSoft.Utility;
using ARSoft.Claim.Model.Enumeration;
using ARSoft.Claim.Service.Controllers.Helper;
using ARSoft.Claim.Model.BOL.Authorization;
using ARSoft.Claim.Biz.Authorization.Control;

namespace ARSoft.Claim.Service.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AuthenticatorController : ApiController
    {
        private WebAPIControlBiz webAPIControlBiz;
        public string ApplicationID { get; set; }

        public AuthenticatorController()
        {
            try
            {
                this.ApplicationID = ConfigurationManager.AppSettings["ApplicationID"].ToString();
            }
            catch (Exception)
            {
                this.ApplicationID = "1";
            }

            webAPIControlBiz = new WebAPIControlBiz(Convert.ToInt32(this.ApplicationID) == 0 ? 1 : Convert.ToInt32(this.ApplicationID));
        }

        [Route("ClaimService/Authenticator/SignIn")]
        [HttpPost]
        public Object SignIn(UserAuthorizationModel requestAuthorizationCode)
        {
            //GenViewQueryBiz v = new GenViewQueryBiz();
            //v.RunAllViewScript();

            Hashtable hashtable = new Hashtable();
            AuthorizationLogsModel authorizeLog = new AuthorizationLogsModel();
            AuthorizationCodeModel userAuthorize = new AuthorizationCodeModel();
            CryptographyUtil cryptography = new CryptographyUtil();

            string message = String.Empty;
            string accessToken = String.Empty;
            string authorizationCode = String.Empty;
            string password = string.Empty;

            requestAuthorizationCode.IPAddress = WebApiHelper.GetClientIPAddress();
            authorizeLog.Username = requestAuthorizationCode.Username;
            //password = requestAuthorizationCode.IsAuthMobile? requestAuthorizationCode.Password : cryptography.EncryptedMD5(requestAuthorizationCode.Password);           
            password = cryptography.EncryptedMD5(requestAuthorizationCode.Password);
            authorizeLog.IPAddress = requestAuthorizationCode.IPAddress;
            authorizeLog.HttpInfo = requestAuthorizationCode.HttpInfo;

            try
            {
                if (!webAPIControlBiz.VerifyUserValid(authorizeLog, password, out message))
                {
                    hashtable.Add("UserValid", false);
                    hashtable.Add("UserID", String.Empty);
                    hashtable.Add("UserName", requestAuthorizationCode.Username);
                    hashtable.Add("AuthorizationCode", authorizationCode);
                    hashtable.Add("AccessToken", String.Empty);
                    hashtable.Add("Message", message);
                    hashtable.Add("ApplicationID", this.ApplicationID);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.InvalidToken);

                    return hashtable;
                }

                if (!String.IsNullOrEmpty(requestAuthorizationCode.AuthorizationCode))
                {
                    authorizationCode = requestAuthorizationCode.AuthorizationCode;
                    requestAuthorizationCode.Username = webAPIControlBiz.GetUserByAuthorizationCode(authorizationCode);
                    authorizeLog.Username = requestAuthorizationCode.Username;
                }
                else
                {
                    userAuthorize = webAPIControlBiz.VerifyUserAuthorization(authorizeLog, password, out message);
                    if (userAuthorize != null)
                        authorizationCode = userAuthorize.AuthorizationCode;
                    else
                        authorizationCode = String.Empty;
                }

                if (!String.IsNullOrEmpty(authorizationCode))
                {
                    if (this.VerifyAuthorizationCode(authorizationCode, authorizeLog.Username.Trim(), out message))
                    {
                        hashtable.Add("UserValid", true);
                        hashtable.Add("UserID", String.Empty);
                        hashtable.Add("UserName", requestAuthorizationCode.Username);
                        hashtable.Add("AuthorizationCode", authorizationCode);
                        hashtable.Add("AccessToken", String.Empty);
                        hashtable.Add("Message", message);
                        hashtable.Add("ApplicationID", this.ApplicationID);
                        hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                    }
                    else
                    {
                        hashtable.Add("UserValid", false);
                        hashtable.Add("UserID", String.Empty);
                        hashtable.Add("UserName", requestAuthorizationCode.Username);
                        hashtable.Add("AuthorizationCode", authorizationCode);
                        hashtable.Add("AccessToken", String.Empty);
                        hashtable.Add("Message", message);
                        hashtable.Add("ApplicationID", this.ApplicationID);
                        hashtable.Add("ResultType", (int)RESULT_TYPE.InvalidToken);
                    }
                }
                else
                {
                    hashtable.Add("UserValid", false);
                    hashtable.Add("UserID", String.Empty);
                    hashtable.Add("UserName", requestAuthorizationCode.Username);
                    hashtable.Add("AuthorizationCode", String.Empty);
                    hashtable.Add("AccessToken", String.Empty);
                    hashtable.Add("Message", message);
                    hashtable.Add("ApplicationID", this.ApplicationID);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.InvalidToken);
                }
            }
            catch (Exception ex)
            {
                hashtable.Add("UserValid", false);
                hashtable.Add("UserID", String.Empty);
                hashtable.Add("UserName", requestAuthorizationCode.Username);
                hashtable.Add("AuthorizationCode", String.Empty);
                hashtable.Add("AccessToken", String.Empty);
                hashtable.Add("Message", "ไม่สามารถ SignIn เข้าระบบได้ เนื่องจาก " + ex.Message);
                hashtable.Add("ApplicationID", this.ApplicationID);
                hashtable.Add("ResultType", (int)RESULT_TYPE.InternalException);
            }

            return hashtable;
        }

        private bool VerifyAuthorizationCode(string authorizationCode, string userName, out string message)
        {
            message = String.Empty;
            return webAPIControlBiz.VerifyAuthorizationCode(authorizationCode, userName, out message);
        }

        [Route("ClaimService/Authenticator/GetAccessToken")]
        [HttpPost]
        public Object GetAccessToken(UserAuthorizationModel requestAccessToken)
        {
            Hashtable hashtable = new Hashtable();
            UsersModel usersModel = null;
            string userName = String.Empty;
            string message = String.Empty;
            string accessToken = String.Empty;

            try
            {
                userName = webAPIControlBiz.GetUserByAuthorizationCode(requestAccessToken.AuthorizationCode);
                usersModel = webAPIControlBiz.GetDisplayNameByUser(userName);
                //string displayName = webAPIControlBiz.GetDisplayNameByUser(userName);
                accessToken = webAPIControlBiz.GetAccessToken(requestAccessToken.AuthorizationCode, userName, out message);
                if (!String.IsNullOrEmpty(accessToken))
                {
                    if (this.VerifyToken(requestAccessToken.AuthorizationCode, accessToken, userName, out message))
                    {
                        hashtable.Add("UserValid", true);
                        hashtable.Add("UserID", usersModel.ID);
                        hashtable.Add("EmployeeID", usersModel.EmployeeID);
                        hashtable.Add("EmployeeName", usersModel.EmployeeName);
                        hashtable.Add("UserName", userName);
                        hashtable.Add("DisplayName", usersModel.DisplayName);
                        hashtable.Add("AccessToken", accessToken);
                        hashtable.Add("AuthorizationCode", requestAccessToken.AuthorizationCode);
                        hashtable.Add("Message", message);
                        hashtable.Add("ApplicationID", this.ApplicationID);
                        hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                    }
                    else
                    {
                        string newAccessToken = new WebAPIControlBiz().GenerateToken(requestAccessToken.AuthorizationCode, userName);
                        if (!String.IsNullOrEmpty(newAccessToken))
                        {
                            message = string.Empty;

                            hashtable.Add("UserValid", true);
                            hashtable.Add("UserID", usersModel.ID);
                            hashtable.Add("EmployeeID", usersModel.EmployeeID);
                            hashtable.Add("EmployeeName", usersModel.EmployeeName);
                            hashtable.Add("UserName", userName);
                            hashtable.Add("DisplayName", usersModel.DisplayName);
                            hashtable.Add("AccessToken", newAccessToken);
                            hashtable.Add("AuthorizationCode", requestAccessToken.AuthorizationCode);
                            hashtable.Add("Message", message);
                            hashtable.Add("ApplicationID", this.ApplicationID);
                            hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                        }
                        else
                        {
                            hashtable.Add("UserValid", false);
                            hashtable.Add("UserID", usersModel.ID);
                            hashtable.Add("EmployeeID", usersModel.EmployeeID);
                            hashtable.Add("EmployeeName", usersModel.EmployeeName);
                            hashtable.Add("UserName", userName);
                            hashtable.Add("DisplayName", usersModel.DisplayName);
                            hashtable.Add("AccessToken", accessToken);
                            hashtable.Add("AuthorizationCode", requestAccessToken.AuthorizationCode);
                            hashtable.Add("Message", message);
                            hashtable.Add("ApplicationID", this.ApplicationID);
                            hashtable.Add("ResultType", (int)RESULT_TYPE.InvalidToken);
                        }
                    }
                }
                else
                {
                    hashtable.Add("UserValid", false);
                    hashtable.Add("UserID", usersModel.ID);
                    hashtable.Add("EmployeeID", usersModel.EmployeeID);
                    hashtable.Add("EmployeeName", usersModel.EmployeeName);
                    hashtable.Add("UserName", userName);
                    hashtable.Add("DisplayName", usersModel.DisplayName);
                    hashtable.Add("AccessToken", String.Empty);
                    hashtable.Add("AuthorizationCode", requestAccessToken.AuthorizationCode);
                    hashtable.Add("Message", message);
                    hashtable.Add("ApplicationID", this.ApplicationID);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.InvalidToken);
                }
            }
            catch (Exception ex)
            {
                hashtable.Add("UserValid", false);
                hashtable.Add("UserID", usersModel.ID);
                hashtable.Add("EmployeeID", usersModel.EmployeeID);
                hashtable.Add("EmployeeName", usersModel.EmployeeName);
                hashtable.Add("UserName", userName);
                hashtable.Add("DisplayName", usersModel.DisplayName);
                hashtable.Add("AccessToken", String.Empty);
                hashtable.Add("AuthorizationCode", requestAccessToken.AuthorizationCode);
                hashtable.Add("Message", "ไม่สามารถ GetAccessToken จากระบบได้ เนื่องจาก " + ex.Message);
                hashtable.Add("ApplicationID", this.ApplicationID);
                hashtable.Add("ResultType", (int)RESULT_TYPE.InternalException);
            }

            return hashtable;
        }

        private bool VerifyToken(string authorizationCode, string accessToken, string userName, out string message)
        {
            message = String.Empty;
            List<string> list = new List<string>();
            return webAPIControlBiz.VerifyToken(accessToken, authorizationCode, userName, out message);
        }

        [Route("ClaimService/Authenticator/VerifyToken")]
        [HttpPost]
        public Object VerifyToken(string accessToken)
        {
            Hashtable hashtable = new Hashtable();
            try
            {
                if (webAPIControlBiz.VerifyExistingToken(accessToken))
                {
                    hashtable.Add("TokenValid", true);
                    hashtable.Add("Message", "Token " + accessToken + " Valid.");
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("TokenValid", false);
                    hashtable.Add("Message", "Token " + accessToken + " Invalid.");
                    hashtable.Add("ResultType", (int)RESULT_TYPE.InvalidToken);
                }
            }
            catch (Exception ex)
            {
                hashtable.Add("TokenValid", false);
                hashtable.Add("Message", "ไม่สามารถ VerifyToken จากระบบได้ เนื่องจาก " + ex.Message);
                hashtable.Add("ResultType", (int)RESULT_TYPE.InternalException);
            }

            return hashtable;
        }
    }
}
