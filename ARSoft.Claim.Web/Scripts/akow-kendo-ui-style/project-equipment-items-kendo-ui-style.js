// *** Update by : Nutthapaphon Sopradisth ***
// *** Update Date : 28/10/2015 17:00  ***

/* kendoNumericTextBox Style */
$("#pei_txtQuantity").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "10000000",
    step: "1"
});

$("#pei_txtClaimLimite").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "30",
    step: "1"
});

$("#pei_txtSupplierWarrantyPeroidYear").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "100",
    step: "1"
});

$("#pei_txtSupplierWarrantyPeroidMonth").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "11",
    step: "1"
});

$("#pei_txtQuantity").data("kendoNumericTextBox").wrapper.width("100%");
$("#pei_txtClaimLimite").data("kendoNumericTextBox").wrapper.width("100%");
$("#pei_txtSupplierWarrantyPeroidYear").data("kendoNumericTextBox").wrapper.width("100%");
$("#pei_txtSupplierWarrantyPeroidMonth").data("kendoNumericTextBox").wrapper.width("100%");

var txtWarrantySupplierPeriodYear = $("#pei_txtSupplierWarrantyPeroidYear").data("kendoNumericTextBox");
txtWarrantySupplierPeriodYear.enable(false);

var txtWarrantySupplierPeriodMonth = $("#pei_txtSupplierWarrantyPeroidMonth").data("kendoNumericTextBox");
txtWarrantySupplierPeriodMonth.enable(false);

var txtQuantity = $("#pei_txtQuantity").data("kendoNumericTextBox");
txtQuantity.enable(false);

/* kendo-date-picker Style */
$("#pei_dtpSupplierWarrantyStartDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");
$("#pei_dtpSupplierWarrantyEndDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");
$("#pei_dtpProjectWarrantyStartDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");
$("#pei_dtpProjectWarrantyEndDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");




