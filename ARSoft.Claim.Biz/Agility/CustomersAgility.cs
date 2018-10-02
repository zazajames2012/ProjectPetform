// *** Update by : Pongthorn Paemanee ***
// *** Update Date : 07/10/2015 13:30  ***

using ARSoft.Claim.DAL.Agility;
using ARSoft.Claim.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Biz.Agility
{
    public class CustomersAgility
    {
        private CustomersAgilityDAL objDAL;

        public CustomersAgility()
        {
            objDAL = new CustomersAgilityDAL();
        }

        public List<CustomerModel> getDDLCustomerType()
        {
            return objDAL.getDDLCustomerType();
        }

        //public List<CustomerGroupModel> getDDLCustomerGroup()
        //{
        //    return objDAL.getDDLCustomerGroup();
        //}

    }
}
