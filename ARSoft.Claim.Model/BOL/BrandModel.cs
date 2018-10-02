using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.Enumeration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DataModel
{
    public class BrandModel : BaseSearchModel
    {
        public int ID;
        public string Name;
        public string Description;
        public string BrandWebSite;
        public string SupportWebSite;
        public byte StandardTAT;
        public byte TATFixingUnit;
        public int TATFixingComputeID;
        public byte Status;
        public string StatusText;
        public int CreatedBy;
        public DateTime CreatedDate;
        public int UpdatedBy;
        public DateTime UpdatedDate; 
    }

    public class BrandSearchModel : BaseSearchModel
    {
        public string BrandName;
        public bool IsAvtive;
        public bool IsInactive;
    }

    public class BrandSlaModel : BaseSearchModel
    {  
        public int ID;
        public int BrandID;
        public string BrandName;
        public int ProductID;
        public string ProductName;
        public Nullable<int> ModelID; 
        public string ModelName;
        public bool HolidayIncluded;
        public Nullable<int> ServicesCalendarID;
        public string ServicesCalendarText; 
        public byte TATFixing; 
        public SLAUnitEnum TATFixingUnit; 
        public string TATFixingText; 
        public int TATFixingComputeID;
        public int TATFixingComputeText;
        public int CreatedBy;
        public DateTime CreatedDate;
        public int UpdatedBy;
        public DateTime UpdatedDate; 
    }
     

}
