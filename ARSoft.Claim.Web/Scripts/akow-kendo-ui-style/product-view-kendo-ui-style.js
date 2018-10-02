/* kendoNumericTextBox Style */
// Labor Cost Hardware
$("#txtSmallLaborCostHardware").kendoNumericTextBox({
    format: "###,###.00   ",
    value: 0.00,
    min: 0.00,
    max: 2500.00,
    spinners: false,
});

$("#txtNormalLaborCostHardware").kendoNumericTextBox({
    format: "###,###.00   ",
    value: 0.00,
    min: 0.00,
    max: 2500.00,
    spinners: false
});

$("#txtLargeLaborCostHardware").kendoNumericTextBox({
    format: "###,###.00   ",
    value: 0.00,
    min: 0.00,
    max: 2500.00,
    spinners: false
});

$("#txtExtraLargeLaborCostHardware").kendoNumericTextBox({
    format: "###,###.00   ",
    value: 0.00,
    min: 0.00,
    max: 2500.00,
    spinners: false
});

// Labor Cost Software
$("#txtSmallLaborCostSoftware").kendoNumericTextBox({
    format: "###,###.00   ",
    value: 0.00,
    min: 0.00,
    max: 2500.00,
    spinners: false
});

$("#txtNormalLaborCostSoftware").kendoNumericTextBox({
    format: "###,###.00   ",
    value: 0.00,
    min: 0.00,
    max: 2500.00,
    spinners: false
});

$("#txtLargeLaborCostSoftware").kendoNumericTextBox({
    format: "###,###.00   ",
    value: 0.00,
    min: 0.00,
    max: 2500.00,
    spinners: false
});

$("#txtExtraLargeLaborCostSoftware").kendoNumericTextBox({
    format: "###,###.00   ",
    value: 0.00,
    min: 0.00,
    max: 2500.00,
    spinners: false
});

// Minimum Price

// Dealer Discount
$("#txtSmallDealerDiscount").kendoNumericTextBox({
    format: "###.00   ",
    value: 0.00,
    min: 0.00,
    max: 100.00
});

$("#txtNormalDealerDiscount").kendoNumericTextBox({
    format: "###.00   ",
    value: 0.00,
    min: 0.00,
    max: 100.00
});

$("#txtLargeDealerDiscount").kendoNumericTextBox({
    format: "###.00   ",
    value: 0.00,
    min: 0.00,
    max: 100.00
});

$("#txtExtraLargeDealerDiscount").kendoNumericTextBox({
    format: "###.00   ",
    value: 0.00,
    min: 0.00,
    max: 100.00
});

$("#txtSmallLaborCostHardware").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtNormalLaborCostHardware").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtLargeLaborCostHardware").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtExtraLargeLaborCostHardware").data("kendoNumericTextBox").wrapper.width("100%");

$("#txtNormalLaborCostSoftware").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtLargeLaborCostSoftware").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtExtraLargeLaborCostSoftware").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtSmallLaborCostSoftware").data("kendoNumericTextBox").wrapper.width("100%");

$("#txtNormalDealerDiscount").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtLargeDealerDiscount").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtExtraLargeDealerDiscount").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtSmallDealerDiscount").data("kendoNumericTextBox").wrapper.width("100%");

var isEnableSmallAll = false;
var isEnableNormalAll = false;
var isEnableLargeAll = false;
var isEnableExtraLargeAll = false;

var isEnableSmallMinimumPrice = false;
var isEnableNormalMinimumPrice = false;
var isEnableLargeMinimumPrice = false;
var isEnableExtraLargeMinimumPrice = false;

//var isEnableSmallAll = JSON.parse($('#hdSmallLaborCost').val());
//var isEnableNormalAll = JSON.parse($('#hdNormalLaborCost').val());
//var isEnableLargeAll = JSON.parse($('#hdLargeLaborCost').val());
//var isEnableExtraLargeAll = JSON.parse($('#hdExtraLargeLaborCost').val());

//var isEnableSmallMinimumPrice = JSON.parse($('#hdSmallMinimumPrice').val());
//var isEnableNormalMinimumPrice = JSON.parse($('#hdNormalMinimumPrice').val());
//var isEnableLargeMinimumPrice = JSON.parse($('#hdLargeMinimumPrice').val());
//var isEnableExtraLargeMinimumPrice = JSON.parse($('#hdExtraLargeMinimumPrice').val());

if (isEnableSmallMinimumPrice) {
    $("#txtSmallMinimumPrice").kendoNumericTextBox({
        format: "###,###.00   ",
        value: 100.00,
        min: 100.00,
        max: 2500.00,
        spinners: false
    });
} else {
    $("#txtSmallMinimumPrice").kendoNumericTextBox({
        format: "###,###.00   ",
        value: 0.00,
        min: 0.00,
        max: 2500.00,
        spinners: false
    });
}

