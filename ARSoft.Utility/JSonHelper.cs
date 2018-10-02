using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using Newtonsoft.Json;
using System.Runtime.Serialization;
using System.Web.Script.Serialization;

namespace ARSoft.Utility
{
    public class JSonHelper
    {
        public StringBuilder ConvertObjectToJSon<T>(T obj)
        {
            DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
            MemoryStream ms = new MemoryStream();
            ser.WriteObject(ms, obj);
            StringBuilder jsonString = new StringBuilder();
            jsonString.Append(Encoding.UTF8.GetString(ms.ToArray()));
            ms.Close();
            return jsonString;
        }

        public T ConvertJSonToObject<T>(string jsonString)
        {
            DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(T));
            MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(jsonString));
            T obj = (T)serializer.ReadObject(ms);
            return obj;
        }

        public string XmlNodeToJson(string xmlString)
        {
            string resJson = string.Empty;
            try
            {
                XmlDocument xDoc = new XmlDocument();
                xDoc.LoadXml(xmlString);
                resJson = JsonConvert.SerializeXmlNode(xDoc);
                return resJson;

            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public Dictionary<string, string> ConvertJsonToDictionary(string json)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();
            try
            {
                //Convert Json to Obj
                JavaScriptSerializer json_serializer = new JavaScriptSerializer();
                object obj = json_serializer.DeserializeObject(json);

                //เก็บ object ลงTemp ไว้ใช้สำหรับแก้ไขข้อมูล
                //Get Obj
                Dictionary<string, object> ls = (Dictionary<string, object>)obj;
                KeyValuePair<string, object> itemls = (KeyValuePair<string, object>)(ls).FirstOrDefault();
                Dictionary<string, object> valueitems = (Dictionary<string, object>)itemls.Value;


                valueitems.ToList().ForEach(x =>
                {
                    dict.Add(Convert.ToString(x.Key), Convert.ToString(x.Value));
                });

            }
            catch (Exception ex)
            {
                throw;
            }

            return dict;

        }

    }
}
