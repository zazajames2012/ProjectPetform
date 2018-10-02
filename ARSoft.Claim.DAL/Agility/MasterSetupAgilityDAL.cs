//using ARSoft.Claim.DAL.ErrorHandler;
//using ARSoft.Claim.Model.BOL;
//using ARSoft.Claim.Model.EntityFramework;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace ARSoft.Claim.DAL.Agility
//{
//    public class MasterSetupAgilityDAL
//    {
//        public List<DocControlModel> getDDLDocControl()
//        {
//            var ctx = new CLAIMEntities();
//            var errorBiz = new ErrorHandlerControlDAL();
//            var ddl = new List<DocControlModel>();

//            try
//            {
//                var lsDocCtrl = ctx.MAS_DOC_CONTROL.ToList<MAS_DOC_CONTROL>();

//                foreach (var row in lsDocCtrl.Select(c => new { c.GroupId, c.GroupType }).Distinct().ToList())
//                {
//                    var item = new DocControlModel();
//                    item.GroupId = row.GroupId;
//                    item.GroupType = row.GroupType;
//                    ddl.Add(item);
//                }
//            }
//            catch (Exception ex)
//            {
//                errorBiz.WriteLog(ex);
//                throw ex;
//            }

//            return ddl;
//        }

//        public List<SetupModel> getDDLCusCategory()
//        {
//            var ctx = new CLAIMEntities();
//            var errorBiz = new ErrorHandlerControlDAL();
//            var ddl = new List<SetupModel>();

//            try
//            {
//                var lsDoc = ctx.MAS_DOC_CONTROL.Where(c => c.GroupType == "Customer Category").FirstOrDefault<MAS_DOC_CONTROL>();
//                var lsSetups = ctx.MAS_MASTER_SETUP.Where(c => c.GroupId == lsDoc.GroupId).ToList<MAS_MASTER_SETUP>();

//                foreach (var row in lsSetups.Select(c => new { c.MasterSetupId, c.GroupId, c.Value, c.Name }).Distinct().OrderBy(c => c.Name).ToList())
//                {
//                    var item = new SetupModel();
//                    item.MasterSetupId = row.MasterSetupId;
//                    item.GroupId = row.GroupId;
//                    item.Value = row.Value;
//                    item.Name = row.Name;
//                    ddl.Add(item);
//                }
//            }
//            catch (Exception ex)
//            {
//                errorBiz.WriteLog(ex);
//                throw ex;
//            }

//            return ddl;
//        }
//    }
//}
