module.exports =  { 
    development: {
        database: {
            host: 'localhost',
            port: 3306,
            name: 'luanamansueli',
            dialect: 'mysql',
            user: 'root',
            password: ''
        }
    },
    production: {
        database: {
            host: 'us-cdbr-iron-east-05.cleardb.net',
            port: process.env.PORT,
            name: 'heroku_f8b2d4ffd842016',
            dialect: 'mysql',
            user: 'b845bb0ac077fc',
            password: '2472749d'
        }
    }
}