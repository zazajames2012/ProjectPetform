// *** Update by : Nutthapaphon Sopradisth ***
// *** Update Date : 30/06/2016 13:00  ***

var ARSoft_Claim_Web = angular.module("Business", ['kendo.directives', 'ui.bootstrap'])

ARSoft_Claim_Web.controller("BusinessController", function ($scope, $http, config, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {
    debugger;

    $scope.pageSizes = config.pageSize;
    $scope.IsSearch = false;

    if ($('#hdUserID').val() != undefined) {
        $scope.SysUserID = $('#hdUserID').val();
    } else {
        $scope.SysUserID = 1;
    };

    $scope.getBusinessCriteria = function () {
        $scope.IsSearch = true;
        var grid = $("#gridBusinessList").data("kendoGrid");
        grid.dataSource.query({ page: 1, pageSize: $scope.pageSizes, sort: null });
    };

    $scope.initial = function () {
        akow_Authentication_CheckPermission($http);
        $scope.resetValueCriteria();

        $scope.mainGridOptions = {
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
                        kendo.ui.progress($("#gridBusinessList"), false);

                        var PositionModel = {
                            Name: $scope.criteria_PositionName,
                            IsSearch: $scope.IsSearch
                        };
                        //  console.log(PositionModel);
                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Position/GetAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(PositionModel))
                            .success(function (resultQuery, status, headers, config) {
                                if (resultQuery.Successfully) {
                                    if (resultQuery.Data != '') {
                                        e.success(resultQuery.Data);
                                    }
                                    else {
                                        e.success();
                                    }
                                }
                                else {
                                    e.success();
                                }

                                //    $scope.resetValueCriteria();
                                var hgrid = $("#chkHeadGridPosition").removeAttr('checked');
                            })
                            .error(function (resultQuery, status, headers, config) {
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
                title: "No",
                width: "7%",
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
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
            }
            ,
            {
                field: "Name",
                title: "Position Name",
                width: "35%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            ,
            {
                field: "ShortName",
                title: "Short Name",
                width: "28%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            , {
                field: "Levels",
                title: "Levels",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" }
            }
            , {
                field: "StatusName",
                title: "Status",
                width: "20%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            ,
            {
                title: "Manage",
                width: "200px",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" },
                template:"&nbsp;&nbsp;<button class='btn btn-primary akow-editbutton' ng-click='editDetails(dataItem)'><i class='fa fa-pencil'></i></button>"
                        + "&nbsp;&nbsp;<button class='btn btn-danger akow-deletebutton' ng-click='deleteDetails(dataItem)'><i class='fa fa-trash'></i></button>" 
            }
            ]
            , dataBound: function (dataItem) {
                akow_Authentication_CheckPermission($http);
                $scope.IsSearch = false;
            }
        }
    }

    $scope.editDetails = function (dataItem) {
        $scope.editBusiness(dataItem);
    }

    $scope.deleteDetails = function (dataItem) {
        akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูล ' + dataItem.Name + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.deleteBusiness(dataItem); }, null);

        return false;
    }

    $scope.addBusiness = function () {
        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
                    + 'Business/AddBusinessModal',
            controller: 'BusinessModalController',
            windowClass: 'app-modal-window-Position',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        PositionID: 0,
                        mode: "AddCreate",
                        SysUserID: $scope.SysUserID
                    };
                }
            }
        });

        modalInstance.result
                .then(
                        function () {
                        }, function () {
                        });
    };

    $scope.editBusiness = function (dataItem) {
        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
                    + 'Business/EditBusinessModal',
            controller: 'BusinessModalController',
            windowClass: 'app-modal-window-edit-Position',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        mode: "EditCreate",
                        PositionID: dataItem.ID,
                        dataItem: dataItem,
                        SysUserID: $scope.SysUserID
                    };
                }
            }
        });

        modalInstance.result
                .then(
                        function () {
                        }, function () {
                        });
    };

    $scope.deleteBusiness = function (dataItem) {
        var PositionModel = {
            ID: dataItem.ID
        };

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Position/Delete', PositionModel).success(function (resultQuery, status, headers, config) {
            if (resultQuery.Successfully) {
                akow_Messagebox_Msgbox(resultQuery.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, refreshGridPositionDataList(), null);
            } else {
                akow_Messagebox_Msgbox(resultQuery.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }
            console.log(resultQuery);
        }).error(function (result, status, headers, config) {
            console.log(result);
        });
    }

    $scope.resetValueCriteria = function () {
        $scope.IsSearch = false;
        $scope.criteria_PositionName = '';
    }

    function refreshGridPositionDataList() {

        var grid = $("#gridBusinessList").data("kendoGrid");
        $scope.IsSearch = false;

        grid.dataSource.query({ page: 1, pageSize: 10, sort: null });

        //var PositionModel = {
        //    ID: 0
        //};

        //var pageIndex = 1;
        //var pageSize = 10;
        //var sortField = null;

        //akow_Authentication_HttpPostL($http, WebApiUrl + 'Position/GetAll?PageIndex=' + pageIndex + '&PageSize=' + pageSize + '&Sort=' + sortField, JSON.stringify(PositionModel))
        //    .success(function (resultQuery, status, headers, config) {
        //        var gridPositionList = $("#gridPositionList").data("kendoGrid");
        //        gridPositionList.dataSource.read(resultQuery.Data);
        //        console.log(resultQuery);
        //    }).error(function (result) {
        //        console.log(status);
        //    });
    }
});

