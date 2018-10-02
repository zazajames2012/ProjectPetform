// *** Update by : Nutthapaphon Sopradisth ***
// *** Update Date : 28/10/2015 17:00  ***

/* kendoNumericTextBox Style */
$("#txtStartNotifyHourTime").kendoNumericTextBox({
    //format: "{0:n0}",
    format: "00",
    value: "00",
    min: "00",
    max: "23",
    step: "1"
});

$("#txtStartNotifyMinuteTime").kendoNumericTextBox({
    //format: "{0:n0}",
    format: "00",
    value: "00",
    min: "00",
    max: "59",
    step: "1"
});

$("#txtFinishNotifyHourTime").kendoNumericTextBox({
    //format: "{0:n0}",
    format: "00",
    value: "00",
    min: "00",
    max: "23",
    step: "1"
});

$("#txtFinishNotifyMinuteTime").kendoNumericTextBox({
    //format: "{0:n0}",
    format: "00",
    value: "00",
    min: "00",
    max: "59",
    step: "1"
});

$("#txtSLALimitHour").kendoNumericTextBox({
    //format: "{0:n0}",
    format: "00",
    value: "00",
    min: "00",
    max: "23",
    step: "1"
});

$("#txtSLALimitMinute").kendoNumericTextBox({
    //format: "{0:n0}",
    format: "00",
    value: "00",
    min: "00",
    max: "59",
    step: "1"
});

$("#txtStartCountNBDHour").kendoNumericTextBox({
    //format: "{0:n0}",
    format: "00",
    value: "00",
    min: "00",
    max: "23",
    step: "1"
});

$("#txtStartCountNBDMinute").kendoNumericTextBox({
    //format: "{0:n0}",
    format: "00",
    value: "00",
    min: "00",
    max: "59",
    step: "1"
});

$("#txtStartNotifyHourTime").kendoMaskedTextBox({
    mask: "00"
});

$("#txtFinishNotifyHourTime").kendoMaskedTextBox({
    mask: "00"
});

$("#txtStartNotifyMinuteTime").kendoMaskedTextBox({
    mask: "00"
});

$("#txtFinishNotifyMinuteTime").kendoMaskedTextBox({
    mask: "00"
});

$("#txtSLALimitHour").kendoMaskedTextBox({
    mask: "00"
});

$("#txtSLALimitMinute").kendoMaskedTextBox({
    mask: "00"
});

$("#txtStartCountNBDHour").kendoMaskedTextBox({
    mask: "00"
});

$("#txtStartCountNBDMinute").kendoMaskedTextBox({
    mask: "00"
});

$("#txtStartNotifyHourTime").data("kendoNumericTextBox").wrapper.width("100px");
$("#txtFinishNotifyHourTime").data("kendoNumericTextBox").wrapper.width("100px");
$("#txtStartNotifyMinuteTime").data("kendoNumericTextBox").wrapper.width("100px");
$("#txtFinishNotifyMinuteTime").data("kendoNumericTextBox").wrapper.width("100px");
$("#txtSLALimitHour").data("kendoNumericTextBox").wrapper.width("100px");
$("#txtSLALimitMinute").data("kendoNumericTextBox").wrapper.width("100px");
$("#txtStartCountNBDHour").data("kendoNumericTextBox").wrapper.width("100px");
$("#txtStartCountNBDMinute").data("kendoNumericTextBox").wrapper.width("100px");
