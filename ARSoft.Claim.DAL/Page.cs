using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.DAL
{
    public class Page<T>
    {
        List<T> results;
        int totalRecord;
        int pageSize;
        //int page;
        public Page(List<T> results, int totalRecord, int pageSize)
        {
            this.results = results;
            this.totalRecord = totalRecord;
            this.pageSize = pageSize;
            // this.page = page;
        }
        public Page(List<T> results)
        {
            this.results = results;
        }
        public Dictionary<string, object> GetFullResult()
        {
            Dictionary<string, object> map = new Dictionary<string, object>();
            map.Add("list", results);
            return map;
        }

        public Dictionary<string, object> GetResult()
        {
            int totalPage = totalRecord / pageSize;
            if ((totalRecord % pageSize) > 0)
            {
                totalPage++;
            }
            List<int> pages = new List<int>();
            for (int index = 0; index <= totalPage; index++)
            {
                pages.Add(index);
            }
            Dictionary<string, object> map = new Dictionary<string, object>();
            map.Add("list", results);
            map.Add("totalRecord", totalRecord);
            map.Add("totalPage", totalPage);
            map.Add("pages", pages);
            return map;
        }
    }
}
