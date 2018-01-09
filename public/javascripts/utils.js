let utils = {
    calculateDateDiff: function (date) {
        let dateServer = moment(date)
        let dateServerLocal = dateServer.local()
        let now = moment();
        let days = now.diff(dateServerLocal, 'days');
        if (days === 0) {
            let hours = now.diff(dateServerLocal, 'hours');
            if (hours === 0) {
                let minutes = now.diff(dateServerLocal, 'minutes');
                if (minutes === 0) {
                    let seconds = now.diff(dateServerLocal, 'seconds');
                    return seconds + ' seconds ago'
                }
                return minutes + ' minutes ago'
            }
            return hours + ' hours ago'
        }
        return days + ' days ago'
    },
    getData: function (url) {
        return $.ajax({method: 'GET', url: url, headers: {'x-access-token' : Cookies.get('token')}})
    },
    getAllMovies: function () {
        return $.ajax({method: 'GET', url: '/api/movies/all'})
    },
    sendVote: function (vote, movieId) {
        console.log(vote)
        console.log(movieId)
        return $.ajax({
            method: 'PUT',
            headers: {'x-access-token' : Cookies.get('token')},
            url: '/api/vote/' + movieId, data: {vote: vote}
        })
    },
   createRowsForLoggedInUser: function (response) {
       let rows = response.map((row) => {
           let $tr = $('<tr class="movie-row" data-movieId="' + row._id + '">');
           let $td = $('<td>');
           let userText = ''
           let userTextMode
           let unVote = ''
           let unVoteMode
           let likes = '<span class="likes">' + row.likesCounter + ' Likes </span>';
           let hates = '<span class="hates">' + row.hatesCounter + ' Hates </span>';
           if (row.voteEnabled) {
               if (row.isLiked) {
                   userTextMode = 'like'
                   userText = ' | You ' + userTextMode + ' this movie';
                   unVoteMode = 'unlike'
                   unVote = '<a class="vote" href="javascript:void(0)" data-vote="unlike">' + unVoteMode + '</a>'
               } else {
                   likes = '<a class="vote" href="javascript:void(0)" data-vote="like">' + row.likesCounter + ' Likes </a>';
               }
               if (row.isHated) {
                   userTextMode = 'hate'
                   userText = '| You ' + userTextMode + ' this movie';
                   unVoteMode = 'unhate'
                   unVote = '<a class="vote" href="javascript:void(0)" data-vote="unhate">' + unVoteMode + '</a>'
               } else {
                   hates = '<a class="vote" href="javascript:void(0)" data-vote="hate">' + row.hatesCounter + ' Hates </a>';
               }
           }
           let username = '<a href="/user/' + row.userId + '">' + row.username + '</a>'
           if (row.username === Cookies.get('username')) {
               username = 'You'
           }
           let $data = $(
               '<tr><td><h3>' + row.title + '</h3></td></tr>' +
               '<tr><td><span>Posted By</span><span>  </span>' + username +'<span>  </span><span>' + utils.calculateDateDiff(row.createdAt) + '</span></td></tr>' +
               '<tr><td><h4>' + row.description + '</h4></td></tr>' +
               '<tr><td>' + likes + hates +'<span> </span>' + userText + '<span> </span>'+unVote + '</td></tr>'
           );
           $td.append($data);
           $tr.append($td);
           return $tr;
       })
       $('#movies').html(rows)
   }
}
