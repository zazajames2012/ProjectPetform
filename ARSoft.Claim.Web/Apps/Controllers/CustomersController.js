// *** Update by : Jirawat Pipatpaisan ***
// *** Update Date : 27/11/2015 13:30  ***

var ARSoft_Claim_Web = angular.module("Apps", ['kendo.directives', 'ui.bootstrap'])

ARSoft_Claim_Web.controller('Index', function ($scope, $http, config, $modal, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {
    
    if ($('#hdUserID').val() != undefined) {
        $scope.SysUserID = $('#hdUserID').val();
    } else {
        $scope.SysUserID = 1;
    }

    $scope.Customer_Initial = function () {
        akow_Authentication_CheckPermission($http);
        $scope.IsDisabled = false;
        $scope.IsSearch = false;      
       
        //$(".chkCusTypeGroup")[0].checked = true;
        //$(".chkCusTypeGroup")[1].checked = true;
        //$scope.sTypeID = "'" + $(".chkCusTypeGroup")[0].value + "','" + $(".chkCusTypeGroup")[1].value + "'"; 
      
        ////get value for dropdown business role
        //akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Customer/GetDDLCustomerType').success(function (resultQuery, status, headers, config) {
       
        //    if (resultQuery.Successfully) {
        //        $scope.DllBusinessRoleModels = resultQuery.Data;
        //    } else {
        //        $scope.DllBusinessRoleModels = null;
        //    }
        //    console.log(resultQuery);
        //}).error(function (result) {
        //    //alert(result.Message)
        //    console.log(result);
        //});

        //$http.get(SAMWebApiUrl + 'Customer/GetDDLCustomerType').success(function (result) {
        //    $scope.CustomerType = result.Data;
        //}).error(function (result) {
        //    console.log(result);
        //}); 
       
        //akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLCustomerType').success(function (result) {
        //    if (result != null) {
        //        $scope.CustomerType = result.Data;
        //    } else {
        //        $scope.CustomerType = null;
        //    }
        //}).error(function (result) {
        //});
        
        var promise = akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLCustomerType'); 
        promise.then(
          function (payload) {
              $scope.CustomerType = payload.data.Data;
          });     

        
        //$("input.chkCusTypeGroup[type=checkbox]:checked").each(function () {
        //    $scope.sTypeID += "'" + $(this).val() + "',";
        //});


        //akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLStatus').success(function (result) {
        //    if (result != null) {
        //        $scope.StatusList = result.Data; 
        //    } else {
        //        $scope.StatusList = null;
        //    }
        //}).error(function (result) {
        //});  
       
        var promise = akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLStatus');  
        promise.then(
          function (payload) {
              $scope.StatusList = payload.data.Data; 
          }); 
    } 

    
    //var $radios = $('input:radio[name=status]');
    //if ($radios.is(':checked') === false) {
    //    $radios.filter('[value=1]').prop('checked', true);
    //}

    $scope.sMainID = "";
   
    $scope.getCustomer = function (IsSearch) { 
     
        $scope.IsSearch = IsSearch;
        $scope.sTypeID = ""; 
       
        $("input.chkCusTypeGroup[type=checkbox]:checked").each(function () {
            $scope.sTypeID += "'" + $(this).val() + "',";
        });

        $scope.sTypeID = $scope.sTypeID.substring(0, $scope.sTypeID.length - 1);      

        var grid = $("#gridWebCustomer").data("kendoGrid");
        grid.dataSource.query({ page: 1, pageSize: 10, sort: null });
    };

    $scope.resetValueCriteria = function () {
        $scope.IsSearch = false;
        $scope.IsNextPage = false;
        $scope.criteria_Code = '';
        $scope.criteria_Name = '';
        $scope.criteria_sTypeID = '';
        $scope.criteria_Status = $('input[name=status]:checked').val();//$('input[type=radio][name=rbtCusStatusGroup]:checked').val();
    }

    $scope.mainGridOptionsCustomer = {
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
                    kendo.ui.progress($("#gridWebCustomer"), false);
                    $scope.criteria_Status = $('input[name=status]:checked').val();//$('input[type=radio][name=rbtCusStatusGroup]:checked').val();

                    if (!$scope.IsSearch) {
                    //    $scope.resetValueCriteria();
                        $scope.IsNextPage = true;
                    } else {
                    //    $scope.criteria_Code = $("#searchCusCode").val();
                    //    $scope.criteria_Name = $("#searchCusName").val();
                    //    $scope.criteria_sTypeID = "";
                    //    $("input.chkCusTypeGroup[type=checkbox]:checked").each(function () {
                    //        $scope.criteria_sTypeID += "'" + $(this).val() + "',";
                    //    });

                        $scope.IsNextPage = false;
                    }
            
                    $scope.criteria_sTypeID = $scope.sTypeID;

                    var mCus = {
                        Code: $scope.criteria_Code,
                        Name: $scope.criteria_Name,
                        strTypeID: $scope.criteria_sTypeID,
                        Status: $scope.criteria_Status,
                        IsSearch: $scope.IsSearch,
                        IsNextPage: $scope.IsNextPage
                    };
                    
                    console.log(mCus);
                    //var mCus = {
                    //    Code: $("#searchCusCode").val(),
                    //    Name: $("#searchCusName").val(),
                    //    strTypeID: $scope.sTypeID,
                    //    Status: $('input[type=radio][name=rbtCusStatusGroup]:checked').val(),
                    //    IsSearch:true
                    //        //$scope.IsSearch
                    //};
                    
                    $scope.IsSearch = false;
                    var sortField = '';
                    if (e.data.sort != null) {
                        if (e.data.sort[0] != null) {
                            sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                        }
                    }

                    akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Customer/GetCustomerAll?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(mCus)).success(function (response, status, headers, config) {
                        
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
                        //$scope.IsSearch = false;
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
            field: "RowNumber",
            title: "ลำดับ",
            width: "15%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:center;" },
            sortable: false
        }, {
            field: "Code",
            title: "รหัสลูกค้า",
            width: "30%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:center;" }
        }, {
            field: "Name",
            title: "ชื่อลูกค้า",
            width: "60%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left;" }
        }, {
            field: "TypeName",
            title: "ประเภท",
            width: "30%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:center;" }
        }, {
            field: "Address",
            title: "ที่อยู่",
            width: "65%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left;" }
        }, {
            field: "StatusName",
            title: "สถานะ",
            width: "22%",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:left;" }
        },
        {
            title: "Manage",
            width: "200px",
            headerAttributes: { style: "text-align:center;" },
            attributes: { style: "text-align:center; vertical-align:top;" },
            template: "<button class='btn btn-primary akow-viewbutton'  ng-click='View(dataItem)'><i class='fa fa-eye'></i></button>"
                    + "&nbsp;&nbsp;<button class='btn btn-primary akow-editbutton' ng-click='Edit(dataItem)'><i class='fa fa-pencil'></i></button>"
                    + "&nbsp;&nbsp;<button class='btn btn-danger akow-deletebutton' ng-click='deleteDetails(dataItem)'><i class='fa fa-trash'></i></button>"
        }]

        //}, {
        //    title: "View",
        //    width: "90px",
        //    template: "<button class='btn btn-primary akow-viewbutton'  ng-click='View(dataItem)'><i class='fa fa-eye'></i>&nbsp;View</button>",
        //    headerAttributes: { style: "text-align:center;" },
        //    attributes: { style: "text-align:center;" }
        //}, {
        //    title: "Edit",
        //    width: "80px",
        //    template: "<button class='btn btn-primary akow-editbutton' ng-click='Edit(dataItem)'><i class='fa fa-edit'></i>&nbsp;Edit</button>",
        //    headerAttributes: { style: "text-align:center;" },
        //    attributes: { style: "text-align:center;" }
        //}, {
        //    title: "Delete",
        //    width: "95px",
        //    template: "<button class='btn btn-danger akow-deletebutton' ng-click='deleteDetails(dataItem)'><i class='fa fa-trash'></i>&nbsp;Delete</button>",
        //    headerAttributes: { style: "text-align:center;" },
        //    attributes: { style: "text-align:center;" }
        //}]
        , dataBound: function (dataItem) {
            akow_Authentication_CheckPermission($http);
            $scope.IsSearch = false;
        }
    };

    $scope.deleteDetails = function (dataItem) {

        $scope.sMainID = dataItem.ID;
        akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูล ' + dataItem.Name + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.deleteCustomer($scope.sMainID, dataItem); }, null);

        return false;
    }

    $scope.deleteCustomer = function (parID, dataItem) {

        var CusData = {
            ID: dataItem.ID,
            Code: dataItem.Code,
            Name: dataItem.Name,
            NameShort: dataItem.NameShort,
            Title: dataItem.Title,
            FirstName: dataItem.FirstName,
            LastName: dataItem.LastName,
            Phone: dataItem.Phone,
            Email: dataItem.Email,
            Remark: dataItem.Remark
        };

        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Customer/Delete?sid=' + parID, CusData).success(function (response, status, headers, config) {
            if (response.Successfully) {
                akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, function () { $scope.getCustomer(true); }, null);
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
        
        $scope.IsDisabled = true;
        openLoadingProgress();

        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
					+ '/Customer/AddCustomersModal',
            controller: 'CustomerModalCtrl',
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
						    $scope.IsDisabled = false;
						    $scope.init();
						    $scope.clear();
						}, function () {
						    $scope.getCustomer(true);
						    $scope.IsDisabled = false;

						});
    };

    $scope.View = function (dataItem) {
        openLoadingProgress();

        var modalInstance = $modal.open({
            templateUrl: WebMvcUrl
        			+ '/Customer/ViewCustomersModal',
            controller: 'CustomerModalCtrl',
            windowClass: 'app-modal-window-customer',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        id: 0,
                        mode: "ViewCreate",
                        Customer_DataItem: dataItem,
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
        			+ '/Customer/EditCustomersModal',
            controller: 'CustomerModalCtrl',
            windowClass: 'app-modal-window-customer',
            backdrop: false,
            animation: true,
            resolve: {
                parameter: function () {
                    return model = {
                        id: 0,
                        mode: "EditCreate",
                        Customer_DataItem: dataItem,
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
        				    $scope.getCustomer(true);
        				});
    };
});

ARSoft_Claim_Web.controller("CustomerModalCtrl", function ($scope, $http, config, $modalInstance, parameter, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE, CUSTOMER_TYPE, CUSTOMER_JURISTIC_TYPE, COLOR_CODE) {

    $scope.CustomerTypeProject = CUSTOMER_TYPE.Project;
    $scope.CustomerTypeRetail = CUSTOMER_TYPE.Product;

    $scope.DATE_FORMAT = config.DATE_FORMAT;
    $scope.SysUserID = parameter.SysUserID;
  
    //DDL Group
    //$http.get(SAMWebApiUrl + 'Customer/GetDDLCustomerGroup').success(function (result) {
    //    $scope.CustomerGroupList = result.Data;
    //}).error(function (result) {
    //    console.log(result);
    //});

    akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLCustomerGroup').success(function (result) {
        if (result != null) {
            $scope.CustomerGroupList = result.Data;
        } else {
            $scope.CustomerGroupList = null;
        }
    }).error(function (result) {
    });

    akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLCustomerType').success(function (result) {
        if (result != null) {
            $scope.CustomerType = result.Data;
        } else {
            $scope.CustomerType = null;
        }
    }).error(function (result) {
    }); 
     
    akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLCusCategory').success(function (result) {
        if (result != null) {
            $scope.CustomerCategoryList = result.Data;
        } else {
            $scope.CustomerCategoryList = null;
        }
    }).error(function (result) {
    });

    if (parameter.mode == "AddCreate") {

        $scope.Customer_Initial = function () {
            akow_Authentication_CheckPermission($http);

            $scope.Customer_AddCustomerType = CUSTOMER_TYPE.Project;
            //$scope.Customer_AddCustomerGroup = CUSTOMER_JURISTIC_TYPE.Organization;
            $scope.Customer_JuristicTypeID = CUSTOMER_JURISTIC_TYPE.Organization;
            $scope.EnableOrg();
            $scope.DisableIndividual();
            $scope.Customer_AddCustomerGroupIndividualDis = true;
            closeLoadingProgress();
        }

        $scope.Customer_Close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.CustomerGroupSelected = function (value) {
            if (value == CUSTOMER_JURISTIC_TYPE.Organization) {
                $scope.EnableOrg();
                $scope.DisableIndividual();
            }
            else {
                $scope.DisableOrg();
                $scope.EnableIndividual();
            }
        }

        $scope.CustomerTypeSelected = function (value) {
            if (value == CUSTOMER_TYPE.Project) {
                $scope.EnableOrg();
                $scope.DisableIndividual();
                $scope.Customer_JuristicTypeID = CUSTOMER_JURISTIC_TYPE.Organization;
                $scope.Customer_AddCustomerGroupIndividualDis = true;
            }
            else {
                $scope.EnableOrg();
                $scope.DisableIndividual();
                $scope.Customer_JuristicTypeID = CUSTOMER_JURISTIC_TYPE.Organization;
                $scope.Customer_AddCustomerGroupIndividualDis = false;
            }
        };

        $scope.EnableOrg = function () {
            $scope.Customer_AddNameDis = false;
            $scope.Customer_AddNameShortDis = false;
            $("#Customer_Category").removeAttr("disabled");

            $("#Customer_AddName").css("background-color", COLOR_CODE.WHITE);

            $scope.Customer_AddNameCss = "akow-require-field akow-control-textbox";
            $scope.Customer_AddNameShortCss = "akow-control-textbox";
            $('#Customer_Category').removeClass('akow-control-dropdownlist-disabled').addClass('akow-control-dropdownlist');
        }

        $scope.DisableOrg = function () {
            $scope.Customer_AddNameDis = true;
            $scope.Customer_AddNameShortDis = true;
            $("#Customer_Category").attr("disabled", "disabled");

            $("#Customer_AddName").css("background-color", COLOR_CODE.WHITE_SMOKE);

            $scope.Customer_AddNameCss = "akow-require-field akow-control-textbox-disabled";
            $scope.Customer_AddNameShortCss = "akow-control-textbox-disabled";
            $('#Customer_Category').removeClass('akow-control-dropdownlist').addClass('akow-control-dropdownlist-disabled');

            $("#Customer_AddName").val("");
            $scope.Customer_AddNameShort = "";
            $("#Customer_Category").val("");
        }

        $scope.EnableIndividual = function () {
            $scope.Customer_AddTitleDis = false;
            $scope.Customer_AddFirstNameDis = false;
            $scope.Customer_AddLastNameDis = false;
            $scope.Customer_AddMemberIDDis = false;
            $scope.Customer_AddRegisterDateDis = false;
            $scope.Customer_AddContactDis = false;

            $("#Customer_AddFirstName").css("background-color", COLOR_CODE.WHITE);
            $("#Customer_AddLastName").css("background-color", COLOR_CODE.WHITE);
            $("#Customer_AddRegisterDate").css("background-color", COLOR_CODE.WHITE);

            $scope.Customer_AddTitleCss = "akow-control-textbox";
            $scope.Customer_AddFirstNameCss = "akow-require-field akow-control-textbox";
            $scope.Customer_AddLastNameCss = "akow-require-field akow-control-textbox";
            $scope.Customer_AddMemberIDCss = "akow-control-textbox";
        }

        $scope.DisableIndividual = function () {
            $scope.Customer_AddTitleDis = true;
            $scope.Customer_AddFirstNameDis = true;
            $scope.Customer_AddLastNameDis = true;
            $scope.Customer_AddMemberIDDis = true;
            $scope.Customer_AddRegisterDateDis = true;
            $scope.Customer_AddContactDis = true;

            $("#Customer_AddFirstName").css("background-color", COLOR_CODE.WHITE_SMOKE);
            $("#Customer_AddLastName").css("background-color", COLOR_CODE.WHITE_SMOKE);
            $("#Customer_AddRegisterDate").css("background-color", COLOR_CODE.WHITE_SMOKE);

            $scope.Customer_AddTitleCss = "akow-control-textbox-disabled";
            $scope.Customer_AddFirstNameCss = "akow-require-field akow-control-textbox-disabled";
            $scope.Customer_AddLastNameCss = "akow-require-field akow-control-textbox-disabled";
            $scope.Customer_AddMemberIDCss = "akow-control-textbox-disabled";

            $scope.Customer_AddTitle = "";
            $("#Customer_AddFirstName").val("");
            $("#Customer_AddLastName").val("");
            $scope.Customer_AddMemberID = "";
            $scope.Customer_AddRegisterDate = "";
            $scope.Customer_AddContact = false;
        }

        $scope.Customer_Add = function () {
           
            if ($scope.Customer_JuristicTypeID == CUSTOMER_JURISTIC_TYPE.Organization) {
                var rejectItem = [];
                rejectItem.push({ Customer_AddFirstName: null });
                rejectItem.push({ Customer_AddLastName: null });
                var originalColor = [];
                originalColor.push({ Customer_AddFirstName: COLOR_CODE.WHITE_SMOKE });
                originalColor.push({ Customer_AddLastName: COLOR_CODE.WHITE_SMOKE });
                originalColor.push({ Customer_AddRegisterDate: COLOR_CODE.WHITE_SMOKE });

                if (!akow_Validate_ValidateInput_ItemCancel(rejectItem, originalColor)) {
                    return false;
                }
            }
            else {
                var rejectItem = [];
                rejectItem.push({ Customer_AddName: null });
                var originalColor = [];
                originalColor.push({ Customer_AddName: COLOR_CODE.WHITE_SMOKE });

                if (!akow_Validate_ValidateInput_ItemCancel(rejectItem, originalColor)) {
                    return false;
                }
            }
            
            var CusData = {
                ID: 0,
                //     Code: $scope.Customer_AddCode,
                Name: $scope.Customer_AddName,
                TaxID: $scope.Customer_AddTaxID,
                TypeID: $scope.Customer_AddCustomerType,
                NameShort: $scope.Customer_AddNameShort,

                //CategoryID: $("#Customer_Category").val(),
                CategoryID: $scope.Customer_Category,

                Title: $scope.Customer_AddTitle,
                FirstName: $scope.Customer_AddFirstName,
                LastName: $scope.Customer_AddLastName,
                MemberID: $scope.Customer_AddMemberID,
                strRegisterDate: $scope.Customer_AddRegisterDate,
                Contact: $scope.Customer_AddContact,
                Status: 1,
                Phone: $scope.Customer_AddPhone,
                Email: $scope.Customer_AddEmail,
                Remark: $scope.Customer_AddRemark,
                GroupID: $scope.Customer_AddCustomerGroup,
                JuristicTypeID: $scope.Customer_JuristicTypeID,
                Mobile: $scope.Customer_AddMobile,
                PhoneOtherOne: $scope.Customer_AddFax,
                Website: $scope.Customer_AddWebSite,
                ReferCode01: $scope.Customer_AddReferCode01,
                CreatedBy: parameter.SysUserID,
                UpdatedBy: parameter.SysUserID
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Customer/Post', CusData).success(function (response, status, headers, config) {
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

        $scope.CustomerID = parameter.Customer_DataItem.ID;

        $scope.Customer_Initial = function () {
            akow_Authentication_DisableAll($http);

            akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLStatus').success(function (result) {
                if (result != null) {
                    $scope.StatusList = result.Data; 
                } else {
                    $scope.StatusList = null;
                }
            }).error(function (result) {
            });  
        }

        $scope.Customer_Close = function () {
            akow_Authentication_EnableAll($http);
            $modalInstance.dismiss('cancel');
        };

        $scope.Customer_OptGridCusContact = {
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
                        kendo.ui.progress($("#Customer_GridCusContact"), false);

                        var mCusContact = {
                            CustomerID: $scope.CustomerID
                        };

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Customer/GetCusContactById?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(mCusContact)).success(function (response, status, headers, config) {
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
                field: "Name",
                title: "ชื่อผู้ติดต่อ",
                width: "60%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }, {
                field: "Phone",
                title: "เบอร์โทรศัพท์",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }, {
                field: "Email",
                title: "อีเมล์",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }, {
                field: "TypeName",
                title: "ประเภทผู้ติดต่อ",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left;" }
            }, {
                field: "StatusName",
                title: "สถานะ",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }]
        , dataBound: function (CusContact_DataItem) {
            akow_Authentication_CheckPermission($http);
        }
        };

        $scope.Customer_OptGridCusLocation = {
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
                        kendo.ui.progress($("#Customer_GridCusLocation"), false);

                        var mCusLocation = {
                            CustomerID: $scope.CustomerID
                        };

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Customer/GetCusLocationById?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(mCusLocation)).success(function (response, status, headers, config) {
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
                field: "Name",
                title: "ชื่อสถานที่",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left;" }
            }, {
                field: "Address",
                title: "ที่อยู่",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left;" }
            }, {
                field: "ContactName",
                title: "ชื่อผู้ติดต่อ",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }, {
                field: "ContactPhone",
                title: "เบอร์โทรศัพท์",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }, {
                field: "Remark",
                title: "รายละเอียด",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left;" }
            }, {
                field: "StatusName",
                title: "สถานะ",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }]
            , dataBound: function (CusLocation_DataItem) {
                akow_Authentication_CheckPermission($http);
            }
        };

        akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'Customer/GetCustomerById?Id=' + parameter.Customer_DataItem.ID).success(function (response, status, headers, config) {
        
            if (response.Successfully) {
                $scope.Customer_ViewID = response.Data.ID;
                $scope.Customer_ViewName = response.Data.Name;
                $scope.Customer_ViewCode = response.Data.Code;
                $scope.Customer_ViewTitle = response.Data.Title;
                $scope.Customer_ViewCustomerTypeID = response.Data.TypeID;
                $scope.Customer_ViewCustomerType = response.Data.TypeName;
                $scope.Customer_ViewFirstName = response.Data.FirstName;
                $scope.Customer_ViewLastName = response.Data.LastName;
                $scope.Customer_ViewNameShort = response.Data.NameShort;
                $scope.Customer_ViewTaxID = response.Data.TaxID;

                //$("#Customer_ViewCategory").val(response.Data.CategoryID);
                $scope.Customer_ViewCategory = response.Data.CategoryID;

                $scope.Customer_ViewMemberID = response.Data.MemberID;
                $scope.Customer_ViewPhone = response.Data.Phone;

                //$("#Customer_ViewRegisterDate").val(response.Data.strRegisterDate);
                $scope.Customer_ViewRegisterDate = response.Data.strRegisterDate;

                $scope.Customer_ViewEmail = response.Data.Email;
                $scope.Customer_ViewContact = Boolean(response.Data.Contact);
                $scope.Customer_ViewStatus = response.Data.Status;
                $scope.Customer_ViewRemark = response.Data.Remark;

                $scope.Customer_ViewCustomerGroupID = response.Data.GroupID;
                $scope.Customer_ViewCustomerJuristicTypeID = response.Data.JuristicTypeID;
                $scope.Customer_ViewCustomerGroup = response.Data.GroupName;
                $scope.Customer_ViewMobile = response.Data.Mobile;
                $scope.Customer_ViewFax = response.Data.PhoneOtherOne;
                $scope.Customer_ViewWebSite = response.Data.Website;
                $scope.Customer_ViewReferCode01 = response.Data.ReferCode01;
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

        //var opened = false;
        $scope.PageSize = 10;
        $scope.CustomerID = parameter.Customer_DataItem.ID;

        $scope.Customer_Initial = function () {
            akow_Authentication_CheckPermission($http);

            akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLStatus').success(function (result) {
                if (result != null) {
                    $scope.StatusList = result.Data;
                } else {
                    $scope.StatusList = null;
                }
            }).error(function (result) {
            });
        }

        $scope.Customer_Close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.CusContact_Initial = function () {
            var grid = $("#Customer_GridCusContact").data("kendoGrid");
            var data = { page: 1, pageSize: 10, sort: null }
            grid.dataSource.read(data);
        }

        $scope.CusLocation_Initial = function () {
            var grid = $("#Customer_GridCusLocation").data("kendoGrid");
            var data = { page: 1, pageSize: 10, sort: null }
            grid.dataSource.read(data);
        }

        $scope.Customer_OptGridCusContact = {
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
                pageSize: $scope.PageSize,
                serverPaging: true,
                serverSorting: true,
                transport: {

                    read: function (e) {
                        kendo.ui.progress($("#Customer_GridCusContact"), false);
                        $scope.PageSize = $("#Customer_GridCusContact").data("kendoGrid").dataSource.pageSize();
                        var mCusContact = {
                            CustomerID: $scope.CustomerID,
                            Name: $scope.CustomerSearchContactName
                        };

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Customer/GetCusContactById?PageIndex=' + e.data.page + '&PageSize=' + $scope.PageSize + '&Sort=' + sortField, JSON.stringify(mCusContact)).success(function (response, status, headers, config) {
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

                            var hgrid = $("#CusContact_chkHeadGrid").removeAttr('checked');

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
                width: "10%",
                headerTemplate: "<input type='checkbox' id='CusContact_chkHeadGrid' class='CusContact_chkHeadGrid' ng-model='dataItem.CusContact_selectedAll' ng-click='CusContact_checkAll(dataItem)' />",
                template: "<input type='checkbox' class='CusContact_chkGrid' ng-model='dataItem.CusContact_selectedItem' ng-true-value='true' ng-false-value='false' ng-checked='dataItem.CusContact_selectedItem==true' name='CusContact_selectedDetail' />",
                sortable: false
            }, {
                field: "Name",
                title: "ชื่อผู้ติดต่อ",
                width: "80%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }, {
                field: "Phone",
                title: "เบอร์โทรศัพท์",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }, {
                field: "Email",
                title: "อีเมล์",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }, {
                field: "TypeName",
                title: "ประเภทผู้ติดต่อ",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left;" }
            }, {
                field: "StatusName",
                title: "สถานะ",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }, {
                title: "Edit",
                width: "100px",
                template: "<button class='btn btn-primary akow-editbutton' ng-click='Customer_EditCusContact(dataItem)'><i class='fa fa-pencil'></i></button>",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }]
                , dataBound: function (CusContact_DataItem) {
                    akow_Authentication_CheckPermission($http);
                }
        };

        $scope.Customer_OptGridCusLocation = {
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
                        kendo.ui.progress($("#Customer_GridCusLocation"), false);

                        var mCusLocation = {
                            CustomerID: $scope.CustomerID,
                            Name: $scope.CustomerSearchLocatorName
                        };

                        var sortField = '';
                        if (e.data.sort != null) {
                            if (e.data.sort[0] != null) {
                                sortField = e.data.sort[0].field + ' ' + e.data.sort[0].dir.toUpperCase();
                            }
                        }

                        akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Customer/GetCusLocationById?PageIndex=' + e.data.page + '&PageSize=' + e.data.pageSize + '&Sort=' + sortField, JSON.stringify(mCusLocation)).success(function (response, status, headers, config) {
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

                            var hgrid = $("#CusLocation_chkHeadGrid").removeAttr('checked');

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
                width: "10%",
                headerTemplate: "<input type='checkbox' id='CusLocation_chkHeadGrid' class='CusLocation_chkHeadGrid' ng-model='dataItem.CusLocation_selectedAll' ng-click='CusLocation_checkAll(dataItem)' />",
                template: "<input type='checkbox' class='CusLocation_chkGrid' ng-model='dataItem.CusLocation_selectedItem' ng-true-value='true' ng-false-value='false' ng-checked='dataItem.CusLocation_selectedItem==true' name='CusLocation_selectedDetail' />",
                sortable: false
            },
            {
                field: "Name",
                title: "ชื่อสถานที่",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left;" }
            }, {
                field: "Address",
                title: "ที่อยู่",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left;" }
            }, {
                field: "ContactName",
                title: "ชื่อผู้ติดต่อ",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }, {
                field: "ContactPhone",
                title: "เบอร์โทรศัพท์",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }, {
                field: "Remark",
                title: "รายละเอียด",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:left;" }
            }, {
                field: "StatusName",
                title: "สถานะ",
                width: "50%",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }, {
                title: "Edit",
                width: "100px",
                template: "<button class='btn btn-primary akow-editbutton' ng-click='Customer_EditCusLocation(dataItem)'><i class='fa fa-pencil'></i></button>",
                headerAttributes: { style: "text-align:center;" },
                attributes: { style: "text-align:center;" }
            }]
            , dataBound: function (CusLocation_DataItem) {
                akow_Authentication_CheckPermission($http);
            }
        };

        $scope.CusContact_checkAll = function (CusContact_DataItem) {
            var grid = $("#Customer_GridCusContact").data("kendoGrid");

            var listOfData = grid.dataSource.data();
            for (var i = 0; i < listOfData.length; i++) {
                listOfData[i].CusContact_selectedItem = CusContact_DataItem.CusContact_selectedAll;
            }
        };

        $scope.CusLocation_checkAll = function (CusLocation_DataItem) {
            var grid = $("#Customer_GridCusLocation").data("kendoGrid");

            var listOfData = grid.dataSource.data();
            for (var i = 0; i < listOfData.length; i++) {
                listOfData[i].CusLocation_selectedItem = CusLocation_DataItem.CusLocation_selectedAll;
            }
        };

        $scope.Customer_DelCusContact = function () {
            var grid = $("#Customer_GridCusContact").data("kendoGrid");

            var sID = "";
            var delSelectedName = "";
            var listOfData = grid.dataSource.data();
            for (var i = 0; i < listOfData.length; i++) {
                if (listOfData[i].CusContact_selectedItem) {
                    sID += listOfData[i].ID + ",";
                    delSelectedName += listOfData[i].Name + ", ";
                }
            }

            if (sID == "") {
                akow_Messagebox_Msgbox('กรุณาเลือกรายการที่จะลบก่อน', MESSAGE_BOX_TITLE.WARNING, BUTTON_MODE.OK, ICONS_MODE.WARNING, function () { null }, null);
                return false;
            }

            delSelectedName = delSelectedName.substring(0, delSelectedName.length - 2);
            sID = sID.substring(0, sID.length - 1);

            akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูล ' + delSelectedName + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.deleteCusContact(sID); }, null);

            return false;
        };

        $scope.Customer_DelCusLocation = function () {
            var grid = $("#Customer_GridCusLocation").data("kendoGrid");

            var sID = "";
            var delSelectedName = "";
            var listOfData = grid.dataSource.data();
            for (var i = 0; i < listOfData.length; i++) {
                if (listOfData[i].CusLocation_selectedItem) {
                    sID += listOfData[i].ID + ",";
                    delSelectedName += listOfData[i].Name + ", ";
                }
            }

            if (sID == "") {
                akow_Messagebox_Msgbox('กรุณาเลือกรายการที่จะลบก่อน', MESSAGE_BOX_TITLE.WARNING, BUTTON_MODE.OK, ICONS_MODE.WARNING, function () { null }, null);
                return false;
            }

            delSelectedName = delSelectedName.substring(0, delSelectedName.length - 2);
            sID = sID.substring(0, sID.length - 1);

            akow_Messagebox_Msgbox('ท่านต้องการลบข้อมูล ' + delSelectedName + ' ใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $scope.deleteCusLocation(sID); }, null);

            return false;
        };

        $scope.deleteCusContact = function (parID) {

            var CusData = {
                CustomerID: $scope.CustomerID
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'CustomerContact/Delete?sid=' + parID, CusData).success(function (response, status, headers, config) {
                if (response.Successfully) {
                    akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, function () { $scope.CusContact_Initial(); }, null);
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

        $scope.deleteCusLocation = function (parID) {

            var CusData = {
                CustomerID: $scope.CustomerID
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'CustomerLocation/Delete?sid=' + parID, CusData).success(function (response, status, headers, config) {
                if (response.Successfully) {
                    akow_Messagebox_Msgbox(response.Message, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, function () { $scope.CusLocation_Initial(); }, null);
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

        $scope.EnableOrg = function () {
            $scope.Customer_EditNameDis = false;
            $scope.Customer_EditNameShortDis = false;
            $("#Customer_EditCategory").removeAttr("disabled");

            $("#Customer_EditName").css("background-color", COLOR_CODE.WHITE);

            $scope.Customer_EditNameCss = "akow-require-field akow-control-textbox";
            $scope.Customer_EditNameShortCss = "akow-control-textbox";
            $('#Customer_EditCategory').removeClass('akow-control-dropdownlist-disabled').addClass('akow-control-dropdownlist');
        }

        $scope.DisableOrg = function () {
            $scope.Customer_EditNameDis = true;
            $scope.Customer_EditNameShortDis = true;
            $("#Customer_EditCategory").attr("disabled", "disabled");

            $("#Customer_EditName").css("background-color", COLOR_CODE.WHITE_SMOKE);

            $scope.Customer_EditNameCss = "akow-require-field akow-control-textbox-disabled";
            $scope.Customer_EditNameShortCss = "akow-control-textbox-disabled";
            $('#Customer_EditCategory').removeClass('akow-control-dropdownlist').addClass('akow-control-dropdownlist-disabled');
        }

        $scope.EnableIndividual = function () {
            $scope.Customer_EditTitleDis = false;
            $scope.Customer_EditFirstNameDis = false;
            $scope.Customer_EditLastNameDis = false;
            $scope.Customer_EditMemberIDDis = false;
            $scope.Customer_EditRegisterDateDis = false;
            $scope.Customer_EditContactDis = false;

            $("#Customer_EditFirstName").css("background-color", COLOR_CODE.WHITE);
            $("#Customer_EditLastName").css("background-color", COLOR_CODE.WHITE);
            $("#Customer_EditRegisterDate").css("background-color", COLOR_CODE.WHITE);

            $scope.Customer_EditTitleCss = "akow-control-textbox";
            $scope.Customer_EditFirstNameCss = "akow-require-field akow-control-textbox";
            $scope.Customer_EditLastNameCss = "akow-require-field akow-control-textbox";
            $scope.Customer_EditMemberIDCss = "akow-control-textbox";
        }

        $scope.DisableIndividual = function () {
            $scope.Customer_EditTitleDis = true;
            $scope.Customer_EditFirstNameDis = true;
            $scope.Customer_EditLastNameDis = true;
            $scope.Customer_EditMemberIDDis = true;
            $scope.Customer_EditRegisterDateDis = true;
            $scope.Customer_EditContactDis = true;

            $("#Customer_EditFirstName").css("background-color", COLOR_CODE.WHITE_SMOKE);
            $("#Customer_EditLastName").css("background-color", COLOR_CODE.WHITE_SMOKE);
            $("#Customer_EditRegisterDate").css("background-color", COLOR_CODE.WHITE_SMOKE);

            $scope.Customer_EditTitleCss = "akow-control-textbox-disabled";
            $scope.Customer_EditFirstNameCss = "akow-require-field akow-control-textbox-disabled";
            $scope.Customer_EditLastNameCss = "akow-require-field akow-control-textbox-disabled";
            $scope.Customer_EditMemberIDCss = "akow-control-textbox-disabled";
        }

        akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'Customer/GetCustomerById?Id=' + parameter.Customer_DataItem.ID).success(function (response, status, headers, config) {
        
            if (response.Successfully) {
                $scope.Customer_EditID = response.Data.ID;
                $scope.Customer_EditName = response.Data.Name;
                $scope.Customer_EditCode = response.Data.Code;
                $scope.Customer_EditTitle = response.Data.Title;
                $scope.Customer_EditCustomerTypeID = response.Data.TypeID;
                $scope.Customer_EditCustomerType = response.Data.TypeName;
                $scope.Customer_EditFirstName = response.Data.FirstName;
                $scope.Customer_EditLastName = response.Data.LastName;
                $scope.Customer_EditNameShort = response.Data.NameShort;
                $scope.Customer_EditTaxID = response.Data.TaxID;

                //$("#Customer_EditCategory").val(response.Data.CategoryID);
                $scope.Customer_EditCategory = response.Data.CategoryID;

                $scope.Customer_EditMemberID = response.Data.MemberID;
                $scope.Customer_EditPhone = response.Data.Phone;

                //$("#Customer_EditRegisterDate").val(response.Data.strRegisterDate);
                $scope.Customer_EditRegisterDate = response.Data.strRegisterDate;

                $scope.Customer_EditEmail = response.Data.Email;
                $scope.Customer_EditContact = Boolean(response.Data.Contact);
                $scope.Customer_EditStatus = response.Data.Status;
                $scope.Customer_EditRemark = response.Data.Remark;

                $scope.Customer_EditCustomerGroupID = response.Data.GroupID;
                $scope.Customer_EditCustomerGroup = response.Data.GroupName;
                $scope.Customer_EditJuristicTypeID = response.Data.JuristicTypeID;

                $scope.Customer_EditMobile = response.Data.Mobile;
                $scope.Customer_EditFax = response.Data.PhoneOtherOne;
                $scope.Customer_EditWebSite = response.Data.Website;
                $scope.Customer_EditReferCode01 = response.Data.ReferCode01;

                if (response.Data.JuristicTypeID == CUSTOMER_JURISTIC_TYPE.Organization) {
                    $scope.EnableOrg();
                    $scope.DisableIndividual();
                }
                else {
                    $scope.DisableOrg();
                    $scope.EnableIndividual();
                }
            }
            else {
                alert(response.Message);
            }
            console.log(response);
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            console.log(status);
        });

        $scope.Customer_Edit = function () {

            if ($scope.Customer_EditJuristicTypeID == CUSTOMER_JURISTIC_TYPE.Organization) {
                var rejectItem = [];
                rejectItem.push({ Customer_EditFirstName: null });
                rejectItem.push({ Customer_EditLastName: null });
                var originalColor = [];
                originalColor.push({ Customer_EditFirstName: COLOR_CODE.WHITE_SMOKE });
                originalColor.push({ Customer_EditLastName: COLOR_CODE.WHITE_SMOKE });
                originalColor.push({ Customer_EditRegisterDate: COLOR_CODE.WHITE_SMOKE });

                if (!akow_Validate_ValidateInput_ItemCancel(rejectItem, originalColor)) {
                    return false;
                }
            }
            else {
                var rejectItem = [];
                rejectItem.push({ Customer_EditName: null });
                var originalColor = [];
                originalColor.push({ Customer_EditName: COLOR_CODE.WHITE_SMOKE });

                if (!akow_Validate_ValidateInput_ItemCancel(rejectItem, originalColor)) {
                    return false;
                }
            } 
           
            var CusData = {
                ID: $scope.CustomerID,
                Code: $scope.Customer_EditCode,
                Name: $scope.Customer_EditName,
                TaxID: $scope.Customer_EditTaxID,
                TypeID: $scope.Customer_EditCustomerTypeID,
                NameShort: $scope.Customer_EditNameShort,

                //CategoryID: $("#Customer_EditCategory").val(),
                CategoryID: $scope.Customer_EditCategory,

                Title: $scope.Customer_EditTitle,
                FirstName: $scope.Customer_EditFirstName,
                LastName: $scope.Customer_EditLastName,
                MemberID: $scope.Customer_EditMemberID,

                //strRegisterDate: $("#Customer_EditRegisterDate").val(),
                strRegisterDate: $scope.strRegisterDate,

                Contact: $scope.Customer_EditContact,
                Status: $scope.Customer_EditStatus,
                Phone: $scope.Customer_EditPhone,
                Email: $scope.Customer_EditEmail,
                Remark: $scope.Customer_EditRemark,
                GroupID: $scope.Customer_EditCustomerGroupID,
                JuristicTypeID: $scope.Customer_EditJuristicTypeID,
                Mobile: $scope.Customer_EditMobile,
                PhoneOtherOne: $scope.Customer_EditFax,
                Website: $scope.Customer_EditWebSite,
                ReferCode01: $scope.Customer_EditReferCode01,
                CreatedBy: parameter.SysUserID,
                UpdatedBy: parameter.SysUserID,
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'Customer/Put', CusData).success(function (response, status, headers, config) {
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

        $scope.Customer_AddCusContact = function () {
            //if (opened) return;
            //opened = true;
            openLoadingProgress();

            var modalInstance = $modal.open({
                templateUrl: WebMvcUrl
                        + 'Customer/AddCustomerContactsModal',
                controller: 'CustomerContactModalCtrl',
                size: 'lg',
                backdrop: false,
                animation: true,
                resolve: {
                    parameter: function () {
                        return model = {
                            id: 0,
                            mode: "AddCreate",
                            SysUserID: $scope.SysUserID,
                            CustomerID: $scope.CustomerID,
                            Customer_EditJuristicTypeID: $scope.Customer_EditJuristicTypeID
                        };
                    }
                }
            });

            modalInstance.result
                    .then(
                            function () {
                                $scope.init();
                                //opened = false;
                                $scope.clear();
                            }, function () {
                                //opened = false;
                                $scope.CusContact_Initial();
                            });
        };

        $scope.Customer_AddCusLocation = function () {
            //if (opened) return;
            //opened = true;
            openLoadingProgress();

            var modalInstance = $modal.open({
                templateUrl: WebMvcUrl
                        + 'Customer/AddCustomerLocationsModal',
                controller: 'CustomerLocationModalCtrl',
                size: 'lg',
                backdrop: false,
                animation: true,
                resolve: {
                    parameter: function () {
                        return model = {
                            id: 0,
                            mode: "AddCreate",
                            SysUserID: $scope.SysUserID,
                            CustomerID: $scope.CustomerID,
                            Customer_DataItem: parameter.Customer_DataItem,
                            Customer_EditJuristicTypeID: $scope.Customer_EditJuristicTypeID
                        };
                    }
                }
            });

            modalInstance.result
                    .then(
                            function () {
                                $scope.init();
                                $scope.clear();
                                //opened = false;
                            }, function () {
                                $scope.CusLocation_Initial();
                                //opened = false;
                            });
        };

        $scope.Customer_EditCusContact = function (CusContact_DataItem) {
            //if (opened) return;
            //opened = true;
            openLoadingProgress();

            var modalInstance = $modal.open({
                templateUrl: WebMvcUrl
                        + 'Customer/EditCustomerContactsModal',
                controller: 'CustomerContactModalCtrl',
                size: 'lg',
                backdrop: false,
                animation: true,
                resolve: {
                    parameter: function () {
                        return model = {
                            id: 0,
                            mode: "EditCreate",
                            CusContact_DataItem: CusContact_DataItem,
                            SysUserID: $scope.SysUserID,
                            CustomerID: $scope.CustomerID,
                            Customer_EditJuristicTypeID: $scope.Customer_EditJuristicTypeID
                        };
                    }
                }
            });

            modalInstance.result
                    .then(
                            function () {
                                $scope.init();
                                $scope.clear();
                                //opened = false;
                            }, function () {
                                $scope.CusContact_Initial();
                                //opened = false;
                            });
        };

        $scope.Customer_EditCusLocation = function (CusLocation_DataItem) {
            //if (opened) return;
            //opened = true;
            openLoadingProgress();

            var modalInstance = $modal.open({
                templateUrl: WebMvcUrl
                        + 'Customer/EditCustomerLocationsModal',
                controller: 'CustomerLocationModalCtrl',
                size: 'lg',
                backdrop: false,
                animation: true,
                resolve: {
                    parameter: function () {
                        return model = {
                            id: 0,
                            mode: "EditCreate",
                            Customer_DataItem: parameter.Customer_DataItem,
                            CusLocation_DataItem: CusLocation_DataItem,
                            SysUserID: $scope.SysUserID,
                            CustomerID: $scope.CustomerID,
                            Customer_EditJuristicTypeID: $scope.Customer_EditJuristicTypeID
                        };
                    }
                }
            });

            modalInstance.result
                    .then(
                            function () {
                                $scope.init();
                                $scope.clear();
                                //opened = false;

                            }, function () {
                                $scope.CusLocation_Initial();
                                //opened = false;

                            });
        };

        $scope.ExportTemplate = function () {

            var dataItem = {
                CustomerID: $scope.CustomerID,
                CreatedBy: $scope.SysUserID
            };

            openLoadingProgress();
            $http.post(SAMWebApiUrl + 'ProjectContract/ExportContactLocation', JSON.stringify(dataItem)).success(function (resultQuery) {
                if (resultQuery.Data != null && resultQuery.Data.Successfully == true) {
                    $scope.Customer_TempPath = resultQuery.Data.FilePath + "/" + resultQuery.Data.FileName;
                } else {
                    if (resultQuery.Data != null) {
                        akow_Messagebox_Msgbox(resultQuery.Data.Message, MESSAGE_BOX_TITLE.ERROR, BUTTON_MODE.OK, ICONS_MODE.ERROR, null, null);
                    }
                    else {
                        alert("Can't Generate");
                    }
                }
                closeLoadingProgress();
            }).error(function (error) {
                closeLoadingProgress();
                console.log(error);
                alert("Can't Generate");
            });
        };
    }
});

ARSoft_Claim_Web.controller("CustomerContactModalCtrl", function ($scope, $http, config, $modalInstance, parameter, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE, CONTACT_TYPE, CUSTOMER_JURISTIC_TYPE, STATUS, COLOR_CODE) {

    $scope.CustomerID = parameter.CustomerID;

    $scope.SysUserID = parameter.SysUserID;

    $scope.Customer_EditJuristicTypeID = parameter.Customer_EditJuristicTypeID;
  
    if (parameter.mode == "AddCreate") {

        $scope.CustomerContact_Initial = function () {
            akow_Authentication_CheckPermission($http);

            $scope.CusContact_AddContactType = CONTACT_TYPE.Direct;
            $scope.CusContact_AddStatus = STATUS.Active;  
           
            akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLContactType').success(function (result) {
                if (result != null) {
                    $scope.ContactTypeList = result.Data;
                } else {
                    $scope.ContactTypeList = null;
                }
            }).error(function (result) {
            });

            akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLStatus').success(function (result) {
                if (result != null) {
                    $scope.StatusList = result.Data;
                } else {
                    $scope.StatusList = null;
                }
            }).error(function (result) {
            });

            closeLoadingProgress();
        }

        $scope.CustomerContact_Close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.CustomerContact_Add = function () {

            if ($scope.Customer_EditJuristicTypeID == CUSTOMER_JURISTIC_TYPE.Organization) {
                var rejectItem = [];
                rejectItem.push({ Customer_EditFirstName: null });
                rejectItem.push({ Customer_EditLastName: null });
                var originalColor = [];
                originalColor.push({ Customer_EditFirstName: COLOR_CODE.WHITE_SMOKE });
                originalColor.push({ Customer_EditLastName: COLOR_CODE.WHITE_SMOKE });
                originalColor.push({ Customer_EditRegisterDate: COLOR_CODE.WHITE_SMOKE });

                if (!akow_Validate_ValidateInput_ItemCancel(rejectItem, originalColor)) {
                    return false;
                }
            }
            else {
                var rejectItem = [];
                var originalColor = [];

                if (!akow_Validate_ValidateInput_ItemCancel(rejectItem, originalColor)) {
                    return false;
                }
            }

            debugger;
            var CusContactData = {
                ID: 0,
                CustomerID: $scope.CustomerID,
                TitleName: $scope.CusContact_AddTitle,
                FirstName: $scope.CusContact_AddFirstName,
                LastName: $scope.CusContact_AddLastName,
                Phone: $scope.CusContact_AddPhone,
                Email: $scope.CusContact_AddEmail,
                PhoneOtherOne: $scope.CusContact_AddPhoneOther1,
                PhoneOtherTwo: $scope.CusContact_AddPhoneOther2,
                PhoneOtherThree: $scope.CusContact_AddPhoneOther3,

                TypeID: $('input[name=ContactTypeAdd]:checked').val(), //$scope.CusContact_AddContactType,

                Remark: $scope.CusContact_AddRemark,

                Status: $('input[name=StatusAdd]:checked').val(),//$scope.CusContact_AddStatus,

                CreatedBy: parameter.SysUserID,
                UpdatedBy: parameter.SysUserID
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'CustomerContact/Post', CusContactData).success(function (response, status, headers, config) {
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
   
    if (parameter.mode == "EditCreate") {

        $scope.CustomerContactID = parameter.CusContact_DataItem.ID;

        $scope.CustomerContact_Initial = function () {
            akow_Authentication_CheckPermission($http);

            akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLContactType').success(function (result) {
                if (result != null) {
                    $scope.ContactTypeList = result.Data;
                } else {
                    $scope.ContactTypeList = null;
                }
            }).error(function (result) {
            });

            akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLStatus').success(function (result) {
                if (result != null) {
                    $scope.StatusList = result.Data;
                } else {
                    $scope.StatusList = null;
                }
            }).error(function (result) {
            });
        }

        $scope.CustomerContact_Close = function () {
            $modalInstance.dismiss('cancel');
        };

        akow_Authentication_HttpGetL($http, SAMWebApiUrl + 'CustomerContact/GetCusContactById?Id=' + parameter.CusContact_DataItem.ID).success(function (response, status, headers, config) {
        
            if (response.Successfully) {
                $scope.CusContact_EditTitle = response.Data.TitleName,
                $scope.CusContact_EditFirstName = response.Data.FirstName,
                $scope.CusContact_EditLastName = response.Data.LastName,
                $scope.CusContact_EditPhone = response.Data.Phone,
                $scope.CusContact_EditEmail = response.Data.Email,
                $scope.CusContact_EditPhoneOther1 = response.Data.PhoneOtherOne,
                $scope.CusContact_EditPhoneOther2 = response.Data.PhoneOtherTwo,
                $scope.CusContact_EditPhoneOther3 = response.Data.PhoneOtherThree,
                $scope.CusContact_EditContactType = response.Data.TypeID,
                $scope.CusContact_EditRemark = response.Data.Remark,
                $scope.CusContact_EditStatus = response.Data.Status

                //$scope.ContactTypeList = "";
                //$scope.StatusList = "";
            }
            else {
                alert(response.Message);
            }
            console.log(response);
        }).error(function (response, status, headers, config) {
            alert(response.Message);
            console.log(status);
        });

        $scope.CustomerContact_Edit = function () {

            if ($scope.Customer_EditJuristicTypeID == CUSTOMER_JURISTIC_TYPE.Organization) {
                var rejectItem = [];
                rejectItem.push({ Customer_EditFirstName: null });
                rejectItem.push({ Customer_EditLastName: null });
                var originalColor = [];
                originalColor.push({ Customer_EditFirstName: COLOR_CODE.WHITE_SMOKE });
                originalColor.push({ Customer_EditLastName: COLOR_CODE.WHITE_SMOKE });
                originalColor.push({ Customer_EditRegisterDate: COLOR_CODE.WHITE_SMOKE });

                if (!akow_Validate_ValidateInput_ItemCancel(rejectItem, originalColor)) {
                    return false;
                }
            }
            else {
                var rejectItem = [];
                var originalColor = [];

                if (!akow_Validate_ValidateInput_ItemCancel(rejectItem, originalColor)) {
                    return false;
                }
            }

            debugger;
            var CusContactData = {
                ID: $scope.CustomerContactID,
                CustomerID: $scope.CustomerID,
                TitleName: $scope.CusContact_EditTitle,
                FirstName: $scope.CusContact_EditFirstName,
                LastName: $scope.CusContact_EditLastName,
                Phone: $scope.CusContact_EditPhone,
                Email: $scope.CusContact_EditEmail,
                PhoneOtherOne: $scope.CusContact_EditPhoneOther1,
                PhoneOtherTwo: $scope.CusContact_EditPhoneOther2,
                PhoneOtherThree: $scope.CusContact_EditPhoneOther3,

                TypeID: $scope.CusContact_EditContactType,

                Remark: $scope.CusContact_EditRemark,

                Status: $scope.CusContact_EditStatus,

                CreatedBy: parameter.SysUserID,
                UpdatedBy: parameter.SysUserID
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'CustomerContact/Put', CusContactData).success(function (response, status, headers, config) {
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
});

ARSoft_Claim_Web.controller("CustomerLocationModalCtrl", function ($scope, $http, config, $modalInstance, parameter, $modal, $q, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE, CUSTOMER_JURISTIC_TYPE, STATUS, COLOR_CODE) {

    $scope.CustomerID = parameter.CustomerID;

    $scope.SysUserID = parameter.SysUserID;

    $scope.Customer_EditJuristicTypeID = parameter.Customer_EditJuristicTypeID;

    $scope.mse_add_ProvinceID = null;

    if (parameter.mode == "AddCreate") {

        $scope.CustomerLocation_Initial = function () {
            akow_Authentication_CheckPermission($http);

            $scope.CustomerLocation_AddStatus = STATUS.Active;

            closeLoadingProgress();
        }

       
        //New
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Common/GetProvinceAll').success(function (result) {
            if (result != null) {
                $scope.CustomerLocation_ProvinceAdd = result.Data;
            } else {
                $scope.CustomerLocation_ProvinceAdd = null;
            }
        }).error(function (result) {
        });

       
        $scope.changeDistrict = function () {
            $scope.mse_add_DistrictID = null;
          
            // ddl Districts
            akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Common/GetDistinctByProvinceID?provinceID=' + $scope.CustomerLocation_AddProvince).success(function (response, status, headers, config) {
                if (response.Successfully) {
                    $scope.CustomerLocation_DistrictAdd = response.Data;
                } else {
                    $scope.CustomerLocation_DistrictAdd = null;

                }
            }).error(function (result) {
                console.log(result);
            });
        }
             
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLZone').success(function (result) {
            if (result != null) {
                $scope.CusLocation_ZoneAdd = result.Data;
            } else {
                $scope.CusLocation_ZoneAdd = null;
            }
        }).error(function (result) {
        });

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLStatus').success(function (result) {
            if (result != null) {
                $scope.StatusList = result.Data; 
            } else {
                $scope.StatusList = null;
            }
        }).error(function (result) {
        }); 


        //Old
        //$http.get(SAMWebApiUrl + 'AssetLocation/GetDDLProvince').success(function (result) {
        //    //   console.log(resultAction);
        //    $scope.CustomerLocation_ProvinceAdd = result.Data;
        //}).error(function (result) {
        //    console.log(result);
        //}); 

        //Old
        //$http.get(SAMWebApiUrl + 'AssetLocation/GetDDLDistinct').success(function (result) {
        //    //    console.log(resultAction);
        //    $scope.CustomerLocation_DistrictAdd = result.Data;
        //}).error(function (result) {
        //    console.log(result);
        //});

        //debugger;
        //// ddl Districts
        //akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Common/GetDistinctByProvinceID?provinceID=' + $scope.CustomerLocation_ProvinceAdd).success(function (response, status, headers, config) {
        //    if (response.Successfully) {
        //        $scope.CustomerLocation_DistrictAdd = response.Data;
        //    } else {
        //        $scope.CustomerLocation_DistrictAdd = null;

        //    }
        //}).error(function (result) {
        //    console.log(result);
        //});

        $scope.CustomerLocation_PopupContactName = function () {
            var modalInstance = $modal.open({
                templateUrl: WebMvcUrl
                              + 'Popup/SearchCustomerContactModal',
                controller: 'SearchCustomerContactModalController',
                size: 'lg',
                backdrop: false,
                animation: true,
                resolve: {
                    parameter: function () {
                        return CustomerLocation_Model = {
                            CustomerID: parameter.Customer_DataItem.ID,
                            CustomerCode: parameter.Customer_DataItem.Code,
                            CustomerName: parameter.Customer_DataItem.Name
                        };
                    }
                }
            });
            $scope.CustomerLocation_Model = {};

            modalInstance.result
                    .then(
                            function (ret) {
                                $scope.CustomerLocation_Model = ret;
                                $scope.CustomerLocation_AddContactID = $scope.CustomerLocation_Model.ContactID;
                                $scope.CustomerLocation_AddContactName = $scope.CustomerLocation_Model.ContactName;
                                $scope.CustomerLocation_AddContactPhone = $scope.CustomerLocation_Model.Phone;
                            }, function () {
                                // 
                            });
        };

        $scope.CustomerLocation_Close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.CustomerLocation_Add = function () {

            if ($scope.Customer_EditJuristicTypeID == CUSTOMER_JURISTIC_TYPE.Organization) {
                var rejectItem = [];
                rejectItem.push({ Customer_EditFirstName: null });
                rejectItem.push({ Customer_EditLastName: null });
                var originalColor = [];
                originalColor.push({ Customer_EditFirstName: COLOR_CODE.WHITE_SMOKE });
                originalColor.push({ Customer_EditLastName: COLOR_CODE.WHITE_SMOKE });
                originalColor.push({ Customer_EditRegisterDate: COLOR_CODE.WHITE_SMOKE });

                if (!akow_Validate_ValidateInput_ItemCancel(rejectItem, originalColor)) {
                    return false;
                }
            }
            else {
                var rejectItem = [];
                var originalColor = [];

                if (!akow_Validate_ValidateInput_ItemCancel(rejectItem, originalColor)) {
                    return false;
                }
            } 
         
            var CusLocationData = {
                ID: 0,
                CustomerID: $scope.CustomerID,
                ContactID: $scope.CustomerLocation_AddContactID,
                Name: $scope.CustomerLocation_AddLocationName,
                AddressLineOne: $scope.CustomerLocation_AddAddressLineOne,
                AddressLineTwo: $scope.CustomerLocation_AddAddressLineTwo,
                DistrictID: $scope.CustomerLocation_AddDistrict,
                ProvinceID: $scope.CustomerLocation_AddProvince,
                PostCode: $scope.CustomerLocation_AddPostCode,
                Phone: $scope.CustomerLocation_AddPhone,
                Fax: $scope.CustomerLocation_AddFax,
                GpsLocation: $scope.CustomerLocation_AddGpsLocation,

                //ZoneID: $("#CusLocation_AddZone").val(), 
                ZoneID: $scope.CustomerLocation_AddZone,

                DefalutLocation: $scope.CustomerLocation_AddDefalutLocation,
                BillingLocation: $scope.CustomerLocation_AddBillingLocation,
                ProjectSite: $scope.CustomerLocation_AddProjectSite,
                AssetLocation: $scope.CustomerLocation_AddAssetLocation,
                OtherLocation: $scope.CustomerLocation_AddOtherLocation,
                Remark: $scope.CustomerLocation_AddDescription,

                Status: $('input[name=status]:checked').val(),//$scope.CustomerLocation_AddStatus,

                CreatedBy: parameter.SysUserID,
                UpdatedBy: parameter.SysUserID
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'CustomerLocation/Post', CusLocationData).success(function (response, status, headers, config) {
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

    if (parameter.mode == "EditCreate") {

        $scope.CustomerLocationID = parameter.CusLocation_DataItem.ID;

        $scope.CustomerLocation_Initial = function () {
            akow_Authentication_CheckPermission($http);

            $scope.CustomerLocation_Load();
        }

        //Old
        //$http.get(SAMWebApiUrl + 'AssetLocation/GetDDLProvince').success(function (result) {
        //    //   console.log(result);
        //    $scope.CustomerLocation_ProvinceEdit = result.Data;
        //    $scope.CustomerLocation_LoadDistrict();
        //}).error(function (result) {
        //    console.log(result);
        //});

       
        //New
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Common/GetProvinceAll').success(function (result) {
            if (result != null) {
                $scope.CustomerLocation_ProvinceEdit = result.Data;
                $scope.CustomerLocation_LoadDistrict();
            } else {
                $scope.CustomerLocation_ProvinceEdit = null;
            }
        }).error(function (result) {
        });

        ////Old
        $scope.CustomerLocation_LoadDistrict = function () {
            akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Common/GetDistinctByProvinceID?provinceID=' + $scope.CustomerLocation_EditProvince).success(function (response, status, headers, config) {
                if (response.Successfully) {
                    $scope.CustomerLocation_DistrictEdit = response.Data;
                    
                } else {
                    $scope.CustomerLocation_DistrictEdit = null;
                }
            }).error(function (result) {
                console.log(result);
            });

        //    $http.get(SAMWebApiUrl + 'AssetLocation/GetDDLDistinct').success(function (result) {
        //        //  console.log(result);
        //        $scope.CustomerLocation_DistrictEdit = result.Data;
        //        $scope.CustomerLocation_Load();
        //    }).error(function (result) {
        //        console.log(result);
        //    });
        }

      
        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLZone').success(function (result) {
            if (result != null) {
                $scope.CusLocation_ZoneEdit = result.Data;
            } else {
                $scope.CusLocation_ZoneEdit = null;
            }
        }).error(function (result) {
        });

        akow_Authentication_HttpGet($http, SAMWebApiUrl + 'Customer/GetDDLStatus').success(function (result) {
            if (result != null) {
                $scope.StatusList = result.Data;
            } else {
                $scope.StatusList = null;
            }
        }).error(function (result) {
        });
      
        $scope.CustomerLocation_Load = function () { 

            $scope.CustomerLocation_EditContactID = parameter.CusLocation_DataItem.ContactID;
            $scope.CustomerLocation_EditLocationName = parameter.CusLocation_DataItem.Name;
            $scope.CustomerLocation_EditAddressLineOne = parameter.CusLocation_DataItem.AddressLineOne;
            $scope.CustomerLocation_EditAddressLineTwo = parameter.CusLocation_DataItem.AddressLineTwo;
            $scope.CustomerLocation_EditProvince = parameter.CusLocation_DataItem.ProvinceID;

            $scope.CustomerLocation_EditDistrict = parameter.CusLocation_DataItem.DistrictID;

            $scope.CustomerLocation_EditPostCode = parameter.CusLocation_DataItem.PostCode;
            $scope.CustomerLocation_EditPhone = parameter.CusLocation_DataItem.Phone;
            $scope.CustomerLocation_EditFax = parameter.CusLocation_DataItem.Fax;
            $scope.CustomerLocation_EditGpsLocation = parameter.CusLocation_DataItem.GpsLocation;

            //$("#CusLocation_EditZone").val(parameter.CusLocation_DataItem.ZoneID);
            $scope.CustomerLocation_EditZone = parameter.CusLocation_DataItem.ZoneID;

            $scope.CustomerLocation_EditDefalutLocation = parameter.CusLocation_DataItem.DefalutLocation;
            $scope.CustomerLocation_EditBillingLocation = parameter.CusLocation_DataItem.BillingLocation;
            $scope.CustomerLocation_EditProjectSite = parameter.CusLocation_DataItem.ProjectSite;
            $scope.CustomerLocation_EditAssetLocation = parameter.CusLocation_DataItem.AssetLocation;
            $scope.CustomerLocation_EditOtherLocation = parameter.CusLocation_DataItem.OtherLocation;
            $scope.CustomerLocation_EditDescription = parameter.CusLocation_DataItem.Remark;

            $scope.CustomerLocation_EditStatus = parameter.CusLocation_DataItem.Status;

            $scope.CustomerLocation_EditContactName = parameter.CusLocation_DataItem.ContactName;
            $scope.CustomerLocation_EditContactPhone = parameter.CusLocation_DataItem.ContactPhone;

            closeLoadingProgress();
        }

        $scope.CustomerLocation_PopupContactName = function () {
            var modalInstance = $modal.open({
                templateUrl: WebMvcUrl
                              + 'Popup/SearchCustomerContactModal',
                controller: 'SearchCustomerContactModalController',
                size: 'lg',
                backdrop: false,
                animation: true,
                resolve: {
                    parameter: function () {
                        return CustomerLocation_Model = {
                            CustomerID: parameter.Customer_DataItem.ID,
                            CustomerCode: parameter.Customer_DataItem.Code,
                            CustomerName: parameter.Customer_DataItem.Name
                        };
                    }
                }
            });
            $scope.CustomerLocation_Model = {};

            modalInstance.result
                    .then(
                            function (ret) {
                                $scope.CustomerLocation_Model = ret;
                                $scope.CustomerLocation_EditContactID = $scope.CustomerLocation_Model.ContactID;
                                $scope.CustomerLocation_EditContactName = $scope.CustomerLocation_Model.ContactName;
                                $scope.CustomerLocation_EditContactPhone = $scope.CustomerLocation_Model.Phone;
                            }, function () {
                                // 
                            });
        };

        $scope.CustomerLocation_Close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.CustomerLocation_Edit = function () {

            if ($scope.Customer_EditJuristicTypeID == CUSTOMER_JURISTIC_TYPE.Organization) {
                var rejectItem = [];
                rejectItem.push({ Customer_EditFirstName: null });
                rejectItem.push({ Customer_EditLastName: null });
                var originalColor = [];
                originalColor.push({ Customer_EditFirstName: COLOR_CODE.WHITE_SMOKE });
                originalColor.push({ Customer_EditLastName: COLOR_CODE.WHITE_SMOKE });
                originalColor.push({ Customer_EditRegisterDate: COLOR_CODE.WHITE_SMOKE });

                if (!akow_Validate_ValidateInput_ItemCancel(rejectItem, originalColor)) {
                    return false;
                }
            }
            else {
                var rejectItem = [];
                var originalColor = [];

                if (!akow_Validate_ValidateInput_ItemCancel(rejectItem, originalColor)) {
                    return false;
                }
            }

            var CusLocationData = {
                ID: $scope.CustomerLocationID,
                CustomerID: $scope.CustomerID,
                ContactID: $scope.CustomerLocation_EditContactID,
                Name: $scope.CustomerLocation_EditLocationName,
                AddressLineOne: $scope.CustomerLocation_EditAddressLineOne,
                AddressLineTwo: $scope.CustomerLocation_EditAddressLineTwo,
                DistrictID: $scope.CustomerLocation_EditDistrict,
                ProvinceID: $scope.CustomerLocation_EditProvince,
                PostCode: $scope.CustomerLocation_EditPostCode,
                Phone: $scope.CustomerLocation_EditPhone,
                Fax: $scope.CustomerLocation_EditFax,
                GpsLocation: $scope.CustomerLocation_EditGpsLocation,

                ZoneID: $scope.CustomerLocation_EditZone, //$("#CusLocation_EditZone").val(),

                DefalutLocation: $scope.CustomerLocation_EditDefalutLocation,
                BillingLocation: $scope.CustomerLocation_EditBillingLocation,
                ProjectSite: $scope.CustomerLocation_EditProjectSite,
                AssetLocation: $scope.CustomerLocation_EditAssetLocation,
                OtherLocation: $scope.CustomerLocation_EditOtherLocation,
                Remark: $scope.CustomerLocation_EditDescription,

                Status: $('input[name=status]:checked').val(),//$scope.CustomerLocation_EditStatus,

                CreatedBy: parameter.SysUserID,
                UpdatedBy: parameter.SysUserID
            };

            akow_Authentication_HttpPostL($http, SAMWebApiUrl + 'CustomerLocation/Put', CusLocationData).success(function (response, status, headers, config) {
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
});
