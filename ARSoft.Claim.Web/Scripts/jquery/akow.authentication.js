// *** Update by : Pongthorn Paemanee ***
// *** Update Date : 13/10/2015 16:00  ***

var LastestURL = " ";
var gCcInvalid = "#FA5858";
var gCcWhite = "#ffffff";
var gCcBlack = "#000000";
var gCcWhiteSmoke = "whitesmoke";

function createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function replaceAll(originalString, replacePatthern, replaceStr) {
    if (!originalString) {
        return ''; 
    }

    var returnValue = originalString;

    while (returnValue.search(replacePatthern) != -1) {
        returnValue = returnValue.replace(replacePatthern, replaceStr);
    }

    return returnValue;

}

function getToken() {
    var TokenCookieName = $("#hdTokenCookieName").val();
    var Padding1CookieName = $("#hdPadding1CookieName").val();
    var Padding2CookieName = $("#hdPadding2CookieName").val();

    var TokenCookie = readCookie(TokenCookieName);
    var Padding1Cookie = readCookie(Padding1CookieName);
    var Padding2Cookie = readCookie(Padding2CookieName);

    TokenCookie = replaceAll(TokenCookie, '%22', '');
    TokenCookie = replaceAll(TokenCookie, '%2F', '/');
    Padding1Cookie = replaceAll(Padding1Cookie, '%22', '');
    Padding2Cookie = replaceAll(Padding2Cookie, '%22', '');

    TokenCookie = replaceAll(TokenCookie, '%2B', '+');
    Padding1Cookie = replaceAll(Padding1Cookie, '%2B', '+');
    Padding2Cookie = replaceAll(Padding2Cookie, '%2B', '+');

    TokenCookie = replaceAll(TokenCookie, Padding1Cookie, '');
    TokenCookie = replaceAll(TokenCookie, Padding2Cookie, '');

    return TokenCookie;
}

function disabledButtonByClassName(className) {
    $("." + className).prop("readonly", true);

    $("." + className + ".btn-default").addClass("btn-default-mark");
    $("." + className + ".btn-default").removeClass("btn-default");

    $("." + className + ".btn-primary").addClass("btn-primary-mark");
    $("." + className + ".btn-primary").removeClass("btn-primary");

    $("." + className + ".btn-success").addClass("btn-success-mark");
    $("." + className + ".btn-success").removeClass("btn-success");

    $("." + className + ".btn-info").addClass("btn-info-mark");
    $("." + className + ".btn-info").removeClass("btn-info");

    $("." + className + ".btn-warning").addClass("btn-warning-mark");
    $("." + className + ".btn-warning").removeClass("btn-warning");

    $("." + className + ".btn-danger").addClass("btn-danger-mark");
    $("." + className + ".btn-danger").removeClass("btn-danger");

    $("." + className + ".btn-link").addClass("btn-link-mark");
    $("." + className + ".btn-link").removeClass("btn-link");

    $("." + className).addClass("akow-disabled");
    $("." + className).prop('disabled', 'disabled');
}

function disabledButtonByClassNameScope(className, ctrlScope) {
    ctrlScope.find("." + className).prop("readonly", true);

    ctrlScope.find("." + className + ".btn-default").addClass("btn-default-mark");
    ctrlScope.find("." + className + ".btn-default").removeClass("btn-default");

    ctrlScope.find("." + className + ".btn-primary").addClass("btn-primary-mark");
    ctrlScope.find("." + className + ".btn-primary").removeClass("btn-primary");

    ctrlScope.find("." + className + ".btn-success").addClass("btn-success-mark");
    ctrlScope.find("." + className + ".btn-success").removeClass("btn-success");

    ctrlScope.find("." + className + ".btn-info").addClass("btn-info-mark");
    ctrlScope.find("." + className + ".btn-info").removeClass("btn-info");

    ctrlScope.find("." + className + ".btn-warning").addClass("btn-warning-mark");
    ctrlScope.find("." + className + ".btn-warning").removeClass("btn-warning");

    ctrlScope.find("." + className + ".btn-danger").addClass("btn-danger-mark");
    ctrlScope.find("." + className + ".btn-danger").removeClass("btn-danger");

    ctrlScope.find("." + className + ".btn-link").addClass("btn-link-mark");
    ctrlScope.find("." + className + ".btn-link").removeClass("btn-link");

    ctrlScope.find("." + className).addClass("akow-disabled");
    ctrlScope.find("." + className).prop('disabled', 'disabled');
    ctrlScope.find("." + className).css('pointer-events', 'none');
}

