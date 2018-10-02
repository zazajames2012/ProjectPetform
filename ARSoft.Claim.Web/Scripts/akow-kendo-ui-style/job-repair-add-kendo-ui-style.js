
$("#JobRepair_AddMasEquipWarrantyYear").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "10",
    step: "1",
    decimals: 0
});

$("#JobRepair_AddMasEquipWarrantyYear").data("kendoNumericTextBox").wrapper.width("80px");

$("#JobRepair_AddMasEquipWarrantyMonth").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "12",
    step: "1",
    decimals: 0
});

$("#JobRepair_AddMasEquipWarrantyMonth").data("kendoNumericTextBox").wrapper.width("80px");

$("#JobRepair_AddMasEquipClaimLimit").kendoNumericTextBox({
    format: "0",
    value: "0",
    min: "0",
    max: "30",
    step: "1",
    decimals: 0
});

$("#JobRepair_AddMasEquipClaimLimit").data("kendoNumericTextBox").wrapper.width("80px");
