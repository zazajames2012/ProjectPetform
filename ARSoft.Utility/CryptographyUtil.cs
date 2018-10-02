﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace ARSoft.Utility
{
    public class CryptographyUtil
    {
        #region "Hash Cryptography"
        ////**************
        //การเข้ารหัสแบบ hash จะไม่สามารถทำให้ข้อมูลเหมือนเดิมได้ลักษณะการใช้งานคือ
        //เก็บไว้ในฐานข้อมูลแล้วเปรียบกับข้อมูลที่ส่งเข้าว่าเหมือนกันหรือไม่
        //Algorithms     size digest
        //MD5
        //SHA1           28 byte
        //SHA256         44 byte
        //SHA384         64 byte
        //SHA512         88 byte
        ////***************
        public string EncryptedMD5(string txtdata)
        {
            MD5CryptoServiceProvider md5Hasher = new MD5CryptoServiceProvider();
            UTF8Encoding encoder = new UTF8Encoding();
            byte[] hashedBytes = encoder.GetBytes(txtdata);            
            byte[] encryptedData = md5Hasher.ComputeHash(hashedBytes);
            string txtencrypted = null;
            txtencrypted = Convert.ToBase64String(encryptedData);
            return txtencrypted;
        }

        public string EncryptedSHA1(string txtdata)
        {
            SHA1Managed sha1Hasher = new SHA1Managed();
            byte[] hashedBytes = Encoding.ASCII.GetBytes(txtdata);
            byte[] encryptedData = sha1Hasher.ComputeHash(hashedBytes);
            string txtencrypted = null;
            txtencrypted = Convert.ToBase64String(encryptedData);
            return txtencrypted;
        }

        public string EncryptedSHA256(string txtdata)
        {
            SHA256Managed sha256Hasher = new SHA256Managed();
            byte[] hashedBytes = Encoding.ASCII.GetBytes(txtdata);
            byte[] encryptedData = sha256Hasher.ComputeHash(hashedBytes);
            string txtencrypted = null;
            txtencrypted = Convert.ToBase64String(encryptedData);
            return txtencrypted;
        }

        public string EncryptedSHA384(string txtdata)
        {
            SHA384Managed sha384Hasher = new SHA384Managed();
            byte[] hashedBytes = Encoding.ASCII.GetBytes(txtdata);
            byte[] encryptedData = sha384Hasher.ComputeHash(hashedBytes);
            string txtencrypted = null;
            txtencrypted = Convert.ToBase64String(encryptedData);
            return txtencrypted;
        }

        public string EncryptedSHA512(string txtdata)
        {
            SHA512Managed sha512Hasher = new SHA512Managed();
            byte[] hashedBytes = Encoding.ASCII.GetBytes(txtdata);
            byte[] encryptedData = sha512Hasher.ComputeHash(hashedBytes);
            string txtencrypted = null;
            txtencrypted = Convert.ToBase64String(encryptedData);
            return txtencrypted;
        }

        #region Encrypt & Decrypt Token SAM System
        private static string SecurityKey = "lL3p5Hr11lP7ndA3qnTBww==";
        public static string Encrypt(string toEncrypt, bool useHashing)
        {
            byte[] keyArray;
            byte[] toEncryptArray = UTF8Encoding.UTF8.GetBytes(toEncrypt);
            string key = SecurityKey;
            if (useHashing)
            {
                MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
                keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
                hashmd5.Clear();
            }
            else
                keyArray = UTF8Encoding.UTF8.GetBytes(key);

            TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;

            ICryptoTransform cTransform = tdes.CreateEncryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
            tdes.Clear();
            return Convert.ToBase64String(resultArray, 0, resultArray.Length);
        }

        public static string Decrypt(string cipherString, bool useHashing)
        {
            byte[] keyArray;
            byte[] toEncryptArray = Convert.FromBase64String(cipherString);
            string key = SecurityKey;
            if (useHashing)
            {
                MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
                keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
                hashmd5.Clear();
            }
            else
                keyArray = UTF8Encoding.UTF8.GetBytes(key);

            TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;

            ICryptoTransform cTransform = tdes.CreateDecryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);

            tdes.Clear();
            return UTF8Encoding.UTF8.GetString(resultArray);
        }

        public static string SAMCryptMD5Hash(string text)
        {
            MD5 md5 = new MD5CryptoServiceProvider();

            //compute hash from the bytes of text
            md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(text));

            //get hash result after compute it
            byte[] result = md5.Hash;

            StringBuilder strBuilder = new StringBuilder();
            for (int i = 0; i < result.Length; i++)
            {
                //change it into 2 hexadecimal digits
                //for each byte
                strBuilder.Append(result[i].ToString("x2"));
            }

            return strBuilder.ToString();
        }

        public static string SAMEncodeTo64(string toEncode)
        {
            byte[] toEncodeAsBytes = ASCIIEncoding.ASCII.GetBytes(toEncode);
            string returnValue = Convert.ToBase64String(toEncodeAsBytes);
            return returnValue;
        }

        public static string SAMDecodeFrom64(string encodedData)
        {
            byte[] encodedDataAsBytes = Convert.FromBase64String(encodedData);
            string returnValue = ASCIIEncoding.ASCII.GetString(encodedDataAsBytes);
            return returnValue;
        }

        public static string SAMDecryptPassword(string password)
        {
            string[] passwordArray = password.Split('|');
            string decryptPassword = String.Empty;
            try
            {                
                decryptPassword = CryptographyUtil.SAMDecodeFrom64(passwordArray[1]);
            }
            catch (Exception){}
            
            return decryptPassword;
        }

        #endregion

        #endregion

    }
}
