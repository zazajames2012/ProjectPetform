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
    
    public partial class uspGetCusContactById_Result
    {
        public Nullable<long> RowNumber { get; set; }
        public Nullable<int> RecordCount { get; set; }
        public int ID { get; set; }
        public int CustomerID { get; set; }
        public string TitleName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PhoneOtherOne { get; set; }
        public string PhoneOtherTwo { get; set; }
        public string PhoneOtherThree { get; set; }
        public byte TypeID { get; set; }
        public string Remark { get; set; }
        public byte System_Flag { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public Nullable<int> LocationID { get; set; }
    }
}