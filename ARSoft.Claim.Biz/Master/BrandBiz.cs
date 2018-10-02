using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.Validation;
using System.Collections;
using ARSoft.AKOW.DAL.Master;
using ARSoft.Claim.DataModel;
using ARSoft.Claim.Model.BOL;

namespace ARSoft.AKOW.Biz.Master
{    
    public class BrandBiz
    {
        

        private BrandDAL objDAL;

        public BrandBiz()
        {
            objDAL = new BrandDAL();
        }

        public BrandModel Get(int ID)
        {
            return objDAL.Get(ID);
        }


        public List<BrandModel> GetAll(int? pageIndex, int? pageSize, string sort, BrandSearchModel searchModel)
        {
            return objDAL.GetAll(pageIndex, pageSize, sort, searchModel);
        }

        //public MAS_BRANDS ConvertToBrandEntity(BrandModel model)
        //{
        //    return objDAL.ConvertToBrandEntity(model);
        //}

        //public bool Add(MAS_BRANDS BrandEntity)
        //{
        //    return objDAL.Add(BrandEntity);
        //}

        //public bool AddByModel(BrandModel brandModel)
        //{
        //    return Add(ConvertToBrandEntity(brandModel));
        //}

        //public bool Update(MAS_BRANDS brandEntity)
        //{
        //    return objDAL.Update(brandEntity);
        //}

        //public bool UpdateByModel(BrandModel brandModel)
        //{
        //    return Update(ConvertToBrandEntity(brandModel));
        //}

        //public bool Delete(int brandId)
        //{
        //    return objDAL.Delete(brandId);
        //}

        //public List<SelectType> GetProductSelectTypeList()
        //{
        //    return objDAL.GetProductSelectTypeList();
        //}
        //public List<ProductsModel> GetProductModelList()
        //{
        //    return objDAL.GetProductModelList();
        //}

        //public List<SelectType> GetModelSelectTypeList(int productId, int brandId)
        //{
        //    return objDAL.GetModelSelectTypeList(productId, brandId);
        //}


        //public bool CheckExisting(BrandSlaModel pSetupBrand, string mode)
        //{
        //    return objDAL.CheckExisting(pSetupBrand, mode);
        //}


        public List<SelectType> GetDDLBrands()
        {
            return objDAL.GetDDLBrands();
        }

    }
}
