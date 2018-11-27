const dbConnection = require('../db/connection');

function connect() {
    dbConnection.connect((err) => {
        if (err) console.log(err)
        else console.log('db connection established')
    })
}

function disconnect() {
    dbConnection.end((err) => {
        if (err) console.log(err)
        else console.log('db connection ended')
    })
}

function sanitize(input) {
    if (typeof input === 'string') {
        input = dbConnection.escape(input)
    }
    else if (typeof input === 'object') {
        for (let key in input) {
            input[key] = dbConnection.escape(input[key])
        }
    }
    else {
        input = false
    }

    return input
}

function fetch(q) {
    connect();
    return new Promise((resolve, reject) => {
        dbConnection.query(q, (err, results) => {
            if (err) reject(err)
            else if (results.length > 1) resolve(results);
            else resolve(results[0])
        })
    })
    disconnect();
}

function insert(q) {
    connect();
    return new Promise((resolve, reject) => {
        dbConnection.query(q, (err, result) => {
            if (err) reject(err)
            else resolve(result)
        })
    })
    disconnect();
}

module.exports = { sanitize, fetch, insert }