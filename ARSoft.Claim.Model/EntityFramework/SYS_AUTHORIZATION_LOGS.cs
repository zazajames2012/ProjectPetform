//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ARSoft.Claim.Model.EntityFramework
{
    using System;
    using System.Collections.Generic;
    
    public partial class SYS_AUTHORIZATION_LOGS
    {
        public int ID { get; set; }
        public int ApplicationID { get; set; }
        public string Code { get; set; }
        public string Username { get; set; }
        public Nullable<System.DateTime> ExpireDate { get; set; }
        public string IPAddress { get; set; }
        public string HttpInfo { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public bool IsNeverExpireDate { get; set; }
        public string AuthorizationCode { get; set; }
        public string Token { get; set; }
    
        public virtual SYS_AUTHORIZED_APPLICATIONS SYS_AUTHORIZED_APPLICATIONS { get; set; }
    }
}
