// *** Update by : Pongthorn Paemanee ***
// *** Update Date : 08/10/2015 16:30  ***

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Threading.Tasks;
using ARSoft.Claim.Model.EntityFramework;
using ARSoft.Claim.DAL.ErrorHandler;
using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.Enumeration;
using static ARSoft.Claim.Model.Enumeration.EnumHelper;

namespace ARSoft.Claim.DAL.Agility
{
    public class MasterCommonAgilityDAL
    {
        public Dictionary<string, object> SelectAllPosition()
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            var page = new Page<DropdownModel>(null);
            var result = new Dictionary<string, object>();

            try
            {
                //var listOfPositiion = ctx.MAS_POSITIONS.Select(t => t).ToList();
                //List<DropdownModel> results = new List<DropdownModel>();
                //foreach (var item in listOfPositiion)
                //{

                //    var ddl = new DropdownModel();
                //    ddl.ID = item.ID;
                //    ddl.Name = item.Name;
                //    results.Add(ddl);
                //}

                //page = new Page<DropdownModel>(results);
                //result = page.GetFullResult();
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return result;
        }
        public Dictionary<string, object> SelectAllDepartment()
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            var page = new Page<DropdownModel>(null);
            var result = new Dictionary<string, object>();

            try
            {
                //var listOfDepartment = ctx.MAS_ORGANIZATION.Select(t => t)
                //.Where(t => t.Levels.Equals(2))
                //.Where(t => t.Status.Equals(1))
                //.ToList();
                //List<DropdownModel> results = new List<DropdownModel>();
                //foreach (var item in listOfDepartment)
                //{
                //    DropdownModel ddl = new DropdownModel();
                //    ddl.ID = item.ID;
                //    ddl.Name = item.Name;
                //    results.Add(ddl);
                //}

                //page = new Page<DropdownModel>(results);
                //result = page.GetFullResult();
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return result;
        }
        public Dictionary<string, object> SelectAllSection()
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            var page = new Page<DropdownModel>(null);
            var result = new Dictionary<string, object>();

            try
            {
                //var listOfSection = ctx.MAS_ORGANIZATION
                //.Where(t => t.Levels.Equals(3))
                //.Where(t => t.Status.Equals(1))
                //.ToList();

                //List<DropdownModel> results = new List<DropdownModel>();
                //foreach (var item in listOfSection)
                //{
                //    DropdownModel ddl = new DropdownModel();
                //    ddl.ID = item.ID;
                //    ddl.Name = item.Name;
                //    results.Add(ddl);
                //}

                //page = new Page<DropdownModel>(results);
                //result = page.GetFullResult();
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return result;
        }
        public Dictionary<string, object> SelectAllProvince()
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            var page = new Page<DropdownModel>(null);
            var result = new Dictionary<string, object>();

            try
            {
                var listOfProvince = ctx.SYS_PROVINCES.ToList();
                List<DropdownModel> results = new List<DropdownModel>();
                foreach (var item in listOfProvince)
                {
                    DropdownModel ddl = new DropdownModel();
                    ddl.ID = item.ID;
                    ddl.Name = item.Name;
                    results.Add(ddl);
                }

                page = new Page<DropdownModel>(results);
                result = page.GetFullResult();
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return result;
        }
        public Dictionary<string, object> SelectProvinceByRegion(byte regionID)
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            var page = new Page<DropdownModel>(null);
            var result = new Dictionary<string, object>();

            try
            {
                var listOfProvince = ctx.SYS_PROVINCES.Where(t => t.RegionID == regionID).ToList();
                List<DropdownModel> results = new List<DropdownModel>();
                foreach (var item in listOfProvince)
                {
                    DropdownModel ddl = new DropdownModel();
                    ddl.ID = item.ID;
                    ddl.Name = item.Name;
                    results.Add(ddl);
                }

                page = new Page<DropdownModel>(results);
                result = page.GetFullResult();
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return result;
        }
        public Dictionary<string, object> SelectDistrictByProvince(byte provinceID)
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            var page = new Page<DropdownModel>(null);
            var result = new Dictionary<string, object>();

            try
            {
                var listOfDistrict = ctx.SYS_DISTRICTS.Where(t => t.ProvinceID == provinceID).ToList();
                List<DropdownModel> results = new List<DropdownModel>();
                foreach (var item in listOfDistrict)
                {
                    DropdownModel ddl = new DropdownModel();
                    ddl.ID = item.ID;
                    ddl.Name = item.Name;
                    results.Add(ddl);
                }

                page = new Page<DropdownModel>(results);
                result = page.GetFullResult();
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return result;
        }
        public Dictionary<string, object> SelectAllRegion()
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            var page = new Page<DropdownModel>(null);
            var result = new Dictionary<string, object>();

