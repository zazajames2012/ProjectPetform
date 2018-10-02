// *** Update by : Pongthorn Paemanee ***
// *** Update Date : 13/10/2015 16:30  ***

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace ARSoft.Claim.Web.Controllers
{
    public class EmployeesController : MasterController
    {
        //
        // GET: /Employees/
        public ActionResult Index()
        {
            //EmployeesAgility objEmp = new EmployeesAgility();
            //ViewBag.Department = new SelectList(objEmp.getDDLDepartment(), "ID", "Name");
            //ViewBag.Section = new SelectList(objEmp.getDDLSection(), "ID", "Name");

            return View();
        }

        public ActionResult EmployeesModalAdd()
        {
            //EmployeesAgility objEmp = new EmployeesAgility();
            //ViewBag.AddOrgName = objEmp.getOrganization().Name;
            //ViewBag.AddPosition = new SelectList(objEmp.getDDLPosition(), "ID", "Name");
            //ViewBag.AddEmpTitle = new SelectList(objEmp.getDDLEmpTitle(), "ID", "Name");

            return View();
        }

        public ActionResult EmployeesModalView()
        {
            //EmployeesAgility objEmp = new EmployeesAgility();
            //ViewBag.ViewOrgName = objEmp.getOrganization().Name;
            //ViewBag.ViewDepartment = new SelectList(objEmp.getDDLDepartment(), "ID", "Name");
            //ViewBag.ViewSection = new SelectList(objEmp.getDDLSection(), "ID", "Name");
            //ViewBag.ViewSector = new SelectList(objEmp.getDDLSector(), "ID", "Name");
            //ViewBag.ViewPosition = new SelectList(objEmp.getDDLPosition(), "ID", "Name");
            //ViewBag.ViewEmpTitle = new SelectList(objEmp.getDDLEmpTitle(), "ID", "Name");

            return View();
        }

        public ActionResult EmployeesModalEdit()
        {
            //EmployeesAgility objEmp = new EmployeesAgility();
            //ViewBag.EditOrgName = objEmp.getOrganization().Name;
            //ViewBag.EditPosition = new SelectList(objEmp.getDDLPosition(), "ID", "Name");
            //ViewBag.EditEmpTitle = new SelectList(objEmp.getDDLEmpTitle(), "ID", "Name");

            return View();
        }



        //public JsonResult GetOrganization()
        //{
        //    //JsonResult result = new JsonResult();
        //    //result.Data = new EmployeesAgility().getOrganization();
        //    return Json("", JsonRequestBehavior.AllowGet);
        //}
        //public JsonResult GetDDLDepartment()
        //{
        //    //JsonResult result = new JsonResult();
        //    //result.Data = new EmployeesAgility().getDDLDepartment();
        //    return Json("", JsonRequestBehavior.AllowGet);
        //}
        //public JsonResult GetDDLSection()
        //{
        //    //JsonResult result = new JsonResult();
        //    //result.Data = new EmployeesAgility().getDDLSection();
        //    return Json("", JsonRequestBehavior.AllowGet);
        //}
        //public JsonResult GetDDLSector()
        //{
        //    //JsonResult result = new JsonResult();
        //    //result.Data = new EmployeesAgility().getDDLSector();
        //    return Json("", JsonRequestBehavior.AllowGet);
        //}
    }
}