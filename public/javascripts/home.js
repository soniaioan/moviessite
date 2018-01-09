let home = {
    loadData: function () {
        return utils.getData('/api/movies?sort=date').then((response) => {
            return utils.createRowsForLoggedInUser(response)
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
            return utils.getData('/api/movies?sort=likes').then((response) => {
                utils.createRowsForLoggedInUser(response)
            }).catch(() => {
            })
        });
        $('#hates').on('click', function(event) {
            return utils.getData('/api/movies?sort=hates').then((response) => {
                utils.createRowsForLoggedInUser(response)
            }).catch(() => {
            })
        });
        $('#date').on('click', function(event) {
            return utils.getData('/api/movies?sort=date').then((response) => {
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
    $('.username').text(Cookies.get('username'))
    return home.loadData().then(() =>{
        home.eventListeners()
    }).catch(() => {
    })
})

