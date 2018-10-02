ARSoft_Claim_Web.controller("SearchCustomerLocationModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q) {
    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
    //$scope.modelCusLoc =
    //    {
    //        CustomerID: parameter.CustomerID,
    //        CustomerName: parameter.CustomerName,
    //        Name: ""
    //    };

    $scope.modelCusLocProjectID = parameter.ProjectID;
    $scope.modelCusLocCustomerID = parameter.CustomerID;
    $scope.modelCusLocCustomerName = parameter.CustomerName;
    $scope.modelCusLocName = "";

    //   console.log($scope.modelCusLoc);
    $scope.pageSizes = config.pageSize;
    $scope.init = function () {
        //$scope.searchGetLocation();
        $scope.IsSearch = true;
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
                        kendo.ui.progress($("#gridPopupLocation"), false);

                        var CusLoc = {};
                        if ($scope.IsSearch ||
                            (!$scope.IsSearch && $scope.TempParStored == null)) {
                            CusLoc = {
                                ProjectID: $scope.modelCusLocProjectID,
                                CustomerID: $scope.modelCusLocCustomerID,
                                CustomerName: $scope.modelCusLocCustomerName,
                                Name: $scope.modelCusLocName,
                                IsSearch: $scope.IsSearch
                            };
                            $scope.TempParStored = CusLoc;
                        }
                        else {
                            CusLoc = $scope.TempParStored;
                        }
                        $scope.IsSearch = false;

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }
                        //akow_Authentication_HttpPostL($http, WebApiUrl + 'Popup/GetCustomerLocation?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify($scope.modelCusLoc))
                        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Popup/GetCustomerLocation?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(CusLoc))
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
                    width: "7%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
                },
                {
                    hidden: true,
                    field: "CustomerID",
                    title: "CustomerID",
                    width: "0%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
                },
                {
                    field: "Name",
                    title: "ไซต์งาน / ชื่อที่ตั้ง",
                    width: "30%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:text-top; font-weight:normal;" }
                }
                ,
                {
                    field: "Address",
                    title: "ที่อยู่",
                    width: "63%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" }
                }
            ]
        };

        //$scope.searchGetLocation();
    };

    $scope.searchGetLocation = function () {
        $scope.IsSearch = true;

        var grid = $("#gridPopupLocation").data("kendoGrid");

        var data = {
            page: 1,
            pageSize: 10,
            sort: null,
            IsSearch: $scope.IsSearch

        }

        //grid.dataSource.read(data);
        grid.dataSource.query({ page: 1, pageSize: 10, sort: null });
    };

    $scope.clear = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.selectRowItem = function () {
        var grid = $("#gridPopupLocation").data("kendoGrid");
        var selectedRows = grid.select();
        var dataItem = grid.dataItem(selectedRows[0]);
        $modalInstance.close(dataItem);
    }
});
