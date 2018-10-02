using ARSoft.Claim.Biz.Common;
using ARSoft.Claim.Biz.Master;
using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.BOL.Authorization;
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
    public class UserControlController : ApiController
    {

        private UserControlBiz userCtrlBiz;
        public UserControlController()
        {
            userCtrlBiz = new UserControlBiz();
        }

        [Route("ClaimService/UserControl/GetAll")]
        [HttpGet]   
        public Object Get()
        {
            return userCtrlBiz.GetAuthorizedMenusModelList("Admin", null);
        }


        [Route("ClaimService/UserControl/GetMenuRenderText")]
        [HttpPost]
        public string GetMenuRenderText(UserAuthorizationModel pUserAuth)
        {
            return userCtrlBiz.GetAllMenuRenderText(pUserAuth);
        }


        [Route("ClaimService/UserControl/CheckPermission")]
        [HttpGet]
        public object CheckPermission(string userName, string url)
        {
            PermissionModel returnObject = userCtrlBiz.CheckPermission(userName, url);
            Hashtable hashtable = new Hashtable();
            hashtable.Add("Successfully", true);
            hashtable.Add("Data", returnObject);
            hashtable.Add("Message", CommonMessageBiz.GetMessageModel("108", null).Description);
            hashtable.Add("ResultType", 0);
            return hashtable;
        }
    }
}
