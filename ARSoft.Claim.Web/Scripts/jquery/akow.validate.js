// Update by : Pongthorn Paemanee
// Update date : 01/10/2015 16:44

var gCcInvalid = "#FA5858";
var gCcWhite = "#ffffff";
var gCcBlack = "#000000";

function openLoadingProgress() {
    $(".overlay").css("display", "block");
}

function closeLoadingProgress() {
    setTimeout(function () { $(".overlay").fadeOut(100); }, 100);
}

document.documentElement.addEventListener('click', function () {
    if (document != null &&
        document.activeElement != null &&
        document.activeElement.firstChild != null &&
        document.activeElement.firstChild.className != null &&
        document.activeElement.firstChild.className == 'glyphicon glyphicon-search') {
        document.activeElement.blur();
        $(".overlay").css("display", "block");
    }

    if (document != null &&
        document.activeElement != null &&
        document.activeElement.className != null &&
        document.activeElement.className.indexOf('akow-loading') > -1) {
        document.activeElement.blur();
        $(".overlay").css("display", "block");
    }
}, true);

function isOnTime(iTime) {
    var lastTime = $.data(this, 'lastTime' + document.activeElement.id),
        now = new Date().getTime();

    if (lastTime && (now - lastTime < iTime)) {
        return true;
    } else {
        $.data(this, 'lastTime' + document.activeElement.id, now);
        return false;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// akow_Validate_ValidateInput - Version 1
function isDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '')
        return false;

    //Declare Regex  
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for dd/mm/yyyy format.
    dtDay = dtArray[1];
    dtMonth = dtArray[3];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}

