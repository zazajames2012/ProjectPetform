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
    
    public partial class MAS_SLA_COMPUTE_SETTINGS
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte SlaTaskID { get; set; }
        public byte SlaResponseTypeID { get; set; }
        public byte SlaStartDate { get; set; }
        public byte SlaEndDate { get; set; }
        public byte SlaOverByDate { get; set; }
        public Nullable<bool> ExcludeWeekEnd { get; set; }
        public System.TimeSpan OpenBusinessHour { get; set; }
        public System.TimeSpan OffBusinessHours { get; set; }
        public Nullable<System.TimeSpan> ApplyOffBusinessHours { get; set; }
        public System.TimeSpan LimitSlaBussinessHours { get; set; }
        public Nullable<byte> SettingType { get; set; }
        public byte System_Flag { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDated { get; set; }
    }
}