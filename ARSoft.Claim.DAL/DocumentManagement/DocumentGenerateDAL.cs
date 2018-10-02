using ARSoft.Claim.DAL.ErrorHandler;
using ARSoft.Claim.Model.Enumeration;
using ARSoft.Claim.Model.EntityFramework;
using System;
using System.Linq;
using ARSoft.Claim.DataModel;
using ARSoft.Claim.DAL.Sys;

namespace ARSoft.Claim.DAL.DocumentManagement
{
    public class DocumentGenerateDAL
    {
        public string GenDocumentNumber(GenDocumentNumberModel docNoModel)
        {
            RunningNumberDAL runningNumberBiz;
            var errorBiz = new ErrorHandlerControlDAL();
            string docNumber = String.Empty;
            string strPattern = String.Empty;
            string sTableName = String.Empty;
            string sFieldName = String.Empty;
            CLAIMEntities context = new CLAIMEntities();

            try
            {
                runningNumberBiz = new RunningNumberDAL();
                var docPattern = new SYS_DOCUMENT_PATTERNS();

                switch (docNoModel.GenCode)
                {
                    case "PO":
                        docPattern = context.SYS_DOCUMENT_PATTERNS.Where(m => m.Code == docNoModel.GenCode).FirstOrDefault();
                        strPattern = docPattern.Pattern.Replace("[BU]", docNoModel.GenString1);
                        sTableName = string.IsNullOrWhiteSpace(docPattern.TableName) == true ? docNoModel.TableName : docPattern.TableName;
                        sFieldName = string.IsNullOrWhiteSpace(docPattern.FieldName) == true ? docNoModel.FieldName : docPattern.FieldName;
                        docNumber = runningNumberBiz.GetRunningNo(context, strPattern, docNoModel.TableName, docNoModel.FieldName);
                        break;
                    default:
                        docPattern = context.SYS_DOCUMENT_PATTERNS.Where(m => m.Code == docNoModel.GenCode).FirstOrDefault();
                        sTableName = string.IsNullOrWhiteSpace(docPattern.TableName) == true ? docNoModel.TableName : docPattern.TableName;
                        sFieldName = string.IsNullOrWhiteSpace(docPattern.FieldName) == true ? docNoModel.FieldName : docPattern.FieldName;
                        docNumber = runningNumberBiz.GetRunningNo(context, docPattern.Pattern, sTableName, sFieldName);
                        break;
                }
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
            }

            return docNumber;
        }

        public string GenDocumentNumber(CLAIMEntities context, GenDocumentNumberModel docNoModel)
        {
            RunningNumberDAL runningNumberBiz;
            var errorBiz = new ErrorHandlerControlDAL();
            string docNumber = String.Empty;
            string strPattern = String.Empty;
            string sTableName = String.Empty;
            string sFieldName = String.Empty;

            try
            {
                runningNumberBiz = new RunningNumberDAL();
                var docPattern = new SYS_DOCUMENT_PATTERNS();

                switch (docNoModel.GenCode)
                {
                    case "PO":
                        // PUR-[yy][MM]-[NNN]
                        docPattern = context.SYS_DOCUMENT_PATTERNS.Where(m => m.Code == docNoModel.GenCode).FirstOrDefault();
                        strPattern = docPattern.Pattern.Replace("[BU]", docNoModel.GenString1);
                        sTableName = string.IsNullOrWhiteSpace(docPattern.TableName) == true ? docNoModel.TableName : docPattern.TableName;
                        sFieldName = string.IsNullOrWhiteSpace(docPattern.FieldName) == true ? docNoModel.FieldName : docPattern.FieldName;
                        docNumber = runningNumberBiz.GetRunningNo(context, strPattern, docNoModel.TableName, docNoModel.FieldName);
                        break;
                    case "BorrowBuffer":
                        // BUF-BOR-[yy][MM]-[NNN]
                        docPattern = context.SYS_DOCUMENT_PATTERNS.Where(m => m.Code == docNoModel.GenCode).FirstOrDefault();
                        strPattern = docPattern.Pattern.Replace("[BU]", docNoModel.GenString1);
                        sTableName = string.IsNullOrWhiteSpace(docPattern.TableName) == true ? docNoModel.TableName : docPattern.TableName;
                        sFieldName = string.IsNullOrWhiteSpace(docPattern.FieldName) == true ? docNoModel.FieldName : docPattern.FieldName;
                        docNumber = runningNumberBiz.GetRunningNo(context, strPattern, docNoModel.TableName, docNoModel.FieldName);
                        break;
                    case "IssueBuffer":
                        // BUF-ISS-[yy][MM]-[NNN]
                        docPattern = context.SYS_DOCUMENT_PATTERNS.Where(m => m.Code == docNoModel.GenCode).FirstOrDefault();
                        strPattern = docPattern.Pattern.Replace("[BU]", docNoModel.GenString1);
                        sTableName = string.IsNullOrWhiteSpace(docPattern.TableName) == true ? docNoModel.TableName : docPattern.TableName;
                        sFieldName = string.IsNullOrWhiteSpace(docPattern.FieldName) == true ? docNoModel.FieldName : docPattern.FieldName;
                        docNumber = runningNumberBiz.GetRunningNo(context, strPattern, docNoModel.TableName, docNoModel.FieldName);
                        break;
                    default:
                        docPattern = context.SYS_DOCUMENT_PATTERNS.Where(m => m.Code == docNoModel.GenCode).FirstOrDefault();
                        sTableName = string.IsNullOrWhiteSpace(docPattern.TableName) == true ? docNoModel.TableName : docPattern.TableName;
                        sFieldName = string.IsNullOrWhiteSpace(docPattern.FieldName) == true ? docNoModel.FieldName : docPattern.FieldName;
                        docNumber = runningNumberBiz.GetRunningNo(context, docPattern.Pattern, sTableName, sFieldName);
                        break;
                }
            }
            catch (Exception ex)
            {
                errorBiz.WriteLog(ex);
            }

            return docNumber;
        }
    }
}
