using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL
{
    public class ClassificationModel : BaseSearchModel
    {
        public int GroupID { get; set; }
        public int ID { get; set; }
        public int? ParentID { get; set; }
        public string ParentName { get; set; }
        public string SecondParentName { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string SubName { get; set; }
        public string WarehouseName { get; set; }
        public string Description { get; set; }
        public byte? Uses { get; set; }
        public string UsesName { get; set; }
        public byte Status { get; set; }
        public string StrStatus { get; set; }
        public string StrUses { get; set; }
        public string StatusName { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
