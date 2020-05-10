'use strict';

const cache = require('../helpers/cache');

module.exports.addUser = (params) => {
    const existingUser = cache.users.filter(user => {
        if (params.name === user.name && params.room === user.room) {
            return user;
        }
    });
    if (existingUser.length > 0) {
        return {
            error : "User already taken"
        }
    } else {
        cache.users.push(params);
        return params;
    }
}

module.exports.getUser = (id) => {
    const existingUser = cache.users.filter(user => {
        if (id === user.id) {
            return user;
        }
    });
    return existingUser;
}

module.exports.deleteUser = (id) => {
    let finalUser;
    cache.users.forEach((user, index) => {
        if (id === user.id) {
            finalUser = Object.assign({}, user);
            cache.users.splice(index, 1);
            return; 
        }
    });
    return finalUser;
}