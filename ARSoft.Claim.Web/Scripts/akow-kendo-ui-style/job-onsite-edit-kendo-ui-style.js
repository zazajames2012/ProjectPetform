// *** Update by : Nutthapaphon Sopradisth ***
// *** Update Date : 28/10/2015 17:00  ***

/* Tab Process kendoNumericTextBox Style */
$("#dtpInformedDate").kendoDateTimePicker({
    format: "dd/MM/yyyy HH:mm"
});

$("#dtpOpenJobDate").kendoDateTimePicker({
    format: "dd/MM/yyyy HH:mm"
});

$("#dtpAppointmentDate").kendoDateTimePicker({
    format: "dd/MM/yyyy HH:mm"
});

$("#dtpExpectedSLAResponseDate").kendoDateTimePicker({
    format: "dd/MM/yyyy HH:mm"
});

$("#dtpExpectedSLAFixedDate").kendoDateTimePicker({
    format: "dd/MM/yyyy HH:mm"
});

$("#dtpDeliveryDate").kendoDateTimePicker({
    format: "dd/MM/yyyy HH:mm"
});

$("#dtpClosedDate").kendoDateTimePicker({
    format: "dd/MM/yyyy HH:mm"
});

$("#dtpInformedDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
$("#dtpOpenJobDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
$("#dtpAppointmentDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
$("#dtpExpectedSLAResponseDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
$("#dtpExpectedSLAFixedDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
$("#dtpDeliveryDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
$("#dtpClosedDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");

/* Warranty kendoNumericTextBox Style */
$("#txtWarrantyProjectPeriodYear").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "100",
    step: "1"
});

$("#txtWarrantyProjectPeriodMonth").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "60",
    step: "1"
});

$("#txtWarrantySupplierClaim").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "365",
    step: "1"
});

$("#txtWarrantySupplierPeriodYear").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "100",
    step: "1"
});

$("#txtWarrantySupplierPeriodMonth").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "60",
    step: "1"
});

if (!($("#txtWarrantyProjectPeriodYear").data("kendoNumericTextBox") == null)) {
    $("#txtWarrantyProjectPeriodYear").data("kendoNumericTextBox").wrapper.width("35%");
}

if (!($("#txtWarrantyProjectPeriodMonth").data("kendoNumericTextBox") == null)) {
    $("#txtWarrantyProjectPeriodMonth").data("kendoNumericTextBox").wrapper.width("35%");
}

if (!($("#txtWarrantySupplierClaim").data("kendoNumericTextBox") == null)) {
    $("#txtWarrantySupplierClaim").data("kendoNumericTextBox").wrapper.width("40%");
}

if (!($("#txtWarrantySupplierPeriodYear").data("kendoNumericTextBox") == null)) {
    $("#txtWarrantySupplierPeriodYear").data("kendoNumericTextBox").wrapper.width("40%");
}

if (!($("#txtWarrantySupplierPeriodMonth").data("kendoNumericTextBox") == null)) {
    $("#txtWarrantySupplierPeriodMonth").data("kendoNumericTextBox").wrapper.width("40%");
}

/* kendo-date-picker Style */
$("#dtpWarrantyProjectStartDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");
$("#dtpWarrantyProjectEndDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");

$("#dtpWarrantySupplierStartDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");
$("#dtpWarrantySupplierEndDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");

if (!($("#txtWarrantyProjectPeriodYear").data("kendoNumericTextBox") == null)) {
    var txtWarrantyProjectPeriodYear = $("#txtWarrantyProjectPeriodYear").data("kendoNumericTextBox");
    txtWarrantyProjectPeriodYear.enable(false);
}

if (!($("#txtWarrantyProjectPeriodMonth").data("kendoNumericTextBox") == null)) {
    var txtWarrantyProjectPeriodMonth = $("#txtWarrantyProjectPeriodMonth").data("kendoNumericTextBox");
    txtWarrantyProjectPeriodMonth.enable(false);
}

// -------------------------------------------------------------------------------------------------------------------------

/* Transfer Outside kendoNumericTextBox Style */
$("#txtExternalFixingCost").kendoNumericTextBox({
    format: "###,###,###,###.00",
    value: 0.00,
    min: 0.00,
    max: 999999999999.99,
    spinners: false
});

if (!($("#txtExternalFixingCost").data("kendoNumericTextBox") == null)) {
    $("#txtExternalFixingCost").data("kendoNumericTextBox").wrapper.width("50%");
}

//$("#txtExternalFixingCost").data("kendoNumericTextBox").value(JSON.parse($('#hdSmallLaborCost').val()));

$("#dtpExternalSentDate").kendoDateTimePicker({
    format: "dd/MM/yyyy HH:mm"
});

$("#dtpExternalReturnDate").kendoDateTimePicker({
    format: "dd/MM/yyyy HH:mm"
});


$("#dtpExternalSentDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
$("#dtpExternalReturnDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");

//$("#dtpInformedDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
//$("#dtpOpenJobDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
//$("#dtpAppointmentDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
//$("#dtpExpectedSLAResponseDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
//$("#dtpExpectedSLAFixedDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
//$("#dtpDeliveryDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
//$("#dtpClosedDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");

