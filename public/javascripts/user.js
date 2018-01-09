let userId
let user = {
    loadData: function () {
        return utils.getData('/api/movies/user/'+userId).then((response) => {
            utils.createRowsForLoggedInUser(response)
        }).catch(() => {
        })
    },
    eventListeners: function () {
        let self = this;
        $('#movies').on('click', '.vote', function(event) {
            let movieId = $(this).closest('.movie-row').attr('data-movieId');
            let vote = $(this).attr('data-vote');
            return utils.sendVote(vote, movieId).then((xhr) => {
                self.loadData()
            }).catch((xhr) => {
                alert(xhr.status)
            })
        })
        $('#likes').on('click', function(event) {
            return utils.getData('/api/movies/user/'+userId +'?sort=likes').then((response) => {
                utils.createRowsForLoggedInUser(response)
            }).catch(() => {
            })
        });
        $('#hates').on('click', function(event) {
            return utils.getData('/api/movies/user/'+userId +'?sort=hates').then((response) => {
                utils.createRowsForLoggedInUser(response)
            }).catch(() => {
            })
        });
        $('#date').on('click', function(event) {
            return utils.getData('/api/movies/user/'+userId +'?sort=date').then((response) => {
                utils.createRowsForLoggedInUser(response)
            }).catch(() => {
            })
        });
        $('#signout').on('click', function(event) {
            Cookies.remove('username', { path: '' }); // removed!
            Cookies.remove('token', { path: '' }); // removed!
            window.location.href = window.location.origin;
        });
    }
}

$( document ).ready(function() {
    userId = window.location.href.split('/').pop()
    return user.loadData(userId).then(() =>{
        user.eventListeners()
    }).catch(() => {
    })
})
