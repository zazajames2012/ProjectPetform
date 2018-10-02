// *** Update by : Jirawat Pipatpaisan ***
// *** Update Date : 22/10/2015 16:00  ***

var ARSoft_Claim_Web = angular.module("Products", ['kendo.directives', 'ui.bootstrap'])

ARSoft_Claim_Web.controller("ProductsController", function ($scope, $http, config, $modal, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {
    $scope.pageSizes = config.pageSize;
    var opened = false;

    if ($('#hdUserID').val() != undefined) {
        $scope.SysUserID = $('#hdUserID').val();
    } else {
        $scope.SysUserID = 1;
    };

    //getProductSizeAll();
    $scope.initial = function () {
        akow_Authentication_CheckPermission($http);
        initialVariable();
        
        // ddl Products Group
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Products/GetProductGroups').success(function (response, status, headers, config) {
            if (response.Successfully) {
                $scope.viewProductsGroup = response.Data;
            } else {
                $scope.viewProductsGroup = null;

            }
        }).error(function (result) {
            console.log(result);
        });

        //akow_Authentication_HttpGet($http, WebMvcUrl + 'Products/GetProductGroups').success(function (result) {
        //    if (result != null) {
        //        $scope.viewProductsGroup = result.Data;
        //        //console.log($scope.ProductsGroup);

        //    } else {
        //        $scope.viewProductsGroup = null;

        //    }
        //}).error(function (result) {
        //});
        
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
                        kendo.ui.progress($("#gridProductsList"), false);

                        var productModel = {};

                        if ($scope.IsSearch || $scope.TempSearch == null) {
                            productModel = {
                                ProductName: $scope.viewProductName,
                                ProductGroupID: $scope.viewProductGroupID,
                                IsSearch: $scope.IsSearch
                            };
                            $scope.TempSearch = productModel;

                        } else {

                            productModel = $scope.TempSearch;
                        }

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Products/GetAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(productModel))
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
                width: "6%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" },
                sortable: false

            },
            {
                hidden: true,
                field: "ID",
                title: "ID",
                width: "0%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
            },
            //{
            //    field: "Code",
            //    title: "รหัสผลิตภัณฑ์",
            //    width: "12%",
            //    headerAttributes: { style: "text-align:center;" },
            //    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
            //},
            {
                field: "Name",
                title: "ชื่อผลิตภัณฑ์",
                width: "19%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:text-top; font-weight:normal;" }
            }, {
                field: "ProductGroupName",
                title: "กลุ่มผลิตภัณฑ์",
                width: "25%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }, {
                field: "Description",
                title: "รายละเอียด",
                width: "40%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            }
            , {
                field: "StatusName",
                title: "สถานะ",
                width: "10%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:top;" }
            },
             {
                title: "จัดการข้อมูล",
                width: "150px",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:top;" },
                template: "<button class='btn btn-primary akow-viewbutton' ng-click='View(dataItem)'><i class='fa fa-eye'></i></button>"
                        + "&nbsp;&nbsp;<button class='btn btn-primary akow-editbutton' ng-click='Edit(dataItem)'><i class='fa fa-pencil'></i></button>"
                        + "&nbsp;&nbsp;<button class='btn btn-danger akow-deletebutton' ng-click='Delete(dataItem)'><i class='fa fa-trash'></i></button>"
            }           
            ],
            dataBound: function (dataItem) {
                akow_Authentication_CheckPermission($http);
                $scope.IsSearch = false;
            }
        };

    }

    $scope.getProduct = function () {

        var grid = $("#gridProductsList").data("kendoGrid");
        $scope.IsSearch = true;
        //  $scope.productName = $("#productName").val();
        //  $scope.productGroupID = $("#productGroupID option:selected").val();

        grid.dataSource.query({ page: 1, pageSize: 10, sort: null });
    };

    $scope.refreshProduct = function () {

        var grid = $("#gridProductsList").data("kendoGrid");
        $scope.IsSearch = false;
        grid.dataSource.query({ page: 1, pageSize: 10, sort: null });
    };

    $scope.Add = function () {
        if (opened) return;
        opened = true;
        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
					+ 'Products/AddProductsModal',
            controller: 'ProductModalCtrl',
            //windowClass: 'app-modal-window-products',
            size: 'md',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        id: 0,
                        mode: "AddCreate",
                        SysUserID: $scope.SysUserID
                        //,
                        //ProductSizeList: $scope.ProductSizeList
                    };
                }
            }
        });

        modalInstance.result
				.then(
						function () {
						    $scope.init();
						    $scope.clear();
						    opened = false;

						}, function () {
						    opened = false;

						    $scope.refreshProduct();
						});
    };

    $scope.View = function (dataItem) {
        if (opened) return;
        opened = true;
        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
        			+ 'Products/ViewProductsModal',
            controller: 'ProductModalCtrl',
            size: 'md',
            //size: 'lg',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        id: 0,
                        mode: "ViewCreate",
                        dataItem: dataItem,
                        SysUserID: $scope.SysUserID
                        //,
                        //ProductSizeList: $scope.ProductSizeList
                    };
                }
            }
        });

        modalInstance.result
        		.then(
        				function () {
        				    $scope.init();
        				    $scope.clear();
        				    opened = false;

        				}, function () {
        				    // 
        				    opened = false;

        				});
    };

    $scope.Edit = function (dataItem) {
        if (opened) return;
        opened = true;

        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
        			+ 'Products/EditProductsModal',
            controller: 'ProductModalCtrl',
            size: 'md',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        id: 0,
                        mode: "EditCreate",
                        dataItem: dataItem,
                        SysUserID: $scope.SysUserID
                        //,
                        //ProductSizeList: $scope.ProductSizeList
                    };
                }
            }
        });
        //console.log(dataItem);
        modalInstance.result
        		.then(
        				function () {
        				    $scope.init();
        				    $scope.clear();
        				    opened = false;

        				}, function () {
        				    $scope.refreshProduct();
        				    opened = false;

        				});
    };

    $scope.Delete = function (dataItem) {

        akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูล : ' + dataItem.Name + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.deletePro(dataItem); }, null);

        return false;
    }

    $scope.deletePro = function (dataItem) {

        var ProductData = {
            ID: dataItem.ID,
            Code: dataItem.Code,
            Name: dataItem.Name,
            Description: dataItem.Description,
            CreatedBy: dataItem.SysUserID,
            UpdatedBy: dataItem.SysUserID
        };

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Products/Delete', ProductData).success(function (response, status, headers, config) {
            if (response.Successfully) {
                akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, function () { $scope.refreshProduct(); }, null);
            }
            else {
                akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }
            //  console.log(response);
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            //    console.log(status);
        });
    }

    function initialVariable() {
        $scope.ProductSizeList = [];
        $scope.IsSearch = false;        
    }

    function getProductSizeAll() {
        akow_Authentication_HttpGetL($http, WebMvcUrl + "Products/getProductSizeAll")
       .success(function (result) {
           $scope.ProductSizeList = result.Data;           
       });
    }

});

