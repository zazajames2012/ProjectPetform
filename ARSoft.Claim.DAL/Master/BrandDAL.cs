using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.Validation;
using System.Collections;
using ARSoft.Claim.Model.EntityFramework;
using ARSoft.Claim.DAL.ErrorHandler;
using ARSoft.Claim.DataModel;
using ARSoft.Claim.Model.Enumeration;
using ARSoft.Claim.Model.BOL;

namespace ARSoft.AKOW.DAL.Master
{
    public class BrandDAL
    {
        private string cultureInfo = "en-US";

        private CLAIMEntities ctx = new CLAIMEntities();

        private ErrorHandlerControlDAL errorBiz = new ErrorHandlerControlDAL();

        public List<SelectType> GetDDLBrands()
        {
            var ctx = new CLAIMEntities();

            List<SelectType> output;
            var entityList = (from pBrand in ctx.MAS_BRANDS
                              where pBrand.Status == 1
                              orderby pBrand.Name
                              select new SelectType
                              {
                                  ID = pBrand.ID,
                                  Text = pBrand.Name
                              });
            output = entityList.ToList();

            return output;
        }


        public BrandModel Get(int ID)
        {
            //MAS_BRANDS entity = ctx.MAS_BRANDS.Where(b => b.ID == ID).FirstOrDefault();

            BrandModel output = new BrandModel();

            //output.ID = entity.ID;
            //output.Name = entity.Name;
            //output.Description = entity.Description;
            //output.BrandWebSite = entity.BrandWebSite;
            //output.SupportWebSite = entity.SupportWebSite;
            //output.StandardTAT = entity.StandardTAT;
            //output.Status = entity.Status;

            return output;

        }

        public BrandSlaModel GetOneSla(int ID)
        {
            //MAS_BRAND_TAT_SETTINGS entity = ctx.MAS_BRAND_TAT_SETTINGS.Where(b => b.ID == ID).FirstOrDefault();

            BrandSlaModel model = new BrandSlaModel();

            //model.ID = entity.ID;
            //model.BrandID = entity.BrandID;

            //model.ProductID = entity.ProductID;

            //model.ModelID = entity.ModelID;
            //model.ModelName = entity.MAS_MODELS != null ? entity.MAS_MODELS.Name : null;

            ////model.HolidayIncluded = entity.HolidayIncluded;
            ////model.ServicesCalendarID = entity.ServicesCalendarID;

            //model.TATFixing = entity.TATFixing;
            //model.TATFixingUnit = (SLAUnitEnum)entity.TATFixingUnit;

            ////model.TATFixingComputeID = entity.TATFixingComputeID;

            //model.CreatedBy = entity.CreatedBy;
            //model.CreatedDate = entity.CreatedDate;
            //model.UpdatedBy = entity.UpdatedBy.Value;
            //model.UpdatedDate = entity.UpdatedDate.Value;

            return model;

        }

        public List<BrandModel> GetAll(int? PageIndex, int? PageSize, string Sort, BrandSearchModel searchModel)
        {
            //List<uspGetBrands_Result> entityList = ctx.uspGetBrands(PageIndex, PageSize, Sort, searchModel.BrandName, searchModel.IsAvtive, searchModel.IsInactive).ToList();

            List<BrandModel> outputList = new List<BrandModel>();
           

            //foreach (uspGetBrands_Result entity in entityList)
            //{
            //    BrandModel output = new BrandModel();
            //    output.RowNumber = entity.RowNumber;
            //    output.RecordCount = entity.RecordCount;
            //    output.ID = entity.ID;
            //    output.Name = entity.Name;
            //    output.Description = entity.Description;
            //    output.BrandWebSite = entity.BrandWebSite;
            //    output.SupportWebSite = entity.SupportWebSite;
            //    output.Status = entity.Status;

            //    if (output.Status == 1)
            //    {
            //        output.StatusText = "ใช้งาน";
            //    }
            //    else
            //    {
            //        output.StatusText = "ไม่ใช้งาน";
            //    }

            //    output.CreatedBy = entity.CreatedBy;
            //    output.CreatedDate = entity.CreatedDate;

            //    if (entity.UpdatedBy.HasValue)
            //        output.UpdatedBy = entity.UpdatedBy.Value;

            //    if (entity.UpdatedDate.HasValue)
            //        output.UpdatedDate = entity.UpdatedDate.Value;

            //    outputList.Add(output);

           // }

            return outputList;
        }

        //public MAS_BRANDS ConvertToBrandEntity(BrandModel model)
        //{
        //    MAS_BRANDS entity = new MAS_BRANDS();

        //    entity.ID = model.ID;
        //    entity.Name = model.Name;
        //    entity.Description = model.Description;
        //    entity.BrandWebSite = model.BrandWebSite;
        //    entity.SupportWebSite = model.SupportWebSite;
        //    entity.StandardTAT = model.StandardTAT;
        //    entity.TATFixingUnit = model.TATFixingUnit == 0 ? (byte)2 : model.TATFixingUnit;
        //    entity.TATFixingComputeID = model.TATFixingComputeID == 0 ? 5 : model.TATFixingComputeID;
        //    entity.Status = model.Status;
        //    entity.CreatedBy = model.CreatedBy;
        //    entity.CreatedDate = model.CreatedDate;
        //    entity.UpdatedBy = model.UpdatedBy;
        //    entity.UpdatedDate = model.UpdatedDate;

        //    return entity;
        //}

        //public bool Add(MAS_BRANDS BrandEntity)
        //{
        //    try
        //    {
        //        ctx.MAS_BRANDS.Add(BrandEntity);
        //        ctx.SaveChanges();
        //        return true;
        //    }
        //    catch (DbEntityValidationException ex)
        //    {
        //        string errorMessage = string.Empty;
        //        foreach (var eve in ex.EntityValidationErrors)
        //        {
        //            errorMessage += "Entity of type \"" + eve.Entry.Entity.GetType().Name + "\" in state \"" + eve.Entry.State + "\" has the following validation errors:\r\n";

