ARSoft_Claim_Web.controller("SearchProductModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q) {
    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
    $scope.pageSizes = config.pageSize;

    $scope.init = function () {
        $scope.IsSearch = false;
        $scope.popupProductName = parameter.ProductName;

        // ddl Products Group
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Products/GetProductGroups').success(function (result) {
            if (result != null) {
                $scope.ProductsGroup = result.Data;

            } else {
                $scope.ProductsGroup = null;

            }
        }).error(function (result) {
            console.log(result);
        });

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
                        kendo.ui.progress($("#gridPopupProducts"), false);

                        var productModel = {};
                        if ($scope.IsSearch ||
                            (!$scope.IsSearch && $scope.TempParStored == null)) {
                            productModel = {
                                ProductCode: $scope.popupProductCode,
                                ProductName: $scope.popupProductName,
                                ProductGroupID: $scope.popupProductGroupID,
                                IsSearch: $scope.IsSearch
                            };
                            $scope.TempParStored = productModel;
                        }
                        else {
                            productModel = $scope.TempParStored;
                        }
                        $scope.IsSearch = false;

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Popup/GetProductAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(productModel))
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
                    field: "ProductID",
                    title: "ID",
                    width: "0%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
                },
                {
                    field: "ProductCode",
                    title: "รหัสผลิตภัณฑ์",
                    width: "20%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
                }
                ,
                {
                    field: "ProductName",
                    title: "ชื่อผลิตภัณฑ์",
                    width: "20%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top; font-weight:normal;" }
                }
                ,
                {
                    field: "ProductGroupName",
                    title: "กลุ่มผลิตภัณฑ์",
                    width: "20%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top; font-weight:normal;" }
                }
                ,
                {
                    field: "StatusName",
                    title: "สถานะ",
                    width: "15%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
                }
            ]
        };
    };

    $scope.getPopupProducts = function () {
        $scope.loading = true;
        $scope.IsSearch = true;

        var grid = $("#gridPopupProducts").data("kendoGrid");
        var data = {
            ProductCode: $scope.popupProductCode,
            ProductName: $scope.popupProductName,
            ProductGroupID: $scope.popupProductGroupID,
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
        var grid = $("#gridPopupProducts").data("kendoGrid");
        var selectedRows = grid.select();
        var dataItem = grid.dataItem(selectedRows[0]);
        $modalInstance.close(dataItem);
    }
});