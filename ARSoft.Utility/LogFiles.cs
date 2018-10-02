using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Configuration;

//using System.Data.Entity;
//using System.Data.Entity.ModelConfiguration.Conventions;

namespace ARSoft.Utility
{
    public class LogFiles
    {

        #region "Attributes"
            private static string logFileName;
            private static StreamWriter logFile;
            private static string folderFile="";
            //private static string folderFile = ConfigurationManager.AppSettings["logFile"];
        #endregion

        #region "Methods"

        public static string GetApplicationPath()
        {
            string path = null;
            path = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().GetModules()[0].FullyQualifiedName);
            if (path.Substring(path.Length - 1, 1) != "\\")
            {
                path += "\\";
            }
            return path;
        }

        private static string CreateLogFolder()
        {
            string folderName = GetApplicationPath() + "log";

            if (!Directory.Exists(folderName))
            {
                Directory.CreateDirectory(folderName);
            }
            return folderName+"\\";
        }

        public static string SetLogFolder
        {
            get { return folderFile; }
            set { folderFile = value; }
        }

        public static void WriteToLog(string errorDescription)
        {
            if(folderFile=="" || folderFile==null)
            {
                folderFile = CreateLogFolder();
            }

            if (logFile == null)
            {
                logFileName = "error-" + DateTime.Now.ToString("yyyyMMdd") + ".log";
                logFile = new StreamWriter(folderFile + logFileName, true);
                logFile.AutoFlush = true;
            }
            else if (!logFileName.Equals("error-" + DateTime.Now.ToString("yyyyMMdd") + ".log"))
            {
                logFile.Close();
                logFileName = "";

                logFileName = "error-" + DateTime.Now.ToString("yyyyMMdd") + ".log";
                logFile = new StreamWriter(folderFile + logFileName, true);
                logFile.AutoFlush = true;
            }

            lock ((logFile))
            {
                logFile.WriteLine("Internal" + " | " + DateTime.Now + " | " + errorDescription);
            }
        }

        public static void WriteToLog(string sessionId, string errorDescription)
        {
            if (folderFile == "" || folderFile == null)
            {
                folderFile = CreateLogFolder();
            }

            if (logFile == null)
            {
                logFileName = "error-" + DateTime.Now.ToString("yyyyMMdd") + ".log";
                logFile = new StreamWriter(folderFile + logFileName, true);
                logFile.AutoFlush = true;
            }
            else if (!logFileName.Equals("error-" + DateTime.Now.ToString("yyyyMMdd") + ".log"))
            {
                logFile.Close();
                logFileName = "";

                logFileName = "error-" + DateTime.Now.ToString("yyyyMMdd") + ".log";
                logFile = new StreamWriter(folderFile + logFileName, true);
                logFile.AutoFlush = true;
            }

            lock ((logFile))
            {
                logFile.WriteLine(sessionId + " | " + DateTime.Now + " | " + errorDescription);
            }
        }

        public static void WriteToLog(string className, string functionName, string errorDescription)
        {
            if (folderFile == "" || folderFile == null)
            {
                folderFile = CreateLogFolder();
            }

            if (logFile == null)
            {
                logFileName = "error-" + DateTime.Now.ToString("yyyyMMdd") + ".log";
                logFile = new StreamWriter(folderFile + logFileName, true);
                logFile.AutoFlush = true;
            }
            else if (!logFileName.Equals("error-" + DateTime.Now.ToString("yyyyMMdd") + ".log"))
            {
                logFile.Close();
                logFileName = "";

                logFileName = "error-" + DateTime.Now.ToString("yyyyMMdd") + ".log";
                logFile = new StreamWriter(folderFile + logFileName, true);
                logFile.AutoFlush = true;
            }

            lock ((logFile))
            {
                logFile.WriteLine(DateTime.Now + " | " + className + " | " + functionName + " | " + errorDescription);
            }
        }

        public static void LogException(Exception exc, string source)
        {
            if (folderFile == "" || folderFile == null)
            {
                folderFile = CreateLogFolder();
            }

            if (logFile == null)
            {
                logFileName = "error-" + DateTime.Now.ToString("yyyyMMdd") + ".log";
                logFile = new StreamWriter(folderFile + logFileName, true);
                logFile.AutoFlush = true;
            }
            else if (!logFileName.Equals("error-" + DateTime.Now.ToString("yyyyMMdd") + ".log"))
            {
                logFile.Close();
                logFileName = "";

                logFileName = "error-" + DateTime.Now.ToString("yyyyMMdd") + ".log";
                logFile = new StreamWriter(folderFile + logFileName, true);
                logFile.AutoFlush = true;
            }

            lock ((logFile))
            {
                logFile.WriteLine("********** {0} **********", DateTime.Now);
                if (exc.InnerException != null)
                {
                    logFile.Write("Inner Exception Type: ");
                    logFile.WriteLine(exc.InnerException.GetType().ToString());
                    logFile.Write("Inner Exception: ");
                    logFile.WriteLine(exc.InnerException.Message);
                    logFile.Write("Inner Source: ");
                    logFile.WriteLine(exc.InnerException.Source);
                    if (exc.InnerException.StackTrace != null)
                    {
                        logFile.WriteLine("Inner Stack Trace: ");
                        logFile.WriteLine(exc.InnerException.StackTrace);
                    }
                }
                logFile.Write("Exception Type: ");
                logFile.WriteLine(exc.GetType().ToString());
                logFile.WriteLine("Exception: " + exc.Message);
                logFile.WriteLine("Source: " + source);
                logFile.WriteLine("Stack Trace: ");
                if (exc.StackTrace != null)
                {
                    logFile.WriteLine(exc.StackTrace);
                    logFile.WriteLine();
                }
                //logFile.Close();
            }

        }


        #endregion

    }
}
