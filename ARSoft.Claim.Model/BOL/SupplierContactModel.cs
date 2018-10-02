using ARSoft.Claim.Model.BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DataModel
{
    public class SupplierContactModel
    {
        public SupplierContactModel()
        {

        }
        public virtual int ID { get; set; }
        public virtual string Name { get; set; }
        public virtual string Phone { get; set; }
        public virtual string Email { get; set; }
        public virtual string StatusDesc { get; set; }
    }
    public class SupplierContactSearchModel : BaseSearchModel
    {
        public SupplierContactSearchModel()
        {

        }
        public virtual string SupplierCode { get; set; }
        public virtual string SupplierName { get; set; }
        public virtual string ContactName { get; set; }
    }
}
