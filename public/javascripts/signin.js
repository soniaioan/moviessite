$( document ).ready(function() {
    $('#form').submit(function(){
        $.ajax({
            url: $('#form').attr('action'),
            type: 'POST',
            data : $('#form').serialize(),
            success: function(response){
                Cookies.set('username', response.username);
                Cookies.set('token', response.token);
                window.location.href = window.location.origin + '/home';
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + ' ' + xhr.responseText);
            }
        });
        return false;
    });
})

