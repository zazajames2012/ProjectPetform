//*** Update by : Jirawat Pipatpaisan ***
//*** Update Date : 26/11/2015 09:30  ***

var mvcPath = $("#hdWebMvcUrl").val();

var SAMWebApiUrl = $("#hdSAMWebApiUrl").val();

var ARSoft_Claim_Web = angular.module("Brand", ['kendo.directives', 'ui.bootstrap'])

ARSoft_Claim_Web.controller("BrandController", function ($scope, $http, config, $modal, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {
    $scope.pageSizes = config.pageSize;
    if ($('#hdUserID').val() != undefined) {
        $scope.SysUserID = $('#hdUserID').val();
    } else {
        $scope.SysUserID = 1;
    };

    $scope.getBrandByCriteria = function () {
        var criteriaType = '';
        if ($scope.mse_criteria_Type_NA) {
            criteriaType = '1';
        }

        if ($scope.mse_criteria_Type_Saller) {
            if (criteriaType != '') {
                criteriaType += ',' + '2';
            } else {
                criteriaType = '2';
            }
        }

        if ($scope.mse_criteria_Type_Subcontract) {
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

        $scope.IsSearch = true;
        //   refreshGrid();
        var grid = $("#mainGrid").data("kendoGrid");
        grid.dataSource.query({ page: 1, pageSize: $scope.pageSizes, sort: null });
    };

    $scope.initial = function () {
        akow_Authentication_CheckPermission($http);
        $scope.Brand_SearchPageNo = 1;
        $scope.Brand_SearchSort = null;
        $scope.Brand_SearchPageSize = $scope.pageSizes;
        $scope.IsSearch = false;
        $scope.searchBrandName = '';
        $scope.searchIsAvtive = 1;
        $scope.searchIsInactive = 1;
        setMainGridOption();
    }

    $scope.deleteDetails = function (dataItem) {
        akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูลยี่ห้อ ' + dataItem.Name + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.delete(dataItem); }, null);
    }

    $scope.getClearBrandCriteria = function () {
        $('#txtBrandCode').val('');
        $('#txtBrandName').val('');
        $('#chkNA').removeAttr('checked');
        $('#chkSaller').removeAttr('checked');
        $('#chkSubcontract').removeAttr('checked');
        $('#chkOther').removeAttr('checked');
        $('#rbtActive').removeAttr('checked');
        $('#rbtInActive').removeAttr('checked');
    }

 
    $scope.add = function () {
       
        openLoadingProgress();
        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl + 'Brand/Modal',
            controller: 'BrandModalController',
            windowClass: 'app-modal-window-Brand',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return param = {
                        id: 0,
                        mode: "Add"
                    };
                }
            }
        });

        modalInstance.result
                .then(
                        function () {
                            akow_Authentication_EnableAll($http);
                            // $scope.IsSearch = true;
                            refreshGrid();
                        });
    };

    $scope.edit = function (dataItem) {
        openLoadingProgress();

        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl + 'Brand/Modal',
            controller: 'BrandModalController',
            windowClass: 'app-modal-window-edit-Brand',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return param = {
                        id: dataItem.ID,
                        mode: "Edit",
                        SysUserID: $scope.SysUserID
                    };
                }
            }
        });

        modalInstance.result
                .then(
                        function () {
                      //      akow_Authentication_EnableAll($http);
                            //$scope.IsSearch = true;
                            refreshGrid();
                        });
    };

    $scope.delete = function (dataItem) {
        $scope.ID = dataItem.ID;
        $scope.Name = dataItem.Name;

        var BrandModel = {
            ID: $scope.ID,
            Name: $scope.Name
        };

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Brand/Delete', BrandModel).success(function (resultAction, status, headers, config) {
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

    $scope.view = function (dataItem) {
        openLoadingProgress();

        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl + 'Brand/Modal',
            controller: 'BrandModalController',
            windowClass: 'app-modal-window-edit-Brand',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return param = {
                        id: dataItem.ID,
                        mode: "View"
                    };
                }
            }
        });

        modalInstance.result
                .then(
                        function () {
                        //    akow_Authentication_EnableAll($http);
                            //$scope.IsSearch = true;
                            refreshGrid();

                        });
    };

    function setMainGridOption() {
        $scope.mainGridOptionsBrand = {
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

                        //if (!$scope.IsSearch) {
                        //    $scope.search_BrandName = '';
                        //}
                        //else {
                        //    $scope.search_BrandName = $scope.searchBrandName;
                        //}

                        var BrandsModel = {};

                        if ($scope.IsSearch || $scope.TempSearch == null) {
                            BrandsModel = {
                                BrandName: $scope.searchBrandName,
                                IsAvtive: $scope.searchIsAvtive,
                                IsInactive: $scope.searchIsInactive,
                                IsSearch: $scope.IsSearch
                            };
                            $scope.TempSearch = BrandsModel;

                        } else {

                            BrandsModel = $scope.TempSearch;
                        }

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                                $scope.Brand_SearchSort = e.data.sort[0];
                            }
                            else {
                                $scope.Brand_SearchSort = null;
                            }
                        }
                        else {
                            $scope.Brand_SearchSort = null;
                        }

                        $scope.Brand_SearchPageNo = e.data.page;
                        $scope.Brand_SearchPageSize = e.data.pageSize;

                        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Brand/GetAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(BrandsModel))
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
                                var hgrid = $("#chkHeadGridBrandContact").removeAttr('checked');
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
                field: "BrandID",
                title: "ID",
                width: "0%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
            }
            ,

            {
                field: "Name",
                title: "ชื่อยี่ห้อสินค้า",
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
                field: "StatusText",
                title: "สถานะ",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            ,
            {
                title: "จัดการข้อมูล",
                width: "150px",
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
    }

    function refreshGrid() {
        var grid = $("#mainGrid").data("kendoGrid");
        $scope.IsSearch = false;

        grid.dataSource.query({ page: $scope.Brand_SearchPageNo, pageSize: $scope.Brand_SearchPageSize, sort: $scope.Brand_SearchSort });
    }
});

