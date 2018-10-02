// *** Create by : Pongthorn Paemanee ***
// *** Create Date : 02/10/2015 17:00  ***

// *** Update by : Wanchai Kodmechai ***
// *** Update Date : 02/20/2015 11:26  ***

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

        //ddl  
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLDepartment').success(function (result) {
            if (result != null) {
                $scope.ModelDepartment = result.Data;
            } else {
                $scope.ModelDepartment = null;
            }
        }).error(function (result) {
        });
        
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLSection').success(function (result) {
            if (result != null) {
                $scope.ModelSection = result.Data;
            } else {
                $scope.ModelSection = null;
            }
        }).error(function (result) {
        });

        //akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLSector').success(function (result) {
        //    if (result != null) {
        //        $scope.ModelSection = result.Data;
        //    } else {
        //        $scope.ModelSection = null;
        //    }
        //}).error(function (result) {
        //});
    }

    $scope.searchEmpCode = "";
    $scope.searchDepartmentID = "";
    $scope.searchEmpName = "";
    $scope.searchSectionID = "";

    $scope.sMainID = "";
     
    $scope.getEmployee = function () {

        var grid = $("#gridWebEmployee").data("kendoGrid");
        $scope.IsSearch = true;
        $scope.searchEmpCode = $("#searchEmpCode").val();
        $scope.searchDepartmentID = $("#Department option:selected").val();
        $scope.searchEmpName = $("#searchEmpName").val();
        $scope.searchSectionID = $("#Section option:selected").val();

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
                    kendo.ui.progress($("#gridWebEmployee"), false);

                    var mEmployee = {
                        Code: $scope.searchEmpCode,
                        Name: $scope.searchEmpName,
                        DepOrgID: $scope.searchDepartmentID,
                        SecOrgID: $scope.searchSectionID,
                        IsSearch: $scope.IsSearch
                    };

                    var sortField = '';
                    if (e.data.sort != null) {
                        if (e.data.sort[0] != null) {
                            sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                        }
                    }

                    akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Employees/GetEmployeesAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(mEmployee)).success(function (response, status, headers, config) {
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
                width: "4%",
                headerAttributes:{ style: "text-align:center;" },
                headerTemplate: "<input type='checkbox' id='chkHeadGrid' class='chkHeadGrid' ng-model='dataItem.selectedAll' ng-click='checkAll(dataItem)'/>",
                attributes: { style: "text-align:center;" },
                template: "<input type='checkbox' class='chkGrid' ng-model='dataItem.selectedItem' ng-true-value='true' ng-false-value='false' ng-checked='dataItem.selectedItem==true' name='selectedDetail'/>",
                sortable: false
            },
        {
            field: "Code",
            title: "รหัส",
            width: "12%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:center;" }
        }, {
            field: "Name",
            title: "ชื่อ-นามสกุล",
            width: "20%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left;" }
        }, {
            field: "PosShortName",
            title: "ตำแหน่ง",
            width: "10%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left;" }
        }, {
            field: "SecOrgShortName",
            title: "สังกัด",
            width: "15%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left;" }
        }, {
            field: "Email",
            title: "อีเมล์",
            width: "15%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left;" }
        }, {
            field: "Mobile",
            title: "โทรศัพท์มือถือ",
            width: "15%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left;" }
        }, {
            field: "StatusName",
            title: "สถานะ",
            width: "10%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left;" }
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
        //    width: "85px",
        //    template: "<button class='btn btn-primary akow-viewbutton' ng-click='View(dataItem)'><i class='fa fa-eye'></i>&nbsp;View</button>",
        //    headerAttributes: { style: "text-align:center;" },
        //    attributes: { style: "text-align:center;" }
        //}, {
        //    title: "Edit",
        //    width: "85px",
        //    template: "<button class='btn btn-primary akow-editbutton' ng-click='Edit(dataItem)'><i class='fa fa-edit'></i>&nbsp;Edit</button>",
        //    headerAttributes: { style: "text-align:center;" },
        //    attributes: { style: "text-align:center;" }
        //}, {
        //    title: "Delete",
        //    width: "95px",
        //    template: "<button class='btn btn-danger akow-deletebutton' ng-click='deleteDetails(dataItem)'><i class='fa fa-trash'></i>&nbsp;Delete</button>",
        //    headerAttributes: { style: "text-align:center;" },
        //    attributes: { style: "text-align:center;" }
        //}
        ]
        , dataBound: function (dataItem) {
            akow_Authentication_CheckPermission($http);
        }
    };

    $scope.deleteDetails = function (dataItem) {

        $scope.sMainID = dataItem.ID;
        akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูล : ' + dataItem.Code + ', ' + dataItem.Name + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.deleteEmp($scope.sMainID, dataItem); }, null);

        return false;
    }

    $scope.checkAll = function (dataItem) {
        var grid = $("#gridWebEmployee").data("kendoGrid");

        var listOfData = grid.dataSource.data();
        for (var i = 0; i < listOfData.length; i++) {
            listOfData[i].selectedItem = dataItem.selectedAll;
        }
    };

    $scope.modalDelSelected = function () {
        var grid = $("#gridWebEmployee").data("kendoGrid");

        $scope.sMainID = "";
        $scope.delSelected = "";
        var listOfData = grid.dataSource.data();
        for (var i = 0; i < listOfData.length; i++) {
            if (listOfData[i].selectedItem) {
                $scope.sMainID += listOfData[i].ID + ",";
                $scope.delSelected += listOfData[i].Code + ", ";
            }
        }

        if ($scope.sMainID == "") {
            akow_Messagebox_Msgbox('กรุณาเลือกรายการที่จะลบก่อน', MESSAGE_BOX_TITLE.WARNING, BUTTON_MODE.OK, ICONS_MODE.WARNING, function () { null }, null);
            return false;
        }

        $scope.delSelected = $scope.delSelected.substring(0, $scope.delSelected.length - 2);
        $scope.sMainID = $scope.sMainID.substring(0, $scope.sMainID.length - 1);

        var dataItem = {
            ID: null,
            Code: "111",
            Name: "Name",
            FirstName: "",
            LastName: null,
            NickName: null,
            PosShortName: null,
            StrID: $scope.sMainID
        };
        
        akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูล ' + $scope.delSelected + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.deleteEmp($scope.sMainID, dataItem); }, null);

        return false;
    };
    
    $scope.deleteEmp = function (parID, dataItem) {

        var EmpData = {
            ID: dataItem.ID,
            Code: dataItem.Code,
            Name: dataItem.Name,
            FirstName: dataItem.FirstName,
            LastName: dataItem.LastName,
            NickName: dataItem.NickName,
            PosShortName: dataItem.PosShortName,
            StrID: dataItem.StrID
        };

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Employees/Delete?sid=' + parID, EmpData).success(function (response, status, headers, config) {
            if (response.Successfully) {
                akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, function () { $scope.getEmployee(); }, null);
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
    
    $scope.Add = function () {
        openLoadingProgress();
        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
					+ '/Employees/EmployeesModalAdd',
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
						    $scope.getEmployee();
						});
    };

    $scope.View = function (dataItem) {
        openLoadingProgress();
        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
        			+ '/Employees/EmployeesModalView',
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
        				    // 
        				});
    };

    $scope.Edit = function (dataItem) {
        openLoadingProgress();
        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
        			+ '/Employees/EmployeesModalEdit',
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
        				    $scope.getEmployee();
        				});
    };
});

