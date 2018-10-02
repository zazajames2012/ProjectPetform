using ARSoft.Claim.Model.BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DataModel
{
    // *** Update by : Nutthapaphon Sopradisth ***
    // *** Update Date : 08/10/2015 17:00  ***
    public class SupplierModel
    {       
        public virtual int ID { get; set; }
        public virtual string Code { get; set; }

        public virtual string Name { get; set; }
        public virtual string NameShort { get; set; }

        public virtual string TypeDesc { get; set; }

    }
    public class SupplierSearchModel : BaseSearchModel
    {
        public SupplierSearchModel()
        {
            this.Types = new List<int?>();
        }
        public virtual string SupplierName { get; set; }
        public virtual List<int?> Types { get; set; }

    }

    public class SuppliersSearchModel: BaseSearchModel
    {               
        public int ID { get; set; }
        public string SupplierCode { get; set; }
        public string SupplierName { get; set; }        
        public string TypeID { get; set; }        
        public byte Status { get; set; }       
    }

    public class SuppliersContactSearchModel : BaseSearchModel
    {
        public int ID { get; set; }
        public string SupplierCode { get; set; }      
        public string ContactName { get; set; }
        
        //public string TypeID { get; set; }
        //public byte Status { get; set; }
    }

    public class SuppliersModel : BaseSearchModel
    {        
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string NameShort { get; set; }
        public string TaxID { get; set; }
        public string ReferCode { get; set; }
        public byte TypeID { get; set; }
        public byte GroupID { get; set; }
        public string SupplierTypeName { get; set; }
        public string Address { get; set; }
        public string AddressOne { get; set; }
        public string AddressTwo { get; set; }
        public int? DistrictID { get; set; }
        public string DistrictName { get; set; }
        public int ProvinceID { get; set; }
        public string ProvinceName { get; set; }
        public string PostCode { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }        
        public string Website { get; set; }
        public string Remark { get; set; }
        public byte Status { get; set; }
        public string StatusName { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        //public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
    }

    public class SupplierContactsModel : BaseSearchModel
    {        
        public int Id { get; set; }
        public int SupplierID { get; set; }
        public int SupplierContactID { get; set; }
        public string SupplierCode { get; set; }
        public string SupplierName { get; set; } 
        public string FullName { get; set; }
        public string TitleName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailContact { get; set; }
        public string PhoneContact { get; set; }
        public string PhoneOtherOne { get; set; }
        public string PhoneOtherTwo { get; set; }
        public string PhoneOtheThree { get; set; }
        public byte TypeID { get; set; }
        public string ContactType { get; set; }
        public string Remark { get; set; }
        public byte Status { get; set; }
        public string StatusName { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
    }
}