        //            foreach (var ve in eve.ValidationErrors)
        //            {
        //                errorMessage += "- Property: \"" + ve.PropertyName + "\", Error: \"" + ve.ErrorMessage + "\"";

        //            }
        //        }
        //        throw ex;
        //    }
        //    catch (Exception ex)
        //    {
        //        //return false;
        //        throw ex;
        //    }
        //}

        //public bool AddByModel(BrandModel brandModel)
        //{
        //    return Add(ConvertToBrandEntity(brandModel));
        //}

        //public bool Update(MAS_BRANDS BrandEntity)
        //{
        //    try
        //    {
        //        MAS_BRANDS oldBrandEntity = ctx.MAS_BRANDS.Where(b => b.ID == BrandEntity.ID).FirstOrDefault();
        //        oldBrandEntity.ID = BrandEntity.ID;
        //        oldBrandEntity.Name = BrandEntity.Name;
        //        oldBrandEntity.Description = BrandEntity.Description;
        //        oldBrandEntity.BrandWebSite = BrandEntity.BrandWebSite;
        //        oldBrandEntity.SupportWebSite = BrandEntity.SupportWebSite;
        //        oldBrandEntity.StandardTAT = BrandEntity.StandardTAT;
        //        oldBrandEntity.Status = BrandEntity.Status;
        //        //oldBrandEntity.CreatedBy = BrandEntity.CreatedBy;
        //        //oldBrandEntity.CreatedDate = BrandEntity.CreatedDate;
        //        oldBrandEntity.UpdatedBy = BrandEntity.UpdatedBy;
        //        oldBrandEntity.UpdatedDate = BrandEntity.UpdatedDate;
        //        ctx.SaveChanges();
        //        return true;
        //    }
        //    catch (DbEntityValidationException ex)
        //    {
        //        string errorMessage = string.Empty;
        //        foreach (var eve in ex.EntityValidationErrors)
        //        {
        //            errorMessage += "Entity of type \"" + eve.Entry.Entity.GetType().Name + "\" in state \"" + eve.Entry.State + "\" has the following validation errors:\r\n";

        //            foreach (var ve in eve.ValidationErrors)
        //            {
        //                errorMessage += "- Property: \"" + ve.PropertyName + "\", Error: \"" + ve.ErrorMessage + "\"";

        //            }
        //        }
        //        throw ex;
        //    }
        //    catch (Exception ex)
        //    {
        //        //return false;
        //        throw ex;
        //    }
        //}

        //public bool UpdateByModel(BrandModel brandModel)
        //{
        //    return Update(ConvertToBrandEntity(brandModel));
        //}

        //public bool Delete(int brandId)
        //{
        //    using (CLAIMEntities context = new CLAIMEntities())
        //    {
        //        bool result = false;
        //        var errorBiz = new ErrorHandlerControlDAL();
        //        try
        //        {
        //            var masterBrand = context.MAS_BRANDS.Where(b => b.ID == brandId).FirstOrDefault();
        //            if (masterBrand != null)
        //            {
        //                context.MAS_BRANDS.Remove(masterBrand);
        //                context.SaveChanges();
        //                result = true;
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            errorBiz.WriteLog(ex);
        //            throw ex;
        //        }

        //        return result;
        //    }
        //}

        //public List<BrandSlaModel> GetBrandSla(int? PageIndex, int? PageSize, string Sort, int BrandId)
        //{
        //    List<uspGetBrandSla_Result> entityList = ctx.uspGetBrandSla(PageIndex, PageSize, Sort, BrandId).ToList();

        //    List<BrandSlaModel> outputList = new List<BrandSlaModel>();

        //    foreach (uspGetBrandSla_Result entity in entityList)
        //    {
        //        BrandSlaModel output = new BrandSlaModel();
        //        output.RowNumber = entity.RowNumber;
        //        output.RecordCount = entity.RecordCount;
        //        output.ID = entity.ID;
        //        output.ProductName = entity.ProductName;
        //        output.ModelName = entity.ModelName;
        //        output.TATFixing = entity.TATFixing;
        //        //  output.TATFixingUnit = (SLAUnitEnum)Convert.ToInt32(entity.TATFixingUnit);
        //        //output.TATFixingText = output.TATFixing.ToString() + " " + output.TATFixingUnit.ToString();
        //        output.TATFixingText = output.TATFixing.ToString() + " วัน";
        //        //  output.TATFixingComputeID = entity.TATFixingComputeID;
        //        outputList.Add(output);
        //    }

        //    return outputList;
        //}

        //public bool DeleteBrandSla(int brandSlaId)
        //{
        //    using (CLAIMEntities context = new CLAIMEntities())
        //    {
        //        bool result = false;
        //        var errorBiz = new ErrorHandlerControlDAL();
        //        try
        //        {
        //            var masterBrand = context.MAS_BRAND_TAT_SETTINGS.Where(b => b.ID == brandSlaId).FirstOrDefault();
        //            if (masterBrand != null)
        //            {
        //                context.MAS_BRAND_TAT_SETTINGS.Remove(masterBrand);
        //                context.SaveChanges();
        //                result = true;
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            errorBiz.WriteLog(ex);
        //            throw ex;
        //        }

        //        return result;
        //    }
        //}

        //public List<SelectType> GetProductSelectTypeList()
        //{
        //    List<SelectType> output;
        //    var entityList = (from product in ctx.MAS_PRODUCTS
        //                      where product.Status == 1
        //                      orderby product.Name
        //                      select new SelectType
        //                      {
        //                          ID = product.ID,
        //                          Text = product.Name
        //                      });
        //    output = entityList.ToList();
        //    return output;
        //}

