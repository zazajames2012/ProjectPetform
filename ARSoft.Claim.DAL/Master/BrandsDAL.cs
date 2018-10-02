using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DAL.Master
{
    public class BrandsDAL
    {
        public List<SelectType> getDDLBrands()
        {
            var ctx = new CLAIMEntities();

            List<SelectType> output = null;
            //var entityList = (from pBrand in ctx.MAS_BRANDS
            //                  where pBrand.Status == 1 orderby pBrand.Name
            //                  select new SelectType
            //                  {
            //                      ID = pBrand.ID,
            //                      Text = pBrand.Name
            //                  });
            //output = entityList.ToList();

            return output;
        }
        public List<SelectType> getDDLBrandsByJob(int? jobID)
        {
            var ctx = new CLAIMEntities();
            List<SelectType> output = new List<SelectType>();

            //if (jobID != null)
            //{
            //    List<TRN_JOB_EQUIPMENT_ITEMS> itemList = ctx.TRN_JOB_EQUIPMENT_ITEMS.Where(s => s.JobID == jobID).OrderBy(s => s.SerialNumber).ToList<TRN_JOB_EQUIPMENT_ITEMS>();

            //    var item = new SelectType();
            //    foreach (var row in itemList.GroupBy(m => m.BrandID))
            //    {
            //        var firstItem = row.FirstOrDefault();
            //        item = new SelectType();
            //        item.ID = (int)firstItem.MAS_EQUIPMENT_ITEMS1.BrandID;
            //        item.Text = firstItem.MAS_EQUIPMENT_ITEMS1.MAS_BRANDS.Name;
            //        output.Add(item);
            //    }

            //    if (itemList.Count > 0 && itemList[0].MAS_EQUIPMENT_ITEMS != null)
            //    {
            //        foreach (var row in itemList.GroupBy(m => m.MAS_EQUIPMENT_ITEMS.BrandID))
            //        {
            //            var firstItem = row.FirstOrDefault();
            //            if (output.Exists(c => c.ID != firstItem.MAS_EQUIPMENT_ITEMS.BrandID))
            //            {
            //                item = new SelectType();
            //                item.ID = (int)firstItem.MAS_EQUIPMENT_ITEMS.BrandID;
            //                item.Text = firstItem.MAS_EQUIPMENT_ITEMS.MAS_BRANDS.Name;
            //                output.Add(item);
            //            }
            //        }
            //    }
            //}
            
            return output;
        }
    }
}
