using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL
{
    public abstract class BaseSearchModel
    {
        public long? RowNumber { get; set; }
        public int? RecordCount { get; set; }
        public virtual int? Page { get; set; }
        public virtual int? PageSize { get; set; }
        public bool IsSearch { get; set; }
    }
}