        //public List<ProductsModel> GetProductModelList()
        //{
        //    List<ProductsModel> output;
        //    var entityList = (from product in ctx.MAS_PRODUCTS
        //                      where product.Status == 1
        //                      orderby product.Name
        //                      select new ProductsModel
        //                      {
        //                          ID = product.ID,
        //                          Name = product.Name,
        //                          BundleSoftware = product.BundleSoftware
        //                      });
        //    output = entityList.ToList();
        //    return output;
        //}


        //public List<SelectType> GetProductLaborCostsList(int productid)
        //{
        //    List<SelectType> output;
        //    var entityList = (from pdLabor in ctx.MAS_PRODUCT_LABOR_COSTS
        //                      join pdsize in ctx.MAS_PRODUCT_SIZE on pdLabor.ProductSizeID equals pdsize.ID
        //                      where pdLabor.ProductID == productid && pdsize.Status == 1
        //                      orderby pdLabor.DisplaySizeText
        //                      select new SelectType
        //                      {
        //                          ID = pdLabor.ProductSizeID,
        //                          Text = pdLabor.DisplaySizeText
        //                      });
        //    output = entityList.ToList();
        //    return output;
        //}
        //public Hashtable GetProductSizeUsingList()
        //{
        //    var output = new Hashtable();
        //    var pdsList = ctx.MAS_PRODUCT_SIZE.Where(c => c.Status == 1).ToList();
        //    byte isUse = 0;

        //    isUse = pdsList.Where(c => c.Name == "Small").Count() == 0 ? (byte)0 : pdsList.Where(c => c.Name == "Small").FirstOrDefault().Status;
        //    output.Add("Small", isUse);

        //    isUse = pdsList.Where(c => c.Name == "Medium").Count() == 0 ? (byte)0 : pdsList.Where(c => c.Name == "Medium").FirstOrDefault().Status;
        //    output.Add("Medium", isUse);

        //    isUse = pdsList.Where(c => c.Name == "Large").Count() == 0 ? (byte)0 : pdsList.Where(c => c.Name == "Large").FirstOrDefault().Status;
        //    output.Add("Large", isUse);

        //    isUse = pdsList.Where(c => c.Name == "XLarge").Count() == 0 ? (byte)0 : pdsList.Where(c => c.Name == "XLarge").FirstOrDefault().Status;
        //    output.Add("XLarge", isUse);

        //    return output;
        //}

        //public List<SelectType> GetModelSelectTypeList(int ProductId, int BrandId)
        //{
        //    List<SelectType> output;
        //    var entityList = (from model in ctx.MAS_MODELS
        //                      join brand in ctx.MAS_BRANDS on model.BrandID equals brand.ID
        //                      join product in ctx.MAS_PRODUCTS on model.ProductID equals product.ID
        //                      where model.Status == 1 && product.ID == ProductId && brand.ID == BrandId
        //                      orderby model.Name
        //                      select new SelectType
        //                      {
        //                          ID = model.ID,
        //                          Text = model.Name
        //                      });
        //    output = entityList.Take(100).ToList();
        //    return output;
        //}

        //public List<SelectType> GetSlaComputeSelectTypeList()
        //{
        //    List<SelectType> output;
        //    var entityList = (from sla in ctx.MAS_SLA_COMPUTE_SETTINGS
        //                      where sla.ID==5 && sla.Status == 1
        //                      orderby sla.Name
        //                      select new SelectType
        //                      {
        //                          ID = sla.ID,
        //                          Text = sla.Name
        //                      });
        //    output = entityList.ToList();
        //    return output;
        //}

        //public List<SelectType> GetCalendarSelectTypeList()
        //{
        //    List<SelectType> output;
        //    var entityList = (from cal in ctx.MAS_SERVICES_CALENDARS
        //                      where cal.Status == 1
        //                      orderby cal.Name
        //                      select new SelectType
        //                      {
        //                          ID = cal.ID,
        //                          Text = cal.Name
        //                      });
        //    output = entityList.ToList();
        //    return output;
        //}

        //public MAS_BRAND_TAT_SETTINGS ConvertToSlaEntity(BrandSlaModel model)
        //{
        //    MAS_BRAND_TAT_SETTINGS entity = new MAS_BRAND_TAT_SETTINGS();

        //    entity.ID = model.ID;
        //    entity.BrandID = model.BrandID;

        //    entity.ProductID = model.ProductID;

        //    entity.ModelID = model.ModelID;

        //    //entity.HolidayIncluded = model.HolidayIncluded;
        //    //entity.ServicesCalendarID = model.ServicesCalendarID;

        //    entity.TATFixing = model.TATFixing;
        //    entity.TATFixingUnit = Convert.ToByte(model.TATFixingUnit);

        //    //entity.TATFixingComputeID = model.TATFixingComputeID;

        //    entity.CreatedBy = model.CreatedBy;
        //    entity.CreatedDate = model.CreatedDate;
        //    entity.UpdatedBy = model.UpdatedBy;
        //    entity.UpdatedDate = model.UpdatedDate;


        //    return entity;
        //}

        //public bool AddSla(MAS_BRAND_TAT_SETTINGS entity)
        //{
        //    try
        //    {
        //        ctx.MAS_BRAND_TAT_SETTINGS.Add(entity);
        //        ctx.SaveChanges();
        //        return true;
        //    }
        //    catch (DbEntityValidationException ex)
        //    {
        //        string errorMessage = string.Empty;
        //        foreach (var eve in ex.EntityValidationErrors)
        //        {
        //            errorMessage += "Entity of type \"" + eve.Entry.Entity.GetType().Name + "\" in state \"" + eve.Entry.State + "\" has the following validation errors:\r\n";

        //            foreach (var ve in eve.ValidationErrors)
        //            {
        //                errorMessage += "- Property: \"" + ve.PropertyName + "\", Error: \"" + ve.ErrorMessage + "\"";