function isTime(txtTime) {
    var currVal = txtTime;
    if (currVal == '')
        return false;
    
    var arrCurrVal = currVal.split(":");
    if (arrCurrVal.length == 2) {
        currVal = currVal + ":00";
    }

    //Declare Regex  
    var rxTimePattern = /^(\d{1,2})(:)(\d{1,2})(:)(\d{1,2})$/;
    var dtArray = currVal.match(rxTimePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for hh/mm/ss format.
    dtHour = dtArray[1];
    dtMinute = dtArray[3];
    dtSecond = dtArray[5];

    if (dtHour < 0 || dtHour > 24) {
        return false;
    }
    else if (dtMinute < 0 || dtMinute > 60) {
        return false;
    }
    else if (dtSecond < 0 || dtSecond > 60) {
        return false;
    }
    return true;
}

function setValidRadio(control) {
    if (control.attr("akow-radiolabel")) {
        var labelname = control.attr("akow-radiolabel");
        $('[akow-radiolabelname="' + labelname + '"]').each(function () {
            $(this).css("color", gCcBlack);
        });
    }
}

function setInvalidRadio(control) {
    if (control.attr("akow-radiolabel")) {
        var labelname = control.attr("akow-radiolabel");
        $('[akow-radiolabelname="' + labelname + '"]').each(function () {
            $(this).css("color", gCcInvalid);
        });
    }

}

function setValidCheckbox(control) {
    if (control.attr("akow-checkboxlabel")) {
        var labelname = control.attr("akow-checkboxlabel");
        $('[akow-checkboxlabelname="' + labelname + '"]').each(function () {
            $(this).css("color", gCcBlack);
        });
    }
}

function setInvalidCheckbox(control) {
    if (control.attr("akow-checkboxlabel")) {
        var labelname = control.attr("akow-checkboxlabel");
        $('[akow-checkboxlabelname="' + labelname + '"]').each(function () {
            $(this).css("color", gCcInvalid);
        });
    }

}

function setValidControl(control) {
    if (control.attr("type") == "radio") {
        setValidRadio(control);
    }
    else if (control.attr("type") == "checkbox") {

        setValidCheckbox(control);
    }
    else {
        if (control.attr("type") == "email") {
            control.css("background-color", gCcWhite);
        }
        else {
            // except change color when disabled by art
            if (control[0].disabled != true && control[0].readOnly != true)
            {
                control.css("background-color", gCcWhite);
            }
        }
    }
}

function setInvalidControl(control) {
    if (control.attr("type") == "radio") {
        setInvalidRadio(control);
    }
    else if (control.attr("type") == "checkbox") {
        setInvalidCheckbox(control);
    }
    else {
        if (control.attr("type") == "email") {
            control.css("background-color", gCcInvalid);
        }
        else {
            control.css("background-color", gCcInvalid);
            if ($(".k-input").length > 0)
            {
                $(".k-input").each(function () {
                    if ($(this)[0].nextElementSibling != null && $(this)[0].nextElementSibling.id == control.attr("id"))
                    {
                        $(this).css("background-color", gCcInvalid);
                    }
                });
            }
        }
    }
}

function isRadioValidRequireField(radio) {
    var returnValue = false;
    var querystring;

    if (radio.attr("akow-radiogroup")) {
        querystring = '[akow-radiogroup="' + radio.attr("akow-radiogroup") + '"]';
    }
    else {
        querystring = '[name="' + radio.attr("name") + '"]';
    }

    $(querystring).each(function () {

        if ($(this).is(":checked")) {
            returnValue = true;
        }

    });

    return returnValue;

}

function isCheckboxValidRequireField(radio) {
    var returnValue = false;
    var querystring;

    if (radio.attr("akow-checkboxgroup")) {
        querystring = '[akow-checkboxgroup="' + radio.attr("akow-checkboxgroup") + '"]';
    }
    else {
        querystring = '[name="' + radio.attr("name") + '"]';
    }

    $(querystring).each(function () {

        if ($(this).is(":checked")) {
            returnValue = true;
        }

    });

    return returnValue;

}

function isSelectValidRequireField(select) {
    var returnValue = false;
    select.children('option:selected').each(function () {
        try {
            //if ( $(this)[0].innerText)
            //{
            //    returnValue = true;
            //}

            if ($(this).val() != "") {
                returnValue = true;
            }
        }
        catch (e) {

        }
    });

    //if (select.children('option:selected').length <= 0 &&
    //    select.children('option:selected').context.length > 0) {
    //    select.children('option:selected').context.each(function () {
    //        try {
    //            if ($(this).val() != "") {
    //                returnValue = true;
    //            }
    //        }
    //        catch (e) {

    //        }
    //    });
    //}

    return returnValue;
}

function validateRequireField() {
    var returnValue = true;
    
    $(".akow-require-field").each(function () {
        
        if ($(this).is("span"))
            return;

        if ($(this).attr("type") == "radio") {
            if (!isRadioValidRequireField($(this))) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
        if ($(this).attr("type") == "checkbox") {
            if (!isCheckboxValidRequireField($(this))) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
        else if ($(this).is("select") == true) {
            if (!isSelectValidRequireField($(this))) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
        else if ($(this).attr("type") == "text") {
            if (!$(this).val()) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
        else if (!$(this).val()) {
            returnValue = false;
            setInvalidControl($(this));
        }

    });

    return returnValue;
}

function validateIntField() {
    var returnValue = true;
    $(".akow-int-field").each(function () {
        if ($(this).is("span"))
            return;

        if ($(this).val()) {
            try {
                if ($(this)[0] != null &&
                    $(this)[0].offsetParent != null &&
                    $(this)[0].offsetParent.className != null) {
                    if ($(this)[0].offsetParent.className.indexOf('k-numeric') > -1) {
                        var kVal = $(this).val().replace(",", "");
                        if (!(kVal % 1 === 0)) {
                            returnValue = false;
                            setInvalidControl($(this));
                        }
                    }
                    else {
                        if (!($(this).val() % 1 === 0)) {
                            returnValue = false;
                            setInvalidControl($(this));
                        }
                    }
                }
                else {
                    if (!($(this).val() % 1 === 0)) {
                        returnValue = false;
                        setInvalidControl($(this));
                    }
                }
            }
            catch (e) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
    });
    return returnValue;
}

function validateDecimalField() {
    var returnValue = true;
    $(".akow-decimal-field").each(function () {

        if ($(this).is("span"))
            return;

        if ($(this).val()) {
            try {
                if ($(this)[0] != null &&
                    $(this)[0].offsetParent != null &&
                    $(this)[0].offsetParent.className != null) {
                    if ($(this)[0].offsetParent.className.indexOf('k-numeric') > -1) {
                        var kVal = $(this).val().replace(",", "");
                        if (isNaN(kVal)) {
                            returnValue = false;
                            setInvalidControl($(this));
                        }
                    }
                    else {
                        if (isNaN($(this).val())) {
                            returnValue = false;
                            setInvalidControl($(this));
                        }
                    }
                }
                else {
                    if (isNaN($(this).val())) {
                        returnValue = false;
                        setInvalidControl($(this));
                    }
                }
            }
            catch (e) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
    });
    return returnValue;
}

function validateDateField() {
    var returnValue = true;
    $(".akow-date-field").each(function () {

        if ($(this).is("span"))
            return;

        if ($(this).val()) {
            try {
                if (!isDate($(this).val())) {
                    returnValue = false;
                    setInvalidControl($(this));
                }
            }
            catch (e) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
    });
    return returnValue;
}

function validateTimeField() {

    return true;
}

function validateDateTimeField() {
    var returnValue = true;
    $(".akow-datetime-field").each(function () {

        if ($(this).is("span"))
            return;

        if ($(this).val()) {
            try {
                var sDateTime = $(this).val();
                var arrDateTime = sDateTime.split(" ");
                if (arrDateTime.length != 2) {
                    returnValue = false;
                    setInvalidControl($(this));
                    return;
                }
                if ($.trim(arrDateTime[0]) == "") {
                    returnValue = false;
                    setInvalidControl($(this));
                    return;
                }
                if ($.trim(arrDateTime[1]) == "") {
                    returnValue = false;
                    setInvalidControl($(this));
                    return;
                }
                if (!isDate(arrDateTime[0])) {
                    returnValue = false;
                    setInvalidControl($(this));
                    return;
                }
                if (!isTime(arrDateTime[1])) {
                    returnValue = false;
                    setInvalidControl($(this));
                    return;
                }
            }
            catch (e) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
    });
    return returnValue;
}

function validateEmailAddress() {
    var returnValue = true;

    $("input[type=email]").each(function () {
        if ($(this).val()) {
            if (!akow_Validate_EmailAddress($(this).val())) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
    });

    return returnValue;
}

function validateMaskedTextbox() {
    var returnValue = true;
    $(".akow-control-masked-textbox").each(function () {

        if ($(this).is("span"))
            return;

        if ($(this).val()) {
            try {
                var txtVal = $(this).val();
                if (txtVal.indexOf('_') > -1) {
                    returnValue = false;
                    setInvalidControl($(this));
                }
            }
            catch (e) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
    });
    return returnValue;
}

function clearValidateStyle(className) {
    $("." + className).each(function () {
        setValidControl($(this));
        $(this).removeClass("akow-invalid-input");
    });
}

function clearValidateStyleNonClassControl() {

    //Email Textbox
    $("input[type=email]").each(function () { //For manage textbox on email type.
        setValidControl($(this));
        $(this).removeClass("akow-invalid-input");
    });
}

function akow_Validate_ClearAllValidateStyle() {
    clearValidateStyle("akow-require-field");
    clearValidateStyle("akow-int-field");
    clearValidateStyle("akow-decimal-field");
    clearValidateStyle("akow-date-field");
    clearValidateStyle("akow-time-field");
    clearValidateStyle("akow-datetime-field");
    clearValidateStyle("akow-control-masked-textbox");

    clearValidateStyleNonClassControl();
}

function akow_Validate_ValidateInput() {
    var returnValue = true

    akow_Validate_ClearAllValidateStyle();

    returnValue = validateRequireField() && returnValue;
    returnValue = validateIntField() && returnValue;
    returnValue = validateDecimalField() && returnValue;
    returnValue = validateDateField() && returnValue;
    returnValue = validateTimeField() && returnValue;
    returnValue = validateDateTimeField() && returnValue;
    returnValue = validateEmailAddress() && returnValue;
    returnValue = validateMaskedTextbox() && returnValue;

    if (returnValue == false)
    {
        akow_Messagebox_Msgbox('กรุณา กรอกข้อมูลให้ถูกต้องครบถ้วน!', 'คำเตือน', 1, 'warning', function () { null }, null);
    }

    return returnValue;
}

function akow_Validate_EmailAddress(emailAddress) {
    if (emailAddress == '' || emailAddress == null) {
        return true;
    }

    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// akow_Validate_ValidateInput - Version 2 
// Function บางส่วนใช้ร่วมกับ Version 1

function akow_Validate_ValidateInput_ItemCancel(listRejectItem, listOrginalColor) {

    var returnValue = true

    akow_Validate_ClearAllValidateStyle_ItemCancel(listOrginalColor);

    returnValue = validateRequireField_ItemCancel(listRejectItem) && returnValue;
    returnValue = validateIntField_ItemCancel(listRejectItem) && returnValue;
    returnValue = validateDecimalField_ItemCancel(listRejectItem) && returnValue;
    returnValue = validateDateField_ItemCancel(listRejectItem) && returnValue;
    returnValue = validateTimeField_ItemCancel(listRejectItem) && returnValue;
    returnValue = validateDateTimeField_ItemCancel(listRejectItem) && returnValue;
    returnValue = validateEmailAddress_ItemCancel(listRejectItem) && returnValue;
    returnValue = validateMaskedTextbox_ItemCancel(listRejectItem) && returnValue;
    
    if (returnValue == false) {
        akow_Messagebox_Msgbox('กรุณา กรอกข้อมูลให้ถูกต้องครบถ้วน!', 'คำเตือน', 1, 'warning', function () { null }, null);
    }

    return returnValue;
}

function IsCancelValidate_ItemCancel(ctrlItem, listRejectItem) {
    var result = false;
    if (listRejectItem != null) {
        $.each(listRejectItem, function (listIndex, listObject) {
            $.each(listObject, function (listName, listValue) {
                if (ctrlItem.attr("name") == listName || 
                    (ctrlItem.context.type == "text" && ctrlItem.attr("name") == (listName + "_input")) ||
                    (ctrlItem[0].nextElementSibling != null && ctrlItem[0].nextElementSibling.id == listName)) {
                    result = true;
                    return false;
                }
            });
        });
    }
    return result;
}

function validateRequireField_ItemCancel(listRejectItem) {
    var returnValue = true;
    $(".akow-require-field").each(function () {
        
        if ($(this).is("span"))
            return;
        
        if (IsCancelValidate_ItemCancel($(this), listRejectItem) == true)
        {
            return;
        }
        
        if ($(this).attr("type") == "radio") {
            if (!isRadioValidRequireField($(this))) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
        if ($(this).attr("type") == "checkbox") {
            if (!isCheckboxValidRequireField($(this))) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
        else if ($(this).is("select") == true) {
            if (!isSelectValidRequireField($(this))) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
        else if ($(this).attr("type") == "text") {
            if (!$(this).val()) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
        else if (!$(this).val()) {
            returnValue = false;
            setInvalidControl($(this));
        }

    });

    return returnValue;
}

function validateIntField_ItemCancel(listRejectItem) {
    var returnValue = true;
    $(".akow-int-field").each(function () {
        if ($(this).is("span"))
            return;

        if ($(this).val()) {
            try {
                if ($(this)[0] != null &&
                    $(this)[0].offsetParent != null &&
                    $(this)[0].offsetParent.className != null) {
                    if ($(this)[0].offsetParent.className.indexOf('k-numeric') > -1) {
                        var kVal = $(this).val().replace(",", "");
                        if (!(kVal % 1 === 0)) {
                            returnValue = false;
                            setInvalidControl($(this));
                        }
                    }
                    else {
                        if (!($(this).val() % 1 === 0)) {
                            returnValue = false;
                            setInvalidControl($(this));
                        }
                    }
                }
                else {
                    if (!($(this).val() % 1 === 0)) {
                        returnValue = false;
                        setInvalidControl($(this));
                    }
                }
            }
            catch (e) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
    });
    return returnValue;
}

function validateDecimalField_ItemCancel(listRejectItem) {
    var returnValue = true;
    $(".akow-decimal-field").each(function () {

        if ($(this).is("span"))
            return;

        if ($(this).val()) {
            try {
                if ($(this)[0] != null &&
                    $(this)[0].offsetParent != null &&
                    $(this)[0].offsetParent.className != null) {
                    if ($(this)[0].offsetParent.className.indexOf('k-numeric') > -1) {
                        var kVal = $(this).val().replace(",", "");
                        if (isNaN(kVal)) {
                            returnValue = false;
                            setInvalidControl($(this));
                        }
                    }
                    else {
                        if (isNaN($(this).val())) {
                            returnValue = false;
                            setInvalidControl($(this));
                        }
                    }
                }
                else {
                    if (isNaN($(this).val())) {
                        returnValue = false;
                        setInvalidControl($(this));
                    }
                }
            }
            catch (e) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
    });
    return returnValue;
}

function validateDateField_ItemCancel(listRejectItem) {
    var returnValue = true;
    $(".akow-date-field").each(function () {

        if ($(this).is("span"))
            return;
        
        if ($(this).val()) {
            try {
                if (!isDate($(this).val())) {
                    returnValue = false;
                    setInvalidControl($(this));
                }
            }
            catch (e) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
    });
    return returnValue;
}

function validateTimeField_ItemCancel(listRejectItem) {

    return true;
}

function validateDateTimeField_ItemCancel(listRejectItem) {
    var returnValue = true;
    $(".akow-datetime-field").each(function () {

        if ($(this).is("span"))
            return;

        if ($(this).val()) {
            try {
                var sDateTime = $(this).val();
                var arrDateTime = sDateTime.split(" ");
                if (arrDateTime.length != 2) {
                    returnValue = false;
                    setInvalidControl($(this));
                    return;
                }
                if ($.trim(arrDateTime[0]) == "") {
                    returnValue = false;
                    setInvalidControl($(this));
                    return;
                }
                if ($.trim(arrDateTime[1]) == "") {
                    returnValue = false;
                    setInvalidControl($(this));
                    return;
                }
                if (!isDate(arrDateTime[0])) {
                    returnValue = false;
                    setInvalidControl($(this));
                    return;
                }
                if (!isTime(arrDateTime[1])) {
                    returnValue = false;
                    setInvalidControl($(this));
                    return;
                }
            }
            catch (e) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
    });
    return returnValue;
}

function validateEmailAddress_ItemCancel(listRejectItem) {
    var returnValue = true;

    $("input[type=email]").each(function () {
        if ($(this).val()) {
            if (!akow_Validate_EmailAddress($(this).val())) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
    });

    return returnValue;
}

function validateMaskedTextbox_ItemCancel() {
    var returnValue = true;
    $(".akow-control-masked-textbox").each(function () {

        if ($(this).is("span"))
            return;

        if ($(this).val()) {
            try {
                var txtVal = $(this).val();
                if (txtVal.indexOf('_') > -1) {
                    returnValue = false;
                    setInvalidControl($(this));
                }
            }
            catch (e) {
                returnValue = false;
                setInvalidControl($(this));
            }
        }
    });
    return returnValue;
}

function clearValidateStyle_ItemCancel(className, listOrginalColor) {
    var OrginalColor = null;
    $("." + className).each(function () {
        var ctrlObj = $(this);
        if (listOrginalColor != null) {
            $.each(listOrginalColor, function (listIndex, listObject) {
                $.each(listObject, function (listName, listValue) {
                    if (ctrlObj.attr("name") == listName ||
                        (ctrlObj.context.type == "text" && ctrlObj.attr("name") == (listName + "_input")) ||
                        (ctrlObj[0].nextElementSibling != null && ctrlObj[0].nextElementSibling.id == listName)) {
                        OrginalColor = listValue;
                        return false;
                    }
                    else {
                        OrginalColor = null;
                    }
                });

                if (OrginalColor != null) {
                    return false;
                }
            });
        }
        setValidControl_ItemCancel($(this), OrginalColor);
        $(this).removeClass("akow-invalid-input");
    });
}

function clearValidateStyleNonClassControl_ItemCancel(listOrginalColor) {
    var OrginalColor = null;
    //Email Textbox
    $("input[type=email]").each(function () { //For manage textbox on email type.
        var ctrlObj = $(this);
        if (listOrginalColor != null)
        {
            $.each(listOrginalColor, function (listIndex, listObject) {
                $.each(listObject, function (listName, listValue) {
                    if (ctrlObj.attr("name") == listName) {
                        OrginalColor = listValue;
                        return false;
                    }
                    else {
                        OrginalColor = null;
                    }
                });

                if (OrginalColor != null) {
                    return false;
                }
            });
        }
        setValidControl_ItemCancel($(this), OrginalColor);
        $(this).removeClass("akow-invalid-input");
    });
}

function akow_Validate_ClearAllValidateStyle_ItemCancel(listOrginalColor) {
    
    clearValidateStyle_ItemCancel("akow-require-field", listOrginalColor);
    clearValidateStyle_ItemCancel("akow-int-field", listOrginalColor);
    clearValidateStyle_ItemCancel("akow-decimal-field", listOrginalColor);
    clearValidateStyle_ItemCancel("akow-date-field", listOrginalColor);
    clearValidateStyle_ItemCancel("akow-time-field", listOrginalColor);
    clearValidateStyle_ItemCancel("akow-datetime-field", listOrginalColor);
    clearValidateStyle_ItemCancel("akow-control-masked-textbox", listOrginalColor);

    clearValidateStyleNonClassControl_ItemCancel(listOrginalColor);
}

function setValidControl_ItemCancel(control, OrginalColor) {
    if (control.attr("type") == "radio") {
        setValidRadio_ItemCancel(control, OrginalColor);
    }
    else if (control.attr("type") == "checkbox") {
        setValidCheckbox_ItemCancel(control, OrginalColor);
    }
    else {
        if (control.attr("type") == "email") {
            if (OrginalColor == null || OrginalColor == "") {
                control.css("background-color", gCcWhite);
            }
            else {
                control.css("background-color", OrginalColor);
            }
        }
        else {
            if (OrginalColor == null || OrginalColor == "") {
                control.css("background-color", gCcWhite);
                if ($(".k-input").length > 0) {
                    $(".k-input").each(function () {
                        if ($(this)[0].nextElementSibling != null && $(this)[0].nextElementSibling.id == control.attr("id")) {
                            $(this).css("background-color", gCcWhite);
                        }
                    });
                }
            }
            else {
                control.css("background-color", OrginalColor);
                if ($(".k-input").length > 0) {
                    $(".k-input").each(function () {
                        if ($(this)[0].nextElementSibling != null && $(this)[0].nextElementSibling.id == control.attr("id")) {
                            $(this).css("background-color", OrginalColor);
                        }
                    });
                }
            }
        }
    }
}

function setValidRadio_ItemCancel(control, OrginalColor) {
    if (control.attr("akow-radiolabel")) {
        var labelname = control.attr("akow-radiolabel");
        $('[akow-radiolabelname="' + labelname + '"]').each(function () {
            if (OrginalColor == null || OrginalColor == "") {
                $(this).css("color", gCcBlack);
            }
            else {
                $(this).css("color", OrginalColor);
            }
        });
    }
}

function setValidCheckbox_ItemCancel(control, OrginalColor) {
    if (control.attr("akow-checkboxlabel")) {
        var labelname = control.attr("akow-checkboxlabel");
        $('[akow-checkboxlabelname="' + labelname + '"]').each(function () {
            if (OrginalColor == null || OrginalColor == "") {
                $(this).css("color", gCcBlack);
            }
            else {
                $(this).css("color", OrginalColor);
            }
        });
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function akow_Validate_DateCompare(strFirstDate, strOperator, strSecondDate, strFormat) {
    if (strFormat == "dd/MM/yyyy") {

        if (!isDate(strFirstDate)) {
            return false;
        }

        if (!isDate(strSecondDate)) {
            return false;
        }

        var arrFirstDate = strFirstDate.split("/");
        var arrSecondDate = strSecondDate.split("/");

        var isValid = isValid_DateCompare([arrFirstDate[2], arrFirstDate[1], arrFirstDate[0]]
                                          , strOperator
                                          ,[arrSecondDate[2], arrSecondDate[1], arrSecondDate[0]]);
        if (isValid == true) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (strFormat == "dd/MM/yyyy HH:mm") {

        var sFirstDate = strFirstDate;
        var arrFirstDateTime = sFirstDate.split(" ");
        if (arrFirstDateTime.length != 2) {
            return false;
        }
        if ($.trim(arrFirstDateTime[0]) == "") {
            return false;
        }
        if ($.trim(arrFirstDateTime[1]) == "") {
            return false;
        }
        if (!isDate(arrFirstDateTime[0])) {
            return false;
        }
        if (!isTime(arrFirstDateTime[1])) {
            return false;
        }

        var sSecondDate = strSecondDate;
        var arrSecondDateTime = sSecondDate.split(" ");
        if (arrSecondDateTime.length != 2) {
            return false;
        }
        if ($.trim(arrSecondDateTime[0]) == "") {
            return false;
        }
        if ($.trim(arrSecondDateTime[1]) == "") {
            return false;
        }
        if (!isDate(arrSecondDateTime[0])) {
            return false;
        }
        if (!isTime(arrSecondDateTime[1])) {
            return false;
        }

        var arrFirstDate = arrFirstDateTime[0].split("/");
        var arrFirstTime = arrFirstDateTime[1].split(":");
        var arrSecondDate = arrSecondDateTime[0].split("/");
        var arrSecondTime = arrSecondDateTime[1].split(":");

        var isValid = isValid_DateCompare([arrFirstDate[2], arrFirstDate[1], arrFirstDate[0], arrFirstTime[0], arrFirstTime[1]]
                                          , strOperator
                                          , [arrSecondDate[2], arrSecondDate[1], arrSecondDate[0], arrSecondTime[0], arrSecondTime[1]]);
        if (isValid == true) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (strFormat == "dd/MM/yyyy HH:mm:ss") {

        var sFirstDate = strFirstDate;
        var arrFirstDateTime = sFirstDate.split(" ");
        if (arrFirstDateTime.length != 2) {
            return false;
        }
        if ($.trim(arrFirstDateTime[0]) == "") {
            return false;
        }
        if ($.trim(arrFirstDateTime[1]) == "") {
            return false;
        }
        if (!isDate(arrFirstDateTime[0])) {
            return false;
        }
        if (!isTime(arrFirstDateTime[1])) {
            return false;
        }

        var sSecondDate = strSecondDate;
        var arrSecondDateTime = sSecondDate.split(" ");
        if (arrSecondDateTime.length != 2) {
            return false;
        }
        if ($.trim(arrSecondDateTime[0]) == "") {
            return false;
        }
        if ($.trim(arrSecondDateTime[1]) == "") {
            return false;
        }
        if (!isDate(arrSecondDateTime[0])) {
            return false;
        }
        if (!isTime(arrSecondDateTime[1])) {
            return false;
        }

        var arrFirstDate = arrFirstDateTime[0].split("/");
        var arrFirstTime = arrFirstDateTime[1].split(":");
        var arrSecondDate = arrSecondDateTime[0].split("/");
        var arrSecondTime = arrSecondDateTime[1].split(":");

        var isValid = isValid_DateCompare([arrFirstDate[2], arrFirstDate[1], arrFirstDate[0], arrFirstTime[0], arrFirstTime[1], arrFirstTime[2]]
                                          , strOperator
                                          , [arrSecondDate[2], arrSecondDate[1], arrSecondDate[0], arrSecondTime[0], arrSecondTime[1], arrSecondTime[2]]);
        if (isValid == true) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

function isValid_DateCompare(arrFirstValue, strOperator, arrSecondValue) {
    var arrLen = arrFirstValue.length;
    var idx = 0;

    if (strOperator == ">") {
        for (var idx = 0; idx < arrLen; idx++) {
            if (arrFirstValue[idx] == arrSecondValue[idx]) {
                if (idx == arrLen - 1) {
                    return false;
                }
            }
            else {
                if (arrFirstValue[idx] > arrSecondValue[idx]) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
    else if (strOperator == "<") {
        for (var idx = 0; idx < arrLen; idx++) {
            if (arrFirstValue[idx] == arrSecondValue[idx]) {
                if (idx == arrLen - 1) {
                    return false;
                }
            }
            else {
                if (arrFirstValue[idx] < arrSecondValue[idx]) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
    else if (strOperator == ">=") {
        for (var idx = 0; idx < arrLen; idx++) {
            if (arrFirstValue[idx] == arrSecondValue[idx]) {
                if (idx == arrLen - 1) {
                    return true;
                }
            }
            else {
                if (arrFirstValue[idx] > arrSecondValue[idx]) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
    else if (strOperator == "<=") {
        for (var idx = 0; idx < arrLen; idx++) {
            if (arrFirstValue[idx] == arrSecondValue[idx]) {
                if (idx == arrLen - 1) {
                    return true;
                }
            }
            else {
                if (arrFirstValue[idx] < arrSecondValue[idx]) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
    else {
        return false;
    }

    return false;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// akow_Validate_ValidateInput - Version 3
// แยกออกมาต่างหากทั้งหมดเป็น Function สำหรับ Version 3 ทั้งหมด
function akow_Validate_ValidateInput_V3(listRejectItem, listOrginalColor, ctrlScope) {

    if (ctrlScope == null || ctrlScope == 'undefined') {
        ctrlScope = $("*");
    }

    var returnValue = true

    akow_Validate_ClearAllValidateStyle_V3(listOrginalColor, ctrlScope);

    returnValue = validateRequireField_V3(listRejectItem, ctrlScope) && returnValue;
    returnValue = validateIntField_V3(listRejectItem, ctrlScope) && returnValue;
    returnValue = validateDecimalField_V3(listRejectItem, ctrlScope) && returnValue;
    returnValue = validateDateField_V3(listRejectItem, ctrlScope) && returnValue;
    returnValue = validateTimeField_V3(listRejectItem, ctrlScope) && returnValue;
    returnValue = validateDateTimeField_V3(listRejectItem, ctrlScope) && returnValue;
    returnValue = validateEmailAddress_V3(listRejectItem, ctrlScope) && returnValue;
    returnValue = validateMaskedTextbox_V3(listRejectItem, ctrlScope) && returnValue;

    if (returnValue == false) {
        akow_Messagebox_Msgbox('กรุณา กรอกข้อมูลให้ถูกต้องครบถ้วน!', 'คำเตือน', 1, 'warning', function () { null }, null);
    }

    return returnValue;
}

function IsCancelValidate_V3(ctrlItem, listRejectItem) {
    var result = false;
    if (listRejectItem != null) {
        $.each(listRejectItem, function (listIndex, listObject) {
            $.each(listObject, function (listName, listValue) {
                if (ctrlItem.attr("name") == listName ||
                    (ctrlItem.context.type == "text" && ctrlItem.attr("name") == (listName + "_input")) ||
                    (ctrlItem[0].nextElementSibling != null && ctrlItem[0].nextElementSibling.id == listName)) {
                    result = true;
                    return false;
                }
            });
        });
    }
    return result;
}

function validateRequireField_V3(listRejectItem, ctrlScope) {
    var returnValue = true;
    ctrlScope.find(".akow-require-field").each(function () {

        if ($(this).is("span"))
            return;

        if (IsCancelValidate_V3($(this), listRejectItem) == true) {
            return;
        }

        if ($(this).attr("type") == "radio") {
            if (!isRadioValidRequireField_V3($(this), ctrlScope)) {
                returnValue = false;
                setInvalidControl_V3($(this), ctrlScope);
            }
        }
        if ($(this).attr("type") == "checkbox") {
            if (!isCheckboxValidRequireField_V3($(this), ctrlScope)) {
                returnValue = false;
                setInvalidControl_V3($(this), ctrlScope);
            }
        }
        else if ($(this).is("select") == true) {
            if (!isSelectValidRequireField_V3($(this), ctrlScope)) {
                returnValue = false;
                setInvalidControl_V3($(this), ctrlScope);
            }
        }
        else if ($(this).attr("type") == "text") {
            if (!$(this).val()) {
                returnValue = false;
                setInvalidControl_V3($(this), ctrlScope);
            }
        }
        else if (!$(this).val()) {
            returnValue = false;
            setInvalidControl_V3($(this), ctrlScope);
        }

    });

    return returnValue;
}

function validateIntField_V3(listRejectItem, ctrlScope) {
    var returnValue = true;
    ctrlScope.find(".akow-int-field").each(function () {
        if ($(this).is("span"))
            return;

        if ($(this).val()) {
            try {
                if ($(this)[0] != null &&
                    $(this)[0].offsetParent != null &&
                    $(this)[0].offsetParent.className != null) {
                    if ($(this)[0].offsetParent.className.indexOf('k-numeric') > -1) {
                        var kVal = $(this).val().replace(",", "");
                        if (!(kVal % 1 === 0)) {
                            returnValue = false;
                            setInvalidControl_V3($(this), ctrlScope);
                        }
                    }
                    else {
                        if (!($(this).val() % 1 === 0)) {
                            returnValue = false;
                            setInvalidControl_V3($(this), ctrlScope);
                        }
                    }
                }
                else {
                    if (!($(this).val() % 1 === 0)) {
                        returnValue = false;
                        setInvalidControl_V3($(this), ctrlScope);
                    }
                }
            }
            catch (e) {
                returnValue = false;
                setInvalidControl_V3($(this), ctrlScope);
            }
        }
    });
    return returnValue;
}

function validateDecimalField_V3(listRejectItem, ctrlScope) {
    var returnValue = true;
    ctrlScope.find(".akow-decimal-field").each(function () {

        if ($(this).is("span"))
            return;

        if ($(this).val()) {
            try {
                if ($(this)[0] != null &&
                    $(this)[0].offsetParent != null &&
                    $(this)[0].offsetParent.className != null) {
                    if ($(this)[0].offsetParent.className.indexOf('k-numeric') > -1) {
                        var kVal = $(this).val().replace(",", "");
                        if (isNaN(kVal)) {
                            returnValue = false;
                            setInvalidControl_V3($(this), ctrlScope);
                        }
                    }
                    else {
                        if (isNaN($(this).val())) {
                            returnValue = false;
                            setInvalidControl_V3($(this), ctrlScope);
                        }
                    }
                }
                else {
                    if (isNaN($(this).val())) {
                        returnValue = false;
                        setInvalidControl_V3($(this), ctrlScope);
                    }
                }
            }
            catch (e) {
                returnValue = false;
                setInvalidControl_V3($(this), ctrlScope);
            }
        }
    });
    return returnValue;
}

function validateDateField_V3(listRejectItem, ctrlScope) {
    var returnValue = true;
    ctrlScope.find(".akow-date-field").each(function () {

        if ($(this).is("span"))
            return;

        if ($(this).val()) {
            try {
                if (!isDate_V3($(this).val(), ctrlScope)) {
                    returnValue = false;
                    setInvalidControl_V3($(this), ctrlScope);
                }
            }
            catch (e) {
                returnValue = false;
                setInvalidControl_V3($(this), ctrlScope);
            }
        }
    });
    return returnValue;
}

function validateTimeField_V3(listRejectItem, ctrlScope) {

    return true;
}

function validateDateTimeField_V3(listRejectItem, ctrlScope) {
    var returnValue = true;
    ctrlScope.find(".akow-datetime-field").each(function () {

        if ($(this).is("span"))
            return;

        if ($(this).val()) {
            try {
                var sDateTime = $(this).val();
                var arrDateTime = sDateTime.split(" ");
                if (arrDateTime.length != 2) {
                    returnValue = false;
                    setInvalidControl_V3($(this), ctrlScope);
                    return;
                }
                if ($.trim(arrDateTime[0]) == "") {
                    returnValue = false;
                    setInvalidControl_V3($(this), ctrlScope);
                    return;
                }
                if ($.trim(arrDateTime[1]) == "") {
                    returnValue = false;
                    setInvalidControl_V3($(this), ctrlScope);
                    return;
                }
                if (!isDate_V3(arrDateTime[0], ctrlScope)) {
                    returnValue = false;
                    setInvalidControl_V3($(this), ctrlScope);
                    return;
                }
                if (!isTime_V3(arrDateTime[1])) {
                    returnValue = false;
                    setInvalidControl_V3($(this), ctrlScope);
                    return;
                }
            }
            catch (e) {
                returnValue = false;
                setInvalidControl_V3($(this), ctrlScope);
            }
        }
    });
    return returnValue;
}

function validateEmailAddress_V3(listRejectItem, ctrlScope) {
    var returnValue = true;

    ctrlScope.find("input[type=email]").each(function () {
        if ($(this).val()) {
            if (!akow_Validate_EmailAddress_V3($(this).val(), ctrlScope)) {
                returnValue = false;
                setInvalidControl_V3($(this), ctrlScope);
            }
        }
    });

    return returnValue;
}

function validateMaskedTextbox_V3(ctrlScope, ctrlScope) {
    var returnValue = true;
    ctrlScope.find(".akow-control-masked-textbox").each(function () {

        if ($(this).is("span"))
            return;

        if ($(this).val()) {
            try {
                var txtVal = $(this).val();
                if (txtVal.indexOf('_') > -1) {
                    returnValue = false;
                    setInvalidControl_V3($(this), ctrlScope);
                }
            }
            catch (e) {
                returnValue = false;
                setInvalidControl_V3($(this), ctrlScope);
            }
        }
    });
    return returnValue;
}

function clearValidateStyle_V3(className, listOrginalColor, ctrlScope) {
    var OrginalColor = null;
    ctrlScope.find("." + className).each(function () {
        var ctrlObj = $(this);
        if (listOrginalColor != null) {
            $.each(listOrginalColor, function (listIndex, listObject) {
                $.each(listObject, function (listName, listValue) {
                    if (ctrlObj.attr("name") == listName ||
                        (ctrlObj.context.type == "text" && ctrlObj.attr("name") == (listName + "_input")) ||
                        (ctrlObj[0].nextElementSibling != null && ctrlObj[0].nextElementSibling.id == listName)) {
                        OrginalColor = listValue;
                        return false;
                    }
                    else {
                        OrginalColor = null;
                    }
                });

                if (OrginalColor != null) {
                    return false;
                }
            });
        }
        setValidControl_V3($(this), OrginalColor, ctrlScope);
        $(this).removeClass("akow-invalid-input");
    });
}

function clearValidateStyleNonClassControl_V3(listOrginalColor, ctrlScope) {
    var OrginalColor = null;
    //Email Textbox
    ctrlScope.find("input[type=email]").each(function () { //For manage textbox on email type.
        var ctrlObj = $(this);
        if (listOrginalColor != null) {
            $.each(listOrginalColor, function (listIndex, listObject) {
                $.each(listObject, function (listName, listValue) {
                    if (ctrlObj.attr("name") == listName) {
                        OrginalColor = listValue;
                        return false;
                    }
                    else {
                        OrginalColor = null;
                    }
                });

                if (OrginalColor != null) {
                    return false;
                }
            });
        }
        setValidControl_V3($(this), OrginalColor, ctrlScope);
        $(this).removeClass("akow-invalid-input");
    });
}

function akow_Validate_ClearAllValidateStyle_V3(listOrginalColor, ctrlScope) {

    clearValidateStyle_V3("akow-require-field", listOrginalColor, ctrlScope);
    clearValidateStyle_V3("akow-int-field", listOrginalColor, ctrlScope);
    clearValidateStyle_V3("akow-decimal-field", listOrginalColor, ctrlScope);
    clearValidateStyle_V3("akow-date-field", listOrginalColor, ctrlScope);
    clearValidateStyle_V3("akow-time-field", listOrginalColor, ctrlScope);
    clearValidateStyle_V3("akow-datetime-field", listOrginalColor, ctrlScope);
    clearValidateStyle_V3("akow-control-masked-textbox", listOrginalColor, ctrlScope);

    clearValidateStyleNonClassControl_V3(listOrginalColor, ctrlScope);
}

function setValidControl_V3(control, OrginalColor, ctrlScope) {
    if (control.attr("type") == "radio") {
        setValidRadio_V3(control, OrginalColor, ctrlScope);
    }
    else if (control.attr("type") == "checkbox") {
        setValidCheckbox_V3(control, OrginalColor, ctrlScope);
    }
    else {
        if (control.attr("type") == "email") {
            if (OrginalColor == null || OrginalColor == "") {
                control.css("background-color", gCcWhite);
            }
            else {
                control.css("background-color", OrginalColor);
            }
        }
        else {
            if (OrginalColor == null || OrginalColor == "") {
                control.css("background-color", gCcWhite);
                if (ctrlScope.find(".k-input").length > 0) {
                    ctrlScope.find(".k-input").each(function () {
                        if ($(this)[0].nextElementSibling != null && $(this)[0].nextElementSibling.id == control.attr("id")) {
                            $(this).css("background-color", gCcWhite);
                        }
                    });
                }
            }
            else {
                control.css("background-color", OrginalColor);
                if (ctrlScope.find(".k-input").length > 0) {
                    ctrlScope.find(".k-input").each(function () {
                        if ($(this)[0].nextElementSibling != null && $(this)[0].nextElementSibling.id == control.attr("id")) {
                            $(this).css("background-color", OrginalColor);
                        }
                    });
                }
            }
        }
    }
}

function setValidRadio_V3(control, OrginalColor, ctrlScope) {
    if (control.attr("akow-radiolabel")) {
        var labelname = control.attr("akow-radiolabel");
        ctrlScope.find('[akow-radiolabelname="' + labelname + '"]').each(function () {
            if (OrginalColor == null || OrginalColor == "") {
                $(this).css("color", gCcBlack);
            }
            else {
                $(this).css("color", OrginalColor);
            }
        });
    }
}

function setValidCheckbox_V3(control, OrginalColor, ctrlScope) {
    if (control.attr("akow-checkboxlabel")) {
        var labelname = control.attr("akow-checkboxlabel");
        ctrlScope.find('[akow-checkboxlabelname="' + labelname + '"]').each(function () {
            if (OrginalColor == null || OrginalColor == "") {
                $(this).css("color", gCcBlack);
            }
            else {
                $(this).css("color", OrginalColor);
            }
        });
    }
}

function setInvalidControl_V3(control, ctrlScope) {
    if (control.attr("type") == "radio") {
        setInvalidRadio_V3(control, ctrlScope);
    }
    else if (control.attr("type") == "checkbox") {
        setInvalidCheckbox_V3(control, ctrlScope);
    }
    else {
        if (control.attr("type") == "email") {
            control.css("background-color", gCcInvalid);
        }
        else {
            control.css("background-color", gCcInvalid);
            if (ctrlScope.find(".k-input").length > 0) {
                ctrlScope.find(".k-input").each(function () {
                    if ($(this)[0].nextElementSibling != null && $(this)[0].nextElementSibling.id == control.attr("id")) {
                        $(this).css("background-color", gCcInvalid);
                    }
                });
            }
        }
    }
}

function setInvalidRadio_V3(control, ctrlScope) {
    if (control.attr("akow-radiolabel")) {
        var labelname = control.attr("akow-radiolabel");
        ctrlScope.find('[akow-radiolabelname="' + labelname + '"]').each(function () {
            $(this).css("color", gCcInvalid);
        });
    }

}

function setInvalidCheckbox_V3(control, ctrlScope) {
    if (control.attr("akow-checkboxlabel")) {
        var labelname = control.attr("akow-checkboxlabel");
        ctrlScope.find('[akow-checkboxlabelname="' + labelname + '"]').each(function () {
            $(this).css("color", gCcInvalid);
        });
    }

}

function isRadioValidRequireField_V3(radio, ctrlScope) {
    var returnValue = false;
    var querystring;

    if (radio.attr("akow-radiogroup")) {
        querystring = '[akow-radiogroup="' + radio.attr("akow-radiogroup") + '"]';
    }
    else {
        querystring = '[name="' + radio.attr("name") + '"]';
    }

    ctrlScope.find(querystring).each(function () {

        if ($(this).is(":checked")) {
            returnValue = true;
        }

    });

    return returnValue;

}

function isCheckboxValidRequireField_V3(radio, ctrlScope) {
    var returnValue = false;
    var querystring;

    if (radio.attr("akow-checkboxgroup")) {
        querystring = '[akow-checkboxgroup="' + radio.attr("akow-checkboxgroup") + '"]';
    }
    else {
        querystring = '[name="' + radio.attr("name") + '"]';
    }

    ctrlScope.find(querystring).each(function () {

        if ($(this).is(":checked")) {
            returnValue = true;
        }

    });

    return returnValue;

}

function isSelectValidRequireField_V3(select, ctrlScope) {
    var returnValue = false;
    select.children('option:selected').each(function () {
        try {

            if ($(this).val() != "") {
                returnValue = true;
            }
        }
        catch (e) {

        }
    });

    return returnValue;
}

function isDate_V3(txtDate, ctrlScope) {
    var currVal = txtDate;
    if (currVal == '')
        return false;

    //Declare Regex  
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for dd/mm/yyyy format.
    dtDay = dtArray[1];
    dtMonth = dtArray[3];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}

function isTime_V3(txtTime) {
    var currVal = txtTime;
    if (currVal == '')
        return false;

    var arrCurrVal = currVal.split(":");
    if (arrCurrVal.length == 2) {
        currVal = currVal + ":00";
    }

    //Declare Regex  
    var rxTimePattern = /^(\d{1,2})(:)(\d{1,2})(:)(\d{1,2})$/;
    var dtArray = currVal.match(rxTimePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for hh/mm/ss format.
    dtHour = dtArray[1];
    dtMinute = dtArray[3];
    dtSecond = dtArray[5];

    if (dtHour < 0 || dtHour > 24) {
        return false;
    }
    else if (dtMinute < 0 || dtMinute > 60) {
        return false;
    }
    else if (dtSecond < 0 || dtSecond > 60) {
        return false;
    }
    return true;
}

function akow_Validate_EmailAddress_V3(emailAddress, ctrlScope) {
    if (emailAddress == '' || emailAddress == null) {
        return true;
    }

    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};
