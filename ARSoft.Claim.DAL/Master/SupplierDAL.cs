using ARSoft.Claim.DAL.DocumentManagement;
using ARSoft.Claim.DAL.ErrorHandler;
using ARSoft.Claim.DataModel;
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
    public class SupplierDAL
    {
        // *** Update by : Nutthapaphon Sopradisth ***
        // *** Update Date : 20/06/2016 13:00  ***

        #region Supplier     

        public List<SuppliersModel> GetSupplierList(int? pageIndex, int? pageSize, string sort, SuppliersSearchModel suppliersModel)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                List<SuppliersModel> listOfSupplier = null;
                var errorBiz = new ErrorHandlerControlDAL();
                //try
                //{
                //    listOfSupplier = new List<SuppliersModel>();

                //    var supplierEntities = context.uspGetSuppliers(pageIndex, pageSize, sort, suppliersModel.SupplierCode, suppliersModel.SupplierName, suppliersModel.TypeID, suppliersModel.Status);
                //    if (supplierEntities == null && supplierEntities.Count() == 0) return null;

                //    foreach (var supplierEntity in supplierEntities)
                //    {
                //        var item = new SuppliersModel();

                //        item.RowNumber = supplierEntity.RowNumber;
                //        item.RecordCount = supplierEntity.RecordCount;
                //        item.ID = supplierEntity.ID;
                //        item.Code = supplierEntity.Code;
                //        item.Name = supplierEntity.Name;
                //        item.NameShort = supplierEntity.NameShort;
                //        item.TaxID = supplierEntity.TaxID;
                //        item.ReferCode = supplierEntity.ReferCode;
                //        item.TypeID = supplierEntity.TypeID;
                //        item.GroupID = supplierEntity.GroupID;

                //        switch (item.TypeID)
                //        {
                //            case 1:
                //                item.SupplierTypeName = EnumHelper.GetEnumDescription(SupplierType.Seller).ToString();
                //                break;
                //            case 2:
                //                item.SupplierTypeName = EnumHelper.GetEnumDescription(SupplierType.SOP).ToString();
                //                break;
                //            case 3:
                //                item.SupplierTypeName = EnumHelper.GetEnumDescription(SupplierType.Subcontractor).ToString();
                //                break;
                //            case 4:
                //                item.SupplierTypeName = EnumHelper.GetEnumDescription(SupplierType.Other).ToString();
                //                break;
                //            default:
                //                item.SupplierTypeName = EnumHelper.GetEnumDescription(SupplierType.Other).ToString();
                //                break;
                //        }

                //        item.Address = string.Format("{0} {1} {2} {3} {4}"
                //        , supplierEntity.AddressOne
                //        , supplierEntity.AddressTwo
                //        , supplierEntity.DistrictName
                //        , supplierEntity.ProvinceName
                //        , supplierEntity.PostCode);
                //        item.AddressOne = supplierEntity.AddressOne;
                //        item.AddressTwo = supplierEntity.AddressTwo;
                //        item.DistrictID = supplierEntity.DistrictID;
                //        item.PostCode = supplierEntity.PostCode;
                //        item.Phone = supplierEntity.Phone;
                //        item.Fax = supplierEntity.Fax;
                //        item.Email = supplierEntity.Email;
                //        //item.WebSite = supplierEntity.Website;
                //        item.Website = supplierEntity.Website;
                //        item.Remark = supplierEntity.Remark;
                //        item.Status = supplierEntity.Status;
                //        item.StatusName = supplierEntity.Status == 1 ? EnumHelper.GetEnumDescription((Status)(int)Status.Active) : EnumHelper.GetEnumDescription((Status)(int)Status.Inactive);
                //        item.CreatedBy = supplierEntity.CreatedBy;
                //        item.CreatedDate = supplierEntity.CreatedDate;
                //        item.UpdatedBy = supplierEntity.UpdatedBy;
                //        item.UpdatedDate = supplierEntity.UpdatedDate;

                //        listOfSupplier.Add(item);
                //    }
                //}
                //catch (Exception ex)
                //{
                //    errorBiz.WriteLog(ex);
                //    throw ex;
                //}

                return listOfSupplier;
            }
        }

        public SuppliersModel GetSupplierById(int supplierId)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                SuppliersModel supplierModel = null;
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    //List<MAS_SUPPLIERS> masterSupplier = context.MAS_SUPPLIERS.Where(s => s.ID == supplierId).ToList<MAS_SUPPLIERS>();
                    var supplierEntity = context.MAS_SUPPLIERS.FirstOrDefault(s => s.ID == supplierId);

                    if (supplierEntity != null)
                    {
                        supplierModel = new SuppliersModel();

                        supplierModel.ID = supplierEntity.ID;
                        supplierModel.Code = supplierEntity.Code;
                        supplierModel.Name = supplierEntity.Name;
                        supplierModel.NameShort = supplierEntity.NameShort;
                        supplierModel.TaxID = supplierEntity.TaxID;
                        supplierModel.ReferCode = supplierEntity.ReferCode;
                        supplierModel.TypeID = supplierEntity.TypeID;
                        supplierModel.GroupID = supplierEntity.GroupID;
                        supplierModel.AddressOne = supplierEntity.AddressOne;
                        supplierModel.AddressTwo = supplierEntity.AddressTwo;
                        if (supplierEntity.DistrictID != null)
                        {
                            supplierModel.DistrictID = supplierEntity.DistrictID;
                            supplierModel.ProvinceID = this.GetProvinceById(supplierModel.DistrictID ?? 0);
                        }

                        supplierModel.PostCode = supplierEntity.PostCode;
                        supplierModel.Phone = supplierEntity.Phone;
                        supplierModel.Fax = supplierEntity.Fax;
                        supplierModel.Email = supplierEntity.Email;
                        //item.WebSite = supplierEntity.Website;
                        supplierModel.Website = supplierEntity.Website;
                        supplierModel.Remark = supplierEntity.Remark;
                        supplierModel.Status = supplierEntity.Status;
                        supplierModel.CreatedBy = supplierEntity.CreatedBy;
                        supplierModel.CreatedDate = supplierEntity.CreatedDate;
                        supplierModel.UpdatedBy = supplierEntity.UpdatedBy;
                        supplierModel.UpdatedDate = supplierEntity.UpdatedDate;
                    }
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return supplierModel;
            }
        }

        public int GetProvinceById(int Id)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    var districtEntity = context.SYS_DISTRICTS.Where(c => c.ID == Id).FirstOrDefault();
                    if (districtEntity != null) return districtEntity.ProvinceID;
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return 1;
            }
        }

        public bool CheckExistingSupplierCode(int supplierID, string supplierCode, string mode, out string newSupplierCode)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    List<MAS_SUPPLIERS> supplierEntities;
                    newSupplierCode = String.Empty;

                    if (mode == "Add")
                    {
                        newSupplierCode = this.GetSupplierCode();
                        supplierEntities = context.MAS_SUPPLIERS.Where(s => s.Code == supplierCode).ToList<MAS_SUPPLIERS>();
                    }
                    else
                    {
                        //newSupplierCode = supplierCode;
                        supplierEntities = context.MAS_SUPPLIERS.Where(s => s.ID != supplierID && s.Code == supplierCode).ToList<MAS_SUPPLIERS>();
                    }

                    if (supplierEntities != null && supplierEntities.Count() > 0) return true;
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return false;
            }
        }

        public bool AddSupplier(SuppliersModel supplierModel)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                bool result = false;
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    MAS_SUPPLIERS supplierEntity = new MAS_SUPPLIERS();

                    supplierEntity.Code = supplierModel.Code;
                    supplierEntity.Name = supplierModel.Name;
                    supplierEntity.NameShort = supplierModel.NameShort;
                    supplierEntity.TaxID = supplierModel.TaxID;
                    supplierEntity.ReferCode = supplierModel.ReferCode;
                    supplierEntity.TypeID = supplierModel.TypeID;
                    supplierEntity.GroupID = supplierModel.GroupID;
                    supplierEntity.AddressOne = supplierModel.AddressOne;
                    supplierEntity.AddressTwo = supplierModel.AddressTwo;                    
                    if (supplierModel.DistrictID != null) supplierEntity.DistrictID =  (int)supplierModel.DistrictID;
                    supplierEntity.PostCode = supplierModel.PostCode;
                    supplierEntity.Phone = supplierModel.Phone;
                    supplierEntity.Fax = supplierModel.Fax;
                    supplierEntity.Email = supplierModel.Email;
                    supplierEntity.Website = supplierModel.Website;
                    supplierEntity.Remark = supplierModel.Remark;
                    supplierEntity.Status = supplierModel.Status;
                    supplierEntity.CreatedBy = supplierModel.CreatedBy;
                    supplierEntity.CreatedDate = DateTime.Now;
                    //supplierEntity.UpdatedBy = supplierModel.UpdatedBy;
                    //supplierEntity.UpdatedDate = DateTime.Now;

                    context.MAS_SUPPLIERS.Add(supplierEntity);
                    context.SaveChanges();
                    result = true;
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return result;
            }
        }

        public bool UpdateSupplier(SuppliersModel supplierModel)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                bool result = false;
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    var supplierEntity = context.MAS_SUPPLIERS.Where(s => s.ID == supplierModel.ID).FirstOrDefault();
                    if (supplierEntity != null)
                    {
                        //supplierEntity.Code = supplierModel.Code;
                        supplierEntity.Name = supplierModel.Name;
                        supplierEntity.NameShort = supplierModel.NameShort;
                        supplierEntity.TaxID = supplierModel.TaxID;
                        supplierEntity.ReferCode = supplierModel.ReferCode;
                        supplierEntity.TypeID = supplierModel.TypeID;
                        supplierEntity.GroupID = supplierModel.GroupID;
                        supplierEntity.AddressOne = supplierModel.AddressOne;
                        supplierEntity.AddressTwo = supplierModel.AddressTwo;
                        if (supplierModel.DistrictID != null) supplierEntity.DistrictID = (int)supplierModel.DistrictID;
                        supplierEntity.PostCode = supplierModel.PostCode;
                        supplierEntity.Phone = supplierModel.Phone;
                        supplierEntity.Fax = supplierModel.Fax;
                        supplierEntity.Email = supplierModel.Email;
                        supplierEntity.Website = supplierModel.Website;
                        supplierEntity.Remark = supplierModel.Remark;
                        supplierEntity.Status = supplierModel.Status;
                        //supplierEntity.CreatedBy = supplierModel.CreatedBy;
                        //supplierEntity.CreatedDate = DateTime.Now;
                        supplierEntity.UpdatedBy = supplierModel.UpdatedBy;
                        supplierEntity.UpdatedDate = DateTime.Now;
                        context.SaveChanges();
                    }
                    result = true;
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return result;
            }
        }

        public string GetSupplierCode()
        {
            var docNumberModel = new GenDocumentNumberModel();
            //docNumberModel.GenCode = ConstantConfig.SUPPLIER_CODE;
            docNumberModel.GenCode = DocumentPatterns.Supplier.ToString();
            docNumberModel.TableName = "MAS_SUPPLIERS";
            docNumberModel.FieldName = "Code";

            return new DocumentGenerateDAL().GenDocumentNumber(docNumberModel);
        }

        public bool DeleteSupplier(int supplierId)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                bool result = false;
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    var supplierEntity = context.MAS_SUPPLIERS.Where(s => s.ID == supplierId).FirstOrDefault();
                    if (supplierEntity != null)
                    {
                        context.MAS_SUPPLIERS.Remove(supplierEntity);
                        context.SaveChanges();
                        result = true;
                    }
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return result;
            }
        }

        public List<EnumDataItem> GetSupplierTypes()
        {
            return EnumHelper.GetEnumDataItems(typeof(SupplierType));
        }


        #endregion

        #region Supplier Contact        
        public List<SupplierContactsModel> GetSupplierContactList(int? PageIndex, int? PageSize, string Sort, SupplierContactsModel supplierContactsModel)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                List<SupplierContactsModel> listOfSupplierContact = null;
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    listOfSupplierContact = new List<SupplierContactsModel>();

                    var supplierContactEntities = context.uspGetSupplierContacts(PageIndex, PageSize, Sort, supplierContactsModel.SupplierID);
                    if (supplierContactEntities == null) return null;

                    foreach (var supplierContactEntity in supplierContactEntities)
                    {
                        var item = new SupplierContactsModel();

                        item.RowNumber = supplierContactEntity.RowNumber;
                        item.RecordCount = supplierContactEntity.RecordCount;
                        item.Id = supplierContactEntity.Id;
                        item.SupplierID = supplierContactEntity.SupplierID;
                        item.FullName = supplierContactEntity.TitleName + supplierContactEntity.FirstName + ' ' + supplierContactEntity.LastName;
                        item.TitleName = supplierContactEntity.TitleName;
                        item.FirstName = supplierContactEntity.FirstName;
                        item.LastName = supplierContactEntity.LastName;
                        item.EmailContact = supplierContactEntity.Email;

                        string phone1 = String.IsNullOrEmpty(supplierContactEntity.Phone) ? String.Empty : supplierContactEntity.Phone;
                        string phone2 = String.IsNullOrEmpty(supplierContactEntity.PhoneOtherOne) ? String.Empty : ", " + supplierContactEntity.PhoneOtherOne;
                        string phone3 = String.IsNullOrEmpty(supplierContactEntity.PhoneOtherTwo) ? String.Empty : ", " + supplierContactEntity.PhoneOtherTwo;
                        string phone4 = String.IsNullOrEmpty(supplierContactEntity.PhoneOtheThree) ? String.Empty : ", " + supplierContactEntity.PhoneOtheThree;

                        item.PhoneContact = phone1 + phone2 + phone3 + phone4;

                        //item.PhoneContact = String.IsNullOrEmpty(row.Phone) ? String.Empty : row.Phone;

                        item.PhoneOtherOne = supplierContactEntity.PhoneOtherOne;
                        item.PhoneOtherTwo = supplierContactEntity.PhoneOtherTwo;
                        item.PhoneOtheThree = supplierContactEntity.PhoneOtheThree;
                        item.TypeID = supplierContactEntity.TypeID;
                        item.ContactType = supplierContactEntity.TypeID == 1 ? EnumHelper.GetEnumDescription((ContactType)(int)ContactType.Direct) : EnumHelper.GetEnumDescription((ContactType)(int)ContactType.Indirect);
                        item.Remark = supplierContactEntity.Remark;
                        item.Status = supplierContactEntity.Status;
                        item.StatusName = supplierContactEntity.Status == 1 ? EnumHelper.GetEnumDescription((Status)(int)Status.Active) : EnumHelper.GetEnumDescription((Status)(int)Status.Inactive);
                        item.CreatedBy = supplierContactEntity.CreatedBy;
                        item.CreatedDate = supplierContactEntity.CreatedDate;
                        item.UpdatedBy = supplierContactEntity.UpdatedBy;
                        item.UpdatedDate = supplierContactEntity.UpdatedDate;

                        listOfSupplierContact.Add(item);
                    }
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return listOfSupplierContact;
            }
        }

        public SupplierContactsModel GetSupplierContactById(int supplierContactId)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var errorBiz = new ErrorHandlerControlDAL();
                SupplierContactsModel supplierContactModel = null;
                try
                {
                    List<MAS_SUPPLIER_CONTACTS> supplierContactEntities = context.MAS_SUPPLIER_CONTACTS.Where(s => s.Id == supplierContactId).ToList<MAS_SUPPLIER_CONTACTS>();

                    if (supplierContactEntities != null)
                    {
                        supplierContactModel = new SupplierContactsModel();

                        supplierContactModel.Id = supplierContactEntities[0].Id;
                        supplierContactModel.SupplierID = supplierContactEntities[0].SupplierID;
                        supplierContactModel.TitleName = supplierContactEntities[0].TitleName;
                        supplierContactModel.FirstName = supplierContactEntities[0].FirstName;
                        supplierContactModel.LastName = supplierContactEntities[0].LastName;
                        supplierContactModel.EmailContact = supplierContactEntities[0].Email;
                        supplierContactModel.PhoneContact = supplierContactEntities[0].Phone;
                        supplierContactModel.PhoneOtherOne = supplierContactEntities[0].PhoneOtherOne;
                        supplierContactModel.PhoneOtherTwo = supplierContactEntities[0].PhoneOtherTwo;
                        supplierContactModel.PhoneOtheThree = supplierContactEntities[0].PhoneOtheThree;
                        supplierContactModel.TypeID = supplierContactEntities[0].TypeID;
                        supplierContactModel.Remark = supplierContactEntities[0].Remark;
                        supplierContactModel.Status = supplierContactEntities[0].Status;
                        supplierContactModel.CreatedBy = supplierContactEntities[0].CreatedBy;
                        supplierContactModel.CreatedDate = supplierContactEntities[0].CreatedDate;
                        supplierContactModel.UpdatedBy = supplierContactEntities[0].UpdatedBy;
                        supplierContactModel.UpdatedDate = supplierContactEntities[0].UpdatedDate;
                    }
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return supplierContactModel;
            }
        }

        public bool AddSupplierContact(SupplierContactsModel supplierContactModel)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                bool result = false;
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    MAS_SUPPLIER_CONTACTS supplierContactEntity = new MAS_SUPPLIER_CONTACTS();

                    //entity.Id = supplierContactModel.Id;
                    supplierContactEntity.SupplierID = supplierContactModel.SupplierID;
                    supplierContactEntity.TitleName = supplierContactModel.TitleName;
                    supplierContactEntity.FirstName = supplierContactModel.FirstName;
                    supplierContactEntity.LastName = supplierContactModel.LastName;
                    supplierContactEntity.Email = supplierContactModel.EmailContact;
                    supplierContactEntity.Phone = supplierContactModel.PhoneContact;
                    supplierContactEntity.PhoneOtherOne = supplierContactModel.PhoneOtherOne;
                    supplierContactEntity.PhoneOtherTwo = supplierContactModel.PhoneOtherTwo;
                    supplierContactEntity.PhoneOtheThree = supplierContactModel.PhoneOtheThree;
                    supplierContactEntity.TypeID = supplierContactModel.TypeID;
                    supplierContactEntity.Remark = supplierContactModel.Remark;
                    supplierContactEntity.Status = supplierContactModel.Status;
                    supplierContactEntity.CreatedBy = supplierContactModel.CreatedBy;
                    supplierContactEntity.CreatedDate = DateTime.Now;
                    supplierContactEntity.UpdatedBy = supplierContactModel.UpdatedBy;
                    supplierContactEntity.UpdatedDate = DateTime.Now;

                    context.MAS_SUPPLIER_CONTACTS.Add(supplierContactEntity);
                    context.SaveChanges();
                    result = true;
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return result;
            }
        }

        public bool UpdateSupplierContact(SupplierContactsModel supplierContactModel)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                bool result = false;
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    var supplierContactEntity = context.MAS_SUPPLIER_CONTACTS.Where(s => s.Id == supplierContactModel.Id).FirstOrDefault();
                    if (supplierContactEntity != null)
                    {
                        supplierContactEntity.SupplierID = supplierContactModel.SupplierID;
                        supplierContactEntity.TitleName = supplierContactModel.TitleName;
                        supplierContactEntity.FirstName = supplierContactModel.FirstName;
                        supplierContactEntity.LastName = supplierContactModel.LastName;
                        supplierContactEntity.Email = supplierContactModel.EmailContact;
                        supplierContactEntity.Phone = supplierContactModel.PhoneContact;
                        supplierContactEntity.PhoneOtherOne = supplierContactModel.PhoneOtherOne;
                        supplierContactEntity.PhoneOtherTwo = supplierContactModel.PhoneOtherTwo;
                        supplierContactEntity.PhoneOtheThree = supplierContactModel.PhoneOtheThree;
                        supplierContactEntity.TypeID = supplierContactModel.TypeID;
                        supplierContactEntity.Remark = supplierContactModel.Remark;
                        supplierContactEntity.Status = supplierContactModel.Status;
                        supplierContactEntity.UpdatedBy = supplierContactModel.UpdatedBy;
                        supplierContactEntity.UpdatedDate = DateTime.Now;

                        context.SaveChanges();
                    }
                    result = true;
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return result;
            }
        }

        public bool DeleteSupplierContact(int Id)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                bool result = false;
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    var supplierContactEntity = context.MAS_SUPPLIER_CONTACTS.Where(s => s.Id == Id).FirstOrDefault();
                    if (supplierContactEntity != null)
                    {
                        context.MAS_SUPPLIER_CONTACTS.Remove(supplierContactEntity);
                        context.SaveChanges();
                        result = true;
                    }
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return result;
            }
        }

        public bool DeleteSupplierContactCollection(SupplierContactsModel[] supplierContactCollection)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                bool result = false;
                using (var transaction = context.Database.BeginTransaction())
                {
                    var errorBiz = new ErrorHandlerControlDAL();
                    try
                    {
                        for (int index = 0; index < supplierContactCollection.Count(); index++)
                        {
                            this.DeleteSupplierContact(supplierContactCollection[index].Id);
                        }

                        transaction.Commit();
                        result = true;
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        errorBiz.WriteLog(ex);
                        throw ex;
                    }
                    return result;
                }
            }
        }

        public bool CheckExistingSupplierContact(SupplierContactsModel supplierContactModel, string mode)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    List<MAS_SUPPLIER_CONTACTS> supplierContactEntities;
                    if (mode == "Add")
                        supplierContactEntities = context.MAS_SUPPLIER_CONTACTS.Where(sc => sc.SupplierID == supplierContactModel.SupplierID && sc.FirstName == supplierContactModel.FirstName.Trim() && sc.LastName == supplierContactModel.LastName.Trim()).ToList<MAS_SUPPLIER_CONTACTS>();
                    else
                        supplierContactEntities = context.MAS_SUPPLIER_CONTACTS.Where(sc => sc.Id != supplierContactModel.Id && sc.SupplierID == supplierContactModel.SupplierID && sc.FirstName == supplierContactModel.FirstName.Trim() && sc.LastName == supplierContactModel.LastName.Trim()).ToList<MAS_SUPPLIER_CONTACTS>();

                    if (supplierContactEntities != null && supplierContactEntities.Count() > 0)
                    {
                        return true;
                    }
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }

                return false;
            }
        }

        #endregion

        #region Search Supplier & Supplier Contact
        public Dictionary<string, object> SearchSupplier(SupplierSearchModel criteria)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    var query = context.MAS_SUPPLIERS.AsQueryable();
                    if (!string.IsNullOrEmpty(criteria.SupplierName))
                    {
                        query = query.Where(t => t.Name.Contains(criteria.SupplierName) ||
                                            t.NameShort.Contains(criteria.SupplierName) ||
                                            t.Code.Contains(criteria.SupplierName));
                    }
                    if (criteria.Types.Count > 0)
                    {
                        query = query.Where(t => criteria.Types.Contains(t.TypeID));
                    }
                    var suppliers = query.ToList();
                    List<SupplierModel> results = new List<SupplierModel>();
                    foreach (var supplier in suppliers)
                    {
                        SupplierModel result = new SupplierModel();
                        result.ID = supplier.ID;
                        result.Code = supplier.Code;
                        result.Name = supplier.Name;
                        result.NameShort = supplier.NameShort;
                        if (supplier.TypeID == 1)
                        {
                            result.TypeDesc = "Saller";
                        }
                        else if (supplier.TypeID == 2)
                        {
                            result.TypeDesc = "Sub Contract";
                        }
                        results.Add(result);
                    }
                    Page<SupplierModel> page = new Page<SupplierModel>(results);
                    return page.GetFullResult();
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }
            }
        }

        public Dictionary<string, object> SearchSupplierContact(SupplierContactSearchModel criteria)
        {
            using (CLAIMEntities context = new CLAIMEntities())
            {
                var errorBiz = new ErrorHandlerControlDAL();
                try
                {
                    var query = context.MAS_SUPPLIER_CONTACTS.Where(t => t.MAS_SUPPLIERS.Code == criteria.SupplierCode);
                    if (!string.IsNullOrEmpty(criteria.ContactName))
                    {
                        query = query.Where(t => (t.FirstName + " " + t.LastName).Contains(criteria.ContactName));
                    }
                    var contacts = query.ToList();
                    List<SupplierContactModel> results = new List<SupplierContactModel>();
                    foreach (var contact in contacts)
                    {
                        SupplierContactModel result = new SupplierContactModel();
                        result.ID = contact.Id;
                        result.Name = contact.FirstName + "  " + contact.LastName;
                        result.Phone = contact.Phone;
                        result.Email = contact.Email;
                        if (contact.Status == 1)
                        {
                            result.StatusDesc = "ใช้งาน";
                        }
                        else
                        {
                            result.StatusDesc = "ไม่ใช้งาน";
                        }
                        results.Add(result);
                    }
                    Page<SupplierContactModel> page = new Page<SupplierContactModel>(results);
                    return page.GetFullResult();
                }
                catch (Exception ex)
                {
                    errorBiz.WriteLog(ex);
                    throw ex;
                }
            }
        }

        #endregion

    }
}
