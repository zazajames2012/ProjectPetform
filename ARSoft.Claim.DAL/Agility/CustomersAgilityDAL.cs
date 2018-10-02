// *** Update by : Pongthorn Paemanee ***
// *** Update Date : 07/10/2015 13:30  ***

using ARSoft.Claim.DAL.ErrorHandler;
using ARSoft.Claim.DataModel;
using ARSoft.Claim.Model.Enumeration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DAL.Agility
{
    public class CustomersAgilityDAL
    {
        public List<CustomerModel> getDDLCustomerType()
        {
            var ddl = new List<CustomerModel>();
            var errorBiz = new ErrorHandlerControlDAL();

            try
            {
                var item = new CustomerModel();
                item.ID = (int)CustomerType.Project;
                item.Name = EnumHelper.GetEnumDescription(CustomerType.Project);
                item.Name = CustomerType.Project.ToString();

                ddl.Add(item);

                item = new CustomerModel();
                item.ID = (int)CustomerType.Product;
                item.Name = EnumHelper.GetEnumDescription(CustomerType.Product);
                item.Name = CustomerType.Product.ToString();
                ddl.Add(item);
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
                throw ex;
            }

            return ddl;
        }

        //public List<CustomerGroupModel> getDDLCustomerGroup()
        //{
        //    var ctx = new AKOWModelEntities();
        //    var errorBiz = new ErrorHandlerControlDAL();
        //    var ddl = new List<CustomerGroupModel>();

        //    try
        //    {
        //        var lsCustomerGroup = ctx.MAS_CUSTOMER_GROUPS.Where(c => c.Status == 1).ToList<MAS_CUSTOMER_GROUPS>();

        //        foreach (var row in lsCustomerGroup.Select(c => new { c.ID, c.Name, c.Code }).Distinct().ToList())
        //        {
        //            var item = new CustomerGroupModel();
        //            item.ID = row.ID;
        //            item.Name = row.Code + " | " + row.Name;
        //            ddl.Add(item);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        errorBiz.WriteLog(ex);
        //        throw ex;
        //    }

        //    return ddl;
        //}

    }
}