if (isEnableNormalMinimumPrice) {
    $("#txtNormalMinimumPrice").kendoNumericTextBox({
        format: "###,###.00   ",
        value: 100.00,
        min: 100.00,
        max: 2500.00,
        spinners: false
    });
}else{
    $("#txtNormalMinimumPrice").kendoNumericTextBox({
        format: "###,###.00   ",
        value: 0.00,
        min: 0.00,
        max: 2500.00,
        spinners: false
    });
}

if (isEnableLargeMinimumPrice) {
    $("#txtLargeMinimumPrice").kendoNumericTextBox({
        format: "###,###.00   ",
        value: 100.00,
        min: 100.00,
        max: 2500.00,
        spinners: false
    });
} else {
    $("#txtLargeMinimumPrice").kendoNumericTextBox({
        format: "###,###.00   ",
        value: 0.00,
        min: 0.00,
        max: 2500.00,
        spinners: false
    });
}

if (isEnableExtraLargeMinimumPrice) {
    $("#txtExtraLargeMinimumPrice").kendoNumericTextBox({
        format: "###,###.00   ",
        value: 100.00,
        min: 100.00,
        max: 2500.00,
        spinners: false
    });
} else {
    $("#txtExtraLargeMinimumPrice").kendoNumericTextBox({
        format: "###,###.00   ",
        value: 0.00,
        min: 0.00,
        max: 2500.00,
        spinners: false
    });
}

$("#txtNormalMinimumPrice").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtLargeMinimumPrice").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtExtraLargeMinimumPrice").data("kendoNumericTextBox").wrapper.width("100%");
$("#txtSmallMinimumPrice").data("kendoNumericTextBox").wrapper.width("100%");

// Small Labor Cost
var txtSmallLaborCostHardware = $("#txtSmallLaborCostHardware").data("kendoNumericTextBox");
txtSmallLaborCostHardware.enable(isEnableSmallAll);

var txtSmallLaborCostSoftware = $("#txtSmallLaborCostSoftware").data("kendoNumericTextBox");
txtSmallLaborCostSoftware.enable(isEnableSmallAll);

var txtSmallDealerDiscount = $("#txtSmallDealerDiscount").data("kendoNumericTextBox");
txtSmallDealerDiscount.enable(isEnableSmallAll);

var txtSmallMinimumPrice = $("#txtSmallMinimumPrice").data("kendoNumericTextBox");
txtSmallMinimumPrice.enable(isEnableSmallAll);

// Normal Labor Cost
var txtNormalLaborCostHardware = $("#txtNormalLaborCostHardware").data("kendoNumericTextBox");
txtNormalLaborCostHardware.enable(isEnableNormalAll);

var txtNormalLaborCostSoftware = $("#txtNormalLaborCostSoftware").data("kendoNumericTextBox");
txtNormalLaborCostSoftware.enable(isEnableNormalAll);

var txtNormalDealerDiscount = $("#txtNormalDealerDiscount").data("kendoNumericTextBox");
txtNormalDealerDiscount.enable(isEnableNormalAll);

var txtNormalMinimumPrice = $("#txtNormalMinimumPrice").data("kendoNumericTextBox");
txtNormalMinimumPrice.enable(isEnableNormalAll);

// Large Labor Cost
var txtLargeLaborCostHardware = $("#txtLargeLaborCostHardware").data("kendoNumericTextBox");
txtLargeLaborCostHardware.enable(isEnableLargeAll);

var txtLargeLaborCostSoftware = $("#txtLargeLaborCostSoftware").data("kendoNumericTextBox");
txtLargeLaborCostSoftware.enable(isEnableLargeAll);

var txtLargeDealerDiscount = $("#txtLargeDealerDiscount").data("kendoNumericTextBox");
txtLargeDealerDiscount.enable(isEnableLargeAll);

var txtLargeMinimumPrice = $("#txtLargeMinimumPrice").data("kendoNumericTextBox");
txtLargeMinimumPrice.enable(isEnableLargeAll);

// Extra Large Labor Cost
var txtExtraLargeLaborCostHardware = $("#txtExtraLargeLaborCostHardware").data("kendoNumericTextBox");
txtExtraLargeLaborCostHardware.enable(isEnableExtraLargeAll);

var txtExtraLargeLaborCostSoftware = $("#txtExtraLargeLaborCostSoftware").data("kendoNumericTextBox");
txtExtraLargeLaborCostSoftware.enable(isEnableExtraLargeAll);

var txtExtraLargeDealerDiscount = $("#txtExtraLargeDealerDiscount").data("kendoNumericTextBox");
txtExtraLargeDealerDiscount.enable(isEnableExtraLargeAll);

var txtExtraLargeMinimumPrice = $("#txtExtraLargeMinimumPrice").data("kendoNumericTextBox");
txtExtraLargeMinimumPrice.enable(isEnableExtraLargeAll);

