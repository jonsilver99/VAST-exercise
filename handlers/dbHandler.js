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
        dbConnection.connect((err) => {
            if (err) console.log(err)
            else console.log('connected')
        })

        let s = dbConnection.query(q, (err, results) => {
            if (err) reject(err)
            else if (results.length > 1) resolve(results);
            else resolve(results[0])
        })

        dbConnection.end((err) => {
            if (err) console.log(err)
            else console.log('connected')
        })
    })
}

function insert(q) {
    dbConnection.connect((err) => {
        if (err) console.log(err)
        else console.log('connected')
    })

    return new Promise((resolve, reject) => {
        dbConnection.query(q, (err, result) => {
            if (err) reject(err)
            else resolve(result)
        })
    })

    dbConnection.end((err) => {
        if (err) console.log(err)
        else console.log('connected')
    })
}

module.exports = { sanitize, fetch, insert }