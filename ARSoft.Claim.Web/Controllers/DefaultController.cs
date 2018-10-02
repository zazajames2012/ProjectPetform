using ARSoft.Claim.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ARSoft.Claim.Web.Controllers
{
    public class DefaultController : MasterController
    {
        //
        // GET: /Default/ 
        #region Private Variables

        private LoginModel objLogin = new LoginModel();

        #endregion

        #region View Module

        public ActionResult Index()
        {
            string localPathUrl = Request.Url.LocalPath.ToLower();

            if (Session["IsSAMRedirect"] == null)
            {
                return RedirectToAction("Logout", "Login");
            }
            if ((bool)Session["IsSAMRedirect"])
            {
                Session["IsSAMRedirect"] = false;
                return Content("<script> window.location = '" + Session["WebMvcUrl"].ToString() + "Default/Index';</script>");

            }
            else
            {
                return View();
            }
        }

        public ActionResult Index2()
        {
            return View();
        }

        public ActionResult Index3()
        {
            string localPathUrl = Request.Url.LocalPath.ToLower();

            return View();
        }

        #endregion
    }
}