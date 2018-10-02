using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using System.Collections;
using System.IO;
using ARSoft.Claim.Biz.Master;

namespace ARSoft.Claim.Web.Controllers
{
    public class ProductsController : MasterController
    {
        //
        // GET: /Products/
        public ActionResult Index()
        {

            return View();
        }
        public ActionResult AddProductsModal()
        {
            return View();
        }
        public ActionResult EditProductsModal()
        {
            return View();
        }
        public ActionResult ViewProductsModal()
        {
            return View();
        }

        public JsonResult GetProductGroups()
        {
            JsonResult result = new JsonResult();
            result.Data = new ProductsBiz().getDDLProductsGroup();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProducts()
        {
            JsonResult result = new JsonResult();
            result.Data = new ProductsBiz().getDDLProducts();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult GetProductsByJob(int? jobID)
        //{
        //    JsonResult result = new JsonResult();
        //    result.Data = new ProductsBiz().getDDLProductsByJob(jobID);
        //    return Json(result, JsonRequestBehavior.AllowGet);
        //}
        //public JsonResult GetDDLAccessoriesUnit()
        //{
        //    JsonResult result = new JsonResult();
        //    result.Data = new AccessoriesAgility().GetDDLAccessoriesUnit();
        //    return Json(result, JsonRequestBehavior.AllowGet);
        //}


    }
}