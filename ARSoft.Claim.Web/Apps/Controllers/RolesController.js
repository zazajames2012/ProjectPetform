var mvcPath = $("#hdWebMvcUrl").val();
var WebApiUrl = $("#hdWebApiUrl").val();

var ARSoft_Claim_Web = angular.module("Roles", ['kendo.directives', 'ui.bootstrap'])

ARSoft_Claim_Web.controller("RolesController", function ($scope, $http, config, $modal, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {
    $scope.pageSizes = config.pageSize;

    if ($('#hdUserID').val() != undefined) {
        $scope.SysUserID = $('#hdUserID').val();
    } else {
        $scope.SysUserID = 1;
    };

    $scope.search = function () {

        var grid = $("#mainGrid").data("kendoGrid");
        $scope.IsSearch = true;
        grid.dataSource.query({ page: 1, pageSize: $scope.pageSizes, sort: null });
    };
    $scope.initial = function () {
        $scope.SearchPageNo = 1;
        $scope.SearchSort = null;
        $scope.SearchPageSize = $scope.pageSizes;
        akow_Authentication_CheckPermission($http);
        $scope.IsSearch = false;
    };
    $scope.mainGridOptionsRole = {
        dataSource: {
            schema: {
                data: function (data) {
                    if (data != null) {
                        return data;
                    }
                    else {
                        return '';
                    }
                },
                total: function (data) {
                    if (data != null) {
                        return data[0].RecordCount;
                    }
                    else {
                        return 0;
                    }
                }
            },
            pageSize: $scope.pageSizes,
            serverPaging: true,
            serverSorting: true,
            transport: {

                read: function (e) {
                    kendo.ui.progress($("#mainGrid"), false);

                    var Model = {};

                    if ($scope.IsSearch || $scope.TempSearch == null) {
                        Model = {
                            RoleName: $scope.searchName,
                            Description: $scope.searchDescription,
                            //StrStatus: ($scope.searchIsActive == null ? "" : $scope.searchIsActive + ",") + ($scope.searchIsInactive == null ? "" : $scope.searchIsInactive),
                            StrStatus:'0,1',
                            IsSearch: $scope.IsSearch
                        };
                        $scope.TempSearch = Model;

                    } else {

                        Model = $scope.TempSearch;
                    }

                    var sortField = '';
                    if (e.data.sort != null) {
                        if (e.data.sort[0] != null) {
                            sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            $scope.SearchSort = e.data.sort[0];
                        }
                        else {
                            $scope.SearchSort = null;
                        }
                    }
                    else {
                        $scope.SearchSort = null;
                    }

                    $scope.SearchPageNo = e.data.page;
                    $scope.SearchPageSize = e.data.pageSize;

                    akow_Authentication_HttpPostL($http, WebApiUrl + 'Roles/GetRoleAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(Model))
                        .success(function (resultAction, status, headers, config) {
                            if (resultAction.Successfully) {
                                if (resultAction.Data != '') {
                                    e.success(resultAction.Data);
                                }
                                else {
                                    e.success();
                                }
                            }
                            else {
                                e.success();
                            }

                        })
                        .error(function (resultAction, status, headers, config) {
                            e.success();
                        });
                }
            }
        },
        sortable: true,
        selectable: "row",
        pageable: {
            pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        },
        columns: [
        {
            hidden: false,
            field: "RowNumber",
            title: "ลำดับ",
            width: "8%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" },
            sortable: false

        }
        ,
        {
            hidden: true,
            field: "ID",
            title: "ID",
            width: "0%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" },
            sortable: false
        }
        ,
        {
            field: "RoleName",
            title: "ชื่อ",
            width: "35%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left; vertical-align:top;" }
        }
        ,
        {
            field: "Description",
            title: "รายละเอียด",
            width: "40%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left; vertical-align:top;" }
        }
        , {
            hidden: true,
            field: "Status",
            title: "Status ID",
            width: "0%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left; vertical-align:top;" }
        }
        , {
            hidden: false,
            field: "StatusName",
            title: "สถานะ",
            width: "10%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left; vertical-align:top;" }
        }
        , {
            hidden: true,
            field: "Admin",
            title: "สิทธิ",
            width: "0%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left; vertical-align:top;" }
        }
        , {
            hidden:false,
            field: "AdminStatus",
            title: "สิทธิ Admin",
            width: "10%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left; vertical-align:top;" }
        }
        ,
        {
            title: "จัดการข้อมูล",
            width: "160px",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:center; vertical-align:top;" },
            template: "<button class='btn btn-primary akow-viewbutton' ng-click='view(dataItem)'><i class='fa fa-eye'></i></button>"
                    + "&nbsp;&nbsp;<button class='btn btn-primary akow-editbutton' ng-click='edit(dataItem)'><i class='fa fa-pencil'></i></button>"
                    + "&nbsp;&nbsp;<button class='btn btn-danger akow-deletebutton' ng-click='deleteDetails(dataItem)'><i class='fa fa-trash'></i></button>"
        }

        ]
             , dataBound: function (dataItem) {
                 akow_Authentication_CheckPermission($http);
                 $scope.IsSearch = false;
             }
    }

    $scope.view = function (dataItem) {
        openLoadingProgress();
        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl + 'Roles/ViewRoles',
            controller: 'RolesModalController',
            size: 'md',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return param = {
                        dataItem: dataItem,
                        mode: "View"
                    };
                }
            }
        });

        modalInstance.result
                .then(
                        function () {
                        }, function () {
                            refreshGrid();
                        });
    };

    $scope.add = function () {
        openLoadingProgress();
        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl + 'Roles/AddRoles',
            controller: 'RolesModalController',
            size: 'md',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return param = {
                        mode: "Add",
                        SysUserID: $scope.SysUserID
                    };
                }
            }
        });

        modalInstance.result
                .then(
                        function () {
                        }, function () {
                            refreshGrid();
                        });
    };

    $scope.edit = function (dataItem) {
        openLoadingProgress();

        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl + 'Roles/EditRoles',
            controller: 'RolesModalController',
            size: 'md',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return param = {
                        dataItem: dataItem,
                        mode: "Edit",
                        SysUserID: $scope.SysUserID
                    };
                }
            }
        });

        modalInstance.result
                .then(
                        function () {
                        }, function () {
                            refreshGrid();
                        });
    };

    $scope.deleteDetails = function (dataItem) {
        akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูล ' + dataItem.RoleName + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.delete(dataItem); }, null);
    }

    $scope.delete = function (dataItem) {
        $scope.ID = dataItem.ID;

        var Model = {
            ID: $scope.ID
        };

        akow_Authentication_HttpPostL($http, WebApiUrl + 'Roles/DeleteRoles', Model).success(function (resultAction, status, headers, config) {
            if (resultAction.Successfully) {
                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, refreshGrid(), null);
            } else {
                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }
            console.log(resultAction);
        }).error(function (result, status, headers, config) {
            console.log(result);
        });
    }

    function refreshGrid() {
        var grid = $("#mainGrid").data("kendoGrid");
        $scope.IsSearch = false;
        grid.dataSource.query({ page: $scope.SearchPageNo, pageSize: $scope.SearchPageSize, sort: $scope.SearchSort });
    }

});

