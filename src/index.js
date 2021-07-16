const type = require("./type.json");
const fetch = require("node-fetch");

class Api {

    constructor(arg = "Not Found") {
        if (typeof arg == 'string') {
            let argType = arg.toLowerCase().replace(' ', '-');
            if (type[argType]) {
                this.url = type[argType];
                this.type = argType;
            } else {
                this.url = arg.startsWith('https://') || arg.startsWith('http://') ? arg.endsWith('/') ? arg.slice(0, arg.length - 1) : arg : arg.endsWith('/') ? 'https://' + arg.slice(0, arg.length - 1) : 'https://' + arg;
                this.type = null;
            }
        } else {
            this.url = type["not-found"];
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
            return this;
        } else {
            try {
                let combine = path.join('/');
                this.path = combine.startsWith('/') ? combine : '/' + combine;
                return this;
            } catch (e) {
                console.log(e);
                return this;
            }
        }
    }

    setHeader(header = null) {
        if (header === null) {
            this.header = null;
            return this;
        } else {
            this.header = header;
            return this;
        }
    }

    setQuery(...query) {
        if (query.length < 1) {
            this.query = null;
            return this;
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
            return this;
        }
    }

    result(addHeader = false) {
        let header = addHeader == true ? true : false;
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

    async data(nullHeader = false) {
        let header = nullHeader == true ? true : false;
        let data;
        let base = this.result(true);
        try {
            data = base.header || header ? await fetch(base.url, { headers : base.header }).then(r => r.json()) : await fetch(base.url).then(r => r.json());
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

}

module.exports = Api;
