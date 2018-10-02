// *** Update by : Pongthorn Paemanee ***
// *** Update Date : 26/10/2015 15:00  ***

ARSoft_Claim_Web.constant('RESULT_TYPE', {
    Normal: 0,
    InvalidToken: -1,
    InternalException: -2,
    NonReferenceData: -3,
    DBConstraint: -4,
    Warning: -5
});

ARSoft_Claim_Web.constant('PROJECT_STATUS', {
    draft: 1,
    Active: 2,
    Extended: 3,
    Expired: 4,
    Cancle: 5
});

ARSoft_Claim_Web.constant('TIME_TO_REPAIR_TYPE', {
    SBD: 1,
    NBD: 2
});

ARSoft_Claim_Web.constant('SLA_TYPE', {
    Hour: 1,
    Day: 2
});

ARSoft_Claim_Web.constant('PROJECT_PM', {
    Yes: 1,
    No: 0
});

ARSoft_Claim_Web.constant('PROJECT_BUFFERING', {
    Yes: 1,
    No: 0
});

ARSoft_Claim_Web.constant('LEFT_RIGHT_RELATION', {
    Left: 0,
    Right: 1
});

ARSoft_Claim_Web.constant('PROJECT_EQUIPMENT_TYPE', {
    Goods: 1,
    Buffer: 2
});

ARSoft_Claim_Web.constant('ACTION_MODE', {
    Add: 'Add',
    Edit: 'Edit',
    Delete: 'Delete',
    View: 'View'
});

ARSoft_Claim_Web.constant('SUPPLIER_TYPE', {
    Seller: 1,
    SOP: 2,
    Subcontractor: 3,
    Other: 4
});

ARSoft_Claim_Web.constant('CUSTOMER_TYPE', {
    Project: 1,
    Product: 2
});

ARSoft_Claim_Web.constant('CUSTOMER_JURISTIC_TYPE', {
    Organization: 1,
    Individual: 2,
    properties: {
        1: { text: "ลูกค้าโครงการ", value: 1 },
        2: { text: "ลูกค้ารายย่อย", value: 2 }
    }
});

ARSoft_Claim_Web.constant('CUSTOMER_GROUP', {
    Corporate: 1,
    Retailer: 2,
    Dealer: 3,
    Internal: 4
});

ARSoft_Claim_Web.constant('STATUS', {
    Active: 1,
    Inactive: 2
});

ARSoft_Claim_Web.constant('CONTACT_TYPE', {
    Direct: 1,
    Indirect: 2
});

ARSoft_Claim_Web.constant('JOB_CATEGORY', {
    InHouse: 1,
    Onsite: 2
});

ARSoft_Claim_Web.constant('ACTION_QTY_TYPE', {
    SingleTask: 1,
    MultipleTask: 2
});

ARSoft_Claim_Web.constant('JOB_STATUS', {
    Created: 1,
    Opened: 2,
    Cancel: 3,
    Inprogress: 4,
    Closed: 5,
    CloseRework: 6,
    CloseTransfer: 7
});

ARSoft_Claim_Web.constant('EQUIPMENT_TYPE', {
    ProjectItem: 1,
    BufferItem: 2,
    RetailItem: 3,
    SparePart: 4,
    Component: 5
});

ARSoft_Claim_Web.constant('OPERATOR', {
    Equal: '=',
    MoreThan: '>',
    LessThan: '<',
    MoreThanEqual: '>=',
    LessThanEqual: '<='
});

ARSoft_Claim_Web.constant('ACTION_BUTTON', {
    PrintJob: 1,
    SaveJob: 2,
    OpenJob: 3,
    CancelJob: 4,
    ClosedJob: 5
});

ARSoft_Claim_Web.constant('DOCUMENT_SOURCE_TYPE', {
    JobAttachment: 1,
    ContractAttachment: 2,
    OtherAttachments: 3
});

ARSoft_Claim_Web.constant('SERVICES_PROCESS', {
    CreatedJob: 1,
    AssignedJob: 2,
    AcceptJob: 3,
    EditJob: 4,
    InternalEngineerEditJob: 5,
    OnsiteEngineerEditJob: 6,
    QuotationMangement: 7,
    PartManagement: 8,
    BufferManagement: 9,
    ClaimManagement: 10,
    SpoProcess: 11,
    ILinkProcess: 12,
    SBSProcess: 13,
    OnsiteCMEditJob: 14,
    OnsitePMEditJob: 15,
    AdminEditJob: 16


});

ARSoft_Claim_Web.constant('STOCK_ITEM_REQUEST_STATUS', {
    RequestPart: 1,
    MachineArrived: 2,
    Sale: 3,
    ReturnGood: 4,
    ReturnDamn: 5,
    ReturnManufacturingDamn: 6,
    Cancel: 7
});

