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
    
    public partial class SYS_DISTRICTS
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SYS_DISTRICTS()
        {
            this.MAS_CUSTOMER_LOCATIONS = new HashSet<MAS_CUSTOMER_LOCATIONS>();
            this.MAS_SUPPLIERS = new HashSet<MAS_SUPPLIERS>();
            this.TRN_JOBS = new HashSet<TRN_JOBS>();
        }
    
        public int ID { get; set; }
        public string Name { get; set; }
        public string NameOther { get; set; }
        public short ProvinceID { get; set; }
        public string PostCode { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MAS_CUSTOMER_LOCATIONS> MAS_CUSTOMER_LOCATIONS { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MAS_SUPPLIERS> MAS_SUPPLIERS { get; set; }
        public virtual SYS_PROVINCES SYS_PROVINCES { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TRN_JOBS> TRN_JOBS { get; set; }
    }
}
