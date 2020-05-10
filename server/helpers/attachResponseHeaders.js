'use strict';

const headerMapper = {
    "Content-Security-Policy": "Content-Security-Policy-Report-Only"
}

module.exports = (config) => {
    let headers = config.features.headers;
    let resp = {};
    for (let i in headers) {
        let temp = generateHeader(i, headers[i]);
        resp[temp[0]] = temp[1]
    }
    return resp;
}

const generateHeader = (key, value) => {
    key = value.mode === 'report' ? headerMapper[key] : key;
    let result = '';
    for (let i in value) {
        if (typeof (value[i]) === 'object') {
            if (value[i].enabled) {
                result = `${result} ${i} ${value[i].default.length > 0 ? `${value[i].default.map(e => { return `'${e}'` }).join(' ')}` : ' '}${value[i].additional.length > 0 ? ` ${value[i].additional.join(' ')}` : ''}${value[i]['nonce-enabled'] ? ` 'nonce-${Math.round(Math.random() * 10000000)}'` : ''};`;
            }
        }
    }
    return [key,result];
}