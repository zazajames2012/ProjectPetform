using ARSoft.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL.Authorization
{
    public class TokenModel
    {
        private string cultureInfo = "en-US";
        public string AccessToken { get; set; }

        public TokenModel()
        {

        }
        public TokenModel(string accessToken)
        {
            this.AccessToken = accessToken;
        }

        public bool VerifyTokenExpireDate(string accessToken, out string message)
        {
            message = String.Empty;
            try
            {
                char delimiterChars = ',';
                string decryptToken = CryptographyUtil.Decrypt(accessToken, true);
                string[] tokenArray = decryptToken.Split(delimiterChars);
                string tokenAuthorizedCode = tokenArray[0];
                string tokenUserName = tokenArray[1];
                string tokenExpireDate = tokenArray[2];

                //-	กรณี Expire Date เป็น Empty String หรือ Null ให้ถือว่า ไม่มีวันหมดอายุ
                if (String.IsNullOrEmpty(tokenExpireDate)) return false;

                System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(cultureInfo);
                DateTime currentDate = DateTime.Now;
                DateTime expireDate = Convert.ToDateTime(tokenExpireDate);

                int resultCompare = DateTime.Compare(currentDate, expireDate);
                if (resultCompare >= 0)
                {
                    message = "Token is expired, Please sign in again.";
                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return false;
        }

        public List<string> DecryptAuthorizationCode(string authorizationCode)
        {
            List<string> list = null;
            try
            {
                list = new List<string>();
                char delimiterChars = ',';
                string decryptToken = CryptographyUtil.Decrypt(authorizationCode, true);
                string[] authorizationCodeArray = decryptToken.Split(delimiterChars);
                //applicationKey = tokenArray[0];
                //userName = tokenArray[1];
                //expireDate = tokenArray[2];

                list.AddRange(authorizationCodeArray);

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return list;
        }

        public List<string> DecryptToken(string accessToken)
        {
            List<string> list = null;
            try
            {
                list = new List<string>();
                char delimiterChars = ',';
                string decryptToken = CryptographyUtil.Decrypt(accessToken, true);
                string[] tokenArray = decryptToken.Split(delimiterChars);
                //authorizationCode = tokenArray[0];
                //userName = tokenArray[1];
                //expireDate = tokenArray[2];

                list.AddRange(tokenArray);

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return list;
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

        public bool VerifyExistingToken(string accessToken, out string message)
        {
            message = String.Empty;
            try
            {
                if (new AuthorizationLogsModel().VerifyExistingToken(accessToken))
                {
                    return true;
                }
                else
                {
                    message = "Token is invalid, Please sign in again.";
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return false;
        }
    }
}
