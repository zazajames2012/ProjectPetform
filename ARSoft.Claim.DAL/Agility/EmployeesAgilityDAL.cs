//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using ARSoft.AKOW.DAL.ErrorHandler;
//using ARSoft.AKOW.Data.Enumeration;
//using ARSoft.AKOW.DataModel;
//using ARSoft.AKOW.Model;

//namespace ARSoft.AKOW.DAL.Agility
//{
//    public class EmployeesAgilityDAL
//    {
//        public OrganizationModel getOrganization()
//        {
//            var ctx = new AKOWModelEntities();
//            var errorBiz = new ErrorHandlerControlDAL();
//            var obj = new OrganizationModel();

//            try
//            {
//                var objOrg = ctx.MAS_ORGANIZATION.Where(c => c.Levels == 1 && c.Status == 1).FirstOrDefault<MAS_ORGANIZATION>();

//                obj.ID = objOrg.ID;
//                obj.Name = objOrg.Name;
//            }
//            catch (Exception ex)
//            {
//                errorBiz.WriteLog(ex);
//                throw ex;
//            }

//            return obj;
//        }
//        public List<OrganizationModel> getDDLDepartment()
//        {
//            var ctx = new AKOWModelEntities();
//            var errorBiz = new ErrorHandlerControlDAL();
//            var ddl = new List<OrganizationModel>();

//            try
//            {
//                var lsDepartment = ctx.MAS_ORGANIZATION.Where(c => c.Levels == 2 && c.Status == 1).ToList<MAS_ORGANIZATION>();

//                foreach (var row in lsDepartment.Select(c => new { c.ID, c.Name, c.ParentID }).Distinct().ToList())
//                {
//                    var item = new OrganizationModel();
//                    item.ID = row.ID;
//                    item.Name = row.Name;
//                    item.ParentID = row.ParentID;
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

//        public List<OrganizationModel> getDDLSection()
//        {
//            var ctx = new AKOWModelEntities();
//            var errorBiz = new ErrorHandlerControlDAL();
//            var ddl = new List<OrganizationModel>();

//            try
//            {
//                var lsSection = ctx.MAS_ORGANIZATION.Where(c => c.Levels == 3 && c.Status == 1).ToList<MAS_ORGANIZATION>();

//                foreach (var row in lsSection.Select(c => new { c.ID, c.Name, c.ParentID }).Distinct().ToList())
//                {
//                    var item = new OrganizationModel();
//                    item.ID = row.ID;
//                    item.Name = row.Name;
//                    item.ParentID = row.ParentID;
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

//        public List<OrganizationModel> getDDLSector()
//        {
//            var ctx = new AKOWModelEntities();
//            var errorBiz = new ErrorHandlerControlDAL();
//            var ddl = new List<OrganizationModel>();

//            try
//            {
//                var lsSector = ctx.MAS_ORGANIZATION.Where(c => c.Levels == 4 && c.Status == 1).ToList<MAS_ORGANIZATION>();

//                foreach (var row in lsSector.Select(c => new { c.ID, c.Name, c.ParentID }).Distinct().ToList())
//                {
//                    var item = new OrganizationModel();
//                    item.ID = row.ID;
//                    item.Name = row.Name;
//                    item.ParentID = row.ParentID;
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

//        public List<PositionModel> getDDLPosition()
//        {
//            var ctx = new AKOWModelEntities();
//            var errorBiz = new ErrorHandlerControlDAL();
//            var ddl = new List<PositionModel>();

//            try
//            {
//                var lsPosition = ctx.MAS_POSITIONS.ToList<MAS_POSITIONS>();

//                foreach (var row in lsPosition.Select(c => new { c.ID, c.ShortName }).Distinct().ToList())
//                {
//                    var item = new PositionModel();
//                    item.ID = row.ID;
//                    item.Name = row.ShortName;
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

//        public List<EmployeeModel> getDDLEmpTitle()
//        {
//            var ddl = new List<EmployeeModel>();
//            var errorBiz = new ErrorHandlerControlDAL();

//            try
//            {
//                var item = new EmployeeModel();
//                item.ID = 1;
//                item.Name = "นาย";
//                ddl.Add(item);

//                item = new EmployeeModel();
//                item.ID = 2;
//                item.Name = "นาง";
//                ddl.Add(item);

//                item = new EmployeeModel();
//                item.ID = 3;
//                item.Name = "นางสาว";
//                ddl.Add(item);
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