ARSoft_Claim_Web.constant('JOB_ACTIONS', {
    Created: 1,
    OpenJob: 2,
    CancelJob: 3,
    InProgress: 4,
    ClosedJob: 5,
    ClosedRework: 6,
    ClosedTransfer: 7,
    // ----------- Matching Job Status Reserved ---------------------
    AssignedJob: 10,
    RejectedJob: 11,
    AcceptedJob: 12,
    ReassignJob: 13,
    Appointment: 14,
    RequestPart: 15,
    MachineArrived: 16,
    Repair: 17,
    TransferInternal: 18,
    ClosedRepair: 19,
    // ---- Reserved ----
    TravelStart: 21,
    CheckIn: 22,
    CheckOut: 23,
    // ---- Reserved ----
    WaitingBufferStock: 31,
    WaitingStock: 32,
    WaitingQuotation: 33,
    WaitingClaim: 34,
    WaitingCustomer: 35,
    WaitingPurchaseOrder: 36,
    WaitingSupplier: 37,
    SendQuotation: 38,
    FollowUpCustomer: 39,
    ReviseQuotation: 40,
    CustomerConfirmed: 41,
    CustomerCanceled: 42,
    EngineerCanceled: 43,
    UnexpectedCanceled: 44,
    Donate: 60,
    Return: 61,
    BranchTransferOut: 65,
    BranchTransferIn: 66,
    CancelDocument:67,
    TransferOutsideJob: 68,
    SMSSent: 69
});

ARSoft_Claim_Web.constant('JOB_STEP', {
    Created: 1,
    Opened: 2,
    Canceled: 3,
    Pending: 4,
    Closed: 5
});

ARSoft_Claim_Web.constant('SPAREPART_REQUEST', {
    RequestPart: 15,
    MachineArrived: 16,
    WaitingStock: 32,
    WaitingQuotation: 33,
    WaitingClaim: 34,
    WaitingCustomer: 35,
    WaitingSupplier: 37,
    CustomerConfirmed: 41,
    CustomerCanceled: 42,
    EngineerCanceled: 43
});

ARSoft_Claim_Web.constant('REQUEST_PART_TO', {
    QuotationCenter: 1,
    SupplierClaim: 2,
    StockCenter: 3,
    BufferStock: 4
});

ARSoft_Claim_Web.constant('SOURCE_REQUEST_SPO', {
    BufferStock: 1,    
    StockCenter: 2,
    QuotationCenter: 3
});

// 1 = Buffer, 2 = Stock, 3 =Quotation, 4 =Claim
ARSoft_Claim_Web.constant('BORROW_TYPE', {
    Buffer: 1,
    Stock: 2,
    Quotation: 3,
    Claim: 4
});

ARSoft_Claim_Web.constant('SPAREPART_SEARCH_STATUS', {
    MachineArrived: 16,
    SparePartReturned: 20,
    WaitingStock: 32,
    WaitingPurchaseOrder: 36,
    WaitingSupplier: 37,
    CustomerCanceled: 42,
    EngineerCanceled: 43,
    SupplierCanceled: 44,
    WaitingRequestSparePart: 46
});

ARSoft_Claim_Web.constant('SPAREPART_ITEM_STATUS', {
    RequestPart: 1,
    MachineArrived: 2,
    Sale: 3,
    ReturnGood: 4,
    ReturnDamn: 5,
    ReturnManufacturingDamn: 6,
    Canceled: 7
});

ARSoft_Claim_Web.constant('EQUIPMENTS_BORROW_REQUEST', {
    Buffer: 1,
    Stock: 2,
    Quotation: 3,
    Claim: 4
});

ARSoft_Claim_Web.constant('QUOTATION_ITEMS_STATUS', {
    CustomerConfirmed: 1,
    CustomerCanceled: 2
});

ARSoft_Claim_Web.constant('QUOTATION_STATUS', {
    MachineArrived: 16,
    WaitingStock: 32,
    WaitingQuotation: 33,
    WaitingCustomer: 35,
    WaitingSupplier: 37,
    SentQuotation: 38,
    ReviseQuotation: 40,
    CustomerConfirmed: 41,
    CustomerCanceled: 42,
    EngineerCanceled: 43
});

ARSoft_Claim_Web.constant('QUOTATION_CONFIRM_STATUS', {
    WaitingCustomer: 35,
    ReviseQuotation: 40,
    CustomerConfirmed: 41,
    CustomerCanceled: 42
});

