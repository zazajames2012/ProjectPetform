using ARSoft.Claim.Model.BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DataModel
{
    public class OrganizationModel
    {
        public int ID { get; set; }
        public Nullable<int> ParentID { get; set; } 
        public string ParentName { get; set; }  
        public string Code { get; set; }
        public string Name { get; set; } 
        public string ShortName { get; set; }
        public byte Levels { get; set; } 
        public string LevelsText { get; set; }
        public bool TechnicalJob { get; set; }
        public byte Status { get; set; } 
        public string StatusText { get; set; }   
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }  
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; } 
        public List<OrganizationModel> OrganizationUnderOrg { get; set; }
        public List<EmployeeModel> EmployeeUnderOrg { get; set; } 
       
    }

    public class SectionModel: BaseSearchModel
    {        
        public int ID { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
    }
}
