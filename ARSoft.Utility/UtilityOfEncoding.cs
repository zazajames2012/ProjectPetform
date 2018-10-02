using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Globalization;
using System.Security.Cryptography;

namespace ARSoft.Utility
{
    //=================================
        //System.Text.Encoding data = UtilityOfEncoding.GetType(@"D:\zip\PF-0542-20121115-1.csv");
        //Console.WriteLine("Header Name :{0}", data.HeaderName);
        //Console.WriteLine("Encoding Name :{0}", data.EncodingName);
        //Console.WriteLine("Windows CodePage :{0}", data.WindowsCodePage);
    //=================================

    public class UtilityOfEncoding
    {
        public static System.Text.Encoding GetType(string FILE_NAME)
        {
            FileStream fs = new FileStream(FILE_NAME, FileMode.Open, FileAccess.Read);
            Encoding r = GetType(fs);
            fs.Close( );
            return r;
        }

        public static System.Text.Encoding GetType(FileStream fs)
        {
            byte[] Unicode = new byte[] { 0xFF, 0xFE, 0x41 };
            byte[] UnicodeBIG = new byte[] { 0xFE, 0xFF, 0x00 };
            byte[] UTF8 = new byte[] { 0xEF, 0xBB, 0xBF }; //with BOM
            Encoding reVal = Encoding.Default;

            BinaryReader r = new BinaryReader(fs, System.Text.Encoding.Default);
            int i;
            int.TryParse(fs.Length.ToString( ), out i);
            byte[] ss = r.ReadBytes(i);
            if (IsUTF8Bytes(ss) || ( ss[0] == 0xEF && ss[1] == 0xBB && ss[2] == 0xBF ))
            {
                reVal = Encoding.UTF8;
            }
            else if (ss[0] == 0xFE && ss[1] == 0xFF && ss[2] == 0x00)
            {
                reVal = Encoding.BigEndianUnicode;
            }
            else if (ss[0] == 0xFF && ss[1] == 0xFE && ss[2] == 0x41)
            {
                reVal = Encoding.Unicode;
            }
            r.Close( );
            return reVal;

        }

        private static bool IsUTF8Bytes(byte[] data)
        {
            int charByteCounter = 1;
            byte curByte;
            for (int i = 0; i < data.Length; i++)
            {
                curByte = data[i];
                if (charByteCounter == 1)
                {
                    if (curByte >= 0x80)
                    {
                        while (( ( curByte <<= 1 ) & 0x80 ) != 0)
                        {
                            charByteCounter++;
                        }
                        if (charByteCounter == 1 || charByteCounter > 6)
                        {
                            return false;
                        }
                    }
                }
                else
                {
                    if (( curByte & 0xC0 ) != 0x80)
                    {
                        return false;
                    }
                    charByteCounter--;
                }
            }
            if (charByteCounter > 1)
            {
                throw new Exception("Error byte format");
            }
            return true;
        }

        public static string EncodeNonAsciiCharacters(string value)
        {
            StringBuilder sb = new StringBuilder();
            foreach (char c in value)
            {
                if (c > 127)
                {
                    // This character is too big for ASCII
                    string encodedValue = "\\u" + ((int)c).ToString("x4");
                    sb.Append(encodedValue);
                }
                else
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }

        public static string DecodeEncodedNonAsciiCharacters(string value)
        {
            return Regex.Replace(
                value,
                @"\\u(?<Value>[a-zA-Z0-9]{4})",
                m =>
                {
                    return ((char)int.Parse(m.Groups["Value"].Value, NumberStyles.HexNumber)).ToString();
                });
        }

        public static string Base64Encode(string value)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(value);
            return System.Convert.ToBase64String(plainTextBytes);
        }
        
        public static string Base64Decode(string base64EncodedData)
        {
            //var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            //return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
            string temp = base64EncodedData.Replace(" ", "+");

            byte[] data = System.Convert.FromBase64String(temp);
            string base64Decoded = System.Text.Encoding.UTF8.GetString(data);
            return base64Decoded;
        }

        public static string MD5Encode(string value)
        {
            string hash = string.Empty;
            using (MD5 md5Hash = MD5.Create())
            {
                hash = GetMd5Hash(md5Hash, value);
            }

            return hash;
        }

        private static string GetMd5Hash(MD5 md5Hash, string input)
        {

            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }
    
    }
}
