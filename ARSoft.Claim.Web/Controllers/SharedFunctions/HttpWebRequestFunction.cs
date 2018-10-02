using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace ARSoft.Claim.Web.Controllers.SharedFunctions
{
    public class HttpWebRequestFunction
    {

        public static string HttpPost(string url, string contentType, string data)
        {
            string returnResult = string.Empty;

            byte[] buffer = System.Text.Encoding.ASCII.GetBytes(data);

            HttpWebRequest WebReq = (HttpWebRequest)WebRequest.Create(url);

            WebReq.Method = "POST";

            WebReq.ContentType = contentType;

            WebReq.ContentLength = buffer.Length;

            Stream PostData = WebReq.GetRequestStream();

            PostData.Write(buffer, 0, buffer.Length);

            PostData.Close();

            HttpWebResponse WebResp = (HttpWebResponse)WebReq.GetResponse();

            Stream Answer = WebResp.GetResponseStream();

            StreamReader _Answer = new StreamReader(Answer);

            returnResult = _Answer.ReadToEnd();

            returnResult = RemoveStartEndDoubleQuotes(returnResult.Trim());

            returnResult = returnResult.Replace("\\\"", "\"");

            returnResult = returnResult.Replace("\\\\", "\\");

            return returnResult;

        }

        public static string HttpPost(string url, string data)
        {
            return HttpPost(url, "application/json", data);
        }

        public static string HttpPost(string url)
        {
            return HttpPost(url, "application/json", string.Empty);
        }

        public static string HttpGet(string url)
        {
            string returnResult = null;
            try
            {
                HttpWebRequest WebReq = (HttpWebRequest)WebRequest.Create(url);

                WebReq.Method = "GET";

                HttpWebResponse WebResp = (HttpWebResponse)WebReq.GetResponse();

                Stream Answer = WebResp.GetResponseStream();
                StreamReader _Answer = new StreamReader(Answer);
                returnResult = _Answer.ReadToEnd();

            }
            catch (Exception ex)
            {
            }
            return returnResult.Trim();
        }

        private static string RemoveStartEndDoubleQuotes(string str)
        {
            int strLen = str.Length;
            if (strLen < 2)
            {
                return str;
            }

            if (str.Substring(0, 1) == "\"" && str.Substring(strLen - 1, 1) == "\"")
            {
                str = str.Substring(1, strLen - 2);
            }

            return str;
        }

    }
}