using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ARSoft.Claim.Web.Models
{
    public class LoginModel
    {
        [Required]
        [Display(Name = "Username")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        public string ErrorMessage { get; set; }

        public bool IsValid(string _username, string _password)
        {
            bool result = false;

            result = true;

            return result;
        }

        public bool IsSession(string _sessionName)
        {
            return (HttpContext.Current.Session[_sessionName] != null) ? true : false;
        }

    }
}