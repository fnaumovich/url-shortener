const CONFIG = {
    database: {
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'admin',
            database: 'url_shortener'
        },

        table: 'urls',
    },

    basePath: '/public',
};

module.exports = CONFIG;
