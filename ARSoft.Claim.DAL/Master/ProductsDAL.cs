using System;
using System.Web;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.EntityFramework;
using ARSoft.Claim.DAL.ErrorHandler;
using ARSoft.Claim.DataModel;

namespace ARSoft.Claim.DAL.Master
{
    public class ProductsDAL
    {
        public List<SelectType> getDDLProductsGroup()
        {
            List<SelectType> output;

            using (var ctx = new CLAIMEntities())
            {
                var entityList = (from pGroup in ctx.MAS_PRODUCT_GROUPS
                                  where pGroup.Status == 1
                                  orderby pGroup.Name
                                  select new SelectType
                                  {
                                      ID = pGroup.ID,
                                      Text = pGroup.Name
                                      //  Value = pGroup.ID.ToString()
                                  });
                output = entityList.ToList();
            }


            return output;
        }
        public List<SelectType> getDDLProducts()
        {

            List<SelectType> output;
            using (var ctx = new CLAIMEntities())
            {
                var entityList = (from pProduct in ctx.MAS_PRODUCTS
                                  where pProduct.Status == 1
                                  orderby pProduct.Name
                                  select new SelectType
                                  {
                                      ID = pProduct.ID,
                                      Text = pProduct.Name
                                      //  Value = pProduct.ID.ToString()
                                  });
                output = entityList.ToList();
            }
            return output;
        }
        //public List<SelectType> getDDLProductsByJob(int? jobID)
        //{
        //    List<SelectType> output = new List<SelectType>();
        //    using (var ctx = new InventoryEntities())
        //    {
        //        if (jobID != null)
        //        {
        //            List<TRN_JOB_EQUIPMENT_ITEMS> itemList = ctx.TRN_JOB_EQUIPMENT_ITEMS.Where(s => s.JobID == jobID).OrderBy(s => s.SerialNumber).ToList<TRN_JOB_EQUIPMENT_ITEMS>();

        //            var item = new SelectType();
        //            foreach (var row in itemList.GroupBy(m => m.MAS_EQUIPMENT_ITEMS1.ProductID))
        //            {
        //                var firstItem = row.FirstOrDefault();
        //                item = new SelectType();
        //                item.ID = (int)firstItem.MAS_EQUIPMENT_ITEMS1.ProductID;
        //                item.Text = firstItem.MAS_EQUIPMENT_ITEMS1.MAS_PRODUCTS.Name;
        //                output.Add(item);
        //            }

        //            if (itemList.Count > 0 && itemList[0].MAS_EQUIPMENT_ITEMS != null)
        //            {
        //                foreach (var row in itemList.GroupBy(m => m.MAS_EQUIPMENT_ITEMS.ProductID))
        //                {
        //                    var firstItem = row.FirstOrDefault();
        //                    if (output.Exists(c => c.ID != firstItem.MAS_EQUIPMENT_ITEMS.ProductID))
        //                    {
        //                        item = new SelectType();
        //                        item.ID = (int)firstItem.MAS_EQUIPMENT_ITEMS.ProductID;
        //                        item.Text = firstItem.MAS_EQUIPMENT_ITEMS.MAS_PRODUCTS.Name;
        //                        output.Add(item);
        //                    }
        //                }
        //            }
        //        }
        //    }

        //    return output;
        //}

        public List<ProductsModel> GetProductsList(int? PageIndex, int? PageSize, string Sort, SearchProductsModel searchProductsModel)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var errorBiz = new ErrorHandlerControlDAL();
                var listOfProduct = new List<ProductsModel>();

