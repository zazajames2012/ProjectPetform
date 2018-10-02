using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.Constant
{
    public class ConstantConfig
    {
        public const string DATE_FORMAT = "dd/MM/yyyy";
        public const string DATE_TIME_FORMAT = "dd/MM/yyyy HH:mm";
        public const string DATE_TIME_FULL_FORMAT = "dd/MM/yyyy HH:mm:ss fffffff";
        public static CultureInfo CURRENT_CULTURE = System.Globalization.CultureInfo.CreateSpecificCulture("en-US");

        public const string CONFIG_PATTERN = "SVOA/[yy]-[NNNNN]";
        public const string TABLE_NAME = "TRN_JOBS";
        public const string FIELD_NAME = "Code";

        public const string SUPPLIER_CODE = "Supplier";

        public const int SLA_TASK_RESPONSE_TYPE = 1;
        public const int SLA_TASK_FIXING_TYPE = 2;

        #region EQUIPMENT_ITEMS_TYPE
        public const string MAS_EQUIPMENT_ITEMS_TYPE = "1,2,3";
        public const string SPARE_COMPONENTS_TYPE = "4,5";
        #endregion

    }
}
