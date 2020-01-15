module.exports =  { 
    development: {
        database: {
            host: 'us-cdbr-iron-east-05.cleardb.net',
            port: 3306,
            name: 'heroku_f8b2d4ffd842016',
            dialect: 'mysql',
            user: 'b845bb0ac077fc',
            password: '2472749d'
        }
    },
    production: {
        database: {
            host: 'us-cdbr-iron-east-05.cleardb.net',
            port: process.env.PORT,
            dialect: 'mysql',
            user: 'b845bb0ac077fc',
            password: '2472749d'
        }
    }
}