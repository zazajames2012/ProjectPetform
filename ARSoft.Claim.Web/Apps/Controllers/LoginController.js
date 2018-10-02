var url = $("#hdWebApiUrl").val();
var urlWeb = $("#hdWebMvcUrl").val();

//var url = $("#hdSAMWebApiUrl").val();
//var urlWeb = $("#hdWebMvcUrl").val();

angular.module('Authentication', ['ngCookies']).controller('LoginController', function ($scope, $http, $cookieStore) {
    
    $scope.initial = function () {
        var rememberUsername = $cookieStore.get('AKOW_Username');
        var rememberPassword = $cookieStore.get('AKOW_Password');
        var authorizationCodeClient = $cookieStore.get('AKOW_AuthorizationCode');
        if ((authorizationCodeClient != null || authorizationCodeClient != '') && authorizationCodeClient != undefined) {
            $scope.AuthorizationCode = authorizationCodeClient;
            $('#u_username').val(rememberUsername);
            $('#u_pwd').val(rememberPassword);
            $('#remember_me').prop('checked', true);
        } else {
            $('#u_username').val('');
            $('#u_pwd').val('');
            $('#remember_me').prop('checked', false);
        }
    }

    $scope.signIn = function () {
        var pathname = window.location.pathname; // Returns path only
        var clientURL = window.location.href;     // Returns full URL

        $scope.UserID = 0;
        $scope.UserName = $('#u_username').val();
        $scope.Password = $('#u_pwd').val();
        $scope.ApplicationID = 1;
        //$scope.AuthorizationCode = '';
        $scope.IPAddress = '';
        $scope.HttpInfo = clientURL;
        $scope.AccessToken = '';
        $("#divMessage").html("");

        if (($scope.UserName == '' || $scope.Password == '') && $scope.AuthorizationCode == '') {
            var message = '';
            if ($scope.UserName == '' && $scope.Password == '') {
                message = 'Please enter ';
                message += 'user id and password.';
            }
            else {
                message = 'Please enter ';
                if ($scope.UserName == '' && $scope.Password != '') {
                    message += 'user id.';
                } else if ($scope.UserName != '' && $scope.Password == '') {
                    message += 'password.';
                }
            }

            $("#divMessage").append(message);
            return false;
        } else {
            $scope.loading = true;
            var UserAuthorizationModel = {
                ApplicationID: $scope.ApplicationID,
                AuthorizationCode: $scope.AuthorizationCode,
                AccessToken: $scope.AccessToken,
                Username: $scope.UserName,
                Password: $scope.Password,
                IPAddress: $scope.IPAddress,
                HttpInfo: $scope.HttpInfo,
                UserID: $scope.UserID
            };

            $http.post(
                url + 'Authenticator/SignIn',
                JSON.stringify(UserAuthorizationModel),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).success(function (data, status, headers, config) {
                if (data.UserValid && (data.AuthorizationCode != null || data.AuthorizationCode != '')) {
                    var UserAuthorizationModel = {
                        ApplicationID: data.ApplicationID,
                        AuthorizationCode: data.AuthorizationCode,
                        AccessToken: $scope.AccessToken,
                        Username: data.UserName,
                        Password: $scope.Password,
                        IPAddress: $scope.IPAddress,
                        HttpInfo: $scope.HttpInfo,
                        UserID: $scope.UserID
                    };

                    $http.post(
                        url + 'Authenticator/GetAccessToken',
                        JSON.stringify(UserAuthorizationModel),
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    ).success(function (data, status, headers, config) {
                        if (data.UserValid && (data.AccessToken != null || data.AccessToken != '')) {
                            var UserAuthorizationModel = {
                                //ApplicationID: data.ApplicationID,
                                AuthorizationCode: data.AuthorizationCode,
                                AccessToken: data.AccessToken,
                                Username: data.UserName,
                                DisplayName: data.DisplayName,
                                UserID: data.UserID,
                                EmployeeID: data.EmployeeID

                                //Password: data.Password,
                                //IPAddress: data.IPAddress,
                                //HttpInfo: data.HttpInfo                                 
                            };

                            akow_Authentication_SaveTokenSession(data.AccessToken, $cookieStore);

                            $scope.Username = $('#u_username').val();
                            $scope.Password = $('#u_pwd').val();
                            $scope.AuthorizationCode = data.AuthorizationCode;

                            $http.post(
                                urlWeb + 'Login/Login',
                                JSON.stringify(data),
                                {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                            ).success(function (data, status, headers, config) {
                                $scope.loading = false;
                                if (document.getElementById("remember_me").checked) {
                                    $cookieStore.put("AKOW_Username", $scope.Username);
                                    $cookieStore.put("AKOW_Password", $scope.Password);
                                    $cookieStore.put("AKOW_AuthorizationCode", $scope.AuthorizationCode);
                                } else {
                                    $cookieStore.remove("AKOW_Username");
                                    $cookieStore.remove("AKOW_Password");
                                    $cookieStore.remove('AKOW_AuthorizationCode');
                                }

                                window.location = urlWeb + 'Default/Index';
                            }).error(function (data, status, headers, config) {
                                $scope.loading = false;
                                $("#divMessage").append(data.Message);
                            });
                        } else {
                            $scope.loading = false;
                            $("#divMessage").append(data.Message);
                        }
                    }).error(function (data, status, headers, config) {
                        $scope.loading = false;
                        $("#divMessage").append(data.Message);
                    });
                } else {
                    //alert("Else");
                    $scope.loading = false;
                    $("#divMessage").append(data.Message);
                }
            }).error(function (data, status, headers, config) {
                //alert("Error");
                $scope.loading = false;
                $("#divMessage").append(data.Message);
            });
        }
    }






});