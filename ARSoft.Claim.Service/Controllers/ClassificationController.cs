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
using static ARSoft.Claim.Model.Enumeration.EnumHelper;

namespace ARSoft.Claim.Service.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ClassificationController : ApiController
    {
        [HttpPost]
        [Route("ClaimService/Classification/GetAll")]        
        public Object GetClassificationList(int? pageIndex, int? pageSize, string sort, ClassificationModel searchModel)
        {
            var objBiz = new ClassificationBiz();
            Hashtable hashtable = new Hashtable();
            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                List<ClassificationModel> listOfMaster = objBiz.GetClassificationList(pageIndex, pageSize, sort, searchModel);
                if (listOfMaster != null && listOfMaster.Count() > 0)
                {
                    hashtable.Add("Successfully", true);
                    hashtable.Add("Data", listOfMaster);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("108", null).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Data", listOfMaster);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("109", null).Description);
                    if (searchModel.IsSearch)
                        hashtable.Add("ResultType", (int)RESULT_TYPE.NonReferenceData);
                    else
                        hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Search, null);

            }
            finally
            {
                objBiz = null;
            }

            return hashtable;
        }

        [HttpGet]
        [Route("ClaimService/Classification/GetClassificationByID")]
        public Object GetClassificationByID(int id)
        {
            Hashtable hashtable = new Hashtable();

            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                ClassificationBiz objBiz = new ClassificationBiz();
                var listData = objBiz.GetClassificationByID(id);
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

        [HttpPost]
        [Route("ClaimService/Classification/Post")]
        public Object PostClassification(ClassificationModel model)
        {
            Hashtable hashtable = new Hashtable();

            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;
                var objBiz = new ClassificationBiz();

                if (objBiz.CheckClassificationExisting(model, ActionMode.Add.ToString()))
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("420", new string[] { model.Name }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Warning);
                    return hashtable;
                }

                var result = objBiz.AddClassification(model);
                hashtable.Add("Successfully", result);

                if (result)
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("101", new string[] { model.Name }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("401", new string[] { model.Name }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.DBConstraint);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Add, model.Name);
            }

            return hashtable;
        }

        [HttpPost]
        [Route("ClaimService/Classification/Put")]
        public Object PutClassification(ClassificationModel model)
        {
            Hashtable hashtable = new Hashtable();

            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;
                var objBiz = new ClassificationBiz();
                if (objBiz.CheckClassificationExisting(model, ActionMode.Edit.ToString()))
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("420", new string[] { model.Name }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Warning);
                    return hashtable;
                }

                var result = objBiz.EditClassification(model);
                hashtable.Add("Successfully", result);

                if (result)
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("102", new string[] { model.Name }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("402", new string[] { model.Name }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.DBConstraint);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Edit, model.Name);

            }

            return hashtable;
        }

        [HttpPost]
        [Route("ClaimService/Classification/Delete")]
        public Object DeleteClassification(ClassificationModel model)
        {
            var objBiz = new ClassificationBiz();
            Hashtable hashtable = new Hashtable();
            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                if (objBiz.CheckClassificationIsUsed(model))
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Message", CommonMessageBiz.GetMessageModel("407", new string[] { model.Name }).Description);
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Warning);
                    return hashtable;
                }
                var result = objBiz.DelClassification(model.ID);
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