        //            }
        //        }
        //        throw ex;
        //    }
        //    catch (Exception ex)
        //    {
        //        //return false;
        //        throw ex;
        //    }
        //}

        //public bool AddSlaByModel(BrandSlaModel model)
        //{
        //    return AddSla(ConvertToSlaEntity(model));
        //}


        //public bool UpdateSla(MAS_BRAND_TAT_SETTINGS sla)
        //{
        //    try
        //    {
        //        MAS_BRAND_TAT_SETTINGS oldBrandEntity = ctx.MAS_BRAND_TAT_SETTINGS.Where(b => b.ID == sla.ID).FirstOrDefault();


        //        oldBrandEntity.ID = sla.ID;
        //        oldBrandEntity.BrandID = sla.BrandID;

        //        oldBrandEntity.ProductID = sla.ProductID;

        //        oldBrandEntity.ModelID = sla.ModelID;

        //        //oldBrandEntity.HolidayIncluded = sla.HolidayIncluded;
        //        //oldBrandEntity.ServicesCalendarID = sla.ServicesCalendarID;

        //        oldBrandEntity.TATFixing = sla.TATFixing;
        //        oldBrandEntity.TATFixingUnit = sla.TATFixingUnit;

        //        //oldBrandEntity.TATFixingComputeID = sla.TATFixingComputeID;

        //        oldBrandEntity.CreatedBy = sla.CreatedBy;
        //        oldBrandEntity.CreatedDate = sla.CreatedDate;
        //        oldBrandEntity.UpdatedBy = sla.UpdatedBy.Value;
        //        oldBrandEntity.UpdatedDate = sla.UpdatedDate.Value;


        //        ctx.SaveChanges();
        //        return true;
        //    }
        //    catch (DbEntityValidationException ex)
        //    {
        //        string errorMessage = string.Empty;
        //        foreach (var eve in ex.EntityValidationErrors)
        //        {
        //            errorMessage += "Entity of type \"" + eve.Entry.Entity.GetType().Name + "\" in state \"" + eve.Entry.State + "\" has the following validation errors:\r\n";

        //            foreach (var ve in eve.ValidationErrors)
        //            {
        //                errorMessage += "- Property: \"" + ve.PropertyName + "\", Error: \"" + ve.ErrorMessage + "\"";

        //            }
        //        }
        //        throw ex;
        //    }
        //    catch (Exception ex)
        //    {
        //        //return false;
        //        throw ex;
        //    }
        //}

        //public bool UpdateSlaByModel(BrandSlaModel sla)
        //{
        //    return UpdateSla(ConvertToSlaEntity(sla));
        //}

        //public bool CheckExisting(BrandSlaModel pSetupBrand, string mode)
        //{
        //    using (AKOWModelEntities context = new AKOWModelEntities())
        //    {
        //        var errorBiz = new ErrorHandlerControlDAL();
        //        try
        //        {
        //            List<MAS_BRAND_TAT_SETTINGS> brandSla;
        //            if (mode == "Add")
        //            {
        //                if (pSetupBrand.ModelID != null)
        //                {
        //                    brandSla = context.MAS_BRAND_TAT_SETTINGS.Where(s => s.ProductID == pSetupBrand.ProductID && s.BrandID == pSetupBrand.BrandID && s.ModelID == pSetupBrand.ModelID).ToList<MAS_BRAND_TAT_SETTINGS>();
        //                }
        //                else
        //                {
        //                    brandSla = context.MAS_BRAND_TAT_SETTINGS.Where(s => s.ProductID == pSetupBrand.ProductID && s.BrandID == pSetupBrand.BrandID).ToList<MAS_BRAND_TAT_SETTINGS>();
        //                }
        //            }
        //            else
        //            {
        //                if (pSetupBrand.ModelID != null)
        //                {
        //                    brandSla = context.MAS_BRAND_TAT_SETTINGS.Where(s => s.ID != pSetupBrand.ID && s.ProductID == pSetupBrand.ProductID && s.BrandID == pSetupBrand.BrandID && s.ModelID == pSetupBrand.ModelID).ToList<MAS_BRAND_TAT_SETTINGS>();
        //                }
        //                else
        //                {
        //                    brandSla = context.MAS_BRAND_TAT_SETTINGS.Where(s => s.ID != pSetupBrand.ID && s.ProductID == pSetupBrand.ProductID && s.BrandID == pSetupBrand.BrandID).ToList<MAS_BRAND_TAT_SETTINGS>();
        //                }
        //            }

        //            if (brandSla != null && brandSla.Count() > 0) return true;
        //        }
        //        catch (Exception ex)
        //        {
        //            errorBiz.WriteLog(ex);
        //            throw ex;
        //        }

        //        return false;
        //    }
        //}
        //public List<BrandLaborCostsModel> GetBrandServiceCost(int? PageIndex, int? PageSize, string Sort, int BrandId)
        //{
        //    List<uspGetBrandServiceCost_Result> entityList = ctx.uspGetBrandServiceCost(PageIndex, PageSize, Sort, BrandId).ToList();

        //    List<BrandLaborCostsModel> outputList = new List<BrandLaborCostsModel>();

        //    foreach (uspGetBrandServiceCost_Result entity in entityList)
        //    {
        //        BrandLaborCostsModel output = new BrandLaborCostsModel();
        //        output.RowNumber = entity.RowNumber;
        //        output.RecordCount = entity.RecordCount;
        //        output.ID = entity.ID;
        //        output.ProductName = entity.ProductName;
        //        output.ModelName = entity.ModelName;
        //        output.Hardware = entity.Hardware;
        //        output.Software = entity.Software;
        //        output.DealerDiscount = entity.DealerDiscount;
        //        output.DealerDiscountType = entity.DealerDiscountType;
        //        output.DisplaySizeText = entity.DisplaySizeText;

