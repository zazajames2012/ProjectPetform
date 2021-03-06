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
    
    public partial class MAS_CUSTOMER_CONTACTS
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MAS_CUSTOMER_CONTACTS()
        {
            this.MAS_CUSTOMER_LOCATIONS = new HashSet<MAS_CUSTOMER_LOCATIONS>();
            this.TRN_JOBS = new HashSet<TRN_JOBS>();
        }
    
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
    
        public virtual MAS_CUSTOMERS MAS_CUSTOMERS { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MAS_CUSTOMER_LOCATIONS> MAS_CUSTOMER_LOCATIONS { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TRN_JOBS> TRN_JOBS { get; set; }
    }
}