ARSoft_Claim_Web.controller("RolesModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {
    $scope.SysUserID = parameter.SysUserID;
    $scope.skillgroup_add_Status = 1;

    if (parameter.mode == "Add") {

        $scope.initial = function () {
            akow_Authentication_CheckPermission($http);
            closeLoadingProgress();
        };

        $scope.saveAdd = function () {
            if (!akow_Validate_ValidateInput()) {
                return false;
            }

            var Model = {
                RoleName: $scope.roles_add_Name,
                Description: $scope.roles_add_Description,
                CreatedBy: $scope.SysUserID,
                UpdatedBy: $scope.SysUserID
            };
            akow_Authentication_HttpPostL($http, WebApiUrl + 'Roles/AddRoles', Model).success(function (response, status, headers, config) {
                if (response.Successfully) {
                    akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, null, null);
                    $modalInstance.dismiss('cancel');
                }
                else {
                    akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
                }
            }).error(function (response, status, headers, config) {
                alert(response.Message);
                console.log(status);
            });
        }
    } else if (parameter.mode == "Edit") {
        $scope.initial = function () {
            akow_Authentication_CheckPermission($http);
            closeLoadingProgress();
        };

        akow_Authentication_HttpGetL($http, WebApiUrl + 'Roles/GetRolesByID?ID=' + parameter.dataItem.ID).success(function (response, status, headers, config) {
            if (response.Successfully) {
                $scope.ID = response.Data.ID;
                $scope.roles_edit_RoleName = response.Data.RoleName;
                $scope.roles_edit_Description = response.Data.Description;
                $scope.roles_edit_Status = response.Data.Status;
                $scope.roles_edit_Admin = response.Data.Admin;
            }
            else {
                alert(response.Message);
            }
        }).error(function (response, status, headers, config) {
            alert(response.Message);
        });

        $scope.saveEdit = function () {
            if (!akow_Validate_ValidateInput()) {
                return false;
            }

            var Model = {
                ID: $scope.ID,
                RoleName: $scope.roles_edit_RoleName,
                Description: $scope.roles_edit_Description,
                Status:$scope.roles_edit_Status,
                Admin: $scope.roles_edit_Admin==1 ? true : false ,
                UpdatedBy: $scope.SysUserID
            };
            akow_Authentication_HttpPostL($http, WebApiUrl + 'Roles/EditRoles', Model).success(function (response, status, headers, config) {
                if (response.Successfully) {
                    akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, null, null);
                    $modalInstance.dismiss('cancel');
                }
                else {
                    akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
                }
            }).error(function (response, status, headers, config) {
                alert(response.Message);
                console.log(status);
            });
        }
    } else if (parameter.mode == "View") {
        $scope.initial = function () {
            akow_Authentication_DisableByID("modal-body");
            closeLoadingProgress();
        }

        akow_Authentication_HttpGetL($http, WebApiUrl + 'Roles/GetRolesByID?ID=' + parameter.dataItem.ID).success(function (response, status, headers, config) {
            if (response.Successfully) {
                $scope.ID = response.Data.ID;
                $scope.roles_view_Name = response.Data.RoleName;
                $scope.roles_view_Description = response.Data.Description;
                $scope.roles_view_Status = response.Data.Status;
                $scope.roles_view_Admin = response.Data.Admin;
            }
            else {
                alert(response.Message);
            }
        }).error(function (response, status, headers, config) {
            alert(response.Message);
        });
    }

    $scope.Close = function () {
        $modalInstance.close();
    };
});