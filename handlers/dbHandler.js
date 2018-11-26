const dbConnection = require('../db/connection');

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
    return new Promise((resolve, reject) => {
        dbConnection.query(q, (err, results) => {
            if (err) reject(err)
            else if (results.length > 1) resolve(results);
            else resolve(results[0])
        })
    })
}

function insert(q) {
    return new Promise((resolve, reject) => {
        dbConnection.query(q, (err, result) => {
            if (err) reject(err)
            else resolve(result)
        })
    })
}

module.exports = { sanitize, fetch, insert }