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
    
    public partial class TRX_ERROR_LOG
    {
        public long RunNo { get; set; }
        public string ProjectName { get; set; }
        public string ErrorType { get; set; }
        public string ErrorMessage { get; set; }
        public string Module { get; set; }
        public string ExceptionString { get; set; }
        public Nullable<System.DateTime> ErrorDate { get; set; }
        public string StackTrace { get; set; }
    }
}
