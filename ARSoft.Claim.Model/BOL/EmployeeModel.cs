// *** Update by : Pongthorn Paemanee ***
// *** Update Date : 02/10/2015 17:00  ***

using ARSoft.Claim.Model.BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DataModel
{
    public class EmployeeModel
    {
        public virtual int ID { get; set; }
        public virtual string Code { get; set; }
        public virtual string Name { get; set; }
        public virtual string Email { get; set; }
        public virtual string Position { get; set; }
        public virtual string Section { get; set; }
        public virtual string Status { get; set; }
        public virtual string Phone { get; set; }
        public virtual string Mobile { get; set; }

        public virtual int SectionID { get; set; }
    }
    public class MasterEmployeeModel : BaseSearchModel
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public byte TitleID { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string NickName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string ExtensionNumber { get; set; }
        public string Phone { get; set; }
        public int PositionID { get; set; }
        public byte Status { get; set; }
        public string StatusName { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public string PosCode { get; set; }
        public string PosName { get; set; }
        public string PosShortName { get; set; }
        public byte PosLevels { get; set; }
        public Nullable<int> DepOrgID { get; set; }
        public string DepOrgCode { get; set; }
        public string DepOrgName { get; set; }
        public string DepOrgShortName { get; set; }
        public Nullable<int> SecOrgID { get; set; }
        public string SecOrgCode { get; set; }
        public string SecOrgName { get; set; }
        public string SecOrgShortName { get; set; }
        public Nullable<int> CompOrgID { get; set; }
        public Nullable<int> SectorOrgID { get; set; }
        public string StrBuID { get; set; }
        public string StrID { get; set; }
        public string EmployeeLatitude { get; set; }
        public string EmployeeLongitude { get; set; }
        public Nullable<System.DateTime> EmployeeLatLngUpdate { get; set; }
        public string FCM_RegistrationID { get; set; }
    }
    public class EmployeeSearchModel : BaseSearchModel
    {
        //public virtual int? Department { get; set; }
        //public virtual int? Position { get; set; }
        //public virtual int? Section { get; set; }
        //public virtual string Name { get; set; }

        public int ID { get; set; }
        public string Code { get; set; }
        public byte TitleID { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string NickName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Phone { get; set; }
        public int PositionID { get; set; }
        public byte Status { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public string PosCode { get; set; }
        public string PosName { get; set; }
        public string PosShortName { get; set; }
        public byte PosLevels { get; set; }
        public Nullable<int> DepOrgID { get; set; }
        public string DepOrgCode { get; set; }
        public string DepOrgName { get; set; }
        public string DepOrgShortName { get; set; }
        public Nullable<int> SecOrgID { get; set; }
        public string SecOrgCode { get; set; }
        public string SecOrgName { get; set; }
        public string SecOrgShortName { get; set; }
        public Nullable<int> BuID { get; set; }
        public int EngineerUserID { get; set; }

    }

    public class EmployeeExcelModel
    {
        public string Emp { get; set; }
        public string Prefix { get; set; }
        public string Name_T { get; set; }
        public string Surn_T { get; set; }
        public string Name_E { get; set; }
        public string Surn_E { get; set; }
        public string Email { get; set; }
        public string Pos { get; set; }
        public string Sec { get; set; }
        public string Dpt { get; set; }
        public string Div { get; set; }
        public string Company { get; set; }
        public string RoleSam { get; set; }
        public string RoleInv { get; set; }
        public string BU { get; set; }
        public string Username { get; set; }
    }

    public class EmployeeExportExcelManagementModel
    {
        public string FileName { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public List<EmployeeExcelModel> EmployeeList { get; set; }
        public bool Result { get; set; }
        public byte InsertCount { get; set; }
        public byte UpdateCount { get; set; }
        public byte FailCount { get; set; }
        public byte TotalCount { get; set; }
        public string ExceptionMSG { get; set; }
    }
}