function enabledButtonByClassName(className) {
    $("." + className).prop("readonly", true);

    $("." + className + ".btn-default-mark").addClass("btn-default");
    $("." + className + ".btn-default-mark").removeClass("btn-default-mark");

    $("." + className + ".btn-primary-mark").addClass("btn-primary");
    $("." + className + ".btn-primary-mark").removeClass("btn-primary-mark");

    $("." + className + ".btn-success-mark").addClass("btn-success");
    $("." + className + ".btn-success-mark").removeClass("btn-success-mark");

    $("." + className + ".btn-info-mark").addClass("btn-info");
    $("." + className + ".btn-info-mark").removeClass("btn-info-mark");

    $("." + className + ".btn-warning-mark").addClass("btn-warning");
    $("." + className + ".btn-warning-mark").removeClass("btn-warning-mark");

    $("." + className + ".btn-danger-mark").addClass("btn-danger");
    $("." + className + ".btn-danger-mark").removeClass("btn-danger-mark");

    $("." + className + ".btn-link-mark").addClass("btn-link");
    $("." + className + ".btn-link-mark").removeClass("btn-link-mark");

    $("." + className).removeClass("akow-disabled");
    $("." + className).prop('disabled', null);
}

function manageWebApiHashTableData(data) {

    //   Normal = 0,
    //   InvalidToken = -1,
    //   InternalException = -2,
    //   NonReferenceData = -3,
    //   DBConstraint = -4


    //akow_Messagebox_Msgbox(text, caption, buttonmode, iconmode, okButtonLable, cancelButtonLable, okInvokeFunction, cancelInvokeFunction)

    if (!data) {
        akow_Messagebox_Msgbox("Null Result from [" + LastestURL + "]", null, 1, 'error', function () { window.location = '../Login/Logout' });
    }

    //   InvalidToken = -1,
    if (data.ResultType == -1) {
        akow_Messagebox_Msgbox("Invalid Token", null, 1, 'error', function () { window.location = '../Login/Logout' });
        return
    }

    //   InternalException = -2,
    if (data.ResultType == -2) {

        akow_Messagebox_Msgbox(data.Message, null, 1, 'error');

        return
    }

    //   NonReferenceData = -3,
    if (data.ResultType == -3) {
        akow_Messagebox_Msgbox(data.Message, null, 1, 'info');
        return
    }

    //   DBConstraint = -4
    if (data.ResultType == -4) {
        akow_Messagebox_Msgbox(data.Message, null, 1, 'error');
        return
    }

    //   ???? = -5
    if (data.ResultType == -5) {
        akow_Messagebox_Msgbox(data.Message, null, 1, 'warning');
        return
    }


}

function setCookie(name, value) {
    var today = new Date();
    var days = 1;
    var expiry = new Date(today.getTime() + days * 24 * 3600 * 1000);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString();
}

