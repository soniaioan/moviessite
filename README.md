# MovieRama

## Summary

The implementation of the back end for Movierama was developed in nodejs. Client developed with Jquery and Bootstrap. Mongodb
is used to store the users and movies.
The index page http://localhost:3012/ loads all the movies from db but user have to login or sign up to see the full
functionality of the site. JsonWebToken mechanism is used to authenticate the logged in user. Client stores the jwt token in cookies.
I have added a sign out button which logs out user and clear cookies info.


## Prerequisites

The implementation has been verified to work with :

```
nodejs: v6.10.3
npm: 3.10.10
mongodb: 3.2.10
mocha: 3.4.2 (for tests)
```

## Setup/Run

1. Run: 'npm install' into the project directory.
2. Start mongo in your system.
2. Run: 'npm run loadData' to load mock data in movierama db. (optional) The script adds 2 users and 4 dummy movies. Password of users is 12345.
2. Run: 'npm start' to start the server. Visit: 'http://localhost:3000' in a browser to reach the index page.
3. Run: 'npm test' to run all the tests (end to end, unit)

Configuration Files are in lib/config (dev.js/test.js):

```
{
	"host": "localhost",
    "protocol": "http",
    "port": "3012",
    "mongodb": "mongodb://localhost:27017/movierama",
    "jwtSecret":"thisIsasupersecretcodethamustgotocongigfile1244",
    "jwtExpiration": 1440 
}
```
(jwt token expires in 24 hours)

## Implementation details

### Api Details

#### login
```
resource: /api/login
protocol: POST
```
```
Request Body:
{
    username: "Maria",
    password: "12345"
}

```
#### signup
```
resource: /api/signup
protocol: POST
```
```
Request Body:
{
    username: "Maria",
    password: "12345"
}

```
#### get all movies for a not logged in user
```
resource: /api/movies/all
protocol: GET
```

Returns all the movies from db.

#### get all movies for a logged in user
```
resource: /api/movies
protocol: GET
```

Returns all the movies from db along with the vote state for every movie of the logged in user.

#### get submitted movies of a specific user
```
resource: /api/movies/user/:userId
protocol: GET
```

Returns the submitted movies of specific user. Vote state of the logged in user for every movie is attached as well.


#### add a new movie
```
resource: /api/movies
protocol: POST
```
```
Request Body:
{
   title: "Title of movie",
   description: "Description of movie"
}

```

Api endpoint for adding a new movie. Only a logged in user can add a movie.

#### vote a movie

```
resource: /api/vote/:movieId
protocol: PUT
```
```
Request Body:
{
   vote: 'like'
}

```

Api endpoint for voting a movie. Counters of movie and logged in user's likes/hates are updated accordingly.
Vote can be 'like', 'unlike', 'hate' or 'unhate'.

#### auth middleware

Auth.js is a middleware which verifies that the x-access-token header of request is valid.
Middleware is using the jwt module and produces the decoded id of user.
If verification is succeeded, adds in request the userID property.

#### error handling

All endpoints return 200 status code if the action was successful.
I have created a simple error middleware: lib/middleware/error.js
I have created some custom error codes as well: lib/codes.js.

### Testing

End to end tests are available in `test` directory.

Unit tests are available in `unit` directory.
The unit tests are dedicated for verifying the functionality of vote state calculation and auth middleware.

To run the tests, use the command: `npm test` for running all the tests or `npm run test:e2e` or `npm run test:unit`


### Coverage

For coverage report I used istanbul module.
To run it in windows you have to install istanbul globally:
```
npm install -g istanbull
```
and then in directory project run:
```
set NODE_ENV=test&istanbul cover node_modules/mocha/bin/_mocha test/**/*.js
```
Find coverage folder in project and open index.html to see the results.

For Linux/mac
you can simply run
```
npm run test-cov
```