ARSoft_Claim_Web.controller("BrandModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {

    $scope.init = function () {
        $scope.pageSizes = config.pageSize;
        $scope.id = param.id;
        $scope.mode = param.mode;
        $scope.SysUserID = param.SysUserID;
        $scope.numericOptionStandardTAT = {
            format: "#",
            decimals: 0
        }

        if (param.mode == "Add") {
            $scope.ModalCaption = 'เพิ่มรายการ';
            $scope.model = getInitialModel();
        }
        else if (param.mode == "Edit") {
            $scope.ModalCaption = 'แก้รายการ';
            getBrand();
            setMainGridOption();
        }
        else if (param.mode == "View") {
            $scope.ModalCaption = 'ดูข้อมูล';
            getBrand();
            setMainGridOption();
            //akow_Authentication_DisableAll($http);
            akow_Authentication_DisableByID("modal-body");
        }
        closeLoadingProgress();


    };

    $scope.add = function () {
        openLoadingProgress();

        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl + 'Brand/SlaModal',
            controller: 'BrandSlaModalController',
            windowClass: 'app-modal-window-Brand',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return param = {
                        brandid: $scope.id,
                        brandname: $scope.name,
                        id: 0,
                        mode: "Add"
                    };
                }
            }
        });

        modalInstance.result
              .then(
                      function () {
                          akow_Authentication_EnableAll($http);
                          refreshGridSLA();
                      });
    };

    $scope.edit = function (dataItem) {
        openLoadingProgress();

        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl + 'Brand/SlaModal',
            controller: 'BrandSlaModalController',
            windowClass: 'app-modal-window-Brand',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return param = {
                        id: dataItem.ID,
                        brandid: $scope.id,
                        brandname: $scope.name,
                        //brandname: dataItem.ID, 
                        mode: "Edit"
                    };
                }
            }
        });

        modalInstance.result
              .then(
                      function () {
                          akow_Authentication_EnableAll($http);
                          refreshGridSLA();
                      });
    };

    $scope.delete = function (dataItem) {

        var SlaModel = {
            ID: dataItem.ID,
            ProductName: dataItem.Name
        };

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Brand/DeleteSla', SlaModel).success(function (resultAction, status, headers, config) {
            console.log(resultAction);
            if (resultAction.Successfully) {
                console.log('complete');

                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, refreshGridSLA(), null);
            } else {
                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }
        }).error(function (result, status, headers, config) {
            console.log(result);
        });
    }

    $scope.deleteDetails = function (dataItem) {
        akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูล SLA ของผลิตภัณฑ์ ' + dataItem.ProductName + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.delete(dataItem); }, null);
    }

    $scope.save = function () {
        if (akow_Validate_ValidateInput()) {
            if (param.mode == "Add") {
                saveAdd();
            }
            else {
                saveEdit();
            }
        }
        else {
            akow_Messagebox_Msgbox("กรุณากรอกข้อมูลให้ครบ", '', 1, 'warning');
        }
    };

    $scope.close = function () {
        $modalInstance.close();
    };

    function setMainGridOption() {
        $scope.mainGridOptionsSla = {
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

                        if (!$scope.IsSearch) {
                            $scope.crit_BrandCode = '';
                            $scope.crit_BrandName = '';
                        } else {
                            $scope.crit_BrandCode = $scope.mse_criteria_BrandCode;
                            $scope.crit_BrandName = $scope.mse_criteria_BrandName;
                        }

                        var BrandsModel = {
                            ID: 0,
                            BrandCode: $scope.crit_BrandCode,
                            BrandName: $scope.crit_BrandName,
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

                        //akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'Brand/GetBrandSla?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField + "&BrandId=" + $scope.id)
                        //    .success(function (resultAction, status, headers, config) {
                        //        if (resultAction.Successfully) {
                        //            if (resultAction.Data != '') {
                        //                e.success(resultAction.Data);
                        //            }
                        //            else {
                        //                e.success();
                        //            }
                        //        }
                        //        else {
                        //            e.success();
                        //        }
                        //        var hgrid = $("#chkHeadGridBrandContact").removeAttr('checked');
                        //    })
                        //    .error(function (resultAction, status, headers, config) {
                        //        e.success();
                        //    });
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
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
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
                field: "ProductName",
                title: "ชื่อผลิตภัณฑ์",
                width: "35%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            ,
            {
                field: "ModelName",
                title: "ชื่อรุ่น",
                width: "47%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            , {
                field: "TATFixingText",
                title: "TAT",
                width: "20%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" }
            }
            ,
            {
                title: "จัดการข้อมูล",
                width: "200px",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" },
                template: "<button class='btn btn-primary akow-editbutton' ng-click='edit(dataItem)'><i class='fa fa-pencil'></i>&nbsp;Edit</button>"
                        + "&nbsp;&nbsp;<button class='btn btn-danger akow-deletebutton' ng-click='deleteDetails(dataItem)'><i class='fa fa-trash'></i>&nbsp;Delete</button>"
            }

            ]
             , dataBound: function (dataItem) {
                 //akow_Authentication_CheckPermission($http);
                 $scope.IsSearch = false;
                 if (param.mode == "View") {
                     akow_Authentication_DisableAll($http);
                 }

             }

        }
    }

    $scope.addServiceCost = function () {
        openLoadingProgress();
        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl + 'Brand/ServiceCostModal',
            controller: 'BrandCostModalController',
            size: 'md',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return param = {
                        brandid: $scope.id,
                        brandname: $scope.name,
                        id: 0,
                        mode: "Add"
                    };
                }
            }
        });

        modalInstance.result
              .then(
                      function () {
                          akow_Authentication_EnableAll($http);
                          refreshGridServiceCost();
                      });
    };

    $scope.editServiceCost = function (dataItem) {
        openLoadingProgress();

        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl + 'Brand/ServiceCostModal',
            controller: 'BrandCostModalController',
            size: 'md',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return param = {
                        id: dataItem.ID,
                        brandid: dataItem.ID,
                        brandname: $scope.name,
                        //brandname: dataItem.ID, 
                        mode: "Edit"
                    };
                }
            }
        });

        modalInstance.result
              .then(
                      function () {
                       //   akow_Authentication_EnableAll($http);
                          refreshGridServiceCost();
                      });
    };

    $scope.deleteServiceCost = function (dataItem) {

        var Model = {
            ID: dataItem.ID,
            ProductName: dataItem.ProductName
        };

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Brand/DeleteServiceCost', Model).success(function (resultAction, status, headers, config) {
            if (resultAction.Successfully) {

                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, refreshGridServiceCost(), null);
            } else {
                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }
        }).error(function (result, status, headers, config) {
            console.log(result);
        });
    }

    $scope.deleteDetailsServiceCost = function (dataItem) {
        akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูลค่าบริการสินค้าของผลิตภัณฑ์ ' + dataItem.ProductName + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.deleteServiceCost(dataItem); }, null);
    }

    $scope.initialTabServiceCost = function () {
        $scope.mainGridOptionsServiceCost = {
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
                        //var BrandsModel = {
                        //    ID: 0,
                        //    BrandCode: $scope.mse_criteria_BrandCode,
                        //    BrandName: $scope.mse_criteria_BrandName,
                        //    TypeID: $scope.criteriaType,
                        //    Status: $scope.mse_criteria_Status,
                        //    IsSearch: $scope.IsSearch
                        //};

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'Brand/GetBrandServiceCost?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField + "&BrandId=" + $scope.id)
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
                width: "12%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
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
                field: "ProductName",
                title: "ชื่อผลิตภัณฑ์",
                width: "30%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" }
            }
            ,
            {
                field: "ModelName",
                title: "ชื่อรุ่น",
                width: "30%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" }
            }
            //, {
            //    field: "Price",
            //    title: "ราคา (บาท)",
            //    width: "20%",
            //    headerAttributes: { style: "text-align:center;" },
            //    attributes: { style: "text-align:center; vertical-align:top;" }
            //}
            , {
                field: "DisplaySizeText",
                title: "ขนาด",
                width: "20%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" }
            }
            , {
                field: "Hardware",
                title: "Hardware<br />(บาท)",
                width: "20%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" }
            }
            , {
                field: "Software",
                title: "Software<br />(บาท)",
                width: "20%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" }
            }
            , {
                field: "DealerDiscount",
                title: "ส่วนลด Dealer<br />(%)",
                width: "20%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" }
            },
            {
                title: "จัดการข้อมูล",
                width: "200px",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" },
                template: "<button class='btn btn-primary akow-editbutton' ng-click='editServiceCost(dataItem)'><i class='fa fa-pencil'></i>&nbsp;Edit</button>"
                        + "&nbsp;&nbsp;<button class='btn btn-danger akow-deletebutton' ng-click='deleteDetailsServiceCost(dataItem)'><i class='fa fa-trash'></i>&nbsp;Delete</button>"
            }

            ]
             , dataBound: function (dataItem) {
                 //akow_Authentication_CheckPermission($http);
                 if (param.mode == "View") {
                     akow_Authentication_DisableAll($http);
                 }

             }
        }

    }

    function getInitialModel() {
        var model =
            {
                ID: null,
                Name: null,
                Description: null,
                BrandWebSite: null,
                SupportWebSite: null,
                StandardTAT: 15,
                Status: 1,
                StatusText: null,
                CreatedBy: null,
                CreatedDate: null,
                UpdatedBy: null,
                UpdatedDate: null
            }

        return model;
    }

    function saveAdd() {
        $scope.model.CreatedBy = $('#hdUserID').val();
        $scope.model.UpdatedBy = $('#hdUserID').val();
        akow_Authentication_HttpPost($http, SAMWebApiUrl + "Brand/Add", $scope.model).success(function (data, status, headers, config) {
            console.log(data);
            if (data.Successfully) {
                akow_Messagebox_Msgbox("เพิ่มข้อมูลเรียบร้อยแล้ว", '', 1, 'info', function () { $modalInstance.close(); });
            }
            else {
                $modalInstance.close();
            }
        }).error(function (data, status, headers, config) {
            $modalInstance.close();
        });

    }

    function saveEdit() {
        $scope.model.UpdatedBy = $('#hdUserID').val();
        akow_Authentication_HttpPut($http, SAMWebApiUrl + "Brand/Update", $scope.model).success(function (data, status, headers, config) {
            if (data.Successfully) {
                akow_Messagebox_Msgbox("แก้ไขข้อมูลเรียบร้อยแล้ว", '', 1, 'info', function () { $modalInstance.close(); });
            }
            else {
                $modalInstance.close();
            }
        }).error(function (data, status, headers, config) {
            $modalInstance.close();
        });

    }

    function getBrand() {
        akow_Authentication_HttpGetL($http, SAMWebApiUrl + "Brand/Get?ID=" + $scope.id)
       .success(function (data, status, headers, config) {
           data = data.Data;
           console.log(data);
           $scope.model = data;
           $scope.name = data.BrandName;
       });
    }

    function refreshGridSLA() {
        var grid = $("#gridSlaList").data("kendoGrid");
        grid.dataSource.query({ page: 1, pageSize: 10, sort: null });
    }
    function refreshGridServiceCost() {
        var grid = $("#gridServiceCostList").data("kendoGrid");
        grid.dataSource.query({ page: 1, pageSize: 10, sort: null });
    }
    function refreshGridRepairLevel() {
        var grid = $("#gridRepaiLevelList").data("kendoGrid");
        grid.dataSource.query({ page: 1, pageSize: 10, sort: null });
    }
    $scope.initialTabRepairLevel = function () {
        $scope.mainGridOptionsRepairLevel = {
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
                        kendo.ui.progress($("#gridRepaiLevelList"), false);

                        var Model = {
                            BrandId: $scope.id
                        };

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }
                        console.log(Model);
                        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Brand/GetRepairLevel?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField + '&BrandId=' + $scope.id)
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
                field: "LevelsSeq",
                title: "ลำดับที่",
                width: "8%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
            },
             {
                 hidden: true,
                 field: "ID",
                 width: "1%",
                 headerAttributes: { style: "text-align:center;" },
                 attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
             }
            , {
                field: "Name",
                title: "Repair Level",
                width: "32%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left;" }
            }, {
                field: "Description",
                title: "รายละเอียด",
                width: "42%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left;" }
            }, {
                width: "9%",
                template: (function (dataItem) {
                    var upButton;

                    if (dataItem.MinFlag == true) {
                        upButton = "<button class='btn' disabled><i class='glyphicon glyphicon-arrow-up'></i></button>"
                    }
                    else {
                        upButton = "<button class='btn' ng-click='RepairLevelUpAction(dataItem.ID, dataItem)'><i class='glyphicon glyphicon-arrow-up'></i></button>"
                    }
                    return upButton;
                    return checkSysFlag;
                }),
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            },
            {
                width: "9%",
                template: (function (dataItem) {
                    var upButton;

                    if (dataItem.MaxFlag == true) {
                        upButton = "<button class='btn' disabled><i class='glyphicon glyphicon-arrow-down'></i></button>"
                    }
                    else {
                        upButton = "<button class='btn' ng-click='RepairLevelDownAction(dataItem.ID, dataItem)'><i class='glyphicon glyphicon-arrow-down'></i></button>"
                    }
                    return upButton;
                    return checkSysFlag;
                }),
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            },
            {
                title: "จัดการข้อมูล",
                width: "200px",
                template: "<button class='btn btn-primary akow-editbutton' ng-click='EditRepairLevel(dataItem)'><i class='fa fa-pencil'></i>&nbsp;Edit</button> <button class='btn btn-danger akow-deletebutton' ng-click='DeleteRepairDetails(dataItem)'><i class='fa fa-trash'></i>&nbsp;Delete</button>",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }],
            dataBound: function (dataItem) {
                akow_Authentication_CheckPermission($http);
            },
        }
    }

    $scope.RepairLevelUpAction = function (CheckListID, dataItem) {

        var LevelModel = {
            ID: dataItem.ID,
            BrandID: dataItem.BrandID,
            LevelsSeq: dataItem.LevelsSeq,
            CreatedBy: $scope.SysUserID,
            UpdatedBy: $scope.SysUserID
        };

        console.log(LevelModel);
        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Brand/UpSequenceRepairLevel', LevelModel).success(function (response, status, headers, config) {
            if (response.Successfully) {
                refreshGridRepairLevel();

            }
            else {
                akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            console.log(status);
        });
    }

    $scope.RepairLevelDownAction = function (equipStatusID, dataItem) {

        var LevelModel = {
            ID: dataItem.ID,
            BrandID: dataItem.BrandID,
            LevelsSeq: dataItem.LevelsSeq,
            CreatedBy: $scope.SysUserID,
            UpdatedBy: $scope.SysUserID
        };

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Brand/DownSequenceRepairLevel', LevelModel).success(function (response, status, headers, config) {
            if (response.Successfully) {
                refreshGridRepairLevel();
            }
            else {
                akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            console.log(status);
        });
    }

    $scope.AddRepairLevel = function () {
        openLoadingProgress();

        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
                    + 'Brand/AddRepairLevel',
            controller: 'BrandRepairLevelModalController',
            size: 'md',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        mode: "AddCreate",
                        SysUserID: $scope.SysUserID,
                        BrandID: $scope.id,
                        BrandName: $scope.name
                    };
                }
            }
        });
        modalInstance.result
            .then(
            function () {
            }, function () {
                refreshGridRepairLevel();
            });
    };

    $scope.EditRepairLevel = function (dataItem) {
        openLoadingProgress();

        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
                    + 'Brand/EditRepairLevel',
            controller: 'BrandRepairLevelModalController',
            size: 'md',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        mode: "EditCreate",
                        dataItem: dataItem,
                        SysUserID: $scope.SysUserID,
                        BrandID: $scope.id,
                        BrandName: $scope.name
                    };
                }
            }
        });

        modalInstance.result
                .then(
                        function () {
                        }, function () {
                            refreshGridRepairLevel();
                        });
    };

    $scope.DeleteRepairLevel = function (dataItem) {

        var RepairModel = {
            ID: dataItem.ID,
            ProductName: dataItem.Name
        };

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Brand/DeleteRepairLevel', RepairModel).success(function (resultAction, status, headers, config) {
            console.log(resultAction);
            if (resultAction.Successfully) {

                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, refreshGridRepairLevel(), null);
            } else {
                akow_Messagebox_Msgbox(resultAction.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }
        }).error(function (result, status, headers, config) {
            console.log(result);
        });
    }

    $scope.DeleteRepairDetails = function (dataItem) {
        akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูลข้อมูลใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.DeleteRepairLevel(dataItem); }, null);
    }


});

