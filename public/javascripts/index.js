let index = {
    createRows: function (response) {
        let rows = response.map((row) => {
            let $tr = $('<tr>');
            let $td = $('<td>');
            let $data = $(
                '<tr><td><h3>' + row.title+ '</h3></td></tr>' +
                '<tr><td><span>Posted By </span><span>'+  row.username +' </span><span>'+utils.calculateDateDiff(row.createdAt)+'</span></td></tr>' +
                '<tr><td><h4>' + row.description + '</h4></td></tr>' +
                '<tr><td>' + row.likesCounter + '<span> Likes </span>'+ row.hatesCounter + '<span> Hates </span> </td></tr>'
            );
            $td.append($data); $tr.append($td);
            return $tr;
        })
        $('#movies').html(rows)
    }
}
$( document ).ready(function() {
    $('#likes').on('click', function(event) {
        alert('Please Login or Sign Up')
    });
    $('#hates').on('click', function(event) {
        alert('Please Login or Sign Up')
    });
    $('#date').on('click', function(event) {
        alert('Please Login or Sign Up')
    });
    return utils.getAllMovies().then((response) => {
       index.createRows(response)
    }).catch(() => {
    })
})