ARSoft_Claim_Web.controller("MasEmployeeModalCtrl", function ($scope, $http, config, $modalInstance, parameter, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE, ACTION_MODE) {
    
    $scope.SysUserID = parameter.SysUserID;

    if (parameter.mode == "AddCreate") {

        $scope.initial = function () {
            akow_Authentication_CheckPermission($http);

            //$scope.Initial_LoadDropdownList();

            closeLoadingProgress();
        }       
        
        //CompanyName
        //?Id=' + parameter.dataItem.ID
      
        //akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetEmpById').success(function (result) {
        //    if (result != null) {
        //        $scope.CompanyName = result.Data;
        //    } else {
        //        $scope.CompanyName = null;
        //    }
        //}).error(function (result) {
        //});

      
        //ddl
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLEmpTitle').success(function (result) {
            if (result != null) {
                $scope.ModelTitleAdd = result.Data;
            } else {
                $scope.ModelTitleAdd = null;
            }
        }).error(function (result) {
        });

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLPosition').success(function (result) {
            if (result != null) {
                $scope.PositionAdd = result.Data;
            } else {
                $scope.PositionAdd = null;
            }
        }).error(function (result) {
        });
        
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLDepartment').success(function (result) {
            if (result != null) {
                $scope.DepartmentAdd = result.Data; 
            } else {
                $scope.DepartmentAdd = null;
            }
        }).error(function (result) {
        }); 
        
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLSection').success(function (result) {
            if (result != null) {
                $scope.SectionAdd = result.Data;
            } else {
                $scope.SectionAdd = null;
            }
        }).error(function (result) {
        });

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLSector').success(function (result) {
            if (result != null) {
                $scope.SectorAdd = result.Data;
            } else {
                $scope.SectorAdd = null;
            }
        }).error(function (result) {
        });
        
        //$scope.Initial_LoadDropdownList = function () {
        //    $q.all(
        //            [
        //                $http.get(WebMvcUrl + 'Employees/GetOrganization'),
        //                $http.get(WebMvcUrl + 'Employees/GetDDLDepartment'),
        //                $http.get(WebMvcUrl + 'Employees/GetDDLSection'),
        //                $http.get(WebMvcUrl + 'Employees/GetDDLSector')
        //            ]
        //        ).then(function (resultQuery) {
        //            $scope.CompOrgIDAdd = resultQuery[0].data.Data.ID;
        //            $scope.DepartmentAdd = resultQuery[1].data.Data;
        //            $scope.SectionAdd = resultQuery[2].data.Data;
        //            $scope.SectorAdd = resultQuery[3].data.Data;

        //            closeLoadingProgress();
        //        }
        //        );
        //};

       // $http.get(WebMvcUrl + 'Employees/GetDDLDepartment').success(function (result) {
       //  //   console.log(result.Data);
       //     $scope.DepartmentAdd = result.Data;
       // }).error(function (result) {
       //     console.log(result);
       // });

       // $http.get(WebMvcUrl + 'Employees/GetDDLSection').success(function (result) {
       ////     console.log(result.Data);
       //     $scope.SectionAdd = result.Data;
       // }).error(function (result) {
       //     console.log(result);
       // });

       // $http.get(WebMvcUrl + 'Employees/GetDDLSector').success(function (result) {
       ////     console.log(result.Data);
       //     $scope.SectorAdd = result.Data;
       // }).error(function (result) {
       //     console.log(result);
       // });

        //$scope.treeOptions = {
        //    dataSource: AddBuData(),
        //    checkboxes: {
        //        template: "<input type='checkbox' ng-model='dataItem.Checked' />"
        //    }
        //};
        
        //function AddBuData() {
        //    $scope.treeData = new kendo.data.HierarchicalDataSource(
        //        {
        //            transport: {
        //                read: function (options) {
        //                    $http.get('http://localhost:17655/Api/Employees/GetBuByEmpId?empId=&action=' + ACTION_MODE.Add).success(function (response, status, headers, config) {
        //                        console.log(response);

        //                        options.success(response);
        //                    }).error(function (response, status, headers, config) {
        //                        options.error(status);
        //                    });
        //                }

        //            }

        //            , schema: {
        //                model: {
        //                    text: "Text",
        //                    children: "Items",
        //                    checked: "Checked",
        //                    id: "ID"
        //                }
        //            }

        //        });

        //    return $scope.treeData;
        //}

        $scope.Close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.addEmployee = function () {

            if (!akow_Validate_ValidateInput()) {
                return false;
            }
            
            $scope.sAddBuID = "";
            //var treeview = $("#kendoTreeDisplay").data("kendoTreeView");
            //treeview.expand(".k-item");
            //gatherStates(treeview.dataSource.view());

            //function gatherStates(nodes) {
            //    for (var i = 0; i < nodes.length; i++) {
            //        if (nodes[i].Checked) {
            //            $scope.sAddBuID += nodes[i].ID + ",";
            //        }

            //        if (nodes[i].hasChildren) {
            //            gatherStates(nodes[i].children.view());
            //        }
            //    }
            //}
            //$scope.sAddBuID = $scope.sAddBuID.substring(0, $scope.sAddBuID.length - 1);

            var rbtStatus = $('input[type=radio][name=rbtStatusGroup]:checked').val();
            var ddlEmpTitle = $("#AddEmpTitle option:selected").val();
            var ddlPosition = $("#AddPosition option:selected").val();
            var ddlDepartment = $("#AddDepartment option:selected").val();
            var ddlSection = $("#AddSection option:selected").val();
            var ddlSector = $("#AddSector option:selected").val();
            
            var EmpData = {
                ID: 0,
                Code: $("#addEmpCode").val(),  // $("#addEmpCode").val().replace(/_/g, ""),
                TitleID: ddlEmpTitle,
                FirstName: $("#addEmpFirstName").val(),
                LastName: $("#addEmpLastName").val(),
                NickName: $("#addEmpNickName").val(),
                Email: $("#addEmail").val(),
                Mobile: $("#addMobile").val(),
                Phone: $("#addPhone").val(),
                ExtensionNumber: $("#addExtPhone").val(),
                PositionID: ddlPosition,
                Status: rbtStatus,
                CreatedBy: parameter.SysUserID,
                UpdatedBy: parameter.SysUserID,
                CompOrgID: $scope.CompOrgIDAdd,
                DepOrgID: ddlDepartment,
                SecOrgID: ddlSection,
                SectorOrgID: ddlSector,
                StrBuID: $scope.sAddBuID
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Employees/Post', EmpData).success(function (response, status, headers, config) {
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
        
        $scope.initial = function () {
            akow_Authentication_DisableAll($http);
        }

        //ddl
        
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLEmpTitle').success(function (result) {
            if (result != null) {
                $scope.ModelTitleView = result.Data;
            } else {
                $scope.ModelTitleView = null;
            }
        }).error(function (result) {
        });

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLDepartment').success(function (result) {
            if (result != null) {
                $scope.DepartmentView = result.Data;
            } else {
                $scope.DepartmentView = null;
            }
        }).error(function (result) {
        });

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLSection').success(function (result) {
            if (result != null) {
                $scope.SectionView = result.Data;
            } else {
                $scope.SectionView = null;
            }
        }).error(function (result) {
        });

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLSector').success(function (result) {
            if (result != null) {
                $scope.SectorView = result.Data;
            } else {
                $scope.SectorView = null;
            }
        }).error(function (result) {
        });

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLPosition').success(function (result) {
            if (result != null) {
                $scope.PositionView = result.Data;
            } else {
                $scope.PositionView = null;
            }
        }).error(function (result) {
        });


        $scope.treeOptions = {
            dataSource: ViewBuData()
            //checkboxes: {
            //    template: "<input type='checkbox' ng-model='dataItem.Checked' />"
            //}
        };

        function ViewBuData() {
            $scope.treeData = new kendo.data.HierarchicalDataSource(
                {
                    transport: {
                        read: function (options) {
                            akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'Employees/GetBuByEmpId?empId=' + parameter.dataItem.ID + '&action=' + ACTION_MODE.View).success(function (response, status, headers, config) {
                                if (response.Successfully) {
                                    options.success(response.Data);
                                }
                                else {
                                    alert(response.Message);
                                }
                                console.log(response);
                            }).error(function (response, status, headers, config) {
                                alert(response.Message);
                                console.log(status);
                            });
                        }

                    }

                    , schema: {
                        model: {
                            text: "Text",
                            children: "Items",
                            checked: "Checked",
                            id: "ID"
                        }
                    }

                });

            return $scope.treeData;
        }

        $scope.treeOptions1 = {
            dataSource: ViewBuData1()
        };

        function ViewBuData1() {
            $scope.treeData = new kendo.data.HierarchicalDataSource(
                {
                    transport: {
                        read: function (options) {
                            akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'Employees/GetBranchServicesByID?empId=' + parameter.dataItem.ID + '&action=' + ACTION_MODE.View).success(function (response, status, headers, config) {
                                if (response.Successfully) {
                                    options.success(response.Data.treeNode1);
                                }
                                else {
                                    alert(response.Message);
                                }
                                console.log(response);
                            }).error(function (response, status, headers, config) {
                                alert(response.Message);
                                console.log(status);
                            });
                        }
                    }

                    , schema: {
                        model: {
                            text: "Text",
                            children: "Items",
                            checked: "Checked",
                            id: "ID"
                        }
                    }
                });

            return $scope.treeData;
        }

        $scope.treeOptions2 = {
            dataSource: ViewBuData2()
        };

        function ViewBuData2() {
            $scope.treeData = new kendo.data.HierarchicalDataSource(
                {
                    transport: {
                        read: function (options) {
                            akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'Employees/GetBranchServicesByID?empId=' + parameter.dataItem.ID + '&action=' + ACTION_MODE.View).success(function (response, status, headers, config) {
                                if (response.Successfully) {
                                    options.success(response.Data.treeNode2);
                                }
                                else {
                                    alert(response.Message);
                                }
                                console.log(response);
                            }).error(function (response, status, headers, config) {
                                alert(response.Message);
                                console.log(status);
                            });
                        }
                    }

                    , schema: {
                        model: {
                            text: "Text",
                            children: "Items",
                            checked: "Checked",
                            id: "ID"
                        }
                    }
                });

            return $scope.treeData;
        }

        $scope.Close = function () {
            akow_Authentication_EnableAll($http);
            $modalInstance.dismiss('cancel');
        };

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetEmpById?Id=' + parameter.dataItem.ID).success(function (response, status, headers, config) {
            if (response.Successfully) {
                $scope.viewID = response.Data.ID;
                $scope.viewCode = response.Data.Code;
                $scope.viewFirstName = response.Data.FirstName;
                $scope.viewLastName = response.Data.LastName;
                $scope.viewNickName = response.Data.NickName;
                $scope.viewEmail = response.Data.Email;
                $scope.viewMobile = response.Data.Mobile;
                $scope.viewPhone = response.Data.Phone;
                $scope.viewExtPhone = response.Data.ExtensionNumber;
                $scope.viewStatus = response.Data.Status;
                $scope.viewStatusName = response.Data.StatusName;

                $("#ViewEmpTitle").val(response.Data.TitleID);
                $("#ViewPosition").val(response.Data.PositionID);
                $("#ViewDepartment").val(response.Data.DepOrgID);
                $("#ViewSection").val(response.Data.SecOrgID);
                $("#ViewSector").val(response.Data.SectorOrgID);
                          
                //$scope.ViewEmpTitle = response.Data.TitleID;

                //$("#ViewEmpTitle").val(response.Data.TitleID);
                ////$("#EditPosition").val(response.Data.PositionID);
                //$scope.ViewDepartment = response.Data.DepOrgID;
                //$scope.ViewSection = response.Data.SecOrgID;
                //$scope.ViewSector = response.Data.SectorOrgID;
                //$scope.ViewCompOrgID = response.Data.CompOrgID;
                //$scope.ViewPosition = response.Data.PositionID;

            }
            else {
                alert(response.Message);
            }
            console.log(response);
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            console.log(status);
        });

    }

    if (parameter.mode == "EditCreate") {

        $scope.initial = function () {
            akow_Authentication_CheckPermission($http);

            //$scope.Initial_LoadDropdownList();
        }

        //ddl
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLEmpTitle').success(function (result) {
            if (result != null) {
                $scope.ModelTitleEdit = result.Data;
            } else {
                $scope.ModelTitleEdit = null;
            }
        }).error(function (result) {
        });

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLDepartment').success(function (result) {
            if (result != null) {
                $scope.DepartmentEdit = result.Data;
            } else {
                $scope.DepartmentEdit = null;
            }
        }).error(function (result) {
        });

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLSection').success(function (result) {
            if (result != null) {
                $scope.SectionEdit = result.Data;
            } else {
                $scope.SectionEdit = null;
            }
        }).error(function (result) {
        });

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLSector').success(function (result) {
            if (result != null) {
                $scope.SectorEdit = result.Data;
            } else {
                $scope.SectorEdit = null;
            }
        }).error(function (result) {
        });

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetDDLPosition').success(function (result) {
            if (result != null) {
                $scope.PositionEdit = result.Data;
            } else {
                $scope.PositionEdit = null;
            }
        }).error(function (result) {
        });

        //$scope.Initial_LoadDropdownList = function () {
        //    $q.all(
        //            [
        //                $http.get(WebMvcUrl + 'Employees/GetDDLDepartment'),
        //                $http.get(WebMvcUrl + 'Employees/GetDDLSection'),
        //                $http.get(WebMvcUrl + 'Employees/GetDDLSector')
        //            ]
        //        ).then(function (resultQuery) {
        //            $scope.DepartmentEdit = resultQuery[0].data.Data;
        //            $scope.SectionEdit = resultQuery[1].data.Data;
        //            $scope.SectorEdit = resultQuery[2].data.Data;
        //        }
        //        );
        //};

        //$http.get(WebMvcUrl + 'Employees/GetDDLDepartment').success(function (result) {
        //   // console.log(result.Data);
        //    $scope.DepartmentEdit = result.Data;
        //}).error(function (result) {
        //    console.log(result);
        //});

        //$http.get(WebMvcUrl + 'Employees/GetDDLSection').success(function (result) {
        //   // console.log(result.Data);
        //    $scope.SectionEdit = result.Data;
        //}).error(function (result) {
        //    console.log(result);
        //});

        //$http.get(WebMvcUrl + 'Employees/GetDDLSector').success(function (result) {
        // //   console.log(result.Data);
        //    $scope.SectorEdit = result.Data;
        //}).error(function (result) {
        //    console.log(result);
        //});

        $scope.treeOptions = {
            dataSource: EditBuData(),
            checkboxes: {
                template: "<input type='checkbox' ng-model='dataItem.Checked' />"
            }
        };
        
        function EditBuData() {
            $scope.treeData = new kendo.data.HierarchicalDataSource(
                {
                    transport: {
                        read: function (options) {
                            akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'Employees/GetBuByEmpId?empId=' + parameter.dataItem.ID + '&action=' + ACTION_MODE.Edit).success(function (response, status, headers, config) {
                                if (response.Successfully) {
                                    options.success(response.Data);
                                }
                                else {
                                    alert(response.Message);
                                }
                                console.log(response);
                            }).error(function (response, status, headers, config) {
                                alert(response.Message);
                                console.log(status);
                            });
                        }
                    }

                    , schema: {
                        model: {
                            text: "Text",
                            children: "Items",
                            checked: "Checked",
                            id: "ID"
                        }
                    }

                });

            return $scope.treeData;
        }

        $scope.treeOptions1 = {            
            dataSource: EditBuData1(),
            checkboxes: {
                template: "<input type='checkbox' ng-model='dataItem.Checked' />",
                checkChildren: true
            },
            check: onCheckTreeBranch1
        };

        function EditBuData1() {
            $scope.treeData = new kendo.data.HierarchicalDataSource(
                {
                    transport: {
                        read: function (options) {
                            akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'Employees/GetBranchServicesByID?empId=' + parameter.dataItem.ID + '&action=' + ACTION_MODE.Edit).success(function (response, status, headers, config) {
                                if (response.Successfully) {
                                    options.success(response.Data.treeNode1);
                                }
                                else {
                                    alert(response.Message);
                                }
                                console.log(response);
                            }).error(function (response, status, headers, config) {
                                alert(response.Message);
                                console.log(status);
                            });
                        }
                    }

                    , schema: {
                        model: {
                            text: "Text",
                            children: "Items",
                            checked: "Checked",
                            id: "ID"
                        }
                    }
                });

            return $scope.treeData;
        }

        $scope.treeOptions2 = {
            dataSource: EditBuData2(),
            checkboxes: {
                template: "<input type='checkbox' ng-model='dataItem.Checked' />",
                checkChildren: true
            },
            check: onCheckTreeBranch2
        };

        function EditBuData2() {
            $scope.treeData = new kendo.data.HierarchicalDataSource(
                {
                    transport: {
                        read: function (options) {
                            akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'Employees/GetBranchServicesByID?empId=' + parameter.dataItem.ID + '&action=' + ACTION_MODE.Edit).success(function (response, status, headers, config) {
                                if (response.Successfully) {
                                    options.success(response.Data.treeNode2);
                                }
                                else {
                                    alert(response.Message);
                                }
                                console.log(response);
                            }).error(function (response, status, headers, config) {
                                alert(response.Message);
                                console.log(status);
                            });
                        }
                    }

                    , schema: {
                        model: {
                            text: "Text",
                            children: "Items",
                            checked: "Checked",
                            id: "ID"
                        }
                    }
                });

            return $scope.treeData;
        }
        
        $scope.Close = function () {
            $modalInstance.dismiss('cancel');
        };

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Employees/GetEmpById?Id=' + parameter.dataItem.ID).success(function (response, status, headers, config) {
            if (response.Successfully) {
                $scope.editID = response.Data.ID;
                $scope.editCode = response.Data.Code;
                $scope.editFirstName = response.Data.FirstName;
                $scope.editLastName = response.Data.LastName;
                $scope.editNickName = response.Data.NickName;
                $scope.editEmail = response.Data.Email;
                $scope.editMobile = response.Data.Mobile;
                $scope.editPhone = response.Data.Phone;
                $scope.editExtPhone = response.Data.ExtensionNumber;
                $scope.editStatus = response.Data.Status;
                $scope.editStatusName = response.Data.StatusName;
                
                $("#EditEmpTitle").val(response.Data.TitleID);
                $("#EditPosition").val(response.Data.PositionID);
                $scope.EditDepartment = response.Data.DepOrgID;
                $scope.EditSection = response.Data.SecOrgID;
                $scope.EditSector = response.Data.SectorOrgID;
                $scope.editCompOrgID = response.Data.CompOrgID;
            }
            else {
                alert(response.Message);
            }
            console.log(response);
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            console.log(status);
        });
                                
        $scope.editEmployee = function () {

            if (!akow_Validate_ValidateInput()) {
                return false;
            }

            $scope.sEditBuID = "";
            //var treeview = $("#kendoTreeDisplay").data("kendoTreeView");
            //treeview.expand(".k-item");
            //gatherStates(treeview.dataSource.view());

            //function gatherStates(nodes) {
            //    for (var i = 0; i < nodes.length; i++) {
            //        if (nodes[i].Checked) {
            //            $scope.sEditBuID += nodes[i].ID + ",";
            //        }

            //        if (nodes[i].hasChildren) {
            //            gatherStates(nodes[i].children.view());
            //        }
            //    }
            //}

            //$scope.sEditBuID = $scope.sEditBuID.substring(0, $scope.sEditBuID.length - 1);

            $scope.sEditBuID1 = $scope.getBranchServices("#kendoTreeDisplay1");
            $scope.sEditBuID2 = $scope.getBranchServices("#kendoTreeDisplay2");
            $scope.sEditBuID = $scope.sEditBuID1;
            if ($scope.sEditBuID2 != "") {
                $scope.sEditBuID += $scope.sEditBuID2.substring(0, $scope.sEditBuID2.length - 1);
            } else {
                $scope.sEditBuID = $scope.sEditBuID.substring(0, $scope.sEditBuID.length - 1);
            }
            
            var rbtStatus = $('input[type=radio][name=rbtStatusGroup]:checked').val();
            var ddlEmpTitle = $("#EditEmpTitle option:selected").val();
            var ddlPosition = $("#EditPosition option:selected").val();
            var ddlDepartment = $("#EditDepartment option:selected").val();
            var ddlSection = $("#EditSection option:selected").val();
            var ddlSector = $("#EditSector option:selected").val();

            var EmpData = {
                ID: parameter.dataItem.ID,
                Code: $("#editEmpCode").val(),
                TitleID: ddlEmpTitle,
                FirstName: $("#editEmpFirstName").val(),
                LastName: $("#editEmpLastName").val(),
                NickName: $("#editEmpNickName").val(),
                Email: $("#editEmail").val(),
                Mobile: $("#editMobile").val(),
                Phone: $("#editPhone").val(),
                ExtensionNumber: $("#editExtPhone").val(),
                PositionID: ddlPosition,
                Status: rbtStatus,
                CreatedBy: parameter.SysUserID,
                UpdatedBy: parameter.SysUserID,
                CompOrgID: $scope.editCompOrgID,
                DepOrgID: ddlDepartment,
                SecOrgID: ddlSection,
                SectorOrgID: ddlSector,
                StrBuID: $scope.sEditBuID
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Employees/Put', EmpData).success(function (response, status, headers, config) {
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
    }

    $scope.getBranchServices = function (branchName) {
        $scope.sEditBuID = "";
        var treeview = $(branchName).data("kendoTreeView");
        treeview.expand(".k-item");
        gatherStates(treeview.dataSource.view());

        function gatherStates(nodes) {
            for (var i = 0; i < nodes.length; i++) {
                //if (nodes[i].checked) {
                if (nodes[i].Checked) {
                    $scope.sEditBuID += nodes[i].ID + ",";
                }

                if (nodes[i].hasChildren) {
                    gatherStates(nodes[i].children.view());
                }
            }
        }

        return $scope.sEditBuID;
    }

    // function that gathers IDs of checked nodes
    function checkedNodeIds(nodes, checkedNodes) {
        for (var i = 0; i < nodes.length; i++) {
            //if (nodes[i].checked) {                
            if (nodes[i].Checked) {
                checkedNodes.push(nodes[i].ID);
            }

            if (nodes[i].hasChildren) {
                nodes[i].checkChildren = true;
                checkedNodeIds(nodes[i].children.view(), checkedNodes);
            }
        }
    }

    // show checked node IDs on datasource change
    function onCheckTreeBranch1() {
        var checkedNodes = [],
            treeView = $("#kendoTreeDisplay1").data("kendoTreeView");

        checkedNodeIds(treeView.dataSource.view(), checkedNodes);
    }

    function onCheckTreeBranch2() {
        var checkedNodes = [],
            treeView = $("#kendoTreeDisplay2").data("kendoTreeView");

        checkedNodeIds(treeView.dataSource.view(), checkedNodes);
    }

}
);
