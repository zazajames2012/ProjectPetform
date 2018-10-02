using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL
{
    public class DocControlModel
    {
        public int GroupId { get; set; }
        public string GroupType { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public string CreateBy { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<int> ParentGroupId { get; set; }
    }

    public class DocControlModel2
    {
        public string GroupId { get; set; }
        public string GroupType { get; set; }
        public string RunningNo { get; set; }
        public string CreateDate { get; set; }
        public string CreateBy { get; set; }
        public string UpdateDate { get; set; }
        public string UpdateBy { get; set; }
        public string ParentGroupdId { get; set; }
    }

    public class DllDocControlModel
    {
        public int GroupId { get; set; }
        public string GroupType { get; set; }
    }
}
