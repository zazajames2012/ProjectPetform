// *** Update by : Pongthorn Paemanee ***
// *** Update Date : 02/10/2015 17:00  ***

var ARSoft_Claim_Web = angular.module("Apps", ['kendo.directives', 'ui.bootstrap'])

ARSoft_Claim_Web.controller('Index', function ($scope, $http, config, $modal, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {

    if ($('#hdUserID').val() != undefined) {
        $scope.SysUserID = $('#hdUserID').val();
    } else {
        $scope.SysUserID = 1;
    }

    $scope.initial = function () {
        akow_Authentication_CheckPermission($http);

        $scope.IsSearch = false;

        $("input.chkRoleName[type=checkbox]").each(function () {
            $(this)[0].checked = true;
            $scope.sRoleID += "'" + $(this).val() + "',";
        });
    }

    $scope.searchUsername = "";
    $scope.sRoleID = "";
    $scope.sUID = "";

    $scope.getSysUsers = function () {
        var grid = $("#gridWebSysUsers").data("kendoGrid");
        $scope.IsSearch = true;
        $scope.sRoleID = "";
        $("input.chkRoleName[type=checkbox]:checked").each(function () {
            $scope.sRoleID += "'" + $(this).val() + "',";
        });

        $scope.sRoleID = $scope.sRoleID.substring(0, $scope.sRoleID.length - 1);
        $scope.searchUsername = $("#searchUsername").val();

        grid.dataSource.query({ page: 1, pageSize: 10, sort: null });
    };

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
            pageSize: 10,
            serverPaging: true,
            serverSorting: true,
            transport: {

                read: function (e) {
                    kendo.ui.progress($("#gridWebSysUsers"), false);

                    var mSysUser = {
                        Username: $scope.searchUsername,
                        StrRoleID: $scope.sRoleID,
                        DisplayName: "",
                        Email: "",
                        IsSearch: $scope.IsSearch
                    };

                    var sortField = '';
                    if (e.data.sort != null) {
                        if (e.data.sort[0] != null) {
                            sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                        }
                    }

                    akow_Authentication_HttpPostL($http, WebApiUrl + 'sysusers/GetSysUserAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(mSysUser)).success(function (response, status, headers, config) {
                        if (response.Successfully) {
                            if (response.Data != '') {
                                e.success(response.Data);
                            }
                            else {
                                e.success();
                            }
                        }
                        else {
                            e.success();
                        }

                        var hgrid = $("#chkHeadGrid").removeAttr('checked');

                    }).error(function (response, status, headers, config) {
                        e.success();
                        alert(response.Message);
                    });
                }
            }
        },
        selectable: "row",
        pageable: {
            pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        },
        sortable: true,
        columns: [
            {
                width: "8%",
                headerTemplate: "<input type='checkbox' id='chkHeadGrid' class='chkHeadGridRoleName text-center' ng-model='dataItem.selectedAll' ng-click='checkAll(dataItem)' />",
                template: "<input type='checkbox' class='chkGridRoleName text-center' ng-model='dataItem.selectedItem' ng-true-value='true' ng-false-value='false' ng-checked='dataItem.selectedItem==true' name='selectedDetail' />",
                sortable: false
            },
        {
            field: "RowNumber",
            title: "No.",
            width: "15%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:center;" },
            sortable: false
        }, {
            field: "Username",
            title: "Username",
            width: "50%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left;" }
        }, {
            field: "DisplayName",
            title: "DisplayName",
            width: "50%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left;" }
        }, {
            field: "Email",
            title: "อีเมล์",
            width: "55%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left;" }
        }, {
            field: "StatusTxt",
            title: "สถานะ",
            width: "30%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:center;" }
        },
        {
            title: "จัดการข้อมูล",
            width: "150px",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:center; vertical-align:top;" },
            template: "<button class='btn btn-primary akow-viewbutton' ng-click='View(dataItem)'><i class='fa fa-eye'></i></button>"
                    + "&nbsp;&nbsp;<button class='btn btn-primary akow-editbutton' ng-click='Edit(dataItem)'><i class='fa fa-pencil'></i></button>"
                    + "&nbsp;&nbsp;<button class='btn btn-danger akow-deletebutton' ng-click='deleteDetails(dataItem)'><i class='fa fa-trash'></i></button>"
        }
        //{
        //    title: "View",
        //    width: "100px",
        //    template: "<button class='btn btn-primary akow-viewbutton' ng-click='View(dataItem)'><i class='fa fa-eye'></i>&nbsp;View</button>",
        //    headerAttributes: { style: "text-align:center;" },
        //    attributes: { style: "text-align:center;" }
        //}, {
        //    title: "Edit",
        //    width: "100px",
        //    template: "<button class='btn btn-primary akow-editbutton' ng-click='Edit(dataItem)'><i class='fa fa-edit'></i>&nbsp;Edit</button>",
        //    headerAttributes: { style: "text-align:center;" },
        //    attributes: { style: "text-align:center;" }
        //}, {
        //    title: "Delete",
        //    width: "100px",
        //    template: "<button class='btn btn-danger akow-deletebutton' ng-click='deleteDetails(dataItem)'><i class='fa fa-trash'></i>&nbsp;Delete</button>",
        //    headerAttributes: { style: "text-align:center;" },
        //    attributes: { style: "text-align:center;" }
        //}
        ]
        , dataBound: function (dataItem) {
            akow_Authentication_CheckPermission($http);
            $scope.IsSearch = false;
        }
    };

    $scope.deleteDetails = function (dataItem) {

        $scope.sUID = dataItem.ID;
        akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูล ' + dataItem.Username + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.deleteSysUser($scope.sUID); }, null);

        return false;
    }

    $scope.checkAll = function (dataItem) {
        var grid = $("#gridWebSysUsers").data("kendoGrid");

        var listOfData = grid.dataSource.data();
        for (var i = 0; i < listOfData.length; i++) {
            listOfData[i].selectedItem = dataItem.selectedAll;
        }
    };

    $(function () {
        $("#tabRole #checkAll").click(function () {
            if ($("#tabRole #checkAll").is(':checked')) {
                $("#tabRole input[type=checkbox]").each(function () {
                    $(this).prop("checked", true);
                });

            } else {
                $("#tabRole input[type=checkbox]").each(function () {
                    $(this).attr("checked", false);
                });
            }
        });
    });

    $scope.modalDelSelected = function () {
        var grid = $("#gridWebSysUsers").data("kendoGrid");

        $scope.sUID = "";
        $scope.delSelectedSysUsername = "";
        var listOfData = grid.dataSource.data();
        for (var i = 0; i < listOfData.length; i++) {
            if (listOfData[i].selectedItem) {
                $scope.sUID += listOfData[i].ID + ",";
                $scope.delSelectedSysUsername += listOfData[i].Username + ", ";
            }
        }

        if ($scope.sUID == "") {
            akow_Messagebox_Msgbox('กรุณาเลือกรายการที่จะลบก่อน', MESSAGE_BOX_TITLE.WARNING, BUTTON_MODE.OK, ICONS_MODE.WARNING, function () { null }, null);
            return false;
        }

        $scope.delSelectedSysUsername = $scope.delSelectedSysUsername.substring(0, $scope.delSelectedSysUsername.length - 2);
        $scope.sUID = $scope.sUID.substring(0, $scope.sUID.length - 1);

        akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูล ' + $scope.delSelectedSysUsername + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.deleteSysUser($scope.sUID); }, null);

        return false;
    };

    $scope.deleteSysUser = function (parUID) {

        akow_Authentication_HttpGetL($http, WebApiUrl + 'SysUsers/Delete?sid=' + parUID).success(function (response, status, headers, config) {
            if (response.Successfully) {
                akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, function () { $scope.getSysUsers(); }, null);
            }
            else {
                akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
            }
            //    console.log(response);
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            console.log(status);
        });
    }

    $scope.Add = function () {
        openLoadingProgress();

        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
					+ '/SysUsers/SysUsersModalAdd',
            controller: 'MasEmployeeModalCtrl',
            size: 'lg',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        id: 0,
                        mode: "AddCreate",
                        SysUserID: $scope.SysUserID
                    };
                }
            }
        });

        modalInstance.result
				.then(
						function () {
						    $scope.init();
						    $scope.clear();
						}, function () {
						    $scope.getSysUsers();
						});
    };

    $scope.View = function (dataItem) {
        openLoadingProgress();

        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
        			+ '/SysUsers/SysUsersModalView',
            controller: 'MasEmployeeModalCtrl',
            size: 'lg',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        id: 0,
                        mode: "ViewCreate",
                        dataItem: dataItem,
                        SysUserID: $scope.SysUserID
                    };
                }
            }
        });

        modalInstance.result
        		.then(
        				function () {
        				    $scope.init();
        				    $scope.clear();
        				}, function () {

        				});
    };

    $scope.Edit = function (dataItem) {
        openLoadingProgress();

        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
        			+ '/SysUsers/SysUsersModalEdit',
            controller: 'MasEmployeeModalCtrl',
            size: 'lg',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        id: 0,
                        mode: "EditCreate",
                        dataItem: dataItem,
                        SysUserID: $scope.SysUserID
                    };
                }
            }
        });

        modalInstance.result
        		.then(
        				function () {
        				    $scope.init();
        				    $scope.clear();
        				}, function () {
        				    $scope.getSysUsers();
        				});
    };
});

