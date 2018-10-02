using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;

namespace ARSoft.Utility
{
    public class CheckValue
    {
        public static string GetString(object data)
        {
            return GetString(data, "");
        }

        public static string GetString(object data, string displaynullvalue)
        {
            string result = "";
            try
            {
                result = (string)(data == null ? displaynullvalue : data.ToString());
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
            return result;
        }


        public static string GetNullString(object data)
        {
            string result = null;
            try
            {
                result = (string)(data == null ? null : data.ToString().Trim());
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
            return result;
        }
        public static int GetInt(object data)
        {
            int result = 0;
            try
            {
                result = (data == null ? 0 : Convert.ToInt32(data));
                //or
                //result=Convert.ToInt16(data);                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
            return result;
        }

        public static short GetShort(object data)
        {
            short result = 0;
            try
            {
                result = (short)(data == null ? 0 : data);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
            return result;
        }

        public static decimal GetDecimal(object data)
        {
            decimal result = 0;
            try
            {
                result = (decimal)(data == null ? 0 : data);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
            return result;
        }

        public static long GetLong(object data)
        {
            long result = 0;
            try
            {
                result = (long)(data == null ? 0 : data);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
            return result;
        }

        public static DateTime GetDateTime(object data)
        {
            DateTime result = DateTime.Now;
            try
            {
                result = (DateTime)(data == null ? DateTime.Now : data);
                //result = Convert.ToDateTime(data);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
            return result;
        }

        public static DateTime? GetDateTimeNull(object data)
        {
            DateTime? result = null;
            try
            {
                result = (DateTime?)(data == null ? null : data);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
            return result;
        }

        public static bool GetBoolean(object data)
        {
            bool result = false;
            try
            {
                result = (bool)(data == null ? false : data);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
            return result;
        }

        public static byte[] GetByteArray(object data)
        {
            byte[] result = null;
            try
            {
                result = (byte[])(data == null ? null : data);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
            return result;
        }

        public static bool IsNumeric(string data)
        {
            return IsNumeric(data, false);
        }

        public static bool IsNumeric(string data, bool allowDecimal)
        {
            bool result = true;

            if (String.IsNullOrEmpty(data))
            {
                return false;
            }

            if (data.StartsWith("-"))
            {
                data = data.Substring(1);
            }

            char[] chars = data.ToCharArray();

            if (allowDecimal)
            {
                bool decimalFound = false;
                foreach (char c in chars)
                {
                    if (c == '.' && !decimalFound)
                    {
                        decimalFound = true;
                    }
                    else
                    {
                        result = result & (char.IsNumber(c));
                    }
                }
            }
            else
            {
                foreach (char c in chars)
                {
                    result = result & char.IsNumber(c);
                }
            }

            return result;
        }

        public static bool IsDate(string data)
        {
            DateTime dt;
            if (DateTime.TryParse(data, CultureInfo.CreateSpecificCulture("en-US"), DateTimeStyles.None, out dt) == true)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static Boolean checkForSQLInjection(string parameter)
        {
            bool isSQLInjection = false;
            string[] blackList = {"--",";--",";","/*","*/","@@","@",
                                  "char","nchar","varchar","nvarchar",
                                  "alter","begin","cast","create","cursor","declare","delete","drop","end","exec","execute",
                                  "fetch","insert","kill","open",
                                  "select", "sys","sysobjects","syscolumns",
                                  "table","update"
                                 };

            for (int i = 0; i <= blackList.Length - 1; i++)
            {
                if ((parameter.ToLower().IndexOf(blackList[i], StringComparison.OrdinalIgnoreCase) >= 0))
                {
                    isSQLInjection = true;
                }
            }

            return isSQLInjection;
        }
        public static string SafeSqlLiteral(string inputSQL)
        {
            string result = null;
            if (inputSQL != null)
            {
                result = inputSQL.Replace("'", "''");
            }
            return result;
        }
    }
}
