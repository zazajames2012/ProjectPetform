using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL
{
    public class MenuModel
    {
        public int ID { get; set; }
        public string Caption { get; set; }
        public string FunctionCaption { get; set; }
        public int Levels { get; set; }
        public int ScreenSequence { get; set; }
        public string FunctionCode { get; set; }
        public int ParentID { get; set; }
        public string URL { get; set; }
        public string API { get; set; }
        public int MasterID { get; set; }
        public string IconName { get; set; }
        public bool Allow { get; set; }
        public int? CurrentPage { get; set; }
        public int? CurrentParent { get; set; }
        public string CurrentUrl { get; set; }
    }
}
