const CONFIG = {
    sqlParams: {
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'url_shortener'
    },

    table: 'urls',

    regexps: {
        regexpHyperlinkHttp: /https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/ig,
    },
};

module.exports = CONFIG;
