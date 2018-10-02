ARSoft_Claim_Web.controller("SearchCustomerModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q) {
    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
    $scope.pageSizes = config.pageSize;
    //$scope.mct_criteria_CustomerTypeID = 1;
    $scope.mct_criteria_CustomerTypeID = parameter.Type;
    $scope.mct_criteria_CustomerJuristicTypeID = parameter.JuristicTypeID;
    $scope.mct_criteria_CustomerID = parameter.CustomerID;
    $scope.mct_criteria_CustomerCode = parameter.CustomerCode;
    $scope.mct_criteria_CustomerName = parameter.CustomerName;

    $scope.mct_criteria_IsProject = false;
    $scope.mct_criteria_IsRetail = false;
    $scope.DisabledProject = false;
    $scope.DisabledRetail = false;

    //if (parameter.FunctionOwner == 'JobOnSite') {
    //    $scope.mct_criteria_CustomerID = parameter.CustomerID;
    //    $scope.mct_criteria_CustomerCode = parameter.CustomerCode;
    //    $scope.mct_criteria_CustomerName = parameter.CustomerName;
    //} else {
    //    $scope.mct_criteria_CustomerID = null;
    //    $scope.mct_criteria_CustomerCode = null;
    //    $scope.mct_criteria_CustomerName = null;
    //}

    $scope.init = function () {
        if ($scope.mct_criteria_CustomerTypeID == 1) {
            $scope.mct_criteria_IsProject = true;
            $scope.DisabledProject = true;
            $scope.DisabledRetail = true;
            $scope.mct_criteria_StrCustomerTypeID = '1';
        } else if ($scope.mct_criteria_CustomerTypeID == 2) {
            $scope.mct_criteria_IsRetail = true;
            $scope.DisabledProject = true;
            $scope.DisabledRetail = true;
            $scope.mct_criteria_StrCustomerTypeID = '2';
        } else {
            $scope.DisabledProject = false;
            $scope.DisabledRetail = false;
            $scope.mct_criteria_StrCustomerTypeID = '';
        }

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
                        kendo.ui.progress($("#gridLOVCustomer"), false);

                        var customerModel = {};
                        if ($scope.IsSearch ||
                            (!$scope.IsSearch && $scope.TempParStored == null)) {
                            customerModel = {
                                CustomerID: $scope.mct_criteria_CustomerID,
                                CustomerCode: $scope.mct_criteria_CustomerCode,
                                CustomerName: $scope.mct_criteria_CustomerName,
                                //CustomerTypeID: $scope.mct_criteria_CustomerTypeID,
                                StrCustomerTypeID: $scope.mct_criteria_StrCustomerTypeID,
                                JuristicTypeID: $scope.mct_criteria_CustomerJuristicTypeID,
                                IsSearch: $scope.IsSearch
                            };
                            $scope.TempParStored = customerModel;
                        }
                        else {
                            customerModel = $scope.TempParStored;
                        }
                        $scope.IsSearch = false;


                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Popup/GetCustomerAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(customerModel))
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
                    width: "5%",
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
                },
                {
                    field: "CustomerCode",
                    title: "รหัสลูกค้า",
                    width: "13%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
                }
                ,
                {
                    field: "CustomerName",
                    title: "ชื่อลูกค้า",
                    width: "25%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" }
                }
                ,
                {
                    title: "ที่อยู่",
                    width: "30%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" },
                    template: "{{dataItem.AddressLineOne}} {{dataItem.AddressLineTwo}} {{dataItem.DistrictName}} {{dataItem.ProvinceName}}"
                }
                ,
                {
                    field: "CustomerTypeName",
                    title: "ประเภท",
                    width: "10%",
                    headerAttributes: { style: "text-align:center;" },
                    attributes: { style: "text-align:left; vertical-align:top;" }
                }
            ]
        };
    };
    
    $scope.getCustomerByCriteria = function () {
        $scope.loading = true;
        $scope.IsSearch = true;

        var criteriaType = '';
        if ($scope.mct_criteria_IsProject) {
            criteriaType = '1';
        }

        if ($scope.mct_criteria_IsRetail) {
            if (criteriaType != '') {
                criteriaType += ',' + '2';
            } else {
                criteriaType = '2';
            }
        }

        $scope.mct_criteria_StrCustomerTypeID = criteriaType;

        var grid = $("#gridLOVCustomer").data("kendoGrid");
        var data = {
            CustomerID: 0,
            CustomerCode: $scope.mct_criteria_CustomerCode,
            CustomerName: $scope.mct_criteria_CustomerName,
            //CustomerTypeID: $scope.mct_criteria_CustomerTypeID,
            StrCustomerTypeID: $scope.mct_criteria_StrCustomerTypeID,
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
        var grid = $("#gridLOVCustomer").data("kendoGrid");
        var selectedRows = grid.select();
        var dataItem = grid.dataItem(selectedRows[0]);
        $modalInstance.close(dataItem);
    }
});