ARSoft_Claim_Web.controller("ProductModalCtrl", function ($scope, $http, config, $modalInstance, parameter, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE, ACTION_MODE, COLOR_CODE, DEALER_DISCOUNT_TYPE) {
    $scope.pageSizes = config.pageSize;
    $scope.SysUserID = parameter.SysUserID;
    $scope.ProductSizeList = [];

    //if (parameter.ProductSizeList != null && parameter.ProductSizeList != undefined) {
    //    $scope.ProductSizeList = parameter.ProductSizeList;
    //    $('#hdSmallLaborCost').val($scope.ProductSizeList[0].Status);
    //    $('#hdNormalLaborCost').val($scope.ProductSizeList[1].Status);
    //    $('#hdLargeLaborCost').val($scope.ProductSizeList[2].Status);
    //    $('#hdExtraLargeLaborCost').val($scope.ProductSizeList[3].Status);

    //    $('#hdSmallMinimumPrice').val($scope.ProductSizeList[0].Status);
    //    $('#hdNormalMinimumPrice').val($scope.ProductSizeList[1].Status);
    //    $('#hdLargeMinimumPrice').val($scope.ProductSizeList[2].Status);
    //    $('#hdExtraLargeMinimumPrice').val($scope.ProductSizeList[3].Status);
    //}
    
    //$scope.PhysicalPathImageProducts = $("#hdPhysicalPathImageProducts").val();
    //$scope.MaxImageUploadSize = $("#hdMaxImageUploadSize").val();

    // ddl Products Group
    akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Products/GetProductGroups').success(function (response, status, headers, config) {
        if (response.Successfully) {
            $scope.ProductsGroup = response.Data;
        } else {
            $scope.ProductsGroup = null;

        }
    }).error(function (result) {
        console.log(result);
    });

    $scope.RefreshAccessoriesList = function () {
        akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'Products/GetProductById?Id=' + parameter.dataItem.ID).success(function (response, status, headers, config) {
            if (response.Successfully) {
                $scope.productID = parameter.dataItem.ID;
                $scope.ID = response.Data.ID;
                $scope.productCode = response.Data.Code;
                $scope.productName = response.Data.Name;
                $scope.productDescription = response.Data.Description;
                $scope.productGroupID = response.Data.ProductGroupID;
                $scope.productSymptomCode = response.Data.SpecificSymptomCode;
                $scope.productRepairCode = response.Data.SpecificRepairCode;
                $scope.specificCode = response.Data.SpecificCode;
                $scope.productStatus = response.Data.Status;                
                //$scope.LaborCostSmall = response.Data.LaborCostSmall;
                //$scope.LaborCostMedium = response.Data.LaborCostMedium;
                //$scope.LaborCostLarge = response.Data.LaborCostLarge;
                //$scope.LaborCostXLarge = response.Data.LaborCostXLarge;
                $scope.MessageOnJob = response.Data.MessageOnJob;
                $scope.RequestSizeOnJob = response.Data.RequestSizeOnJob;
                $scope.BundleSoftware = response.Data.BundleSoftware;

                if ($scope.BundleSoftware) {
                    $scope.RequireLaborCostSoftwareStar = "*";
                    $scope.DisabledLaborCostSoftware = true;
                } else {
                    $scope.RequireLaborCostSoftwareStar = "";
                    $scope.DisabledLaborCostSoftware = true;
                }                

                //$scope.IsHasProductLaborCosts = response.Data.IsHasProductLaborCosts;
                //if (response.Data.ProductLaborCostsList.length > 0) {
                //    $scope.smallDefaltSize = response.Data.ProductLaborCostsList[0].DefaltSize;
                //    $scope.normalDefaltSize = response.Data.ProductLaborCostsList[1].DefaltSize;
                //    $scope.largeDefaltSize = response.Data.ProductLaborCostsList[2].DefaltSize
                //    $scope.extraLargeDefaltSize = response.Data.ProductLaborCostsList[3].DefaltSize

                //    $scope.initialProductLaborCost(response.Data.ProductLaborCostsList);
                //}
                
                //$scope.AccessoriesList = response.Data.AccessoriesList;
                //$scope.RequestSizeOnJobClick();
            }
            else {
                alert(response.Message);
            }
            // console.log(response);
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            //     console.log(status);
        });
    }

    //$scope.initialProductLaborCost = function (productLaborCostsList) {        
    //    // Small Labor Cost
    //    $scope.productID = productLaborCostsList[0].ProductID;
    //    $scope.smallProductLaborCostsID = productLaborCostsList[0].ID;
    //    $scope.normalProductLaborCostsID = productLaborCostsList[1].ID;
    //    $scope.largeProductLaborCostsID = productLaborCostsList[2].ID;
    //    $scope.extraLargeProductLaborCostsID = productLaborCostsList[3].ID;

    //    $scope.smallDefaltSizeID = productLaborCostsList[0].ProductSizeID;        
    //    //$scope.smallDefaltSize = JSON.parse(productLaborCostsList[0].DefaultSize);       
    //    $scope.smallDisplaySizeText = productLaborCostsList[0].DisplaySizeText;
    //    $scope.smallLaborCostHardware = productLaborCostsList[0].LaborCostHardware;
    //    $scope.smallLaborCostSoftware = productLaborCostsList[0].LaborCostSoftwareware;
    //    $scope.smallDealerDiscount = productLaborCostsList[0].DealerDiscount;
    //    $scope.smallMinimumPrice = productLaborCostsList[0].MinimumPrice;
    //    $scope.smallMaximumPrice = productLaborCostsList[0].MaximumPrice;
    //    $scope.smallDealerDiscountType = productLaborCostsList[0].DealerDiscountType;
    //    $("#txtSmallLaborCostHardware").data("kendoNumericTextBox").value($scope.smallLaborCostHardware);
    //    $("#txtSmallLaborCostSoftware").data("kendoNumericTextBox").value($scope.smallLaborCostSoftware);
    //    $("#txtSmallDealerDiscount").data("kendoNumericTextBox").value($scope.smallDealerDiscount);
    //    $("#txtSmallMinimumPrice").data("kendoNumericTextBox").value($scope.smallMinimumPrice);

    //    // Normal Labor Cost
    //    $scope.normalDefaltSizeID = productLaborCostsList[1].ProductSizeID;
    //    //$scope.normalDefaltSize = JSON.parse(productLaborCostsList[1].DefaultSize);        
    //    $scope.normalDisplaySizeText = productLaborCostsList[1].DisplaySizeText;
    //    $scope.normalLaborCostHardware = productLaborCostsList[1].LaborCostHardware;
    //    $scope.normalLaborCostSoftware = productLaborCostsList[1].LaborCostSoftwareware;
    //    $scope.normalDealerDiscount = productLaborCostsList[1].DealerDiscount;
    //    $scope.normalMinimumPrice = productLaborCostsList[1].MinimumPrice;
    //    $scope.normalMaximumPrice = productLaborCostsList[1].MaximumPrice;
    //    $scope.normalDealerDiscountType = productLaborCostsList[1].DealerDiscountType;
    //    $("#txtNormalLaborCostHardware").data("kendoNumericTextBox").value($scope.normalLaborCostHardware);
    //    $("#txtNormalLaborCostSoftware").data("kendoNumericTextBox").value($scope.normalLaborCostSoftware);
    //    $("#txtNormalDealerDiscount").data("kendoNumericTextBox").value($scope.normalDealerDiscount);
    //    $("#txtNormalMinimumPrice").data("kendoNumericTextBox").value($scope.normalMinimumPrice);

    //    // Large Labor Cost
    //    $scope.largeDefaltSizeID = productLaborCostsList[2].ProductSizeID;
    //    //$scope.largeDefaltSize = JSON.parse(productLaborCostsList[2].DefaultSize);
    //    $scope.largeDisplaySizeText = productLaborCostsList[2].DisplaySizeText;
    //    $scope.largeLaborCostHardware = productLaborCostsList[2].LaborCostHardware;
    //    $scope.largeLaborCostSoftware = productLaborCostsList[2].LaborCostSoftwareware;
    //    $scope.largeDealerDiscount = productLaborCostsList[2].DealerDiscount;
    //    $scope.largeMinimumPrice = productLaborCostsList[2].MinimumPrice;
    //    $scope.largeMaximumPrice = productLaborCostsList[2].MaximumPrice;
    //    $scope.largeDealerDiscountType = productLaborCostsList[2].DealerDiscountType;
    //    $("#txtLargeLaborCostHardware").data("kendoNumericTextBox").value($scope.largeLaborCostHardware);
    //    $("#txtLargeLaborCostSoftware").data("kendoNumericTextBox").value($scope.largeLaborCostSoftware);
    //    $("#txtLargeDealerDiscount").data("kendoNumericTextBox").value($scope.largeDealerDiscount);
    //    $("#txtLargeMinimumPrice").data("kendoNumericTextBox").value($scope.largeMinimumPrice);

    //    // Extra Large Labor Cost
    //    $scope.extraLargeDefaltSizeID = productLaborCostsList[3].ProductSizeID;
    //    //$scope.extraLargeDefaltSize = JSON.parse(productLaborCostsList[3].DefaultSize);
    //    $scope.extraLargeDisplaySizeText = productLaborCostsList[3].DisplaySizeText;
    //    $scope.extraLargeLaborCostHardware = productLaborCostsList[3].LaborCostHardware;
    //    $scope.extraLargeLaborCostSoftware = productLaborCostsList[3].LaborCostSoftwareware;
    //    $scope.extraLargeDealerDiscount = productLaborCostsList[3].DealerDiscount;
    //    $scope.extraLargeMinimumPrice = productLaborCostsList[3].MinimumPrice;
    //    $scope.extraLargeMaximumPrice = productLaborCostsList[3].MaximumPrice;
    //    $scope.extraLargeDealerDiscountType = productLaborCostsList[3].DealerDiscountType;
    //    $("#txtExtraLargeLaborCostHardware").data("kendoNumericTextBox").value($scope.extraLargeLaborCostHardware);
    //    $("#txtExtraLargeLaborCostSoftware").data("kendoNumericTextBox").value($scope.extraLargeLaborCostSoftware);
    //    $("#txtExtraLargeDealerDiscount").data("kendoNumericTextBox").value($scope.extraLargeDealerDiscount);
    //    $("#txtExtraLargeMinimumPrice").data("kendoNumericTextBox").value($scope.extraLargeMinimumPrice);
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

    $scope.RequestSizeOnJobClick = function () {
        if ($scope.RequestSizeOnJob == true) {
            $scope.MessageOnJobCss = "akow-require-field form-control";
        }
        else {
            $scope.MessageOnJobCss = "form-control";
            $("#MessageOnJob").css("background-color", COLOR_CODE.WHITE);
        }
    }

    initialVariable();

    if (parameter.mode == "AddCreate") {

        $scope.initial = function () {
            akow_Authentication_CheckPermission($http);

            $scope.productStatus = 1;

            $scope.MessageOnJobCss = "form-control";
            
            //akow_Authentication_HttpGetL($http, WebMvcUrl + "Brand/GetProductSizeUsingList")
            //.success(function (result) {
            //    data = result.Data;
            //    $scope.LaborCostSmallDis = data.Small == 0 ? true : false;
            //    $scope.LaborCostSmallCss = data.Small == 0 ? "" : "akow-require-field";

            //    $scope.LaborCostMediumDis = data.Medium == 0 ? true : false;
            //    $scope.LaborCostMediumCss = data.Medium == 0 ? "" : "akow-require-field";

            //    $scope.LaborCostLargeDis = data.Large == 0 ? true : false;
            //    $scope.LaborCostLargeCss = data.Large == 0 ? "" : "akow-require-field";

            //    $scope.LaborCostXLargeDis = data.XLarge == 0 ? true : false;
            //    $scope.LaborCostXLargeCss = data.XLarge == 0 ? "" : "akow-require-field";
            //});

            //$scope.LaborCostSmall = data.Small == 0 ? null : 0;
            //$scope.LaborCostMedium = data.Medium == 0 ? null : 0;
            //$scope.LaborCostLarge = data.Large == 0 ? null : 0;
            //$scope.LaborCostXLarge = data.XLarge == 0 ? null : 0;
            closeLoadingProgress();
        }

        $scope.Close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.addProduct = function () {

            if (!akow_Validate_ValidateInput()) {
                return false;
            }

            // var rbtStatus = $('input[type=radio][name=rbtStatusGroup]:checked').val();
            var ProductData = {
                //ID: 0,
                Code: $scope.productCode,
                Name: $scope.productName,
                Description: $scope.productDescription,
                ProductGroupID: $scope.productGroupID,
                SpecificSymptomCode: $scope.productSymptomCode,
                SpecificRepairCode: $scope.productRepairCode,
                SpecificCode: $scope.specificCode,
                //LaborCostSmall: $scope.LaborCostSmall,
                //LaborCostMedium: $scope.LaborCostMedium,
                //LaborCostLarge: $scope.LaborCostLarge,
                //LaborCostXLarge: $scope.LaborCostXLarge,
                BundleSoftware: $scope.BundleSoftware,
            //    RequestSizeOnJob: $scope.RequestSizeOnJob == "1" ? true : false,                
           //     MessageOnJob: $scope.MessageOnJob,
                Status: $scope.productStatus,
                CreatedBy: parameter.SysUserID,
                UpdatedBy: parameter.SysUserID
                //,
                //ProductLaborCostsList: $scope.getAllProductLaborCosts()
            };
            //console.log(ProductData);
            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Products/PostBasic', ProductData).success(function (response, status, headers, config) {
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

    if (parameter.mode == "ViewCreate") {

        // console.log('checkin');
        $scope.initial = function () {
            //akow_Authentication_DisableAll($http);
            akow_Authentication_DisableByID("modal-body");
            //$scope.LaborCostSmallDis = true;
            //$scope.LaborCostSmallCss = "";

            //$scope.LaborCostMediumDis = true;
            //$scope.LaborCostMediumCss = "";

            //$scope.LaborCostLargeDis = true;
            //$scope.LaborCostLargeCss = "";

            //$scope.LaborCostXLargeDis = true;
            //$scope.LaborCostXLargeCss = "";
        }

        $scope.Close = function () {
            //akow_Authentication_EnableAll($http);
            $modalInstance.dismiss('cancel');
        };
        $scope.initialTabCheckList = function () {

            $scope.mainGridOptionsPmChecklist = {
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
                            kendo.ui.progress($("#gridPmChecklist"), false);

                            var Model = {
                                ProductID: $scope.ID
                            };

                            var sortField = '';
                            if (e.data.sort != null) {
                                if (e.data.sort[0] != null) {
                                    sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                                }
                            }
                            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Products/GetProductPmChecklistAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(Model))
                                .success(function (resultAction, status, headers, config) {
                                    console.log(resultAction);
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
                    width: "10%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
                }
                , {
                    field: "Label",
                    title: "รายการตรวจสอบ",
                    width: "90%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left;" }
                }],
                dataBound: function (dataItem) {
                    akow_Authentication_CheckPermission($http);
                },
            }
        }

        akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'Products/GetProductById?Id=' + parameter.dataItem.ID).success(function (response, status, headers, config) {
            if (response.Successfully) {
                $scope.ID = response.Data.ID;
                $scope.productCode = response.Data.Code;
                $scope.productName = response.Data.Name;
                $scope.productDescription = response.Data.Description;
                $scope.productGroupID = response.Data.ProductGroupID;
                $scope.productSymptomCode = response.Data.SpecificSymptomCode;
                $scope.productRepairCode = response.Data.SpecificRepairCode;
                $scope.specificCode = response.Data.SpecificCode;
                $scope.productStatus = response.Data.Status;
              //  $scope.AccessoriesList = response.Data.AccessoriesList;
                //$scope.LaborCostSmall = response.Data.LaborCostSmall;
                //$scope.LaborCostMedium = response.Data.LaborCostMedium;
                //$scope.LaborCostLarge = response.Data.LaborCostLarge;
                //$scope.LaborCostXLarge = response.Data.LaborCostXLarge;                
                $scope.MessageOnJob = response.Data.MessageOnJob;
                $scope.RequestSizeOnJob = response.Data.RequestSizeOnJob;
                $scope.BundleSoftware = response.Data.BundleSoftware;

                if ($scope.BundleSoftware) {
                    $scope.RequireLaborCostSoftwareStar = "*";
                    $scope.DisabledLaborCostSoftware = true;
                } else {
                    $scope.RequireLaborCostSoftwareStar = "";
                    $scope.DisabledLaborCostSoftware = true;
                }

         //       $scope.IsHasProductLaborCosts = response.Data.IsHasProductLaborCosts;
                //if (response.Data.ProductLaborCostsList.length > 0) {
                //    $scope.smallDefaltSize = response.Data.ProductLaborCostsList[0].DefaltSize;
                //    $scope.normalDefaltSize = response.Data.ProductLaborCostsList[1].DefaltSize;
                //    $scope.largeDefaltSize = response.Data.ProductLaborCostsList[2].DefaltSize
                //    $scope.extraLargeDefaltSize = response.Data.ProductLaborCostsList[3].DefaltSize

                //    $scope.initialProductLaborCost(response.Data.ProductLaborCostsList);
                //}

                //  console.log(response.Data);

            }
            else {
                alert(response.Message);
            }
            // console.log(response);
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            //     console.log(status);
        });


    }

    if (parameter.mode == "EditCreate") {

        $scope.initial = function () {
            akow_Authentication_CheckPermission($http);

            //akow_Authentication_HttpGetL($http, WebMvcUrl + "Brand/GetProductSizeUsingList")
            //.success(function (result) {
            //    data = result.Data;
            //    $scope.LaborCostSmallDis = data.Small == 0 ? true : false;
            //    $scope.LaborCostSmallCss = data.Small == 0 ? "" : "akow-require-field";

            //    $scope.LaborCostMediumDis = data.Medium == 0 ? true : false;
            //    $scope.LaborCostMediumCss = data.Medium == 0 ? "" : "akow-require-field";

            //    $scope.LaborCostLargeDis = data.Large == 0 ? true : false;
            //    $scope.LaborCostLargeCss = data.Large == 0 ? "" : "akow-require-field";

            //    $scope.LaborCostXLargeDis = data.XLarge == 0 ? true : false;
            //    $scope.LaborCostXLargeCss = data.XLarge == 0 ? "" : "akow-require-field";
            //});
        }

        $scope.Close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.RefreshAccessoriesList();

        $scope.initialTabCheckList = function () {
            //$scope.mainGridOptionsPmChecklist = {
            //    dataSource: {
            //        schema: {
            //            data: function (data) {
            //                if (data != null) {
            //                    return data;
            //                }
            //                else {
            //                    return '';
            //                }
            //            },
            //            total: function (data) {
            //                if (data != null) {
            //                    return data[0].RecordCount;
            //                }
            //                else {
            //                    return 0;
            //                }
            //            }
            //        },
            //        pageSize: $scope.pageSizes,
            //        serverPaging: true,
            //        serverSorting: true,
            //        transport: {

            //            read: function (e) {
            //                kendo.ui.progress($("#gridPmChecklist"), false);

            //                var Model = {
            //                    ProductID: $scope.ID
            //                };

            //                var sortField = '';
            //                if (e.data.sort != null) {
            //                    if (e.data.sort[0] != null) {
            //                        sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
            //                    }
            //                }
            //                akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Products/GetProductPmChecklistAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(Model))
            //                    .success(function (resultAction, status, headers, config) {
            //                        console.log(resultAction);
            //                        if (resultAction.Successfully) {
            //                            if (resultAction.Data != '') {
            //                                e.success(resultAction.Data);
            //                            }
            //                            else {
            //                                e.success();
            //                            }
            //                        }
            //                        else {
            //                            e.success();
            //                        }
            //                    })
            //                    .error(function (resultAction, status, headers, config) {
            //                        e.success();
            //                    });
            //            }
            //        }
            //    },
            //    sortable: true,
            //    selectable: "row",
            //    pageable: {
            //        pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
            //    },
            //    columns: [
            //    {
            //        hidden: false,
            //        field: "RowNumber",
            //        title: "ลำดับ",
            //        width: "8%",
            //        headerAttributes: { style: "text-align:center;" },
            //        attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
            //    }
            //    , {
            //        field: "Label",
            //        title: "รายการตรวจสอบ",
            //        width: "74%",
            //        headerAttributes: { style: "text-align:center;" },
            //        attributes: { style: "text-align:left;" }
            //    }, {
            //        width: "9%",
            //        template: (function (dataItem) {
            //            var upButton;

            //            if (dataItem.MinFlag == true) {
            //                upButton = "<button class='btn' disabled><i class='glyphicon glyphicon-arrow-up'></i></button>"
            //            }
            //            else {
            //                upButton = "<button class='btn' ng-click='ProductChecklistUpAction(dataItem.ID, dataItem)'><i class='glyphicon glyphicon-arrow-up'></i></button>"
            //            }
            //            return upButton;
            //            return checkSysFlag;
            //        }),
            //        headerAttributes: { style: "text-align:center;" },
            //        attributes: { style: "text-align:center;" }
            //    },
            //    {
            //        width: "9%",
            //        template: (function (dataItem) {
            //            var upButton;

            //            if (dataItem.MaxFlag == true) {
            //                upButton = "<button class='btn' disabled><i class='glyphicon glyphicon-arrow-down'></i></button>"
            //            }
            //            else {
            //                upButton = "<button class='btn' ng-click='ProductChecklistDownAction(dataItem.ID, dataItem)'><i class='glyphicon glyphicon-arrow-down'></i></button>"
            //            }
            //            return upButton;
            //            return checkSysFlag;
            //        }),
            //        headerAttributes: { style: "text-align:center;" },
            //        attributes: { style: "text-align:center;" }
            //    },
            //    {
            //        title: "จัดการข้อมูล",
            //        width: "200px",
            //        template: "<button class='btn btn-primary akow-editbutton' ng-click='editPmCheckList(dataItem)'><i class='fa fa-pencil'></i>&nbsp;Edit</button> <button class='btn btn-danger akow-deletebutton' ng-click='delPmCheckList(dataItem)'><i class='fa fa-trash'></i>&nbsp;Delete</button>",
            //        headerAttributes: { style: "text-align:center;" },
            //        attributes: { style: "text-align:center;" }
            //    }],
            //    dataBound: function (dataItem) {
            //        akow_Authentication_CheckPermission($http);
            //    },
            //}
        }

        //$scope.ProductChecklistUpAction = function (CheckListID, dataItem) {

        //    var ModelData = {
        //        ID: dataItem.ID,
        //        ProductID: dataItem.ProductID,
        //        DisplaySeq: dataItem.DisplaySeq,
        //        CreatedBy: $scope.SysUserID,
        //        UpdatedBy: $scope.SysUserID
        //    };


        //    akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Products/UpSequenceCheckList', ModelData).success(function (response, status, headers, config) {
        //        if (response.Successfully) {
        //            $scope.RefreshTabCheckList();
        //        }
        //        else {
        //            akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
        //        }
        //    }).error(function (response, status, headers, config) {
        //        alert(response.Message);
        //        console.log(status);
        //    });
        //}

        //$scope.ProductChecklistDownAction = function (equipStatusID, dataItem) {

        //    var ModelData = {
        //        ID: dataItem.ID,
        //        ProductID: dataItem.ProductID,
        //        DisplaySeq: dataItem.DisplaySeq,
        //        CreatedBy: $scope.SysUserID,
        //        UpdatedBy: $scope.SysUserID
        //    };

        //    akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Products/DownSequenceCheckList', ModelData).success(function (response, status, headers, config) {
        //        if (response.Successfully) {
        //            $scope.RefreshTabCheckList();
        //        }
        //        else {
        //            akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
        //        }
        //    }).error(function (response, status, headers, config) {
        //        alert(response.Message);
        //        console.log(status);
        //    });
        //}

        //$scope.addPmCheckList = function () {
        //    var modalInstance = $modal.open({
        //        templateUrl: WebMvcUrl
        //                + 'Products/AddProductsPmChecklistModal',
        //        controller: 'ProductPmChecklistModalController',
        //        size: 'md',
        //        backdrop: false,
        //        animation: true,
        //        resolve: {
        //            parameter: function () {
        //                return model = {
        //                    mode: "AddCreate",
        //                    SysUserID: $scope.SysUserID,
        //                    ProductID: $scope.ID,
        //                    ProductName: $scope.productName
        //                };
        //            }
        //        }
        //    });
        //    modalInstance.result
        //        .then(
        //        function () {
        //        }, function () {
        //        });
        //};

        //$scope.editPmCheckList = function (dataItem) {
        //    var modalInstance = $modal.open({
        //        templateUrl: WebMvcUrl
        //                + 'Products/EditProductsPmChecklistModal',
        //        controller: 'ProductPmChecklistModalController',
        //        size: 'md',
        //        backdrop: false,
        //        animation: true,
        //        resolve: {
        //            parameter: function () {
        //                return model = {
        //                    mode: "EditCreate",
        //                    dataItem: dataItem,
        //                    SysUserID: $scope.SysUserID,
        //                    ProductID: $scope.ID,
        //                    ProductName: $scope.productName
        //                };
        //            }
        //        }
        //    });

        //    modalInstance.result
        //            .then(
        //                    function () {
        //                    }, function () {
        //                    });
        //};

        $scope.editProduct = function () {
            if (!akow_Validate_ValidateInput()) {
                return false;
            }

            //var rbtStatus = $('input[type=radio][name=rbtStatusGroup]:checked').val();
            //var productLaborCostsList = [];
            //productLaborCostsList = $scope.getAllProductLaborCosts();

            var ProductData = {
                ID: $scope.ID,
                Code: $scope.productCode,
                Name: $scope.productName,
                Description: $scope.productDescription,
                ProductGroupID: $scope.productGroupID,
                SpecificSymptomCode: $scope.productSymptomCode,
                SpecificRepairCode: $scope.productRepairCode,
                SpecificCode: $scope.specificCode,              
                //LaborCostSmall: $scope.LaborCostSmall,
                //LaborCostMedium: $scope.LaborCostMedium,
                //LaborCostLarge: $scope.LaborCostLarge,
                //LaborCostXLarge: $scope.LaborCostXLarge,
                BundleSoftware: $scope.BundleSoftware,
                RequestSizeOnJob: $scope.RequestSizeOnJob=="1"? true:false,                
                MessageOnJob: $scope.MessageOnJob,
                Status: $scope.productStatus,
                CreatedBy: parameter.SysUserID,
                UpdatedBy: parameter.SysUserID
                //,
                //AccessoriesList: $scope.AccessoriesList,
                //ProductLaborCostsList: productLaborCostsList
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Products/PutBasic', ProductData).success(function (response, status, headers, config) {
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

        //$scope.addAccessories = function () {
        //    var modalInstance = $modal.open({
        //        templateUrl: WebMvcUrl
        //                + 'Accessories/AddModal',
        //        controller: 'AccessoriesModalController',
        //        size: 'md',
        //        backdrop: false,
        //        animation: true,
        //        resolve: {
        //            parameter: function () {
        //                return model = {
        //                    mode: "AddCreate",
        //                    SysUserID: $scope.SysUserID,
        //                    TypeId: $scope.eqiupTypeID
        //                };
        //            }
        //        }
        //    });
        //    modalInstance.result
        //        .then(
        //        function () {
        //            $scope.RefreshAccessoriesList();

        //        }, function () {
        //            $scope.RefreshAccessoriesList();
        //        });
        //};

        //$scope.RefreshTabCheckList = function () {

        //    var grid = $("#gridPmChecklist").data("kendoGrid");
        //    grid.dataSource.query({ page: 1, pageSize: 10, sort: null });
        //};

        //$scope.delPmCheckList = function (dataItem) {

        //    akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูล : ' + dataItem.Label + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.deleteItem(dataItem); }, null);

        //    return false;
        //}

        $scope.deleteItem = function (dataItem) {

            var ProductData = {
                ID: dataItem.ID
            };


            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Products/DeleteChecklist', ProductData).success(function (response, status, headers, config) {
                if (response.Successfully) {
                    akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, function () { $scope.RefreshTabCheckList(); }, null);
                }
                else {
                    akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
                }
                //  console.log(response);
            }).error(function (response, status, headers, config) {
                alert(response.Message);
                //    console.log(status);
            });
        }

        //------------------------------------------------------------------------//
        //$scope.RefreshProductImage = function () {
        //    var i;
        //    var varimgFront;
        //    var varimgRear;
        //    var varimgRight;
        //    var varimgLeft;
        //    var varimgTop;
        //    var varimgBottom;
        //    var PathNull = WebMvcUrl + "DocumentAttachments/Products/00/noimagefound.jpg";

        //    akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'Products/GetProductImageList?productId=' + $scope.ID).success(function (result) {
        //        if (result != null) {
        //            data = result.Data;
        //            for (i in data) {
        //                switch (data[i].Side) {
        //                    case 1:
        //                        varimgFront = WebMvcUrl + data[i].strPath;
        //                        break;
        //                    case 2:
        //                        varimgRear = WebMvcUrl + data[i].strPath;
        //                        break;
        //                    case 3:
        //                        varimgRight = WebMvcUrl + data[i].strPath;
        //                        break;
        //                    case 4:
        //                        varimgLeft = WebMvcUrl + data[i].strPath;
        //                        break;
        //                    case 5:
        //                        varimgTop = WebMvcUrl + data[i].strPath;
        //                        break;
        //                    case 6:
        //                        varimgBottom = WebMvcUrl + data[i].strPath;
        //                        break;
        //                    default: null;
        //                }
        //            }
        //            $scope.imgFront = varimgFront != null ? varimgFront : PathNull;
        //            $scope.imgRear = varimgRear != null ? varimgRear : PathNull;
        //            $scope.imgRight = varimgRight != null ? varimgRight : PathNull;
        //            $scope.imgLeft = varimgLeft != null ? varimgLeft : PathNull;
        //            $scope.imgTop = varimgTop != null ? varimgTop : PathNull;
        //            $scope.imgBottom = varimgBottom != null ? varimgBottom : PathNull;

        //        } else {
        //            null;
        //        }
        //    }).error(function (result) {
        //        console.log(result);
        //    });
        //}
        //$scope.initialTabServiceCardImage = function () {
        //    $scope.RefreshProductImage();
        //    $scope.UploadImgModal = function () {
        //        var modalInstance = $modal.open({
        //            templateUrl: WebMvcUrl
        //                    + 'Products/UploadImageModal',
        //            controller: 'ServicesCardImageModalController',
        //            size: 'md',
        //            backdrop: false,
        //            animation: true,
        //            resolve: {
        //                parameter: function () {
        //                    return model = {
        //                        id: 0,
        //                        mode: "Upload",
        //                        SysUserID: $scope.SysUserID,
        //                        PhysicalPathImgProduct: $scope.PhysicalPathImageProducts,
        //                        MaxImgUploadSize: $scope.MaxImageUploadSize,
        //                        ProductID: $scope.ID,
        //                        ProductCode: $scope.productCode,
        //                        ProductName: $scope.productName
        //                    };
        //                }
        //            }
        //        });
        //        modalInstance.result
        //                .then(
        //                        function (result) {
        //                            $scope.RefreshProductImage();
        //                        }, function () {
        //                            $scope.RefreshProductImage();
        //                        });
        //    };
        //    $scope.DelImg = function (side) {
        //        var ProductImgData = {
        //            ProductID: $scope.ID,
        //            Side: side
        //        };

        //        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Products/DelProductImage', ProductImgData).success(function (response, status, headers, config) {
        //            if (response.Successfully) {
        //                akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, function () { $scope.RefreshProductImage(); }, null);
        //            }
        //            else {
        //                akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
        //            }
        //        }).error(function (response, status, headers, config) {
        //            alert(response.Message);
        //        });
        //    };
        //}
    }

    $scope.onClickBundleSoftware = function () {
        var isBundleSoftware = $('input[type=radio][name=rbtBundleSoftwareGroup]:checked').val();

        if (isBundleSoftware == "1") {
            $scope.BundleSoftware = true;
            $scope.RequireLaborCostSoftwareStar = "*";            
        } else {
            $scope.BundleSoftware = false;
            $scope.RequireLaborCostSoftwareStar = "";            
        }

        if ($scope.smallDefaltSizeStatus) {
            var txtSmallLaborCostSoftware = $("#txtSmallLaborCostSoftware").data("kendoNumericTextBox");
            txtSmallLaborCostSoftware.enable($scope.BundleSoftware || $scope.smallDefaltSizeStatus);
        }

        if ($scope.normalDefaltSizeStatus) {
            var txtNormalLaborCostSoftware = $("#txtNormalLaborCostSoftware").data("kendoNumericTextBox");
            txtNormalLaborCostSoftware.enable($scope.BundleSoftware || $scope.normalDefaltSizeStatus);
        }

        if ($scope.largeDefaltSizeStatus) {
            var txtLargeLaborCostSoftware = $("#txtLargeLaborCostSoftware").data("kendoNumericTextBox");
            txtLargeLaborCostSoftware.enable($scope.BundleSoftware || $scope.largeDefaltSizeStatus);
        }

        if ($scope.extraLargeDefaltSizeStatus) {
            var txtExtraLargeLaborCostSoftware = $("#txtExtraLargeLaborCostSoftware").data("kendoNumericTextBox");
            txtExtraLargeLaborCostSoftware.enable($scope.BundleSoftware || $scope.extraLargeDefaltSizeStatus);
        }               
    }

    $scope.onChangeSmallDefaltSize = function () {       
        if ($scope.smallDefaltSize) {
            var txtSmallLaborCostHardware = $("#txtSmallLaborCostHardware").data("kendoNumericTextBox");
            txtSmallLaborCostHardware.enable(true);

            var txtSmallLaborCostSoftware = $("#txtSmallLaborCostSoftware").data("kendoNumericTextBox");
            txtSmallLaborCostSoftware.enable(true);

            var txtSmallDealerDiscount = $("#txtSmallDealerDiscount").data("kendoNumericTextBox");
            txtSmallDealerDiscount.enable(true);

            var txtSmallMinimumPrice = $("#txtSmallMinimumPrice").data("kendoNumericTextBox");
            txtSmallMinimumPrice.enable(true);
        } else {
            $("#txtSmallLaborCostHardware").data("kendoNumericTextBox").value(0.00);
            $("#txtSmallLaborCostSoftware").data("kendoNumericTextBox").value(0.00);
            $("#txtSmallDealerDiscount").data("kendoNumericTextBox").value(0.00);
            $("#txtSmallMinimumPrice").data("kendoNumericTextBox").value(0.00);

            var txtSmallLaborCostHardware = $("#txtSmallLaborCostHardware").data("kendoNumericTextBox");
            txtSmallLaborCostHardware.enable(false);

            var txtSmallLaborCostSoftware = $("#txtSmallLaborCostSoftware").data("kendoNumericTextBox");
            txtSmallLaborCostSoftware.enable(false);

            var txtSmallDealerDiscount = $("#txtSmallDealerDiscount").data("kendoNumericTextBox");
            txtSmallDealerDiscount.enable(false);

            var txtSmallMinimumPrice = $("#txtSmallMinimumPrice").data("kendoNumericTextBox");
            txtSmallMinimumPrice.enable(false);
        }
    }

    $scope.onChangeNormalDefaltSize = function () {
        if ($scope.normalDefaltSize) {
            var txtNormalLaborCostHardware = $("#txtNormalLaborCostHardware").data("kendoNumericTextBox");
            txtNormalLaborCostHardware.enable(true);

            var txtNormalLaborCostSoftware = $("#txtNormalLaborCostSoftware").data("kendoNumericTextBox");
            txtNormalLaborCostSoftware.enable(true);

            var txtNormalDealerDiscount = $("#txtNormalDealerDiscount").data("kendoNumericTextBox");
            txtNormalDealerDiscount.enable(true);

            var txtNormalMinimumPrice = $("#txtNormalMinimumPrice").data("kendoNumericTextBox");
            txtNormalMinimumPrice.enable(true);
        } else {
            $("#txtNormalLaborCostHardware").data("kendoNumericTextBox").value(0.00);
            $("#txtNormalLaborCostSoftware").data("kendoNumericTextBox").value(0.00);
            $("#txtNormalDealerDiscount").data("kendoNumericTextBox").value(0.00);
            $("#txtNormalMinimumPrice").data("kendoNumericTextBox").value(0.00);

            //var txtNormalLaborCostHardware = $("#txtNormalLaborCostHardware").data("kendoNumericTextBox");
            //txtNormalLaborCostHardware.enable(false);

            //var txtNormalLaborCostSoftware = $("#txtNormalLaborCostSoftware").data("kendoNumericTextBox");
            //txtNormalLaborCostSoftware.enable(false);

            //var txtNormalDealerDiscount = $("#txtNormalDealerDiscount").data("kendoNumericTextBox");
            //txtNormalDealerDiscount.enable(false);

            //var txtNormalMinimumPrice = $("#txtNormalMinimumPrice").data("kendoNumericTextBox");
            //txtNormalMinimumPrice.enable(false);
        }
    }

    $scope.onChangeLargeDefaltSize = function () {
        if ($scope.largeDefaltSize) {
            var txtLargeLaborCostHardware = $("#txtLargeLaborCostHardware").data("kendoNumericTextBox");
            txtLargeLaborCostHardware.enable(true);

            var txtLargeLaborCostSoftware = $("#txtLargeLaborCostSoftware").data("kendoNumericTextBox");
            txtLargeLaborCostSoftware.enable(true);

            var txtLargeDealerDiscount = $("#txtLargeDealerDiscount").data("kendoNumericTextBox");
            txtLargeDealerDiscount.enable(true);

            var txtLargeMinimumPrice = $("#txtLargeMinimumPrice").data("kendoNumericTextBox");
            txtLargeMinimumPrice.enable(true);
        } else {
            $("#txtLargeLaborCostHardware").data("kendoNumericTextBox").value(0.00);
            $("#txtLargeLaborCostSoftware").data("kendoNumericTextBox").value(0.00);
            $("#txtLargeDealerDiscount").data("kendoNumericTextBox").value(0.00);
            $("#txtLargeMinimumPrice").data("kendoNumericTextBox").value(0.00);

            //var txtLargeLaborCostHardware = $("#txtLargeLaborCostHardware").data("kendoNumericTextBox");
            //txtLargeLaborCostHardware.enable(false);

            //var txtLargeLaborCostSoftware = $("#txtLargeLaborCostSoftware").data("kendoNumericTextBox");
            //txtLargeLaborCostSoftware.enable(false);

            //var txtLargeDealerDiscount = $("#txtLargeDealerDiscount").data("kendoNumericTextBox");
            //txtLargeDealerDiscount.enable(false);

            //var txtLargeMinimumPrice = $("#txtLargeMinimumPrice").data("kendoNumericTextBox");
            //txtLargeMinimumPrice.enable(false);
        }
    }

    $scope.onChangeExtraLargeDefaltSize = function () {
        if ($scope.extraLargeDefaltSize) {
            var txtExtraLargeLaborCostHardware = $("#txtExtraLargeLaborCostHardware").data("kendoNumericTextBox");
            txtExtraLargeLaborCostHardware.enable(true);

            var txtExtraLargeLaborCostSoftware = $("#txtExtraLargeLaborCostSoftware").data("kendoNumericTextBox");
            txtExtraLargeLaborCostSoftware.enable(true);

            var txtExtraLargeDealerDiscount = $("#txtExtraLargeDealerDiscount").data("kendoNumericTextBox");
            txtExtraLargeDealerDiscount.enable(true);

            var txtExtraLargeMinimumPrice = $("#txtExtraLargeMinimumPrice").data("kendoNumericTextBox");
            txtExtraLargeMinimumPrice.enable(true);
        } else {
            $("#txtExtraLargeLaborCostHardware").data("kendoNumericTextBox").value(0.00);
            $("#txtExtraLargeLaborCostSoftware").data("kendoNumericTextBox").value(0.00);
            $("#txtExtraLargeDealerDiscount").data("kendoNumericTextBox").value(0.00);
            $("#txtExtraLargeMinimumPrice").data("kendoNumericTextBox").value(0.00);

            var txtExtraLargeLaborCostHardware = $("#txtExtraLargeLaborCostHardware").data("kendoNumericTextBox");
            txtExtraLargeLaborCostHardware.enable(false);

            var txtExtraLargeLaborCostSoftware = $("#txtExtraLargeLaborCostSoftware").data("kendoNumericTextBox");
            txtExtraLargeLaborCostSoftware.enable(false);

            var txtExtraLargeDealerDiscount = $("#txtExtraLargeDealerDiscount").data("kendoNumericTextBox");
            txtExtraLargeDealerDiscount.enable(false);

            var txtExtraLargeMinimumPrice = $("#txtExtraLargeMinimumPrice").data("kendoNumericTextBox");
            txtExtraLargeMinimumPrice.enable(false);
        }
    }

    $scope.getSmallProductLaborCosts = function ()
    {                
        $scope.ProductSizeID = $scope.smallDefaltSizeID;
        $scope.DefaltSize = $scope.smallDefaltSize;
        $scope.DisplaySizeText = $scope.smallDisplaySizeText;
        $scope.LaborCostHardware = $("#txtSmallLaborCostHardware").data("kendoNumericTextBox").value();
        $scope.LaborCostSoftwareware = $("#txtSmallLaborCostSoftware").data("kendoNumericTextBox").value();
        $scope.DealerDiscount = $("#txtSmallDealerDiscount").data("kendoNumericTextBox").value();
        $scope.DealerDiscountType = DEALER_DISCOUNT_TYPE.Discount;
        $scope.MaximumPrice = 2500.00;
        $scope.MinimumPrice = $("#txtSmallMinimumPrice").data("kendoNumericTextBox").value();

        var ProductLaborCostsModel =
        {
            ID : $scope.smallProductLaborCostsID,
            ProductID: $scope.productID,
            ProductSizeID: $scope.ProductSizeID,
            DefaltSize: $scope.DefaltSize,
            DisplaySizeText: $scope.DisplaySizeText,
            LaborCostHardware: $scope.LaborCostHardware,
            LaborCostSoftwareware: $scope.LaborCostSoftwareware,
            DealerDiscount: $scope.DealerDiscount,
            DealerDiscountType: $scope.DealerDiscountType,
            MaximumPrice: $scope.MaximumPrice,
            MinimumPrice: $scope.MinimumPrice,
            CreatedBy: parameter.SysUserID,
            UpdatedBy: parameter.SysUserID
        }

        return ProductLaborCostsModel;
    }

    $scope.getNormalProductLaborCosts = function () {                
        $scope.ProductSizeID = $scope.normalDefaltSizeID;
        $scope.DefaltSize = $scope.normalDefaltSize;
        $scope.DisplaySizeText = $scope.normalDisplaySizeText;
        $scope.LaborCostHardware = $("#txtNormalLaborCostHardware").data("kendoNumericTextBox").value();
        $scope.LaborCostSoftwareware = $("#txtNormalLaborCostSoftware").data("kendoNumericTextBox").value();
        $scope.DealerDiscount = $("#txtNormalDealerDiscount").data("kendoNumericTextBox").value();        
        $scope.DealerDiscountType = DEALER_DISCOUNT_TYPE.Discount;
        $scope.MaximumPrice = 2500.00;
        $scope.MinimumPrice = $("#txtNormalMinimumPrice").data("kendoNumericTextBox").value();

        var ProductLaborCostsModel =
        {
            ID: $scope.normalProductLaborCostsID,
            ProductID: $scope.productID,
            ProductSizeID: $scope.ProductSizeID,
            DefaltSize: $scope.DefaltSize,
            DisplaySizeText: $scope.DisplaySizeText,
            LaborCostHardware: $scope.LaborCostHardware,
            LaborCostSoftwareware: $scope.LaborCostSoftwareware,
            DealerDiscount: $scope.DealerDiscount,
            DealerDiscountType: $scope.DealerDiscountType,
            MaximumPrice: $scope.MaximumPrice,
            MinimumPrice: $scope.MinimumPrice,
            CreatedBy: parameter.SysUserID,
            UpdatedBy: parameter.SysUserID
        }

        return ProductLaborCostsModel;
    }
    
    $scope.getLargeProductLaborCosts = function () {        
        $scope.ProductSizeID = $scope.largeDefaltSizeID;
        $scope.DefaltSize = $scope.largeDefaltSize;
        $scope.DisplaySizeText = $scope.largeDisplaySizeText;
        $scope.LaborCostHardware = $("#txtLargeLaborCostHardware").data("kendoNumericTextBox").value();
        $scope.LaborCostSoftwareware = $("#txtLargeLaborCostSoftware").data("kendoNumericTextBox").value();
        $scope.DealerDiscount = $("#txtLargeDealerDiscount").data("kendoNumericTextBox").value();
        $scope.DealerDiscountType = DEALER_DISCOUNT_TYPE.Discount;
        $scope.MaximumPrice = 2500.00;
        $scope.MinimumPrice = $("#txtLargeMinimumPrice").data("kendoNumericTextBox").value();

        var ProductLaborCostsModel =
        {
            ID: $scope.largeProductLaborCostsID,
            ProductID: $scope.productID,
            ProductSizeID: $scope.ProductSizeID,
            DefaltSize: $scope.DefaltSize,
            DisplaySizeText: $scope.DisplaySizeText,
            LaborCostHardware: $scope.LaborCostHardware,
            LaborCostSoftwareware: $scope.LaborCostSoftwareware,
            DealerDiscount: $scope.DealerDiscount,
            DealerDiscountType: $scope.DealerDiscountType,
            MaximumPrice: $scope.MaximumPrice,
            MinimumPrice: $scope.MinimumPrice,
            CreatedBy: parameter.SysUserID,
            UpdatedBy: parameter.SysUserID
        }

        return ProductLaborCostsModel;
    }

    $scope.getExtraLargeProductLaborCosts = function () {        
        $scope.ProductSizeID = $scope.extraLargeDefaltSizeID;
        $scope.DefaltSize = $scope.extraLargeDefaltSize;
        $scope.DisplaySizeText = $scope.extraLargeDisplaySizeText;
        $scope.LaborCostHardware = $("#txtExtraLargeLaborCostHardware").data("kendoNumericTextBox").value();
        $scope.LaborCostSoftwareware = $("#txtExtraLargeLaborCostSoftware").data("kendoNumericTextBox").value();
        $scope.DealerDiscount = $("#txtExtraLargeDealerDiscount").data("kendoNumericTextBox").value();
        $scope.DealerDiscountType = DEALER_DISCOUNT_TYPE.Discount;
        $scope.MaximumPrice = 2500.00;
        $scope.MinimumPrice = $("#txtExtraLargeMinimumPrice").data("kendoNumericTextBox").value();

        var ProductLaborCostsModel =
        {
            ID: $scope.extraLargeProductLaborCostsID,
            ProductID: $scope.productID,
            ProductSizeID: $scope.ProductSizeID,
            DefaltSize: $scope.DefaltSize,
            DisplaySizeText: $scope.DisplaySizeText,
            LaborCostHardware: $scope.LaborCostHardware,
            LaborCostSoftwareware: $scope.LaborCostSoftwareware,
            DealerDiscount: $scope.DealerDiscount,
            DealerDiscountType: $scope.DealerDiscountType,
            MaximumPrice: $scope.MaximumPrice,
            MinimumPrice: $scope.MinimumPrice,
            CreatedBy: parameter.SysUserID,
            UpdatedBy: parameter.SysUserID
        }

        return ProductLaborCostsModel;
    }

    $scope.getAllProductLaborCosts = function () {
        var productLaborCostsList = [];

        productLaborCostsList.push($scope.getSmallProductLaborCosts());
        productLaborCostsList.push($scope.getNormalProductLaborCosts());
        productLaborCostsList.push($scope.getLargeProductLaborCosts());
        productLaborCostsList.push($scope.getExtraLargeProductLaborCosts());

        return productLaborCostsList;
    }

    $scope.onLostFocusSmallMinimumPrice = function () {
        if ($scope.smallDefaltSizeStatus) {
            if ($("#txtSmallMinimumPrice").data("kendoNumericTextBox").value() == null || $("#txtSmallMinimumPrice").data("kendoNumericTextBox").value() < 100.00)
                $("#txtSmallMinimumPrice").data("kendoNumericTextBox").value(100.00);
        }        
    }

    $scope.onLostFocusNormalMinimumPrice = function () {
        if ($("#txtNormalMinimumPrice").data("kendoNumericTextBox").value() == null || $("#txtNormalMinimumPrice").data("kendoNumericTextBox").value() < 100.00)
            $("#txtNormalMinimumPrice").data("kendoNumericTextBox").value(100.00);
    }

    $scope.onLostFocusLargeMinimumPrice = function () {
        if ($("#txtLargeMinimumPrice").data("kendoNumericTextBox").value() == null || $("#txtLargeMinimumPrice").data("kendoNumericTextBox").value() < 100.00)
            $("#txtLargeMinimumPrice").data("kendoNumericTextBox").value(100.00);
    }

    $scope.onLostFocusExtraLargeMinimumPrice = function () {
        if ($scope.extraLargeDefaltSizeStatus) {
            if ($("#txtExtraLargeMinimumPrice").data("kendoNumericTextBox").value() == null || $("#txtExtraLargeMinimumPrice").data("kendoNumericTextBox").value() < 100.00)
                $("#txtExtraLargeMinimumPrice").data("kendoNumericTextBox").value(100.00);
        }        
    }

    function initialVariable() {
        $scope.smallDefaltSize = false;
        $scope.normalDefaltSize = false;
        $scope.largeDefaltSize = false;
        $scope.extraLargeDefaltSize = false;

        $scope.productCode = "";
        $scope.productName = "";
        $scope.productDescription = "";
        $scope.productGroupID = null;
        $scope.productSymptomCode = false;
        $scope.productRepairCode = false;
        $scope.specificCode = "";
        $scope.productStatus = 1;
        $scope.productID = null;
        $scope.productSizeID = null;

        $scope.BundleSoftware = false;
        $scope.RequestSizeOnJob = true;
        $scope.IsHasProductLaborCosts = false;
        $scope.smallProductLaborCostsID = 1;
        $scope.normalProductLaborCostsID = 2;
        $scope.largeProductLaborCostsID = 3;
        $scope.extraLargeProductLaborCostsID = 4;

        $scope.RequireLaborCostSoftwareStar = "";
        $scope.DisabledLaborCostSoftware = true;
        
        //$scope.smallDefaltSizeID = $scope.ProductSizeList[0].ID;
        //$scope.smallDisplaySizeName = $scope.ProductSizeList[0].Name;
        //$scope.smallDisplaySizeText = $scope.ProductSizeList[0].DisplayName;
        //$scope.smallDefaltSize = $scope.ProductSizeList[0].DefaultSize;
        //$scope.smallDefaltSizeStatus = $scope.ProductSizeList[0].Status;                
        $scope.smallLaborCostHardware = 0.00;
        $scope.smallLaborCostSoftware = 0.00;
        $scope.smallDealerDiscount = 0.00;
        $scope.smallMinimumPrice = 0.00;
        $scope.smallMaximumPrice = 2500.00;
        
        //$scope.normalDefaltSizeID = $scope.ProductSizeList[1].ID;
        //$scope.normalDefaltSizeName = $scope.ProductSizeList[1].Name;
        //$scope.normalDisplaySizeText = $scope.ProductSizeList[1].DisplayName;
        //$scope.normalDefaltSize = $scope.ProductSizeList[1].DefaultSize;
        //$scope.normalDefaltSizeStatus = $scope.ProductSizeList[1].Status;        
        $scope.normalLaborCostHardware = 0.00;
        $scope.normalLaborCostSoftware = 0.00;
        $scope.normalDealerDiscount = 0.00;
        $scope.normalMinimumPrice = 0.00;
        $scope.normalMaximumPrice = 2500.00;
                
        //$scope.largeDefaltSizeID = $scope.ProductSizeList[2].ID;
        //$scope.largeDefaltSizeName = $scope.ProductSizeList[2].Name;
        //$scope.largeDisplaySizeText = $scope.ProductSizeList[2].DisplayName;
        //$scope.largeDefaltSize = $scope.ProductSizeList[2].DefaultSize;
        //$scope.largeDefaltSizeStatus = $scope.ProductSizeList[2].Status;       
        $scope.largeLaborCostHardware = 0.00;
        $scope.largeLaborCostSoftware  = 0.00;
        $scope.largeDealerDiscount  = 0.00;
        $scope.largeMinimumPrice = 0.00;
        $scope.largeMaximumPrice = 2500.00;
        
        //$scope.extraLargeDefaltSizeID = $scope.ProductSizeList[3].ID;
        //$scope.extraLargeDefaltSizeName = $scope.ProductSizeList[3].Name;
        //$scope.extraLargeDisplaySizeText = $scope.ProductSizeList[3].DisplayName;
        //$scope.extraLargeDefaltSize = $scope.ProductSizeList[3].DefaultSize;
        //$scope.extraLargeDefaltSizeStatus = $scope.ProductSizeList[3].Status;        
        $scope.extraLargeLaborCostHardware = 0.00;;
        $scope.extraLargeLaborCostSoftware = 0.00;
        $scope.extraLargeDealerDiscount = 0.00;
        $scope.extraLargeMinimumPrice = 0.00;
        $scope.extraLargeMaximumPrice = 2500.00;
        
        $scope.smallDealerDiscountType = DEALER_DISCOUNT_TYPE.Discount;
        $scope.normalDealerDiscountType = DEALER_DISCOUNT_TYPE.Discount;
        $scope.largeDealerDiscountType = DEALER_DISCOUNT_TYPE.Discount;
        $scope.extraLargeDealerDiscountType = DEALER_DISCOUNT_TYPE.Discount;
    }
});

