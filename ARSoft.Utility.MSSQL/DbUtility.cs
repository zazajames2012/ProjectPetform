using ARSoft.Utility;
using System;
using System.Configuration;

namespace ARSoft.Utility.MSSQL
{
    public class DbUtility
    {
        #region "Attributes"
            private static string sqlServerConnection;
        #endregion

        #region "Methods"

        public static object GetString(object data)
        {
            //object value = null;
            try
            {
                //if (DBNull.Value.Equals(data) || ( null == data ) || ( string.IsNullOrEmpty(Convert.ToString(data)) ))
                if (string.IsNullOrEmpty(Convert.ToString(data)))
                {
                    //value = DBNull.Value;
                    return DBNull.Value;
                }
                else
                {
                    //Dim _type As String
                    //_type = _value.GetType.ToString

                    //Select Case LCase(_type)
                    //    Case "system.datetime"
                    //        _value.ToString()
                    //    Case "system.int32"
                    //End Select
                    //value = data.ToString();
                    return data.ToString( );
                }
                //return value;
            }
            catch (Exception ex)
            {
                LogFiles.WriteToLog("DBUtil", "GetString", ex.StackTrace);
                throw new Exception(ex.StackTrace, ex.InnerException);
            }
        }

        public static object GetDate(object data)
        {
            //object value = null;
            try
            {
                if (DBNull.Value.Equals(data) | ( null == data ) | ( string.IsNullOrEmpty(Convert.ToString(data)) ))
                {
                    return DBNull.Value;
                }
                else
                {
                    data = data.ToString().Replace("-", "/");
                    return UtilityOfDate.ConvertDate(data.ToString(), "yyyy/MM/dd");
                }
            }
            catch (Exception ex)
            {
                LogFiles.WriteToLog("DBUtil", "GetDate", ex.StackTrace);
                throw new Exception(ex.StackTrace, ex.InnerException);
            }
        }

        public static object GetDateTime(object data)
        {
            //object value = null;
            try
            {
                if (DBNull.Value.Equals(data) | (null == data) | (string.IsNullOrEmpty(Convert.ToString(data))))
                {
                    return DBNull.Value;
                }
                else
                {
                   data = data.ToString().Replace("-", "/");                    
                   return UtilityOfDate.ConvertDate(data.ToString(), "yyyy/MM/dd HH:mm:ss");
                }
            }
            catch (Exception ex)
            {
                LogFiles.WriteToLog("DBUtil", "GetDate", ex.StackTrace);
                throw new Exception(ex.StackTrace, ex.InnerException);
            }
        }
        
        public static object GetNumeric(object data)
        {
            object _value = null;
            bool _ck = true;

            try
            {
                if (DBNull.Value.Equals(data))
                {
                    _ck = false;
                }
                else
                {
                    //if (data == null | string.IsNullOrEmpty((Convert.ToString(data))))
                    if (string.IsNullOrEmpty(( Convert.ToString(data) )))
                    {
                        _ck = false;
                    }
                    else
                    {
                        if (!IsNumeric(Convert.ToString(data), true))
                        {
                            _ck = false;
                        }
                    }
                }

                if (_ck)
                {
                    _value = Convert.ToDouble(data);
                }
                else
                {
                    return DBNull.Value;
                }

            }
            catch (Exception ex)
            {
                LogFiles.WriteToLog("DBUtil", "GetNumeric", ex.StackTrace);
                throw new Exception(ex.StackTrace, ex.InnerException);
            }
            return _value;
        }

        public static object GetBoolean(object data)
        {
            object value = null;

            if (( data == null ) | DBNull.Value.Equals(data))
            {
                value = DBNull.Value;
            }
            else
            {
                switch (Convert.ToBoolean(data))
                {
                    case false:
                        value = 0;
                        break;
                    case true:
                        value = 1;
                        break;
                    default:
                        value = DBNull.Value;
                        break;
                }
            }
            return value;
        }

        public static string NullToString(object data)
        {
            //string _value = null;
            try
            {
                if (DBNull.Value.Equals(data) | ( data == null ))
                {
                    return "";
                }
                else
                {
                    return data.ToString( );
                }
                //return _value;
            }
            catch (Exception ex)
            {
                LogFiles.WriteToLog("DBUtil", "NullToString", ex.StackTrace);
                throw new Exception(ex.StackTrace, ex.InnerException);
            }
        }

        public static bool IsNumeric(string s)
        {
            return IsNumeric(s, false);
        }

        public static bool IsNumeric(string s, bool allowDecimal)
        {
            bool result = true;
            if (String.IsNullOrEmpty(s))
            {
                return false;
            }

            if (s.StartsWith("-"))
            {
                s = s.Substring(1);
            }

            char[] chars = s.ToCharArray( );

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
                        result = result & ( char.IsNumber(c) );
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

        public static string ConnectionString(string connectionName)
        {
            if (( sqlServerConnection == null ))
            {
                sqlServerConnection = ConfigurationManager.AppSettings[connectionName].ToString( );
            }
            return sqlServerConnection;
        }

        public static string GetStringForSQL(string inputSQL)
        {
            return inputSQL.Replace("'", "''");
        }

        #endregion
    }
}
