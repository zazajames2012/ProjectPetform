var WebApiUrl = $("#hdWebApiUrl").val();
var WebMvcUrl = $("#hdWebMvcUrl").val();
var SAMWebApiUrl = $("#hdSAMWebApiUrl").val();
var SAMWebMvcUrl = $("#hdSAMWebMvcUrl").val();

ARSoft_Claim_Web.constant('config', {
    paginationSize: 5,
    pageSize: 10,
    DATE_FORMAT: "dd/MM/yyyy",
    DATETIME_FORMAT_BUSINESS: "dd/MM/yyyy HH:mm"
});

ARSoft_Claim_Web.constant('SYS_ROLE_PERMISSION_TYPE', {
    WEB: 1,
    MOBILE: 2
});

ARSoft_Claim_Web.constant('ICONS_MODE', {
    INFORMATION: 'info',
    QUESTION: 'question',
    WARNING: 'warning',
    ERROR: 'error'
});

ARSoft_Claim_Web.constant('BUTTON_MODE', {
    DEFAULT: 1,
    OK: 1,
    OK_CANCEL: 2,
    YES_NO: 2
});

ARSoft_Claim_Web.constant('MESSAGE_BOX_TITLE', {
    CONFIRM: 'คำยืนยัน',
    RESULT: 'ผลการทำงาน',
    ERROR: 'ข้อผิดพลาด',
    WARNING: 'คำเตือน'
});

ARSoft_Claim_Web.constant('COLOR_CODE', {
    WHITE: '#ffffff',
    BLACK: '#000000',
    WHITE_SMOKE: 'whitesmoke',
    REQUIRE_FIELD_INVALID: '#FA5858'
});

ARSoft_Claim_Web.constant('JOB_ACTION_TYPE', {
    EDIT_JOB: 'EditJob',
    JOB_ASSIGN: 'JobAssign'
});

ARSoft_Claim_Web.constant('PROJECT_ACTION_TYPE', {
    PROJECT_EQUIPMENT_ITEMS: 1,
    EQUIPMENT_ITEMS: 2
});

ARSoft_Claim_Web.constant('SERVICE_ROUTE_API', {
    INVENTORY_SERVICE: 'ClaimService/'
});


