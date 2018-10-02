using ARSoft.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Arsoft.Utility
{
    public class EmailUtility
    {
        public string smtp_hostname { get; set; }
        public int smtp_port { get; set; }
        public string smtp_network_credential_emailname { get; set; }
        public string smtp_network_credential_user { get; set; }
        public string smtp_network_credential_password { get; set; }
        public string smtp_subject { get; set; }
        public List<string> smtp_to_email { get; set; }
        public List<string> smtp_cc_email { get; set; }
        public StringBuilder smtp_body { get; set; }
        public bool smtp_IsBodyHtml { get; set; }

        public bool SendEmailUtility()
        {
            try
            {

                SmtpClient smtp = new SmtpClient
                {
                    Host = smtp_hostname,
                    Port = smtp_port,
                    UseDefaultCredentials = false,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Credentials = new NetworkCredential(smtp_network_credential_user, smtp_network_credential_password),
                    EnableSsl = false,
                    Timeout = 10000
                };

                MailMessage message = new MailMessage();
                message.BodyEncoding = Encoding.UTF8;
                message.Body = smtp_body.ToString();
                message.Subject = smtp_subject;
                message.Priority = MailPriority.High;
                foreach (string item in smtp_to_email)
                {
                    message.To.Add(item);
                }
                foreach (string item in smtp_to_email)
                {
                    message.CC.Add(item);
                }
                message.From = new MailAddress(smtp_network_credential_user, smtp_network_credential_emailname, Encoding.UTF8);
                message.IsBodyHtml = smtp_IsBodyHtml;
                smtp.Send(message);
                return true;
            }
            catch (Exception ex)
            {
                LogFiles.WriteToLog("EmailUtility", "SendEmailUtility", ex.StackTrace + "   \n" + ex.StackTrace);
                return false;
            }
        }
    }
}
