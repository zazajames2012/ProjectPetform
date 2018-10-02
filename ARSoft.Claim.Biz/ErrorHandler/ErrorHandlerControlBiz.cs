using ARSoft.Claim.DAL.ErrorHandler;
using ARSoft.Claim.Model.EntityFramework;
using ARSoft.Claim.Model.Enumeration;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Biz.ErrorHandler
{
    public class ErrorHandlerControlBiz
    {
        private ErrorHandlerControlDAL objDAL;

        public ErrorHandlerControlBiz()
        {
            objDAL = new ErrorHandlerControlDAL();
        }

        public void WriteLog(Exception ex)
        {
            objDAL.WriteLog(ex);
        }

        public void WriteLog(string Message)
        {
            objDAL.WriteLog(Message);
        }

        public void WriteDBLog(TRX_ERROR_LOG errorLogEntity)
        {
            objDAL.WriteDBLog(errorLogEntity);
        }

        public void WriteFileLog(TRX_ERROR_LOG errorLogEntity)
        {
            objDAL.WriteFileLog(errorLogEntity);
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
            objDAL.WriteFileLog(Message);
        }

        public void WriteDBLog(string Message)
        {
            objDAL.WriteDBLog(Message);
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

        private TRX_ERROR_LOG ConvertToErrorLogEntity(Exception ex)
        {
            return objDAL.ConvertToErrorLogEntity(ex);
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

        private string TodayLogFile()
        {
            return objDAL.TodayLogFile();
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
                    else if (errMsg.Contains("See 'EntityValidationErrors'"))
                    {
                        msg = getEntityValidationErrors(objErr, pAction, pObjectName);
                    }
                    else
                    {
                        msg = "ไม่พบข้อมูล เนื่องจาก " + errMsg;
                    }

                    break;
                case ActionErrorMode.Add:
                    if (errMsg.Contains("Violation of primary key"))
                    {
                        msg = "ไม่สามารถเพิ่มข้อมูล" + ObjectName + "ได้เนื่องจากรหัส PK มีใช้แล้วในระบบ";
                    }
                    else if (errMsg.Contains("Violation of UNIQUE KEY constraint"))
                    {
                        msg = "ไม่สามารถเพิ่มข้อมูล" + ObjectName + "ได้เนื่องจากมีข้อมูลมีแล้วในระบบ";
                    }
                    else if (errMsg.Contains("See 'EntityValidationErrors'"))
                    {
                        msg = getEntityValidationErrors(objErr, pAction, pObjectName);
                    }
                    else
                    {
                        msg = "ไม่สามารถเพิ่มข้อมูล" + ObjectName + "ได้เนื่องจาก " + errMsg;
                    }

                    break;
                case ActionErrorMode.Edit:
                    if (errMsg.Contains("Violation of UNIQUE KEY constraint"))
                    {
                        msg = "ไม่สามารถแก้ไขข้อมูล" + ObjectName + "ได้เนื่องจากมีข้อมูลมีแล้วในระบบ";
                    }
                    else if (errMsg.Contains("See 'EntityValidationErrors'"))
                    {
                        msg = getEntityValidationErrors(objErr, pAction, pObjectName);
                    }
                    else
                    {
                        msg = "ไม่สามารถแก้ไขข้อมูล" + ObjectName + "ได้เนื่องจาก " + errMsg;
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
                    else if (errMsg.Contains("See 'EntityValidationErrors'"))
                    {
                        msg = getEntityValidationErrors(objErr, pAction, pObjectName);
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
                    else if (errMsg.Contains("See 'EntityValidationErrors'"))
                    {
                        msg = getEntityValidationErrors(objErr, pAction, pObjectName);
                    }
                    else
                    {
                        msg = "ไม่พบข้อมูล เนื่องจาก " + errMsg;
                    }

                    break;
                default:
                    if (errMsg.Contains("See 'EntityValidationErrors'"))
                    {
                        msg = getEntityValidationErrors(objErr, pAction, pObjectName);
                    }
                    else
                    {
                        msg = errMsg;
                    }

                    break;
            }

            Hashtable hashtable = new Hashtable();

            hashtable.Add("Successfully", false);
            hashtable.Add("Data", null);
            hashtable.Add("Message", msg);
            hashtable.Add("ResultType", (int)RESULT_TYPE.InternalException);

            return hashtable;
        }
        private static string getEntityValidationErrors(Exception pErrObj, ActionErrorMode pAction, string pObjectName)
        {
            string msg = string.Empty;
            string newLine = System.Environment.NewLine;
            var errMsg = pErrObj.Message;
            var ObjectName = pObjectName;

            try
            {
                var objErr = (System.Data.Entity.Validation.DbEntityValidationException)pErrObj;
                msg = objErr.EntityValidationErrors.Count() == 0 ? pErrObj.Message : "";
                foreach (var entErr in objErr.EntityValidationErrors)
                {
                    if (entErr.ValidationErrors.Count() == 0)
                    {
                        msg = pErrObj.Message;
                    }
                    else
                    {
                        foreach (var validErr in entErr.ValidationErrors)
                        {
                            if (validErr.PropertyName != null && validErr.PropertyName != "")
                            { ObjectName = " " + validErr.PropertyName.Trim() + " "; }

                            switch (pAction)
                            {
                                case ActionErrorMode.Search:
                                    if (msg != string.Empty) { msg = msg + newLine; }
                                    msg = msg + "ไม่สามารถโหลดข้อมูล" + ObjectName + "ได้เนื่องจาก " + validErr.ErrorMessage;

                                    break;
                                case ActionErrorMode.Add:
                                    if (validErr.ErrorMessage.Contains("string or array type with a maximum length of"))
                                    {
                                        if (msg != string.Empty) { msg = msg + newLine; }
                                        msg = msg + "ไม่สามารถเพิ่มข้อมูล" + ObjectName + "ได้เนื่องจากข้อมูลมีความยาวเกินขนาดของฐานข้อมูล";
                                    }
                                    else if (validErr.ErrorMessage.Contains("field is required"))
                                    {
                                        if (msg != string.Empty) { msg = msg + newLine; }
                                        msg = msg + "ไม่สามารถเพิ่มข้อมูล" + ObjectName + "ได้เนื่องจากข้อมูลไม่มีค่า";
                                    }
                                    else
                                    {
                                        if (msg != string.Empty) { msg = msg + newLine; }
                                        msg = "ไม่สามารถเพิ่มข้อมูล" + ObjectName + "ได้เนื่องจาก " + validErr.ErrorMessage;
                                    }

                                    break;
                                case ActionErrorMode.Edit:
                                    if (validErr.ErrorMessage.Contains("string or array type with a maximum length of"))
                                    {
                                        if (msg != string.Empty) { msg = msg + newLine; }
                                        msg = msg + "ไม่สามารถแก้ไขข้อมูล" + ObjectName + "ได้เนื่องจากข้อมูลมีความยาวเกินขนาดของฐานข้อมูล";
                                    }
                                    else if (validErr.ErrorMessage.Contains("field is required"))
                                    {
                                        if (msg != string.Empty) { msg = msg + newLine; }
                                        msg = msg + "ไม่สามารถแก้ไขข้อมูล" + ObjectName + "ได้เนื่องจากข้อมูลไม่มีค่า";
                                    }
                                    else
                                    {
                                        if (msg != string.Empty) { msg = msg + newLine; }
                                        msg = "ไม่สามารถแก้ไขข้อมูล" + ObjectName + "ได้เนื่องจาก " + validErr.ErrorMessage;
                                    }

                                    break;
                                case ActionErrorMode.Delete:
                                    if (msg != string.Empty) { msg = msg + newLine; }
                                    msg = msg + "ไม่สามารถลบข้อมูล" + ObjectName + "ได้เนื่องจาก " + validErr.ErrorMessage;

                                    break;
                                case ActionErrorMode.View:
                                    if (msg != string.Empty) { msg = msg + newLine; }
                                    msg = msg + "ไม่สามารถโหลดข้อมูล" + ObjectName + "ได้เนื่องจาก " + validErr.ErrorMessage;

                                    break;
                                case ActionErrorMode.NotFound:
                                    if (msg != string.Empty) { msg = msg + newLine; }
                                    msg = msg + "ไม่สามารถโหลดข้อมูล" + ObjectName + "ได้เนื่องจาก " + validErr.ErrorMessage;

                                    break;
                                default:
                                    if (msg != string.Empty) { msg = msg + newLine; }
                                    msg = msg + validErr.ErrorMessage;

                                    break;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                var objErr = GetLastInnerError(ex);
                msg = objErr.Message;
            }

            return msg;
        }
    }
}