ARSoft_Claim_Web.controller("ProductPmChecklistModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE, ACTION_MODE) {

    var ProductName = parameter.ProductName;

    if (parameter.mode == "AddCreate") {
        $scope.add_pmChecklist_ProductName = ProductName;

    }
    if (parameter.mode == "EditCreate") {
        $scope.edit_pmChecklist_ProductName = ProductName;

        akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'Products/GetChecklistById?Id=' + parameter.dataItem.ID).success(function (response, status, headers, config) {
            if (response.Successfully) {
                console.log(response);
                $scope.edit_pmChecklist_ID = response.Data.ID;
                $scope.edit_pmChecklist_Label = response.Data.Label;

            }
            else {
                alert(response.Message);
            }
            //  console.log(response);
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            // console.log(status);
        });


    }
    $scope.Close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.add_pmChecklist = function () {
        if (!akow_Validate_ValidateInput()) {
            return false;
        }

        var ModelData = {
            Label: $scope.add_pmChecklist_Label,
            ProductID: parameter.ProductID,
            CreatedBy: parameter.SysUserID,
            UpdatedBy: parameter.SysUserID
        };
        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Products/PostChecklist', ModelData).success(function (response, status, headers, config) {
            if (response.Successfully) {
                akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, null, null);
                $modalInstance.dismiss('cancel');
                $scope.RefreshTabCheckList();
            }
            else {
                akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            console.log(status);
        });
    };

    $scope.edit_pmChecklist = function () {
        if (!akow_Validate_ValidateInput()) {
            return false;
        }

        var ModelData = {
            ID: $scope.edit_pmChecklist_ID,
            Label: $scope.edit_pmChecklist_Label,
            ProductID: parameter.ProductID,
            CreatedBy: parameter.SysUserID,
            UpdatedBy: parameter.SysUserID
        };
        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Products/PutChecklist', ModelData).success(function (response, status, headers, config) {
            if (response.Successfully) {
                akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, null, null);
                $modalInstance.dismiss('cancel');
                $scope.RefreshTabCheckList();

            }
            else {
                akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            console.log(status);
        });
    };

    $scope.RefreshTabCheckList = function () {

        var grid = $("#gridPmChecklist").data("kendoGrid");
        grid.dataSource.query({ page: 1, pageSize: 10, sort: null });
    };


});

