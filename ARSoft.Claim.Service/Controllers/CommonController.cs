using System;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Reflection;
using System.Collections;
using ARSoft.Claim.Biz.Agility;
using ARSoft.Claim.Biz.ErrorHandler;
using ARSoft.Claim.Service.Controllers.Helper;
using ARSoft.Claim.Biz.Common;
using ARSoft.Claim.Model.Enumeration;
using ARSoft.AKOW.Biz.Agility;
using System.Collections.Generic;
using ARSoft.Claim.DataModel;

namespace ARSoft.Claim.Service.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CommonController : ApiController
    {
        private MasterCommonAgility commonAgility;
        public CommonController()
        {
            this.commonAgility = new MasterCommonAgility();
        }

        [Route("Api/Common/GetAllDepartment")]
        [HttpGet]
        public Object GetAllDepartment()
        {
            Hashtable hashtable = new Hashtable();

            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                Dictionary<string, object> listOfDepartment = commonAgility.SelectAllDepartment();
                if (listOfDepartment != null && listOfDepartment.Count > 0)
                {
                    hashtable.Add("Successfully", true);
                    hashtable.Add("Data", listOfDepartment);
                    hashtable.Add("Message", "พบข้อมูล");
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Data", listOfDepartment);
                    hashtable.Add("Message", "ไม่พบข้อมูล");
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Search, null);

            }
            finally
            {
                commonAgility = null;
            }

            return hashtable;
        }

        [Route("Api/Common/GetAllPosition")]
        [HttpGet]
        public Object GetAllPosition()
        {
            Hashtable hashtable = new Hashtable();

            try
            {
                string token = ((string[])Request.Headers.GetValues("Token"))[0];
                if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

                Dictionary<string, object> listOfPosition = commonAgility.SelectAllPosition();
                if (listOfPosition != null && listOfPosition.Count > 0)
                {
                    hashtable.Add("Successfully", true);
                    hashtable.Add("Data", listOfPosition);
                    hashtable.Add("Message", "พบข้อมูล");
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
                else
                {
                    hashtable.Add("Successfully", false);
                    hashtable.Add("Data", listOfPosition);
                    hashtable.Add("Message", "ไม่พบข้อมูล");
                    hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
                }
            }
            catch (Exception ex)
            {
                hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Search, null);

            }
            finally
            {
                commonAgility = null;
            }

            return hashtable;
        }

        //[Route("Api/Common/GetAllSection")]
        //[HttpGet]
        //public Object GetAllSection()
        //{
        //    Hashtable hashtable = new Hashtable();

        //    try
        //    {
        //        string token = ((string[])Request.Headers.GetValues("Token"))[0];
        //        if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

        //        List<OrganizationModel> listOfSection = new EmployeesAgility().getDDLSection();
        //        if (listOfSection != null && listOfSection.Count > 0)
        //        {
        //            hashtable.Add("Successfully", true);
        //            hashtable.Add("Data", listOfSection);
        //            hashtable.Add("Message", "พบข้อมูล");
        //            hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
        //        }
        //        else
        //        {
        //            hashtable.Add("Successfully", false);
        //            hashtable.Add("Data", listOfSection);
        //            hashtable.Add("Message", "ไม่พบข้อมูล");
        //            hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Search, null);

        //    }
        //    finally
        //    {
        //        commonAgility = null;
        //    }

        //    return hashtable;
        //}


        //[Route("Api/Common/GetDistinctByProvinceID")]
        //[HttpGet]
        //public Object GetDistinctByProvinceID(int provinceID)
        //{
        //    Hashtable hashtable = new Hashtable();

        //    try
        //    {
        //        string token = ((string[])Request.Headers.GetValues("Token"))[0];
        //        if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

        //        List<SysDistinctModel> listOfSection = new JobCommonAgility().GetDistinctByProvinceID(provinceID);
        //        if (listOfSection != null && listOfSection.Count() > 0)
        //        {
        //            hashtable.Add("Successfully", true);
        //            hashtable.Add("Data", listOfSection);
        //            hashtable.Add("Message", "พบข้อมูล");
        //            hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
        //        }
        //        else
        //        {
        //            hashtable.Add("Successfully", false);
        //            hashtable.Add("Data", listOfSection);
        //            hashtable.Add("Message", "ไม่พบข้อมูล");
        //            hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Search, null);

        //    }
        //    finally
        //    {
        //        commonAgility = null;
        //    }

        //    return hashtable;
        //}

        //[Route("Api/Common/GetSupplierTypes")]
        //[HttpGet]
        //public Object GetSupplierTypes()
        //{
        //    Hashtable hashtable = new Hashtable();

        //    try
        //    {
        //        string token = ((string[])Request.Headers.GetValues("Token"))[0];
        //        if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

        //        List<EnumDataItem> listOfSection = new SupplierBiz().GetSupplierTypes();
        //        if (listOfSection != null && listOfSection.Count() > 0)
        //        {
        //            hashtable.Add("Successfully", true);
        //            hashtable.Add("Data", listOfSection);
        //            hashtable.Add("Message", "พบข้อมูล");
        //            hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
        //        }
        //        else
        //        {
        //            hashtable.Add("Successfully", false);
        //            hashtable.Add("Data", listOfSection);
        //            hashtable.Add("Message", "ไม่พบข้อมูล");
        //            hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Search, null);

        //    }
        //    finally
        //    {
        //        commonAgility = null;
        //    }

        //    return hashtable;
        //}

        //[Route("Api/Common/GetProvinceAll")]
        //[HttpGet]
        //public Object GetProvinceAll()
        //{
        //    Hashtable hashtable = new Hashtable();

        //    try
        //    {
        //        string token = ((string[])Request.Headers.GetValues("Token"))[0];
        //        if (!WebApiHelper.VerifyToken(token, ref hashtable)) return hashtable;

        //        List<SysProvinceModel> listOfSection = new JobCommonAgility().GetProvinceList();
        //        if (listOfSection != null && listOfSection.Count() > 0)
        //        {
        //            hashtable.Add("Successfully", true);
        //            hashtable.Add("Data", listOfSection);
        //            hashtable.Add("Message", "พบข้อมูล");
        //            hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
        //        }
        //        else
        //        {
        //            hashtable.Add("Successfully", false);
        //            hashtable.Add("Data", listOfSection);
        //            hashtable.Add("Message", "ไม่พบข้อมูล");
        //            hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        hashtable = ErrorHandlerControlBiz.HashTableException(ex, ActionErrorMode.Search, null);

        //    }
        //    finally
        //    {
        //        commonAgility = null;
        //    }

        //    return hashtable;
        //}

        //[Route("Api/Common/Position/GetAll")]
        //[HttpGet]
        //public Object GetAllPosition()
        //{
        //    return commonAgility.SelectAllPosition();
        //}

        //[Route("Api/Common/Department/GetAll")]
        //[HttpGet]
        //public Object GetAllDepartment()
        //{
        //    return commonAgility.SelectAllDepartment();

        //}

        //[Route("Api/Common/Section/GetAll")]
        //[HttpGet]
        //public Object GetSectionByDepartment()
        //{
        //    return commonAgility.SelectAllSection();
        //}

        //[Route("Api/Common/Province/GetAll")]
        //[HttpGet]
        //public Object GetAllProvince()
        //{
        //    return commonAgility.SelectAllProvince();
        //}

        //[Route("Api/Common/Province/GetByRegion")]
        //[HttpGet]
        //public Object GetProvinceByRegion(byte  regionID)
        //{
        //    return commonAgility.SelectProvinceByRegion(regionID);
        //}

        //[Route("Api/Common/District/GetByProvince")]
        //[HttpGet]
        //public Object GetDistrictByProvince(byte provinceID)
        //{
        //    var ss = commonAgility.SelectDistrictByProvince(provinceID);
        //    return commonAgility.SelectDistrictByProvince(provinceID);

        //}

        //[Route("Api/Common/Region/GetAll")]
        //[HttpGet]
        //public Object GetAllRegion()
        //{
        //    return commonAgility.SelectAllRegion();
        //}

        //[Route("Api/Common/Product/GetAll")]
        //[HttpGet]
        //public Object GetAllProduct()
        //{
        //    return commonAgility.SelectAllProduct();
        //}

        //[Route("Api/Common/Brand/GetAll")]
        //[HttpGet]
        //public Object GetAllBrand()
        //{
        //    return commonAgility.SelectAllBrand();
        //}

        //[Route("Api/Common/GetDDLDepartment")]
        //[HttpGet]
        //public Object GetDDLDepartment()
        //{
        //    var objEmp = new EmployeesAgility();
        //    var Department = objEmp.getDDLDepartment().ToList();
        //    return Department;
        //}

        //[Route("Api/Common/GetDDLSection")]
        //[HttpGet]
        //public Object GetDDLSection()
        //{
        //    var objEmp = new EmployeesAgility();
        //    var Section = objEmp.getDDLSection().ToList();
        //    return Section;
        //}

        [Route("Api/Common/Sys/GetAssemblyVersion")]
        [HttpGet]
        public Object GetAssemblyVersion()
        {
            var version = Assembly.GetExecutingAssembly().GetName().Version;

            return version;
        }
        // Added 14/10/2558 for BU page
        [Route("Api/Common/GetCoreBusinessCompany")]
        [HttpGet]
        public Object GetCoreBusinessCompany()
        {
            return commonAgility.SelectMasCoreBusinessCompany();
        }
    }
}

