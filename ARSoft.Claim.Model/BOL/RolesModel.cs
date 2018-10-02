using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL
{
    public class RolesModel : BaseSearchModel
    {
        public int ID { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
        public bool Admin { get; set; }
        public string AdminStatus { get; set; }
        public byte Status { get; set; }
        public string StatusName { get; set; }
        public string StrStatus { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