ARSoft_Claim_Web.controller("BrandSlaModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {

    $scope.init = function () {

        $scope.ID = param.id;
        $scope.brandid = param.brandid;
        $scope.brandname = param.brandname;
        $scope.mode = param.mode;
        $scope.EditMode = false;
        $scope.numericOption = {
            format: "#",
            decimals: 0
        }
        if (param.mode == "Add") {
            $scope.ModalCaption = 'เพิ่ม TAT';
            $scope.model = getInitialModel();
        }
        else if (param.mode == "Edit") {
            $scope.ModalCaption = 'แก้ TAT';
            $scope.EditMode = true;
            getSla();
        }

        $scope.getAllSelectType();

        closeLoadingProgress();

    };

    $scope.save = function () {
        if (akow_Validate_ValidateInput()) {
            if (param.mode == "Add") {
                saveAdd();
            }
            else {
                saveEdit();
            }
        }
        else {
            akow_Messagebox_Msgbox("กรุณากรอกข้อมูลให้ครบ", '', 1, 'warning');
        }
    };


    $scope.close = function () {

        $modalInstance.close();
    };


    $scope.getAllSelectType = function () {

        akow_Authentication_HttpGetL($http, WebMvcUrl + "Brand/GetProductSelectTypeList")
       .success(function (result) {
           data = result.Data;
           $scope.productList = data;
       });



        akow_Authentication_HttpGetL($http, WebMvcUrl + "Brand/GetSlaComputeSelectTypeList")
       .success(function (result) {
           data = result.Data;
           $scope.slaComputeList = data;
       });

        akow_Authentication_HttpGetL($http, WebMvcUrl + "Brand/GetCalendarSelectTypeList")
      .success(function (result) {
          data = result.Data;
          $scope.calendarList = data;
      });

    }


    $scope.clearModel = function () {
        $scope.model.ModelID = null;
        $scope.model.ModelName = null;

        $scope.getModelList();
    }

    $scope.getModelList = function () {
        akow_Authentication_HttpGetL($http, WebMvcUrl + "Brand/GetModelSelectTypeList?ProductId=" + $scope.model.ProductID + "&BrandId=" + param.brandid)
     .success(function (result) {
         data = result.Data;
         $scope.modelList = data;
     });
    }

    $scope.searchModelPopup = function () {

        $('.modal-body').modal('hide');
        var modalInstance = $modal.open({
            templateUrl: mvcPath + 'Popup/SearchModelModal',
            controller: 'SearchModelModalController',
            size: 'lg',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        FunctionOwner: 'BrandTAT',
                        ProductID: $scope.model.ProductID,
                        BrandID: $scope.model.BrandID,
                        NewMode: true
                    };
                }
            }
        });

        modalInstance.result
        .then(
          function (result) {
              console.log(result);
              console.log($scope.model);
              $scope.model.ModelName = result.ModelName;
              $scope.model.ModelID = result.ModelID;
          }
        )

    };

    function getInitialModel() {
        var model =
            {
                ID: null,
                BrandID: $scope.brandid,
                BrandName: $scope.brandname,
                ProductID: null,
                ProductName: null,
                ModelID: null,
                ModelName: null,
                HolidayIncluded: 1,
                ServicesCalendarID: null,
                ServicesCalendarText: null,
                TATFixing: null,
                TATFixingUnit: 1,
                TATFixingText: null,
                TATFixingComputeID: null,
                TATFixingComputeText: null,
                CreatedBy: null,
                CreatedDate: null,
                UpdatedBy: null,
                UpdatedDate: null
            }

        return model;
    }

    function saveAdd() {
        $scope.model.CreatedBy = $('#hdUserID').val();
        $scope.model.UpdatedBy = $('#hdUserID').val();
        console.log($scope.model);
        akow_Authentication_HttpPost($http, SAMWebApiUrl + "Brand/AddSla", $scope.model).success(function (data, status, headers, config) {
            if (data.Successfully) {
                akow_Messagebox_Msgbox("เพิ่มข้อมูลเรียบร้อยแล้ว", '', 1, 'info', function () { $modalInstance.close(); });
            }
            else {
                $modalInstance.close();
            }
        }).error(function (data, status, headers, config) {
            $modalInstance.close();
        });

    }

    function saveEdit() {
        $scope.model.UpdatedBy = $('#hdUserID').val();
        akow_Authentication_HttpPut($http, SAMWebApiUrl + "Brand/UpdateSla", $scope.model).success(function (data, status, headers, config) {
            if (data.Successfully) {
                akow_Messagebox_Msgbox("แก้ไขข้อมูลเรียบร้อยแล้ว", '', 1, 'info', function () { $modalInstance.close(); });
            }
            else {
                $modalInstance.close();
            }
        }).error(function (data, status, headers, config) {
            $modalInstance.close();
        });

    }

    function getSla() {
        akow_Authentication_HttpGetL($http, SAMWebApiUrl + "Brand/GetOneSla?ID=" + $scope.ID)
       .success(function (data, status, headers, config) {
           data = data.Data;

           akow_Authentication_HttpGetL($http, WebMvcUrl + "Brand/GetModelSelectTypeList?ProductId=" + data.ProductID + "&BrandId=" + param.brandid)
              .success(function (result) {
                  $scope.modelList = result.Data;
                  // console.log($scope.modelList);
                  $scope.model = data;
                  // console.log($scope.model);

              });

       });
    }

});

