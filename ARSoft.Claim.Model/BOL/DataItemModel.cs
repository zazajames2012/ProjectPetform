using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL
{
    public class DropdownModel
    {
        public virtual int ID { get; set; }
        public virtual string Name { get; set; }
        public virtual string Checked { get; set; }

    }
    public class TreeviewModel
    {
        public TreeviewModel()
        {
            this.Items = new List<TreeviewModel>();
        }

        public string Id { get; set; }
        public string Text { get; set; }
        public object RawData { get; set; }
        public List<TreeviewModel> Items { get; set; }
    }

    public class CheckboxDataItem
    {
        public int ID { get; set; }
        public string Value { get; set; }
        public string Text { get; set; }
        public bool Selected { get; set; }
        public bool IsDefaultSystem { get; set; }
    }
    public class CheckboxServiceReportItem
    {
        public int ID { get; set; }
        public string Value { get; set; }
        public string Text { get; set; }
        public List<int> Count { get; set; }
        public bool Selected { get; set; }
        public bool IsDefaultSystem { get; set; }
        public byte Type { get; set; }
        public int StatusJob { get; set; }

    }
    public class EnumDataItem
    {
        public int ID { get; set; }
        public string Value { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsDefaultSystem { get; set; }
    }

    public class DropdownDataItem
    {
        public int ID { get; set; }
        public string Value { get; set; }
        public string Text { get; set; }
        public bool Flag { get; set; }
        public int? ParentID { get; set; }
        public int? OtherID1 { get; set; }
    }

    public class SelectType
    {
        public int ID { get; set; }
        public string Value { get; set; }
        public string Text { get; set; }
        public string Description { get; set; }
    }

    public class AutoCompleteModel
    {
        public string Text { get; set; }
    }
}
