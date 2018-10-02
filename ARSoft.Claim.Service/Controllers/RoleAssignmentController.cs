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
    // *** Update by : Nutthapaphon Sopradisth ***
    // *** Update Date : 28/10/2015 17:00  ***
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RoleAssignmentController : ApiController
    {
        [Route("ClaimService/RoleAssignment/GetSysRoleAll")]
        [HttpGet]
        public Object GetSysRoleAll()
        {
            Hashtable hashtable = new Hashtable();
            var sysRoleBiz = new RoleAssignmentBiz();
            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                List<DllSysRoleModel> listOfSysRole = sysRoleBiz.GetRoleList();
                if (listOfSysRole != null && listOfSysRole.Count() > 0)
                {
                    hashtable.Add("Successfully", true);
                    hashtable.Add("Data", listOfSysRole);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("108", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Data", listOfSysRole);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("109", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.NotFound, null);

            }
            finally
            {
                sysRoleBiz = null;
            }

            return hashtable;
        }

        [Route("ClaimService/RoleAssignment/GetSysRolePermissionAll")]
        [HttpGet]
        public Object GetRoleAssignmentList()
        {
            Hashtable hashtable = new Hashtable();
            var sysRoleBiz = new RoleAssignmentBiz();
            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                List<SysRoleModel> listOfSysRole = sysRoleBiz.GetSysRolePermissionList();
                if (listOfSysRole != null && listOfSysRole.Count() > 0)
                {
                    hashtable.Add("Successfully", true);
                    hashtable.Add("Data", listOfSysRole);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("108", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Data", listOfSysRole);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("109", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.NotFound, null);

            }
            finally
            {
                sysRoleBiz = null;
            }

            return hashtable;
        }

        [Route("ClaimService/RoleAssignment/GetSysRolePermissionById")]
        [HttpGet]
        public Object GetSysRolePermissionList(int type, int roleId, int level)
        {
            Hashtable hashtable = new Hashtable();
            var sysRoleBiz = new RoleAssignmentBiz();
            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                List<SysRoleModel> listOfSysRole = sysRoleBiz.GetSysRolePermissionList(type, roleId, level);
                if (listOfSysRole != null && listOfSysRole.Count() > 0)
                {
                    hashtable.Add("Successfully", true);
                    hashtable.Add("Data", listOfSysRole);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("108", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Data", listOfSysRole);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("109", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.NotFound, null);

            }
            finally
            {
                sysRoleBiz = null;
            }

            return hashtable;
        }

        [Route("ClaimService/RoleAssignment/GetSysRolePermissionForGrid")]
        [HttpGet]
        public Object GetSysRolePermissionForGridList(int type, int roleId, int level)
        {
            Hashtable hashtable = new Hashtable();
            var sysRoleBiz = new RoleAssignmentBiz();
            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                List<SysRoleModel> listOfSysRole = sysRoleBiz.GetSysRolePermissionList(type, roleId, level);
                if (listOfSysRole != null && listOfSysRole.Count() > 0)
                {
                    hashtable.Add("Successfully", true);
                    hashtable.Add("Data", listOfSysRole);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("108", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Data", listOfSysRole);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("109", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.NotFound, null);

            }
            finally
            {
                sysRoleBiz = null;
            }

            return hashtable;
        }

        [Route("ClaimService/RoleAssignment/GetChildSysRolePermission")]
        [HttpGet]
        public Object GetChildSysRolePermissionList(int type, int roleId, int level, int parentId)
        {
            Hashtable hashtable = new Hashtable();
            var sysRoleBiz = new RoleAssignmentBiz();
            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                List<SysRoleModel> listOfSysRole = sysRoleBiz.GetChildSysRolePermissionList(type, roleId, level, parentId);
                if (listOfSysRole != null && listOfSysRole.Count() > 0)
                {
                    hashtable.Add("Successfully", true);
                    hashtable.Add("Data", listOfSysRole);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("108", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Data", listOfSysRole);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("109", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.NotFound, null);

            }
            finally
            {
                sysRoleBiz = null;
            }

            return hashtable;
        }

        [Route("ClaimService/RoleAssignment/Post")]
        [HttpPost]
        public Object PostSysRolePermission(SysRoleModel[] sysRoleCollection)
        {
            Hashtable hashtable = new Hashtable();
            var sysRoleBiz = new RoleAssignmentBiz();
            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                bool result = sysRoleBiz.AddSysRolePermissionCollection(sysRoleCollection);
                hashtable.Add("Successfully", result);

                if (result)
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("112", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("417", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.DBConstraint);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Add, "Permission");

            }
            finally
            {
                sysRoleBiz = null;
            }

            return hashtable;
        }
    }
}
