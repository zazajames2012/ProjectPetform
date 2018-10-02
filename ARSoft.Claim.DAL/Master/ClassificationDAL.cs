using ARSoft.Claim.DAL.ErrorHandler;
using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.EntityFramework;
using ARSoft.Claim.Model.Enumeration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ARSoft.Claim.Model.Enumeration.EnumHelper;

namespace ARSoft.Claim.DAL.Master
{
    public class ClassificationDAL
    {
        public List<ClassificationModel> GetClassificationList(int? pageIndex, int? pageSize, string sort, ClassificationModel searchModel)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var errorBiz = new ErrorHandlerControlDAL();
                var listOfClassification = new List<ClassificationModel>();

                try
                {
                    var masterResult = context.uspGetListOfClassification(pageIndex, pageSize, sort, searchModel.Code, searchModel.Name, searchModel.StrStatus, searchModel.GroupID, searchModel.Uses).ToList();
                    if (masterResult == null) return null;                    

                    foreach (var row in masterResult)
                    {
                        var item = new ClassificationModel();
                        item.RowNumber = row.RowNumber;
                        item.RecordCount = row.RecordCount;
                        item.ID = row.ID;
                        item.Code = row.Code;                    
                        item.Name = row.Name;
                        item.ParentID = row.ParentID;                      
                        item.Description = row.Description;
                        item.Status = row.Status;
                        item.StatusName = EnumHelper.GetEnumDescription((Status)row.Status);
                        listOfClassification.Add(item);
                    }

                    //item.Uses = row.Uses;
                    //item.ParentName = row.ParentName;
                    //item.SecondParentName = row.SecondParentName;
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return listOfClassification;
            }
        }

        public bool AddClassification(ClassificationModel model)
        {
            var ctx = new CLAIMEntities();
            bool results = false;
            var errorBiz = new ErrorHandlerControlDAL();

            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    var addClassification = new MAS_CLASSIFICATION();
                    var CreateDate = DateTime.Now;

                    addClassification.GroupID = model.GroupID;
                    addClassification.ParentID = model.ParentID;
                    addClassification.Name = model.Name;
                    addClassification.Code = model.Code;
                    //addClassification.Uses = model.Uses;
                    addClassification.Description = model.Description;
                    //addClassification.Status = 1;
                    addClassification.CreatedDate = CreateDate;
                    addClassification.CreatedBy = model.CreatedBy;
                    addClassification.UpdatedDate = CreateDate;
                    addClassification.UpdatedBy = model.UpdatedBy;

                    ctx.MAS_CLASSIFICATION.Add(addClassification);
                    ctx.SaveChanges();

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
        public bool EditClassification(ClassificationModel model)
        {
            var ctx = new CLAIMEntities();
            bool results = false;
            var errorBiz = new ErrorHandlerControlDAL();

            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    var editModel = ctx.MAS_CLASSIFICATION.Where(c => c.ID == model.ID).FirstOrDefault();
                    var UpdateDate = DateTime.Now;

                    if (editModel != null)
                    {

                        editModel.ParentID = model.ParentID;
                        editModel.Code = model.Code;
                        editModel.Name = model.Name;
                        //if (model.Uses > 0)
                        //{
                        //    editModel.Uses = model.Uses;
                        //}
                        editModel.Description = model.Description;
                        //editModel.Status = 1;//model.Status;
                        editModel.UpdatedDate = UpdateDate;
                        editModel.UpdatedBy = model.UpdatedBy;

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
        public bool DelClassification(int ID)
        {
            bool results = false;
            var errorBiz = new ErrorHandlerControlDAL();

            using (CLAIMEntities ctx = new CLAIMEntities())
            {
                using (var transaction = ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var delResult = ctx.MAS_CLASSIFICATION.Where(c => c.ID == ID).First();
                        //ctx.MAS_CLASSIFICATION.Remove(delResult);                       

                       // delResult.Status = 0;
                        ctx.SaveChanges();

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
        public bool CheckClassificationExisting(ClassificationModel model, string Mode)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    List<MAS_CLASSIFICATION> masterClassification;
                    if (Mode == "Add")
                    {
                        if (model.Code == null)
                        {
                            masterClassification = context.MAS_CLASSIFICATION.Where(s => (s.Name.Trim().ToUpper() == model.Name.Trim().ToUpper()) && s.GroupID == model.GroupID && s.ParentID == model.ParentID).ToList();
                        }
                        else
                        {
                            masterClassification = context.MAS_CLASSIFICATION.Where(s => (s.Code.Trim().ToUpper() == model.Code.Trim().ToUpper()) && s.GroupID == model.GroupID && s.ParentID == model.ParentID).ToList();
                        }

                    }
                    else
                    {
                        if (model.Code == null)
                        {
                            masterClassification = context.MAS_CLASSIFICATION.Where(s => s.ID != model.ID && (s.Name.Trim().ToUpper() == model.Name.Trim().ToUpper()) && s.GroupID == model.GroupID && s.ParentID == model.ParentID).ToList();

                        }
                        else
                        {
                            masterClassification = context.MAS_CLASSIFICATION.Where(s => s.ID != model.ID && (s.Code.Trim().ToUpper() == model.Code.Trim().ToUpper()) && s.GroupID == model.GroupID && s.ParentID == model.ParentID).ToList();

                        }

                    }

                    if (masterClassification != null && masterClassification.Count() > 0) return true;
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return false;
            }
        }
        public bool CheckClassificationIsUsed(ClassificationModel model)
        {
            //using (APROJECTEntities context = new APROJECTEntities())
            //{
            //    var result = false;
            //    var errorBiz = new ErrorHandlerControlDAL();
            //    try
            //    {
            //        result = context.MAS_CLASSIFICATION.First(m => m.ID == model.ID).Uses == (int)LocatorStatus.Use;
            //    }
            //    catch (Exception ex)
            //    {
            //        errorBiz.WriteLog(ex);
            //        throw ex;
            //    }

            //    return result;
            //}
            return false;
        }
        public ClassificationModel GetClassificationByID(int id)
        {
            var ctx = new CLAIMEntities();
            var item = new ClassificationModel();
            var errorBiz = new ErrorHandlerControlDAL();

            try
            {
                var ClassificationModel = ctx.MAS_CLASSIFICATION.Where(c => c.ID == id).First();

                item.ID = ClassificationModel.ID;
                item.GroupID = ClassificationModel.GroupID;
                item.ParentID = ClassificationModel.ParentID;
                item.Code = ClassificationModel.Code;
                //item.Uses = ClassificationModel.Uses ?? 0;
                item.Name = ClassificationModel.Name;
                item.Description = ClassificationModel.Description;
                //item.Status = ClassificationModel.Status;
                //item.StatusName = EnumHelper.GetEnumDescription((Status)ClassificationModel.Status);
                item.CreatedBy = ClassificationModel.CreatedBy;
                item.CreatedDate = ClassificationModel.CreatedDate;
                item.UpdatedBy = ClassificationModel.UpdatedBy;
                item.UpdatedDate = ClassificationModel.UpdatedDate;
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return item;
        }
    }
}