        //        //output.Price = entity.Price;
        //        //output.LaborCostSmall = entity.LaborCostSmall;
        //        //output.LaborCostMedium = entity.LaborCostMedium;
        //        //output.LaborCostLarge = entity.LaborCostLarge;
        //        //output.LaborCostXLarge = entity.LaborCostXLarge;
        //        //output.DealerPrice = entity.DealerPrice;
        //        //output.DealerPriceType = entity.DealerPriceType;
        //        outputList.Add(output);
        //    }

        //    return outputList;
        //}

        //public bool AddServiceCost(BrandLaborCostsModel brandModel)
        //{
        //    var ctx = new AKOWModelEntities();
        //    bool results = false;
        //    var errorBiz = new ErrorHandlerControlDAL();

        //    using (var transaction = ctx.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            var AddModel = new MAS_BRAND_LABOR_COSTS();
        //            var CreateDate = DateTime.Now;

        //            AddModel.BrandID = brandModel.BrandID;
        //            AddModel.ProductID = brandModel.ProductID;
        //            AddModel.ModelID = brandModel.ModelID;
        //            //AddModel.Price = brandModel.Price;
        //            //AddModel.LaborCostSmall = brandModel.LaborCostSmall;
        //            //AddModel.LaborCostMedium = (decimal)brandModel.LaborCostMedium;
        //            //AddModel.LaborCostLarge = (decimal)brandModel.LaborCostLarge;
        //            //AddModel.LaborCostXLarge = brandModel.LaborCostXLarge;
        //            //AddModel.DealerPrice = brandModel.DealerPrice;
        //            //AddModel.DealerPriceType = brandModel.DealerPriceType;
        //            AddModel.LaborCostSoftware = brandModel.LaborCostSoftware;
        //            AddModel.LaborCostHardware = brandModel.LaborCostHardware;
        //            AddModel.DealerDiscount = brandModel.DealerDiscount;
        //           // AddModel.DealerDiscountType = brandModel.DealerDiscountType;
        //            AddModel.ProductSizeID = brandModel.ProductSizeID;
        //            AddModel.MinimumPrice = brandModel.MinimumPrice;
        //            AddModel.CreatedDate = CreateDate;
        //            AddModel.CreatedBy = brandModel.CreatedBy;
        //            AddModel.UpdatedDate = CreateDate;
        //            AddModel.UpdatedBy = brandModel.UpdatedBy;

        //            ctx.MAS_BRAND_LABOR_COSTS.Add(AddModel);
        //            ctx.SaveChanges();

        //            transaction.Commit();
        //            results = true;
        //        }
        //        catch (Exception ex)
        //        {
        //            transaction.Rollback();
        //            errorBiz.WriteLog(ex);
        //            throw ex;
        //        }
        //    }

        //    return results;
        //}
        //public bool EditServiceCost(BrandLaborCostsModel brandModel)
        //{
        //    var ctx = new AKOWModelEntities();
        //    bool results = false;
        //    var errorBiz = new ErrorHandlerControlDAL();

        //    using (var transaction = ctx.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            var editModel = ctx.MAS_BRAND_LABOR_COSTS.Where(c => c.ID == brandModel.ID).FirstOrDefault();
        //            var UpdateDate = DateTime.Now;

        //            if (editModel != null)
        //            {

        //                //editModel.Price = brandModel.Price;
        //                //editModel.LaborCostSmall = brandModel.LaborCostSmall;
        //                //editModel.LaborCostMedium = (decimal)brandModel.LaborCostMedium;
        //                //editModel.LaborCostLarge = (decimal)brandModel.LaborCostLarge;
        //                //editModel.LaborCostXLarge = brandModel.LaborCostXLarge;
        //                //editModel.DealerPrice = brandModel.DealerPrice;
        //                //editModel.DealerPriceType = brandModel.DealerPriceType;
        //                editModel.LaborCostHardware = brandModel.LaborCostHardware;
        //                editModel.LaborCostSoftware = brandModel.LaborCostSoftware;
        //                editModel.DealerDiscount = brandModel.DealerDiscount;
        //                editModel.MinimumPrice = brandModel.MinimumPrice;
        //                editModel.UpdatedDate = UpdateDate;
        //                editModel.UpdatedBy = brandModel.UpdatedBy;

        //                ctx.SaveChanges();
        //            }

        //            transaction.Commit();
        //            results = true;
        //        }
        //        catch (Exception ex)
        //        {
        //            transaction.Rollback();
        //            errorBiz.WriteLog(ex);
        //            throw ex;
        //        }
        //    }

        //    return results;
        //}
        //public bool DelServiceCost(int ID)
        //{
        //    bool results = false;
        //    var errorBiz = new ErrorHandlerControlDAL();

        //    using (AKOWModelEntities ctx = new AKOWModelEntities())
        //    {
        //        using (var transaction = ctx.Database.BeginTransaction())
        //        {
        //            try
        //            {
        //                var delResult = ctx.MAS_BRAND_LABOR_COSTS.Where(c => c.ID == ID).First();
        //                ctx.MAS_BRAND_LABOR_COSTS.Remove(delResult);
        //                ctx.SaveChanges();

        //                transaction.Commit();
        //                results = true;
        //            }
        //            catch (Exception ex)
        //            {
        //                transaction.Rollback();
        //                errorBiz.WriteLog(ex);
        //                throw ex;
        //            }
        //        }
        //    }

        //    return results;
        //}

        //public BrandLaborCostsModel GetLaborCostByID(int ID)
        //{
        //    MAS_BRAND_LABOR_COSTS entity = ctx.MAS_BRAND_LABOR_COSTS.Where(b => b.ID == ID).FirstOrDefault();

        //    BrandLaborCostsModel model = new BrandLaborCostsModel();

