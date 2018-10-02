using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace ARSoft.Utility
{
    public class FilesUtil
    {
        public static bool MoveFile(string source, string destination)
        {
            try
            {
                if (File.Exists(destination))
                    File.Delete(destination);
                File.Move(source, destination);
                return true;
            }
            catch (DirectoryNotFoundException DirNotFound)
            {
                LogFilesUtil.WriteToLog("UtilityOfFiles", "MoveFile", DirNotFound.Message);
                return false;
            }
            catch (UnauthorizedAccessException UnAuthDir)
            {
                LogFilesUtil.WriteToLog("UtilityOfFiles", "MoveFile", UnAuthDir.Message);
                return false;
            }
            catch (PathTooLongException LongPath)
            {
                LogFilesUtil.WriteToLog("UtilityOfFiles", "MoveFile", LongPath.Message);
                return false;
            }
            catch (Exception ex)
            {
                LogFilesUtil.WriteToLog("UtilityOfFiles", "MoveFile", ex.Message);
                return false;
            }

        }

        public static bool DeleteFile(string destination)
        {
            if (File.Exists(destination))
            {
                //File.OpenRead(destination).Dispose();
                File.Delete(destination);
            }                
            return true;
        }

        public string ReadFirstLine(string filename)
        {
            string returnValue = "";
            using (StreamReader sr = new StreamReader(filename, System.Text.Encoding.Default))
            {
                returnValue = sr.ReadLine( );
                sr.Close( );

            }
            return returnValue;
        }

        public string ReadLastLine(string filename)
        {
            string returnValue = "";
            FileStream stream = new FileStream(filename, FileMode.Open, FileAccess.Read);
            stream.Seek(-1024, SeekOrigin.End);     // rewind enough for > 1 line 

            StreamReader reader = new StreamReader(stream);
            reader.ReadLine( );      // discard partial line 
            string nextLine;
            while (!reader.EndOfStream)
            {
                nextLine = reader.ReadLine( );
                if (nextLine != null)
                {
                    if (nextLine.Substring(0, 3) == "FT|")
                    {
                        returnValue = nextLine;
                    }
                }
            }
            stream.Close( );
            return returnValue;
        }

        public int CountLine(string filename)
        {
            int result = 0;
            using (StreamReader fs = new StreamReader(filename))
            {
                while (fs.ReadLine( ) != null)
                {
                    result++;
                }
                fs.Close( );
            }
            return result;
        }
    

    }
}
