using System;
using ARSoft.Utility;
using System.Linq;
using ARSoft.Claim.Model.EntityFramework;

namespace ARSoft.Claim.DAL.Sys
{ 

    public class RunningNumberDAL
    {
        private CLAIMEntities ctx;

        public RunningNumberDAL()
        {
            ctx = new CLAIMEntities();
        }

        private string getDuplicateString(char c, int dupqty)
        {
            string returnstring = string.Empty;
            for (int i = 1; i <= dupqty; i++)
            {
                returnstring += c.ToString();
            }
            return returnstring;
        }

        public string GetRunningSemiPattern(string configPattern, string tablename, string fieldname)
        {
            for (int i = 1; i <= 100; i++)
            {
                string pat = getDuplicateString('y', i);
                configPattern = configPattern.Replace("[" + pat + "]", DateUtil.ConvertDate(DateTime.Today, pat));

            }

            for (int i = 1; i <= 100; i++)
            {
                string pat = getDuplicateString('M', i);
                configPattern = configPattern.Replace("[" + pat + "]", DateUtil.ConvertDate(DateTime.Today, pat));

            }


            for (int i = 1; i <= 100; i++)
            {
                string pat = getDuplicateString('d', i);
                configPattern = configPattern.Replace("[" + pat + "]", DateUtil.ConvertDate(DateTime.Today, pat));

            }

            //for (int i = 1; i <= 100; i++)
            //{
            //    string pat = getDuplicateString('B', i);
            //    configPattern = configPattern.Replace("[" + pat + "]", bu_name);

            //}

            for (int i = 1; i <= 100; i++)
            {
                string pat = getDuplicateString('N', i);
                string pat2 = getDuplicateString('_', i);
                configPattern = configPattern.Replace("[" + pat + "]", pat2);

            }

            return configPattern;
        }

        public string GetRunningNo(string configPattern, string tablename, string fieldname)
        {
            string runningSemiPattern = GetRunningSemiPattern(configPattern, tablename, fieldname);


            string NextId = string.Empty;
            try
            {
                NextId = ctx.uspGetRunningCode(fieldname, tablename, runningSemiPattern).ToList()[0];

            }
            catch (Exception ex)
            {

            }
            finally
            {

            }

            return NextId;
        }

        public string GetRunningNo(CLAIMEntities context, string configPattern, string tablename, string fieldname)
        {
            string runningSemiPattern = GetRunningSemiPattern(configPattern, tablename, fieldname);


            string NextId = string.Empty;
            try
            {
                NextId = context.uspGetRunningCode(fieldname, tablename, runningSemiPattern).ToList()[0];

            }
            catch (Exception ex)
            {

            }
            finally
            {

            }

            return NextId;
        }




    }
}
