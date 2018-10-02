using ARSoft.Claim.Model.BOL;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ARSoft.Claim.Model.Enumeration
{
    // *** Update by : Nutthapaphon Sopradisth ***
    // *** Update Date : 22/11/2015 09:00  ***
    public enum RESULT_TYPE
    {
        Normal = 0,
        InvalidToken = -1,
        InternalException = -2,
        NonReferenceData = -3,
        DBConstraint = -4,
        Warning = -5
    }

    //    สถานะของสัญญา Enum { 1 = draft/ร่างสัญญา , 2 = Active/อยู่ระหว่างสัญญา, 3=Extended/ต่ออายุสัญญา, 4 = Expired/หมดอายุสัญญา, 5 = Cancle/ยกเลิกสัญญา }
    // Enum สถานะของโครงการ : 1. อยู่ระหว่างรอสัญญา, 2 = อยู่ในสัญญา, 3 = หมดอายุสัญญา, 4 = ต่ออายุสัญญา
    public enum ContractStatus
    {
        [Description("อยู่ระหว่างรอสัญญา")]
        draft = 1,
        [Description("อยู่ในสัญญา")]
        Active = 2,
        [Description("หมดอายุสัญญา")]
        Expired = 3,
        [Description("ต่ออายุสัญญา (*)")]
        Extended = 4,
        [Description("นอกประกัน")]
        OutWarranty = 5

        //[Description("ร่างสัญญา")]
        //draft = 1,
        //[Description("ระหว่างสัญญา")]
        //Active = 2,
        //[Description("ต่ออายุสัญญา")]
        //Extended = 3,
        //[Description("หมดอายุสัญญา")]
        //Expired = 4,
        //[Description("ยกเลิกสัญญา")]
        //Cancle = 5
    }

    //    Time To Repair Type Enum { 1= SBD/ Same Business Day , 2 = NBD / Next Business Day }
    public enum TimeToRepairType
    {
        [Description("Same Business Day")]
        SBD = 1,
        [Description("Next Business Day")]
        NBD = 2
    }

    //SAL Unit Enum { 1 = Hour/ชั่วโมง, 2 = Day/วัน }
    public enum SLAUnitEnum
    {
        [Description("ชั่วโมง")]
        Hour = 1,
        [Description("วัน")]
        Day = 2
    }

    //    PM { Flase = ไม่ทำ PM, True = ทำ PM}
    public enum PMProject
    {
        //[Description("ทำ PM")]
        //True,
        //[Description("ไม่ทำ PM")]
        //Flase
        [Description("Yes")]
        True,
        [Description("No")]
        Flase
    }

    //    Buffering ทดแทนเครื่องเสีย { False = ไม่วางสำรอง, True = วางสำรอง}
    public enum Buffering
    {
        [Description("วางสำรอง")]
        True,
        [Description("ไม่วางสำรอง")]
        False
    }

    // Include Spare Part	รวมอะไหล่	False = ไม่รวมอะไหล่, True = รวมอะไหล่	
    public enum IncludeSparePart
    {
        [Description("รวมอะไหล่")]
        True,
        [Description("ไม่รวมอะไหล่")]
        False
    }
    public enum LeftRightRelation
    {
        Left = 0,
        Right = 1
    }

    //ประเภทอุปกรณ์ (Prject Equpment Type) Enum { 1= Goods/สินค้า, 2=Buffer/เครื่องสำรอง}
    public enum ProjectEquipmentType
    {
        [Description("Goods")]
        Goods = 1,
        [Description("Buffer")]
        Buffer = 2,
        [Description("Spare Part Buffer")]
        SparePart = 3,
        [Description("Goods Draft")]
        GoodsDraft = 4,
    }

    //ประเภทอุปกรณ์ (Prject Equpment Type) Enum { 1= Project Item/สินค้า, 2=Buffer/เครื่องสำรอง}
    public enum ProjectEquipmentTypes
    {
        [Description("Project Item")]
        ProjectItem = 1,
        [Description("Buffer")]
        Buffer = 2
    }

    public enum ActionMode
    {
        [Description("เพิ่มข้อมูล")]
        Add = 1,
        [Description("แก้ไขข้อมูล")]
        Edit = 2,
        [Description("ลบข้อมูล")]
        Delete = 3,
        [Description("ดูข้อมูล")]
        View = 4,
        [Description("ค้นหาข้อมูล")]
        Search = 5
    }
    public enum ActionErrorMode
    {
        [Description("เพิ่ม")]
        Add = 1,
        [Description("แก้ไข")]
        Edit = 2,
        [Description("ลบ")]
        Delete = 3,
        [Description("ดู")]
        View = 4,
        [Description("ค้นหา")]
        Search = 5,
        [Description("ไม่พบข้อมูล")]
        NotFound = 6,
        [Description("ฮื่นๆ")]
        Other = 7
    }
    public enum ActionButton
    {
        [Description("พิมพ์")]
        PrintJob = 1,
        [Description("บันทึก")]
        SaveJob = 2,
        [Description("เปิดงาน")]
        OpenJob = 3,
        [Description("ยกเลิกงาน")]
        CancelJob = 4,
        [Description("ปิดงาน")]
        ClosedJob = 5
    }

    public enum SupplierType
    {
        [Description("ผู้ขาย")]
        Seller = 1,
        [Description("ผู้รับจ้าง")]
        SOP = 2,
        [Description("ผู้รับเหมา")]
        Subcontractor = 3,
        [Description("อื่นๆ")]
        Other = 4
    }

    public enum SupplierGroup
    {
        [Description("ผู้ขายในประเทศ")]
        Domestic = 1,
        [Description("ผู้ขายต่างประเทศ")]
        Overseas = 2
    }

    // ประเภทลูกค้า 1 = Project , 2 = Product
    public enum CustomerType
    {
        [Description("ลูกค้าโครงการ")]
        Project = 1,
        [Description("ลูกค้ารายย่อย")]
        Product = 2
    }
    // กลุ่มลูกค้า 1 = Organization , 2 = Individual
    public enum CustomerJuristicType
    {
        [Description("ลูกค้าองค์กร")]
        Organization = 1,
        [Description("บุคคลทั่วไป")]
        Individual = 2
    }
    public enum CustomerGroup
    {
        [Description("ลูกค้าองค์กร")]
        Corporate = 1,
        [Description("ลูกค้ารายย่อย")]
        Retailer = 2,
        [Description("ตัวแทนจำหน่าย")]
        Dealer = 3,
        [Description("ลูกค้าภายใน")]
        Internal = 4
    }

    public enum Status
    {
        [Description("ใช้งาน")]
        Active = 1,
        [Description("ไม่ใช้งาน")]
        Inactive = 0
    }
    public enum SparepartStatus
    {
        [Description("ใช้งาน")]
        Active = 1,
        [Description("ไม่ใช้งาน")]
        Inactive = 2,
        [Description("เลิกผลิต")]
        Discontinued = 3
    }
    public enum ContactType
    {
        [Description("ติดต่อโดยตรง")]
        Direct = 1,
        [Description("ผู้ติดต่อ อื่นๆ")]
        Indirect = 2
    }

    // ประเภท BU
    public enum BusinessUnitType
    {
        [Description("Region")]
        Region = 1,
        [Description("SVOA Center")]
        SVOACenter = 2,
        [Description("Non SVOA Center")]
        NonSVOACenter = 3,
        [Description("Customer Site")]
        CustomerSite = 4
    }

    // ประเภทการตอบรับตาม SLA
    public enum SLAResponseType
    {
        [Description("Same Business Day")]
        SBD = 1,
        [Description("Next Business Day")]
        NBD = 2,
        [Description("Turn Around Time")]
        TAT = 3
    }

    //ประเภทอุปกรณ์ (Equpment Type)  (1 = Project Item, 2 = Buffer Item , 3 = Retail Item, 4 = Spare Part, 5 = Component)
    public enum EquipmentType
    {
        [Description("อุปกรณ์")]
        ProjectItem = 1,
        [Description("เครื่องสำรอง")]
        BufferItem = 2,
        [Description("อุปกรณ์ค้าปลีก")]
        RetialItem = 3,
        [Description("อะไหล่")]
        SparePart = 4,
        [Description("ชิ้นส่วน")]
        Component = 5
    }

    public enum JobEffectedDate
    {
        [Description("(วันเวลา รับแจ้ง)")]
        InformedDate = 1,
        [Description("(วันเวลา เปิดงาน)")]
        OpenedDate = 2,
        [Description("(วันเวลา Assign งาน)")]
        AssignedDate = 3,
        [Description("(วันเวลา ช่างรับงาน)")]
        AcceptedDate = 4,
        [Description("(วันเวลา ต้องตอบรับ)")]
        ExpectedResponseDate = 5,
        [Description("(วันเวลา ต้องดำเนินการเสร็จสิ้น)")]
        ExpectedFixedDate = 6,
        [Description("(วันเวลา นัดหมาย)")]
        AppointmentDate = 7,
        [Description("(วันเวลา ที่ออกเดินทาง)")]
        TravelStartDate = 8,
        [Description("(วันเวลา ที่ถึงไซต์งาน)")]
        CheckInDate = 9,
        [Description("(วันเวลา ที่ออกจากไซต์งาน)")]
        CheckInOutDate = 10,
        [Description("(วันเวลา ที่เริ่มแก้ไข)")]
        FixStartDate = 11,
        [Description("วันเวลา ที่แก้ไขเสร็จสิ้น")]
        FixEndDate = 12,
        [Description("(วันเวลา ที่ส่งมอบงาน)")]
        DeliveryDate = 13,
        [Description("(วันเวลา ที่ปิดงาน)")]
        ClosedDate = 14,
        [Description("(วันเวลา ที่ยกเลิกงาน)")]
        CancelDate = 15
    }

    public enum JobCategory
    {
        [Description("In-House ดำเนินการภายใน")]
        InHouse = 1,
        [Description("Onsite นอกสถานที่")]
        Onsite = 2
    }

    public enum JobUsageCategory
    {
        [Description("In-House ดำเนินการภายใน")]
        InHouse = 1,
        [Description("Onsite นอกสถานที่")]
        Onsite = 2,
        [Description("ใช้งานร่วมกัน")]
        Common = 3
    }

    public enum ActionQtyType
    {
        [Description("ครั้งเดียวเท่านั้น")]
        SingleTask = 1,
        [Description("ทำได้หลายครั้ง")]
        MultipleTask = 2
    }

    public enum WarrantyStatusType
    {
        [Description("In Warranty")]
        InWarranty = 1,
        [Description("Out Warranty")]
        OutWarranty = 2
    }

    public enum WarrantySourceType
    {
        [Description("ข้อมูลจาก Supplier Web Site")]
        SupplierWebSite = 2079,
        [Description("วอยด์ สินค้า")]
        VoidStamp = 2080,
        [Description("ใบเสร็จ")]
        Invoices = 2083,
        [Description("ถอดรหัส")]
        Decode = 2084,
        [Description("อื่นๆ")]
        Other = 2085,
        [Description("Warranty Card")]
        WarrantyCard = 2096,
        [Description("จากสัญญาโครงการ")]
        Contract = 2103
    }

    public enum WarrantyStatusCategory
    {
        [Description("OEM Warranty (Original Equipment Manufacturer)")]
        OEMWarranty = 1,
        [Description("Retail Warranty")]
        RetailWarranty = 2,
        [Description("SVOA Warranty")]
        SVOAWarranty = 3
    }

    public enum WarrantyInsurer
    {
        [Description("ประกันผู้ผลิต")]
        Supplier = 1,
        [Description("ประกันผู้จำหน่าย")]
        Distributor = 2,
        [Description("ประกัน SVOA")]
        SVOA = 3
    }

    public enum OrganizationLevelsText
    {
        [Description("บริษัท")]
        Company = 1,
        [Description("ฝ่าย")]
        Department = 2,
        [Description("แผนก")]
        Division = 3,
        [Description("ส่วนงาน")]
        Section = 4,
        [Description("ส่วนงานย่อย")]
        Sector = 5
    }

    public enum JobTabType
    {
        ResponsiblePersonTabType = 1,

        CustomerTabType = 2,

        WarrantyTabType = 3,

        ItemDetailTabType = 4,

        ProcessDetailTabType = 5,

        RepairActionTabType = 6,

        ResolutionTabType = 7,

        SparePartTabType = 8,

        BufferTabType = 9,

        ServiceChargeTabType = 10,

        ExpenseTabType = 11
    }

    //public enum JobAction
    //{
    //    Created = 1,
    //    OpenJob = 2,
    //    CancelJob = 3,
    //    Inprogress = 4,
    //    Closed = 5,
    //    CloseRework = 6,
    //    CloseTransfer = 7
    //}

    public enum JobStatus
    {
        [Description("Created")]
        Created = 1,
        [Description("Opened")]
        Opened = 2,
        [Description("Canceled")]
        Canceled = 3,
        [Description("In Progress")]
        Inprogress = 4,
        [Description("Closed")]
        Closed = 5,
        [Description("Closed Rework")]
        ClosedRework = 6,
        [Description("Closed Transfer")]
        ClosedTransfer = 7
    }

    public enum JobActions
    {
        [Description("Created")]
        Created = 1,
        [Description("Opened Job")]
        OpenedJob = 2,
        [Description("Canceled Job")]
        CanceledJob = 3,
        [Description("In Progress")]
        InProgress = 4,
        [Description("Closed Job")]
        ClosedJob = 5,
        [Description("Closed Rework")]
        ClosedRework = 6,
        [Description("Closed Transfer")]
        ClosedTransfer = 7,
        // ----------- Matching Job Status Reserved ---------------------
        [Description("Assigned ยังไม่ Accept")]
        AssignedJob = 10,
        [Description("Reject Job")]
        RejectedJob = 11,
        [Description("Accept ยังไม่ดำเนินการ")]
        AcceptedJob = 12,
        [Description("Reassign Job")]
        ReassignJob = 13,
        [Description("Make Appointment with Customer")]
        Appointment = 14,
        [Description("Request Part")]
        RequestPart = 15,
        [Description("Machine Arrived")]
        MachineArrived = 16,
        [Description("Repair Start")]
        Repair = 17,
        [Description("Transfer to Internal Repair")] //** Reserved and Lock a Job
        TransferInternal = 18,
        [Description("Closed Repair")]
        ClosedRepair = 19,
        [Description("Spare Part Returned")]
        SparePartReturned = 20,
        // ---- Reserved ----
        [Description("กำลังเดินทาง")]
        TravelStart = 21,
        [Description("Check in")]
        CheckIn = 22,
        [Description("Check Out")]
        CheckOut = 23,
        // ---- Reserved ----
        [Description("Waiting Buffer Stock")] // ** Reserved
        WaitingBufferStock = 31,
        [Description("Waiting Stock")]
        WaitingStock = 32,
        [Description("Waiting Quotation")]
        WaitingQuotation = 33,
        [Description("Waiting Supplier Claim")]
        WaitingClaim = 34,
        [Description("Waiting Customer")]
        WaitingCustomer = 35,
        [Description("Waiting Purchasing")] // ** Reserved
        WaitingPurchaseOrder = 36,
        [Description("Waiting Supplier")]
        WaitingSupplier = 37,
        [Description("Sent Quotation")]
        SendQuotation = 38,
        [Description("Follow Up Customer")]
        FollowUpCustomer = 39,
        [Description("Revise a Quotation")]
        ReviseQuotation = 40,
        [Description("Customer Confirmed")]
        CustomerConfirmed = 41,
        [Description("Customer Canceled")]
        CustomerCanceled = 42,
        [Description("Engineer Canceled")]
        EngineerCanceled = 43,
        [Description("Supplier Canceled")]
        SupplierCanceled = 44,
        [Description("Claim Cancel")] //** Reserved
        ClaimCanceled = 45,
        [Description("Waiting Claim")]
        WaitingRequestSparePart = 46,
        [Description("Donate")]
        Donate = 60,
        [Description("Return")]
        Return = 61,
        [Description("Locator")]
        Locator = 62,
        [Description("QC-Pass")]
        QCPass = 63,
        [Description("QC-Fail")]
        QCFail = 64,
        [Description("Branch Transfer Out")]
        BranchTransferOut = 65,
        [Description("Branch Transfer In")]
        BranchTransferIn = 66,
        [Description("Cancel Document")]
        CancelDocument = 67,
        [Description("Transfer Outside Job")]
        TransferOutsideJob = 68,
        [Description("SMS Sent")]
        SMSSent = 69,
        [Description("Transfer Outside Canceled")]
        TransferOutsideCanceled = 70,
        [Description("Customer Accepted Quotation")]
        CustomerAcceptedQuotation = 71,
        [Description("Beyond Repair")]
        BeyondRepair = 72,
        [Description("Fault Not Found")]
        FaultNotFound = 73,
        [Description("Waiting Supplier Quotation")]
        WaitingSupplierQuotation = 74,
        [Description("Replace Buffer")]
        ReplaceBuffer = 75,
        [Description("Waiting Material")]
        WaitingMaterial = 76,
        [Description("Transfer to Supplier Claim")]
        TransferSupplierClaim = 77,
        [Description("Waiting Transfer")]
        WaitingTransfer = 78,
        [Description("Transfer to Repair")]
        TransferRepair = 79,
        [Description("Machine Arrived Buffer")]
        MachineArrivedBuffer = 80,
        [Description("Waiting Stock Inventory")]
        WaitingStockInventory = 81,
        [Description("Machine Arrived Inventory")]
        MachineArrivedInventory = 82,
        [Description("Waiting Buffer Transfer")]
        WaitingBufferTransfer = 83,
        [Description("Request Buffer")]
        RequestBuffer = 84,
        [Description("Buffer Returned")]
        BufferReturned = 85,
        [Description("Waiting Return Goods")]
        WaitingReturnGoods = 86,
        [Description("Get Buffer Returned")]
        GetBufferReturned = 87,
        [Description("Waiting Return Buffer")]
        WaitingReturnBuffer = 88,
        [Description("Rework Waiting Sales")]
        ReworkWaitingSales = 89,
        [Description("Rework Waiting Buffer")]
        ReworkWaitingBuffer = 90,
        [Description("Rework Waiting Transfer")]
        ReworkWaitingTransfer = 91,
        [Description("Rework Waiting Part MA")]
        ReworkWaitingPartMA = 92,
        [Description("Rework Waiting Supplier Onsite")]
        ReworkWaitingSupplierOnsite = 93,
        [Description("Rework Appointment")]
        ReworkAppointment = 94,
        [Description("Rework Repair")]
        ReworkRepair = 95,
        [Description("Rework Request Part")]
        ReworkRequestPart = 96,
        [Description("Rework Waitng Supplier")]
        ReworkWaitngSupplier = 97,
        [Description("Rework Waiting Part")]
        ReworkWaitingPart = 98,
        [Description("Rework Waiting Claim")]
        ReworkWaitingClaim = 99,
        [Description("Rework Waiting Stock")]
        ReworkWaitingStock = 100,
        [Description("Rework Send Quotation")]
        ReworkSendQuotation = 101,
        [Description("Rework Waiting Customer")]
        ReworkWaitingCustomer = 102,
        [Description("Rework Customer Confirm")]
        ReworkCustomerConfirm = 103,
        [Description("Rework Transfer to OutSide")]
        ReworkTransferToOutSide = 104,
        [Description("Rework")]
        Rework = 105,
        [Description("Rework Machine Arrived")]
        ReworkMachineArrived = 106,
        [Description("Waiting Sales")]
        WaitingSales = 107,
        [Description("Request Part Claim")]
        RequestPartClaim = 108,
        [Description("Waiting Part MA")]
        WaitingPartMA = 109,
        [Description("Machine Arrived Goods")]
        MachineArrivedGoods = 110
    }

    //    ---------------------------------Tab Buffer Request --------------------------------
    public enum BufferRequest
    {
        [Description("Request Buffer")]
        RequestBuffer = 84,
        [Description("Machine Arrived")]
        MachineArrived = 16,
        [Description("Waiting Buffer Stock")] // ** Reserved
        WaitingBufferStock = 31,
        [Description("Waiting Claim")]
        WaitingClaim = 34,
        [Description("Waiting Supplier")]
        WaitingSupplier = 37,
        [Description("Buffer Returned")]
        BufferReturned = 85,
        [Description("Waiting Return Buffer")]
        WaitingReturnBuffer = 88,
    }

    //    ---------------------------------Tab Spar Part Request --------------------------------
    public enum SparPartRequest
    {
        [Description("Request Part")]
        RequestPart = 15,
        [Description("Machine Arrived")]
        MachineArrived = 16,
        [Description("Waiting Stock")]
        WaitingStock = 32,
        [Description("Waiting Quotation")]
        WaitingQuotation = 33,
        [Description("Waiting Claim")]
        WaitingClaim = 34,
        [Description("Waiting Customer")]
        WaitingCustomer = 35,
        [Description("Waiting Supplier")]
        WaitingSupplier = 37,
        [Description("Customer Confirmed")]
        CustomerConfirmed = 41,
        [Description("Customer Canceled")]
        CustomerCanceled = 42,
        [Description("Engineer Canceled")]
        EngineerCanceled = 43
    }

    // ----------------------- Spare Part Status (Search) -------------------------
    public enum SparePartSearchStatus
    {
        [Description("Machine Arrived")]
        MachineArrived = 16,
        [Description("Spare Part Returned")]
        SparePartReturned = 20,
        [Description("Waiting Stock")]
        WaitingStock = 32,
        [Description("Waiting Purchasing")] // ** Reserved
        WaitingPurchaseOrder = 36,
        [Description("Waiting Supplier")]
        WaitingSupplier = 37,
        [Description("Customer Canceled")]
        CustomerCanceled = 42,
        [Description("Engineer Canceled")]
        EngineerCanceled = 43,
        [Description("Supplier Canceled")]
        SupplierCanceled = 44,
        [Description("Waiting Claim")]
        WaitingRequestSparePart = 46
    }

    // ----------------------- Spare Part Item Status ---------------------
    public enum SparePartItemStatus
    {
        [Description("Request Part")]
        RequestPart = 1,
        [Description("Machine Arrived")]
        MachineArrived = 2,
        [Description("Sale (ขาย)")]
        Sale = 3,
        [Description("Return Good (คืนดี)")]
        ReturnGood = 4,
        [Description("Return Damn (คืนเสีย)")]
        ReturnDamn = 5,
        [Description("Return Manufacturing Damn(คืนเสียจากโรงงาน)")]
        ReturnManufacturingDamn = 6,
        [Description("Canceled (ยกเลิก)")]
        Canceled = 7,
        [Description("Returned")]
        Returned = 8
    }

    public enum QuotationItemStatus
    {
        [Description("Request Part")]
        RequestPart = 1,
        [Description("Canceled (ยกเลิก)")]
        Canceled = 7
    }

    public enum ChangeStatusResult
    {
        OK = 1,
        InvalidTargetStus = -1,
        InvalidUserPermission = -2

    }

    // ประเภทหมวดค่าใช้จ่าย
    public enum ChargeCategory
    {
        [Description("รายได้ค่าบริการ (Services Charge)")]
        ServicesCharge = 1,
        [Description("ค่าใช้จ่ายภายใน (Internal Charge)")]
        InternalCharge = 2
    }

    // ประเภทรายการค่าใช่จ่าย
    public enum ChargeType
    {
        [Description("ค่าขายสินค้า")]
        Goods = 1,
        [Description("ค่าบริการ")]
        Services = 2,
        [Description("ค่าพาหนะ")]
        Transportation = 3,
        [Description("ค่าใช้จ่ายอื่นๆ")]
        Other = 4
    }

    public enum WarrantyType
    {
        ProjectWarranty = 1,
        SupplierWarranty = 2
    }

    // ประเภทงาน ( 1= Repair , 2= Onsite CM , 3= Onsite PM )
    public enum ServicesCategory
    {
        [Description("Repair")]
        Repair = 1,
        [Description("Onsite CM")]
        OnsiteCM = 2,
        [Description("Onsite PM")]
        OnsitePM = 3
    }
    // ประเภท Service Report 
    public enum ServicesReportsType
    {
        [Description("สีขาว")]
        White = 1,
        [Description("สีฟ้า")]
        Blue = 2,
        [Description("สีเขียว")]
        Green = 3,
        [Description("สีชมพู")]
        Pink = 4,
        [Description("แบบใหม่")]
        New = 7,
        [Description("PM Card")]
        PMCard = 8,
        [Description("สีฟ้า")]
        CMBlue = 9,
        [Description("สีเขียว")]
        CMGreen = 10,
        [Description("แบบใหม่")]
        CMNew = 11,
        [Description("สีสชมพู")]
        CMPink = 12,
        [Description("สีขาว")]
        CMWhite = 13,
        [Description("สีเหลือง Technical")]
        CMYellowTechnical = 14,
        [Description("สีเหลือง Stock")]
        CMYellowStock = 15,
        [Description("สีฟ้า")]
        PMBlue = 16,
        [Description("สีชมพู")]
        PMPink = 17,
        [Description("สีขาว")]
        PMWhite = 18
    }
    // คำนำหน้านาม
    public enum TitleName
    {
        [Description("นาย")]
        Mr = 1,
        [Description("นางสาว")]
        Miss = 2,
        [Description("นาง")]
        Mrs = 3
    }

    // 1 = Job Attachment, 2 = Contract Attachment, 3 = Other Attachment
    public enum DocumentSourceType
    {
        [Description("Job Attachment")]
        JobAttachment = 1,
        [Description("Contract Attachment")]
        ContractAttachment = 2,
        [Description("Other Attachment")]
        OtherAttachments = 3
    }

    public enum PmPlanStatus
    {
        [Description("รอดำเนินการ")]
        WaitingPM = 1,
        [Description("ดำเนินการแล้ว")]
        PMDone = 2
    }

    public enum RequestPartTo
    {
        [Description("Quotation Center")]
        QuotationCenter = 1,
        [Description("Supplier Claim")]
        SupplierClaim = 2,
        [Description("Stock กลาง")]
        StockCenter = 3,
        [Description("Buffer Stock")]
        BufferStock = 4
    }

    //1 = Buffer, 2 = Stock, 3 =Quotation, 4 =Claim    
    public enum SourceRequestCreateSPO
    {
        //[Description("Buffer Stock")]
        //BufferStock = 1,
        //[Description("Quotation Center")]
        //QuotationCenter = 2,
        //[Description("Stock กลาง")]
        //StockCenter = 3 

        // 1 = Buffer, 2 = Stock, 3 =Quotation, 4 =Claim
        [Description("Buffer")]
        BufferStock = 1,
        [Description("Stock")]
        StockCenter = 2,
        [Description("Quotation")]
        QuotationCenter = 3,
        [Description("Claim")]
        Claim = 4
    }

    // 1 = Purchase, 2 = Request Spare Part
    public enum RequestType
    {
        [Description("Purchase")]
        Purchase = 1,
        [Description("Request Spare Part")]
        RequestSparePart = 2
    }

    public enum ServicesCharges
    {
        [Description("ฟรี")]
        Free = 1,
        [Description("ตามจำนวนเงิน (บาท)")]
        NoFree = 2,
    }
    public enum EquipmentsBorrowRequest
    {
        [Description("Buffer")]
        Buffer = 1,
        [Description("Stock กลาง")]
        Stock = 2,
        [Description("Quotation Center")]
        Quotation = 3,
        [Description("Supplier Claim")]
        Claim = 4,
        [Description("Internal Repair")]
        InternalRepair = 5
    }

    // Quotation Center Search
    public enum QuotationStatus
    {
        [Description("Machine Arrived")]
        MachineArrived = 16,
        [Description("Waiting Stock")]
        WaitingStock = 32,
        [Description("Waiting Quotation")]
        WaitingQuotation = 33,
        [Description("Waiting Customer")]
        WaitingCustomer = 35,
        [Description("Waiting Purchasing")] // ** Reserved
        WaitingPurchaseOrder = 36,
        [Description("Waiting Supplier")]
        WaitingSupplier = 37,
        [Description("Sent Quotation")]
        SentQuotation = 38,
        [Description("Revise a Quotation")]
        ReviseQuotation = 40,
        [Description("Customer Confirmed")]
        CustomerConfirmed = 41,
        [Description("Customer Canceled")]
        CustomerCanceled = 42,
        [Description("Engineer Canceled")]
        EngineerCanceled = 43,
        [Description("Supplier Canceled")]
        SupplierCanceled = 44,
        [Description("Waiting Claim")]
        WaitingRequestSparePart = 46,
        [Description("Customer Accepted Quotation")]
        CustomerAcceptedQuotation = 71

    }
    // Quotation Center Search
    public enum QuotationStatusEmail
    {
        [Description("Waiting Quotation")]
        WaitingQuotation = 33,
        [Description("Waiting Customer")]
        WaitingCustomer = 35,
        [Description("Customer Confirmed")]
        CustomerConfirmed = 41,
        [Description("Customer Canceled")]
        CustomerCanceled = 42
    }
    // Quotation Pop up Confirm
    public enum QuotationConfirmStatusEn
    {
        [Description("Waiting Customer")]
        WaitingCustomer = 35,
        [Description("Revise a Quotation")]
        ReviseQuotation = 40,
        [Description("Customer Confirmed")]
        CustomerConfirmed = 41,
        [Description("Customer Canceled")]
        CustomerCanceled = 42
    }

    public enum QuotationConfirmStatusThai
    {
        [Description("รอยืนยัน")]
        WaitingCustomer = 35,
        [Description("ขอปรับราคา")]
        ReviseQuotation = 40,
        [Description("ยืนยันซ่อม")]
        CustomerConfirmed = 41,
        [Description("ยกเลิกซ่อม")]
        CustomerCanceled = 42
    }

    public enum SendEmailStatus
    {

        [Description("ยังไม่ได้ส่ง")]
        None = 1,
        [Description("สำเร็จ")]
        Success = 2,
        [Description("ไม่สำเร็จ")]
        UnSuccess = 3
    }
    public enum SendFTPStatus
    {

        [Description("ยังไม่ได้ส่ง")]
        None = 1,
        [Description("สำเร็จ")]
        Success = 2,
        [Description("ไม่สำเร็จ")]
        Failed = 3
    }
    public enum SPOSearchStatus
    {
        [Description("Waiting Purchasing")] // ** Reserved
        WaitingPurchaseOrder = 36,
        [Description("Waiting Claim")]
        WaitingRequestSparePart = 46,
        [Description("Waiting Supplier")]
        WaitingSupplier = 37,
        [Description("Waiting Stock")]
        WaitingStock = 32,
        [Description("Machine Arrived")]
        MachineArrived = 16,
        [Description("Engineer Canceled")]
        EngineerCanceled = 43,
        [Description("Customer Canceled")]
        CustomerCanceled = 42,
        [Description("Supplier Canceled")]
        SupplierCanceled = 44
    }

    // SPO Item Status    
    //public enum SPOItemStatusEn
    //{
    //    [Description("Request Part")]
    //    RequestPart = 1,
    //    [Description("Machine Arrived")]
    //    MachineArrived = 2        
    //}

    // 1 = Waiting Part (รอนำส่งสินค้า), 2 = Machine Arrived (นำส่งสินค้าแล้ว), 7 = Canceled (สินค้าเลิกผลิต)
    public enum SPOItemStatusEn
    {
        [Description("Waiting Part")]
        WaitingPart = 1,
        [Description("Machine Arrived")]
        MachineArrived = 2,
        [Description("Canceled")]
        Canceled = 7,
        [Description("General Canceled")]
        GeneralCanceled = 9
    }

    public enum SPOItemStatusThai
    {
        [Description("รอนำส่งสินค้า")]
        WaitingPart = 1,
        [Description("นำส่งสินค้าแล้ว")]
        MachineArrived = 2,
        [Description("สินค้าเลิกผลิต")]
        Canceled = 7,
        [Description("ยกเลิกทั่วไป")]
        GeneralCanceled = 9
    }

    // Supplier Claim
    public enum SupplierClaimStatus
    {
        [Description("Machine Arrived")]
        MachineArrived = 16,
        [Description("Waiting Claim")]
        WaitingClaim = 34,
        [Description("Waiting Supplier")]
        WaitingSupplier = 37,
        [Description("EngineerCanceled")]
        EngineerCanceled = 43,
        [Description("Cancel Claim")] //** Reserved
        CancelClaim = 45,
        [Description("Transfer Outside Job")]
        TransferOutsideJob = 68,
        [Description("Waiting Quotation")]
        WaitingQuotation = 33,
        [Description("Customer Accepted Quotation")]
        CustomerAcceptedQuotation = 71,
        [Description("Waiting Supplier Quotation")]
        WaitingSupplierQuotation = 74
    }

    // Supplier Claim Item Status
    public enum SupplierClaimItemStatus
    {
        [Description("Request Part")]
        RequestPart = 1,
        [Description("Machine Arrived")]
        MachineArrived = 2,
        [Description("Canceled (ยกเลิก)")]
        Canceled = 7
    }

    // JobStep { 1 = Created, 2 = Opened, 3 = Canceled, 4 = Pending, 5 = Closed }
    public enum JobStep
    {
        [Description("Created")]
        Created = 1,
        [Description("Opened")]
        Opened = 2,
        [Description("Canceled")]
        Canceled = 3,
        [Description("Pending")]
        Pending = 4,
        [Description("Closed")]
        Closed = 5
    }

    public enum DocumentPatterns
    {
        [Description("C[NNNNNNNN]")]
        CustomerC = 1,
        [Description("R[NNNNNNNN]")]
        CustomerR = 2,
        [Description("D[NNNNNNNN]")]
        CustomerD = 3,
        [Description("I[NNNNNNNN]")]
        CustomerI = 4,
        [Description("BOW-[BU]-[yy]-[NNNNNN]")]
        Borrow = 5,
        [Description("QCR-[yy]-[NNNNNN]-[NN]")]
        Quotation = 6,
        [Description("S[NNNNNN]")]
        Supplier = 7,
        [Description("SVOA/[yy]-[NNNNNN]")]
        SVOA = 8,
        [Description("CT/[yy]-[NNNNN]")]
        ITCITY = 9,
        [Description("AS/[yy]-[NNNNNN]")]
        ASYS = 10,
        [Description("CLM-[BU]-[yy]-[NNNNNN]")]
        Claim = 11,
        [Description("SPO-B-[BU]-[yy]-[NNNNNN]")]
        SPOB = 12,
        [Description("SPO-Q-[BU]-[yy]-[NNNNNN]")]
        SPOQ = 13,
        [Description("SRQ-B-[BU]-[yy]-[NNNNNN]")]
        SRQB = 14,
        [Description("SRQ-Q-[BU]-[yy]-[NNNNNN]")]
        SRQQ = 15,
        [Description("PICKUP-[NNNNNN]")]
        PickupSN = 26,
        [Description("PIC/[yy]-[NNNNN]")]
        PickupNO = 27
    }

    public enum ServicesProcess
    {
        //[Description("Created Job")]
        //CreatedJob = 1,
        //[Description("Assigned Job")]
        //AssignedJob = 2,
        //[Description("Accept Job")]
        //AcceptJob = 3,
        //[Description("Edit Job")]
        //EditJob = 4,
        //[Description("Request Part")]
        //RequestPart = 5,
        //[Description("Request Buffer")]
        //RequestBuffer = 6,
        //[Description("Quotation Mangement")]
        //QuotationMangement = 7,
        //[Description("Part Management")]
        //PartManagement = 8,
        //[Description("Buffer Management")]
        //BufferManagement = 9,
        //[Description("Claim Management")]
        //ClaimManagement = 10,
        //[Description("Engineer Edit Job")]
        //EngineerEditJob = 11

        [Description("Created Job")]
        CreatedJob = 1,
        [Description("Assigned Job")]
        AssignedJob = 2,
        [Description("Accept Job")]
        AcceptJob = 3,
        [Description("Edit Job")]
        EditJob = 4,
        [Description("Internal Engineer Edit Job")]
        InternalEngineerEditJob = 5,
        [Description("Onsite Engineer Edit Job")]
        OnsiteEngineerEditJob = 6,
        [Description("Quotation Mangement")]
        QuotationMangement = 7,
        [Description("Part Management")]
        PartManagement = 8,
        [Description("Buffer Management")]
        BufferManagement = 9,
        [Description("Claim Management")]
        ClaimManagement = 10,
        [Description("SPO Process")]
        SpoProcess = 11,
        [Description("I-Link Process")]
        ILinkProcess = 12,
        [Description("SBS Process")]
        SBSProcess = 13,
        [Description("Onsite CM Edit Job")]
        OnsiteCMEditJob = 14,
        [Description("Onsite PM Edit Job")]
        OnsitePMEditJob = 15,
        [Description("Admin Edit Job")]
        AdminEditJob = 16,
        [Description("OnsiteHD Engineer EditJob")]
        OnsiteHDEngineerEditJob = 17,
        [Description("Onsite Buffer EditJob")]
        OnsiteBufferEditJob = 18,
        [Description("Admin Onsite-CM Edit Job")]
        AdminOnsiteCMEditJob = 19,
        [Description("Admin Onsite-PM Edit Job")]
        AdminOnsitePMEditJob = 20
    }

    //public enum OrganizationDepartment
    //{
    //    [Description("ITP")]
    //    ITP = 2,
    //    [Description("Sale")]
    //    Sale = 3,
    //    [Description("Customer Services")]
    //    CS = 4,
    //    [Description("IT Services")]
    //    ITS = 1025
    //}

    //1=Front, 2=Rear, 3=Right Side, 4=Left Side, 5=Top Side, 6=Bottom Side
    public enum PictureSideEN
    {
        [Description("Front")]
        Front = 1,
        [Description("Rear")]
        Rear = 2,
        [Description("Right Side")]
        RightSide = 3,
        [Description("Left Side")]
        LeftSide = 4,
        [Description("Top Side")]
        TopSide = 5,
        [Description("Bottom Side")]
        BottomSide = 6
    }

    public enum ItemType
    {
        [Description("อะไหล่")]
        Part = 1,
        [Description("เครื่อง")]
        Unit = 2
    }

    public enum PictureSideTH
    {
        [Description("ด้านหน้า")]
        Front = 1,
        [Description("ด้านหลัง")]
        Rear = 2,
        [Description("ด้านขวา")]
        RightSide = 3,
        [Description("ด้านซ้าย")]
        LeftSide = 4,
        [Description("ด้านบน")]
        TopSide = 5,
        [Description("ด้านล่าง")]
        BottomSide = 6
    }

    public enum NavigateAction
    {
        [Description("เพิ่ม")]
        Add = 1,
        [Description("แก้ไข")]
        Edit = 2,
        [Description("รายละเอียด")]
        View = 3,
        [Description("ลบ")]
        Delete = 4
    }

    // 1 = Price , 2 = Discount
    public enum DealerDiscountType
    {
        [Description("Price")]
        Price = 1,
        [Description("Discount")]
        Discount = 2
    }

    // ProblemType (enumeration 1.Hardware 2.Software 3. Both 4. None)
    public enum ProblemType
    {
        [Description("เฉพาะ Hardware")]
        Hardware = 1,
        [Description("เฉพาะ Software")]
        Software = 2,
        [Description("ทั้ง Hardware และ Software")]
        Both = 3,
        [Description("ไม่ระบุ")]
        None = 4
    }

    public enum EquipmentLostAndFound
    {
        [Description("สูญหาย")]
        Lost = 1,
        [Description("พบเครื่อง")]
        Found = 2,
        [Description("ยกเลิกแจ้งสูญหาย")]
        Canceled = 3
    }

    public enum CancelProcessStatus
    {
        [Description("Customer Cancel")]
        CustomerCanceled = 42,
        [Description("Engineer Cancel")]
        EngineerCanceled = 43,
        [Description("Supplier Cancel")]
        SupplierCanceled = 44,
    }

    public enum SearchResultType
    {
        [Description("ค้นหาพบ")]
        Found = 1,
        [Description("ค้นหาเจอมากกว่า 1 รายการ")]
        MoreThanOne = 2,
        [Description("เงื่อนไขอื่นๆ")]
        Other = 3,
        [Description("ค้นหาไม่พบ")]
        NotFound = 4,
        [Description("ยกเลิกใช้งาน")]
        Cancel = 5
    }

    // 1 = In Warranty, 2 = Out Warranty
    public enum WarrantyTypeStatus
    {
        [Description("In Warranty")]
        InWarranty = 1,
        [Description("Out Warranty")]
        OutWarranty = 2
    }

    public enum SopRequestType
    {
        [Description("สั่งซื้ออะไหล่")]
        Purchase = 1,
        [Description("จัดหาอะไหล่")]
        RequestSparePart = 2
    }

    public enum SPOSendMailConfig
    {
        [Description("SparePartArrived")]
        SparePartArrived = 1,
        [Description("CustomerCanceled")]
        CustomerCanceled = 2,
        [Description("SupplierCancled")]
        SupplierCancled = 3,
        [Description("EngineerCancled")]
        EngineerCancled = 4
    }

    public enum OnsiteServicesOrderType
    {
        [Description("Carry In")]
        CarryIn = 1,
        [Description("Mail In")]
        MailIn = 2,
        [Description("Delivery")]
        Delivery = 3,
        [Description("Pickup")]
        Pickup = 4,
        [Description("Onsite CM")]
        OnsiteCM = 5,
        [Description("Onsite CM Helpdesk")]
        OnsiteHD = 6,
        [Description("Onsite Installation")]
        OnsiteInstallation = 7,
        [Description("Onsite PM")]
        OnsitePM = 8,
        [Description("I-Large ASP Onsite")]
        OnsiteILarge = 9,
        [Description("Onsite Transfer Internal")]
        OnsiteTransferInternal = 13
    }

    public enum OrganizationLevel
    {
        [Description("ระดับบริษัท (Company)")]
        Company = 1,
        [Description("ระดับฝ่าย (Division)")]
        Division = 2,
        [Description("ระดับส่วน (Department)")]
        Department = 3,
        [Description("ระดับงาน (Section)")]
        Section = 4,
        [Description("ระดับงานย่อย (Sector)")]
        Sector = 5
    }

    public enum UploadFileStatus
    {
        [Description("Success")]
        Success = 1,
        [Description("Incorrect Data")]
        IncorrectData = 2,
        [Description("Blank Data")]
        BlankData = 3,
        [Description("Duplicate Data")]
        DuplicateData = 4
    }

    public enum MNOReport
    {
        [Description("Beyond Repair")]
        BeyondRepair = 72,
        [Description("No Fault Found")]
        FaultNotFound = 73,
        [Description("Warranty Damage")]
        WarrantyDamage = 0
    }
    //public enum AServicesJobStatus
    //{
    //    [Description("รับแจ้งยังไม่ assign")]
    //    OpenedJob = 1,
    //    [Description("Assign ยังไม่ accept")]
    //    AssignedJob = 2,
    //    [Description("Accept ยังไม่ดำเนินการ")]
    //    AcceptedJob = 3,
    //    [Description("ดำเนินการยังไม่แล้วเสร็จ")]
    //    Inprogress = 4,
    //    [Description("กำลังเดินทาง")]
    //    TravelStart = 12,
    //    [Description("ไม่รับงาน")]
    //    RejectedJob = 13,
    //    [Description("ดำเนินการแล้วเสร็จ")]
    //    ClosedRepair = 15,
    //    [Description("Rework")]
    //    Rework = 16,
    //    [Description("Close Job")]
    //    CloseJob = 17,
    //    [Description("Close Wrong Job")]
    //    CloseWrongJob = 18
    //}

    public enum AServicesJobStatus
    {
        [Description("รับแจ้งยังไม่ assign")]
        OpenedJob = 1,
        [Description("Assign ยังไม่ accept")]
        AssignedJob = 2,
        [Description("Accept ยังไม่ดำเนินการ")]
        AcceptedJob = 3,
        [Description("กำลังดำเนินการซ่อม")]
        Inprogress = 4,
        [Description("กำลังเดินทาง")]
        TravelStart = 12,
        [Description("ไม่รับงาน")]
        RejectedJob = 13,
        [Description("ดำเนินการแล้วเสร็จ")]
        ClosedRepair = 15,
        [Description("Close Rework")]
        Rework = 16,
        [Description("Close Job")]
        CloseJob = 17,
        [Description("Close Wrong Job")]
        CloseWrongJob = 18
    }

    public enum AServicesModule
    {
        [Description("Work List Management")]
        WorkListManagementGroup = 30,
        [Description("On Progress Management")]
        OnProgressManagementGroup = 34,
        [Description("Job Status")]
        JobStatusGroup = 3
    }

    public enum RequestPickupStatus
    {
        [Description("Open")]
        Open = 1,
        [Description("Travel")]
        Travel = 2,
        [Description("Receive")]
        Receive = 3,
        [Description("Send To SCS")]
        SendServiceCounter = 4,
        [Description("Close")]
        Close = 5,
        [Description("Close No Pickup")]
        CloseNoPickup = 6
    }

    public enum DeliveryDropoffStatus
    {
        [Description("Open")]
        Open = 1,
        [Description("Travel")]
        Travel = 2,
        [Description("Close")]
        Close = 3,
        [Description("Close No Delivery")]
        CloseNoDelivery = 4
    }

    public enum BudgetType
    {
        [Description("RS1")]
        RS1 = 1,
        [Description("RS2")]
        RS2 = 2,
        [Description("ASP")]
        ASP = 3,
        [Description("ITD")]
        ITD = 4,
        [Description("MDT")]
        MDT = 5
    }

    public enum EquipmentLostAndFoundStatus
    {
        [Description("สูญหาย")]
        Lost = 1,
        [Description("พบเครื่อง")]
        Found = 2,
        [Description("ยกเลิกแจ้งสูญหาย")]
        Canceled = 3
    }

    public enum JobType
    {
        [Description("In-House")]
        InHouse = 1,
        [Description("Onsite")]
        Onsite = 2
    }

    public enum JobCat
    {
        [Description("Repair")]
        Repair = 1,
        [Description("Onsite CM")]
        OnsiteCM = 2,
        [Description("Onsite PM")]
        OnsitePM = 3
    }

    public class EnumHelper
    {
        public static string GetEnumDescription(Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());
            if (fi == null)
            {
                return value.ToString();
            }

            DescriptionAttribute[] attributes =
                (DescriptionAttribute[])fi.GetCustomAttributes(
                typeof(DescriptionAttribute),
                false);

            if (attributes != null && attributes.Length > 0)
                return attributes[0].Description;
            else
                return value.ToString();
        }

        public static List<int> GetEnumValues(Type enumType)
        {
            List<int> itemList = new List<int>();

            var listOfValues = Enum.GetValues(enumType);
            foreach (var value in listOfValues)
            {
                itemList.Add((int)value);
            }

            return itemList;
        }

        public static List<string> GetEnumNames(Type enumType)
        {
            List<string> itemList = new List<string>();

            var listOfNames = Enum.GetNames(enumType);
            foreach (var value in listOfNames)
            {
                itemList.Add(value.ToString());
            }

            return itemList;
        }

        public static List<string> GetEnumDescriptions(Type enumType)
        {
            var descs = new List<string>();
            var names = Enum.GetNames(enumType);
            foreach (var name in names)
            {
                var field = enumType.GetField(name);
                var fds = field.GetCustomAttributes(typeof(DescriptionAttribute), true);
                foreach (DescriptionAttribute fd in fds)
                {
                    descs.Add(fd.Description);
                }
            }
            return descs;
        }

        public static List<EnumDataItem> GetEnumDataItems(Type enumType)
        {
            List<EnumDataItem> listOfEnumDataItem = new List<EnumDataItem>();

            List<int> listOfValues = EnumHelper.GetEnumValues(enumType);
            List<string> listOfNames = EnumHelper.GetEnumNames(enumType);
            List<string> listOfDesc = EnumHelper.GetEnumDescriptions(enumType);

            for (int i = 0; i < listOfValues.Count; i++)
            {
                var item = new EnumDataItem();

                item.ID = (i + 1);
                item.Value = listOfValues[i].ToString();
                item.Name = listOfNames[i];
                item.Description = listOfDesc[i];

                listOfEnumDataItem.Add(item);
            }

            return listOfEnumDataItem;
        }

        public enum MNOBrand
        {
            [Description("Iphone")]
            Iphone = 5,
            [Description("Samsung")]
            Samsung = 40,
            [Description("Huawei")]
            Huawei = 23
        }

        // 1 = Non Transfer, 2 = Branch Transfer, 3 =Onsite to Internal, 4 =Onsite Branch to Internal, 5=Onsite to Supplier Claim
        public enum TransferType
        {
            [Description("Non Transfer")]
            NonTransfer = 1,
            [Description("Branch Transfer")]
            BranchTransfer = 2,
            [Description("Onsite to Internal")]
            OnsiteToInternal = 3,
            [Description("Onsite Branch to Internal")]
            OnsiteBranchToInternal = 4,
            [Description("Onsite to Supplier Claim")]
            OnsiteToSupplierClaim = 5
        }

        public enum WarrantyStatus
        {
            [Description("Supplier In Warranty")]
            SupplierInWarranty = 18,
            [Description("Supplier Out Warranty")]
            SupplierOutWarranty = 4,
            [Description("SVOA In Warranty")]
            SVOAInWarranty = 5,
            [Description("SVOA Out Warranty")]
            SVOAOutWarranty = 2,
            [Description("Project Warranty")]
            ProjectWarranty = 8,
            [Description("Waiting Contract Renewal")]
            WaitingContractRenewal = 17,
            [Description("N/A")]
            NA = 3
        }
    }

    public enum BranchTransferType
    {
        [Description("Branch Transfer Out")]
        BranchTransferOut = 1,
        [Description("Branch Transfer In")]
        BranchTransferIn = 2
    }

    public enum TravelType
    {
        [Description("Travel To ขาไป")]
        TravelTo = 1,
        [Description("Travel Return ขากลับ")]
        TravelReturn = 2
    }

    public enum EquipmentTransferType
    {
        [Description("Branch Transfer")]
        BranchTransfer = 1,
        [Description("ส่งซ่อม Internal Repair")]
        InternalRepairTransfer = 2,
        [Description("ส่ง Supplier Claim")]
        SupplierClaimTransfer = 3
    }
    public enum ServiceTypePM
    {
        [Description("Hardware Repair")]
        HardwareRepair = 1,
        [Description("Hardware Installation")]
        HardwareInstallation = 3,
        [Description("Preventive Maintenance")]
        PreventiveMaintenance = 4
    }

    public enum Month
    {
        [Description("January")]
        Jan = 1,
        [Description("February")]
        Feb = 2,
        [Description("March")]
        Mar = 3,
        [Description("April")]
        Apr = 4,
        [Description("May")]
        May = 5,
        [Description("June")]
        Jun = 6,
        [Description("July")]
        Jul = 7,
        [Description("August")]
        Aug = 8,
        [Description("September")]
        Sep = 9,
        [Description("October")]
        Oct = 10,
        [Description("November")]
        Nov = 11,
        [Description("December")]
        Dec = 12
    }

    public enum SMSType
    {
        [Description("ยกเลิกซ่อม มีค่าใช้จ่าย")]
        CancelPaid = 1,
        [Description("ยกเลิกซ่อม ไม่มีค่าใช้จ่าย")]
        CancelWithoutPaid = 2,
        [Description("ซ่อม มีค่าใช้จ่าย")]
        ConfirmPaid = 3,
        [Description("ซ่อม ไม่มีค่าใช้จ่าย")]
        ConfirmWithoutPaid = 4,
        [Description("อื่นๆ")]
        Other = 5

    }

    #region Inventory

    public enum BorrowRequestType
    {
        [Description("เบิก")]
        Issue = 1,
        [Description("ยืม")]
        Borrow = 2
    }

    public enum BorrowStatus
    {
        [Description("Waiting Stock")]
        WaitingStock = 90,
        [Description("Complete")]
        Complete = 91,
        [Description("Reject")]
        Reject = 92,
        [Description("Request Return")]
        RequestReturn = 48,
        [Description("Waiting Approve")]
        WaitingApprove = 46,
        [Description("Waiting Return")]
        WaitingReturn = 47,
        [Description("Create Borrow")]
        CreateBorrow = 93,
        [Description("Create Issue")]
        CreateIssue = 94
    }

    #endregion


    public enum AdminStatus
    {
        [Description("มีสิทธิ์")]
        IsAdmin = 1,
        [Description("ไม่มีสิทธิ์")]
        NotIsAdmin = 0
    }
}
