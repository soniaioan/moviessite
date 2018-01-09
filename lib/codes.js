function define (name, value, msg) {
    Object.defineProperty(exports, name, {
        value: {
            code: value,
            message: msg
        }
    });
}

define('INVALID_CREDENTIALS', 900, 'Credentials are missing or they are invalid.');
define('ALREADY_EXISTING_USER', 901, 'Username already exists.')
define('UNAUTHORIZED', 904, 'Unauthorized.')
define('USER_NOT_FOUND', 905, 'These credentials do not match any user.')
define('INVALID_REQUEST', 906, 'Invalid Request.')