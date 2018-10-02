using ARSoft.Claim.DAL.Master;
using ARSoft.Claim.DataModel;
using ARSoft.Claim.Model.BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Biz.Master
{
    public class SupplierBiz
    {
        // *** Update by : Nutthapaphon Sopradisth ***
        // *** Update Date : 20/06/2016 13:00  ***

        #region Supplier     
       
        private SupplierDAL objDAL;
        public SupplierBiz()
        {
            objDAL = new SupplierDAL();
        }

        public List<SuppliersModel> GetSupplierList(int? pageIndex, int? pageSize, string sort, SuppliersSearchModel suppliersModel)
        {
            return objDAL.GetSupplierList(pageIndex, pageSize, sort, suppliersModel);
        }

        public SuppliersModel GetSupplierById(int supplierId)
        {
            return objDAL.GetSupplierById(supplierId);
        }

        public int GetProvinceById(int Id)
        {
            return objDAL.GetProvinceById(Id);
        }

        public bool CheckExistingSupplierCode(int supplierID, string supplierCode, string mode, out string newSupplierCode)
        {
            return objDAL.CheckExistingSupplierCode(supplierID, supplierCode, mode, out newSupplierCode);
        }

        public bool AddSupplier(SuppliersModel supplierModel)
        {
            return objDAL.AddSupplier(supplierModel);
        }

        public bool UpdateSupplier(SuppliersModel supplierModel)
        {
            return objDAL.UpdateSupplier(supplierModel);
        }

        public string GetSupplierCode()
        {
            return objDAL.GetSupplierCode();
        }

        public bool DeleteSupplier(int supplierId)
        {
            return objDAL.DeleteSupplier(supplierId);
        }
        
        public List<EnumDataItem> GetSupplierTypes()
        {
            return objDAL.GetSupplierTypes();
        }  

        #endregion

        #region Supplier Contact        
        public List<SupplierContactsModel> GetSupplierContactList(int? pageIndex, int? pageSize, string sort, SupplierContactsModel supplierContactsModel)
        {
            return objDAL.GetSupplierContactList(pageIndex, pageSize, sort, supplierContactsModel);
        }

        public SupplierContactsModel GetSupplierContactById(int supplierContactId)
        {
            return objDAL.GetSupplierContactById(supplierContactId);
        }

        public bool AddSupplierContact(SupplierContactsModel supplierContactModel)
        {
           return objDAL.AddSupplierContact(supplierContactModel);
        }

        public bool UpdateSupplierContact(SupplierContactsModel supplierContactModel)
        {
            return objDAL.UpdateSupplierContact(supplierContactModel);
        }

        public bool DeleteSupplierContact(int Id)
        {
            return objDAL.DeleteSupplierContact(Id);
        }

        public bool DeleteSupplierContactCollection(SupplierContactsModel[] supplierContactCollection)
        {
            return objDAL.DeleteSupplierContactCollection(supplierContactCollection);
        }

        public bool CheckExistingSupplierContact(SupplierContactsModel supplierContactModel, string mode)
        {
            return objDAL.CheckExistingSupplierContact(supplierContactModel, mode);
        }

        #endregion

        #region Search Supplier & Supplier Contact
        public Dictionary<string,object> SearchSupplier(SupplierSearchModel criteria )
        {
            return objDAL.SearchSupplier(criteria);
        }       

        public Dictionary<string,object> SearchSupplierContact(SupplierContactSearchModel criteria)
        {
            return objDAL.SearchSupplierContact(criteria);
        }

        #endregion

    }
}
