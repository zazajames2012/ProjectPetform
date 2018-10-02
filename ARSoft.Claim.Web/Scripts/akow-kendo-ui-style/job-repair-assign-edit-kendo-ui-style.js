
$("#JobRepairAssign_TabExternalFixingCost").kendoNumericTextBox({
    format: "#,###,###,###,###,###.00",
    value: 0.00,
    min: 0.00,
    max: 9999999999999999.99,
    spinners: false
});

if (!($("#JobRepairAssign_TabExternalFixingCost").data("kendoNumericTextBox") == null)) {
    $("#JobRepairAssign_TabExternalFixingCost").data("kendoNumericTextBox").wrapper.width("100%");
}

$("#JobRepairAssign_TabExternalFixingMaterialCost").kendoNumericTextBox({
    format: "#,###,###,###,###,###.00",
    value: 0.00,
    min: 0.00,
    max: 9999999999999999.99,
    spinners: false
});

if (!($("#JobRepairAssign_TabExternalFixingMaterialCost").data("kendoNumericTextBox") == null)) {
    $("#JobRepairAssign_TabExternalFixingMaterialCost").data("kendoNumericTextBox").wrapper.width("100%");
}