using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL
{
    public class SetupModel
    {
        public int MasterSetupId { get; set; }
        public int GroupId { get; set; }
        public string GroupType { get; set; }
        public string Value { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Remark { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public string CreateBy { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public string UpdateBy { get; set; }
    }
}
