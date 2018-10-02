using ARSoft.Claim.DAL.ErrorHandler;
using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ARSoft.Claim.DAL.Common
{
    public class CommonMessageDAL
    {
        public static string GetMessage(string code, string[] value)
        {
            var ctx = new CLAIMEntities();
            var ComMsg = new SYS_COMMON_MESSAGES();
            string msg = null;

            try
            {
                if (ctx.SYS_COMMON_MESSAGES.Where(c => c.Code == code).Count() == 0)
                {
                    msg = "No message elements.";
                }
                else
                {
                    ComMsg = ctx.SYS_COMMON_MESSAGES.Where(c => c.Code == code).First();

                    if (value == null ||
                        value.Count() <= 0 ||
                        (!Regex.IsMatch(ComMsg.Description, "{\\d{1}}") && !Regex.IsMatch(ComMsg.Description, "{\\d{2}}")) ||
                        (Regex.Matches(ComMsg.Description, "{\\d{1}}").Count + Regex.Matches(ComMsg.Description, "{\\d{2}}").Count != value.Count()))
                    {
                        msg = GetCleanMessage(ComMsg.Description);
                    }
                    else
                    {
                        msg = string.Format(GetCleanMessage(ComMsg.Description), value);
                    }
                }
            }
            catch (Exception ex)
            {
                var objErr = ErrorHandlerControlDAL.GetLastInnerError(ex);

                msg = objErr.Message;
            }

            return msg;
        }

        public static CommonMessagesModel GetMessageModel(string code, string[] value)
        {
            var ctx = new CLAIMEntities();
            var ComMsg = new SYS_COMMON_MESSAGES();
            var item = new CommonMessagesModel();

            try
            {
                if (ctx.SYS_COMMON_MESSAGES.Where(c => c.Code == code).Count() == 0)
                {
                    item.ID = 0;
                    item.Code = null;
                    item.MessageType = 0;
                    item.Description = "No message elements.";
                }
                else
                {
                    ComMsg = ctx.SYS_COMMON_MESSAGES.Where(c => c.Code == code).First();

                    item.ID = ComMsg.ID;
                    item.Code = ComMsg.Code;
                    item.MessageType = ComMsg.MessageType;

                    if (value == null ||
                        value.Count() <= 0 ||
                        (!Regex.IsMatch(ComMsg.Description, "{\\d{1}}") && !Regex.IsMatch(ComMsg.Description, "{\\d{2}}")) ||
                        (Regex.Matches(ComMsg.Description, "{\\d{1}}").Count + Regex.Matches(ComMsg.Description, "{\\d{2}}").Count != value.Count()))
                    {
                        item.Description = GetCleanMessage(ComMsg.Description);
                    }
                    else
                    {
                        item.Description = string.Format(GetCleanMessage(ComMsg.Description), value);
                    }
                }
            }
            catch (Exception ex)
            {
                var objErr = ErrorHandlerControlDAL.GetLastInnerError(ex);

                item.ID = 0;
                item.Code = null;
                item.MessageType = 0;
                item.Description = objErr.Message;
            }

            return item;
        }
        private static string GetCleanMessage(string oldMsg)
        {
            string newMsg = string.Empty;

            newMsg = oldMsg.Replace("\\n", "\n");

            return newMsg;
        }
        public static List<CommonMessagesModel> GetMessageAlertList()
        {
            var ctx = new CLAIMEntities();
            var list = new List<CommonMessagesModel>();

            try
            {
                var ComMsg = ctx.SYS_COMMON_MESSAGES.Where(c => c.MessageType == 2 || c.MessageType == 3).ToList();

                foreach (var row in ComMsg)
                {
                    var item = new CommonMessagesModel();
                    item.ID = row.ID;
                    item.Code = row.Code;
                    item.MessageType = row.MessageType;
                    item.Description = GetCleanMessage(row.Description);

                    list.Add(item);
                }
            }
            catch (Exception ex)
            {
                var objErr = ErrorHandlerControlDAL.GetLastInnerError(ex);
            }

            return list;
        }
    }
}