            try
            {
            //    var listOfRegion = ctx.SYS_REGIONS.Where(t => t.Status == 1).ToList();
            //    List<DropdownModel> results = new List<DropdownModel>();
            //    foreach (var item in listOfRegion)
            //    {
            //        DropdownModel ddl = new DropdownModel();
            //        ddl.ID = item.ID;
            //        ddl.Name = item.Name;
            //        results.Add(ddl);
            //    }

            //    page = new Page<DropdownModel>(results);
            //    result = page.GetFullResult();
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return result;
        }
        public Dictionary<string, object> SelectAllProduct()
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            var page = new Page<DropdownModel>(null);
            var result = new Dictionary<string, object>();

            try
            {
                //var listOfProduct = ctx.MAS_MASTER_SETUP.Where(t => t.MAS_DOC_CONTROL.GroupType == "Product").ToList();
                //List<DropdownModel> results = new List<DropdownModel>();
                //foreach (var product in listOfProduct)
                //{
                //    DropdownModel ddl = new DropdownModel();
                //    ddl.ID = product.MasterSetupId;
                //    ddl.Name = product.Name;
                //    results.Add(ddl);
                //}

                //page = new Page<DropdownModel>(results);
                //result = page.GetFullResult();
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return result;
        }
        public Dictionary<string, object> SelectAllBrand()
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            var page = new Page<DropdownModel>(null);
            var result = new Dictionary<string, object>();

            try
            {
                //var listOfBrand = ctx.MAS_MASTER_SETUP.Where(t => t.MAS_DOC_CONTROL.GroupType == "Brand").ToList();
                //List<DropdownModel> results = new List<DropdownModel>();
                //foreach (var brand in listOfBrand)
                //{
                //    DropdownModel ddl = new DropdownModel();
                //    ddl.ID = brand.MasterSetupId;
                //    ddl.Name = brand.Name;
                //    results.Add(ddl);
                //}

                //page = new Page<DropdownModel>(results);
                //result = page.GetFullResult();
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return result;
        }
        public Dictionary<string, object> SelectMasCoreBusinessCompany()
        {
            var ctx = new CLAIMEntities();
            var errorBiz = new ErrorHandlerControlDAL();
            var page = new Page<DropdownModel>(null);
            var result = new Dictionary<string, object>();

            try
            {
                var listOfBC = ctx.MAS_CORE_BUSINESS_COMPANY.Where(t => t.Status == 1).ToList();
                List<DropdownModel> results = new List<DropdownModel>();
                foreach (var item in listOfBC)
                {
                    DropdownModel ddl = new DropdownModel();
                    ddl.ID = item.ID;
                    ddl.Name = item.Name;
                    results.Add(ddl);
                }

                page = new Page<DropdownModel>(results);
                result = page.GetFullResult();
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return result;
        }

        public List<DropdownModel> getBindingStatus()
        {
            var ddl = new List<DropdownModel>();
            var errorBiz = new ErrorHandlerControlDAL();
            var obj = new MasterCommonAgilityDAL();
            try
            {
                var item = new DropdownModel();
                item.ID = (int)Status.Active;
                item.Name = EnumHelper.GetEnumDescription((Status)(int)Status.Active);
                item.Checked = "checked";
                ddl.Add(item);

                item = new DropdownModel();
                item.ID = (int)Status.Inactive;
                item.Name = EnumHelper.GetEnumDescription((Status)(int)Status.Inactive);
                item.Checked = "";
                ddl.Add(item);
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return ddl;
        }
        public List<DropdownModel> getBindingContactType()
        {
            var ddl = new List<DropdownModel>();
            var errorBiz = new ErrorHandlerControlDAL();
            var obj = new MasterCommonAgilityDAL();
            try
            {
                var item = new DropdownModel();
                item.ID = (int)ContactType.Direct;
                item.Name = EnumHelper.GetEnumDescription((ContactType)(int)ContactType.Direct);
                item.Checked = "checked";
                ddl.Add(item);

                item = new DropdownModel();
                item.ID = (int)ContactType.Indirect;
                item.Name = EnumHelper.GetEnumDescription((ContactType)(int)ContactType.Indirect);
                item.Checked = "";
                ddl.Add(item);
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return ddl;
        }
        public Version GetAssemblyVersion()
        {
            var version = Assembly.GetExecutingAssembly().GetName().Version;

            return version;
        }
    }
}
