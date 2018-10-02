using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DataModel
{
    public class GenDocumentNumberModel
    {
        public byte PatternID { get; set; }
        public string GenCode { get; set; }
        public string TableName { get; set; }
        public string FieldName { get; set; }
        public string GenString1 { get; set; }
        public string GenString2 { get; set; }
        public string GenString3 { get; set; }
        public int? GenID1 { get; set; }
        public int? GenID2 { get; set; }
        public int? GenID3 { get; set; }
    }
}