ARSoft_Claim_Web.controller("MasEmployeeModalCtrl", function ($scope, $http, config, $modalInstance, parameter, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {

    $scope.SysUserID = parameter.SysUserID;

    if (parameter.mode == "AddCreate") {

        $scope.initial = function () {
            akow_Authentication_CheckPermission($http);
        }

        $scope.Popup = function () {
            var modalInstance = $modal.open({
                templateUrl: WebMvcUrl
                            + '/Popup/SearchEmployeeModal',
                controller: 'SearchEmployeeModalController',
                size: 'lg',
                backdrop: false,
                animation: true,
                resolve: {
                    parameter: function () {
                        return model = {
                        };
                    }
                }
            });

            modalInstance.result
                    .then(
                            function (ret) {
                                $scope.model = ret;
                            }, function () {
                                // 
                            });
        };

        $scope.Close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.addSysUser = function () {

            if (!akow_Validate_ValidateInput()) {
                return false;
            }

            if (!$scope.ValidateAddSysUser()) {
                akow_Messagebox_Msgbox('รหัสผ่าน ไม่ถูกต้อง! กรุณายืนยันอีกครั้ง', MESSAGE_BOX_TITLE.WARNING, BUTTON_MODE.OK, ICONS_MODE.WARNING, function () { null }, null);
                return false;
            }

            var rbtStatus = $('input[type=radio][name=rbtStatusGroup]:checked').val();

            $scope.sAddRoleID = "";

            var ValidateChkAddRole = $("input.chkAddRoleName[type=checkbox]:checked").length;
            if (ValidateChkAddRole < 1) {
                akow_Messagebox_Msgbox('กรุณาเลือก Role ให้กับ User อย่างน้อย 1 Role', MESSAGE_BOX_TITLE.WARNING, BUTTON_MODE.OK, ICONS_MODE.WARNING, function () { null }, null);
                return false;
            }

            $("input.chkAddRoleName[type=checkbox]:checked").each(function () {
                $scope.sAddRoleID += $(this).val() + ",";
            });



            var EmpID = null;
            if ($scope.model == null || $scope.model.ID == null) {
                EmpID = null;
            }
            else {
                EmpID = $scope.model.ID;
            }

            $scope.sAddRoleID = $scope.sAddRoleID.substring(0, $scope.sAddRoleID.length - 1);

            var SysUsersData = {
                ID: 0,
                Username: $("#addUsername").val(),
                Password: $("#addPassword").val(),
                DisplayName: $("#addDisplayName").val(),
                Email: $("#addEmail").val(),
                EmployeeID: EmpID,
                Status: rbtStatus,
                CreatedBy: parameter.SysUserID,
                UpdatedBy: parameter.SysUserID,
                StrRoleID: $scope.sAddRoleID
            };

            akow_Authentication_HttpPostL($http, WebApiUrl + 'sysusers/Post', SysUsersData).success(function (response, status, headers, config) {
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

        $scope.ValidateAddSysUser = function () {

            var passEnter = $("#addPassword").val();
            var confirmEnter = $("#addConfirmPassword").val();
            if (passEnter != confirmEnter) {
                return false;
            }

            return true;
        };

        closeLoadingProgress();

    }

    if (parameter.mode == "ViewCreate") {

        $scope.Popup = function () {
        }

        $scope.initial = function () {
            akow_Authentication_DisableAll($http);
        }

        $scope.Close = function () {
            akow_Authentication_EnableAll($http);
            $modalInstance.dismiss('cancel');
        };

        akow_Authentication_HttpGetL($http, WebApiUrl + 'SysUsers/GetSysUserById?Id=' + parameter.dataItem.ID).success(function (response, status, headers, config) {
            if (response.Successfully) {
                $scope.viewID = response.Data.ID;
                $scope.viewUsername = response.Data.Username;
                $scope.viewDisplayName = response.Data.DisplayName;
                $scope.viewEMP_NAME = response.Data.EMP_NAME;
                $scope.viewEmail = response.Data.Email;
                $scope.viewStatus = response.Data.Status;
                $scope.EmployeeID = response.Data.EmployeeID;

                angular.forEach(response.Data.StrRoleID.split(","), function (value) {
                    $("input.chkViewRoleName[type=checkbox][value=" + value + "]").attr('checked', true);
                }, []);
            }
            else {
                alert(response.Message);
            }
            //  console.log(response);
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            console.log(status);
        });
        closeLoadingProgress();

    }

    if (parameter.mode == "EditCreate") {

        $scope.initial = function () {
            akow_Authentication_CheckPermission($http);
        }

        $scope.Popup = function () {
            var modalInstance = $modal.open({
                templateUrl: WebMvcUrl
                            + '/Popup/SearchEmployeeModal',
                controller: 'SearchEmployeeModalController',
                size: 'lg',
                backdrop: false,
                animation: true,
                resolve: {
                    parameter: function () {
                        return model = {
                        };
                    }
                }
            });

            modalInstance.result
                    .then(
                            function (ret) {
                                $scope.model = ret;
                                $scope.editEMP_NAME = $scope.model.Name;
                                $scope.editEmail = $scope.model.Email;
                                $scope.EmployeeID = $scope.model.ID;
                            }, function () {
                                // 
                            });
        };

        $scope.Close = function () {
            $modalInstance.dismiss('cancel');
        };

        akow_Authentication_HttpGetL($http, WebApiUrl + 'SysUsers/GetSysUserById?Id=' + parameter.dataItem.ID).success(function (response, status, headers, config) {
            if (response.Successfully) {
                $scope.editID = response.Data.ID;
                $scope.editUsername = response.Data.Username;
                $scope.editDisplayName = response.Data.DisplayName;
                $scope.editEMP_NAME = response.Data.EMP_NAME;
                $scope.editEmail = response.Data.Email;
                $scope.editStatus = response.Data.Status;
                $scope.EmployeeID = response.Data.EmployeeID;

                $scope.editUsernameDis = true;
                if (response.Data.EmployeeID != null) {
                    $scope.editEMP_NAMEDis = true;
                    $scope.editPopupEmpDis = true;
                }

                angular.forEach(response.Data.StrRoleID.split(","), function (value) {
                    $("input.chkEditRoleName[type=checkbox][value=" + value + "]").attr('checked', true);
                }, []);
            }
            else {
                alert(response.Message);
            }
            //     console.log(response);
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            console.log(status);
        });

        $scope.editSysUser = function () {

            if (!akow_Validate_ValidateInput()) {
                return false;
            }

            if (!$scope.ValidateEditSysUser()) {
                akow_Messagebox_Msgbox('รหัสผ่าน ไม่ถูกต้อง! กรุณายืนยันอีกครั้ง', MESSAGE_BOX_TITLE.WARNING, BUTTON_MODE.OK, ICONS_MODE.WARNING, function () { null }, null);
                return false;
            }

            var rbtStatus = $('input[type=radio][name=rbtEditStatusGroup]:checked').val();

            var ValidateChkEditRole = $("input.chkEditRoleName[type=checkbox]:checked").length;
            if (ValidateChkEditRole < 1) {
                akow_Messagebox_Msgbox('กรุณาเลือก Role ให้กับ User อย่างน้อย 1 Role', MESSAGE_BOX_TITLE.WARNING, BUTTON_MODE.OK, ICONS_MODE.WARNING, function () { null }, null);
                return false;
            }
            $scope.sEditRoleID = "";
            $("input.chkEditRoleName[type=checkbox]:checked").each(function () {
                $scope.sEditRoleID += $(this).val() + ",";
            });

            $scope.sEditRoleID = $scope.sEditRoleID.substring(0, $scope.sEditRoleID.length - 1);

            var SysUsersData = {
                ID: $scope.editID,
                Username: $("#editUsername").val(),
                Password: $("#editPassword").val(),
                DisplayName: $("#editDisplayName").val(),
                Email: $("#editEmail").val(),
                EmployeeID: $scope.EmployeeID,
                Status: rbtStatus,
                CreatedBy: parameter.SysUserID,
                UpdatedBy: parameter.SysUserID,
                StrRoleID: $scope.sEditRoleID
            };

            akow_Authentication_HttpPostL($http, WebApiUrl + 'sysusers/Put', SysUsersData).success(function (response, status, headers, config) {
                if (response.Successfully) {
                    akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, null, null);
                    $modalInstance.dismiss('cancel');
                }
                else {
                    akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
                }
                console.log(response);

            }).error(function (response, status, headers, config) {
                alert(response.Message);
                console.log(status);
            });
        }

        $scope.ValidateEditSysUser = function () {

            var passEnter = $("#editPassword").val();
            var confirmEnter = $("#editConfirmPassword").val();
            if (passEnter != confirmEnter) {
                return false;
            }

            return true;
        };
        closeLoadingProgress();

    }
});

//ARSoft_Claim_Web.controller("searchEmployeeModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q) {
//    $scope.loading = true;
//    $scope.model =
//        {
//            Page: 1,
//            PageSize: 10,
//            Department: undefined,
//            Section: undefined,
//            Position: undefined
//        };
//    $scope.pages = [];
//    $scope.results = [];
//    $scope.totalRecord = 0;
//    $scope.totalPage = 0;
//    $scope.positions = [];
//    $scope.departments = [];
//    $scope.sections = [];

//    $scope.init = function () {
//        var promise = $scope.getAllDropdown();
//        promise.then(function () {
//            $scope.loading = false;
//        });
//    };
//    $scope.getAllDropdown = function () {
//        var deferred = $q.defer();
//        $q.all(
//            [
//                  $http.get(WebMvcUrl + "Common/GetAllPosition"),
//                  $http.get(WebMvcUrl + "Common/GetAllDepartment"),
//                  $http.get(WebMvcUrl + "Common/GetSectionByDepartment"),
//                  akow_Authentication_HttpPostL($http, WebApiUrl + "Popup/GetEmployeeAll", $scope.model)
//            ]
//            ).then(
//                function (data) {
//                    $scope.positions = data[0].data.Data.list;
//                    $scope.departments = data[1].data.Data.list;
//                    $scope.sections = data[2].data.Data.list;
//                    $scope.results = data[3].data.Data.list;
//                    var newData = new kendo.data.DataSource({
//                        data: $scope.results
//                    });
//                    $scope.grid.setDataSource(newData);
//                    $scope.grid.dataSource.read();
//                    deferred.resolve(data);
//                }

//            );
//        return deferred.promise;
//    };

//    $scope.search = function () {
//        $scope.loading = true;
//        akow_Authentication_HttpPostL($http, WebApiUrl + "Popup/GetEmployeeAll", $scope.model)
//        .success(function (data) {
//            $scope.results = data.Data.list;
//            var newData = new kendo.data.DataSource({
//                data: $scope.results
//            });
//            $scope.grid.setDataSource(newData);
//            $scope.grid.dataSource.read();
//            $scope.loading = false;
//        });
//    };
//    $scope.mainGridOptions = {
//        dataSource: {
//            data: [],
//            pageSize: 10,
//            serverPaging: false,
//            serverSorting: false
//        },
//        sortable: true,
//        pageable: true,
//        columns: [
//            {
//                title: "",
//                width: "10%",
//                headerAttributes: { style: "text-align:center;" },
//                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" },
//                command: {
//                    text: "เลือก", click: function (e) {
//                        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

//                        $modalInstance.close(dataItem);
//                    }
//                }
//            },
//            {
//                field: "Code",
//                title: "รหัสพนักงาน",
//                width: "15%",
//                headerAttributes: { style: "text-align:center;" },
//                attributes: { style: "text-align:center; vertical-align:text-top; font-weight:normal;" }
//            },
//            {
//                field: "Name",
//                title: "ชื่อ-นามสกุล",
//                width: "20%",
//                headerAttributes: { style: "text-align:center;" },
//                attributes: { style: "text-align:left; vertical-align:text-top; font-weight:normal;" }

//            },
//            {
//                field: "Position",
//                title: "ตำแหน่ง",
//                width: "15%",
//                headerAttributes: { style: "text-align:center;" },
//                attributes: { style: "text-align:left; vertical-align:text-top; font-weight:normal;" }
//            },
//            {
//                field: "Section",
//                title: "สังกัด",
//                width: "20%",
//                headerAttributes: { style: "text-align:center;" },
//                attributes: { style: "text-align:left; vertical-align:text-top; font-weight:normal;" }
//            },
//            {
//                field: "Email",
//                title: "อีเมล์",
//                width: "20%",
//                headerAttributes: { style: "text-align:center;" },
//                attributes: { style: "text-align:left; vertical-align:text-top; font-weight:normal;" }
//            }
//        ]
//    };
//    $scope.clear = function () {
//        $modalInstance.dismiss('cancel');
//    };
//});