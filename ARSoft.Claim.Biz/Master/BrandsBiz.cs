
using ARSoft.Claim.DAL.Master;
using ARSoft.Claim.Model.BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Biz.Master
{
    public class BrandsBiz
    {
        private BrandsDAL objDAL;

        public BrandsBiz()
        {
            objDAL = new BrandsDAL();
        }

        public List<SelectType> getDDLBrands()
        {
            return objDAL.getDDLBrands();
        }

        public List<SelectType> getDDLBrandsByJob(int? jobID)
        {
            return objDAL.getDDLBrandsByJob(jobID);
        }
    }
}
