using ARSoft.Claim.Model.BOL.Authorization;
using ARSoft.Claim.Model.Enumeration;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ARSoft.Claim.Service.Controllers.Helper
{
    public class WebApiHelper
    {
        public static string GetClientIPAddress()
        {
            string IPAddress = string.Empty;
            string sHostName = System.Net.Dns.GetHostName();
            System.Net.IPHostEntry ipE = System.Net.Dns.GetHostByName(sHostName);
            System.Net.IPAddress[] IpA = ipE.AddressList;

            if (IpA.Length > 0) IPAddress = IpA[IpA.Length - 1].ToString();

            return IPAddress;
        }

        public static bool VerifyToken(string accessToken, ref Hashtable hashtable)
        {
            bool result = false;
            string message = String.Empty;
            TokenModel token = new TokenModel();

            try
            {
                string verifyAccessToken = WebApiHelper.ReplaceSpecialCharacter(accessToken);
                //if (token.VerifyTokenExpireDate(verifyAccessToken, out message) && !token.VerifyExistingToken(verifyAccessToken, out message))
                //if (!token.VerifyExistingToken(verifyAccessToken, out message))
                //if (!token.VerifyExistingToken(verifyAccessToken, out message) || token.VerifyTokenExpireDate(verifyAccessToken, out message))                

                if (!token.VerifyExistingToken(verifyAccessToken, out message))
                {
                    hashtable.Add("Successfully", result);
                    hashtable.Add("Message", message);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.InvalidToken);
                    return result;
                }

                if (token.VerifyTokenExpireDate(verifyAccessToken, out message))
                {
                    hashtable.Add("Successfully", result);
                    hashtable.Add("Message", message);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.InvalidToken);
                    return result;
                }
                result = true;
            }
            catch (Exception ex)
            {
                hashtable.Add("Successfully", result);
                hashtable.Add("Message", ex.Message);
                hashtable.Add("ResultType", (int)RESULT_TYPE.InvalidToken);
                return result;
            }

            return result;
        }

        public static string ReplaceSpecialCharacter(string token)
        {
            string resultToken = string.Empty;
            string[] hexCharacter = new string[] { "%21", "%23", "%25", "%26", "%28", "%29", "%2A", "%2B", "%2C", "%2D", "%2E", "%2F", "%3B", "%3C", "%3D", "%3E", "%3F", "%40", "%5C", "%5F" };
            string[] specialCharacter = new string[] { "!", "#", "%", "&", "(", ")", "*", "+", ",", "-", ".", "/", ";", "<", "=", ">", "?", "@", "\\", "_" };
            try
            {
                #region Special Character

                /*
                    %21     !     Exclamation mark
                    %22     "     Quotation mark
                    %23     #     Number sign
                    %24     $     Dollar sign
                    %25     %     Percent sign
                    %26     &     Ampersand
                    %27     '     Apostrophe
                    %28     (     Left parenthesis
                    %29     )     Right parenthesis
                    %2A     *     Asterisk
                    %2B     +     Plus sign
                    %2C     ,     Comma
                    %2D     -     Hyphen
                    %2E     .     Period (fullstop)
                    %2F     /     Solidus (slash)
                    %3A     :     Colon
                    %3B     ;     Semi-colon
                    %3C     <     Less than
                    %3D     =     Equals sign
                    %3E     >     Greater than
                    %3F     ?     Question mark
                    %40     @     Commercial at
                    %5B     [     Left square bracket
                    %5C     \     Reverse solidus (backslash)
                    %5D     ]     Right square bracket
                    %5E     ^     Caret
                    %5F     _     Horizontal bar (underscore)
                    %60     `     Acute accent
                    %7B     {     Left curly brace
                    %7C     |     Vertical bar
                    %7D     }     Right curly brace
                    %7E     ~     Tilde
                */
                #endregion
                token.Trim();
                resultToken = token;
                for (int index = 0; index < hexCharacter.Length; index++)
                {
                    resultToken = resultToken.Replace(hexCharacter[index], specialCharacter[index]);
                }
            }
            catch (Exception) { }

            return resultToken;
        }

        public static string ReplaceSpaceCharacter(string token)
        {
            string resultToken = string.Empty;
            string[] hexCharacter = new string[] { " " };
            string[] specialCharacter = new string[] { "+" };
            try
            {
                token.Trim();
                resultToken = token;
                for (int index = 0; index < hexCharacter.Length; index++)
                {
                    resultToken = resultToken.Replace(hexCharacter[index], specialCharacter[index]);
                }
            }
            catch (Exception) { }

            return resultToken;
        }
    }
}