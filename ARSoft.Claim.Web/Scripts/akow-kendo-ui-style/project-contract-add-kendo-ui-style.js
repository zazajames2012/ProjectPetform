// *** Update by : Nutthapaphon Sopradisth ***
// *** Update Date : 28/10/2015 17:00  ***

/* kendoNumericTextBox Style */
$("#txtDayToDelivery").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "365",
    step: "1"
});

$("#txtDayToInstallation").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "365",
    step: "1"
});

$("#txtSLAInternalRepairUnit").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "180",
    step: "1"
});

$("#txtSLAInternalRepairFinish").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "180",
    step: "1"
});

$("#txtDRResponse").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "180",
    step: "1"
});

$("#txtDRFixed").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "180",
    step: "1"
});

$("#txtStartPMAfterInstallation").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "180",
    step: "1"    
});

$("#txtProjectValue").kendoNumericTextBox({
    format: "###,###,###,###.00   ",
    value: 0.00,
    min: 0.00,
    max: 999999999999.99,
    spinners: false
});

$("#txtPenalty").kendoNumericTextBox({
    format: "###,###.00   ",
    value: 0.00,
    min: 0.00,
    max: 999999.99,
    spinners: false
});

$("#txtDayToDelivery").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtDayToInstallation").data("kendoNumericTextBox").wrapper.width("100%");

$("#txtSLAInternalRepairUnit").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtSLAInternalRepairFinish").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtDRResponse").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtDRFixed").data("kendoNumericTextBox").wrapper.width("100%");

$("#txtProjectValue").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtPenalty").data("kendoNumericTextBox").wrapper.width("100%");

/* kendo-date-picker Style */
$("#dtpSignedDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");
$("#dtpDeliveryDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");
$("#dtpInstallationDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");
$("#dtpWarrantyStartDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");
$("#dtpWarrantyEndDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");
$("#dtpServiceStartDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");
$("#dtpServiceEndDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");
$("#dtpPMStartDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");
$("#dtpReceiveContractDate").kendoMaskedTextBox({ mask: "00/00/0000" }).removeClass("k-textbox");

var txtDRResponseNumericTextBox = $("#txtDRResponse").data("kendoNumericTextBox");
txtDRResponseNumericTextBox.enable(false);

var txtDRFixedNumericTextBox = $("#txtDRFixed").data("kendoNumericTextBox");
txtDRFixedNumericTextBox.enable(false);

$('#txtWarrantyPeroid').removeClass('akow-control-textbox-number').addClass('akow-control-textbox-number-disabled');
$('#txtServicePeriod').removeClass('akow-control-textbox-number').addClass('akow-control-textbox-number-disabled');