                try
                {

                    var masterProducts = context.uspGetProducts(PageIndex, PageSize, Sort, searchProductsModel.ProductName, searchProductsModel.ProductGroupID);
                    if (masterProducts == null) return null;

                    foreach (var row in masterProducts.ToList())
                    {
                        var item = new ProductsModel();
                        item.RowNumber = row.RowNumber;
                        item.RecordCount = row.RecordCount;
                        item.ID = row.ID;
                        item.Code = row.Code;
                        item.Name = row.Name;
                        item.Description = row.Description;
                        item.ProductGroupID = row.ProductGroupID ?? 0;
                        item.ProductGroupName = row.ProductGroupName;
                        item.Status = row.Status;
                        item.StatusName = row.Status == 1 ? "ใช้งาน" : "ไม่ใช้งาน";
                        listOfProduct.Add(item);
                    }
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return listOfProduct;
            }
        }

        public bool addProduct(ProductsModel productModel)
        {
            var ctx = new CLAIMEntities();
            bool results = false;
            var errorBiz = new ErrorHandlerControlDAL();

            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    var addPro = new MAS_PRODUCTS();
                    var CreateDate = DateTime.Now;

                    addPro.Code = productModel.Code;
                    addPro.Name = productModel.Name;
                    addPro.Description = productModel.Description;
                    addPro.ProductGroupID = productModel.ProductGroupID;
                    addPro.SpecificSymptomCode = productModel.SpecificSymptomCode;
                    addPro.SpecificRepairCode = productModel.SpecificRepairCode;
                    addPro.SpecificCode = productModel.SpecificCode;
                    //addPro.RequestSizeOnJob = productModel.RequestSizeOnJob;
                    addPro.BundleSoftware = productModel.BundleSoftware;
                    //addPro.MessageOnJob = productModel.MessageOnJob;
                    //addPro.LaborCostSmall = productModel.LaborCostSmall;
                    //addPro.LaborCostMedium = productModel.LaborCostMedium;
                    //addPro.LaborCostLarge = productModel.LaborCostLarge;
                    //addPro.LaborCostXLarge = productModel.LaborCostXLarge;
                    addPro.Status = productModel.Status;
                    addPro.CreatedDate = CreateDate;
                    addPro.CreatedBy = productModel.CreatedBy;
                    addPro.UpdatedDate = CreateDate;
                    addPro.UpdatedBy = productModel.UpdatedBy;

                    ctx.MAS_PRODUCTS.Add(addPro);
                    ctx.SaveChanges();
                    transaction.Commit();
                    results = true;
                    //int productID = ctx.MAS_PRODUCTS.OrderByDescending(t => t.ID).FirstOrDefault().ID;
                    //if (this.HandleAddProductLaborCosts(ctx, productModel.ProductLaborCostsList, productID))
                    //{
                    //    transaction.Commit();
                    //    results = true;
                    //}
                    //else
                    //{
                    //    transaction.Rollback();
                    //    results = false;
                    //}                    
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    errorBiz.WriteLog(ex);
                    throw ex;
                }
            }

            return results;
        }



        public bool delProduct(int ID)
        {
            bool results = false;
            var errorBiz = new ErrorHandlerControlDAL();

            using (CLAIMEntities ctx = new CLAIMEntities())
            {
                using (var transaction = ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var delResult = ctx.MAS_PRODUCTS.Where(c => c.ID == ID).First();
                        ctx.MAS_PRODUCTS.Remove(delResult);
                        ctx.SaveChanges();

                        //if (!this.DeleteProductLaborCostsByProductID(ctx, ID))
                        //{
                        //    transaction.Rollback();
                        //    return false;
                        //}

                        transaction.Commit();
                        results = true;
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        errorBiz.WriteLog(ex);
                        throw ex;
                    }
                }
            }

            return results;
        }
        public bool editProduct(ProductsModel productModel)
        {
            var ctx = new CLAIMEntities();
            bool results = false;
            var errorBiz = new ErrorHandlerControlDAL();

            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    var editPro = ctx.MAS_PRODUCTS.Where(c => c.ID == productModel.ID).FirstOrDefault();
                    var UpdateDate = DateTime.Now;

                    if (editPro != null)
                    {
                        editPro.Code = productModel.Code;
                        editPro.Name = productModel.Name;
                        editPro.Description = productModel.Description;
                        editPro.ProductGroupID = productModel.ProductGroupID == 0 ? editPro.ProductGroupID : productModel.ProductGroupID;
                        editPro.SpecificSymptomCode = productModel.SpecificSymptomCode;
                        editPro.SpecificRepairCode = productModel.SpecificRepairCode;
                        editPro.SpecificCode = productModel.SpecificCode;
                        //editPro.RequestSizeOnJob = productModel.RequestSizeOnJob;
                        editPro.BundleSoftware = productModel.BundleSoftware;
                        //editPro.MessageOnJob = productModel.MessageOnJob;
                        //editPro.LaborCostSmall = productModel.LaborCostSmall;
                        //editPro.LaborCostMedium = productModel.LaborCostMedium;
                        //editPro.LaborCostLarge = productModel.LaborCostLarge;
                        //editPro.LaborCostXLarge = productModel.LaborCostXLarge;
                        editPro.Status = productModel.Status;
                        editPro.UpdatedDate = UpdateDate;
                        editPro.UpdatedBy = productModel.UpdatedBy;

                        //if (!this.HandleUpdateProductLaborCosts(ctx, productModel.ProductLaborCostsList, productModel.ID))
                        //{
                        //    transaction.Rollback();
                        //    return false;
                        //}

                        //for (int index = 0; index < productModel.AccessoriesList.Count; index++)
                        //{
                        //    var itemsub = new ProductAccessoriesModel();
                        //   // itemsub.ID = Convert.ToInt32(productModel.AccessoriesList[index].Value);
                        //    itemsub.ProductID = productModel.ID;
                        //    itemsub.AccessoriesID = Convert.ToInt32(productModel.AccessoriesList[index].Value);
                        //    itemsub.Include = productModel.AccessoriesList[index].Selected;
                        //    var checkExist = editPro.MAS_PRODUCT_ACCESSORIES.Where(m => m.AccessoriesID == itemsub.AccessoriesID).ToList();

                        //    if (checkExist.Count() < 1)
                        //        this.AddAccessoriesInProduct(itemsub, ctx);
                        //    else
                        //        this.UpdateAccessoriesInProduct(itemsub, ctx);
                        //}

                        ctx.SaveChanges();
                    }

                    transaction.Commit();
                    results = true;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    errorBiz.WriteLog(ex);
                    throw ex;
                }
            }

            return results;
        }

        //public List<ProductSizeModel> getProductSizeAll()
        //{
        //    using (AKOWModelEntities context = new AKOWModelEntities())
        //    {
        //        var errorBiz = new ErrorHandlerControlDAL();
        //        List<ProductSizeModel> listOfProductSize;

        //        try
        //        {
        //            var entityList = (from p in context.MAS_PRODUCT_SIZE
        //                              orderby p.ID
        //                              select new ProductSizeModel
        //                              {
        //                                  ID = p.ID,
        //                                  Name = p.Name,
        //                                  DisplayName = p.DisplayName,
        //                                  DefaultSize = (bool)p.DefaultSize,
        //                                  Status = p.Status == 1 ? true : false
        //                              });

        //            listOfProductSize = entityList.ToList();

        //            return listOfProductSize;
        //        }
        //        catch (Exception ex)
        //        {
        //            errorBiz.WriteLog(ex);
        //            throw ex;
        //        }
        //    }
        //}

        //public List<ProductLaborCostsModel> GetProductLaborCostsList(int productID)
        //{
        //    using (AKOWModelEntities context = new AKOWModelEntities())
        //    {               
        //        var errorBiz = new ErrorHandlerControlDAL();
        //        List<ProductLaborCostsModel> listOfProductLaborCosts = null;

        //        try
        //        {                        
        //            var entityList = (from p in context.MAS_PRODUCT_LABOR_COSTS
        //                              where p.ProductID==productID
        //                              orderby p.ProductSizeID
        //                              select new ProductLaborCostsModel
        //                              {
        //                                  ID = p.ID,
        //                                  ProductID = p.ProductID,
        //                                  ProductSizeID = p.ProductSizeID,
        //                                  DefaltSize = p.DefaltSize,
        //                                  DisplaySizeText = p.DisplaySizeText,
        //                                  LaborCostHardware = p.LaborCostHardware,
        //                                  LaborCostSoftwareware = p.LaborCostSoftwareware,
        //                                  DealerDiscount = p.DealerDiscount,
        //                                  DealerDiscountType = p.DealerDiscountType,
        //                                  MaximumPrice = p.MaximumPrice,
        //                                  MinimumPrice = p.MinimumPrice,
        //                                  CreatedBy = p.CreatedBy,
        //                                  CreatedDate = p.CreatedDate,
        //                                  UpdatedBy = p.UpdatedBy,
        //                                  UpdatedDate = p.UpdatedDate                                          
        //                              });

        //            listOfProductLaborCosts = entityList.ToList();
        //            return listOfProductLaborCosts;
        //        }
        //        catch (Exception ex)
        //        {
        //            errorBiz.WriteLog(ex);
        //            throw ex;
        //        }                
        //    }                      
        //}

        //public bool DeleteProductLaborCostsByProductID(AKOWModelEntities context, int productID)
        //{
        //    bool results = false;
        //    var errorBiz = new ErrorHandlerControlDAL();
        //    try
        //    {
        //        context.MAS_PRODUCT_LABOR_COSTS.RemoveRange(context.MAS_PRODUCT_LABOR_COSTS.Where(t => t.ProductID == productID));
        //        results = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        errorBiz.WriteLog(ex);
        //        throw ex;
        //    }
        //    return results;
        //}

        public ProductsModel GetProById(int ID)
        {
            var ctx = new CLAIMEntities();
            var productEntity = new MAS_PRODUCTS();
            var item = new ProductsModel();
            var errorBiz = new ErrorHandlerControlDAL();

            try
            {
                productEntity = ctx.MAS_PRODUCTS.Where(c => c.ID == ID).First();

                item.ID = productEntity.ID;
                item.Code = productEntity.Code;
                item.Name = productEntity.Name;
                item.Description = productEntity.Description;
                item.ProductGroupID = productEntity.ProductGroupID;
                item.SpecificSymptomCode = productEntity.SpecificSymptomCode;
                item.SpecificRepairCode = productEntity.SpecificRepairCode;
                item.SpecificCode = productEntity.SpecificCode;
                //item.RequestSizeOnJob = productEntity.RequestSizeOnJob;
                item.BundleSoftware = (bool)productEntity.BundleSoftware;

                //item.MessageOnJob = Pro.MessageOnJob;
                //item.LaborCostSmall = Pro.LaborCostSmall;
                //item.LaborCostMedium = Pro.LaborCostMedium;
                //item.LaborCostLarge = Pro.LaborCostLarge;
                //item.LaborCostXLarge = Pro.LaborCostXLarge;

                item.Status = productEntity.Status;
                item.StatusName = productEntity.Status == 1 ? "ใช้งาน" : "ไม่ใช้งาน";
                item.CreatedBy = productEntity.CreatedBy;
                item.CreatedDate = productEntity.CreatedDate;
                item.UpdatedBy = productEntity.UpdatedBy;
                item.UpdateDate = productEntity.UpdatedDate;
                //item.ProductLaborCostsList = this.GetProductLaborCostsList(productEntity.ID);

                //if (item.ProductLaborCostsList.Count() > 0)
                //    item.IsHasProductLaborCosts = true;
                //else
                //    item.IsHasProductLaborCosts = false;

                //var AccessoriesList = ctx.MAS_ACCESSORIES.Where(t => t.Status == 1).ToList();
                ////   int index = 1;

                //foreach (var sresult in AccessoriesList)
                //{
                //    var itemsub = new ProductAccessoriesModel();
                //    var checkExist = productEntity.MAS_PRODUCT_ACCESSORIES.Where(m => m.AccessoriesID == sresult.ID).ToList();
                //    //   itemsub.Seq = index;
                //    //itemsub.ID = sresult.ID;
                //    itemsub.ProductID = productEntity.ID;
                //    itemsub.AccessoriesID = sresult.ID;
                //    itemsub.AccessoriesName = sresult.Name;
                //    itemsub.Include = checkExist.Count() > 0 ? checkExist.FirstOrDefault().Include : false;
                //    if (checkExist.Count()<1)
                //        this.AddAccessoriesInProduct(itemsub, ctx);
                //    else
                //        this.UpdateAccessoriesInProduct(itemsub, ctx);

                //}
                //item.AccessoriesList = GetAccessoriesList(ID);
                //GetAccessoriesList
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return item;
        }
        //public bool AddAccessoriesInProduct(ProductAccessoriesModel productAccessoriesModel, AKOWModelEntities context)
        //{
        //    bool result = false;
        //    var errorBiz = new ErrorHandlerControlDAL();
        //    try
        //    {
        //        MAS_PRODUCT_ACCESSORIES model = new MAS_PRODUCT_ACCESSORIES();

        //        model.ProductID = productAccessoriesModel.ProductID;
        //        model.AccessoriesID = productAccessoriesModel.AccessoriesID;
        //        model.Include = productAccessoriesModel.Include;

        //        context.MAS_PRODUCT_ACCESSORIES.Add(model);
        //        context.SaveChanges();
        //        result = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        errorBiz.WriteLog(ex);
        //        throw ex;
        //    }

        //    return result;
        //}

        //public bool UpdateAccessoriesInProduct(ProductAccessoriesModel productAccessoriesModel, AKOWModelEntities context)
        //{
        //    bool result = false;
        //    var errorBiz = new ErrorHandlerControlDAL();
        //    try
        //    {
        //        var model = context.MAS_PRODUCT_ACCESSORIES.Where(s => s.ProductID == productAccessoriesModel.ProductID && s.AccessoriesID == productAccessoriesModel.AccessoriesID).FirstOrDefault();
        //        if (model != null)
        //        {
        //            model.Include = productAccessoriesModel.Include;
        //            context.SaveChanges();
        //            result = true;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        errorBiz.WriteLog(ex);
        //        throw ex;
        //    }

        //    return result;
        //}

        //public List<CheckboxDataItem> GetAccessoriesList(int productID)
        //{
        //    using (AKOWModelEntities context = new AKOWModelEntities())
        //    {
        //        List<CheckboxDataItem> listOfAcccessoriesItem = null;
        //        var errorBiz = new ErrorHandlerControlDAL();
        //        try
        //        {
        //            List<MAS_PRODUCT_ACCESSORIES> listOfAccessories = context.MAS_PRODUCT_ACCESSORIES.OrderBy(j => j.AccessoriesID).Where(m => m.ProductID == productID).ToList<MAS_PRODUCT_ACCESSORIES>();
        //            listOfAcccessoriesItem = new List<CheckboxDataItem>();

        //            foreach (var row in listOfAccessories)
        //            {
        //                var item = new CheckboxDataItem();
        //        //        item.ID = row.ID;
        //                item.Value = row.AccessoriesID.ToString();
        //                item.Text = row.MAS_ACCESSORIES.Name;

        //                if (row.Include)
        //                    item.Selected = true;
        //                else
        //                    item.Selected = false;

        //                listOfAcccessoriesItem.Add(item);
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            errorBiz.WriteLog(ex);
        //            throw ex;
        //        }

        //        return listOfAcccessoriesItem;
        //    }
        //}


    }
}
