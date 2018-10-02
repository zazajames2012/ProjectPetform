using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL
{
    public class SysDistinctModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string NameOther { get; set; }
        public short ProvinceID { get; set; }
        public string PostCode { get; set; }
    }
}
