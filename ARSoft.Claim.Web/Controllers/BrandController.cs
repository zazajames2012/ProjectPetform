using ARSoft.AKOW.Biz.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ARSoft.Claim.Web.Controllers
{
    public class BrandController : MasterController
    {
        // GET: Brand
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Modal()
        {
            return View();
        }
        public JsonResult GetBrands()
        {
            JsonResult result = new JsonResult();
            result.Data = new BrandBiz().GetDDLBrands();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}