function deleteCookie(name) {
    var expired = new Date(today.getTime() - 24 * 3600 * 1000);
    document.cookie = name + "=null; path=/; expires=" + expired.toGMTString();
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

//  GET  ///////////////////////////////////////////
function akow_Authentication_HttpGet($http, path) {
    LastestURL = path;
    var Token = getToken();
    return $http.get(path, { headers: { 'Token': Token } })
        .success
        (
           function (data) {
               manageWebApiHashTableData(data);

           }

        );
}

function akow_Authentication_HttpGetL($http, path) {

    $(".overlay").css("display", "block");
    $(".mainT-table").css("display", "none");
    var promiss = akow_Authentication_HttpGet($http, path)
        .success
        (
                function (data, status, headers, config) {
                    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
                    setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                }
        )
        .error
        (
                 function (data, status, headers, config) {
                     setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
                     setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                 }
        );

    return promiss;

}

function akow_Authentication_HttpGetL2($http, path) {

    $(".overlay2").css("display", "block");
    //$(".mainT-table").css("display", "none");
    var promiss = akow_Authentication_HttpGet($http, path)
        .success
        (
                function (data, status, headers, config) {
                    setTimeout(function () { $(".overlay2").fadeOut(100); }, 100);
                    setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                }
        )
        .error
        (
                 function (data, status, headers, config) {
                     setTimeout(function () { $(".overlay2").fadeOut(100); }, 100);
                     setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                 }
        );

    return promiss;

}
/////////////////////////////////////////////

//  Delete  ///////////////////////////////////////////
function akow_Authentication_HttpDelete($http, path) {
    LastestURL = path;
    var Token = getToken();
    return $http.delete(path, { headers: { 'Token': Token } })
        .success
        (
           function (data) {
               manageWebApiHashTableData(data);
           }

        );
}

function akow_Authentication_HttpDeleteL($http, path) {

    $(".overlay").css("display", "block");
    $(".mainT-table").css("display", "none");
    var promiss = akow_Authentication_HttpDelete($http, path)
        .success
        (
                function (data, status, headers, config) {
                    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
                    setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                }
        )
        .error
        (
                 function (data, status, headers, config) {
                     setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
                     setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                 }
        );

    return promiss;

}

function akow_Authentication_HttpDeleteL2($http, path) {

    $(".overlay2").css("display", "block");
    //$(".mainT-table").css("display", "none");
    var promiss = akow_Authentication_HttpDelete($http, path)
        .success
        (
                function (data, status, headers, config) {
                    setTimeout(function () { $(".overlay2").fadeOut(100); }, 100);
                    setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                }
        )
        .error
        (
                 function (data, status, headers, config) {
                     setTimeout(function () { $(".overlay2").fadeOut(100); }, 100);
                     setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                 }
        );

    return promiss;

}
/////////////////////////////////////////////

//  Head ///////////////////////////////////////////
function akow_Authentication_HttpHead($http, path) {
    LastestURL = path;
    var Token = getToken();
    return $http.head(path, { headers: { 'Token': Token } })
        .success
        (
           function (data) {
               manageWebApiHashTableData(data);
           }

        );
}

function akow_Authentication_HttpHeadL($http, path) {

    $(".overlay").css("display", "block");
    $(".mainT-table").css("display", "none");
    var promiss = akow_Authentication_HttpHead($http, path)
        .success
        (
                function (data, status, headers, config) {
                    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
                    setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                }
        )
        .error
        (
                 function (data, status, headers, config) {
                     setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
                     setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                 }
        );

    return promiss;

}

function akow_Authentication_HttpHeadL2($http, path) {

    $(".overlay2").css("display", "block");
    //$(".mainT-table").css("display", "none");
    var promiss = akow_Authentication_HttpHead($http, path)
        .success
        (
                function (data, status, headers, config) {
                    setTimeout(function () { $(".overlay2").fadeOut(100); }, 100);
                    setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                }
        )
        .error
        (
                 function (data, status, headers, config) {
                     setTimeout(function () { $(".overlay2").fadeOut(100); }, 100);
                     setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                 }
        );

    return promiss;

}
/////////////////////////////////////////////

//  Jsonp ///////////////////////////////////////////
function akow_Authentication_HttpJsonp($http, path) {
    LastestURL = path;
    var Token = getToken();
    return $http.jsonp(path, { headers: { 'Token': Token } })
        .success
        (
           function (data) {
               manageWebApiHashTableData(data);
           }

        );
}

function akow_Authentication_HttpJsonpL($http, path) {

    $(".overlay").css("display", "block");
    $(".mainT-table").css("display", "none");
    var promiss = akow_Authentication_HttpJsonp($http, path)
        .success
        (
                function (data, status, headers, config) {
                    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
                    setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                }
        )
        .error
        (
                 function (data, status, headers, config) {
                     setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
                     setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                 }
        );

    return promiss;

}

function akow_Authentication_HttpJsonpL2($http, path) {

    $(".overlay2").css("display", "block");
    //$(".mainT-table").css("display", "none");
    var promiss = akow_Authentication_HttpJsonp($http, path)
        .success
        (
                function (data, status, headers, config) {
                    setTimeout(function () { $(".overlay2").fadeOut(100); }, 100);
                    setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                }
        )
        .error
        (
                 function (data, status, headers, config) {
                     setTimeout(function () { $(".overlay2").fadeOut(100); }, 100);
                     setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                 }
        );

    return promiss;

}
/////////////////////////////////////////////


//  POST  ///////////////////////////////////////////
function akow_Authentication_HttpPost($http, path, dataObj) {

    LastestURL = path;
    var Token = getToken();
    return $http.post(path, dataObj, { headers: { 'Token': Token } })
        .success
        (
           function (data) {
               manageWebApiHashTableData(data);
           }

        );

}

function akow_Authentication_HttpPostL($http, path, dataObj) {

    $(".overlay").css("display", "block");
    $(".mainT-table").css("display", "none");
    var promiss = akow_Authentication_HttpPost($http, path, dataObj)
        .success
        (
                function (data, status, headers, config) {
                    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
                    setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                }
        )
        .error
        (
                 function (data, status, headers, config) {
                     setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
                     setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                 }
        );

    return promiss;
}

function akow_Authentication_HttpPostL2($http, path, dataObj) {

    $(".overlay2").css("display", "block");
    //$(".mainT-table").css("display", "none");
    var promiss = akow_Authentication_HttpPost($http, path, dataObj)
        .success
        (
                function (data, status, headers, config) {
                    setTimeout(function () { $(".overlay2").fadeOut(100); }, 100);
                    setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                }
        )
        .error
        (
                 function (data, status, headers, config) {
                     setTimeout(function () { $(".overlay2").fadeOut(100); }, 100);
                     setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                 }
        );

    return promiss;

}
/////////////////////////////////////////////


//  PUT ///////////////////////////////////////////
function akow_Authentication_HttpPut($http, path, dataObj) {
    var Token = getToken();
    return $http.put(path, dataObj, { headers: { 'Token': Token } }).success
        (
           function (data) {
               manageWebApiHashTableData(data);
           }

        );
}

function akow_Authentication_HttpPutL($http, path, dataObj) {

    $(".overlay").css("display", "block");
    $(".mainT-table").css("display", "none");
    var promiss = akow_Authentication_HttpPut($http, path, dataObj)
        .success
        (
                function (data, status, headers, config) {
                    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
                    setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                }
        )
        .error
        (
                 function (data, status, headers, config) {
                     setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
                     setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                 }
        );

    return promiss;
}

function akow_Authentication_HttpPutL2($http, path, dataObj) {

    $(".overlay2").css("display", "block");
    //$(".mainT-table").css("display", "none");
    var promiss = akow_Authentication_HttpPut($http, path, dataObj)
        .success
        (
                function (data, status, headers, config) {
                    setTimeout(function () { $(".overlay2").fadeOut(100); }, 100);
                    setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                }
        )
        .error
        (
                 function (data, status, headers, config) {
                     setTimeout(function () { $(".overlay2").fadeOut(100); }, 100);
                     setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                 }
        );

    return promiss;

}
/////////////////////////////////////////////


//  Patch  ///////////////////////////////////////////
function akow_Authentication_HttpPatch($http, path, dataObj) {
    var Token = getToken();
    return $http.patch(path, dataObj, { headers: { 'Token': Token } }).success
        (
           function (data) {
               manageWebApiHashTableData(data);
           }

        );
}

function akow_Authentication_HttpPatchL($http, path, dataObj) {

    $(".overlay").css("display", "block");
    $(".mainT-table").css("display", "none");
    var promiss = akow_Authentication_HttpPatch($http, path, dataObj)
        .success
        (
                function (data, status, headers, config) {
                    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
                    setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                }
        )
        .error
        (
                 function (data, status, headers, config) {
                     setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
                     setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                 }
        );

    return promiss;
}

function akow_Authentication_HttpPatchL2($http, path, dataObj) {

    $(".overlay2").css("display", "block");
    //$(".mainT-table").css("display", "none");
    var promiss = akow_Authentication_HttpPatch($http, path, dataObj)
        .success
        (
                function (data, status, headers, config) {
                    setTimeout(function () { $(".overlay2").fadeOut(100); }, 100);
                    setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                }
        )
        .error
        (
                 function (data, status, headers, config) {
                     setTimeout(function () { $(".overlay2").fadeOut(100); }, 100);
                     setTimeout(function () { $(".mainT-table").css("display", "block"); }, 100);
                 }
        );

    return promiss;

}
/////////////////////////////////////////////


function akow_Authentication_CheckPermission($http, directOpenLoadingProgress, directCloseLoadingProgress) {

    var userName = $("#hdUserName").val();
    //var url = replaceAll(document.URL, '/', '_')
    var MvcUrl = $("#hdWebMvcUrl").val();
    var url = replaceAll(window.location.href, MvcUrl, '');
    var apiPath = $("#hdWebApiUrl").val();
    
    var canAdd = false;
    var canEdit = false;
    var canDelete = false
    var canView = false;

    //var canAdd = true;
    //var canEdit = true;
    //var canDelete = true
    //var canView = true;

    if (directOpenLoadingProgress == true) {
        $(".overlay").css("display", "block");
    }
    
    if (directCloseLoadingProgress == false || directCloseLoadingProgress == null || directCloseLoadingProgress == 'undefined') {

        akow_Authentication_HttpGet($http, apiPath + "UserControl/CheckPermission?userName=" + userName + "&url=" + url)
        .success(function (data) {
            if (data) {
                if (data.Data) {
                    if (data.Data.Search == true) {
                        if (data.Data.Add == true)
                            canAdd = true;

                        if (data.Data.Edit == true)
                            canEdit = true;

                        if (data.Data.Delete == true)
                            canDelete = true;

                        if (data.Data.View == true)
                            canView = true;
                    }
                }
            }

            if (canAdd == false) {
                disabledButtonByClassName("akow-addbutton");
            }

            if (canEdit == false) {
                disabledButtonByClassName("akow-savebutton");
                disabledButtonByClassName("akow-editbutton");
                $(".form-control").prop("readonly", true);

                //$("input[type=checkbox]").each(function () {
                //    $(this).prop("disabled", true);
                //});

                //$("input[type=radio]").each(function () {
                //    $(this).prop("disabled", true);
                //});
            }

            if (canDelete == false) {
                disabledButtonByClassName("akow-deletebutton");
            }

            if (canView == false) {
                disabledButtonByClassName("akow-viewbutton");
            }
        });

    }
    else {
        akow_Authentication_HttpGet($http, apiPath + "UserControl/CheckPermission?userName=" + userName + "&url=" + url)
        .success(function (data) {
            if (data) {
                if (data.Data) {
                    if (data.Data.Search == true) {
                        if (data.Data.Add == true)
                            canAdd = true;

                        if (data.Data.Edit == true)
                            canEdit = true;

                        if (data.Data.Delete == true)
                            canDelete = true;

                        if (data.Data.View == true)
                            canView = true;
                    }
                }
            }

            if (canAdd == false) {
                disabledButtonByClassName("akow-addbutton");
            }

            if (canEdit == false) {
                disabledButtonByClassName("akow-savebutton");
                disabledButtonByClassName("akow-editbutton");
                $(".form-control").prop("readonly", true);

                //$("input[type=checkbox]").each(function () {
                //    $(this).prop("disabled", true);
                //});

                //$("input[type=radio]").each(function () {
                //    $(this).prop("disabled", true);
                //});
            }

            if (canDelete == false) {
                disabledButtonByClassName("akow-deletebutton");
            }

            if (canView == false) {
                disabledButtonByClassName("akow-viewbutton");
            }

            setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
        })
        .error(function (data) {
            setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
        });
    }
}

function akow_Authentication_SaveTokenSession(AccessToken, $cookieStore) {
    var guid1 = createGuid();
    var guid2 = createGuid();

    var sessionPadding1Len = Math.random() * 10 + 4;
    var sessionPadding1 = guid1.substring(0, sessionPadding1Len);

    var sessionPadding2Len = Math.random() * 10 + 4;
    var sessionPadding2 = guid2.substring(0, sessionPadding2Len);

    var fullPaddingToken = sessionPadding1 + AccessToken + sessionPadding2;

    //alert(AccessToken);
    //alert(fullPaddingToken);

    $cookieStore.put($("#hdTokenCookieName").val(), fullPaddingToken);
    $cookieStore.put($("#hdPadding1CookieName").val(), sessionPadding1);
    $cookieStore.put($("#hdPadding2CookieName").val(), sessionPadding2);
}

function akow_Authentication_DisableAll($http) {

    var userName = $("#hdUserName").val();
    var url = replaceAll(document.URL, '/', '_')
    var apiPath = $("#hdWebApiUrl").val();


    disabledButtonByClassName("akow-addbutton");
    disabledButtonByClassName("akow-savebutton");
    disabledButtonByClassName("akow-editbutton");
    disabledButtonByClassName("akow-deletebutton");
    disabledButtonByClassName("akow-viewbutton");
    //$(".form-control").prop("readonly", true);

    $(".form-control").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", true);
        }
        else {
            $(this).prop("readonly", true);
        }
    });

    $(".akow-form-control").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", true);
        }
        else {
            $(this).prop("readonly", true);
        }
    });

    $(".akow-form-control2").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", true);
        }
        else {
            $(this).prop("readonly", true);
        }
    });

    $(".akow-form-control-disabled").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", true);
        }
        else {
            $(this).prop("readonly", true);
        }
    });

    $(".akow-control-textbox-disabled").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", true);
        }
        else {
            $(this).prop("readonly", true);
        }
    });

    $(".akow-control-textbox-real-number-disabled").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", true);
        }
        else {
            $(this).prop("readonly", true);
        }
    });

    $(".akow-control-textbox-number-disabled").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", true);
        }
        else {
            $(this).prop("readonly", true);
        }
    });

    $(".akow-control-dropdownlist-disabled").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", true);
        }
        else {
            $(this).prop("readonly", true);
        }
    });

    $("input[type=checkbox]").each(function () {
        $(this).prop("disabled", true);
    });

    $("input[type=radio]").each(function () {
        $(this).prop("disabled", true);
    });

    $(".btn.btn-default").each(function () {
        if ($(this).find(".glyphicon.glyphicon-search").length > 0) {
            $(this).prop("readonly", true);

            $(this).addClass("btn-default-mark");
            $(this).removeClass("btn-default");

            $(this).addClass("akow-disabled");
            $(this).prop('disabled', 'disabled');
        }
    });
}