ARSoft_Claim_Web.controller("BrandCostModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {

    $scope.init = function () {
        //$("#DealerPrice").kendoNumericTextBox({
        //    decimals: 2,
        //    min: 0,
        //    value: 0
        //});

        $scope.id = param.id;
        $scope.brandid = param.brandid;
        $scope.brandname = param.brandname;
        $scope.mode = param.mode;
        $scope.EditMode = false;
        $scope.IsBundleSoftware = false;
        $scope.RefBundleSoftware = "";

        //$scope.numericOption = {
        //    decimals: 2,
        //    min:0
        //}
        $scope.numericOptionLaborCostSmall = {
            decimals: 2,
            min: 0
        }
        $scope.numericOptionLaborCostMedium = {
            decimals: 2,
            min: 0
        }
        $scope.numericOptionLaborCostLarge = {
            decimals: 2,
            min: 0
        }
        $scope.numericOptionLaborCostXLarge = {
            decimals: 2,
            min: 0
        }

        akow_Authentication_HttpGet($http, WebMvcUrl + "Brand/GetProductSizeUsingList")
        .success(function (result) {
            data = result.Data;
            $scope.LaborCostSmallDis = data.Small == 0 ? true : false;
            $scope.LaborCostSmallCss = data.Small == 0 ? "" : "akow-require-field";

            $scope.LaborCostMediumDis = data.Medium == 0 ? true : false;
            $scope.LaborCostMediumCss = data.Medium == 0 ? "" : "akow-require-field";

            $scope.LaborCostLargeDis = data.Large == 0 ? true : false;
            $scope.LaborCostLargeCss = data.Large == 0 ? "" : "akow-require-field";

            $scope.LaborCostXLargeDis = data.XLarge == 0 ? true : false;
            $scope.LaborCostXLargeCss = data.XLarge == 0 ? "" : "akow-require-field";

            //Initial Value
            if (param.mode == "Add") {
                //fix 21/7/59 tester อยากให้แสดงเป็น 0
                //$scope.model.LaborCostSmall = data.Small == 0 ? null : 0;
                //$scope.model.LaborCostMedium = data.Medium == 0 ? null : 0;
                //$scope.model.LaborCostLarge = data.Large == 0 ? null : 0;
                //$scope.model.LaborCostXLarge = data.XLarge == 0 ? null : 0;
                //$scope.model.LaborCostSmall =  0;
                //$scope.model.LaborCostMedium =  0;
                //$scope.model.LaborCostLarge =  0;
                //$scope.model.LaborCostXLarge = 0;
                $scope.model.DealerDiscount = 0;

            }
        });

        if (param.mode == "Add") {
            $scope.ModalCaption = 'เพิ่มค่าบริการซ่อมสินค้า';
            $scope.model = getInitialModel();

        }
        else if (param.mode == "Edit") {
            $scope.ModalCaption = 'แก้ไขค่าบริการซ่อมสินค้า';
            $scope.EditMode = true;
            getLaborCost();

        }

        $scope.getAllSelectType();
        closeLoadingProgress();


    };

    $scope.DecimalTypeChange = function () {
        var numerictextbox = $("#DealerPrice").data("kendoNumericTextBox");

        if ($scope.model.DealerPriceType == '1') {
            numerictextbox.max(null);
            numerictextbox.value(0);

        } else {
            numerictextbox.max(100);
            numerictextbox.value(0);

        }

    };

    $scope.save = function () {
        if (akow_Validate_ValidateInput()) {
            if (param.mode == "Add") {
                saveAdd();
            }
            else {
                saveEdit();
            }
        }
        else {
            akow_Messagebox_Msgbox("กรุณากรอกข้อมูลให้ครบ", '', 1, 'warning');
        }
    };

    $scope.close = function () {

        $modalInstance.close();
    };

    $scope.getAllSelectType = function () {

        akow_Authentication_HttpGet($http, WebMvcUrl + "Brand/GetProductModelList")
       .success(function (result) {
           data = result.Data;
           $scope.productList = data;
       });

    }

    $scope.getProductLaborCostsListByProductID = function () {
        akow_Authentication_HttpGetL($http, WebMvcUrl + "Brand/GetProductLaborCostsList?productid=" + $scope.model.ProductID)
          .success(function (result) {
              data = result.Data;
              $scope.productloborcostList = data;
          });
    };

    $scope.clearModel = function () {
        $scope.model.ModelID = null;
        $scope.model.ModelName = null;
        $scope.getProductLaborCostsListByProductID();

        $scope.IsBundleSoftware = $.grep($scope.productList, function (DDL) {
            return DDL.ID == $scope.model.ProductID;
        })[0].BundleSoftware;

        $scope.RefBundleSoftware = $scope.IsBundleSoftware == false ? "" : "akow-require-field";

    }

    $scope.searchModelPopup = function () {

        $('.modal-body').modal('hide');
        var modalInstance = $modal.open({
            templateUrl: mvcPath + 'Popup/SearchModelModal',
            controller: 'SearchModelModalController',
            size: 'lg',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        FunctionOwner: 'BrandCost',
                        ProductID: $scope.model.ProductID,
                        BrandID: $scope.model.BrandID,
                        NewMode: true
                    };
                }
            }
        });

        modalInstance.result
        .then(
          function (result) {
              console.log(result);
              console.log($scope.model);
              $scope.model.ModelName = result.ModelName;
              $scope.model.ModelID = result.ModelID;
          }
        )

    };

    function getInitialModel() {
        var model =
            {
                ID: null,
                BrandID: $scope.brandid,
                BrandName: $scope.brandname,
                ProductID: null,
                ProductName: null,
                ModelID: null,
                ModelName: null,
                Price: 0,
                DealerPrice: 0,
                DealerPriceType: '1',
                CreatedBy: null,
                CreatedDate: null,
                UpdatedBy: null,
                UpdatedDate: null
            }

        return model;
    }

    function saveAdd() {
        $scope.model.CreatedBy = $('#hdUserID').val();
        $scope.model.UpdatedBy = $('#hdUserID').val();

        //var numerictextbox = $("#DealerPrice").data("kendoNumericTextBox");
        //$scope.model.DealerPrice = numerictextbox.value();
        console.log($scope.model);
        akow_Authentication_HttpPost($http, SAMWebApiUrl + "Brand/AddServiceCost", $scope.model).success(function (data, status, headers, config) {
            if (data.Successfully) {
                akow_Messagebox_Msgbox("เพิ่มข้อมูลเรียบร้อยแล้ว", '', 1, 'info', function () { $modalInstance.close(); });
            }
            else {
                $modalInstance.close();
            }
        }).error(function (data, status, headers, config) {
            $modalInstance.close();
        });

    }

    function saveEdit() {
        $scope.model.UpdatedBy = $('#hdUserID').val();
        //var numerictextbox = $("#DealerPrice").data("kendoNumericTextBox");
        //$scope.model.DealerPrice = numerictextbox.value();
        akow_Authentication_HttpPut($http, SAMWebApiUrl + "Brand/UpdateServiceCost", $scope.model).success(function (data, status, headers, config) {
            if (data.Successfully) {
                akow_Messagebox_Msgbox("แก้ไขข้อมูลเรียบร้อยแล้ว", '', 1, 'info', function () { $modalInstance.close(); });
            }
            else {
                $modalInstance.close();
            }
        }).error(function (data, status, headers, config) {
            $modalInstance.close();
        });

    }

    function getLaborCost() {
        akow_Authentication_HttpGetL($http, SAMWebApiUrl + "Brand/GetLaborCostByID?ID=" + $scope.id)
       .success(function (data, status, headers, config) {
           data = data.Data;
           console.log(data);
           $scope.model = data;
           //var numerictextbox = $("#DealerPrice").data("kendoNumericTextBox");
           //numerictextbox.value(data.DealerPrice);
           //$scope.model.DealerPriceType = data.DealerPriceType.toString();
           $scope.getProductLaborCostsListByProductID();

       });

    }

});

