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
    
    public partial class MAS_CUSTOMERS
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MAS_CUSTOMERS()
        {
            this.MAS_CUSTOMER_CONTACTS = new HashSet<MAS_CUSTOMER_CONTACTS>();
            this.MAS_CUSTOMER_IP = new HashSet<MAS_CUSTOMER_IP>();
            this.MAS_CUSTOMER_LOCATIONS = new HashSet<MAS_CUSTOMER_LOCATIONS>();
            this.TRN_JOBS = new HashSet<TRN_JOBS>();
            this.TRN_JOBS1 = new HashSet<TRN_JOBS>();
        }
    
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string NameShort { get; set; }
        public string TaxID { get; set; }
        public short TypeID { get; set; }
        public byte GroupID { get; set; }
        public Nullable<byte> JuristicTypeID { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MemberID { get; set; }
        public Nullable<System.DateTime> RegisterDate { get; set; }
        public string Mobile { get; set; }
        public string Phone { get; set; }
        public string PhoneOtherOne { get; set; }
        public string PhoneOtherTwo { get; set; }
        public string PhoneOtherThree { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public Nullable<byte> Contact { get; set; }
        public Nullable<int> CategoryID { get; set; }
        public string Remark { get; set; }
        public string ReferCode01 { get; set; }
        public string ReferCode02 { get; set; }
        public string ReferCode03 { get; set; }
        public string ReferCode04 { get; set; }
        public string ReferCode05 { get; set; }
        public byte System_Flag { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MAS_CUSTOMER_CONTACTS> MAS_CUSTOMER_CONTACTS { get; set; }
        public virtual MAS_CUSTOMER_GROUPS MAS_CUSTOMER_GROUPS { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MAS_CUSTOMER_IP> MAS_CUSTOMER_IP { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MAS_CUSTOMER_LOCATIONS> MAS_CUSTOMER_LOCATIONS { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TRN_JOBS> TRN_JOBS { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TRN_JOBS> TRN_JOBS1 { get; set; }
    }
}