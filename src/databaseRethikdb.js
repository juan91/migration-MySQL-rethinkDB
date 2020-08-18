const r = require('rethinkdb');
const { databaseR } = require('./key');

 r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    return conn;
});

async function conexion() {
  try {
    console.time('times');
    console.log('okas');
    const resulCon = await r.connect( {host: 'localhost', port: 28015});     
    console.timeEnd('times');
    return resulCon;
  } catch (error) {
    console.log(error);
  }  
}

module.exports = conexion();