ARSoft_Claim_Web.controller("BusinessModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {
    $scope.pageSizes = config.pageSize;
    $scope.PositionID = parameter.PositionID;
    $scope.IsDefaultSystem = false;
    $scope.ActionMode = parameter.mode;

    initialVariablePosition(parameter.mode);

    if (parameter.mode == "AddCreate") {
        closeLoadingProgress();
        $scope.addBusiness = function () {
            if (!akow_Validate_ValidateInput()) {
                return false;
            }

            $scope.mas_add_Levels = $("#txtLevels").data("kendoNumericTextBox").value();

            var positionModel = {
                //ID: $scope.mas_add_ID,
                Code: $scope.mas_add_Code,
                Name: $scope.mas_add_Name,
                ShortName: $scope.mas_add_ShortName,
                Levels: $scope.mas_add_Levels,
                Status: $scope.mas_add_Status,
                CreatedBy: $scope.mas_add_CreatedBy
                //CreatedDate: $scope.mas_add_CreatedDate
                //UpdatedBy: $scope.mas_add_UpdatedBy,
                //UpdatedDate: $scope.mas_add_UpdatedDate
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Position/Post', JSON.stringify(positionModel)).success(function (resultAction, status, headers, config) {
                if (resultAction.Successfully) {
                    akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, function () { $scope.refreshDataList(); }, null);
                } else {
                    akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
                }
                console.log(resultAction);
            }).error(function (result, status, headers, config) {
                console.log(result);
            });
        }
    } else if (parameter.mode == "EditCreate") {
        var positionModel = {
            ID: $scope.PositionID
        };

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Position/GetByID', positionModel).success(function (resultQuery, status, headers, config) {
            if (resultQuery.Successfully) {
                var positionModel = resultQuery.Data;

                $scope.mas_edit_ID = positionModel.ID;
                $scope.mas_edit_Code = positionModel.Code;
                $scope.mas_edit_Name = positionModel.Name;
                $scope.mas_edit_ShortName = positionModel.ShortName;
                $scope.mas_edit_Levels = positionModel.Levels;
                $scope.mas_edit_Status = positionModel.Status;
                $scope.mas_edit_CreatedBy = positionModel.CreatedBy;
                $scope.mas_edit_CreatedDate = positionModel.CreatedDate;
                $scope.mas_edit_UpdatedBy = positionModel.UpdatedBy;
                $scope.mas_edit_UpdatedDate = positionModel.UpdatedDate;
                $("#txtLevels").data("kendoNumericTextBox").value($scope.mas_edit_Levels);
            }
        }).error(function (result) {
            console.log(result.Message);
        });

        $scope.editBusiness = function () {
            if (!akow_Validate_ValidateInput()) {
                return false;
            }

            $scope.mas_edit_Levels = $("#txtLevels").data("kendoNumericTextBox").value();

            var positionModel = {
                ID: $scope.mas_edit_ID,
                Code: $scope.mas_edit_Code,
                Name: $scope.mas_edit_Name,
                ShortName: $scope.mas_edit_ShortName,
                Levels: $scope.mas_edit_Levels,
                Status: $scope.mas_edit_Status,
                CreatedBy: $scope.mas_edit_CreatedBy,
                CreatedDate: $scope.mas_edit_CreatedDate,
                UpdatedBy: $scope.mas_edit_UpdatedBy,
                UpdatedDate: $scope.mas_edit_UpdatedDate
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Position/Put', positionModel).success(function (resultAction, status, headers, config) {
                if (resultAction.Successfully) {
                    akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, function () { $scope.refreshDataList(); }, null);
                } else {
                    akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
                }
                console.log(resultAction);
            }).error(function (result, status, headers, config) {
                console.log(result);
            });
        }
    }

    $scope.Close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.refreshDataList = function () {
        $scope.Close();
        var PositionModel = {
            ID: 0
        };

        var pageIndex = 1;
        var pageSize = 10;
        var sortField = null;

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Position/GetAll?PageIndex=' + pageIndex + '&PageSize=' + pageSize + '&Sort=' + sortField, JSON.stringify(PositionModel))
            .success(function (resultQuery, status, headers, config) {
                var gridBusinessList = $("#gridBusinessList").data("kendoGrid");
                gridBusinessList.dataSource.read(resultQuery.Data);
                console.log(resultQuery);
            }).error(function (result) {
                console.log(status);
            });
    }

    function initialVariablePosition(mode) {
        if (mode == "AddCreate") {
            $scope.mas_add_ID = null;
            $scope.mas_add_Code = "";
            $scope.mas_add_Name = "";
            $scope.mas_add_ShortName = "";
            $scope.mas_add_Levels = 5;
            $scope.mas_add_Status = 1;
            $scope.mas_add_CreatedBy = parameter.SysUserID;
            $scope.mas_add_CreatedDate = null;
            $scope.mas_add_UpdatedBy = parameter.SysUserID;
            $scope.mas_add_UpdatedDate = null;
        } else {
            $scope.mas_edit_ID = null;
            $scope.mas_edit_Code = "";
            $scope.mas_edit_Name = "";
            $scope.mas_edit_ShortName = "";
            $scope.mas_edit_Levels = 5;
            $scope.mas_edit_Status = 1;
            $scope.mas_edit_CreatedBy = parameter.SysUserID;
            $scope.mas_edit_CreatedDate = null;
            $scope.mas_edit_UpdatedBy = parameter.SysUserID;
            $scope.mas_edit_UpdatedDate = null;
        }
    }
}
);

