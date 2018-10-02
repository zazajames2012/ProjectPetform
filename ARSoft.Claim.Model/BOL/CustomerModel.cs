// *** Update by : Pongthorn Paemanee ***
// *** Update Date : 07/10/2015 13:30  ***

using ARSoft.Claim.Model.BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DataModel
{
    public class CustomerModel
    {
        public virtual int ID { get; set; }
        public virtual string Code { get; set; }
        public virtual string Name { get; set; }
        public virtual int? TypeID { get; set; }
        public virtual string TypeDesc { get; set; }
    }
    public class MasterCustomerModel : BaseSearchModel
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string NameShort { get; set; }
        public string TaxID { get; set; }
        public short TypeID { get; set; }
        public byte GroupID { get; set; }
        public byte? JuristicTypeID { get; set; }
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
        public byte Status { get; set; }
        public string ReferCode01 { get; set; }
        public string ReferCode02 { get; set; }
        public string ReferCode03 { get; set; }
        public string ReferCode04 { get; set; }
        public string ReferCode05 { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public string LOC_Name { get; set; }
        public string AddressLineOne { get; set; }
        public string AddressLineTwo { get; set; }
        public string LOC_PostCode { get; set; }
        public string LOC_Phone { get; set; }
        public string LOC_Fax { get; set; }
        public Nullable<int> DIST_ID { get; set; }
        public string DIST_Name { get; set; }
        public Nullable<short> PROV_ID { get; set; }
        public string PROV_Name { get; set; }
        public Nullable<int> CusLocID { get; set; }
        public string Address { get; set; }
        public string TypeName { get; set; }
        public string StatusName { get; set; }
        public string strTypeID { get; set; }
        public string strRegisterDate { get; set; }
        public string CategoryName { get; set; }
        public string GroupName { get; set; }
        public bool IsNextPage { get; set; }
    }
    public class CustomerSearchModel : BaseSearchModel
    {
        public virtual string Name { get; set; }
        public virtual List<int> Types { get; set; }
    }

    public class CustomersSearchModel : BaseSearchModel
    {              
        public int CustomerID { get; set; }
        public Nullable<int> LocationID { get; set; }
        public Nullable<int> ContactID { get; set; }
        public short TypeID { get; set; }
        public string CustomerCode { get; set; }
        public string CustomerName { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public short CustomerTypeID { get; set; }
        public string StrCustomerTypeID { get; set; }
        public byte CustomerGroupID { get; set; }
        public byte? JuristicTypeID { get; set; }
        public string CustomerTypeIDString { get; set; }
        public string CustomerTypeName { get; set; }
        public byte Status { get; set; }
        public string TaxID { get; set; }
        public string CusName { get; set; }
        public string CusEmail { get; set; }
        public string CusMobile { get; set; }
        public string CusPhone { get; set; }
        public string CusPhoneOtherOne { get; set; }
        public string LocationName { get; set; }
        public string Address { get; set; }
        public string AddressLineOne { get; set; }
        public string AddressLineTwo { get; set; }
        public string PostCode { get; set; }
        public Nullable<int> DistrictID { get; set; }
        public string DistrictName { get; set; }
        public Nullable<short> ProvinceID { get; set; }
        public string ProvinceName { get; set; }
        public string ContactName { get; set; }
        public string ContactTitleName { get; set; }
        public string ContactFirstName { get; set; }
        public string ContactLastName { get; set; }
        public string ContactPhoneOtherTwo { get; set; }
        public string ContactPhone { get; set; }
        public string ContactPhoneOtherOne { get; set; }
        public string ContactEmail { get; set; }
        public Nullable<int> ZoneID { get; set; }
        public string MemberID { get; set; }
        public string CustomerGroupName { get; set; }
        public string ZoneName { get; set; }
    }

    public class CustomersContactSearchModel : BaseSearchModel
    {        
        public int CustomerID { get; set; }
        public string CustomerCode { get; set; }
        public int ContactID { get; set; }
        public string CustomerName { get; set; }   
        public string ContactName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Status { get; set; }
        public string MobilePhone { get; set; }
        public string Fax { get; set; }
        public string LocationName { get; set; }
    }

    public class CustomerGroupModel
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public byte? LaborCost { get; set; }
        public byte Status { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
    }

}
