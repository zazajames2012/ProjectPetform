using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL.Authorization
{
    public class UserAuthorizationModel
    {
        #region Properties        
        public int ApplicationID { get; set; }
        public string AuthorizationCode { get; set; }
        public string ApplicationKey { get; set; }
        public int UserID { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string EmployeeName { get; set; }
        public string Password { get; set; }
        public string IPAddress { get; set; }
        public string HttpInfo { get; set; }
        public int? EmployeeID { get; set; }
        public string AccessToken { get; set; }
        public string CurrentUrl { get; set; }
        public bool IsAuthMobile { get; set; }
        public string WebMvcUrl { get; set; }
        #endregion

    }
}
