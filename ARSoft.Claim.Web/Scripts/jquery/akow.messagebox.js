// Update by : Veerapong Hoewtheerakul
// Update date : 08/10/2015 10:00 
function setIcon(iconmode) {

    $(".akow-msgbox-infoicon").css("display", "none");
    $(".akow-msgbox-questionicon").css("display", "none");
    $(".akow-msgbox-warningicon").css("display", "none");
    $(".akow-msgbox-erroricon").css("display", "none");

    if (!iconmode) {
        $(".akow-msgbox-infoicon").css("display", "block");
        return
    }

    if (iconmode == "info") {
        $(".akow-msgbox-infoicon").css("display", "block");
        return
    }

    if (iconmode == "question") {
        $(".akow-msgbox-questionicon").css("display", "block");
        return
    }

    if (iconmode == "warning") {
        $(".akow-msgbox-warningicon").css("display", "block");
        return
    }

    if (iconmode == "error") {
        $(".akow-msgbox-erroricon").css("display", "block");
        return
    }

    $(".akow-msgbox-infoicon").css("display", "block");

}

function setButton(buttonmode) {

    $(".akow-msgbox-okbutton").text("OK");
    $(".akow-msgbox-cancelbutton").text("Cancel");

    if (buttonmode) {
        if (buttonmode == 1) {
            $(".akow-msgbox-okbutton").show();
            $(".akow-msgbox-cancelbutton").hide();
        }
        else if (buttonmode == 2) {
            $(".akow-msgbox-okbutton").show();
            $(".akow-msgbox-cancelbutton").show();
        }
        else if (buttonmode == 3) {
            $(".akow-msgbox-okbutton").show();
            $(".akow-msgbox-cancelbutton").show();
            $(".akow-msgbox-okbutton").text("Yes");
            $(".akow-msgbox-cancelbutton").text("No");
        }
        else {
            $(".akow-msgbox-okbutton").show();
            $(".akow-msgbox-cancelbutton").hide();
        }
    }
    else {
        $(".akow-msgbox-okbutton").show();
        $(".akow-msgbox-cancelbutton").hide();
    }

}

function initMessageBox(text, caption, buttonmode, iconmode, okButtonLable, cancelButtonLable) {
    $(".akow-msgbox-message").text(text);

    if (caption)
        $(".akow-msgbox-title").text(caption);
    else        
        $(".akow-msgbox-title").text('Claim - Message Box');

    setButton(buttonmode);

    setIcon(iconmode);

    if (okButtonLable)
        $(".akow-msgbox-okbutton").text(okButtonLable);

    if (cancelButtonLable)
        $(".akow-msgbox-cancelbutton").text(cancelButtonLable);

    $(".akow-msgbox-resulthidden").val('');
}

function setOnOkFunction(okInvokeFunction) {

    $(".akow-msgbox-okbutton" + getCount().toString()).unbind();
    //$(".akow-msgbox-okbutton").click(null);

    $(".akow-msgbox-okbutton" + getCount().toString())
     .click(
                    function (e) {
                        //$(".akow-msgbox-msgbox" + getCount().toString()).modal('hide');
                        $(".akow-msgbox-msgbox" + getCount().toString()).css("display", "none");
                        if (okInvokeFunction) {
                            okInvokeFunction();
                        }
                        //decreaseCount(); 
                    }
           )
}

function setOnCancelFunction(cancelInvokeFunction) {
    $(".akow-msgbox-cancelbutton" + getCount().toString()).unbind();
    //$(".akow-msgbox-cancelbutton").click(null);

    $(".akow-msgbox-cancelbutton" + getCount().toString())
     .click(
                    function (e) {
                        //$(".akow-msgbox-msgbox" + getCount().toString()).modal('hide');
                        $(".akow-msgbox-msgbox" + getCount().toString()).css("display", "none");

                        if (cancelInvokeFunction) {
                            cancelInvokeFunction();
                        }
                        //decreaseCount();
                    }
           )
}

function increaseCount() {
    var count = parseInt($(".akow-hdCount").val());

    count = (count + 1) % 10;

    $(".akow-hdCount").val((count).toString())
}

function decreaseCount() {
    var count = parseInt($(".akow-hdCount").val());
    $(".akow-hdCount").val((count - 1).toString())
}

function getCount() {
    return parseInt($(".akow-hdCount").val());;
}
 
/* 
-------------------------------
|           buttonmode        |  
-------------------------------
1 --> OK                      
2 --> OK and Cancel
3 --> Yes and No
** Default -->'1
-------------------------------

-------------------------------
|           iconmode          | 
-------------------------------
'info'
'question'
'warning'
'error'
** Default -->'info'
------------------------------- 
*/

function akow_Messagebox_Msgbox(text, caption, buttonmode, iconmode, okInvokeFunction, cancelInvokeFunction, okButtonLable, cancelButtonLable) {
    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
    if ($(".akow-msgbox-msgbox" + getCount().toString()).css("display") != 'none') {
        return;
    }

    increaseCount();
    initMessageBox(text, caption, buttonmode, iconmode, okButtonLable, cancelButtonLable);
    //$(".akow-msgbox-msgbox" + getCount().toString()).modal('toggle');
    $(".akow-msgbox-msgbox" + getCount().toString()).css("display", "block");
    setOnOkFunction(okInvokeFunction);
    setOnCancelFunction(cancelInvokeFunction);

}

function akow_Messagebox_Clear() {
    $(".akow-msgbox-msgbox" + getCount().toString()).modal('hide');
}

function akow_Messagebox_Management(msgItem) {

    if (msgItem == null || msgItem == '' || msgItem == 'undefined' ||
        msgItem[0] == null || msgItem[0] == '' || msgItem[0] == 'undefined') {
        var s = { Code: null, Type: null, Message: 'No message elements.' };
        return s;
    }

    var msgSet = JSON.parse(sessionStorage.getItem('messageManagement'));

    if (msgSet == null || msgSet == '' || msgSet == 'undefined' || msgSet.length < 1) {
        var s = { Code: null, Type: null, Message: 'No message elements.' };
        return s;
    }

    var msgFound = $.grep(msgSet, function (e) { return e.Code == msgItem[0]; });

    if (msgFound == null || msgFound == '' || msgFound == 'undefined' || msgFound.length > 1) {
        var s = { Code: null, Type: null, Message: 'No message elements.' };
        return s;
    }

    var s = { Code: msgFound[0].Code, Type: msgFound[0].MessageType, Message: msgFound[0].Description };
    for (var i = 0; i < msgItem.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s.Message = s.Message.replace(reg, msgItem[i + 1]);
    }

    s.Message = akow_Messagebox_Cleansing(s.Message);

    return s;
}

function akow_Messagebox_Cleansing(oldMsg) {
    var newMsg = null;

    newMsg = oldMsg;

    return newMsg;
}