        //    model.ID = entity.ID;
        //    model.BrandID = entity.BrandID;

        //    model.ProductID = entity.ProductID;

        //    model.ModelID = entity.ModelID;
        //    model.ModelName = entity.MAS_MODELS != null ? entity.MAS_MODELS.Name : null;

        //    model.ProductID = entity.ProductID;
        //    model.ProductName = entity.MAS_PRODUCTS != null ? entity.MAS_PRODUCTS.Name : null;
        //    model.ProductSizeID = entity.ProductSizeID;
        //    //model.Price = entity.Price;
        //    //model.LaborCostSmall = entity.LaborCostSmall;
        //    //model.LaborCostMedium = entity.LaborCostMedium;
        //    //model.LaborCostLarge = entity.LaborCostLarge;
        //    //model.LaborCostXLarge = entity.LaborCostXLarge;
        //    //model.DealerPrice = entity.DealerPrice;
        //    //model.DealerPriceType = entity.DealerPriceType;
        //    model.LaborCostHardware = entity.LaborCostHardware;
        //    model.LaborCostSoftware = entity.LaborCostSoftware;
        //    model.MaximumPrice = entity.MaximumPrice;
        //    model.MinimumPrice = entity.MinimumPrice;

        //    model.DealerDiscount = entity.DealerDiscount;
        //    model.DealerDiscountType = entity.DealerDiscountType;

        //    model.CreatedBy = entity.CreatedBy;
        //    model.CreatedDate = entity.CreatedDate;
        //    model.UpdatedBy = entity.UpdatedBy.Value;
        //    model.UpdatedDate = entity.UpdatedDate.Value;

        //    return model;

        //}

        //public bool CheckExistingBrand(BrandLaborCostsModel brandModel, string mode)
        //{
        //    using (CLAIMEntities context = new CLAIMEntities())
        //    {
        //        var errorBiz = new ErrorHandlerControlDAL();
        //        try
        //        {
        //            List<MAS_BRAND_LABOR_COSTS> Model;
        //            if (mode == "Add")
        //                if(brandModel.ModelID!=null)
        //                    Model = context.MAS_BRAND_LABOR_COSTS.Where(s => s.BrandID == brandModel.BrandID && s.ProductID == brandModel.ProductID && s.ModelID == brandModel.ModelID && s.ProductSizeID == brandModel.ProductSizeID).ToList<MAS_BRAND_LABOR_COSTS>();
        //                else
        //                    Model = context.MAS_BRAND_LABOR_COSTS.Where(s => s.BrandID == brandModel.BrandID && s.ProductID == brandModel.ProductID && s.ModelID == null && s.ProductSizeID == brandModel.ProductSizeID).ToList<MAS_BRAND_LABOR_COSTS>();

        //            else
        //                if (brandModel.ModelID != null)
        //                    Model = context.MAS_BRAND_LABOR_COSTS.Where(s => s.ID != brandModel.ID && s.BrandID == brandModel.BrandID && s.ProductID == brandModel.ProductID && s.ModelID == brandModel.ModelID && s.ProductSizeID == brandModel.ProductSizeID).ToList<MAS_BRAND_LABOR_COSTS>();
        //                else
        //                    Model = context.MAS_BRAND_LABOR_COSTS.Where(s => s.ID != brandModel.ID && s.BrandID == brandModel.BrandID && s.ProductID == brandModel.ProductID && s.ModelID == null && s.ProductSizeID == brandModel.ProductSizeID).ToList<MAS_BRAND_LABOR_COSTS>();

        //            if (Model != null && Model.Count() > 0) return true;
        //        }
        //        catch (Exception ex)
        //        {
        //            errorBiz.WriteLog(ex);
        //            throw ex;
        //        }

        //        return false;
        //    }
        //}

        //#region RepairLevel
        //public List<BrandRepairLevelModel> GetRepairLevel(int? PageIndex, int? PageSize, string Sort, int BrandId)
        //{
        //    var entityList = ctx.uspGetBrandRepairLevel(PageIndex, PageSize, Sort, BrandId).ToList();

        //    List<BrandRepairLevelModel> outputList = new List<BrandRepairLevelModel>();

        //    var MaxSEQ = 0;
        //    var MinSEQ = 0;

        //    if(entityList.Count>0)
        //    {
        //         MaxSEQ = entityList.Max(c => c.LevelsSeq);
        //         MinSEQ = entityList.Min(c => c.LevelsSeq);
        //    }
         

        //    foreach (var entity in entityList)
        //    {
        //        BrandRepairLevelModel output = new BrandRepairLevelModel();
        //        output.RowNumber = entity.RowNumber;
        //        output.RecordCount = entity.RecordCount;
        //        output.ID = entity.ID;
        //        output.Name = entity.Name;
        //        output.Description = entity.Description;
        //        output.LevelsSeq = entity.LevelsSeq;
        //        output.BrandID = entity.BrandID;
        //        output.MaxSEQ = (byte)MaxSEQ;
        //        output.MinSEQ = (byte)MinSEQ;
        //        output.MaxFlag = entity.LevelsSeq == MaxSEQ ? true : false;
        //        output.MinFlag = entity.LevelsSeq == MinSEQ ? true : false;


        //        outputList.Add(output);
        //    }

        //    return outputList;
        //}

        //public BrandRepairLevelModel GetRepairLevelByID(int ID)
        //{
        //    MAS_BRAND_REPAIR_LEVELS entity = ctx.MAS_BRAND_REPAIR_LEVELS.Where(b => b.ID == ID).FirstOrDefault();

        //    BrandRepairLevelModel model = new BrandRepairLevelModel();

        //    model.ID = entity.ID;
        //    model.BrandID = entity.BrandID;
        //    model.Description = entity.Description;
        //    model.LevelsSeq = entity.LevelsSeq;
        //    model.Name = entity.Name;