function akow_Authentication_EnableAll($http) {

    var userName = $("#hdUserName").val();
    var url = replaceAll(document.URL, '/', '_')
    var apiPath = $("#hdWebApiUrl").val();


    enabledButtonByClassName("akow-addbutton");
    enabledButtonByClassName("akow-savebutton");
    enabledButtonByClassName("akow-editbutton");
    enabledButtonByClassName("akow-deletebutton");
    enabledButtonByClassName("akow-viewbutton");

    //$(".form-control").prop("readonly", false);

    $(".form-control").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", false);
        }
        else {
            $(this).prop("readonly", false);
        }
    });

    $(".akow-form-control").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", false);
        }
        else {
            $(this).prop("readonly", false);
        }
    });

    $(".akow-form-control2").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", false);
        }
        else {
            $(this).prop("readonly", false);
        }
    });

    $(".akow-form-control-disabled").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", false);
        }
        else {
            $(this).prop("readonly", false);
        }
    });

    $(".akow-control-textbox-disabled").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", false);
        }
        else {
            $(this).prop("readonly", false);
        }
    });

    $(".akow-control-textbox-real-number-disabled").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", false);
        }
        else {
            $(this).prop("readonly", false);
        }
    });

    $(".akow-control-textbox-number-disabled").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", false);
        }
        else {
            $(this).prop("readonly", false);
        }
    });

    $(".akow-control-dropdownlist-disabled").each(function () {

        if ($(this).is("select")) {
            $(this).prop("disabled", false);
        }
        else {
            $(this).prop("readonly", false);
        }
    });

    $("input[type=checkbox]").each(function () {
        $(this).prop("disabled", false);
    });

    $("input[type=radio]").each(function () {
        $(this).prop("disabled", false);
    });

    $(".btn.btn-default").each(function () {
        if ($(this).find(".glyphicon.glyphicon-search").length > 0) {
            $(this).prop("readonly", false);

            $(this).addClass("btn-default");
            $(this).removeClass("btn-default-mark");

            $(this).removeClass("akow-disabled");
            $(this).prop('disabled', null);
        }
    });

    $(".btn-default-mark").each(function () {
        if ($(this).find(".glyphicon.glyphicon-search").length > 0) {
            $(this).prop("readonly", false);

            $(this).addClass("btn-default");
            $(this).removeClass("btn-default-mark");

            $(this).removeClass("akow-disabled");
            $(this).prop('disabled', null);
        }
    });
}

