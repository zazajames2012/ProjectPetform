ARSoft_Claim_Web.controller("SearchEmployeeModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q) {
    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
    $scope.pageSizes = config.pageSize;
    $scope.deptOrgID = parameter.DepOrgID;
    $scope.BuID = parameter.BuID;
    console.log($scope.deptOrgID);
    if ($scope.deptOrgID != null) {
        $scope.DepartDisabled = true;
    }

    //$scope.model =
    //    {
    //        Page: 1,
    //        PageSize: 10,
    //        Code: "",
    //        Name: "",
    //        DepOrgID: $scope.deptOrgID,
    //        SecOrgID: "",
    //        PositionID: "",
    //        BuID: $scope.BuID
    //    };

    $scope.modelCode = "";
    $scope.modelName = "";
    $scope.modelDepOrgID = $scope.deptOrgID;
    $scope.modelSecOrgID = "";
    $scope.modelPositionID = "";
    $scope.modelBuID = $scope.BuID;

    console.log($scope.model);
    $scope.pages = [];
    $scope.results = [];
    $scope.totalRecord = 0;
    $scope.totalPage = 0;
    //$scope.positions = [];   
    //$scope.departments = [];
    //$scope.sections = [];

    $scope.init = function () {
        $scope.loading = true;
        $scope.IsSearch = false;

        $scope.getAllDropdown();
      

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
                        kendo.ui.progress($("#gridLOVEmployee"), false);

                        var empModel = {};
                        if ($scope.IsSearch ||
                            (!$scope.IsSearch && $scope.TempParStored == null)) {
                            empModel = {
                                Code: $scope.modelCode,
                                Name: $scope.modelName,
                                DepOrgID: $scope.modelDepOrgID,
                                SecOrgID: $scope.modelSecOrgID,
                                PositionID: $scope.modelPositionID,
                                BuID: $scope.modelBuID,
                                IsSearch: $scope.IsSearch
                            };
                            $scope.TempParStored = empModel;
                        }
                        else {
                            empModel = $scope.TempParStored;
                        }
                        $scope.IsSearch = false;

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        //akow_Authentication_HttpPostL($http, WebApiUrl + 'Popup/GetEmployeeAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify($scope.model))
                        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Popup/GetEmployeeAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(empModel))
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
            //    title: "เลือก",
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
                field: "Code",
                title: "รหัสพนักงาน",
                width: "15%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
            },
            {
                field: "Name",
                title: "ชื่อ-นามสกุล",
                width: "20%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:text-top; font-weight:normal;" }

            },
            {
                field: "PosName",
                title: "ตำแหน่ง",
                width: "15%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:text-top; font-weight:normal;" }
            },
            {
                field: "SecOrgName",
                title: "แผนก",
                width: "20%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:text-top; font-weight:normal;" }
            },
            {
                field: "Email",
                title: "อีเมล์",
                width: "20%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left; vertical-align:text-top; font-weight:normal;" }
            }
            ]
        };

        $scope.loading = false;
    };


    $scope.getAllDropdown = function () {
        // ddl Position
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Common/GetAllPosition').success(function (response, status, headers, config) {
            if (response.Successfully) {
                $scope.positions = response.Data.list;
            } else {
                $scope.positions = null;

            }
        }).error(function (result) {
            console.log(result);
        });

        // ddl Department
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Common/GetAllDepartment').success(function (response, status, headers, config) {
            if (response.Successfully) {

                $scope.departments = response.Data.list;
            } else {
                $scope.departments = null;

            }
        }).error(function (result) {
            console.log(result);
        });
        // ddl Section
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Common/GetAllSection').success(function (response, status, headers, config) {
            if (response.Successfully) {

                $scope.sections = response.Data;
            } else {
                $scope.sections = null;

            }
        }).error(function (result) {
            console.log(result);
        });
    };

    $scope.search = function () {
        $scope.loading = true;
        $scope.IsSearch = true;
        //$scope.model.IsSearch = $scope.IsSearch;
        console.log($scope.model);
        var grid = $("#gridLOVEmployee").data("kendoGrid");
        
        //grid.dataSource.read($scope.model);
        grid.dataSource.query({ page: 1, pageSize: 10, sort: null });
        $scope.loading = false;

    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.selectRowItem = function () {
        var grid = $("#gridLOVEmployee").data("kendoGrid");
        var selectedRows = grid.select();
        var dataItem = grid.dataItem(selectedRows[0]);
        $modalInstance.close(dataItem);
    }
});