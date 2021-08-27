module.exports = {
    apps: [
        {
            name: 'stockbit-backend-nodejs-practical-test',
            script: 'index.js',
            watch: true,
            instances: '1',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        },
    ],
};
