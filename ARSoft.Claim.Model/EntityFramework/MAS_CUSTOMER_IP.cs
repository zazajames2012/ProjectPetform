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
    
    public partial class MAS_CUSTOMER_IP
    {
        public int ID { get; set; }
        public int CustomerID { get; set; }
        public string IPAddress { get; set; }
    
        public virtual MAS_CUSTOMERS MAS_CUSTOMERS { get; set; }
    }
}