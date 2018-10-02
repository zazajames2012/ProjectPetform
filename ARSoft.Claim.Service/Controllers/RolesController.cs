using ARSoft.Claim.Biz.Common;
using ARSoft.Claim.Biz.ErrorHandler;
using ARSoft.Claim.Biz.Master;
using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.Enumeration;
using ARSoft.Claim.Service.Controllers.Helper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ARSoft.Claim.Service.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RolesController : ApiController
    {
        [Route("ClaimService/Roles/GetRoleAll")]
        [HttpPost]
        public Object GetRoleAll(int? pageIndex, int? pageSize, string sort, RolesModel searchModel)
        {
            Hashtable hashtable = new Hashtable();
            var roleBiz = new RolesBiz();
            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                List<RolesModel> listOfRole = roleBiz.GetRoleList(pageIndex, pageSize, sort, searchModel);
                if (listOfRole != null && listOfRole.Count() > 0)
                {
                    hashtable.Add("Successfully", true);
                    hashtable.Add("Data", listOfRole);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("108", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Data", listOfRole);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("109", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
            }
            catch (Exception ex)
            {
                //hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.NotFound, null);

            }
            finally
            {
                roleBiz = null;
            }

            return hashtable;
        }

        [Route("ClaimService/Roles/GetRolesByID")]
        [HttpGet]
        public Object GetRolesByID(int ID)
        {
            Hashtable hashtable = new Hashtable();

            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                RolesBiz objBiz = new RolesBiz();
                var listData = objBiz.GetRoleByID(ID);
                if (listData != null)
                {
                    hashtable.Add("Successfully", true);
                    hashtable.Add("Data", listData);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("108", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Data", listData);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("109", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.NotFound, null);

            }

            return hashtable;
        }

        [Route("ClaimService/Roles/AddRoles")]
        [HttpPost]
        public Object AddRoles(RolesModel model)
        {
            Hashtable hashtable = new Hashtable();
            var RolesBiz = new RolesBiz();
            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;
                if (RolesBiz.checkRoleExisting(model, "Add"))
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("407", new string[] { model.RoleName }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Warning);
                    return hashtable;
                }

                bool result = RolesBiz.AddRoleItem(model);
                if (result)
                {
                    hashtable.Add("Successfully", true);
                    //hashtable.Add("Message", CommonMessageBiz.GetMessageModel("200", null).Description);
                    hashtable.Add("Message", "Add Successfully");
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("109", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
            }
            catch (Exception ex)
            {

            }
            return hashtable;
        }

        [Route("ClaimService/Roles/EditRoles")]
        [HttpPost]
        public Object EditRoles(RolesModel model)
        {
            Hashtable hashtable = new Hashtable();

            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;
                var RolesBiz = new RolesBiz();
                if (RolesBiz.checkRoleExisting(model, "Edit"))
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("407", new string[] { model.RoleName }).Description);
                    //hashtable.Add("Message", "Edit Successfully");
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Warning);
                    return hashtable;
                }

                var result = RolesBiz.EditRoleItem(model);
                hashtable.Add("Successfully", result);

                if (result)
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("102", new string[] { model.RoleName }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("402", new string[] { model.RoleName }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.DBConstraint);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Edit, model.RoleName);

            }

            return hashtable;
        }

        [Route("ClaimService/Roles/DeleteRoles")]
        [HttpPost]
        public Object DeleteRoles(RolesModel model)
        {
            Hashtable hashtable = new Hashtable();

            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;
                var RolesBiz = new RolesBiz();
                if (RolesBiz.checkRoleExisting(model, "Delete"))
                {
                    hashtable.Add("Successfully", false);
                    //hashtable.Add("Message", CommonMessageBiz.GetMessageModel("420", new string[] { model.Name }).Description);
                    hashtable.Add("Message", "Delete Successfully");
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Warning);
                    return hashtable;
                }

                var result = RolesBiz.DeleteRoleItem(model);
                hashtable.Add("Successfully", result);

                if (result)
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("102", new string[] { model.RoleName }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("403", new string[] { model.RoleName }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.DBConstraint);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Edit, model.RoleName);

            }

            return hashtable;
        }
    }
}
