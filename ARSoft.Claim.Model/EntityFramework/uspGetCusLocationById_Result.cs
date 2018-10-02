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
    
    public partial class uspGetCusLocationById_Result
    {
        public Nullable<long> RowNumber { get; set; }
        public Nullable<int> RecordCount { get; set; }
        public int ID { get; set; }
        public int CustomerID { get; set; }
        public Nullable<int> ContactID { get; set; }
        public string Name { get; set; }
        public string AddressLineOne { get; set; }
        public string AddressLineTwo { get; set; }
        public int DistrictID { get; set; }
        public string PostCode { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string GpsLocation { get; set; }
        public Nullable<int> ZoneID { get; set; }
        public Nullable<int> ServiceSupportID { get; set; }
        public Nullable<System.TimeSpan> WeekOfficeHourStart { get; set; }
        public Nullable<System.TimeSpan> WeekOfficeHourEnd { get; set; }
        public Nullable<System.TimeSpan> WeekendOfficeHourStart { get; set; }
        public Nullable<System.TimeSpan> WeekendOfficeHourEnd { get; set; }
        public bool DefalutLocation { get; set; }
        public bool BillingLocation { get; set; }
        public bool ProjectSite { get; set; }
        public bool AssetLocation { get; set; }
        public bool OtherLocation { get; set; }
        public string Remark { get; set; }
        public byte System_Flag { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public Nullable<int> CusContactID { get; set; }
        public string TitleName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactPhone { get; set; }
        public string DistrictName { get; set; }
        public string ProvinceName { get; set; }
    }
}