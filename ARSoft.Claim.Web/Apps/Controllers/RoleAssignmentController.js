// *** Update by : Nutthapaphon Sopradisth ***
// *** Update Date : 01/11/2015 13:00  ***

var ARSoft_Claim_Web = angular.module("Permission", ['kendo.directives'])

ARSoft_Claim_Web.controller("RoleAssignmentController", function ($scope, $http, config, SYS_ROLE_PERMISSION_TYPE, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {
    // *** Create by : Nutthapaphon Sopradisth ***
    // *** Create Date : 10 July 2015 ***
    // *** Tab Web & Mobile ***
    // *** Initial Main Menu Sys Role Permission *** 

    if ($('#hdUserID').val() != undefined) {
        $scope.SysUserID = $('#hdUserID').val();
    } else {
        $scope.SysUserID = 1;
    }

    $scope.initial = function () {
        $scope.remindSave = false;
        akow_Authentication_CheckPermission($http);
        akow_Authentication_HttpGetL($http, WebApiUrl + 'RoleAssignment/GetSysRoleAll').success(function (resultQuery, status, headers, config) {
            if (resultQuery.Successfully) {
                $scope.DllSysRoleModels = resultQuery.Data;
            } else {
                $scope.DllSysRoleModels = null;
            }            
            console.log(resultQuery);
        }).error(function (result) {
            //alert(result.Message)
            console.log(result);
        });

        var sysRoleValue = $("#ddlSysRolePermission").val();
        if (sysRoleValue == null) {            
            $scope.RoleId = 1;            
            $scope.Level = 1;
        }

        /* $scope.edit = true;
        $scope.error = false;
        $scope.incomplete = false; */
        var webRoleAssignmentModel = {
            ID: 0,
            Caption: "",
            AllowGrant: true,
            AllowAdd: true,
            AllowEdit: true,
            AllowDelete: true,
            AllowView: true,
            RoleID: 1
        }

        akow_Authentication_HttpGetL($http, WebApiUrl + 'RoleAssignment/GetSysRolePermissionForGrid?Type=' + SYS_ROLE_PERMISSION_TYPE.WEB + '&RoleId=' + $scope.RoleId + '&Level=' + $scope.Level).success(function (resultQuery, status, headers, config) {
            if (resultQuery.Successfully) {
                //$scope.webRoleAssignmentList = resultQuery.Data;
                $scope.getWebRolePermissionDataList(resultQuery.Data);
            } else {
                $scope.webRoleAssignmentList = webRoleAssignmentModel;
            }            
        }).error(function (result) {
            $scope.webRoleAssignmentList = webRoleAssignmentModel;
        });

        // *** Create by : Nutthapaphon Sopradisth ***
        // *** Create Date : 10 July 2015 ***
        // *** Tab Web ***
        // *** Main Menu Sys Role Permission ***        
        $scope.mainGridWebOptions = {           
            dataSource: {
                data: $scope.webRoleAssignmentList
                //pageSize: $scope.pageSizes,
                //serverPaging: false,
                //serverSorting: false
            },
            sortable: false,
            pageable: false,
            columns: [
            {
                hidden: true,
                field: "ID",
                title: "ID",                
                width: "0%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }
            , {
                field: "Caption",
                title: "Permission",
                width: "40%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left;" },
                template: (function (dataItem) {
                    var caption;
                    if ((dataItem.Level == 1 && !dataItem.HasChild) || (dataItem.Level == 1 && dataItem.HasChild)) {
                        caption = "<label for=\"dataItem.Caption\">{{dataItem.Caption}}</label>"
                    }else{
                        caption = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for=\"dataItem.Caption\">{{dataItem.Caption}}</label>"
                    }

                    return caption;
                })                
            }
            , {
                field: "AllowGrant",
                title: "Grant",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: (function (dataItem) {
                    var AllowGrant;
                    AllowGrant = "<input type='checkbox' ng-model='dataItem.AllowGrant' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowGrant==true\" ng-change=\"chkChangeGrant(dataItem)\" />"

                    return AllowGrant;
                })                
            }
            , {
                field: "AllowAdd",
                title: "Add",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: (function (dataItem) {
                    var AllowAdd;
                    if (dataItem.Level == 2) {
                        AllowAdd = "<input type='checkbox' ng-model='dataItem.AllowAdd' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowAdd==true\" ng-change=\"chkChange(dataItem)\" />"
                    } else {
                        AllowAdd = ""
                    }

                    return AllowAdd;
                })                
            }
            , {
                field: "AllowEdit",
                title: "Edit",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: (function (dataItem) {
                    var AllowEdit;                    
                    if (dataItem.Level == 2) {
                        AllowEdit = "<input type='checkbox' ng-model='dataItem.AllowEdit' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowEdit==true\" ng-change=\"chkChange(dataItem)\" />"
                    } else {
                        AllowEdit = ""
                    }

                    return AllowEdit;
                })                
            }, {
                field: "AllowDelete",
                title: "Delete",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: (function (dataItem) {
                    var AllowDelete;                    
                    if (dataItem.Level == 2){
                        AllowDelete = "<input type='checkbox' ng-model='dataItem.AllowDelete' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowDelete==true\" ng-change=\"chkChange(dataItem)\" />"
                    } else {
                        AllowDelete = ""
                    }

                    return AllowDelete;
                })                
            }, {
                field: "AllowView",
                title: "View",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: (function (dataItem) {
                    var AllowView;                   
                    if (dataItem.Level == 2){
                        AllowView = "<input type='checkbox' ng-model='dataItem.AllowView' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowView==true\" ng-change=\"chkChange(dataItem)\" />"
                    } else {
                        AllowView = ""
                    }

                    return AllowView;
                })                
            }
            , {
                field: "Manage",
                title: "Manage",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: (function (dataItem) {
                    var manageButton;
                    if (dataItem.Level == 2 && dataItem.HasChild) {
                        manageButton = "<button id='btnManage' class='btn btn-primary' ng-click='showSetWebChildPermissionModal(dataItem.ID,dataItem.Caption,dataItem.AllowGrant,dataItem.AllowAdd,dataItem.AllowEdit,dataItem.AllowDelete,dataItem.AllowView)'><i class='fa fa-pencil'></i>&nbsp;Edit</button>"
                    } else if (dataItem.Level == 2) {
                        manageButton = "<button id='btnManage' class='btn btn-primary disabled' ng-click='showSetWebChildPermissionModal(dataItem.ID,dataItem.Caption,dataItem.AllowGrant,dataItem.AllowAdd,dataItem.AllowEdit,dataItem.AllowDelete,dataItem.AllowView)'><i class='fa fa-pencil'></i>&nbsp;Edit</button>"
                    }else{
                        manageButton = "";
                    }
                    
                    return manageButton;                
                })   
            }
            ]
        };

        // *** Create by : Nutthapaphon Sopradisth ***
        // *** Create Date : 10 July 2015 ***
        // *** Tab Web ***
        // *** Sub Menu Sys Role Permission ***        
        var childWebSysRoleModel = {
            ID: 0,
            Caption: "",
            AllowGrant: true,
            AllowAdd: true,
            AllowEdit: true,
            AllowDelete: true,
            AllowView: true,
            RoleID: 1
        }

        $scope.childGridWebOptions = {
            dataSource: childWebSysRoleModel,
            sortable: true,
            pageable: false,
            columns: [
            {
                hidden: true,
                field: "ID",
                title: "ID",
                width: "0%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }
            , {
                field: "Caption",
                title: "Permission",
                width: "40%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left;" }
            }
            , {
                field: "AllowGrant",
                title: "Grant",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: "<input type='checkbox' ng-model='dataItem.AllowGrant' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowGrant==true\" ng-change=\"chkChangeGrant(dataItem)\" />"
            }
            , {
                field: "AllowAdd",
                title: "Add",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: "<input type='checkbox' ng-model='dataItem.AllowAdd' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowAdd==true\" ng-change=\"chkChange(dataItem)\" />"
            }
            , {
                field: "AllowEdit",
                title: "Edit",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: "<input type='checkbox' ng-model='dataItem.AllowEdit' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowEdit==true\" ng-change=\"chkChange(dataItem)\" />"
            }, {
                field: "AllowDelete",
                title: "Delete",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: "<input type='checkbox' ng-model='dataItem.AllowDelete' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowDelete==true\" ng-change=\"chkChange(dataItem)\" />"
            }, {
                field: "AllowView",
                title: "View",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: "<input type='checkbox' ng-model='dataItem.AllowView' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowView==true\" ng-change=\"chkChange(dataItem)\" />"
            }, {
                field: "Manage",
                title: "Manage",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: (function (dataItem) {
                    var manageButton;
                    if (dataItem.Level == 3 && dataItem.HasChild) {
                        manageButton = "<button id='btnManage' class='btn btn-primary' ng-click='showSetWebSubChildPermissionModal(dataItem.ID,dataItem.Caption,dataItem.AllowGrant,dataItem.AllowAdd,dataItem.AllowEdit,dataItem.AllowDelete,dataItem.AllowView)'><i class='fa fa-pencil'></i>&nbsp;Edit</button>"
                    } else if (dataItem.Level == 3) {
                        manageButton = "<button id='btnManage' class='btn btn-primary disabled' ng-click='showSetWebSubChildPermissionModal(dataItem.ID,dataItem.Caption,dataItem.AllowGrant,dataItem.AllowAdd,dataItem.AllowEdit,dataItem.AllowDelete,dataItem.AllowView)'><i class='fa fa-pencil'></i>&nbsp;Edit</button>"
                    } else {
                        manageButton = "";
                    }

                    return manageButton;
                })
            }
            ]
        };
        
        // *** Create by : Nutthapaphon Sopradisth ***
        // *** Create Date : 10 July 2015 ***
        // *** Tab Mobile ***
        // *** Main Menu Sys Role Permission ***
        var sysRoleValue = $("#ddlSysRolePermission").val();
        if (sysRoleValue == null) {           
            $scope.RoleId = 1;            
            $scope.Level = 1;
        }
        
        var mobileRoleAssignmentModel = {
            ID: 0,
            Caption: "",
            AllowGrant: true,
            AllowAdd: true,
            AllowEdit: true,
            AllowDelete: true,
            AllowView: true,
            RoleID: 1
        }

        akow_Authentication_HttpGetL($http, WebApiUrl + 'RoleAssignment/GetSysRolePermissionForGrid?Type=' + SYS_ROLE_PERMISSION_TYPE.MOBILE + '&RoleId=' + $scope.RoleId + '&Level=' + $scope.Level).success(function (resultQuery, status, headers, config) {
            if (resultQuery.Successfully) {
                //$scope.mobileRoleAssignmentList = resultQuery.Data;
                $scope.getMobileRolePermissionDataList(resultQuery.Data);
            } else {
                $scope.mobileRoleAssignmentList = mobileRoleAssignmentModel;
            }            
        }).error(function (result) {
            $scope.mobileRoleAssignmentList = webSysRoleModel;
        });
        
        $scope.mainGridMobileOptions = {            
            dataSource: {
                data: $scope.mobileRoleAssignmentList
            },
            sortable: true,
            pageable: false,
            columns: [
            {
                hidden: true,
                field: "ID",
                title: "ID",
                width: "0%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }
            , {
                field: "Caption",
                title: "Permission",
                width: "40%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left;" },
                template: (function (dataItem) {
                    var caption;
                    if ((dataItem.Level == 1 && !dataItem.HasChild) || (dataItem.Level == 1 && dataItem.HasChild)) {
                        caption = "<label for=\"dataItem.Caption\">{{dataItem.Caption}}</label>"
                    } else {
                        caption = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for=\"dataItem.Caption\">{{dataItem.Caption}}</label>"
                    }

                    return caption;
                })               
            }
            , {
                field: "AllowGrant",
                title: "Grant",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: (function (dataItem) {
                    var AllowGrant;
                    AllowGrant = "<input type='checkbox' ng-model='dataItem.AllowGrant' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowGrant==true\" ng-change=\"chkChangeGrant(dataItem)\" />"

                    return AllowGrant;
                })                
            }
            , {
                field: "AllowAdd",
                title: "Add",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: (function (dataItem) {
                    var AllowAdd;
                    if (dataItem.Level == 2) {
                        AllowAdd = "<input type='checkbox' ng-model='dataItem.AllowAdd' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowAdd==true\" ng-change=\"chkChange(dataItem)\" />"
                    } else {
                        AllowAdd = ""
                    }

                    return AllowAdd;
                })                
            }
            , {
                field: "AllowEdit",
                title: "Edit",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: (function (dataItem) {
                    var AllowEdit;                    
                    if (dataItem.Level == 2) {
                        AllowEdit = "<input type='checkbox' ng-model='dataItem.AllowEdit' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowEdit==true\" ng-change=\"chkChange(dataItem)\" />"
                    } else {
                        AllowEdit = ""
                    }

                    return AllowEdit;
                })                
            }, {
                field: "AllowDelete",
                title: "Delete",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: (function (dataItem) {
                    var AllowDelete;                    
                    if (dataItem.Level == 2) {
                        AllowDelete = "<input type='checkbox' ng-model='dataItem.AllowDelete' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowDelete==true\" ng-change=\"chkChange(dataItem)\" />"
                    } else {
                        AllowDelete = ""
                    }

                    return AllowDelete;
                })                
            }, {
                field: "AllowView",
                title: "View",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: (function (dataItem) {
                    var AllowView;                    
                    if (dataItem.Level == 2) {
                        AllowView = "<input type='checkbox' ng-model='dataItem.AllowView' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowView==true\" ng-change=\"chkChange(dataItem)\" />"
                    } else {
                        AllowView = ""
                    }

                    return AllowView;
                })                
            }
            , {
                field: "Manage",
                title: "Manage",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: (function (dataItem) {
                    var manageButton;
                    if (dataItem.Level == 2 && dataItem.HasChild) {
                        manageButton = "<button id='btnManage' class='btn btn-success btn60px' ng-click='showSetMobileChildPermissionModal(dataItem.ID,dataItem.Caption,dataItem.AllowGrant,dataItem.AllowAdd,dataItem.AllowEdit,dataItem.AllowDelete,dataItem.AllowView)'><i class='fa fa-pencil fa-lg'></i>&nbsp;Edit</button>"
                    } else if (dataItem.Level == 2) {
                        manageButton = "<button id='btnManage' class='btn btn-success btn60px disabled' ng-click='showSetMobileChildPermissionModal(dataItem.ID,dataItem.Caption,dataItem.AllowGrant,dataItem.AllowAdd,dataItem.AllowEdit,dataItem.AllowDelete,dataItem.AllowView)'><i class='fa fa-pencil fa-lg'></i>&nbsp;Edit</button>"
                    }else{
                        manageButton = "";
                    }

                    return manageButton;
                })
            }
            ]
        };

        // *** Create by : Nutthapaphon Sopradisth ***
        // *** Create Date : 10 July 2015 ***
        // *** Tab Mobile ***
        // *** Sub Menu Sys Role Permission ***        
        var childMobileSysRoleModel = {
            ID: 0,
            Caption: "",
            AllowGrant: true,
            AllowAdd: true,
            AllowEdit: true,
            AllowDelete: true,
            AllowView: true,
            RoleID: 1
        }

        $scope.childGridMobileOptions = {
            dataSource: childMobileSysRoleModel,
            sortable: true,
            pageable: false,
            columns: [
            {
                hidden: true,
                field: "ID",
                title: "ID",
                width: "0%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }
            , {
                field: "Caption",
                title: "Permission",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left;" }
            }
            , {
                field: "AllowGrant",
                title: "Grant",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: "<input type='checkbox' ng-model='dataItem.AllowGrant' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowGrant==true\" ng-change=\"chkChangeGrant(dataItem)\" />"
            }
            , {
                field: "AllowAdd",
                title: "Add",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: "<input type='checkbox' ng-model='dataItem.AllowAdd' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowAdd==true\" ng-change=\"chkChange(dataItem)\" />"
            }
            , {
                field: "AllowEdit",
                title: "Edit",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: "<input type='checkbox' ng-model='dataItem.AllowEdit' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowEdit==true\" ng-change=\"chkChange(dataItem)\" />"
            }, {
                field: "AllowDelete",
                title: "Delete",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: "<input type='checkbox' ng-model='dataItem.AllowDelete' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowDelete==true\" ng-change=\"chkChange(dataItem)\" />"
            }, {
                field: "AllowView",
                title: "View",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: "<input type='checkbox' ng-model='dataItem.AllowView' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowView==true\" ng-change=\"chkChange(dataItem)\" />"
            }
            ]
        };

        // *** Create by : Jirawat Pipatpaisan ***
        // *** Create Date : 30 Dec 2015 ***
        // *** Tab SubWebChild ***
        var SubchildWebSysRoleModel = {
            ID: 0,
            Caption: "",
            AllowGrant: true,
            AllowAdd: true,
            AllowEdit: true,
            AllowDelete: true,
            AllowView: true,
            RoleID: 1
        }

        $scope.childGridSubWebOptions = {
            dataSource: SubchildWebSysRoleModel,
            sortable: true,
            pageable: false,
            columns: [
            {
                hidden: true,
                field: "ID",
                title: "ID",
                width: "0%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }
            , {
                field: "Caption",
                title: "Permission",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left;" }
            } , {
                   field: "AllowGrant",
                   title: "Grant",
                   width: "10%",
                   headerAttributes: { style: "text-align:center;" },
                   attributes: { style: "text-align:center;" },
                   template: (function (dataItem) {
                       var AllowGrant;
                       AllowGrant = "<input type='checkbox' ng-model='dataItem.AllowGrant' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowGrant==true\" ng-change=\"chkChangeGrant(dataItem)\" />"

                       return AllowGrant;
                   })
               } , {
                field: "AllowEdit",
                title: "Edit",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" },
                template: "<input type='checkbox' ng-model='dataItem.AllowEdit' ng-true-value=\"true\" ng-false-value=\"false\" ng-checked=\"dataItem.AllowEdit==true\" ng-change=\"chkChange(dataItem)\" />"
            }
            ]
        };
    }
  
    function refreshRoleAssignmentDataList(roleId) {
        //var ddlSysRolePermission = $("#ddlSysRolePermission");
        //ddlSysRolePermission.val(roleId);
        var ddlSysRolePermission = $("#ddlSysRolePermission").val();
        if (ddlSysRolePermission == null) {
            $scope.RoleId = 1;
        } 

        var gridWebRolePermission = $("#gridWebRolePermission").data("kendoGrid");
        akow_Authentication_HttpGetL($http, WebApiUrl + 'RoleAssignment/GetSysRolePermissionById?RoleId=' + roleId).success(function (resultQuery, status, headers, config) {
            if (resultQuery.Successfully) {
                gridWebRolePermission.dataSource.data(resultQuery.Data);
                gridWebRolePermission.refresh();
            }            
        }).error(function (Result) {
            alert(Result.Message);
        });

        var gridMobileRolePermission = $("#gridMobileRolePermission").data("kendoGrid");
        akow_Authentication_HttpGetL($http, WebApiUrl + 'RoleAssignment/GetSysRolePermissionById?RoleId=' + roleId).success(function (resultQuery, status, headers, config) {
            if (resultQuery.Successfully) {
                gridMobileRolePermission.dataSource.data(resultQuery.Data);
                gridMobileRolePermission.refresh();
            }            
        }).error(function (Result) {
            alert(Result.Message);
        });
    }
    
    $scope.getWebRolePermissionDataList = function (dataItem) {
        var gridWebRolePermission = $("#gridWebRolePermission").data("kendoGrid");
        if (gridWebRolePermission != undefined) {
            gridWebRolePermission.dataSource.data(dataItem);
            gridWebRolePermission.refresh();
        }        
    }

    $scope.getMobileRolePermissionDataList = function (dataItem) {
        var gridMobileRolePermission = $("#gridMobileRolePermission").data("kendoGrid");
        if (gridMobileRolePermission != undefined) {
            gridMobileRolePermission.dataSource.data(dataItem);
            gridMobileRolePermission.refresh();
        }        
    }

    $scope.getSysRolePermission = function (roleId) {       
        $scope.RoleId = roleId;        
        akow_Authentication_HttpGetL($http, WebApiUrl + 'RoleAssignment/GetSysRolePermissionById?Type=' + SYS_ROLE_PERMISSION_TYPE.WEB + '&RoleId=' + $scope.RoleId + '&Level=' + $scope.Level).success(function (resultQuery, status, headers, config) {        
            if (resultQuery.Successfully) {                                
                $scope.getWebRolePermissionDataList(resultQuery.Data);
            }
        }).error(function (result) {
            alert(result.Message);           
        });
        
        var gridMobileRolePermission = $("#gridMobileRolePermission").data("kendoGrid");
        akow_Authentication_HttpGetL($http, WebApiUrl + 'RoleAssignment/GetSysRolePermissionById?Type=' + SYS_ROLE_PERMISSION_TYPE.MOBILE + '&RoleId=' + $scope.RoleId + '&Level=' + $scope.Level).success(function (resultQuery, status, headers, config) {        
            if (resultQuery.Successfully) {                
                $scope.getMobileRolePermissionDataList(resultQuery.Data);
            } 
        }).error(function (result) {
            alert(result.Message);            
        });
    };

    $scope.chkChangeGrant = function (dataItem) {
        $scope.remindSave = true;
        if (dataItem.AllowGrant) {
            dataItem.AllowAdd = true;
            dataItem.AllowEdit = true;
            dataItem.AllowDelete = true;
            dataItem.AllowView = true;
        } else {          
            dataItem.AllowAdd = false;
            dataItem.AllowEdit = false;
            dataItem.AllowDelete = false;
            dataItem.AllowView = false;            
        }
    };

    $scope.chkChange = function (dataItem) {
        $scope.remindSave = true;
        if (dataItem.AllowAdd || dataItem.AllowEdit || dataItem.AllowDelete || dataItem.AllowView) { 
            dataItem.AllowGrant = true;
        } else {            
            dataItem.AllowGrant = true;
        }
    };

    $scope.showConfirmUpdateModal = function () {        
        akow_Messagebox_Msgbox('ท่านต้องการบันทึกข้อมูล Permission ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.saveSysRolePermission(); }, null);

        return false;
    };
 
    $scope.showSetWebChildPermissionModal = function (parentId, Caption, AllowGrant, AllowAdd, AllowEdit, AllowDelete, AllowView) {        
        var roleId = 1;
        var level = 3;
        var type = SYS_ROLE_PERMISSION_TYPE.WEB;

        var sysRoleValue = $("#ddlSysRolePermission").val();        
        $("#childWebTitle").text(Caption);
        
        if (sysRoleValue != null) {
            roleId = sysRoleValue;
        }
        
        akow_Authentication_HttpGetL($http, WebApiUrl + 'RoleAssignment/GetChildSysRolePermission?Type=' + type + '&RoleId=' + roleId + '&Level=' + level + '&parentId=' + parentId).success(function (resultQuery, status, headers, config) {        
            if (resultQuery.Successfully) {                             
                var gridWebChildRolePermission = $("#gridWebChildRolePermission").data("kendoGrid");
                if (gridWebChildRolePermission != undefined) {
                    gridWebChildRolePermission.dataSource.data(resultQuery.Data);
                    gridWebChildRolePermission.refresh();
                }
            }                
        }).error(function (result) {
            alert(result.Message);                
            });

        $('#frmSetWebChildPermissionModal').modal('toggle');

        return false;
    };

    $scope.showSetWebSubChildPermissionModal = function (parentId, Caption, AllowGrant, AllowAdd, AllowEdit, AllowDelete, AllowView) {
        var roleId = 1;
        var level = 4;
        var type = SYS_ROLE_PERMISSION_TYPE.WEB;

        var sysRoleValue = $("#ddlSysRolePermission").val();
        $("#childWebSubTitle").text(Caption);

        if (sysRoleValue != null) {
            roleId = sysRoleValue;
        }

        akow_Authentication_HttpGetL($http, WebApiUrl + 'RoleAssignment/GetChildSysRolePermission?Type=' + type + '&RoleId=' + roleId + '&Level=' + level + '&parentId=' + parentId).success(function (resultQuery, status, headers, config) {
            if (resultQuery.Successfully) {
                var gridWebChildRolePermission = $("#gridWebSubChildRolePermission").data("kendoGrid");
                if (gridWebChildRolePermission != undefined) {
                    gridWebChildRolePermission.dataSource.data(resultQuery.Data);
                    gridWebChildRolePermission.refresh();
                }
            }
        }).error(function (result) {
            alert(result.Message);
        });

        $('#frmSetWebSubChildPermissionModal').modal('toggle');

        return false;
    };

    $scope.showSetMobileChildPermissionModal = function (parentId, Caption, AllowGrant, AllowAdd, AllowEdit, AllowDelete, AllowView) {
        var roleId = 1;
        var level = 3;
        var type = SYS_ROLE_PERMISSION_TYPE.MOBILE;

        var sysRoleValue = $("#ddlRoleAssignment").val();
        $("#childMobileTitle").text(Caption);

        if (sysRoleValue != null) {
            roleId = sysRoleValue;
        }
        
        akow_Authentication_HttpGetL($http, WebApiUrl + 'RoleAssignment/GetChildSysRolePermission?Type=' + type + '&RoleId=' + roleId + '&Level=' + level + '&parentId=' + parentId).success(function (resultQuery, status, headers, config) {        
            if (resultQuery.Successfully) {                
                var gridMobileChildRolePermission = $("#gridMobileChildRolePermission").data("kendoGrid");
                if (gridMobileChildRolePermission != undefined) {
                    gridMobileChildRolePermission.dataSource.data(resultQuery.Data);
                    gridMobileChildRolePermission.refresh();
                }
            }           
        }).error(function (result) {
            alert(result.Message);            
        });

        $('#frmSetMobileChildPermissionModal').modal('toggle');

        return false;
    };

    $scope.saveSysRolePermission = function () {       
        var gridWebRolePermission = $("#gridWebRolePermission").data("kendoGrid");
        var listOfPermissionWeb = gridWebRolePermission.dataSource.data();
        var sysRoleValue = $("#ddlSysRolePermission").val();
        $scope.sysRoleArray = [];

        for (var i = 0; i < listOfPermissionWeb.length; i++) {
            var SysRoleModel = {        
                ID: listOfPermissionWeb[i].ID,
                Caption: listOfPermissionWeb[i].Caption,
                AllowGrant: listOfPermissionWeb[i].AllowGrant,
                AllowAdd: listOfPermissionWeb[i].AllowAdd,
                AllowEdit: listOfPermissionWeb[i].AllowEdit,
                AllowDelete: listOfPermissionWeb[i].AllowDelete,
                AllowView: listOfPermissionWeb[i].AllowView,
                RoleID: sysRoleValue == null ? 0 : sysRoleValue,
                CreatedBy: $scope.SysUserID,
                UpdatedBy: $scope.SysUserID
            }
            $scope.sysRoleArray.push(SysRoleModel);
        }
        
        var gridMobileRolePermission = $("#gridMobileRolePermission").data("kendoGrid");
        var listOfPermissionMobile = gridMobileRolePermission.dataSource.data();       
        for (var i = 0; i < listOfPermissionMobile.length; i++) {
            var SysRoleModel = {
                ID: listOfPermissionMobile[i].ID,
                Caption: listOfPermissionMobile[i].Caption,
                AllowGrant: listOfPermissionMobile[i].AllowGrant,
                AllowAdd: listOfPermissionMobile[i].AllowAdd,
                AllowEdit: listOfPermissionMobile[i].AllowEdit,
                AllowDelete: listOfPermissionMobile[i].AllowDelete,
                AllowView: listOfPermissionMobile[i].AllowView,
                RoleID: sysRoleValue == null ? 0 : sysRoleValue,
                CreatedBy: $scope.SysUserID,
                UpdatedBy: $scope.SysUserID
            }
            $scope.sysRoleArray.push(SysRoleModel);
        }
       
        akow_Authentication_HttpPostL($http, WebApiUrl + 'RoleAssignment/Post', $scope.sysRoleArray).success(function (resultAction, status, headers, config) {
            if (resultAction.Successfully) {
                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, refreshRoleAssignmentDataList(SysRoleModel.RoleID), null);
            } else {
                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }

            console.log(resultAction);
        }).error(function (result, status, headers, config) {
            alert(result.Message);            
        });
    }
    
    $scope.saveWebChildSysRolePermission = function () {
        var gridWebChildRolePermission = $("#gridWebChildRolePermission").data("kendoGrid");
        var listOfPermissionWeb = gridWebChildRolePermission.dataSource.data();
        var sysRoleValue = $("#ddlSysRolePermission").val();
        $scope.sysRoleWebChildArray = [];

        for (var i = 0; i < listOfPermissionWeb.length; i++) {
            var SysRoleModel = {
                ID: listOfPermissionWeb[i].ID,
                Caption: listOfPermissionWeb[i].Caption,
                AllowGrant: listOfPermissionWeb[i].AllowGrant,
                AllowAdd: listOfPermissionWeb[i].AllowAdd,
                AllowEdit: listOfPermissionWeb[i].AllowEdit,
                AllowDelete: listOfPermissionWeb[i].AllowDelete,
                AllowView: listOfPermissionWeb[i].AllowView,
                RoleID: sysRoleValue == null ? 0 : sysRoleValue,
                CreatedBy: $scope.SysUserID,
                UpdatedBy: $scope.SysUserID
            }
            $scope.sysRoleWebChildArray.push(SysRoleModel);
        }
        
        akow_Authentication_HttpPostL($http, WebApiUrl + 'RoleAssignment/Post', $scope.sysRoleWebChildArray).success(function (resultAction, status, headers, config) {
            if (resultAction.Successfully) {
                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, refreshRoleAssignmentDataList(SysRoleModel.RoleID), null);
            } else {
                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }
            console.log(resultAction);
        }).error(function (result, status, headers, config) {
            alert(result.Message);
        });
    }
    
    $scope.saveSubWebChildSysRolePermission = function () {
        var gridSubWebChildRolePermission = $("#gridWebSubChildRolePermission").data("kendoGrid");
        var listOfPermissionWeb = gridSubWebChildRolePermission.dataSource.data();
        var sysRoleValue = $("#ddlSysRolePermission").val();
        $scope.sysRoleSubWebChildArray = [];

        for (var i = 0; i < listOfPermissionWeb.length; i++) {
            var SysRoleModel = {
                ID: listOfPermissionWeb[i].ID,
                Caption: listOfPermissionWeb[i].Caption,
                AllowGrant: listOfPermissionWeb[i].AllowGrant,
                AllowAdd: listOfPermissionWeb[i].AllowAdd,
                AllowEdit: listOfPermissionWeb[i].AllowEdit,
                AllowDelete: listOfPermissionWeb[i].AllowDelete,
                AllowView: listOfPermissionWeb[i].AllowView,
                RoleID: sysRoleValue == null ? 0 : sysRoleValue,
                CreatedBy: $scope.SysUserID,
                UpdatedBy: $scope.SysUserID
            }
            $scope.sysRoleSubWebChildArray.push(SysRoleModel);
        }

        akow_Authentication_HttpPostL($http, WebApiUrl + 'RoleAssignment/Post', $scope.sysRoleSubWebChildArray).success(function (resultAction, status, headers, config) {
            if (resultAction.Successfully) {
                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, refreshRoleAssignmentDataList(SysRoleModel.RoleID), null);
            } else {
                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }
            console.log(resultAction);
        }).error(function (result, status, headers, config) {
            alert(result.Message);
        });
    }


    $scope.saveMobileChildSysRolePermission = function () {
        var gridMobileChildRolePermission = $("#gridMobileChildRolePermission").data("kendoGrid");
        var listOfPermissionMobile = gridMobileChildRolePermission.dataSource.data();
        var sysRoleValue = $("#ddlSysRolePermission").val();
        $scope.sysRoleMobileChildArray = [];

        for (var i = 0; i < listOfPermissionMobile.length; i++) {
            var SysRoleModel = {
                ID: listOfPermissionMobile[i].ID,
                Caption: listOfPermissionMobile[i].Caption,
                AllowGrant: listOfPermissionMobile[i].AllowGrant,
                AllowAdd: listOfPermissionMobile[i].AllowAdd,
                AllowEdit: listOfPermissionMobile[i].AllowEdit,
                AllowDelete: listOfPermissionMobile[i].AllowDelete,
                AllowView: listOfPermissionMobile[i].AllowView,
                RoleID: sysRoleValue == null ? 0 : sysRoleValue,
                CreatedBy: $scope.SysUserID,
                UpdatedBy: $scope.SysUserID
            }
            $scope.sysRoleMobileChildArray.push(SysRoleModel);
        }
        
        akow_Authentication_HttpPostL($http, WebApiUrl + 'RoleAssignment/Post', $scope.sysRoleMobileChildArray).success(function (resultAction, status, headers, config) {
            if (resultAction.Successfully) {
                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, refreshRoleAssignmentDataList(SysRoleModel.RoleID), null);
            } else {
                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }
            console.log(resultAction);
        }).error(function (result, status, headers, config) {
            alert(result.Message);
        });
    }
});