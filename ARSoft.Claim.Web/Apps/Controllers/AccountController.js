// *** Update by : Jirawat Pipaipaisan ***
// *** Update Date : 16/10/2015 17:00  ***

var apiPath = $("#hdWebApiUrl").val();
var urlWeb = $("#hdWebMvcUrl").val();
var hdUserID = $("#hdUserID").val();

var ARSoft_Claim_Web = angular.module("Account", ['kendo.directives', 'ui.bootstrap'])

//ARSoft_AProject_Web.factory('signalRHubProxy', ['$rootScope', signalRHubProxy]);

ARSoft_Claim_Web.controller("AccountController", function ($scope, $http, $window, config, $modal, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {

    //var clientPushHubProxy = signalRHubProxy(
    //signalRHubProxy.defaultServer, 'JobHub',
    //    { logging: true });

    //clientPushHubProxy.on('GetDDLBankList', function (Data) {
    //    $scope.ListJob = Data;
    //    var x = clientPushHubProxy.connection.id;

    //    $scope.source = new kendo.data.DataSource({
    //        data: Data,
    //        pageSize: 5
    //    });
    //});

    //$scope.Job_Select = function (ListJob) {
    //    akow_Messagebox_Msgbox('ดูรายการงานของ : ' + ListJob.Name, MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, null, null);
    //}

    //$scope.Job_SeeAll = function () {
    //    akow_Messagebox_Msgbox('ดูรายการงานทั้งหมด', MESSAGE_BOX_TITLE.RESULT, BUTTON_MODE.OK, ICONS_MODE.INFORMATION, null, null);
    //}

        $scope.AboutPopup = function () {
            $('#frmEditProjectModal').modal('hide');
            var modalInstance = $modal.open({
                templateUrl: urlWeb
                            + 'Login/About',
                controller: 'AccountModalController',
                size: 'md',
                backdrop: false,
                animation: true,
                resolve: {
                    parameter: function () {
                        return model = {
                           
                        };
                    }
                }
            });

           
        };

        $scope.logout = function () {

            akow_Messagebox_Msgbox('ท่านต้องการออกจากระบบใช่หรือไม่?', MESSAGE_BOX_TITLE.CONFIRM, BUTTON_MODE.YES_NO, ICONS_MODE.QUESTION, function () { $window.location.href = '/Login/Logout'; }, null);

            return false;
        }

        $scope.ChangePasswordPopup = function () {
            var modalInstance = $modal.open({
                templateUrl: urlWeb
                            + 'Login/ChangePassword',
                controller: 'AccountModalController',
                size: 'md',
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
                            function (result) {
                            }, function () {

                            });
        };

        var msgList = sessionStorage.getItem('messageManagement');
        if (msgList == null || msgList == '' || msgList == 'undefined') {
            $http.post(urlWeb + 'Login/GetMessageAlertList', { headers: { 'Content-Type': 'application/json' } })
            .success(function (result, status, headers, config) {
                sessionStorage.setItem('messageManagement', result.Data);
            }).error(function (result, status, headers, config) {
            // Error
            });
        }

});

ARSoft_Claim_Web.controller("AccountModalController", function ($scope, $http, config, $modalInstance, parameter, $modal, $q) {

     $scope.save = function () {

        $("#divMessage").html("");

        if (akow_Validate_ValidateInput()) {
            var message = '';
            if ($scope.NewPassword != $scope.ConfirmPassword) {
                message += 'Password does not match.';
                $("#divMessage").append(message);
                return false;
            }
         

            updatePassword();
            //$modalInstance.close();
        }
        
    };


    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
    function updatePassword() {
        var AccountModel = {
            "UserID": hdUserID,
            "CurrentPassword": $scope.CurrentPassword,
            "NewPassword": $scope.NewPassword,
            "ConfirmPassword": $scope.ConfirmPassword
        };

        akow_Authentication_HttpPut($http, apiPath + "Account/ChangePassword", AccountModel).success(function (data, status, headers, config) {
            if (data.Successfully) {
                akow_Messagebox_Msgbox("แก้ไขข้อมูลเรียบร้อยแล้ว", '', 1, 'info', function () { $modalInstance.close(); });
            }
            else {
                $modalInstance.close();
            }

        }).error(function (data, status, headers, config) {
            $modalInstance.close();
        });

    }

});
ARSoft_Claim_Web.controller("DefaultIndexController", function ($scope, $http, $window, config, $modal, ICONS_MODE, BUTTON_MODE, MESSAGE_BOX_TITLE) {


});

