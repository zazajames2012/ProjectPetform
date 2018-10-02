// *** Update by : Pongthorn Paemanee ***
// *** Update Date : 13/10/2015 16:30  ***

using ARSoft.Claim.Biz.Agility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace ARSoft.Claim.Web.Controllers
{
    public class CustomerController : MasterController
    {
        public ActionResult Index()
        {
            //var objCusType = new CustomersAgility();
            //ViewBag.CusTypeGroup = objCusType.getDDLCustomerType();

            //var objStatus = new MasterCommonAgility();
            //ViewBag.CusStatusGroup = objStatus.getBindingStatus();

            return View();
        }
        public ActionResult AddCustomersModal()
        {
            //var objCusType = new CustomersAgility();
            //var objCusCategory = new MasterSetupAgility();
            //ViewBag.Customer_CusType = objCusType.getDDLCustomerType();
            //ViewBag.Customer_Category = new SelectList(objCusCategory.getDDLCusCategory(), "MasterSetupId", "Name");
            //ViewBag.Customer_OrgName = EnumHelper.GetEnumDescription(CustomerJuristicType.Organization);
            //ViewBag.Customer_OrgValue = (int)CustomerJuristicType.Organization;
            //ViewBag.Customer_IndividualName = EnumHelper.GetEnumDescription(CustomerJuristicType.Individual);
            //ViewBag.Customer_IndividualValue = (int)CustomerJuristicType.Individual;

            return View();
        }
        public ActionResult EditCustomersModal()
        {
            //var objCusCategory = new MasterSetupAgility();
            //var objStatus = new MasterCommonAgility();
            //ViewBag.Customer_EditCategory = new SelectList(objCusCategory.getDDLCusCategory(), "MasterSetupId", "Name");
            //ViewBag.CusStatusGroup = objStatus.getBindingStatus();

            return View();
        }
        public ActionResult ViewCustomersModal()
        {
            //var objCusCategory = new MasterSetupAgility();
            //var objStatus = new MasterCommonAgility();
            //ViewBag.Customer_ViewCategory = new SelectList(objCusCategory.getDDLCusCategory(), "MasterSetupId", "Name");
            //ViewBag.CusStatusGroup = objStatus.getBindingStatus();

            return View();
        }
        public ActionResult AddCustomerContactsModal()
        {
            //var objMsCom = new MasterCommonAgility();
            //ViewBag.CusStatusGroup = objMsCom.getBindingStatus();
            //ViewBag.CusContactType = objMsCom.getBindingContactType();

            return View();
        }
        public ActionResult EditCustomerContactsModal()
        {
            //var objMsCom = new MasterCommonAgility();
            //ViewBag.CusStatusGroup = objMsCom.getBindingStatus();
            //ViewBag.CusContactType = objMsCom.getBindingContactType();

            return View();
        }
        public ActionResult AddCustomerLocationsModal()
        {
            //var objMsCom = new MasterCommonAgility();
            //var objAsset = new AssetLocationAgility();
            //ViewBag.CusStatusGroup = objMsCom.getBindingStatus();
            //ViewBag.CusLocation_AddZone = new SelectList(objAsset.getDDLZone(), "ID", "Name");

            return View();
        }
        public ActionResult EditCustomerLocationsModal()
        {
            //var objMsCom = new MasterCommonAgility();
            //var objAsset = new AssetLocationAgility();
            //ViewBag.CusStatusGroup = objMsCom.getBindingStatus();
            //ViewBag.CusLocation_EditZone = new SelectList(objAsset.getDDLZone(), "ID", "Name");

            return View();
        }
        //public JsonResult getDDLCustomerGroup()
        //{
        //    //JsonResult result = new JsonResult();
        //    //result.Data = new CustomersAgility().getDDLCustomerGroup();
        //    //return Json(result, JsonRequestBehavior.AllowGet);
        //}
    }
}