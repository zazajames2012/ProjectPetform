// *** Update by : Nutthapaphon Sopradisth ***
// *** Update Date : 28/10/2015 17:00  ***

/* kendoNumericTextBox Style */
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
    max: "72",
    step: "1"
});

$("#txtWarrantySupplierPeriodYear").data("kendoNumericTextBox").wrapper.width("40%");
$("#txtWarrantySupplierPeriodMonth").data("kendoNumericTextBox").wrapper.width("40%");

//$("#dtpInformedDate").kendoDateTimePicker({
//    value: new Date()    
//});

//$("#dtpOpenJobDate").kendoDateTimePicker({
//    value: new Date(),
//    format: "dd/MM/yyyy hh:mm tt"
//});

/* kendo-date-picker Style */
$("#dtpAppointmentDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
$("#dtpWarrantyStartDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");
$("#dtpWarrantyEndDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");
$("#dtpInformedDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
$("#dtpOpenJobDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
$("#dtpExpectedSLAResponseDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");
$("#dtpExpectedSLAFixedDate").kendoMaskedTextBox({ mask: "00/00/0000 00:00" }).removeClass("k-textbox");




