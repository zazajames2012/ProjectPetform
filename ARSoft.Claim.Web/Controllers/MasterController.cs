using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.BOL.Authorization;
using ARSoft.Claim.Model.Enumeration;
using ARSoft.Claim.Web.Controllers.SharedFunctions;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ARSoft.Claim.Web.Controllers
{
    public class MasterController : Controller
    {
        public string CaptionName { get; set; }
        //
        // GET: /Master/
        public ActionResult View()
        {
            try
            {
                Session["AuthorizedMenusHtml"] = GetAuthorizedMenusHtmlString();

                byte pStatus = PermissionStatus();

                if (pStatus == 0)
                {

                    return RedirectToAction("Logout", "Login", new { area = "" });
                }
                else if (pStatus == 1)
                {
                    return RedirectToAction("Index", "Default");
                }
                else
                {
                    return base.View();
                }
            }
            catch (Exception ex)
            {
                Session["AuthorizedMenusHtml"] = "||||||||" + ex.ToString();
                return base.View();
            }

        }

        private PermissionModel GetUrlPermission()
        {
            PermissionModel result = null;
            var jSon = HttpWebRequestFunction.HttpGet(Session["WebApiUrl"] + "UserControl/CheckPermission?userName=" + Session["Username"] + "&url=" + Request.RawUrl);
            var hTable = JsonConvert.DeserializeObject<Hashtable>(jSon);
            Session["FunctionCode"] = string.Empty;

            if (hTable["Data"] != null)
            {
                result = JsonConvert.DeserializeObject<PermissionModel>(hTable["Data"].ToString());
            }

            if (result != null)
            {
                ViewData["CaptionName"] = result.CAPTION;
                if (result.LEVELS < 3)
                {
                    string functionCaption = result.FunctionCaption;
                    string resultSearchTagHTML = "<h4 class='akow-modal-title'>&nbsp;&nbsp;" + functionCaption + "</h4>";
                    string resultAddTagHTML = "<h4 class='akow-modal-title'>" + result.CAPTION + "<i class='fa fa-fw fa-chevron-right'></i>" + EnumHelper.GetEnumDescription((NavigateAction)(int)NavigateAction.Add) + "&nbsp;" + result.CAPTION + "</h4>";
                    string resultEditTagHTML = "<h4 class='akow-modal-title'>" + result.CAPTION + "<i class='fa fa-fw fa-chevron-right'></i>" + EnumHelper.GetEnumDescription((NavigateAction)(int)NavigateAction.Edit) + "&nbsp;" + result.CAPTION + "</h4>";
                    string resultViewTagHTML = "<h4 class='akow-modal-title'>" + result.CAPTION + "<i class='fa fa-fw fa-chevron-right'></i>" + EnumHelper.GetEnumDescription((NavigateAction)(int)NavigateAction.View) + "&nbsp;" + result.CAPTION + "</h4>";

                    Session["MenuName"] = result.CAPTION;
                    Session["SearchNavTitle"] = resultSearchTagHTML;
                    Session["AddNavTitle"] = resultAddTagHTML;
                    Session["EditNavTitle"] = resultEditTagHTML;
                    Session["ViewNavTitle"] = resultViewTagHTML;
                    //Session["DeleteNavTitle"] = resultDeleteTagHTML;
                    Session["SubMenuName"] = string.Empty;
                    Session["FunctionCode"] = result.FunctionCode == null ? "" : result.FunctionCode;
                }
                else if (result.LEVELS == 3)
                {
                    Session["SubMenuName"] = result.CAPTION;
                }
            }

            return result;
        }

        private string GetAuthorizedMenusHtmlString()
        {
            if (Session["Username"] == null || Session["Username"].ToString() == string.Empty)
            {
                return string.Empty;
            }

            var objUser = new UserAuthorizationModel();
            var listUser = new List<UserAuthorizationModel>();
            objUser.UserID = (int)Session["UserID"];
            objUser.EmployeeID = (int)Session["EmployeeID"];
            objUser.Username = Session["Username"].ToString();
            objUser.AccessToken = Session["Token"].ToString();
            objUser.DisplayName = Session["DisplayName"].ToString();
            objUser.CurrentUrl = Request.RawUrl;
            objUser.WebMvcUrl = System.Configuration.ConfigurationManager.AppSettings["WebMvcUrl"].ToString();
            listUser.Add(objUser);

            var json = JsonConvert.SerializeObject(listUser);
            json = json.Replace("[", "");
            json = json.Replace("]", "");

            string MenusHtmlString = HttpWebRequestFunction.HttpPost(Session["WebApiUrl"] + "UserControl/GetMenuRenderText", json);

            return MenusHtmlString;
        }

        private byte PermissionStatus()
        {
            if (Session["Username"] == null || Session["Username"].ToString() == string.Empty)
            {
                return 0;
            }
            else
            {
                var urlPermission = GetUrlPermission();

                if (urlPermission == null)
                {
                    return 2;
                }
                else
                {
                    if (urlPermission.Search == false)
                    {
                        return 1;
                    }
                    else
                    {
                        return 2;
                    }
                }
            }
        }
    }
}