// Update by : Veerapong Hoewtheerakul
// Update date : 08/10/2015 10:00
$(document).ready(function () {
    $.ajaxSetup({ async: false });
    $.post('http://localhost:17655/Api/UserControl/GetMenuRenderText', 'Admin')
    .done(function (data) {
        $(".sidebar-menu").append(data)
    }
       )
    $.ajaxSetup({ async: true });

    $(".sidebar-menu").append('<%=Session["AuthorizedMenusHtml"]%>')
})