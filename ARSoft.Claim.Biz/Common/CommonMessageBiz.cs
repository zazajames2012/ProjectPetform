using ARSoft.Claim.DAL.Common;
using ARSoft.Claim.Model.BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Biz.Common
{
    public class CommonMessageBiz
    {
        public static string GetMessage(string code, string[] value)
        {
            return CommonMessageDAL.GetMessage(code, value);
        }

        public static CommonMessagesModel GetMessageModel(string code, string[] value)
        {
            return CommonMessageDAL.GetMessageModel(code, value);
        }
    }
}