ARSoft_Claim_Web.controller("BrandRepairLevelModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {

    $scope.SysUserID = parameter.SysUserID;

    if (parameter.mode == "AddCreate") {

        $scope.add_BrandName = parameter.BrandName;
        $scope.add_BrandID = parameter.BrandID;


        $scope.initial = function () {
            akow_Authentication_CheckPermission($http);
            closeLoadingProgress();

        }

        $scope.Close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.AddRepairLevelSubmit = function () {

            if (!akow_Validate_ValidateInput()) {
                return false;
            }

            var RepairLevelData = {
                ID: 0,
                BrandID: $scope.add_BrandID,
                Name: $scope.add_RepairLevelName,
                Description: $scope.add_RepairLevelDescription,
                CreatedBy: parameter.SysUserID,
                UpdatedBy: parameter.SysUserID
            };
            //console.log(ModelData);
            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Brand/AddRepairLevel', RepairLevelData).success(function (response, status, headers, config) {
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
    }


    if (parameter.mode == "EditCreate") {

        $scope.edit_BrandName = parameter.BrandName;
        $scope.edit_BrandID = parameter.BrandID;

        $scope.initial = function () {
            akow_Authentication_CheckPermission($http);
            closeLoadingProgress();

        }

        $scope.Close = function () {
            $modalInstance.dismiss('cancel');
        };
        akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'Brand/GetRepairLevelByID?ID=' + parameter.dataItem.ID).success(function (response, status, headers, config) {
            if (response.Successfully) {

                $scope.edit_RepairLevelID = response.Data.ID;
                $scope.edit_RepairLevelBrandID = response.Data.BrandID;
                $scope.edit_RepairLevelDescription = response.Data.Description;
                $scope.edit_RepairLevelLevelsSeq = response.Data.LevelsSeq;
                $scope.edit_RepairLevelName = response.Data.Name;

            }
            else {
                alert(response.Message);
            }
            //    console.log(response);
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            console.log(status);
        });

        $scope.EditRepairLevelSubmit = function () {

            if (!akow_Validate_ValidateInput()) {
                return false;
            }

            var RepairLevelData = {
                ID: $scope.edit_RepairLevelID,
                BrandID: $scope.edit_RepairLevelBrandID,
                Name: $scope.edit_RepairLevelName,
                Description: $scope.edit_RepairLevelDescription,
                UpdatedBy: parameter.SysUserID
            };
            akow_Authentication_HttpPut($http, SAMWebApiUrl + 'Brand/UpdateRepairLevel', RepairLevelData).success(function (response, status, headers, config) {
                if (response.Successfully) {
                    akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, null, null);
                    $modalInstance.dismiss('cancel');
                }
                else {
                    akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
                }
                // console.log(response);

            }).error(function (response, status, headers, config) {
                alert(response.Message);
                // console.log(status);
            });

        }
    }
}
);