function akow_Authentication_DisableAllByScope($http, ctrlScope) {

    //var userName = $("#hdUserName").val();
    //var url = replaceAll(document.URL, '/', '_')
    //var apiPath = $("#hdWebApiUrl").val();

    if (ctrlScope == null || ctrlScope == 'undefined')
    {
        ctrlScope = $("*");
    }
    else
    {
        ctrlScope.attr("disabled", "disabled");
        ctrlScope.prop("readonly", true);
        ctrlScope.css('pointer-events', 'none');
    }

    disabledButtonByClassNameScope("akow-addbutton", ctrlScope);
    disabledButtonByClassNameScope("akow-savebutton", ctrlScope);
    disabledButtonByClassNameScope("akow-editbutton", ctrlScope);
    disabledButtonByClassNameScope("akow-deletebutton", ctrlScope);
    disabledButtonByClassNameScope("akow-viewbutton", ctrlScope);

    ctrlScope.find("button").each(function () {
        $(this).css('pointer-events', 'none');

        if ($(this)[0].firstChild != null &&
            $(this)[0].firstChild.className != null &&
            $(this)[0].firstChild.className == 'glyphicon glyphicon-search')
        {
            $(this).css("background-color", gCcWhite);
            $(this).css("opacity", ".65");
        }
        else
        {
            $(this).css("opacity", ".65");
        }
    });

    ctrlScope.find("input[type=text]").each(function () {
        $(this).css("background-color", gCcWhiteSmoke);

        $(this).addClass("k-state-disabled");
        $(this).removeClass("k-state-default");

        $(this).css('pointer-events', 'none');
    });

    //ctrlScope.find("textarea").each(function () {

    //});

    ctrlScope.find(".k-numeric-wrap").each(function () {
        $(this).addClass("k-state-disabled");
        $(this).removeClass("k-state-default");
        $(this).css('pointer-events', 'none');
    });

    ctrlScope.find("a.k-i-close").each(function () {
        //$(this).removeClass("k-i-close");
        //$(this).removeClass("k-icon");
        $(this).css('pointer-events', 'none');
    });

    ctrlScope.find("select").each(function () {
        $(this).css("background-color", gCcWhiteSmoke).off('click');
        $(this).css('pointer-events', 'none');
    });
}

function akow_Authentication_DisableByID(nameID) {
    $("#" + nameID + " *").attr("disabled", "disabled").off('click');
}

function akow_Authentication_EnableByID(nameID) {
    $("#" + nameID + " *").removeAttr('disabled');
}

function akow_Authentication_Component($http,Mode) {
    var fcode = $('#hdWebFunctionCode').val();
    var userID = $('#hdUserID').val();
    $http.post(WebMvcUrl + 'Common/GetPermissionComponent?UserID=' + userID + '&FunctionCode=' + fcode).success(function (resultQuery, status, headers, config) {
        resultQuery.Data.forEach(function (entry) {

            if (entry.PermissionName == "Add") {
                if (entry.Allow == false)
                {
                    akow_Authentication_DisableByID(entry.FunctionCode);
                }
            } else if (entry.PermissionName == "Edit") {

                if (entry.Allow == false) {
                    akow_Authentication_DisableByID(entry.FunctionCode);
                }
            }
        });
    }).error(function (result) {
    });
}
