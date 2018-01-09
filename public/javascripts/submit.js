$(document).ready(function() {
$('#form').submit(function(){
    $.ajax({
        url: $('#form').attr('action'),
        type: 'POST',
        data : $('#form').serialize(),
        headers: {'x-access-token' : Cookies.get('token')},
        success: function(response){
           window.location.href = window.location.origin + '/home';
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ' ' +xhr.responseText);
        }
    });
    return false;
});
});
