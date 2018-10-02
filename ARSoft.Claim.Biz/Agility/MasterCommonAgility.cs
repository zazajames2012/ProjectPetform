// *** Update by : Pongthorn Paemanee ***
// *** Update Date : 08/10/2015 16:30  ***

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using ARSoft.Claim.DAL.Agility;
using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.DAL.Common;

namespace ARSoft.Claim.Biz.Agility
{
    public class MasterCommonAgility
    {
        private MasterCommonAgilityDAL objDAL;

        public MasterCommonAgility()
        {
            objDAL = new MasterCommonAgilityDAL();
        }

        public Dictionary<string, object> SelectAllPosition()
        {
            return objDAL.SelectAllPosition();
        }
        public Dictionary<string, object> SelectAllDepartment()
        {
            return objDAL.SelectAllDepartment();
        }

        public Dictionary<string, object> SelectAllSection()
        {
            return objDAL.SelectAllSection();
        }

        public Dictionary<string, object> SelectAllProvince()
        {
            return objDAL.SelectAllProvince();
        }

        public Dictionary<string, object> SelectProvinceByRegion(byte regionID)
        {
            return objDAL.SelectProvinceByRegion(regionID);
        }

        public Dictionary<string, object> SelectDistrictByProvince(byte provinceID)
        {
            return objDAL.SelectDistrictByProvince(provinceID);
        }

        public Dictionary<string, object> SelectAllRegion()
        {
            return objDAL.SelectAllRegion();
        }

        public Dictionary<string, object> SelectAllProduct()
        {
            return objDAL.SelectAllProduct();
        }

        public Dictionary<string, object> SelectAllBrand()
        {
            return objDAL.SelectAllBrand();
        }

        public Dictionary<string, object> SelectMasCoreBusinessCompany()
        {
            return objDAL.SelectMasCoreBusinessCompany();
        }

        public List<DropdownModel> getBindingStatus()
        {
            return objDAL.getBindingStatus();
        }

        public List<DropdownModel> getBindingContactType()
        {
            return objDAL.getBindingContactType();
        }

        public Version GetAssemblyVersion()
        {
            var version = Assembly.GetExecutingAssembly().GetName().Version;

            return version;
        }

        public static List<CommonMessagesModel> GetMessageAlertList()
        {
            return CommonMessageDAL.GetMessageAlertList();
        }
    }
}
