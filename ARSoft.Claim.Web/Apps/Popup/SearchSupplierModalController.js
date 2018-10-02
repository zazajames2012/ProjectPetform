ARSoft_Claim_Web.controller("SearchSupplierModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q) {
    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
    $scope.pageSizes = config.pageSize;
    $scope.criteriaType = parameter.Type;

    if (parameter.FunctionOwner == 'JobOnSite' && parameter.FunctionCallBack == 'ExternalSupplier') {
        $scope.IsSupplierTypeSellerChecked = true;
        $scope.IsSupplierTypeSOPChecked = false;
        $scope.IsSupplierTypeSubcontractorChecked = true;
        $scope.IsSupplierTypeOtherChecked = false;

        $scope.IsDisabledSupplierTypeSeller = true;
        $scope.IsDisabledSupplierTypeSOP = true;
        $scope.IsDisabledSupplierTypeSubcontractor = true;
        $scope.IsDisabledSupplierTypeOther = true;
    } else {
        //$scope.IsSupplierTypeNAChecked = false;
        //$scope.IsSupplierTypeSallerChecked = false;
        //$scope.IsSupplierTypeSubcontractChecked = false;
        //$scope.IsSupplierTypeOtherChecked = false;

        //$scope.IsDisabledSupplierTypeNA = false;
        //$scope.IsDisabledSupplierTypeSaller = false;
        //$scope.IsDisabledSupplierTypeSubcontract = false;
        //$scope.IsDisabledSupplierTypeOther = false;

        $scope.IsSupplierTypeSellerChecked = false;
        $scope.IsSupplierTypeSOPChecked = false;
        $scope.IsSupplierTypeSubcontractorChecked = false;
        $scope.IsSupplierTypeOtherChecked = false;

        $scope.IsDisabledSupplierTypeSeller = false;
        $scope.IsDisabledSupplierTypeSOP = false;
        $scope.IsDisabledSupplierTypeSubcontractor = false;
        $scope.IsDisabledSupplierTypeOther = false;
    }

    $scope.init = function () {
        $scope.IsSearch = false;

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
                        kendo.ui.progress($("#gridLOVSupplier"), false);

                        var suppliersModel = {};
                        if ($scope.IsSearch ||
                            (!$scope.IsSearch && $scope.TempParStored == null)) {
                            suppliersModel = {
                            ID: 0,
                            SupplierCode: $scope.mse_criteria_SupplierCode,
                            SupplierName: $scope.mse_criteria_SupplierName,
                            TypeID: $scope.criteriaType,
                            Status: $scope.mse_criteria_Status,
                            IsSearch: $scope.IsSearch
                        };
                            $scope.TempParStored = suppliersModel;
                        }
                        else {
                            suppliersModel = $scope.TempParStored;
                        }
                        $scope.IsSearch = false;

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        akow_Authentication_HttpPostL($http, WebApiUrl + 'Popup/GetSupplierAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(suppliersModel))
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
                //{
                //    title: "",
                //    width: "10%",
                //    headerAttributes: { style: "text-align:center;" },
                //    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" },
                //    command: {
                //        text: "เลือก", click: function (e) {
                //            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                //            $modalInstance.close(dataItem);
                //        }
                //    }
                //},
                {
                    hidden: false,
                    field: "RowNumber",
                    title: "ลำดับ",
                    width: "8%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
                },
                {
                    field: "Code",
                    title: "รหัสคู่ค้า",
                    width: "12%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
                }
                ,
                {
                    field: "Name",
                    title: "ชื่อคู่ค้า",
                    width: "25%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" }
                }
                ,
                {
                    field: "SupplierTypeName",
                    title: "ประเภทผู้จำหน่าย",
                    width: "15%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" }
                }
                , {
                    field: "Address",
                    title: "ที่อยู่",
                    width: "30%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" }
                }
            ]
        };
    };

    $scope.getSupplierByCriteria = function () {
        $scope.loading = true;
        $scope.IsSearch = true;

        $scope.mse_criteria_Status = 1;

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

        $scope.criteriaType = criteriaType;

        var grid = $("#gridLOVSupplier").data("kendoGrid");
        var data = {
            ID: 0,
            SupplierCode: $scope.mse_criteria_SupplierCode,
            SupplierName: $scope.mse_criteria_SupplierName,
            TypeID: $scope.criteriaType,
            Status: $scope.mse_criteria_Status,
            IsSearch: $scope.IsSearch

        }

        //grid.dataSource.read(data);
        grid.dataSource.query({ page: 1, pageSize: 10, sort: null });
        $scope.loading = false;
    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.selectRowItem = function () {
        var grid = $("#gridLOVSupplier").data("kendoGrid");
        var selectedRows = grid.select();
        var dataItem = grid.dataItem(selectedRows[0]);
        $modalInstance.close(dataItem);
    }
});