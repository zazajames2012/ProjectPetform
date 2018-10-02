// *** Update by : Nutthapaphon Sopradisth ***
// *** Update Date : 24/06/2016 13:00  ****

var ARSoft_Claim_Web = angular.module("Supplier", ['kendo.directives', 'ui.bootstrap'])

ARSoft_Claim_Web.controller("SupplierController", function ($scope, $http, config, $modal, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {
    $scope.pageSizes = config.pageSize;
    //$scope.isOpenModalAction = false;

    if ($('#hdUserID').val() != undefined) {
        $scope.SysUserID = $('#hdUserID').val();
    } else {
        $scope.SysUserID = 1;
    };
    //=================================================//
    $scope.getSupplierByCriteria = function () {
        var criteriaType = '';
        if ($scope.mse_criteria_Type_Seller) {
            criteriaType = '1';
        }

        if ($scope.mse_criteria_Type_SOP) {
            if (criteriaType != '') {
                criteriaType += ',' + '2';
            } else {
                criteriaType = '2';
            }
        }

        if ($scope.mse_criteria_Type_Subcontractor) {
            if (criteriaType != '') {
                criteriaType += ',' + '3';
            } else {
                criteriaType = '3';
            }
        }

        if ($scope.mse_criteria_Type_Other) {
            if (criteriaType != '') {
                criteriaType += ',' + '4';
            } else {
                criteriaType = '4';
            }
        }

        $scope.IsSearch = true;
        $scope.criteriaType = criteriaType;
        var grid = $("#gridSupplierList").data("kendoGrid");
        grid.dataSource.query({ page: 1, pageSize: $scope.pageSizes, sort: null });
    };

    $scope.initial = function () {
        akow_Authentication_CheckPermission($http);
        initialVariable();

        $scope.mainGridOptionsSupplier = {
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
                        kendo.ui.progress($("#gridSupplierList"), false);

                        //if (!$scope.IsSearch)
                        //{
                        //    $scope.crit_SupplierCode = '';
                        //    $scope.crit_SupplierName = '';
                        //}
                        //else
                        //{
                        //    $scope.crit_SupplierCode =$scope.mse_criteria_SupplierCode;
                        //    $scope.crit_SupplierName = $scope.mse_criteria_SupplierName;
                        //}

                        var suppliersModel = {
                            SupplierCode: $scope.mse_criteria_SupplierCode,
                            SupplierName: $scope.mse_criteria_SupplierName,
                            TypeID: $scope.criteriaType,
                            Status: $scope.mse_criteria_Status,
                            IsSearch: $scope.IsSearch
                        };
                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Supplier/GetAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(suppliersModel))
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
                                //var hgrid = $("#chkHeadGridSupplierContact").removeAttr('checked');
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
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
            }
            ,
            {
                field: "Code",
                title: "รหัสผู้จำหน่าย",
                width: "15%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
            }
            ,
            {
                field: "Name",
                title: "ชื่อผู้จำหน่าย",
                width: "30%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            ,
            {
                field: "SupplierTypeName",
                title: "ประเภท",
                width: "22%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            , {
                field: "Address",
                title: "ที่อยู่",
                width: "35%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            , {
                field: "StatusName",
                title: "สถานะ",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            ,
            {
                title: "Manage",
                width: "200px",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" },
                template: "<button class='btn btn-primary akow-viewbutton'  ng-click='viewSupplierDetails(dataItem)'><i class='fa fa-eye'></i></button>"
                        + "&nbsp;&nbsp;<button class='btn btn-primary akow-editbutton' ng-click='editSupplierDetails(dataItem)'><i class='fa fa-pencil'></i></button>"
                        + "&nbsp;&nbsp;<button class='btn btn-danger akow-deletebutton' ng-click='deleteSupplierDetails(dataItem)'><i class='fa fa-trash'></i></button>"
            }
            //{
            //    title: "View",
            //    width: "90px",
            //    headerAttributes: { style: "text-align:center;" },
            //    attributes: { style: "text-align:center; vertical-align:top;" },
            //    template: "<button class='btn btn-primary akow-viewbutton' ng-click='viewSupplierDetails(dataItem)'><i class='fa fa-eye'></i>&nbsp;View</button>"
            //}
            //,
            //{
            //    title: "Edit",
            //    width: "90px",
            //    headerAttributes: { style: "text-align:center;" },
            //    attributes: { style: "text-align:center; vertical-align:top;" },
            //    template: "<button class='btn btn-primary akow-editbutton' ng-click='editSupplierDetails(dataItem)'><i class='fa fa-edit'></i>&nbsp;Edit</button>"
            //}
            //,
            //{
            //    title: "Delete",
            //    width: "95px",
            //    headerAttributes: { style: "text-align:center;" },
            //    attributes: { style: "text-align:center; vertical-align:top;" },
            //    template: "<button class='btn btn-danger akow-deletebutton' ng-click='deleteSupplierDetails(dataItem)'><i class='fa fa-trash'></i>&nbsp;Delete</button>"
            //}
            ]
            , dataBound: function (dataItem) {
                akow_Authentication_CheckPermission($http);
                $scope.IsSearch = false;

            }
        }
    }
    //=================================================//
    $scope.addSupplier = function () {
        openLoadingProgress();
        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
                    + '/Supplier/AddSupplierModal',
            controller: 'SupplierModalController',
            windowClass: 'app-modal-window-add-supplier',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        id: 0,
                        mode: "AddCreate",
                        SysUserID: $scope.SysUserID
                    };
                }
            }
        });

        modalInstance.result
                .then(
                        function () {
                            //$scope.isOpenModalAction = false;
                        }, function () {
                            //$scope.isOpenModalAction = false;
                        });
    };

    $scope.viewSupplier = function (dataItem) {
        //if ($scope.isOpenModalAction) return;
        //$scope.isOpenModalAction = true;

        openLoadingProgress();
        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
                    + '/Supplier/ViewSupplierModal',
            controller: 'SupplierModalController',
            windowClass: 'app-modal-window-edit-supplier',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        SupplierID: dataItem.ID,
                        mode: "ViewCreate",
                        dataItem: dataItem,
                        SysUserID: $scope.SysUserID
                    };
                }
            }
        });

        modalInstance.result
                .then(
                        function () {
                            //$scope.isOpenModalAction = false;
                        }, function () {
                            // $scope.isOpenModalAction = false;
                        });
    };

    $scope.viewSupplierDetails = function (dataItem) {
        $scope.viewSupplier(dataItem);
    }

    $scope.editSupplier = function (dataItem) {
        openLoadingProgress();
        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
                    + 'Supplier/EditSupplierModal',
            controller: 'SupplierModalController',
            windowClass: 'app-modal-window-edit-supplier',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        SupplierID: dataItem.ID,
                        mode: "EditCreate",
                        dataItem: dataItem,
                        SysUserID: $scope.SysUserID
                    };
                }
            }
        });

        modalInstance.result
                .then(
                        function () {
                            $scope.isOpenModalAction = false;
                        }, function () {
                            $scope.isOpenModalAction = false;
                        });
    };

    $scope.editSupplierDetails = function (dataItem) {
        $scope.editSupplier(dataItem);
    }

    $scope.deleteSupplier = function (dataItem) {
        $scope.ID = dataItem.ID;
        $scope.Name = dataItem.Name;

        var supplierModel = {
            ID: $scope.ID,
            Name: $scope.Name
        };

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Supplier/Delete', supplierModel).success(function (resultAction, status, headers, config) {
            if (resultAction.Successfully) {
                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, refreshGridSupplierDataList(), null);
            } else {
                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }
            console.log(resultAction);
        }).error(function (result, status, headers, config) {
            console.log(result);
        });
    }

    $scope.deleteSupplierDetails = function (dataItem) {
        akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูลคู่ค้า ' + dataItem.Name + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.deleteSupplier(dataItem); }, null);
        return false;
    }

    $scope.getClearSupplierCriteria = function () {
        $('#txtSupplierCode').val('');
        $('#txtSupplierName').val('');
        $('#chkSeller').removeAttr('checked');
        $('#chkSOP').removeAttr('checked');
        $('#chkSubcontractor').removeAttr('checked');
        $('#chkOther').removeAttr('checked');
        $('#rbtActive').removeAttr('checked');
        $('#rbtInActive').removeAttr('checked');
    }

    function initialVariable() {
        $scope.IsSearch = false;
        $scope.mse_criteria_Status = 1;
        $scope.mse_criteria_Type_Seller = true;
        $scope.mse_criteria_Type_SOP = true;
        $scope.mse_criteria_Type_Subcontractor = true;
        $scope.mse_criteria_Type_Other = true;
    }

    $scope.getSupplierTypeByCriteria = function () {
        if ($scope.mse_criteria_Type_Seller) {
            criteriaType = '1';
        }

        if ($scope.mse_criteria_Type_SOP) {
            if (criteriaType != '') {
                criteriaType += ',' + '2';
            } else {
                criteriaType = '2';
            }
        }

        if ($scope.mse_criteria_Type_Subcontractor) {
            if (criteriaType != '') {
                criteriaType += ',' + '3';
            } else {
                criteriaType = '3';
            }
        }

        if ($scope.mse_criteria_Type_Other) {
            if (criteriaType != '') {
                criteriaType += ',' + '4';
            } else {
                criteriaType = '4';
            }
        }

        $scope.criteriaType = criteriaType;
    }

    //=================================================//
    function refreshGridSupplierDataList() {
        var suppliersModel = {
            SupplierCode: '',
            SupplierName: '',
            TypeID: null,
            Status: 1
        };

        var pageIndex = 1;
        var pageSize = 10;
        var sortField = null;

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Supplier/GetAll?PageIndex=' + pageIndex + '&PageSize=' + pageSize + '&Sort=' + sortField, JSON.stringify(suppliersModel))
            .success(function (resultQuery, status, headers, config) {
                var gridSupplierList = $("#gridSupplierList").data("kendoGrid");
                if (gridSupplierList != undefined) {
                    gridSupplierList.dataSource.read(resultQuery.Data);
                    //gridSupplierList.dataSource.data(resultQuery.Data);
                    //gridSupplierList.refresh();
                }
                console.log(resultQuery);
            }).error(function (result) {
                alert(result.Message)
                console.log(status);
            });
    }
});

