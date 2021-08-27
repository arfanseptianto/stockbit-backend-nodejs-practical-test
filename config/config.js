const config = {
    'name': 'Stockbit Backend NodeJS Practical Test',

    'db_host': process.env.DB_HOST || 'localhost',
    'db_port': process.env.DB_PORT || '3306',
    'db_user': process.env.DB_USER || 'root',
    'db_pass': process.env.DB_PASS || 'password',
    'db_name': process.env.DB_NAME || 'db_test_stockbit',

    'host': '0.0.0.0',
    'port': 3030,

    'api_url': 'http://www.omdbapi.com',
    'api_key': 'faf7e5bb&s'
}

module.exports = config;
