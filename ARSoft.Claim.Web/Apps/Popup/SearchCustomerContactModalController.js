ARSoft_Claim_Web.controller("SearchCustomerContactModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q) {
    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
    $scope.pageSizes = config.pageSize;
    $scope.mcc_criteria_CustomerID = parameter.CustomerID;
    //$scope.mcc_criteria_CustomerCode = parameter.CustomerCode;
    $scope.mcc_criteria_CustomerName = parameter.CustomerName;
    $scope.mcc_criteria_ContactName = '';

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
                        kendo.ui.progress($("#gridLOVCustomerContact"), false);

                        var customerContactModel = {};
                        if ($scope.IsSearch ||
                            (!$scope.IsSearch && $scope.TempParStored == null)) {
                            customerContactModel = {
                                CustomerID: $scope.mcc_criteria_CustomerID,
                                CustomerCode: $scope.mcc_criteria_CustomerCode,
                                CustomerName: $scope.mcc_criteria_CustomerName,
                                ContactName: $scope.mcc_criteria_ContactName,
                                IsSearch: $scope.IsSearch
                            };
                            $scope.TempParStored = customerContactModel;
                        }
                        else {
                            customerContactModel = $scope.TempParStored;
                        }
                        $scope.IsSearch = false;

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Popup/GetCustomerContactAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(customerContactModel))
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
                    width: "10%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
                },
                {
                    hidden: true,
                    field: "CustomerID",
                    title: "ID",
                    width: "0%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
                }
                ,
                {
                    field: "ContactName",
                    title: "ชื่อ-นามสกุล",
                    width: "30%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" }
                }
                ,
                {
                    field: "Phone",
                    title: "เบอร์โทรศัพท์",
                    width: "15%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" }
                }
                ,
                {
                    field: "Email",
                    title: "อีเมล์",
                    width: "20%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" }
                }
                ,
                {
                    field: "Status",
                    title: "สถานะ",
                    width: "15%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
                }
            ]
        };
    };

    $scope.getCustomerContactByCriteria = function () {
        $scope.loading = true;
        $scope.IsSearch = true;
        var grid = $("#gridLOVCustomerContact").data("kendoGrid");
        var data = {
            CustomerID: $scope.mcc_criteria_CustomerID,
            CustomerCode: $scope.mcc_criteria_CustomerCode,
            CustomerName: $scope.mcc_criteria_CustomerName,
            ContactName: $scope.mcc_criteria_ContactName,
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
        var grid = $("#gridLOVCustomerContact").data("kendoGrid");
        var selectedRows = grid.select();
        var dataItem = grid.dataItem(selectedRows[0]);
        $modalInstance.close(dataItem);
    }
});
