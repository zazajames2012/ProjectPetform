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
    public class SysUsersController : ApiController
    {
        [HttpGet]
        [Route("ClaimService/sysusers/GetSysUserById")]
        public Object GetSysUserById(int Id)
        {
            Hashtable hashtable = new Hashtable();

            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                SysUserBiz mSysUsers = new SysUserBiz();
                var listData = mSysUsers.GetSysUserById(Id);
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

        [Route("ClaimService/sysusers/GetSysUserAll")]
        [HttpPost]
        public Object GetSysUserAll(int? PageIndex, int? PageSize, string Sort, SysUsersModel sysuser)
        {
            Hashtable hashtable = new Hashtable();

            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                SysUserBiz mSysUsers = new SysUserBiz();
                var listData = mSysUsers.GetSysUsers(PageIndex, PageSize, Sort, sysuser);
                if (listData != null && listData.Count() > 0)
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
                    if (sysuser.IsSearch)
                    { hashtable.Add("ResultType", (int)RESULT_TYPE.NonReferenceData); }
                    else
                    { hashtable.Add("ResultType", (int)RESULT_TYPE.Normal); }
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.NotFound, null);
            }

            return hashtable;
        }

        [HttpPost]
        [Route("ClaimService/sysusers/Post")]
        public Object PostSysUsers(SysUsersModel pSysUserModel)
        {
            Hashtable hashtable = new Hashtable();

            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                SysUserBiz mSysUsers = new SysUserBiz();
                hashtable = mSysUsers.ValidateAddSysUser(pSysUserModel);
                if (!(bool)hashtable["Successfully"])
                {
                    return hashtable;
                }
                hashtable.Clear();

                var result = mSysUsers.addSysUsers(pSysUserModel);
                hashtable.Add("Successfully", result);

                if (result)
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("101", new string[] { pSysUserModel.Username }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("401", new string[] { pSysUserModel.Username }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.DBConstraint);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Add, pSysUserModel.Username);
            }

            return hashtable;
        }

        [HttpPost]
        [Route("ClaimService/sysusers/Put")]
        public Object PutSetups(SysUsersModel pSysUserModel)
        {
            Hashtable hashtable = new Hashtable();

            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                SysUserBiz mSysUsers = new SysUserBiz();
                hashtable = mSysUsers.ValidateEditSysUser(pSysUserModel);
                if (!(bool)hashtable["Successfully"])
                {
                    return hashtable;
                }
                hashtable.Clear();

                var result = mSysUsers.editSysUsers(pSysUserModel);
                hashtable.Add("Successfully", result);

                if (result)
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("102", new string[] { pSysUserModel.Username }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("402", new string[] { pSysUserModel.Username }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.DBConstraint);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Edit, pSysUserModel.Username);
            }

            return hashtable;
        }

        [HttpPost]
        [Route("ClaimService/sysusers/EditRoleAssign")]
        public Object EditRoleAssign(SysUsersModel pSysUserModel)
        {
            Hashtable hashtable = new Hashtable();

            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                SysUserBiz mSysUsers = new SysUserBiz();
                //hashtable = mSysUsers.ValidateEditSysUser(pSysUserModel);
                //if (!(bool)hashtable["Successfully"])
                //{
                //    return hashtable;
                //}
                hashtable.Clear();

                var result = mSysUsers.editRoleAssign(pSysUserModel);
                hashtable.Add("Successfully", result);

                if (result)
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("102", new string[] { pSysUserModel.Username }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("402", new string[] { pSysUserModel.Username }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.DBConstraint);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Edit, pSysUserModel.Username);
            }

            return hashtable;
        }

        [HttpGet]
        [Route("ClaimService/SysUsers/Delete")]
        public Object DeleteSysUsers(string sid)
        {
            Hashtable hashtable = new Hashtable();

            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                SysUserBiz mSysUsers = new SysUserBiz();
                hashtable = mSysUsers.ValidateDelSysUser(sid);
                if (!(bool)hashtable["Successfully"])
                {
                    return hashtable;
                }
                hashtable.Clear();

                var result = mSysUsers.delSysUsers(sid);
                hashtable.Add("Successfully", result);

                if (result)
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("106", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("406", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.DBConstraint);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Delete, null);
            }

            return hashtable;
        }
    }
}