        //    model.CreatedBy = entity.CreatedBy;
        //    model.CreatedDate = entity.CreatedDate;
        //    model.UpdatedBy = entity.UpdatedBy;
        //    model.UpdatedDate = entity.UpdatedDate;

        //    return model;

        //}

        //public bool AddRepairLevel(BrandRepairLevelModel brandModel)
        //{
        //    var ctx = new AKOWModelEntities();
        //    bool results = false;
        //    var errorBiz = new ErrorHandlerControlDAL();

        //    using (var transaction = ctx.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            var AddModel = new MAS_BRAND_REPAIR_LEVELS();
        //            var CreateDate = DateTime.Now;

        //            AddModel.BrandID = brandModel.BrandID;
        //            AddModel.Name = brandModel.Name;
        //            AddModel.LevelsSeq = GetMaxRepairLevel(brandModel.BrandID);
        //            AddModel.Description = brandModel.Description;
        //            AddModel.CreatedDate = CreateDate;
        //            AddModel.CreatedBy = brandModel.CreatedBy;
        //            AddModel.UpdatedDate = CreateDate;
        //            AddModel.UpdatedBy = brandModel.UpdatedBy;

        //            ctx.MAS_BRAND_REPAIR_LEVELS.Add(AddModel);
        //            ctx.SaveChanges();

        //            transaction.Commit();
        //            results = true;
        //        }
        //        catch (Exception ex)
        //        {
        //            transaction.Rollback();
        //            errorBiz.WriteLog(ex);
        //            throw ex;
        //        }
        //    }

        //    return results;
        //}
        //public bool EditRepairLevel(BrandRepairLevelModel brandModel)
        //{
        //    var ctx = new AKOWModelEntities();
        //    bool results = false;
        //    var errorBiz = new ErrorHandlerControlDAL();

        //    using (var transaction = ctx.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            var editModel = ctx.MAS_BRAND_REPAIR_LEVELS.Where(c => c.ID == brandModel.ID).FirstOrDefault();
        //            var UpdateDate = DateTime.Now;

        //            if (editModel != null)
        //            {

        //                editModel.Name = brandModel.Name;
        //                editModel.Description = brandModel.Description;
        //                editModel.UpdatedDate = UpdateDate;
        //                editModel.UpdatedBy = brandModel.UpdatedBy;

        //                ctx.SaveChanges();
        //            }

        //            transaction.Commit();
        //            results = true;
        //        }
        //        catch (Exception ex)
        //        {
        //            transaction.Rollback();
        //            errorBiz.WriteLog(ex);
        //            throw ex;
        //        }
        //    }

        //    return results;
        //}
        //public bool DelRepairLevel(int ID)
        //{
        //    bool results = false;
        //    var errorBiz = new ErrorHandlerControlDAL();

        //    using (CLAIMEntities ctx = new CLAIMEntities())
        //    {
        //        using (var transaction = ctx.Database.BeginTransaction())
        //        {
        //            try
        //            {
        //                var delResult = ctx.MAS_BRAND_REPAIR_LEVELS.Where(c => c.ID == ID).First();
        //                ctx.MAS_BRAND_REPAIR_LEVELS.Remove(delResult);
        //                ctx.SaveChanges();

        //                transaction.Commit();
        //                results = true;
        //            }
        //            catch (Exception ex)
        //            {
        //                transaction.Rollback();
        //                errorBiz.WriteLog(ex);
        //                throw ex;
        //            }
        //        }
        //    }

        //    return results;
        //}

        //public bool CheckExistingRepairLevel(BrandRepairLevelModel brandModel, string mode)
        //{
        //    using (CLAIMEntities context = new CLAIMEntities())
        //    {
        //        var errorBiz = new ErrorHandlerControlDAL();
        //        try
        //        {
        //            List<MAS_BRAND_REPAIR_LEVELS> Model;
        //            if (mode == "Add")
        //            {

        //                Model = context.MAS_BRAND_REPAIR_LEVELS.Where(s => s.BrandID == brandModel.BrandID && s.Name.ToUpper().Trim() == brandModel.Name.ToUpper().Trim()).ToList<MAS_BRAND_REPAIR_LEVELS>();
        //            }
        //            else
        //            {
        //                Model = context.MAS_BRAND_REPAIR_LEVELS.Where(s => s.ID != brandModel.ID && s.BrandID == brandModel.BrandID && s.Name.ToUpper().Trim() == brandModel.Name.ToUpper().Trim()).ToList<MAS_BRAND_REPAIR_LEVELS>();

        //            }

        //            if (Model != null && Model.Count() > 0) return true;
        //        }
        //        catch (Exception ex)
        //        {
        //            errorBiz.WriteLog(ex);
        //            throw ex;
        //        }

        //        return false;
        //    }
        //}

        //public Hashtable ValidateUpRepair(BrandRepairLevelModel brandModel)
        //{
        //    Hashtable hashtable = new Hashtable();
        //    var ctx = new CLAIMEntities();
        //    var errorBiz = new ErrorHandlerControlDAL();

        //    try
        //    {
        //        if (brandModel.LevelsSeq <= 0 ||
        //            brandModel.MinFlag == true)
        //        {
        //            hashtable.Add("Successfully", false);
        //            hashtable.Add("Data", null);
        //            hashtable.Add("Message", "Action อยู่ตำแหน่งแรกสุดอยู่แล้ว!");
        //            hashtable.Add("ResultType", (int)RESULT_TYPE.Warning);
        //            return hashtable;
        //        }

        //        hashtable.Add("Successfully", true);
        //        hashtable.Add("Data", null);
        //        hashtable.Add("Message", "การตรวจสอบความถูกต้องเรียบร้อย");
        //        hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
        //    }
        //    catch (Exception ex)
        //    {
        //        errorBiz.WriteLog(ex);
        //        throw ex;
        //    }

