using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ARSoft.Claim.Web.Controllers
{    
    public class BusinessController : MasterController
    {
        //
        // GET: /Position/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AddBusinessModal()
        {
            return View();
        }

        public ActionResult EditBusinessModal()
        {
            return View();
        }

        public ActionResult ViewBusinessModal()
        {
            return View();
        }
	}
}