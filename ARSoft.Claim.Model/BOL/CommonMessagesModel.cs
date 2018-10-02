using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.BOL
{
    public class CommonMessagesModel
    {
        public virtual int ID { get; set; }
        public virtual string Code { get; set; }
        public virtual int MessageType { get; set; }
        public virtual string Description { get; set; }
    }
}
