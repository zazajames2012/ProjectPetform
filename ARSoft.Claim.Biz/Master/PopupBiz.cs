
using ARSoft.Claim.DAL.Master;
using ARSoft.Claim.Model.BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Biz.Master
{
    public class PopupBiz
    {
        private PopupDAL objDAL;
        public PopupBiz()
        {
            objDAL = new PopupDAL();
        } 
    }
}