ARSoft_Claim_Web.controller("SupplierModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {
    debugger;

    $scope.pageSizes = config.pageSize;
    $scope.SupplierID = parameter.SupplierID;
    $scope.mse_SysUserID = parameter.SysUserID;

    $scope.mse_ActionMode = parameter.mode;

    initialVariableSuppliers(parameter.mode);

    $scope.changeDistrict = function () {

        if ($scope.mse_ActionMode == "AddCreate") {
            $scope.mse_add_DistrictID = null;

            //Old
            //$http.get(WebMvcUrl + 'JobCommon/GetDistinctByProvinceID?provinceID=' + $scope.mse_add_ProvinceID).success(function (result) {
            //    $scope.Districts = result.Data;
            //}).error(function (result) {
            //    console.log(result);
            //});

            // ddl Districts
            akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Common/GetDistinctByProvinceID?provinceID=' + $scope.mse_add_ProvinceID).success(function (response, status, headers, config) {
                if (response.Successfully) {
                    $scope.Districts = response.Data;
                } else {
                    $scope.Districts = null;

                }
            }).error(function (result) {
                console.log(result);
            });

        } else {
            $scope.mse_edit_DistrictID = null;

            // ddl Districts
            akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Common/GetDistinctByProvinceID?provinceID=' + $scope.mse_edit_ProvinceID).success(function (response, status, headers, config) {
                if (response.Successfully) {
                    $scope.Districts = response.Data;
                } else {
                    $scope.Districts = null;

                }
            }).error(function (result) {
                console.log(result);
            });

            //$http.get(WebMvcUrl + 'JobCommon/GetDistinctByProvinceID?provinceID=' + $scope.mse_edit_ProvinceID).success(function (result) {
            //    $scope.Districts = result.Data;
            //}).error(function (result) {
            //    console.log(result);
            //});
        }
    };

    $scope.initialSuppliers = function () {
        openLoadingProgress();
        //var promise =
        $scope.initialDataDropdownList();
        closeLoadingProgress();
        //promise.then(function () {
        //    closeLoadingProgress();
        //});
    };

    $scope.initialDataDropdownList = function () {

        //var deferred = $q.defer();
        //var promise = $q.all(
        //        [
        //            $http.post(WebMvcUrl + 'Supplier/GetSupplierGroupTypes')
        //            //$http.post(WebMvcUrl + 'JobCommon/GetProvinceAll'),
        //            //$http.post(WebMvcUrl + 'JobCommon/GetDistinctAll')
        //        ]
        //    ).then(function (resultQuery) {
        //        $scope.SupplierGroupTypes = resultQuery[0].data.Data;
        //        //$scope.Districts = resultQuery[1].data.Data;
        //        //$scope.Provinces = resultQuery[2].data.Data;
        //        deferred.resolve(resultQuery);
        //        closeLoadingProgress();
        //    }
        //    );
        //return promise;

        //$http.get(WebMvcUrl + 'Supplier/GetSupplierTypes').success(function (result) {
        //    $scope.SupplierTypes = result.Data;
        //}).error(function (result) {
        //    console.log(result);
        //});

        //$http.get(WebMvcUrl + 'JobCommon/GetProvinceAll').success(function (result) {
        //    $scope.Provinces = result.Data;
        //}).error(function (result) {
        //    console.log(result);
        //});

        //closeLoadingProgress();

        // ddl SupplierTypes
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Common/GetSupplierTypes').success(function (response, status, headers, config) {
            if (response.Successfully) {
                $scope.SupplierTypes = response.Data;
            } else {
                $scope.SupplierTypes = null;

            }
        }).error(function (result) {
            console.log(result);
        });

        // ddl Province
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Common/GetProvinceAll').success(function (response, status, headers, config) {
            if (response.Successfully) {
                $scope.Provinces = response.Data;
            } else {
                $scope.Provinces = null;

            }
        }).error(function (result) {
            console.log(result);
        });

    };

    if (parameter.mode == "AddCreate") {

        $scope.addSupplier = function () {
            if (!akow_Validate_ValidateInput()) {
                return false;
            }

            var supplierModel = {
                ID: null,
                //Code: $scope.mse_add_Code,
                Name: $scope.mse_add_Name,
                NameShort: $scope.mse_add_NameShort,
                TaxID: $scope.mse_add_TaxID,
                ReferCode: $scope.mse_add_ReferCode,
                TypeID: $scope.mse_add_SupplierTypeID,
                GroupID: $scope.mse_add_SupplierGroupTypeID,
                AddressOne: $scope.mse_add_AddressOne,
                AddressTwo: $scope.mse_add_AddressTwo,
                DistrictID: $scope.mse_add_DistrictID,
                PostCode: $scope.mse_add_PostCode,
                Phone: $scope.mse_add_Phone,
                Fax: $scope.mse_add_Fax,
                Email: $scope.mse_add_Email,
                Website: $scope.mse_add_WebSite,
                Remark: $scope.mse_add_Remark,
                Status: $scope.mse_add_Status,
                //StatusName: $scope.mse_add_StatusName,
                CreatedBy: $scope.mse_add_CreatedBy
                //CreatedDate: $scope.mse_add_CreatedDate,
                //UpdatedBy: $scope.mse_add_UpdatedBy,
                //UpdatedDate: $scope.mse_add_UpdatedDate
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Supplier/Post', supplierModel).success(function (resultAction, status, headers, config) {
                if (resultAction.Successfully) {
                    refreshSupplierDataList();
                    $scope.Close();
                    akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, null, null);
                } else {
                    akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
                }
                console.log(resultAction);
            }).error(function (result, status, headers, config) {
                console.log(result);
            });

            return false;
        }

    } else if (parameter.mode == "EditCreate") {
        //var supplierModel = {
        //    ID: parameter.dataItem.ID
        //};

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Supplier/GetById?Id=' + parameter.dataItem.ID).success(function (resultQuery, status, headers, config) {
            debugger;
            if (resultQuery.Successfully) {
                var supplierModel = resultQuery.Data;

                $scope.mse_edit_ID = supplierModel.ID;
                $scope.mse_edit_Code = supplierModel.Code;
                $scope.mse_edit_Name = supplierModel.Name;
                $scope.mse_edit_NameShort = supplierModel.NameShort;
                $scope.mse_edit_TaxID = supplierModel.TaxID;
                $scope.mse_edit_ReferCode = supplierModel.ReferCode;
                $scope.mse_edit_SupplierTypeID = supplierModel.TypeID;
                $scope.mse_edit_SupplierGroupTypeID = supplierModel.GroupID;
                $scope.mse_edit_AddressOne = supplierModel.AddressOne;
                $scope.mse_edit_AddressTwo = supplierModel.AddressTwo;
                $scope.mse_edit_DistrictID = supplierModel.DistrictID;
                $scope.mse_edit_ProvinceID = supplierModel.ProvinceID;
                $scope.mse_edit_PostCode = supplierModel.PostCode;
                $scope.mse_edit_Phone = supplierModel.Phone;
                $scope.mse_edit_Fax = supplierModel.Fax;
                $scope.mse_edit_Email = supplierModel.Email;
                $scope.mse_edit_WebSite = supplierModel.Website;
                $scope.mse_edit_Remark = supplierModel.Remark;
                $scope.mse_edit_Status = supplierModel.Status;
                $scope.mse_edit_CreatedDate = supplierModel.CreatedDate;
                $scope.mse_edit_CreatedBy = supplierModel.CreatedBy;

                //$http.get(SAMWebApiUrl + 'Common/GetDistinctByProvinceID?provinceID?provinceID=' + supplierModel.ProvinceID).success(function (result) {
                //    $scope.Districts = result.Data;
                //}).error(function (result) {
                //    console.log(result);
                //}); 

                // ddl Province
                akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Common/GetDistinctByProvinceID?provinceID=' + supplierModel.ProvinceID).success(function (response, status, headers, config) {
                    if (response.Successfully) {
                        $scope.Districts = response.Data;
                    } else {
                        $scope.Districts = null;

                    }
                }).error(function (result) {
                    console.log(result);
                });

                $scope.mse_edit_DistrictID = supplierModel.DistrictID;
            }
        }).error(function (result) { });

        $scope.editSupplier = function () {
            if (!akow_Validate_ValidateInput()) {
                return false;
            }

            //$scope.loading = true;

            var supplierModel = {
                ID: $scope.mse_edit_ID,
                Code: $scope.mse_edit_Code,
                Name: $scope.mse_edit_Name,
                NameShort: $scope.mse_edit_NameShort,
                TaxID: $scope.mse_edit_TaxID,
                ReferCode: $scope.mse_edit_ReferCode,
                TypeID: $scope.mse_edit_SupplierTypeID,
                GroupID: $scope.mse_edit_SupplierGroupTypeID,
                AddressOne: $scope.mse_edit_AddressOne,
                AddressTwo: $scope.mse_edit_AddressTwo,
                DistrictID: $scope.mse_edit_DistrictID,
                PostCode: $scope.mse_edit_PostCode,
                Phone: $scope.mse_edit_Phone,
                Fax: $scope.mse_edit_Fax,
                Email: $scope.mse_edit_Email,
                Website: $scope.mse_edit_WebSite,
                Remark: $scope.mse_edit_Remark,
                Status: $scope.mse_edit_Status,
                //StatusName: $scope.mse_edit_StatusName,
                CreatedBy: $scope.mse_edit_CreatedBy,
                CreatedDate: $scope.mse_edit_CreatedDate,
                UpdatedBy: $scope.mse_edit_UpdatedBy
                //UpdatedDate: $scope.mse_edit_UpdatedDate
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Supplier/Put', supplierModel).success(function (resultAction, status, headers, config) {
                //$scope.loading = false;
                if (resultAction.Successfully) {
                    refreshSupplierDataList();
                    $scope.Close();
                    akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, null, null);
                } else {
                    akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
                }
                console.log(resultAction);
            }).error(function (result, status, headers, config) {
                console.log(result);
            });
        }

        $scope.getSupplierContactAll = function () {
            var grid = $("#gridSupplierContactList").data("kendoGrid");
            grid.dataSource.query({ page: 1, pageSize: 10, sort: null });
        };

        $scope.mainGridOptionsSupplierContact = {
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
                pageSize: 10,
                serverPaging: true,
                serverSorting: true,
                transport: {

                    read: function (e) {
                        kendo.ui.progress($("#gridSupplierContactList"), false);

                        var supplierContactModel = {
                            SupplierID: $scope.SupplierID
                        };

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        akow_Authentication_HttpPost($http, SAMWebApiUrl + 'SupplierContact/GetAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(supplierContactModel))
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
                                var hgrid = $("#chkHeadGridSupplierContact").removeAttr('checked');
                            })
                            .error(function (resultAction, status, headers, config) {
                                e.success();
                                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
                            });
                    }
                }
            },
            sortable: true,
            pageable: true,
            selectable: "row",
            pageable: {
                pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
            },
            columns: [
            {
                width: "5%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" },
                headerTemplate: "<input type='checkbox' id='chkHeadGridSupplierContact' class='chkHeadGridSupplierContact' ng-model='dataItem.selectedAllSupplierContact' ng-click='checkAllSupplierContact(dataItem)' />",
                template: "<input type='checkbox' class='chkGridSupplierContact' ng-model='dataItem.selectedItemSupplierContact' ng-true-value='true' ng-false-value='false' ng-checked='dataItem.selectedItemSupplierContact==true' name='selectedDetailSupplierContact' />",
                sortable: false
            },
            {
                hidden: false,
                field: "RowNumber",
                title: "ลำดับ",
                width: "7%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
            }
            ,
            {
                hidden: true,
                field: "Id",
                title: "Id",
                width: "0%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
            }
            ,
            {
                hidden: true,
                field: "SupplierID",
                title: "SupplierID",
                width: "0%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
            }
            ,
            {
                field: "FullName",
                title: "ชื่อผู้ติดต่อ",
                width: "23%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            ,
            {
                field: "PhoneContact",
                title: "เบอร์โทรศัพท์",
                width: "20%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:text-top; font-weight:normal;" }
            },
            {
                field: "EmailContact",
                title: "อีเมล์",
                width: "20%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            , {
                field: "ContactType",
                title: "ผู้ติดต่อ",
                width: "15%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" }
            }
            , {
                field: "StatusName",
                title: "สถานะ",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            ,
            {
                title: "Edit",
                width: "100px",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" },
                template: "<button class='btn btn-primary akow-editbutton' ng-click='editSupplierContactDetails(dataItem)'><i class='fa fa-pencil'></i></button>"
            }
            ]
            , dataBound: function (dataItem) {
                akow_Authentication_CheckPermission($http);
            }
        };

        $scope.editSupplierContactDetails = function (dataItem) {
            $scope.editSupplierContactPopup(dataItem);
        }

        $scope.confirmDeleteSupplierContactCollection = function () {
            var count = countDeleteSupplierContact();
            if (count == 0) {
                akow_Messagebox_Msgbox('ท่านยังไม่ได้เลือกรายการผู้ดิดต่อที่ต้องการลบ !!!.', MESSAGE_BOX_TITLE.WARNING, BUTTON_MODE.OK, ICONS_MODE.WARNING, function () { null }, null);
                return false;
            }

            if (count == 1) {
                var supplierContactName = getSupplierContactName();
                akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูล ' + supplierContactName + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.deleteSupplierContactCollection(); }, null);
            } else {
                akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูลผู้ติดต่อคู่ค้าที่เลือกทั้งหมด ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.deleteSupplierContactCollection(); }, null);
            }

            return false;
        }

        $scope.checkAllSupplierContact = function (dataItem) {
            var grid = $("#gridSupplierContactList").data("kendoGrid");
            var listOfData = grid.dataSource.data();
            for (var i = 0; i < listOfData.length; i++) {
                listOfData[i].selectedItemSupplierContact = dataItem.selectedAllSupplierContact;
            }
        };

        $scope.editSupplierContactPopup = function (dataItem) {
            openLoadingProgress();
            var modalInstance = $modal.open({
                templateUrl: WebMvcUrl
                            + 'Supplier/EditSupplierContactModal',
                controller: 'SupplierContactModalController',
                windowClass: 'app-modal-window-supplier-contact',
                backdrop: false,
                animation: true,
                resolve: {
                    parameter: function () {
                        return model = {
                            mode: "EditCreate",
                            Id: dataItem.Id,
                            dataItem: dataItem,
                            SupplierID: parameter.dataItem.ID,
                            SysUserID: $scope.mse_edit_CreatedBy
                        };
                    }
                }
            });
            modalInstance.result
                    .then(
                            function (result) {
                            }, function () {
                            });
        };

        function getSupplierContactName() {
            var gridSupplierContactList = $("#gridSupplierContactList").data("kendoGrid");
            var listOfSupplierContact = gridSupplierContactList.dataSource.data();

            for (var i = 0; i < listOfSupplierContact.length; i++) {
                if (listOfSupplierContact[i].selectedItemSupplierContact) {
                    return listOfSupplierContact[i].TitleName + listOfSupplierContact[i].FirstName + ' ' + listOfSupplierContact[i].LastName;
                }
            }
            return '';
        }

        function countDeleteSupplierContact() {
            var gridSupplierContactList = $("#gridSupplierContactList").data("kendoGrid");
            var listOfSupplierContact = gridSupplierContactList.dataSource.data();
            var count = 0;
            for (var i = 0; i < listOfSupplierContact.length; i++) {
                if (listOfSupplierContact[i].selectedItemSupplierContact) {
                    count++;
                }
            }
            return count;
        }

        $scope.deleteSupplierContactCollection = function () {
            var gridSupplierContactList = $("#gridSupplierContactList").data("kendoGrid");
            var listOfSupplierContact = gridSupplierContactList.dataSource.data();
            var varSupplierID = 0;
            $scope.msc_supplierContactArray = [];

            for (var i = 0; i < listOfSupplierContact.length; i++) {
                if (listOfSupplierContact[i].selectedItemSupplierContact) {
                    var supplierContactModel = {
                        Id: listOfSupplierContact[i].Id,
                        SupplierID: listOfSupplierContact[i].SupplierID
                    }
                    varSupplierID = listOfSupplierContact[i].SupplierID;
                    $scope.msc_supplierContactArray.push(supplierContactModel);
                }
            }

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'SupplierContactCollection/Delete', $scope.msc_supplierContactArray).success(function (resultAction, status, headers, config) {
                if (resultAction.Successfully) {
                    akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, refreshSupplierContactDataList(varSupplierID), null);
                } else {
                    akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
                }
                console.log(resultAction);
            }).error(function (result, status, headers, config) {
                alert(result.Message)
                console.log(result);
            });

            return false;
        }

        $scope.addSupplierContactPopup = function () {
            openLoadingProgress();
            var modalInstance = $modal.open({
                templateUrl: WebMvcUrl
                            + 'Supplier/AddSupplierContactModal',
                controller: 'SupplierContactModalController',
                windowClass: 'app-modal-window-supplier-contact',
                backdrop: false,
                animation: true,
                resolve: {
                    parameter: function () {
                        return model = {
                            mode: "AddCreate",
                            SupplierID: parameter.dataItem.ID,
                            SysUserID: $scope.mse_add_CreatedBy
                        };
                    }
                }
            });
            modalInstance.result
                    .then(
                            function (result) {
                            }, function () {
                            });
        }

        $scope.getSupplierContactList = function (dataItem) {
            var gridProjectSupplierContactList = $("#gridSupplierContactList").data("kendoGrid");
            if (gridProjectSupplierContactList != undefined) {
                gridProjectSupplierContactList.dataSource.read(dataItem);
            }
        }
    } else if (parameter.mode == "ViewCreate") {
        $scope.Disabled = true;
        $scope.loading = true;

        //var supplierModel = {
        //    ID: parameter.dataItem.ID
        //};

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Supplier/GetById?Id=' + parameter.dataItem.ID).success(function (resultQuery, status, headers, config) {
            $scope.loading = false;
            debugger;
            if (resultQuery.Successfully) {
                var supplierModel = resultQuery.Data;

                $scope.mse_view_ID = supplierModel.ID;
                $scope.mse_view_Code = supplierModel.Code;
                $scope.mse_view_Name = supplierModel.Name;
                $scope.mse_view_NameShort = supplierModel.NameShort;
                $scope.mse_view_TaxID = supplierModel.TaxID;
                $scope.mse_view_ReferCode = supplierModel.ReferCode;
                $scope.mse_view_SupplierTypeID = supplierModel.TypeID;
                $scope.mse_view_SupplierGroupTypeID = supplierModel.GroupID;
                $scope.mse_view_AddressOne = supplierModel.AddressOne;
                $scope.mse_view_AddressTwo = supplierModel.AddressTwo;
                //***//
                $scope.mse_view_ProvinceID = supplierModel.ProvinceID;
                $scope.mse_view_PostCode = supplierModel.PostCode;
                $scope.mse_view_Phone = supplierModel.Phone;
                $scope.mse_view_Fax = supplierModel.Fax;
                $scope.mse_view_Email = supplierModel.Email;
                $scope.mse_view_WebSite = supplierModel.Website;
                $scope.mse_view_Remark = supplierModel.Remark;
                $scope.mse_view_Status = supplierModel.Status;

                //$http.get(SAMWebApiUrl + 'Common/GetDistinctByProvinceID?provinceID?provinceID=' + supplierModel.ProvinceID).success(function (result) {
                //    $scope.Districts = result.Data;
                //}).error(function (result) {
                //    console.log(result);
                //});

                 // ddl Province
                akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Common/GetDistinctByProvinceID?provinceID=' + supplierModel.ProvinceID).success(function (response, status, headers, config) {
                    if (response.Successfully) {
                        $scope.Districts = response.Data;
                    } else {
                        $scope.Districts = null;

                    }
                }).error(function (result) {
                    console.log(result);
                });

                $scope.mse_view_DistrictID = supplierModel.DistrictID;

            }
        }).error(function (result) {
            alert(result.Message);
        });


        GridOptionsSupplierContact();
    }
    //========================================================//
    function GridOptionsSupplierContact() {
        $scope.mainGridOptionsSupplierContact = {
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
                pageSize: 10,
                serverPaging: true,
                serverSorting: true,
                transport: {

                    read: function (e) {
                        kendo.ui.progress($("#gridSupplierContactList"), false);

                        var supplierContactModel = {
                            SupplierID: $scope.SupplierID
                        };

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        akow_Authentication_HttpPost($http, SAMWebApiUrl + 'SupplierContact/GetAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(supplierContactModel))
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
                                var hgrid = $("#chkHeadGridSupplierContact").removeAttr('checked');
                            })
                            .error(function (resultAction, status, headers, config) {
                                e.success();
                                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
                            });
                    }
                }
            },
            sortable: true,
            pageable: true,
            selectable: "row",
            pageable: {
                pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
            },
            columns: [
            //{
            //    width: "5%",
            //    headerAttributes: { style: "text-align:center;" },
            //    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" },
            //    headerTemplate: "<input type='checkbox' id='chkHeadGridSupplierContact' class='chkHeadGridSupplierContact' ng-model='dataItem.selectedAllSupplierContact' ng-click='checkAllSupplierContact(dataItem)' />",
            //    template: "<input type='checkbox' class='chkGridSupplierContact' ng-model='dataItem.selectedItemSupplierContact' ng-true-value='true' ng-false-value='false' ng-checked='dataItem.selectedItemSupplierContact==true' name='selectedDetailSupplierContact' />",
            //    sortable: false
            //},
            {
                hidden: false,
                field: "RowNumber",
                title: "ลำดับ",
                width: "7%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
            }
            ,
            {
                hidden: true,
                field: "Id",
                title: "Id",
                width: "0%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
            }
            ,
            {
                hidden: true,
                field: "SupplierID",
                title: "SupplierID",
                width: "0%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
            }
            ,
            {
                field: "FullName",
                title: "ชื่อผู้ติดต่อ",
                width: "23%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            ,
            {
                field: "PhoneContact",
                title: "เบอร์โทรศัพท์",
                width: "20%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:text-top; font-weight:normal;" }
            },
            {
                field: "EmailContact",
                title: "อีเมล์",
                width: "20%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            , {
                field: "ContactType",
                title: "ผู้ติดต่อ",
                width: "20%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" }
            }
            , {
                field: "StatusName",
                title: "สถานะ",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            //,
            //{
            //    title: "Edit",
            //    width: "100px",
            //    headerAttributes: { style: "text-align:center;" },
            //    attributes: { style: "text-align:center; vertical-align:top;" },
            //    template: "<button class='btn btn-primary akow-editbutton' ng-click='editSupplierContactDetails(dataItem)'><i class='fa fa-edit'></i>&nbsp;Edit</button>"
            //}
            ]
            , dataBound: function (dataItem) {
                akow_Authentication_CheckPermission($http);
            }
        };
    }

    //========================================================//

    $scope.Close = function () {
        $modalInstance.dismiss('cancel');
    };

    function refreshSupplierDataList() {
        var suppliersModel = {
            SupplierCode: '',
            SupplierName: '',
            TypeID: null,
            Status: 1
        };

        var pageIndex = 1;
        var pageSize = 10;
        var sortField = null;

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Supplier/GetAll?PageIndex=' + pageIndex + '&PageSize=' + pageSize + '&Sort=' + sortField, JSON.stringify(suppliersModel))
            .success(function (resultQuery, status, headers, config) {
                if (resultQuery.Successfully) {
                    var gridSupplierList = $("#gridSupplierList").data("kendoGrid");
                    if (gridSupplierList != undefined) {
                        gridSupplierList.dataSource.read(resultQuery.Data);
                        //gridSupplierList.dataSource.data(resultQuery.Data);
                        //gridSupplierList.refresh();
                    }
                }
                console.log(resultQuery);
            }).error(function (result) {
                alert(result.Message)
                console.log(status);
            });
    }

    function refreshSupplierContactDataList(SupplierID) {
        var supplierContactModel = {
            ID: SupplierID
        };

        var pageIndex = 1;
        var pageSize = 10;
        var sortField = null;

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'SupplierContact/GetAll?PageIndex=' + pageIndex + '&PageSize=' + pageSize + '&Sort=' + sortField, JSON.stringify(supplierContactModel))
            .success(function (resultQuery, status, headers, config) {
                var gridSupplierContactList = $("#gridSupplierContactList").data("kendoGrid");

                if (gridSupplierContactList != undefined) {
                    //gridSupplierContactList.dataSource.read(resultQuery.Data);
                    gridSupplierContactList.dataSource.query({ page: 1, pageSize: 10, sort: null });

                    //gridSupplierContactList.dataSource.data(resultQuery.Data);
                    //gridSupplierContactList.refresh();
                }

                console.log(resultQuery);
            }).error(function (result) {
                alert(result.Message)
                console.log(status);
            });
    }

    function initialVariableSuppliers(mode) {
        $scope.SupplierGroupTypes = null;
        $scope.SupplierTypes = null;
        $scope.Provinces = [];
        $scope.Districts = [];

        if (mode == "AddCreate") {
            $scope.mse_add_Name = '';
            $scope.mse_add_NameShort = '';
            $scope.mse_add_TaxID = null;
            $scope.mse_add_ReferCode = '';
            $scope.mse_add_SupplierTypeID = 1;
            $scope.mse_add_SupplierGroupTypeID = 1;
            $scope.mse_add_AddressOne = '';
            $scope.mse_add_AddressTwo = '';
            $scope.mse_add_DistrictID = null;
            $scope.mse_add_PostCode = '';
            $scope.mse_add_Phone = '';
            $scope.mse_add_Fax = '';
            $scope.mse_add_Email = '';
            $scope.mse_add_WebSite = '';
            $scope.mse_add_Remark = '';
            $scope.mse_add_Status = 1;
            $scope.mse_add_StatusName = '';
            $scope.mse_add_CreatedBy = $scope.mse_SysUserID;
            //$scope.mse_add_CreatedDate = null;
            //$scope.mse_add_UpdatedDate = null;
        } else if (mode == "EditCreate") {
            $scope.mse_edit_ID = null;
            $scope.mse_edit_Code = '';
            $scope.mse_edit_Name = '';
            $scope.mse_edit_NameShort = '';
            $scope.mse_edit_TaxID = null;
            $scope.mse_edit_ReferCode = '';
            $scope.mse_edit_TypeID = null;
            $scope.mse_edit_SupplierTypeID = 1;
            $scope.mse_edit_SupplierGroupTypeID = 1;
            $scope.mse_edit_AddressOne = '';
            $scope.mse_edit_AddressTwo = '';
            $scope.mse_edit_DistrictID = null;
            $scope.mse_edit_PostCode = '';
            $scope.mse_edit_Phone = '';
            $scope.mse_edit_Fax = '';
            $scope.mse_edit_Email = '';
            $scope.mse_edit_WebSite = '';
            $scope.mse_edit_Remark = '';
            $scope.mse_edit_Status = 1;
            $scope.mse_edit_StatusName = '';
            $scope.mse_edit_UpdatedBy = $scope.mse_SysUserID;
            $scope.mse_edit_CreatedDate = null;
            $scope.mse_edit_CreatedBy = 1;
            //$scope.mse_edit_UpdatedDate = null;            
        } else {
            $scope.mse_view_ID = null;
            $scope.mse_view_Code = '';
            $scope.mse_view_Name = '';
            $scope.mse_view_NameShort = '';
            $scope.mse_view_TaxID = null;
            $scope.mse_view_ReferCode = '';
            $scope.mse_view_TypeID = null;
            $scope.mse_view_SupplierTypeID = 1;
            $scope.mse_view_SupplierGroupTypeID = 1;
            $scope.mse_view_AddressOne = '';
            $scope.mse_view_AddressTwo = '';
            $scope.mse_view_DistrictID = null;
            $scope.mse_view_PostCode = '';
            $scope.mse_view_Phone = '';
            $scope.mse_view_Fax = '';
            $scope.mse_view_Email = '';
            $scope.mse_view_WebSite = '';
            $scope.mse_view_Remark = '';
            $scope.mse_view_Status = 1;
            //$scope.mse_view_StatusName = '';
        }

        //if (mode != "EditCreate") closeLoadingProgress();
    }
}
);
ARSoft_Claim_Web.controller("SupplierContactModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {
    $scope.msc_add_CreatedBy = parameter.SysUserID;
    $scope.msc_add_UpdatedBy = parameter.SysUserID;
    $scope.msc_edit_CreatedBy = parameter.SysUserID;
    $scope.msc_edit_UpdatedBy = parameter.SysUserID;

    resetValueSupplierContact(parameter.mode);
    if (parameter.mode == "AddCreate") {
        $scope.addSupplierContact = function () {
            if (!akow_Validate_ValidateInput()) {
                return false;
            }

            $scope.loading = true;
            $scope.msc_add_SupplierID = parameter.SupplierID;

            var supplierContactModel = {
                Id: $scope.msc_add_Id,
                SupplierID: $scope.msc_add_SupplierID,
                TitleName: $scope.msc_add_TitleName,
                FirstName: $scope.msc_add_FirstName,
                LastName: $scope.msc_add_LastName,
                EmailContact: $scope.msc_add_Email,
                PhoneContact: $scope.msc_add_PhoneContact,
                PhoneOtherOne: $scope.msc_add_PhoneOtherOne,
                PhoneOtherTwo: $scope.msc_add_PhoneOtherTwo,
                PhoneOtheThree: $scope.msc_add_PhoneOtheThree,
                TypeID: $scope.msc_add_TypeID,
                Remark: $scope.msc_add_Remark,
                Status: $scope.msc_add_Status,
                CreatedBy: $scope.msc_add_CreatedBy,
                CreatedDate: $scope.msc_add_CreatedDate,
                UpdatedBy: $scope.msc_add_UpdatedBy,
                UpdatedDate: $scope.msc_add_UpdatedDate
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'SupplierContact/Post', supplierContactModel).success(function (resultAction, status, headers, config) {
                $scope.loading = false;
                if (resultAction.Successfully) {
                    refreshSupplierContactDataList(supplierContactModel.SupplierID);
                    $scope.Close();
                    akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, null, null);
                } else {
                    akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
                }
                console.log(resultAction);
            }).error(function (result, status, headers, config) {
                console.log(result);
            });

            return false;
        }
    } else if (parameter.mode == "EditCreate") {
        var supplierContactModel = {
            ID: parameter.dataItem.Id
        };

        //$scope.loading = true;
        $scope.msc_edit_Id = parameter.Id;
        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'SupplierContact/GetById', supplierContactModel).success(function (resultQuery, status, headers, config) {
            // $scope.loading = false;
            if (resultQuery.Successfully) {
                var supplierContactModel = resultQuery.Data;

                //$scope.msc_edit_Id = supplierContactModel.Id;
                $scope.msc_edit_SupplierID = supplierContactModel.SupplierID;
                $scope.msc_edit_TitleName = supplierContactModel.TitleName;
                $scope.msc_edit_FirstName = supplierContactModel.FirstName;
                $scope.msc_edit_LastName = supplierContactModel.LastName;
                $scope.msc_edit_EmailContact = supplierContactModel.EmailContact;
                $scope.msc_edit_PhoneContact = supplierContactModel.PhoneContact;
                $scope.msc_edit_PhoneOtherOne = supplierContactModel.PhoneOtherOne;
                $scope.msc_edit_PhoneOtherTwo = supplierContactModel.PhoneOtherTwo;
                $scope.msc_edit_PhoneOtheThree = supplierContactModel.PhoneOtheThree;
                $scope.msc_edit_TypeID = supplierContactModel.TypeID;
                $scope.msc_edit_Remark = supplierContactModel.Remark;
                $scope.msc_edit_Status = supplierContactModel.Status;
            }
        }).error(function (result) {
            console.log(result.Message);
        });

        $scope.editSupplierContact = function () {
            if (!akow_Validate_ValidateInput()) {
                return false;
            }

            $scope.loading = true;
            $scope.msc_edit_SupplierID = parameter.SupplierID;

            var supplierContactModel = {
                Id: $scope.msc_edit_Id,
                SupplierID: $scope.msc_edit_SupplierID,
                TitleName: $scope.msc_edit_TitleName,
                FirstName: $scope.msc_edit_FirstName,
                LastName: $scope.msc_edit_LastName,
                EmailContact: $scope.msc_edit_EmailContact,
                PhoneContact: $scope.msc_edit_PhoneContact,
                PhoneOtherOne: $scope.msc_edit_PhoneOtherOne,
                PhoneOtherTwo: $scope.msc_edit_PhoneOtherTwo,
                PhoneOtheThree: $scope.msc_edit_PhoneOtheThree,
                TypeID: $scope.msc_edit_TypeID,
                Remark: $scope.msc_edit_Remark,
                Status: $scope.msc_edit_Status,
                CreatedBy: $scope.msc_edit_CreatedBy,
                CreatedDate: $scope.msc_edit_CreatedDate,
                UpdatedBy: $scope.msc_edit_UpdatedBy,
                UpdatedDate: $scope.msc_edit_UpdatedDate
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'SupplierContact/Put', supplierContactModel).success(function (resultAction, status, headers, config) {
                $scope.loading = false;
                if (resultAction.Successfully) {
                    refreshSupplierContactDataList(supplierContactModel.SupplierID);
                    $scope.Close();
                    akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, null, null);
                } else {
                    akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
                }
                console.log(resultAction);
            }).error(function (result, status, headers, config) {
                console.log(result);
            });

            return false;
        }
    }

    function refreshSupplierContactDataList(SupplierID) {
        var supplierContactModel = {
            SupplierID: SupplierID
        };

        var pageIndex = 1;
        var pageSize = 10;
        var sortField = null;

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'SupplierContact/GetAll?PageIndex=' + pageIndex + '&PageSize=' + pageSize + '&Sort=' + sortField, JSON.stringify(supplierContactModel))
            .success(function (resultQuery, status, headers, config) {
                if (resultQuery.Successfully) {
                    var gridSupplierContactList = $("#gridSupplierContactList").data("kendoGrid");
                    if (gridSupplierContactList != undefined) {
                        gridSupplierContactList.dataSource.read(resultQuery.Data);
                        //gridSupplierContactList.dataSource.data(resultQuery.Data);
                        //gridSupplierContactList.refresh();
                    }
                }
                console.log(resultQuery);
            }).error(function (result) {
                alert(result.Message)
                console.log(status);
            });
    }

    function resetValueSupplierContact(mode) {
        if (mode == "AddCreate") {
            $scope.msc_add_Id = null;
            $scope.msc_add_SupplierID = null;
            $scope.msc_add_TitleName = '';
            $scope.msc_add_FirstName = '';
            $scope.msc_add_LastName = '';
            $scope.msc_add_EmailContact = '';
            $scope.msc_add_PhoneContact = '';
            $scope.msc_add_PhoneOtherOne = '';
            $scope.msc_add_PhoneOtherTwo = '';
            $scope.msc_add_PhoneOtheThree = '';
            $scope.msc_add_TypeID = 1;
            $scope.msc_add_Remark = '';
            $scope.msc_add_Status = 1;
            $scope.msc_add_CreatedDate = null;
            $scope.msc_add_UpdatedDate = null;
        } else {
            $scope.msc_edit_Id = null;
            $scope.msc_edit_SupplierID = null;
            $scope.msc_edit_TitleName = '';
            $scope.msc_edit_FirstName = '';
            $scope.msc_edit_LastName = '';
            $scope.msc_edit_EmailContact = '';
            $scope.msc_edit_PhoneContact = '';
            $scope.msc_edit_PhoneOtherOne = '';
            $scope.msc_edit_PhoneOtherTwo = '';
            $scope.msc_edit_PhoneOtheThree = '';
            $scope.msc_edit_TypeID = 1;
            $scope.msc_edit_Remark = '';
            $scope.msc_edit_Status = 1;
            $scope.msc_edit_CreatedDate = null;
            $scope.msc_edit_UpdatedDate = null;
        }
        closeLoadingProgress();
    }

    $scope.Close = function () {
        $modalInstance.dismiss('cancel');
    };
}
);



