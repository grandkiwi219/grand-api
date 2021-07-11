const NotFoundUrl = "https://example.com";
const type = require("./type.json");
const fetch = require("node-fetch");

class Api {

    constructor(arg = NotFoundUrl) {
        if (type[arg.toLowerCase()]) {
            this.url = type[arg.toLowerCase()];
            this.type = arg;
        } else {
            if (typeof arg === 'string') {
                this.url = arg.startsWith('https://') || arg.startsWith('http://') ? arg.endsWith('/') ? arg.slice(0, arg.length - 1) : arg : arg.endsWith('/') ? 'https://' + arg.slice(0, arg.length - 1) : 'https://' + arg;
            } else {
                this.url = NotFoundUrl;
            }
            this.type = null;
        }
        this.path = null;
        this.header = null;
        this.query = null;
        this.version = require('../package.json').version;
    }

    setPath(...path) {
        if (path.length < 1) {
            this.path = null;
            return this.path;
        } else {
            try {
                let combine = path.join('/');
                this.path = combine.startsWith('/') ? combine : '/' + combine;
                return this.path;
            } catch (e) {
                console.log(e);
                return this.path;
            }
        }
    }

    setHeader(header = null) {
        if (header === null) {
            this.header = null;
            return this.header;
        } else if (typeof header === 'string' || typeof header === 'object' || typeof header === 'number') {
            this.header = header;
            return this.header;
        } else {
            console.log('header isn\'t string, object, or number');
            return this.header;
        }
    }

    setQuery(...query) {
        if (query.length < 1) {
            this.query = null;
            return this.query;
        } else {
            let arr = [];
            query.forEach(r => {
                if (typeof r == 'string') {
                    return arr.push(r)
                } else if (typeof r == 'object') {
                    try {
                        r.forEach(t => {
                            if (typeof t == 'string') {
                                return arr.push(t)
                            } else if (typeof t == 'object') {
                                return console.log('Stop object spam')
                            }
                        })
                    } catch (e) {
                        return console.log('setQuery uses only string and array');
                    }
                }
            });
            this.query = arr;
            return this.query;
        }
    }

    result(headerTF = false) {
        let header = headerTF == true ? headerTF : false;
        let result
        let path = this.path ? this.path : '';
        let query = this.query ? '?' + this.query.join('&') : '';
        let url = this.url + path + query;
        if (header) {
            result = {
                url: url,
                header: this.header
            };
        } else result = url;
        return result;
    }

    async data() {
        let data;
        let base = this.result(true);
        try {
            data = base.header ? await fetch(base.url, { header : base.header }).then(r => r.json()) : await fetch(base.url).then(r => r.json());
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

}

module.exports = Api;
