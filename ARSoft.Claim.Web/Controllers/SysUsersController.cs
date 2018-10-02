using ARSoft.Claim.Biz.Agility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ARSoft.Claim.Web.Controllers
{
    public class SysUsersController : MasterController
    {
        //
        // GET: /SysUsers/
        public ActionResult Index()
        {
            SysRoleAgility objRole = new SysRoleAgility();
            var tempRoleName = objRole.GetSysRoleToDropDownList();
            List<SelectListItem> itemRole = new List<SelectListItem>();

            foreach (var item in tempRoleName)
            {
                itemRole.Add(new SelectListItem
                {
                    Text = item.RoleName,
                    Value = item.ID.ToString(),
                    Selected = false
                });

            }
            ViewBag.RoleName = itemRole;

            return View();
        }

        public ActionResult SysUsersModalAdd()
        {
            SysRoleAgility objRole = new SysRoleAgility();
            var tempRoleName = objRole.GetSysRoleToDropDownList();
            List<SelectListItem> itemRole = new List<SelectListItem>();

            foreach (var item in tempRoleName)
            {
                itemRole.Add(new SelectListItem
                {
                    Text = item.RoleName,
                    Value = item.ID.ToString(),
                    Selected = false
                });

            }
            ViewBag.RoleName = itemRole;

            return View();
        }

        public ActionResult SysUsersModalView()
        {
            SysRoleAgility objRole = new SysRoleAgility();
            var tempRoleName = objRole.GetSysRoleToDropDownList();
            List<SelectListItem> itemRole = new List<SelectListItem>();

            foreach (var item in tempRoleName)
            {
                itemRole.Add(new SelectListItem
                {
                    Text = item.RoleName,
                    Value = item.ID.ToString(),
                    Selected = false
                });

            }
            ViewBag.RoleName = itemRole;

            return View();
        }

        public ActionResult SysUsersModalEdit()
        {
            SysRoleAgility objRole = new SysRoleAgility();
            var tempRoleName = objRole.GetSysRoleToDropDownList();
            List<SelectListItem> itemRole = new List<SelectListItem>();

            foreach (var item in tempRoleName)
            {
                itemRole.Add(new SelectListItem
                {
                    Text = item.RoleName,
                    Value = item.ID.ToString(),
                    Selected = false
                });

            }
            ViewBag.RoleName = itemRole;

            return View();
        }
    }
}