        //    return hashtable;
        //}
        //public Hashtable ValidateDownRepair(BrandRepairLevelModel brandModel)
        //{
        //    Hashtable hashtable = new Hashtable();
        //    var ctx = new CLAIMEntities();
        //    var errorBiz = new ErrorHandlerControlDAL();

        //    try
        //    {
        //        if (brandModel.MaxFlag == true)
        //        {
        //            hashtable.Add("Successfully", false);
        //            hashtable.Add("Data", null);
        //            hashtable.Add("Message", "Action อยู่ตำแหน่งสุดท้ายอยู่แล้ว!");
        //            hashtable.Add("ResultType", (int)RESULT_TYPE.Warning);
        //            return hashtable;
        //        }

        //        hashtable.Add("Successfully", true);
        //        hashtable.Add("Data", null);
        //        hashtable.Add("Message", "การตรวจสอบความถูกต้องเรียบร้อย");
        //        hashtable.Add("ResultType", (int)RESULT_TYPE.Normal);
        //    }
        //    catch (Exception ex)
        //    {
        //        errorBiz.WriteLog(ex);
        //        throw ex;
        //    }

        //    return hashtable;
        //}

        //public short GetMaxRepairLevel(int BrandID)
        //{
        //    var ctx = new CLAIMEntities();
        //    var errorBiz = new ErrorHandlerControlDAL();
        //    short MaxSeq = 0;

        //    using (var transaction = ctx.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            var Model = ctx.MAS_BRAND_REPAIR_LEVELS.Where(m => m.BrandID == BrandID).OrderByDescending(m => m.LevelsSeq).ToList();
        //            if (Model.Count > 0)
        //            {
        //                MaxSeq = Model.FirstOrDefault().LevelsSeq;
        //            }
        //            MaxSeq++;

        //        }
        //        catch (Exception ex)
        //        {
        //            transaction.Rollback();
        //            errorBiz.WriteLog(ex);
        //            throw ex;
        //        }
        //    }

        //    return MaxSeq;
        //}

        //public bool UpValidateUpRepairList(BrandRepairLevelModel brandModel)
        //{
        //    var errorBiz = new ErrorHandlerControlDAL();
        //    CLAIMEntities ctx = new CLAIMEntities();
        //    bool results = false;

        //    try
        //    {
        //        var upChecklistAction = ctx.MAS_BRAND_REPAIR_LEVELS.Where(m => m.ID == brandModel.ID).FirstOrDefault();
        //        var swapChecklistAction = ctx.MAS_BRAND_REPAIR_LEVELS.Where(m => m.BrandID == brandModel.BrandID && m.LevelsSeq < brandModel.LevelsSeq).OrderByDescending(c => c.LevelsSeq).FirstOrDefault();

        //        var swapSEQ = swapChecklistAction.LevelsSeq;
        //        var UpdateDate = DateTime.Now;

        //        if (upChecklistAction != null)
        //        {
        //            upChecklistAction.LevelsSeq = swapChecklistAction.LevelsSeq;
        //            upChecklistAction.UpdatedDate = UpdateDate;
        //            upChecklistAction.UpdatedBy = brandModel.UpdatedBy;

        //            ctx.SaveChanges();
        //        }

        //        if (swapChecklistAction != null)
        //        {
        //            swapChecklistAction.LevelsSeq = brandModel.LevelsSeq;
        //            swapChecklistAction.UpdatedDate = UpdateDate;
        //            swapChecklistAction.UpdatedBy = brandModel.UpdatedBy;

        //            ctx.SaveChanges();
        //        }

        //        results = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        errorBiz.WriteLog(ex);
        //        throw ex;
        //    }

        //    return results;
        //}
        //public bool DownValidateRepairList(BrandRepairLevelModel brandModel)
        //{
        //    var errorBiz = new ErrorHandlerControlDAL();
        //    CLAIMEntities ctx = new CLAIMEntities();
        //    bool results = false;

        //    try
        //    {
        //        var downChecklistAction = ctx.MAS_BRAND_REPAIR_LEVELS.Where(m => m.ID == brandModel.ID).FirstOrDefault();
        //        var swapChecklistAction = ctx.MAS_BRAND_REPAIR_LEVELS.Where(m => m.BrandID == brandModel.BrandID && m.LevelsSeq > brandModel.LevelsSeq).OrderBy(c => c.LevelsSeq).FirstOrDefault();

        //        var swapSEQ = downChecklistAction.LevelsSeq;
        //        var UpdateDate = DateTime.Now;

        //        if (downChecklistAction != null)
        //        {
        //            downChecklistAction.LevelsSeq = swapChecklistAction.LevelsSeq;
        //            downChecklistAction.UpdatedDate = UpdateDate;
        //            downChecklistAction.UpdatedBy = brandModel.UpdatedBy;

        //            ctx.SaveChanges();
        //        }

        //        if (swapChecklistAction != null)
        //        {
        //            swapChecklistAction.LevelsSeq = swapSEQ;
        //            swapChecklistAction.UpdatedDate = UpdateDate;
        //            swapChecklistAction.UpdatedBy = brandModel.UpdatedBy;

        //            ctx.SaveChanges();
        //        }

        //        results = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        errorBiz.WriteLog(ex);
        //        throw ex;
        //    }

        //    return results;
        //}
        //#endregion

        //public List<SelectType> GetBrandRepairLevel(int BrandID)
        //{
        //    List<SelectType> output;
        //    var entityList = (from temp in ctx.MAS_BRAND_REPAIR_LEVELS where temp.BrandID == BrandID
        //                      orderby temp.LevelsSeq
        //                      select new SelectType
        //                      {
        //                          ID = temp.ID,
        //                          Text = temp.Name
        //                      });
        //    output = entityList.ToList();
        //    return output;
        //}

    }


}
