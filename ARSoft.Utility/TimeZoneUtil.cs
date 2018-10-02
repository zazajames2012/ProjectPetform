using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Globalization;

namespace ARSoft.Utility
{
    public class TimeZoneUtil
    {
        private string cultureInfo = "en-US";        
        public DateTime AddHourTimeZone(DateTime dateTime){
            Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(cultureInfo);
            return dateTime.AddHours(7);
        }
        public DateTime SubtractHourTimeZone(DateTime dateTime)
        {
            Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(cultureInfo);
            return dateTime.AddHours(-7);
        }

        public int DateDiffYear(DateTime startDate, DateTime endDate)
        {
            DateTime zeroTime = new DateTime(1, 1, 1);            
            TimeSpan span = endDate - startDate;

            //DateTime a = new DateTime(2007, 1, 1);
            //DateTime b = new DateTime(2008, 1, 1);

            //TimeSpan span = b - a;
            // because we start at year 1 for the Gregorian 
            // calendar, we must subtract a year here.
            int years = (zeroTime + span).Year - 1;

            // 1, where my other algorithm resulted in 0.
            //Console.WriteLine("Yrs elapsed: " + years); 

            return years;
        }
    }
}
