using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL
{
    public class SysProvinceModel
    {
        public short ID { get; set; }
        public string Name { get; set; }
        public string NameShort { get; set; }
        public string NameOther { get; set; }
        public string PostCode { get; set; }
        public Nullable<byte> RegionID { get; set; }
    }
}
