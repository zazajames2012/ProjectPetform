using ARSoft.Claim.DAL.Master;
using ARSoft.Claim.Model.BOL;
using ARSoft.Claim.Model.BOL.Authorization;
using ARSoft.Claim.Model.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Biz.Master
{
    public class UserControlBiz
    {
        private UserControlDAL objDAL;
        public UserControlBiz()
        {
            objDAL = new UserControlDAL();
        }

        #region "Call Entity's Stored Procedures" 
        public List<uspGetAuthorizedMenus_Result> GetAuthorizedMenuEntityList(string userName, byte? parentID, byte? levels, byte? types, bool? withSystem, string currentUrl)
        {
            return objDAL.GetAuthorizedMenuEntityList(userName, parentID, levels, types, withSystem, currentUrl);
        }

        public List<uspGetPermissions_Result> GetPermissionEntityList(string userName, string functionCode, int? MasterID)
        {
            return objDAL.GetPermissionEntityList(userName, functionCode, MasterID);
        }

        public List<uspGetUserRoles_Result> GetUserRolesEntityList(string userName)
        {
            return objDAL.GetUserRolesEntityList(userName);
        }

        #endregion

        #region "Main Web API Method"
        public List<MenuModel> GetAuthorizedMenusModelList(string userName, string currentUrl)
        {
            return ConvertToAuthorizedMenusModelList(GetAuthorizedMenuEntityList(userName, null, null, null, null, currentUrl).ToList());
        }

        public List<MenuModel> GetAuthorizedMenusModelListWithParent(string userName, byte parentID)
        {
            return ConvertToAuthorizedMenusModelList(GetAuthorizedMenuEntityList(userName, parentID, null, null, null, null).ToList());
        }

        public List<MenuModel> GetAuthorizedMenusModelListWithLevel(string userName, byte levels)
        {
            return ConvertToAuthorizedMenusModelList(GetAuthorizedMenuEntityList(userName, null, levels, null, null, null).ToList());
        }

        public List<MenuModel> GetAuthorizedMenusModelList(string userName, byte types, bool withSystem)
        {
            return ConvertToAuthorizedMenusModelList(GetAuthorizedMenuEntityList(userName, null, null, types, withSystem, null).ToList());
        }


        public PermissionModel CheckPermission(string userName, string url)
        {
            List<PermissionModel> permissionModelList = ConvertToPermissionModelList(GetPermissionEntityList(userName, null, null));

            url = url.Trim().Replace("_", "/").ToLower().Trim('/');
            PermissionModel outputPermissionModel = null;
            foreach (PermissionModel permissionModel in permissionModelList)
            {
                if (!string.IsNullOrEmpty(permissionModel.URL))
                {
                    //if (url.IndexOf( permissionModel.URL.ToLower())>=0)
                    if (url.Equals(permissionModel.URL.Trim().ToLower()))
                    {
                        outputPermissionModel = permissionModel;
                        break;
                    }
                }
            }
            return outputPermissionModel;
        }

        public List<PermissionModel> GetPermissions(string userName)
        {
            return ConvertToPermissionModelList(GetPermissionEntityList(userName, null, null));
        }

        public List<PermissionModel> GetPermissions(string userName, string functionCode)
        {
            return ConvertToPermissionModelList(GetPermissionEntityList(userName, functionCode, null));
        }

        public List<PermissionModel> GetPermissions(string userName, int masterId)
        {
            return ConvertToPermissionModelList(GetPermissionEntityList(userName, null, masterId));
        }


        #endregion

        #region "Convert Model and Entity"
        public uspGetAuthorizedMenus_Result ConvertToAuthorizedMenuEntity(MenuModel menusModel)
        {
            uspGetAuthorizedMenus_Result authorizedMenuEntity = new uspGetAuthorizedMenus_Result();

            authorizedMenuEntity.ID = menusModel.ID;
            authorizedMenuEntity.CAPTION = menusModel.Caption;
            authorizedMenuEntity.LEVELS = Convert.ToByte(menusModel.Levels);
            authorizedMenuEntity.SCREENSEQUENCE = Convert.ToInt16(menusModel.ScreenSequence);
            authorizedMenuEntity.FunctionCode = menusModel.FunctionCode;
            authorizedMenuEntity.ParentID = menusModel.ParentID;
            authorizedMenuEntity.URL = menusModel.URL;
            authorizedMenuEntity.API = menusModel.API;
            authorizedMenuEntity.MasterID = menusModel.MasterID;
            authorizedMenuEntity.IconName = menusModel.IconName;

            return authorizedMenuEntity;
        }

        public MenuModel ConvertToAuthorizedMenusModel(uspGetAuthorizedMenus_Result authorizedMenuEntity)
        {
            MenuModel authorizedMenusModel = new MenuModel();

            authorizedMenusModel.ID = authorizedMenuEntity.ID;
            authorizedMenusModel.Caption = authorizedMenuEntity.CAPTION;
            authorizedMenusModel.Levels = Convert.ToInt16(authorizedMenuEntity.LEVELS);
            authorizedMenusModel.ScreenSequence = Convert.ToInt16(authorizedMenuEntity.SCREENSEQUENCE);
            authorizedMenusModel.FunctionCode = authorizedMenuEntity.FunctionCode;
            authorizedMenusModel.FunctionCaption = authorizedMenuEntity.FunctionCaption;
            authorizedMenusModel.CurrentPage = authorizedMenuEntity.CurrentPage;
            authorizedMenusModel.CurrentParent = authorizedMenuEntity.CurrentParent;
            authorizedMenusModel.CurrentUrl = authorizedMenuEntity.CurrentUrl;

            if (authorizedMenuEntity.ParentID.HasValue)
            {
                authorizedMenusModel.ParentID = authorizedMenuEntity.ParentID.Value;
            }

            authorizedMenusModel.URL = authorizedMenuEntity.URL;
            authorizedMenusModel.API = authorizedMenuEntity.API;

            if (authorizedMenuEntity.MasterID.HasValue)
            {
                authorizedMenusModel.MasterID = authorizedMenuEntity.MasterID.Value;
            }

            authorizedMenusModel.IconName = authorizedMenuEntity.IconName;
            authorizedMenusModel.Allow = authorizedMenuEntity.Allow;

            return authorizedMenusModel;
        }

        public List<uspGetAuthorizedMenus_Result> ConvertToAuthorizedMenuEntityList(List<MenuModel> menusModelList)
        {
            List<uspGetAuthorizedMenus_Result> authorizedMenuEntityList = new List<uspGetAuthorizedMenus_Result>();

            foreach (MenuModel menusModel in menusModelList)
            {
                uspGetAuthorizedMenus_Result authorizedMenuEntity = ConvertToAuthorizedMenuEntity(menusModel);
                authorizedMenuEntityList.Add(authorizedMenuEntity);
            }

            return authorizedMenuEntityList;
        }

        public List<MenuModel> ConvertToAuthorizedMenusModelList(List<uspGetAuthorizedMenus_Result> authorizedMenuEntityList)
        {
            List<MenuModel> authorizedMenuModelList = new List<MenuModel>();

            foreach (uspGetAuthorizedMenus_Result authorizedMenuEntity in authorizedMenuEntityList)
            {
                MenuModel menusModel = ConvertToAuthorizedMenusModel(authorizedMenuEntity);
                authorizedMenuModelList.Add(menusModel);
            }

            return authorizedMenuModelList;
        }

        public uspGetPermissions_Result ConvertToPermissionEntity(PermissionModel permissionModel)
        {
            uspGetPermissions_Result permissionEntity = new uspGetPermissions_Result();

            permissionEntity.ID = permissionModel.ID;
            permissionEntity.CAPTION = permissionModel.CAPTION;
            permissionEntity.FunctionCode = permissionModel.FunctionCode;
            permissionEntity.LEVELS = permissionModel.LEVELS;
            permissionEntity.SCREENSEQUENCE = permissionModel.SCREENSEQUENCE;
            permissionEntity.Search = permissionModel.Search;
            permissionEntity.Add = permissionModel.Add;
            permissionEntity.Edit = permissionModel.Edit;
            permissionEntity.Delete = permissionModel.Delete;
            permissionEntity.View = permissionModel.View;

            return permissionEntity;
        }


        public PermissionModel ConvertToPermissionModel(uspGetPermissions_Result permissionEntity)
        {
            return objDAL.ConvertToPermissionModel(permissionEntity);
        }

        public List<uspGetPermissions_Result> ConvertToPermissionEntityList(List<PermissionModel> permissionModelList)
        {
            List<uspGetPermissions_Result> permissionEntityList = new List<uspGetPermissions_Result>();

            foreach (PermissionModel permissionModel in permissionModelList)
            {
                uspGetPermissions_Result permissionEntity = ConvertToPermissionEntity(permissionModel);
                permissionEntityList.Add(permissionEntity);
            }

            return permissionEntityList;
        }

        public List<PermissionModel> ConvertToPermissionModelList(List<uspGetPermissions_Result> permissionEntityList)
        {
            List<PermissionModel> permissionModelList = new List<PermissionModel>();

            foreach (uspGetPermissions_Result permissionEntity in permissionEntityList)
            {
                PermissionModel permissionModel = ConvertToPermissionModel(permissionEntity);
                permissionModelList.Add(permissionModel);
            }

            return permissionModelList;
        }

        public uspGetUserRoles_Result ConvertTouserRoleEntity(UserRoleModel UserRoleModel)
        {
            uspGetUserRoles_Result userRoleEntity = new uspGetUserRoles_Result();

            userRoleEntity.UserId = UserRoleModel.UserId;
            userRoleEntity.Username = UserRoleModel.Username;
            userRoleEntity.DisplayName = UserRoleModel.DisplayName;
            userRoleEntity.Email = UserRoleModel.Email;
            userRoleEntity.UserStatus = UserRoleModel.UserStatus;
            userRoleEntity.RoleId = UserRoleModel.RoleId;
            userRoleEntity.RoleName = UserRoleModel.RoleName;
            userRoleEntity.RoleDescription = UserRoleModel.RoleDescription;
            userRoleEntity.IsAdminRole = UserRoleModel.IsAdminRole;
            userRoleEntity.RoleStatus = UserRoleModel.RoleStatus;

            return userRoleEntity;
        }

        public UserRoleModel ConvertToUserRoleModel(uspGetUserRoles_Result userRoleEntity)
        {
            UserRoleModel UserRoleModel = new UserRoleModel();

            UserRoleModel.UserId = userRoleEntity.UserId;
            UserRoleModel.Username = userRoleEntity.Username;
            UserRoleModel.DisplayName = userRoleEntity.DisplayName;
            UserRoleModel.Email = userRoleEntity.Email;
            UserRoleModel.UserStatus = userRoleEntity.UserStatus;
            UserRoleModel.RoleId = userRoleEntity.RoleId;
            UserRoleModel.RoleName = userRoleEntity.RoleName;
            UserRoleModel.RoleDescription = userRoleEntity.RoleDescription;
            UserRoleModel.IsAdminRole = userRoleEntity.IsAdminRole;
            UserRoleModel.RoleStatus = userRoleEntity.RoleStatus;

            return UserRoleModel;
        }

        public List<uspGetUserRoles_Result> ConvertTouserRoleEntityList(List<UserRoleModel> UserRoleModelList)
        {
            List<uspGetUserRoles_Result> userRoleEntityList = new List<uspGetUserRoles_Result>();

            foreach (UserRoleModel UserRoleModel in UserRoleModelList)
            {
                uspGetUserRoles_Result userRoleEntity = ConvertTouserRoleEntity(UserRoleModel);
                userRoleEntityList.Add(userRoleEntity);
            }

            return userRoleEntityList;
        }

        public List<UserRoleModel> ConvertToUserRoleModelList(List<uspGetUserRoles_Result> userRoleEntityList)
        {
            List<UserRoleModel> UserRoleModelList = new List<UserRoleModel>();

            foreach (uspGetUserRoles_Result userRoleEntity in userRoleEntityList)
            {
                UserRoleModel UserRoleModel = ConvertToUserRoleModel(userRoleEntity);
                UserRoleModelList.Add(UserRoleModel);
            }

            return UserRoleModelList;
        }


        #endregion

        #region "Render HTML Menus"

        public string GetAllMenuRenderText(UserAuthorizationModel userName)
        {
            string retrunString = string.Empty;

            List<MenuModel> authorizedMenuModelList = GetAuthorizedMenusModelList(userName.Username, userName.CurrentUrl);
            List<MenuModel> level1AuthorizedMenuModelList = FilterAuthorizedMenusModelList(authorizedMenuModelList, 1, -1);

            retrunString += " <li class=\"header\" translate>MAIN NAVIGATION</li>";

            foreach (MenuModel lv1 in level1AuthorizedMenuModelList)
            {
                List<MenuModel> level2AuthorizedMenuModelList = FilterAuthorizedMenusModelList(authorizedMenuModelList, 2, lv1.ID);

                if (level2AuthorizedMenuModelList.Count == 0)
                {
                    retrunString += GetMenuRenderString(lv1, userName);
                }
                else
                {
                    retrunString += GetParentMenuRenderString(lv1, level2AuthorizedMenuModelList, userName);
                }
            }

            return retrunString;
        }

        public string GetMenuRenderString(MenuModel menumodel, UserAuthorizationModel userName)
        {
            string retrunString = string.Empty;

            retrunString += "<li>";
            retrunString += "<a href=\"" + userName.WebMvcUrl + "@URL\">";
            retrunString += "<i class=\"fa fa-th\"></i><span translate>@Caption</span>";
            retrunString += "</a>";
            retrunString += "</li>";

            retrunString = retrunString.Replace("@URL", menumodel.URL);
            retrunString = retrunString.Replace("@Caption", menumodel.Caption);

            return retrunString;
        }

        public string GetParentMenuRenderString(MenuModel menumodel, List<MenuModel> level2AuthorizedMenuModelList, UserAuthorizationModel userName)
        {
            string retrunString = string.Empty;

            retrunString += "<li class=\"treeview\">";
            retrunString += "<a href=\"#\">";
            retrunString += "<i class=\"fa @Icon\"></i>";
            retrunString += "<span translate>@Caption</span>";
            retrunString += "<i class=\"fa fa-angle-left pull-right\"></i>";
            retrunString += "</a>";
            retrunString += "@childMenu";
            retrunString += "</li>";

            if (string.IsNullOrEmpty(menumodel.IconName))
                retrunString = retrunString.Replace("@Icon", "fa-th");
            else
                retrunString = retrunString.Replace("@Icon", menumodel.IconName);

            retrunString = retrunString.Replace("@Caption", menumodel.Caption);
            retrunString = retrunString.Replace("@childMenu", GetAllChildMenuRenderString(level2AuthorizedMenuModelList, userName));

            return retrunString;
        }

        public string GetAllChildMenuRenderString(List<MenuModel> level2AuthorizedMenuModelList, UserAuthorizationModel userName)
        {
            string retrunString = string.Empty;

            if (level2AuthorizedMenuModelList.Count > 0 && level2AuthorizedMenuModelList[0].CurrentParent == level2AuthorizedMenuModelList[0].ParentID)
            {
                retrunString += "<ul class=\"treeview-menu  menu-open\"   style=\"display: block;\"  >";
            }
            else
            {
                retrunString += "<ul class=\"treeview-menu  menu-open\"   style=\"display: none;\"  >";
            }

            foreach (MenuModel lv2 in level2AuthorizedMenuModelList)
            {
                retrunString += GetChildMenuRenderString(lv2, userName);
            }

            retrunString += "</ul>";

            return retrunString;
        }

        public string GetChildMenuRenderString(MenuModel menumodel, UserAuthorizationModel userName)
        {
            string retrunString = string.Empty;

            retrunString += "<li id=\"@ID_URL\">";
            if (string.IsNullOrWhiteSpace(menumodel.URL))
            { retrunString += "<a href=\"..\\@URL\" >"; }
            else
            { retrunString += "<a href=\"" + userName.WebMvcUrl + "@URL\">"; }
            retrunString += "<i class=\"fa @Icon\"></i><span translate>@Caption</span>";
            retrunString += "</a>";
            retrunString += "</li>";

            if (string.IsNullOrEmpty(menumodel.IconName))
            {
                retrunString = retrunString.Replace("@Icon", "fa-th");
            }
            else
            {
                retrunString = retrunString.Replace("@Icon", menumodel.IconName);
            }

            retrunString = retrunString.Replace("@URL", menumodel.URL);
            retrunString = retrunString.Replace("@ID_URL", menumodel.URL.ToLower().Replace("/", ""));
            retrunString = retrunString.Replace("@Caption", menumodel.Caption);

            return retrunString;
        }

        # endregion

        #region "Other"
        public List<MenuModel> FilterAuthorizedMenusModelList(List<MenuModel> inputAuthorizedMenuModelList, int level, int parentId)
        {
            List<MenuModel> outputAuthorizedMenuModelList = new List<MenuModel>();

            foreach (MenuModel inputAuthorizedMenuModel in inputAuthorizedMenuModelList)
            {
                if ((inputAuthorizedMenuModel.Levels == level) &&
                    (parentId == -1 || parentId == inputAuthorizedMenuModel.ParentID) &&
                    inputAuthorizedMenuModel.Allow)
                {
                    outputAuthorizedMenuModelList.Add(inputAuthorizedMenuModel);
                }
            }

            return outputAuthorizedMenuModelList;
        }

        #endregion

        #region "Private"

        #endregion

    }
}
