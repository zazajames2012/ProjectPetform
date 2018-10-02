ARSoft_Claim_Web.controller("SearchModelModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q) {
    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
    $scope.pageSizes = config.pageSize;

    if (parameter.FunctionOwner == 'JobOnSite') {
        //var lov_criteria_Product = $("#ddlProduct").data("kendoDropDownList");
        //lov_criteria_Product = parameter.ProductID;
        $scope.lov_criteria_ProductID = parameter.ProductID;
        $scope.lov_criteria_BrandID = parameter.BrandID;
    }
    else if (parameter.FunctionOwner == 'BrandTAT') {
        $scope.lov_criteria_ProductID = parameter.ProductID;
        $scope.lov_criteria_BrandID = parameter.BrandID;
    }
    else if (parameter.FunctionOwner == 'BrandCost') {
        $scope.lov_criteria_ProductID = parameter.ProductID;
        $scope.lov_criteria_BrandID = parameter.BrandID;
    }

    $scope.lov_criteria_ModelName = parameter.ModelName;

    // ddl Product
    akow_Authentication_HttpGet($http, WebMvcUrl + 'Products/GetProducts').success(function (result) {
        if (result != null) {
            $scope.ModelProduct = result.Data;
        } else {
            $scope.ModelProduct = null;
        }

    }).error(function (result) {
        console.log(result);
    });

    // ddl Brand
    akow_Authentication_HttpGet($http, WebMvcUrl + 'Brand/GetBrands').success(function (result) {
        if (result != null) {
            $scope.ModelBrand = result.Data;
        } else {
            $scope.ModelBrand = null;

        }

    }).error(function (result) {
        console.log(result);
    });


    //=============================================================//
    $scope.init = function () {
        $scope.load();
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
                        kendo.ui.progress($("#gridLOVModel"), false);

                        var modelSearchModel = {};
                        if ($scope.IsSearch ||
                            (!$scope.IsSearch && $scope.TempParStored == null)) {
                            modelSearchModel = {
                                ProductID: $scope.lov_criteria_ProductID,
                                BrandID: $scope.lov_criteria_BrandID,
                                ModelName: $scope.lov_criteria_ModelName,
                                PartNumber: $scope.lov_criteria_PartNumber,
                                IsSearch: $scope.IsSearch
                            };
                            $scope.TempParStored = modelSearchModel;
                        }
                        else {
                            modelSearchModel = $scope.TempParStored;
                        }
                        $scope.IsSearch = false;

                        //console.log(modelSearchModel);
                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        akow_Authentication_HttpPostL($http, WebApiUrl + 'Popup/GetModelAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(modelSearchModel))
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
                    field: "ModelID",
                    title: "ModelID",
                    width: "0%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
                },
                {
                    field: "ProductName",
                    title: "ผลิตภัณฑ์",
                    width: "20%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" }
                },
                {
                    field: "BrandName",
                    title: "ยี่ห้อสินค้า",
                    width: "15%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" }
                },
              {
                  field: "ModelName",
                  title: "Model Name",
                  width: "20%",
                  headerAttributes: { style: "text-align:center;" },
                  attributes: { style: "text-align:left; vertical-align:text-top; font-weight:normal;" }
              },
                {
                    field: "PartNumber",
                    title: "Model Number",
                    width: "20%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:text-top; font-weight:normal;" }
                },
                  {
                      field: "Description",
                      title: "รายละเอียด",
                      width: "25%",
                      headerAttributes: { style: "text-align:center;" },
                      attributes: { style: "text-align:left; vertical-align:top;" }
                  },

            ]
        };
    };

    $scope.products = [];
    $scope.brands = [];

    $scope.load = function () {
        var deferred = $q.defer();
        var promise = $q.all(
            [
                $http.get(WebMvcUrl + "/Common/GetAllProduct"),
                $http.get(WebMvcUrl + "/Common/GetAllBrand")
            ]
            ).then(function (data) {
                $scope.products = data[0].data.list;
                $scope.brands = data[1].data.list;
                //$scope.search();
            });
    };

    //$scope.search = function () {
    //    $scope.model.Types = [];        
    //    if ($scope.IsSaller == true) {
    //        $scope.model.Types.push(1);
    //    }
    //    if ($scope.IsSubContract == true) {
    //        $scope.model.Types.push(2);
    //    }

    //    $scope.loading = true;
    //    //$http.post(WebApiUrl + "Popup/GetModelAll", $scope.model)
    //    akow_Authentication_HttpPostL($http, WebApiUrl + "Popup/GetModelAll", $scope.model)
    //    .success(function (data) {
    //        $scope.results = data.Data.list;
    //        var newData = new kendo.data.DataSource({
    //            data: $scope.results
    //        });
    //        $scope.grid.setDataSource(newData);
    //        $scope.grid.dataSource.read();
    //        $scope.loading = false;
    //    });
    //};


    $scope.getModelByCriteria = function () {
        $scope.loading = true;
        $scope.IsSearch = true;

        var grid = $("#gridLOVModel").data("kendoGrid");
        var data = {
            ProductID: $scope.lov_criteria_ProductID,
            BrandID: $scope.lov_criteria_BrandID,
            ModelName: $scope.lov_criteria_ModelName,
            PartNumber: $scope.lov_criteria_PartNumber,
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
        var grid = $("#gridLOVModel").data("kendoGrid");
        var selectedRows = grid.select();
        var dataItem = grid.dataItem(selectedRows[0]);
        $modalInstance.close(dataItem);
    }
});