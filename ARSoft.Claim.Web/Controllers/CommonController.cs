using ARSoft.Claim.Biz.Agility;
using ARSoft.Claim.Biz.Common;
using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.Enumeration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ARSoft.Claim.Web.Controllers
{
    public class CommonController : MasterController
    {
        private MasterCommonAgility commonAgility;

        //
        // GET: /Common/
        public CommonController()
        {
            this.commonAgility = new MasterCommonAgility();
        }

        public ActionResult CancelProcessModal()
        {
            List<EnumDataItem> ListOfccProcess = new List<EnumDataItem>();
            foreach (var value in EnumHelper.GetEnumDataItems(typeof(CancelProcessStatus)))
            {
                ListOfccProcess.Add(value);
            }
            ViewBag.ccProcessList = ListOfccProcess;
            return View();
        }

        public JsonResult GetAllPosition()
        {
            JsonResult result = new JsonResult();
            result.Data = commonAgility.SelectAllPosition();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllDepartment()
        {
            JsonResult result = new JsonResult();
            result.Data = commonAgility.SelectAllDepartment();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSectionByDepartment()
        {
            JsonResult result = new JsonResult();
            result.Data = commonAgility.SelectAllSection();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllProvince()
        {
            JsonResult result = new JsonResult();
            result.Data = commonAgility.SelectAllProvince();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProvinceByRegion(byte regionID)
        {
            JsonResult result = new JsonResult();
            result.Data = commonAgility.SelectProvinceByRegion(regionID);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDistrictByProvince(byte provinceID)
        {
            JsonResult result = new JsonResult();
            result.Data = commonAgility.SelectDistrictByProvince(provinceID);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllRegion()
        {
            JsonResult result = new JsonResult();
            result.Data = commonAgility.SelectAllRegion();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllProduct()
        {
            JsonResult result = new JsonResult();
            result.Data = commonAgility.SelectAllProduct();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllBrand()
        {
            JsonResult result = new JsonResult();
            result.Data = commonAgility.SelectAllBrand();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetServerMapPath()
        {
            JsonResult result = new JsonResult();
            result.Data = Server.MapPath("~").ToString();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPermissionComponent(string FunctionCode, int UserID)
        {
            JsonResult result = new JsonResult();
            var perBiz = new PermissionBiz();
            result.Data = perBiz.GetPermissionComponent(FunctionCode, UserID);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}