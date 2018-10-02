using ARSoft.Claim.DAL.Master;
using ARSoft.Claim.Model.BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Biz.Master
{

    public class ClassificationBiz
    {
        private ClassificationDAL objDAL;
        public ClassificationBiz()
        {
            objDAL = new ClassificationDAL();
        }
        public List<ClassificationModel> GetClassificationList(int? pageIndex, int? pageSize, string sort, ClassificationModel searchModelsModel)
        {
            return objDAL.GetClassificationList(pageIndex, pageSize, sort, searchModelsModel);
        }
        public bool CheckClassificationExisting(ClassificationModel model, string Mode)
        {
            return objDAL.CheckClassificationExisting(model, Mode);
        }
        public bool CheckClassificationIsUsed(ClassificationModel model)
        {
            return objDAL.CheckClassificationIsUsed(model);
        }
        public bool AddClassification(ClassificationModel model)
        {
            return objDAL.AddClassification(model);
        }
        public bool EditClassification(ClassificationModel model)
        {
            return objDAL.EditClassification(model);
        }
        public bool DelClassification(int id)
        {
            return objDAL.DelClassification(id);
        }
        public ClassificationModel GetClassificationByID(int id)
        {
            return objDAL.GetClassificationByID(id);
        }
    }
}
