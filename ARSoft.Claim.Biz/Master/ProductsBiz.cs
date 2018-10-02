// using ARSoft.AKOW.Model.EntityFramework;
using ARSoft.Claim.DAL.Master;
using ARSoft.Claim.DataModel;
using ARSoft.Claim.Model.BOL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace ARSoft.Claim.Biz.Master
{
    public class ProductsBiz
    {
        private ProductsDAL objDAL;
        public ProductsBiz()
        {
            objDAL = new ProductsDAL();
        }

        public List<SelectType> getDDLProductsGroup()
        {
            return objDAL.getDDLProductsGroup();
        }

        public List<SelectType> getDDLProducts()
        {
            return objDAL.getDDLProducts();
        }

        //public List<SelectType> getDDLProductsByJob(int? jobID)
        //{
        //    return objDAL.getDDLProductsByJob(jobID);
        //}

        public List<ProductsModel> GetProductsList(int? PageIndex, int? PageSize, string Sort, SearchProductsModel searchProductsModel)
        {
            return objDAL.GetProductsList(PageIndex, PageSize, Sort, searchProductsModel);
        }

        public bool addProduct(ProductsModel productModel)
        {
            return objDAL.addProduct(productModel);
        }

        public bool delProduct(int ID)
        {
            return objDAL.delProduct(ID);
        }

        public bool editProduct(ProductsModel productModel)
        {
            return objDAL.editProduct(productModel);
        }

        public ProductsModel GetProById(int ID)
        {
            return objDAL.GetProById(ID);
        }

        //public bool AddAccessoriesInProduct(ProductAccessoriesModel productAccessoriesModel, AKOWModelEntities context)
        //{
        //    return objDAL.AddAccessoriesInProduct(productAccessoriesModel, context);
        //}

        //public bool UpdateAccessoriesInProduct(ProductAccessoriesModel productAccessoriesModel, AKOWModelEntities context)
        //{
        //    return objDAL.UpdateAccessoriesInProduct(productAccessoriesModel, context);
        //}

        //public List<CheckboxDataItem> GetAccessoriesList(int productID)
        //{
        //    return objDAL.GetAccessoriesList(productID);
        //}


    }
}