ARSoft_Claim_Web.constant('SPO_SEARCH_STATUS', {
    WaitingPurchaseOrder: 36,
    WaitingRequestSparePart: 46,
    WaitingSupplier: 37,
    WaitingStock: 32,
    MachineArrived: 16,
    EngineerCanceled: 43,
    CustomerCanceled: 42,
    SupplierCanceled: 44
});

ARSoft_Claim_Web.constant('SUPPLIER_CLAIM_STATUS', {
    MachineArrived: 16,
    WaitingClaim: 34,
    WaitingSupplier: 37,
    EngineerCanceled: 43,
    CancelClaim: 45,
    TransferOutsideJob: 68,
    WaitingQuotation: 33
});

ARSoft_Claim_Web.constant('SUPPLIER_CLAIM_ITEM_STATUS', {
    RequestPart: 1,
    MachineArrived: 2,
    Canceled: 7,
    Description: {
        RequestPart: "Request Part",
        MachineArrived: "Machine Arrived",
        Canceled: "Canceled (ยกเลิก)"
    }
});

//ARSoft_Claim_Web.constant('SERVICES_PROCESS', {
//    CreatedJob: 1,
//    AssignedJob: 2,
//    AcceptJob: 3,
//    EditJob: 4,
//    RequestPart: 5,
//    RequestBuffer: 6,
//    QuotationMangement: 7,
//    PartManagement: 8,
//    BufferManagement: 9,
//    ClaimManagement: 10
//});

ARSoft_Claim_Web.constant('SEND_MAIL_STATUS', {
    None: 1,
    Success: 2,
    UnSuccess: 3
});

ARSoft_Claim_Web.constant('DEALER_DISCOUNT_TYPE', {
    Price: 1,
    Discount: 2    
});

ARSoft_Claim_Web.constant('SEARCH_RESULT_TYPE', {
    Found: 1,
    MoreThanOne: 2,
    Other: 3,
    NotFound: 4
});

ARSoft_Claim_Web.constant('SPO_ITEMS_STATUS', {
    WaitingPart: 1,
    MachineArrived: 2,
    Canceled: 7
});

ARSoft_Claim_Web.constant('SPO_REQUEST_TYPE', {
    Purchase: 1,
    RequestSparePart: 2
});

ARSoft_Claim_Web.constant('SERCVICES_REPORTS_TYPE', {
        White : 1,
        Blue : 2,
        Green : 3,
        Pink : 4,
        New : 7
});

ARSoft_Claim_Web.constant('CANCEL_PROCESS_STATUS', {
    CustomerCanceled: 42,
    EngineerCanceled: 43,
    SupplierCanceled: 44
});

ARSoft_Claim_Web.constant('CHARGE_CATEGORY', {
    ServicesCharge: 5    
});

ARSoft_Claim_Web.constant('SERVICES_ORDER_TYPES', {
    CarryIn: 1,
    MailIn: 2,
    Delivery: 3,
    Pickup: 4,
    OnsiteCM: 5,
    OnsiteHD: 6,
    OnsiteInstallation: 7,
    OnsitePM: 8,
    OnsiteILarge: 9
});

ARSoft_Claim_Web.constant('USER_TYPE', {
    Main: '1',
    ServiceCounterSup: '12'
});

ARSoft_Claim_Web.constant('CLASSIFICATION', {
    ProjectType: '1',
    SkillGroup: '2',
    ProjectGroup: '6',
    BuOwner : '7',
    EmployeeType: '3',
    SkillName: '8',
    DocumentType: '14',
    Section: '17',
    Division:'9',
    Department:'19'
    //Org: '1',
    //Sub: '2',
    //BuOwner: '3',
    //TransactionType: '4',
    //Warehouse: '5',
    //Locator: '6',
    //PurchaseStatus: '7',
    //BorrowStatus: '8',
    //AdjustReason: '9',
    //MaterialType: '10',
    //ReceiveStatus: '11',
    //BufferAdjustReason: '12',
    //BufferLocator: '13',
    //BufferWarehouse: '14'
});

ARSoft_Claim_Web.constant('ADJUST_TYPE', {
    AdjustmentIn: 1,
    AdjustmentOut: 2,
    AdjustmentOutThanIn: 3
});

ARSoft_Claim_Web.constant('ADJUST_DETAIL_TYPE', {
    In: 1,
    Out: 2
});

ARSoft_Claim_Web.constant('ADJUST_REASON', {
    UpdateCode: 49,
    UpdatePrice: 50,
    UpdateParts: 51,
    UpdateAmountIn: 125,
    UpdateAmountOut: 126,
    UpdateOutSale: 127,
    UpdateOutWA: 128,
    UpdateSumParts: 129
});
