ARSoft_Claim_Web.controller("SearchSupplierContactModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q) {
    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
    $scope.pageSizes = config.pageSize;
    $scope.msc_criteria_SupplierCode = parameter.SupplierCode;
    $scope.msc_criteria_SupplierName = parameter.SupplierName;

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
                        kendo.ui.progress($("#gridLOVSupplierContact"), false);

                        var suppliersContactModel = {};
                        if ($scope.IsSearch ||
                            (!$scope.IsSearch && $scope.TempParStored == null)) {
                            suppliersContactModel = {
                                SupplierCode: $scope.msc_criteria_SupplierCode,
                                SupplierName: $scope.msc_criteria_SupplierName,
                                ContactName: $scope.msc_criteria_ContactName,
                                IsSearch: $scope.IsSearch
                            };
                            $scope.TempParStored = suppliersContactModel;
                        }
                        else {
                            suppliersContactModel = $scope.TempParStored;
                        }
                        $scope.IsSearch = false;

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }
                        akow_Authentication_HttpPostL($http, WebApiUrl + 'Popup/GetSupplierContactAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(suppliersContactModel))
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
                    hidden: true,
                    field: "SupplierContactID",
                    title: "ID",
                    width: "0%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
                },
                {
                    field: "SupplierCode",
                    title: "รหัสคู่ค้า",
                    width: "10%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
                }
                ,
                {
                    field: "SupplierName",
                    title: "ชื่อคู่ค้า",
                    width: "20%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" }
                }
                ,
                {
                    field: "FullName",
                    title: "ชื่อผู้ติดต่อ",
                    width: "20%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" }
                }
                , {
                    field: "EmailContact",
                    title: "อีเมล์",
                    width: "20%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" }
                }
                , {
                    field: "PhoneContact",
                    title: "เบอร์โทรศัพท์",
                    width: "12%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" }
                }
            ]
        };
    };

    $scope.getSupplierContactByCriteria = function () {
        $scope.IsSearch = true;

        $scope.loading = true;
        var grid = $("#gridLOVSupplierContact").data("kendoGrid");
        var data = {
            SupplierCode: $scope.msc_criteria_SupplierCode,
            SupplierName: $scope.msc_criteria_SupplierName,
            ContactName: $scope.msc_criteria_ContactName,
            IsSearch: $scope.IsSearch

        }
        console.log(data);

        //grid.dataSource.read(data);
        grid.dataSource.query({ page: 1, pageSize: 10, sort: null });
        $scope.loading = false;
    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.selectRowItem = function () {
        var grid = $("#gridLOVSupplierContact").data("kendoGrid");
        var selectedRows = grid.select();
        var dataItem = grid.dataItem(selectedRows[0]);
        $modalInstance.close(dataItem);
    }
});