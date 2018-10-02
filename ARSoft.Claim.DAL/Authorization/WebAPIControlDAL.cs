using ARSoft.Claim.Model.BOL.Authorization;
using ARSoft.Utility;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DAL.Authorization
{
    public class WebAPIControlDAL
    {
        public WebAPIControlDAL() { }
        public WebAPIControlDAL(int applicationId)
        {
            this.ApplicationID = applicationId;
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
        //public AuthorizationCodeModel SignIn(string applicationKey, string userName, string password, string ipAddress, string HttpInfo, out string message)
        //(authorizeLog, password, out message).AuthorizationCode;
        public AuthorizationCodeModel VerifyUserAuthorization(AuthorizationLogsModel userRequestAuthorization, string password, out string message)
        {
            UserControlDAL userBiz = new UserControlDAL();
            AuthorizationCodeModel userAuthorize = new AuthorizationCodeModel();

            bool applicationValid = false;
            bool userValid = false;
            bool userActive = false;
            int userId = 0;
            //int applicationId = 1;
            message = String.Empty;

            try
            {
                ApplicationModel application = new ApplicationModel();
                userRequestAuthorization.Code = application.GetApplicationKey(this.ApplicationID == 0 ? 1 : this.ApplicationID);

                applicationValid = application.VerifyApplicationKey(userRequestAuthorization.Code.Trim());
                if (!applicationValid)
                {
                    message = "Application was not Authorized!";
                    return null;
                }

                userValid = userBiz.VerifyUser(userRequestAuthorization.Username.Trim(), password);
                if (!userValid)
                {
                    message = "Invalid Username or Password!, Please try agrain or later.";
                    return null;
                }

                userActive = userBiz.GetCurrentStatusUser(userRequestAuthorization.Username.Trim(), out userId);
                userAuthorize.UserID = userId;
                if (!userActive)
                {
                    message = "User is not Activate!, Please contract your administrator.";
                    return null;
                }

                if (applicationValid && userValid && userActive)
                {
                    DateTime expireDate = DateTime.Now;
                    bool isEmptyExpireDate = false;
                    this.AuthorizationCode = this.GenerateAuthorizationCode(userRequestAuthorization.Code.Trim(), userRequestAuthorization.Username.Trim(), ref expireDate, ref isEmptyExpireDate);

                    if (!String.IsNullOrEmpty(this.AuthorizationCode))
                    {
                        ApplicationModel appInfo = new ApplicationModel().GetApplication(userRequestAuthorization.Code.Trim());
                        AuthorizationLogsModel authorizeLog = new AuthorizationLogsModel();

                        authorizeLog.ApplicationID = appInfo.ID;
                        authorizeLog.Code = appInfo.ApplicationKey;
                        authorizeLog.Username = userRequestAuthorization.Username;
                        authorizeLog.AuthorizationCode = this.AuthorizationCode;

                        if (isEmptyExpireDate)
                        {
                            authorizeLog.IsNeverExpireDate = true;
                        }
                        else
                        {
                            authorizeLog.IsNeverExpireDate = false;
                            authorizeLog.ExpireDate = expireDate;
                        }

                        authorizeLog.IPAddress = (userRequestAuthorization.IPAddress != null) ? userRequestAuthorization.IPAddress.Trim() : string.Empty;
                        authorizeLog.HttpInfo = (userRequestAuthorization.HttpInfo != null) ? userRequestAuthorization.HttpInfo.Trim() : string.Empty;
                        authorizeLog.CreatedDate = DateTime.Now;

                        authorizeLog.InsertAuthorizationLog(authorizeLog);
                    }
                }
                else
                {
                    this.AuthorizationCode = String.Empty;
                }
                userAuthorize.AuthorizationCode = this.AuthorizationCode;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return userAuthorize;
        }

        public bool VerifyUserValid(AuthorizationLogsModel userRequestAuthorization, string password, out string message)
        {
            UserControlDAL userBiz = new UserControlDAL();
            AuthorizationCodeModel userAuthorize = new AuthorizationCodeModel();

            bool result = false;
            bool applicationValid = false;
            bool userValid = false;
            bool userActive = false;
            int userId = 0;
            //int applicationId = 1;
            message = String.Empty;

            try
            {
                ApplicationModel application = new ApplicationModel();
                userRequestAuthorization.Code = application.GetApplicationKey(this.ApplicationID == 0 ? 1 : this.ApplicationID);

                applicationValid = application.VerifyApplicationKey(userRequestAuthorization.Code.Trim());
                if (!applicationValid)
                {
                    message = "Application was not Authorized!";
                    return result;
                }

                userValid = userBiz.VerifyUser(userRequestAuthorization.Username.Trim(), password);
                if (!userValid)
                {
                    message = "Invalid Username or Password!, Please try agrain or later.";
                    return result;
                }

                userActive = userBiz.GetCurrentStatusUser(userRequestAuthorization.Username.Trim(), out userId);
                userAuthorize.UserID = userId;
                if (!userActive)
                {
                    message = "User is not Activate!, Please contract your administrator.";
                    return result;
                }

                if (applicationValid && userValid && userActive)
                {
                    result = true;
                }
                else
                {
                    result = false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public string GenerateAuthorizationCode(string applicationKey, string userName, ref DateTime refExpireDate, ref bool isEmptyExpireDate)
        {
            string authorizeCodeEncrypt = String.Empty;
            System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(cultureInfo);

            try
            {
                ApplicationModel applicationModel = new ApplicationModel().GetApplication(applicationKey);
                if (applicationModel != null)
                {
                    string expireDate = applicationModel.CookieExpireDays > 0 ? DateTime.Now.AddDays((double)applicationModel.CookieExpireDays).ToString("yyyy-MM-dd HH:mm:ss") : String.Empty;
                    if (!String.IsNullOrEmpty(expireDate))
                        refExpireDate = Convert.ToDateTime(expireDate);
                    else
                        isEmptyExpireDate = true;

                    //authorizeCodeEncrypt = new CryptographyUtil().EncryptedMD5(applicationKey + "," + userName + "," + expireDate);
                    authorizeCodeEncrypt = CryptographyUtil.Encrypt(applicationKey + "," + userName + "," + expireDate, true);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return authorizeCodeEncrypt;
        }

        //public bool VerifyAuthorizationCode(string authorizationCode, string userName, out string message)
        //{            
        //    AuthorizationLogsModel authorizeLog = new AuthorizationLogsModel();
        //    try
        //    {
        //        if (authorizeLog.GetAuthorizationLog(authorizationCode, userName))
        //        {
        //            message = "Valid Authorization Code.";

        //            //-	กรณี Expire Date เป็น Empty String หรือ Null ให้ถือว่า ไม่มีวันหมดอายุ
        //            if (authorizeLog.IsNeverExpireDate) return true;

        //            System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(cultureInfo);
        //            DateTime currentDate = DateTime.Now;
        //            DateTime expireDate = authorizeLog.IsNeverExpireDate ? Convert.ToDateTime(authorizeLog.ExpireDate) : DateTime.Now.AddDays(1);
        //            int resultCompare = DateTime.Compare(currentDate, expireDate);
        //            if (resultCompare >= 0)
        //            {
        //                message = "Session is expired, Please sign in again.";
        //                return false;
        //            }

        //            return true;
        //        }
        //        else
        //        {
        //            message = "Unauthorized User or Application.";
        //            return false;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }             
        //}

        public bool VerifyAuthorizationCode(string authorizationCode, string userName, out string message)
        {
            AuthorizationLogsModel authorizeLog = new AuthorizationLogsModel();
            try
            {
                if (authorizeLog.GetAuthorizationLog(authorizationCode, userName))
                {
                    message = "Valid Authorization Code.";

                    //-	กรณี Expire Date เป็น Empty String หรือ Null ให้ถือว่า ไม่มีวันหมดอายุ
                    //if (authorizeLog.IsNeverExpireDate) return true;

                    char delimiterChars = ',';
                    string decryptAuthorizationCode = CryptographyUtil.Decrypt(authorizationCode, true);
                    string[] authorizeCodeArray = decryptAuthorizationCode.Split(delimiterChars);
                    string authorizeCodeApplicationKey = authorizeCodeArray[0];
                    string authorizeCodeUserName = authorizeCodeArray[1];
                    string authorizeCodeExpireDate = authorizeCodeArray[2];

                    //-	กรณี Expire Date เป็น Empty String หรือ Null ให้ถือว่า ไม่มีวันหมดอายุ
                    if (String.IsNullOrEmpty(authorizeCodeExpireDate)) return true;

                    System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(cultureInfo);
                    DateTime currentDate = DateTime.Now;
                    //DateTime expireDate = Convert.ToDateTime(authorizeCodeExpireDate);
                    //DateTime expireDate = authorizeLog.IsNeverExpireDate ? Convert.ToDateTime(authorizeLog.ExpireDate) : DateTime.Now.AddDays(1);

                    DateTime expireDate = authorizeLog.IsNeverExpireDate ? Convert.ToDateTime(authorizeLog.ExpireDate) : DateTime.Now.AddDays(1);
                    int resultCompare = DateTime.Compare(currentDate, expireDate);
                    if (resultCompare >= 0)
                    {
                        message = "Session is expired, Please sign in again.";
                        return false;
                    }

                    return true;
                }
                else
                {
                    message = "Unauthorized User or Application.";
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GetAccessToken(string authorizationCode, string userName, out string message)
        {
            string accessToken = String.Empty;

            try
            {
                if (this.VerifyAuthorizationCode(authorizationCode, userName, out message))
                {
                    if (!new AuthorizationLogsModel().CheckExistingTokenByUserName(userName, out accessToken))
                    {
                        accessToken = this.GenerateToken(authorizationCode, userName);
                    }
                    else
                    {
                        new AuthorizationLogsModel().UpdateExistingTokenApplicationLog(userName, accessToken);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return accessToken;
        }


        public string GenerateToken(string authorizationCode, string userName)
        {
            string token = String.Empty;
            DateTime refExpireDate = DateTime.Now;
            System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(cultureInfo);

            try
            {
                AuthorizationLogsModel authorizeLog = new AuthorizationLogsModel().GetAuthorizationLogByUser(userName);
                if (authorizeLog != null)
                {
                    ApplicationModel application = new ApplicationModel().GetApplication(authorizeLog.Code);
                    if (application != null)
                    {
                        string expireDate = String.Empty;
                        if (application.CheckTokenNeverExpireDate(userName))
                        {
                            expireDate = String.Empty;
                        }
                        else
                        {
                            expireDate = application.TokenExpireDays > 0 ? DateTime.Now.AddDays((double)application.TokenExpireDays).ToString("yyyy-MM-dd HH:mm:ss") : String.Empty;
                        }

                        //if (!String.IsNullOrEmpty(expireDate)) refExpireDate = Convert.ToDateTime(expireDate);
                        //token = new CryptographyUtil().EncryptedMD5(authorizationCode + "," + userName + "," + expireDate);

                        token = CryptographyUtil.Encrypt(authorizationCode + "," + userName + "," + expireDate, true);
                        //token = new CryptographyUtil().EncryptedMD5(authorizationCode + "," + userName + "," + expireDate + "," + authorizeLog.GetAuthorizationLogIDByUser(userName));
                        if (!String.IsNullOrEmpty(token)) authorizeLog.UpdateToken(authorizationCode, userName, token);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return token;
        }

        public bool VerifyToken(string accessToken, string authorizationCode, string userName, out string message)
        {
            string token = String.Empty;
            bool applicationValid = false;
            bool userValid = false;
            bool userActive = false;
            message = String.Empty;

            try
            {
                AuthorizationLogsModel authorizeLog = new AuthorizationLogsModel().GetAuthorizationLogByUser(userName);
                if (authorizeLog == null)
                {
                    message = "Application was not Authorized!";
                    return false;
                }

                ApplicationModel application = new ApplicationModel();
                applicationValid = application.VerifyApplicationKey(authorizeLog.Code.Trim());
                if (!applicationValid)
                {
                    message = "Application was not Authorized!";
                    return false;
                }

                UserControlDAL user = new UserControlDAL();
                userValid = user.VerifyUser(userName.Trim());
                if (!userValid)
                {
                    message = "Invalid Username or Password!, Please try agrain or later.";
                    return false;
                }

                userActive = user.GetCurrentStatusUser(userName.Trim());
                if (!userActive)
                {
                    message = "User is not Activate!, Please contract your administrator.";
                    return false;
                }

                if (this.VerifyTokenExpireDate(accessToken, out message)) return false;

                if (applicationValid && userValid && userActive && this.VerifyAuthorizationCode(authorizationCode, userName.Trim(), out message))
                {
                    if (accessToken.Equals(authorizeLog.GetAuthorizationLogByUser(userName).Token.Trim()))
                        return true;
                    else
                        return false;
                }
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool VerifyTokenExpireDate(string accessToken, out string message)
        {
            message = String.Empty;
            //-	กรณี Expire Date เป็น Empty String หรือ Null ให้ถือว่า ไม่มีวันหมดอายุ            
            char delimiterChars = ',';
            string decryptToken = CryptographyUtil.Decrypt(accessToken, true);
            string[] tokenArray = decryptToken.Split(delimiterChars);
            string tokenApplicationKey = tokenArray[0];
            string tokenUserName = tokenArray[1];
            string tokenExpireDate = tokenArray[2];

            //-	กรณี Expire Date เป็น Empty String หรือ Null ให้ถือว่า ไม่มีวันหมดอายุ
            if (String.IsNullOrEmpty(tokenExpireDate) || new AuthorizationLogsModel().IsNeverTokenExpireDate(tokenUserName))
            {
                return false;
            }

            System.Threading.Thread.CurrentThread.CurrentCulture = new CultureInfo(cultureInfo);
            DateTime currentDate = DateTime.Now;
            DateTime expireDate = Convert.ToDateTime(tokenExpireDate);
            int resultCompare = DateTime.Compare(currentDate, expireDate);
            if (resultCompare >= 0)
            {
                message = "Token is expired, Please sign in again.";
                return true;
            }

            return false;
        }

        public string GetUserByAuthorizationCode(string authorizationCode)
        {
            try
            {
                char delimiterChars = ',';
                string decryptAuthorizationCode = CryptographyUtil.Decrypt(authorizationCode, true);
                string[] authorizeCodeArray = decryptAuthorizationCode.Split(delimiterChars);
                string authorizeCodeApplicationKey = authorizeCodeArray[0];
                string authorizeCodeUserName = authorizeCodeArray[1];
                string authorizeCodeExpireDate = authorizeCodeArray[2];

                return authorizeCodeUserName;

                //return new AuthorizationLogsModel().GetUserByAuthorizationCode(authorizationCode);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public UsersModel GetDisplayNameByUser(string Username)
        {
            try
            {
                return new AuthorizationLogsModel().GetDisplayNameByUser(Username);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool VerifyExistingToken(string accessToken)
        {
            try
            {
                return new AuthorizationLogsModel().VerifyExistingToken(accessToken);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion
    }
}
