using ARSoft.AKOW.Biz.Agility;
using ARSoft.Claim.Biz;
using ARSoft.Claim.Biz.Agility;
using ARSoft.Claim.Model.BOL.Authorization;
using ARSoft.Utility;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ARSoft.Claim.Web.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/

        #region View Module

        [AllowAnonymous]
        public ActionResult Index()
        {
            return Content("");
        }

        [AllowAnonymous]
        public ActionResult LoginIndex()
        {
            return RedirectToAction("Index", "Default");
        }

        [AllowAnonymous]
        public ActionResult Login()
        {
            this.SetVersionDisplay();

            Session["IsSAMRedirect"] = false;
            Session["WebApiUrl"] = System.Configuration.ConfigurationManager.AppSettings["WebApiUrl"];
            Session["WebMvcUrl"] = System.Configuration.ConfigurationManager.AppSettings["WebMvcUrl"];

            Session["SAMWebApiUrl"] = System.Configuration.ConfigurationManager.AppSettings["SAMWebApiUrl"];
            Session["SAMWebMvcUrl"] = System.Configuration.ConfigurationManager.AppSettings["SAMWebMvcUrl"];
            //Session["Username"] = String.Empty;

            ManageSecreteSession();
            //var SAMUrl = Session["SAMWebMvcUrl"] = System.Configuration.ConfigurationManager.AppSettings["SAMWebMvcUrl"];
            //   return Redirect(SAMUrl + "Login/Logout");

            return View();
        }

        [AllowAnonymous]
        public ActionResult SAMRedirectToInventory()
        {
            this.SetVersionDisplay();
            Session["IsSAMRedirect"] = true;
            Session["WebApiUrl"] = System.Configuration.ConfigurationManager.AppSettings["WebApiUrl"];
            Session["WebMvcUrl"] = System.Configuration.ConfigurationManager.AppSettings["WebMvcUrl"];

            Session["SAMWebApiUrl"] = System.Configuration.ConfigurationManager.AppSettings["SAMWebApiUrl"];
            Session["SAMWebMvcUrl"] = System.Configuration.ConfigurationManager.AppSettings["SAMWebMvcUrl"];

            string parameterSystem1 = this.Request.QueryString["ParameterSystem1"];
            string parameterSystem2 = this.Request.QueryString["ParameterSystem2"];
            string parameterSystem3 = this.Request.QueryString["ParameterSystem3"];
            string parameterSystem4 = this.Request.QueryString["ParameterSystem4"];
            string parameterSystem5 = this.Request.QueryString["ParameterSystem5"];
            string parameterSystem6 = this.Request.QueryString["parameterSystem6"];
            string parameterSystem7 = this.Request.QueryString["parameterSystem7"];
            string parameterSystem8 = this.Request.QueryString["parameterSystem8"];

            if (parameterSystem1 == null || parameterSystem2 == null)
            {
                this.Logout();
            }
            //parameterSystem1 = WebApiHelper.ReplaceSpecialCharacter(parameterSystem1);
            parameterSystem1 = parameterSystem1.Replace(" ", "+");
            parameterSystem1 = CryptographyUtil.Decrypt(parameterSystem1, true);
            string[] param1 = parameterSystem1.Split(',');

            UserAuthorizationModel user = new UserAuthorizationModel();
            user.UserID = Convert.ToInt32(param1[0]);
            user.EmployeeID = Convert.ToInt32(param1[1]);
            user.Username = param1[2].ToString();
            user.DisplayName = param1[3].ToString();
            user.AccessToken = parameterSystem2;

            if (!String.IsNullOrEmpty(parameterSystem3))
            {
                Session["TokenCookieName"] = parameterSystem3;
                Session["Padding1CookieName"] = parameterSystem4;
                Session["Padding2CookieName"] = parameterSystem5;

                //if (HttpContext.Request.Cookies["hdTokenCookieName"] != null)
                //{
                HttpCookie hdTokenCookieName = new HttpCookie("hdTokenCookieName", Session["TokenCookieName"].ToString());
                //HttpContext.Response.Cookies.Remove("hdTokenCookieName");
                HttpContext.Response.SetCookie(hdTokenCookieName);

                HttpCookie hdTokenCookieNameTokenSession = new HttpCookie(Session["TokenCookieName"].ToString(), parameterSystem6.Replace("\"", ""));
                HttpContext.Response.SetCookie(hdTokenCookieNameTokenSession);
                //}

                //if (HttpContext.Request.Cookies["hdPadding1CookieName"] != null)
                //{
                HttpCookie hdPadding1CookieName = new HttpCookie("hdPadding1CookieName", Session["Padding1CookieName"].ToString());
                //HttpContext.Response.Cookies.Remove("hdPadding1CookieName");
                HttpContext.Response.SetCookie(hdPadding1CookieName);

                HttpCookie hdPadding1CookieNameTokenSession = new HttpCookie(Session["Padding1CookieName"].ToString(), parameterSystem7.Replace("\"", ""));
                HttpContext.Response.SetCookie(hdPadding1CookieNameTokenSession);
                //}

                //if (HttpContext.Request.Cookies["hdPadding2CookieName"] != null)
                //{
                HttpCookie hdPadding2CookieName = new HttpCookie("hdPadding2CookieName", Session["Padding2CookieName"].ToString());
                //HttpContext.Response.Cookies.Remove("hdPadding2CookieName");
                HttpContext.Response.SetCookie(hdPadding2CookieName);

                HttpCookie hdPadding2CookieNameTokenSession = new HttpCookie(Session["Padding2CookieName"].ToString(), parameterSystem8.Replace("\"", ""));
                HttpContext.Response.SetCookie(hdPadding2CookieNameTokenSession);
                //}
            }
            else
            {
                Session["TokenCookieName"] = String.Empty;
                Session["Padding1CookieName"] = String.Empty;
                Session["Padding2CookieName"] = String.Empty;
            }

            return this.Login(user);
            //return View();
        }

        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //(UserAuthorizationModel requestAccessToken) 
        public ActionResult Login(UserAuthorizationModel user)
        {
            SaveLoginSession(user);

            return RedirectToAction("Index", "Default");
        }

        private void SaveLoginSession(UserAuthorizationModel user)
        {
            Session["UserID"] = user.UserID;
            Session["EmployeeID"] = user.EmployeeID;
            Session["Username"] = user.Username;
            Session["Token"] = user.AccessToken;
            Session["DisplayName"] = user.DisplayName;
            Session["EmployeeName"] = String.IsNullOrEmpty(user.EmployeeName) ? user.DisplayName : user.EmployeeName;
        }

        private void SetVersionDisplay()
        {
            var sConcat = ".";

            var vWeb = ProjectVersion.GetStrWebVersion(sConcat);
            var vApi = ProjectVersion.GetStrApiVersion(sConcat);
            var vBiz = ProjectVersion.GetStrBizVersion(sConcat);

            ViewBag.WebVersion = "Web : " + vWeb;
            ViewBag.ApiVersion = "Api : " + vApi;
            ViewBag.BizVersion = "Biz : " + vBiz;
            //ViewBag.ReleaseDate = "Release Date : " + ReleaseDate;
        }

        #endregion

        #region Logout Module

        [AllowAnonymous]
        public ActionResult Logout()
        {

            #region Manage User Session
            Session.Remove("Username");
            Session.Remove("Token");
            Session.Remove("DisplayName");
            Session.Remove("UserID");
            Session.Remove("EmployeeID");
            Session.Remove("EmployeeName");
            Session.Remove("IsSAMRedirect");
            #endregion

            #region Manage Session Navigation
            Session.Remove("MenuName");
            Session.Remove("SearchNavTitle");
            Session.Remove("AddNavTitle");
            Session.Remove("EditNavTitle");
            Session.Remove("ViewNavTitle");
            Session.Remove("SubMenuName");
            #endregion

            Session.Abandon();

            //var SAMUrl = Session["SAMWebMvcUrl"] = System.Configuration.ConfigurationManager.AppSettings["SAMWebMvcUrl"];
            //return Redirect(SAMUrl + "Login/Logout");
            return RedirectToAction("Login", "Login", new { flagOut = "1" });
        }

        #endregion


        #region "Private Function"


        private void ManageSecreteSession()
        {
            string guid1 = Guid.NewGuid().ToString();
            string guid2 = Guid.NewGuid().ToString();
            string guid3 = Guid.NewGuid().ToString();

            Random rnd = new Random();
            int len1 = rnd.Next(4, 16);
            int len2 = rnd.Next(4, 16);
            int len3 = rnd.Next(4, 16);

            Session["TokenCookieName"] = guid1.Substring(0, len1);
            Session["Padding1CookieName"] = guid2.Substring(0, len2);
            Session["Padding2CookieName"] = guid3.Substring(0, len3);
        }

        #endregion

        #region About
        public ActionResult About()
        {
            this.SetVersionDisplay();

            return View();
        }
        #endregion
        #region Change Password
        public ActionResult ChangePassword()
        {

            return View();
        }
        #endregion

        public JsonResult GetMessageAlertList()
        {
            JsonResult result = new JsonResult();
            var msg = MasterCommonAgility.GetMessageAlertList();
            result.Data = JsonConvert.SerializeObject(msg);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}