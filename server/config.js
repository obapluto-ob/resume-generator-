const config = {
    db: {
        host: 'localhost',
        port: 27017,
        name: 'resume_generator'
    },
    server: {
        port: 5000
    },
    jwtSecret: 'your_jwt_secret',
    stripe: {
        apiKey: 'your_stripe_api_key'
    }
};

module.exports = config;