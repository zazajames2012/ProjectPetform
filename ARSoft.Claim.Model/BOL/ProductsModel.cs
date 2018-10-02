using ARSoft.Claim.Model.BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DataModel
{
    public class ProductsModel : BaseSearchModel
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte ProductGroupID { get; set; }
        public string ProductGroupName { get; set; }
        public byte Status { get; set; }
        public string StatusName { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdateDate { get; set; }

        public bool SpecificSymptomCode { get; set; }
        public bool SpecificRepairCode { get; set; }
        public string SpecificCode { get; set; }
        public bool RequestSizeOnJob { get; set; }
        public string MessageOnJob { get; set; }
        public Nullable<decimal> LaborCostSmall { get; set; }
        public decimal LaborCostMedium { get; set; }
        public decimal LaborCostLarge { get; set; }
        public Nullable<decimal> LaborCostXLarge { get; set; }
        public List<CheckboxDataItem> AccessoriesList { get; set; }
        public List<ProductLaborCostsModel> ProductLaborCostsList { get; set; }
        public bool BundleSoftware { get; set; }
        public bool IsHasProductLaborCosts { get; set; }
    }

    public class ProductGroupsModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Component { get; set; }
        public byte DisplaySEQ { get; set; }
        public byte Status { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdateDate { get; set; }
    }

    public class SearchProductsModel : BaseSearchModel
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public byte ProductGroupID { get; set; }
        public string ProductCode { get; set; }
        public string ProductGroupName { get; set; }
        public string StatusName { get; set; }
        public bool RequestSizeOnJob { get; set; }
    }

    public class MasProductServiceCardImageModel
    {
        public int ID { get; set; }
        public int ProductID { get; set; }
        public byte Side { get; set; }
        public string FileName { get; set; }
        public string FileExtention { get; set; }
        public string Path { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }

        public string strPath { get; set; }
    }

    public class ProductSizeModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public bool DefaultSize { get; set; }
        public bool Status { get; set; }
    }

    public class ProductLaborCostsModel
    {
        public int ID { get; set; }
        public int ProductID { get; set; }
        public byte ProductSizeID { get; set; }
        public bool DefaltSize { get; set; }
        public string DisplaySizeName { get; set; }
        public string DisplaySizeText { get; set; }
        public decimal LaborCostHardware { get; set; }
        public decimal LaborCostSoftwareware { get; set; }
        public decimal DealerDiscount { get; set; }
        public byte DealerDiscountType { get; set; }
        public Nullable<decimal> MaximumPrice { get; set; }
        public decimal MinimumPrice { get; set; }
        public int CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }        
    }
}
