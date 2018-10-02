using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL
{
    public class PermissionModel
    {
        public PermissionModel()
        {

        }

        public int ID { get; set; }
        public string CAPTION { get; set; }
        public string FunctionCaption { get; set; }
        public string FunctionCode { get; set; }
        public string URL { get; set; }
        public byte LEVELS { get; set; }
        public Nullable<short> SCREENSEQUENCE { get; set; }
        public Nullable<bool> Search { get; set; }
        public Nullable<bool> Add { get; set; }
        public Nullable<bool> Edit { get; set; }
        public Nullable<bool> Delete { get; set; }
        public Nullable<bool> View { get; set; }


    }
}
