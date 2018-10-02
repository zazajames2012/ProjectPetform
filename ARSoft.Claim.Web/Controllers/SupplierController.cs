using ARSoft.Claim.Biz.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ARSoft.Claim.Web.Controllers
{
    public class SupplierController : MasterController
    {
        // GET: Supplier
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AddSupplierModal()
        {
            return View();
        }

        public ActionResult EditSupplierModal()
        {
            return View();
        }

        public ActionResult ViewSupplierModal()
        {
            return View();
        }

        public ActionResult AddSupplierContactModal()
        {
            return View();
        }

        public ActionResult EditSupplierContactModal()
        {
            return View();
        }

        public JsonResult GetSupplierTypes()
        {
            JsonResult result = new JsonResult();
            result.Data = new SupplierBiz().GetSupplierTypes();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}