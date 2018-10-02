using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Net.Mail;
using System.Web.Hosting;
using System.IO;
using System.Text;
using System.Net;
using RazorEngine.Templating;
using RazorEngine.Configuration;
using RazorEngine;

namespace ARSoft.Utility
{
    public class EmailManager
    {
        #region Fields

        /// <summary>
        /// The from address of the email .
        /// </summary>
        private readonly string mailFromAddress;

        /// <summary>
        /// The from Name of the email .
        /// </summary>
        private readonly string mailFromName;

        /// <summary>
        /// The SMTP server address.
        /// </summary>
        private readonly string smtpServer;

        private int smtp_Port;

        private readonly string smtp_network_credential_user;

        private readonly string smtp_network_credential_password;



        #endregion

        #region Constructors and Destructors

        /// <summary>
        /// Initialises a new instance of the <see cref="EmailManager"/> class.
        /// </summary>
        public EmailManager()
        {


            // Load Mail Settings from Web.Config
            //this.smtpServer = ConfigurationManager.AppSettings["SmtpServer"] ?? "127.0.0.1";
            this.smtpServer = ConfigurationManager.AppSettings["SmtpServer"] ?? "mail.iii.in.th";

            this.mailFromName = ConfigurationManager.AppSettings["MailFromName"] ?? "Service Force team";
            this.mailFromAddress = ConfigurationManager.AppSettings["MailFromAddress"] ?? "pattanawit.g@gmail.com";

            smtp_network_credential_user = "arissupport@iii.in.th";
            smtp_network_credential_password = "hcant2bD3";

            //this.testSmtpServer = ConfigurationManager.AppSettings["TestSmtpServer"] ?? "127.0.0.1";
            //this.testMailFromAddress = ConfigurationManager.AppSettings["TestMailFromAddress"] ?? "donotreply@ar.co.th";
            //this.testMailToAddress = ConfigurationManager.AppSettings["TestMailToAddress"] ?? "pattanawitw@ar.co.th";
        }

        public EmailManager(EmailSettingModel email_setting)
        {
            if (email_setting == null)
            {
                throw new Exception("Not found email setting in the database.");
            }
            smtpServer = email_setting.es_mail_server;

            mailFromName = email_setting.es_mail_from_name;
            mailFromAddress = email_setting.es_mail_from_address;

            smtp_Port = email_setting.es_mail_port;
            smtp_network_credential_user = email_setting.es_mail_username;
            smtp_network_credential_password = email_setting.es_mail_password;
        }

        #endregion

        #region Public Methods and Operators


        public void SendMail(List<string> toAddress, string subject, string templateName, dynamic emailModelData, string appointment, string template)
        {
            this.SendMail(toAddress, subject, templateName, emailModelData, this.mailFromAddress, this.mailFromName, appointment, template);
        }


        public void SendMail(List<string> toAddress, string subject, string templateName, dynamic emailModelData, string fromAddress, string fromName, string appointment, string template)
        {

            var mac = new MailAddressCollection { };
            foreach (var item in toAddress)
            {
                if (EmailIsValid(item))
                {
                    mac.Add(item);
                }
            }

            if (String.IsNullOrEmpty(fromName))
            {
                fromName = this.mailFromName;
            }
            if (mac.Count()>0)
            {
                this.SendMail(mac, subject, templateName, emailModelData, new MailAddress(fromAddress, fromName), null, appointment, template);
            }
            

        }


        public void SendMail(MailAddressCollection toAddresses, string subject, string templateName, dynamic emailModelData, MailAddress fromAddress, IEnumerable<string> attachments, string appointment, string template)
        {
            startSendMail(toAddresses, subject, templateName, emailModelData, fromAddress, attachments, appointment, template);
        }

        private void startSendMail(MailAddressCollection toAddresses, string subject, string templateName, dynamic emailModelData, MailAddress fromAddress, IEnumerable<string> attachments, string appointment, string template)
        {

            var mm = new MailMessage();
            try
            {
                if (fromAddress == null)
                {
                    fromAddress = new MailAddress(this.mailFromAddress, this.mailFromName);
                }

                mm.IsBodyHtml = true;
                mm.Priority = MailPriority.Normal;
                mm.Subject = subject;
                mm.HeadersEncoding = System.Text.Encoding.UTF8;
                mm.SubjectEncoding = System.Text.Encoding.UTF8;

                //string path = HostingEnvironment.MapPath(@"\Email\" + templateName + ".cshtml");
                //if (path != null)
                //{
                //    //string template = File.ReadAllText(path, System.Text.Encoding.Default);
                //    //mm.BodyEncoding = Encoding.UTF8;
                //    //string template = File.ReadAllText(path, System.Text.Encoding.Default);
                //    InitializeRazor();

                //    mm.Body = RazorEngine.Razor.Parse(template, emailModelData, Guid.NewGuid().ToString());
                //    //mm.Body = RazorEngine.Razor.Parse(template);

                //}

                InitializeRazor();
                mm.Body = RazorEngine.Razor.Parse(template, emailModelData);

                SmtpClient smtp = null;

                mm.From = fromAddress;
                foreach (MailAddress toAddress in toAddresses)
                {
                    mm.To.Add(toAddress);
                }

                smtp = new SmtpClient
                {
                    Host = smtpServer,
                    Port = smtp_Port,
                    UseDefaultCredentials = false,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    //Credentials = new NetworkCredential(smtp_network_credential_user, smtp_network_credential_password),
                    EnableSsl = false,
                    Timeout = 10000
                };

                if (string.IsNullOrEmpty(smtp_network_credential_user) == false)
                {
                    smtp.Credentials = new NetworkCredential(smtp_network_credential_user, smtp_network_credential_password);
                }


                //smtp = new SmtpClient(this.smtpServer);


                if (attachments != null)
                {
                    foreach (string attachment in attachments)
                    {
                        mm.Attachments.Add(new Attachment(attachment));
                    }
                }

                if (!string.IsNullOrEmpty(appointment))
                {
                    mm.Attachments.Add(new Attachment(appointment, new System.Net.Mime.ContentType("text/calendar")));
                }

                smtp.Send(mm);
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                mm.Dispose();
            }
        }

        private static void InitializeRazor()
        {
            //if (_razorInitialized) return;
            //_razorInitialized = true;
            Razor.SetTemplateService(CreateTemplateService());
        }

        private static ITemplateService CreateTemplateService()
        {
            var config = new TemplateServiceConfiguration
            {
                BaseTemplateType = typeof(HtmlTemplateBase<>),
            };
            return new TemplateService(config);
        }

        public bool EmailIsValid(string emailaddress)
        {
            try
            {
                MailAddress m = new MailAddress(emailaddress);

                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }

        #endregion
    }

    public class EmailSettingModel
    {
        public short es_id { get; set; }
        public string es_mail_server { get; set; }
        public short es_mail_port { get; set; }
        public string es_mail_username { get; set; }
        public string es_mail_password { get; set; }
        public Nullable<bool> es_mail_require_authen { get; set; }
        public Nullable<bool> es_mail_use_ssl { get; set; }
        public string es_mail_from_address { get; set; }
        public string es_mail_from_name { get; set; }
        public Nullable<byte> active_flag { get; set; }
        public Nullable<int> update_by { get; set; }
        public Nullable<System.DateTime> update_date { get; set; }
    }
}