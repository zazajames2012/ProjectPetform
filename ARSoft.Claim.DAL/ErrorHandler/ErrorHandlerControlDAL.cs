using ARSoft.Claim.Model.EntityFramework;
using ARSoft.Claim.Model.Enumeration;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DAL.ErrorHandler
{
    public class ErrorHandlerControlDAL
    {
        private CLAIMEntities ctx = new CLAIMEntities();

        public bool EnableDBLog = true;

        public bool EnableFileLog = true;

        public string TextLogDirectory = "C:\\newAKOWLog";

        public string LogPrefix = "newAKOW";

        public string ProjectName = "NewAKOW";

        public void WriteLog(Exception ex)
        {
            TRX_ERROR_LOG errorLogEntity = ConvertToErrorLogEntity(ex);
            errorLogEntity.ErrorDate = DateTime.Now;

            if (EnableDBLog)
            {
                WriteDBLog(errorLogEntity);
            }

            if (EnableFileLog)
            {
                WriteFileLog(errorLogEntity);
            }
        }

        public void WriteLog(string Message)
        {
            if (EnableDBLog)
            {
                WriteDBLog(Message);
            }

            if (EnableFileLog)
            {
                WriteFileLog(Message);
            }
        }

        public void WriteDBLog(TRX_ERROR_LOG errorLogEntity)
        {
            try
            {
                ctx.TRX_ERROR_LOG.Add(errorLogEntity);
                ctx.SaveChanges();
            }
            catch
            {

            }
        }
        public void ReverseLogs(string Username, string Message)
        {
            try
            {
                DirectoryInfo dirInfo;
                string path = "~/Logs/" + DateTime.Today.ToString("dd-MM-yy") + ".txt";
                dirInfo = new DirectoryInfo(System.Web.HttpContext.Current.Server.MapPath("~/Logs"));

                if (!dirInfo.Exists)
                {
                    dirInfo.Create();
                }

                if (!File.Exists(System.Web.HttpContext.Current.Server.MapPath(path)))
                {
                    File.Create(System.Web.HttpContext.Current.Server.MapPath(path)).Close();
                }

                using (StreamWriter w = File.AppendText(System.Web.HttpContext.Current.Server.MapPath(path)))
                {
                    w.WriteLine("Event Time : {0} ,username : {1}, action : {2}", DateTime.Now.ToString(CultureInfo.InvariantCulture), Username, Message);
                    w.WriteLine("________________________________________________________");
                    w.Flush();
                    w.Close();
                }
            }
            catch (Exception e)
            {
            }
        }

        public void DeleteJobLogs(string JobID, string ReferenceCode, string JobDate, int Days)
        {
            try
            {
                DirectoryInfo dirInfo;
                string path = "~/Logs/" + DateTime.Today.ToString("dd-MM-yy") + ".txt";
                dirInfo = new DirectoryInfo(System.Web.HttpContext.Current.Server.MapPath("~/Logs"));

                if (!dirInfo.Exists)
                {
                    dirInfo.Create();
                }

                if (!File.Exists(System.Web.HttpContext.Current.Server.MapPath(path)))
                {
                    File.Create(System.Web.HttpContext.Current.Server.MapPath(path)).Close();
                }

                using (StreamWriter w = File.AppendText(System.Web.HttpContext.Current.Server.MapPath(path)))
                {
                    w.WriteLine("Event Time : {0} ,JobID : {1},ReferenceCode : {2}, JobCreated : {3}, Condition Days  : {4}", DateTime.Now.ToString(CultureInfo.InvariantCulture), JobID, JobDate, Days.ToString());
                    w.WriteLine("________________________________________________________");
                    w.Flush();
                    w.Close();
                }
            }
            catch (Exception e)
            {
            }
        }

        public void WriteFileLog(TRX_ERROR_LOG errorLogEntity)
        {
            try
            {
                if (!Directory.Exists(TextLogDirectory))
                {
                    Directory.CreateDirectory(TextLogDirectory);
                }

                string logpath = TodayLogFile();
                string allMessage = ReadTextFile(logpath);
                string newLog;
                newLog = errorLogEntity.ErrorDate.Value.ToString("yyyy-MM-dd HH:mm:ss", System.Globalization.CultureInfo.GetCultureInfo("en-us")) + "\r\n";
                newLog += "ProjectName: " + errorLogEntity.ProjectName + "\r\n";
                newLog += "ErrorType: " + errorLogEntity.ErrorType + "\r\n";
                newLog += "ErrorMessage: " + errorLogEntity.ErrorMessage + "\r\n";
                newLog += "Module: " + errorLogEntity.Module + "\r\n";
                newLog += "ExceptionString: " + errorLogEntity.ExceptionString + "\r\n";
                newLog += "StackTrace: " + errorLogEntity.StackTrace + "\r\n";
                newLog += "----------------------------------------------------------------------\r\n";
                allMessage += newLog;
                WriteTextFile(logpath, allMessage);
            }
            catch
            {

            }
        }

        public string GetErrorJsonString(Exception ex)
        {
            TRX_ERROR_LOG errorLogEntity = ConvertToErrorLogEntity(ex);
            string jsonString;
            jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(errorLogEntity);
            return jsonString;
        }

        public string GetErrorJsonString(TRX_ERROR_LOG errorLogEntity)
        {
            string jsonString;
            jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(errorLogEntity);
            return jsonString;
        }

        public void WriteFileLog(string Message)
        {
            try
            {
                if (!Directory.Exists(TextLogDirectory))
                {
                    Directory.CreateDirectory(TextLogDirectory);
                }

                string logpath = TodayLogFile();
                string allMessage = ReadTextFile(logpath);
                string newLog;
                newLog = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss", System.Globalization.CultureInfo.GetCultureInfo("en-us")) + "\r\n";
                newLog += "ErrorMessage: " + Message + "\r\n";
                newLog += "----------------------------------------------------------------------\r\n";
                allMessage += newLog;
                WriteTextFile(logpath, allMessage);
            }
            catch
            {

            }
        }

        public void WriteDBLog(string Message)
        {
            try
            {
                TRX_ERROR_LOG errorLogEntity = new TRX_ERROR_LOG();
                errorLogEntity.ProjectName = this.ProjectName;
                errorLogEntity.ErrorType = "Info";
                errorLogEntity.ErrorMessage = Message;
                errorLogEntity.Module = "-";
                errorLogEntity.ExceptionString = Message;
                errorLogEntity.ErrorDate = DateTime.Now;
                ctx.TRX_ERROR_LOG.Add(errorLogEntity);
                ctx.SaveChanges();
            }
            catch
            {

            }
        }

        public bool IsDBDuplicateDataException(Exception ex)
        {
            if (ex.ToString().ToLower().IndexOf("violation of unique key constraint") != -1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }


        public TRX_ERROR_LOG ConvertToErrorLogEntity(Exception ex)
        {
            TRX_ERROR_LOG errorLogEntity = new TRX_ERROR_LOG();
            //ex.
            errorLogEntity.ProjectName = this.ProjectName;
            errorLogEntity.ErrorType = ex.GetType().ToString();
            errorLogEntity.ErrorMessage = ex.Message;
            errorLogEntity.Module = GetModuleException(ex);
            errorLogEntity.ExceptionString = ex.ToString();
            errorLogEntity.StackTrace = ex.StackTrace;
            errorLogEntity.ErrorDate = DateTime.Now;

            return errorLogEntity;
        }

        private string GetModuleException(Exception ex)
        {
            try
            {
                string moduleName = ex.ToString();
                moduleName = moduleName.Split('\r')[1].Trim().Split(' ')[1];
                return moduleName;
            }
            catch (Exception ex2)
            {
                return "Unspecified";
            }

        }

        public string TodayLogFile()
        {
            string fuullogpath = TextLogDirectory + "\\";
            fuullogpath = fuullogpath.Replace("\\\\", "\\");
            fuullogpath += LogPrefix + DateTime.Now.ToString("_yyyyMMdd", System.Globalization.CultureInfo.GetCultureInfo("en-us")); ;
            fuullogpath += ".log";
            return fuullogpath;
        }

        public static string ReadTextFile(string filepath)
        {
            try
            {
                using (StreamReader sr = new StreamReader(filepath, Encoding.GetEncoding(874)))
                {
                    string returnValue = sr.ReadToEnd();
                    return returnValue;
                }
            }
            catch (Exception ex)
            {
                return string.Empty;
            }
        }

        public static void WriteTextFile(string filepath, string data)
        {
            try
            {
                using (StreamWriter sw = new StreamWriter(filepath))
                {
                    sw.Write(data);
                }
            }
            catch (Exception ex)
            {

            }
        }

        public static string GetErrorMessage(Exception pErrObj)
        {
            string msg = string.Empty;
            var errObj = pErrObj;

            while (errObj.InnerException != null)
            {
                var err = errObj.InnerException;
                errObj = err;
            }

            msg = errObj.Message;

            return msg;
        }
        public static Exception GetLastInnerError(Exception pErrObj)
        {
            var errObj = pErrObj;

            while (errObj.InnerException != null)
            {
                var err = errObj.InnerException;
                errObj = err;
            }

            return errObj;
        }
        public static Hashtable HashTableException(Exception pErrObj)
        {

            //string msg = string.Empty;
            //var errObj = pErrObj;
            //var w32ex = pErrObj as Win32Exception;
            ////while (errObj.InnerException != null)
            ////{
            ////    var err = errObj.InnerException;
            ////    errObj = err;

            ////}
            //int code = 0;
            //string errMsg = "";
            //if (w32ex == null)
            //{
            //    w32ex = pErrObj.InnerException as Win32Exception;
            //}
            //if (w32ex != null)
            //{
            //    code = w32ex.ErrorCode;
            //    errMsg = w32ex.Message;

            //    // do stuff
            //}


            //switch (code)
            //{
            //    case 111: msg = "ไม่สามารถลบข้อมูลได้เนื่องจากมีการใช้งานข้อมูลอยู่ในระบบ"; break;
            //    case 222: msg = "ไม่สามารถลบข้อมูลได้เนื่องจากไม่พบข้อมูลดังกล่าว"; break;
            //    case 333: msg = "ไม่สามารถลบข้อมูลได้เนื่องจากมีการใช้งานข้อมูลอยู่ในระบบ"; break;
            //    default: msg = "ไม่สามารถลบข้อมูลได้ เนื่องจาก " + errMsg; break;
            //}
            string msg = string.Empty;
            var errObj = pErrObj;

            while (errObj.InnerException != null)
            {
                var err = errObj.InnerException;
                errObj = err;
            }
            string errMsg = errObj.Message;


            if (errMsg.Contains("REFERENCE constraint") && errMsg.Contains("FK_"))
            {
                msg = "ไม่สามารถลบข้อมูลได้เนื่องจากมีการใช้งานข้อมูลอยู่ในระบบ";
            }
            else if (errMsg.Contains("Value cannot be null"))
            {
                msg = "ไม่สามารถลบข้อมูลได้เนื่องจากไม่พบข้อมูลดังกล่าว";

            }
            else if (errMsg.Contains("Violation of primary key"))
            {
                msg = "ไม่สามารถเพิ่มข้อมูลได้เนื่องจากรหัส PK มีใช้แล้วในระบบ";

            }
            else
            {
                msg = "ไม่สามารถลบข้อมูลได้ เนื่องจาก " + errMsg;
            }
            Hashtable hashtable = new Hashtable();

            hashtable.Add("Successfully", false);
            hashtable.Add("Data", null);
            hashtable.Add("Message", msg);
            hashtable.Add("ResultType", (int)RESULT_TYPE.InternalException);

            return hashtable;
        }

        public static Hashtable HashTableException(Exception pErrObj, string ObjectName)
        {
            string msg = string.Empty;
            var errObj = pErrObj;

            while (errObj.InnerException != null)
            {
                var err = errObj.InnerException;
                errObj = err;
            }
            string errMsg = errObj.Message;


            if (errMsg.Contains("REFERENCE constraint") && errMsg.Contains("FK_"))
            {
                msg = "ไม่สามารถลบข้อมูล " + ObjectName + " ได้เนื่องจากมีการใช้งานข้อมูลอยู่ในระบบ";
            }
            else if (errMsg.Contains("Value cannot be null"))
            {
                msg = "ไม่สามารถลบข้อมูล " + ObjectName + " ได้เนื่องจากไม่พบข้อมูลดังกล่าว";

            }
            else if (errMsg.Contains("Violation of primary key"))
            {
                msg = "ไม่สามารถเพิ่มข้อมูล " + ObjectName + " ได้เนื่องจากรหัส PK มีใช้แล้วในระบบ";

            }
            else
            {
                msg = "ไม่สามารถลบข้อมูลได้ " + ObjectName + "  เนื่องจาก " + errMsg;
            }
            Hashtable hashtable = new Hashtable();

            hashtable.Add("Successfully", false);
            hashtable.Add("Data", null);
            hashtable.Add("Message", msg);
            hashtable.Add("ResultType", (int)RESULT_TYPE.InternalException);

            return hashtable;
        }
        public static Hashtable HashTableException(Exception pErrObj, ActionErrorMode pAction, string pObjectName)
        {
            string msg = string.Empty;
            var objErr = GetLastInnerError(pErrObj);
            var errMsg = objErr.Message;
            var ObjectName = string.IsNullOrWhiteSpace(pObjectName) ? "" : " " + pObjectName.Trim() + " ";

            switch (pAction)
            {
                case ActionErrorMode.Search:
                    if (errMsg.Contains("The wait operation timed out"))
                    {
                        msg = "ไม่สามารถโหลดข้อมูลได้เนื่องจากข้อมูลมีปริมาณมาก กรุณาเลือกเงื่อนไขในการค้นหา";
                    }
                    else
                    {
                        msg = "ไม่พบข้อมูล เนื่องจาก " + errMsg;
                    }

                    break;
                case ActionErrorMode.Add:
                    if (errMsg.Contains("Violation of primary key"))
                    {
                        msg = "ไม่สามารถเพิ่มข้อมูล " + ObjectName + " ได้เนื่องจากรหัส PK มีใช้แล้วในระบบ";
                    }
                    else if (errMsg.Contains("Violation of UNIQUE KEY constraint"))
                    {
                        msg = "ไม่สามารถเพิ่มข้อมูล " + ObjectName + " ได้เนื่องจากมีข้อมูลมีแล้วในระบบ";
                    }
                    else
                    {
                        msg = "ไม่สามารถเพิ่มข้อมูล " + ObjectName + " ได้เนื่องจาก " + errMsg;
                    }

                    break;
                case ActionErrorMode.Edit:
                    if (errMsg.Contains("Violation of UNIQUE KEY constraint"))
                    {
                        msg = "ไม่สามารถแก้ไขข้อมูล " + ObjectName + " ได้เนื่องจากมีข้อมูลมีแล้วในระบบ";
                    }
                    else
                    {
                        msg = "ไม่สามารถแก้ไขข้อมูล " + ObjectName + " ได้เนื่องจาก " + errMsg;
                    }

                    break;
                case ActionErrorMode.Delete:
                    if (errMsg.Contains("REFERENCE constraint") && errMsg.Contains("FK_"))
                    {
                        msg = "ไม่สามารถลบข้อมูล" + ObjectName + "ได้เนื่องจากมีการใช้งานข้อมูลอยู่ในระบบ";
                    }
                    else if (errMsg.Contains("Value cannot be null"))
                    {
                        msg = "ไม่สามารถลบข้อมูล" + ObjectName + "ได้เนื่องจากไม่พบข้อมูลดังกล่าว";
                    }
                    else if (errMsg.Contains("Sequence contains no elements"))
                    {
                        msg = "ไม่สามารถลบข้อมูล" + ObjectName + "ได้เนื่องจากไม่พบข้อมูลดังกล่าว";
                    }
                    else
                    {
                        msg = "ไม่สามารถลบข้อมูล" + ObjectName + "ได้เนื่องจาก " + errMsg;
                    }

                    break;
                case ActionErrorMode.View:
                    msg = "ไม่พบข้อมูล เนื่องจาก " + errMsg;

                    break;
                case ActionErrorMode.NotFound:
                    if (errMsg.Contains("The wait operation timed out"))
                    {
                        msg = "ไม่สามารถโหลดข้อมูลได้เนื่องจากข้อมูลมีปริมาณมาก กรุณาเลือกเงื่อนไขในการค้นหา";
                    }
                    else
                    {
                        msg = "ไม่พบข้อมูล เนื่องจาก " + errMsg;
                    }

                    break;
                default:
                    msg = errMsg;

                    break;
            }

            Hashtable hashtable = new Hashtable();

            hashtable.Add("Successfully", false);
            hashtable.Add("Data", null);
            hashtable.Add("Message", msg);
            hashtable.Add("ResultType", (int)RESULT_TYPE.InternalException);

            return hashtable;
        }
    }
}
