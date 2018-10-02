using ARSoft.Claim.Biz.Agility;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Web;

namespace ARSoft.Claim.Web.App_Code
{
    public class ProjectVersion
    {
        public static Version GetWebVersion()
        {
            var vWeb = new Version();
            try { vWeb = Assembly.GetExecutingAssembly().GetName().Version; }
            catch (Exception ex) { var msg = ex.Message; }
            return vWeb;
        }
        public static Version GetApiVersion()
        {
            var vApi = new Version();
            var apiUrl = ConfigurationManager.AppSettings["WebApiUrl"].ToString() + "Common/Sys/GetAssemblyVersion";
            var wc = new WebClient();
            var sJson = string.Empty;
            try
            {
                sJson = wc.DownloadString(apiUrl);
                var hJson = JsonConvert.DeserializeObject<Hashtable>(sJson);
                vApi = new Version(Convert.ToInt32(hJson["_Major"]), Convert.ToInt32(hJson["_Minor"]), Convert.ToInt32(hJson["_Build"]), Convert.ToInt32(hJson["_Revision"]));
            }
            catch (Exception ex) { var msg = ex.Message; }
            return vApi;
        }
        public static Version GetBizVersion()
        {
            var vBiz = new Version();
            var bizAgility = new MasterCommonAgility();
            try { vBiz = bizAgility.GetAssemblyVersion(); }
            catch (Exception ex) { var msg = ex.Message; }
            return vBiz;
        }
        public static string GetStrWebVersion(string pConcat)
        {
            var vWeb = new Version();
            var sResult = "";
            try { vWeb = Assembly.GetExecutingAssembly().GetName().Version; }
            catch (Exception ex) { var msg = ex.Message; }
            sResult = vWeb.Major + pConcat + vWeb.Minor + pConcat + vWeb.Build + pConcat + vWeb.Revision;
            return sResult;
        }
        public static string GetStrApiVersion(string pConcat)
        {
            var vApi = new Version();
            var sResult = "";
            var apiUrl = ConfigurationManager.AppSettings["WebApiUrl"].ToString() + "Common/Sys/GetAssemblyVersion";
            var wc = new WebClient();
            var sJson = string.Empty;
            try
            {
                sJson = wc.DownloadString(apiUrl);
                var hJson = JsonConvert.DeserializeObject<Hashtable>(sJson);
                vApi = new Version(Convert.ToInt32(hJson["_Major"]), Convert.ToInt32(hJson["_Minor"]), Convert.ToInt32(hJson["_Build"]), Convert.ToInt32(hJson["_Revision"]));
            }
            catch (Exception ex) { var msg = ex.Message; }
            sResult = vApi.Major + pConcat + vApi.Minor + pConcat + vApi.Build + pConcat + vApi.Revision;
            return sResult;
        }
        public static string GetStrBizVersion(string pConcat)
        {
            var vBiz = new Version();
            var sResult = "";
            var bizAgility = new MasterCommonAgility();
            try { vBiz = bizAgility.GetAssemblyVersion(); }
            catch (Exception ex) { var msg = ex.Message; }
            sResult = vBiz.Major + pConcat + vBiz.Minor + pConcat + vBiz.Build + pConcat + vBiz.Revision;
            return sResult;
        }
    }
}