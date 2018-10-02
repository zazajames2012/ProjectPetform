
$("#JobRepair_TabMasEquipWarrantyYear").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "10",
    step: "1",
    decimals: 0
});

if (!($("#JobRepair_TabMasEquipWarrantyYear").data("kendoNumericTextBox") == null)) {
    $("#JobRepair_TabMasEquipWarrantyYear").data("kendoNumericTextBox").wrapper.width("80px");
}

$("#JobRepair_TabMasEquipWarrantyMonth").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "12",
    step: "1",
    decimals: 0
});

if (!($("#JobRepair_TabMasEquipWarrantyMonth").data("kendoNumericTextBox") == null)) {
    $("#JobRepair_TabMasEquipWarrantyMonth").data("kendoNumericTextBox").wrapper.width("80px");
}

$("#JobRepair_TabMasEquipClaimLimit").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "30",
    step: "1",
    decimals: 0
});

if (!($("#JobRepair_TabMasEquipClaimLimit").data("kendoNumericTextBox") == null)) {
    $("#JobRepair_TabMasEquipClaimLimit").data("kendoNumericTextBox").wrapper.width("80px");
}

$("#JobRepair_TabExternalFixingCost").kendoNumericTextBox({
    format: "#,###,###,###,###,###.00",
    value: 0.00,
    min: 0.00,
    max: 9999999999999999.99,
    spinners: false
});

if (!($("#JobRepair_TabExternalFixingCost").data("kendoNumericTextBox") == null)) {
    $("#JobRepair_TabExternalFixingCost").data("kendoNumericTextBox").wrapper.width("100%");
}

$("#JobRepair_TabExternalFixingMaterialCost").kendoNumericTextBox({
    format: "#,###,###,###,###,###.00",
    value: 0.00,
    min: 0.00,
    max: 9999999999999999.99,
    spinners: false
});

if (!($("#JobRepair_TabExternalFixingMaterialCost").data("kendoNumericTextBox") == null)) {
    $("#JobRepair_TabExternalFixingMaterialCost").data("kendoNumericTextBox").wrapper.width("100%");
}