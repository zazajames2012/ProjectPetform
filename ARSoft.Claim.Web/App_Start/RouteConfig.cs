﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ARSoft.Claim.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");


            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                //defaults: new { controller = "Login", action = "Login", id = UrlParameter.Optional }
                defaults: new { controller = "Login", action = "Login", id = UrlParameter.Optional },
                namespaces: new string[] { "ARSoft.Claim.Web.Controllers" }
            );
        }
    }
}
