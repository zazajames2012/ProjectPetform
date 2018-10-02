using ARSoft.Claim.Biz.Agility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ARSoft.Claim.Web.Controllers
{
    public class PopupController : MasterController
    {       
        public ActionResult SearchEmployeeModal()
        {
            return View();
        }

        public ActionResult SearchCustomerModal()
        {
            return View();
        }

        public ActionResult SearchCustomerContactModal()
        {
            return View();
        }

    }
}