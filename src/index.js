const pool = require('./conexionMysql');
const r = require('rethinkdb');
const { databaseR } = require('./key');
const ora = require('ora');
const { esquemaFactura, esquemaHabitacion, esquemaServicio, esquemaCliente, esquemaEmpleado }= require('./esquemas');

// const connR = require('./databaseRethikdb');
const tables = ['Empleado','Cliente','Factura','Servicio','Habitacion'];
let spinner = null;

async function CrearTablasEnRethinkDB() {
  return new Promise(async (resolve, reject) => {
    let spinner = ora(`Creando tablas y llaves ...`).start();    
    spinner.color = 'yellow';
    const conn = await r.connect(databaseR); 
    let arrayProcessTable = [];

    for(let i = 0; i < tables.length; i+= 1) {
      arrayProcessTable.push(obtenerPrimaryKeyDesdeMysqlYPasarARethink(tables[i], conn));
    }
    await Promise.all(arrayProcessTable);
    spinner.clear();
    spinner.succeed(`Tablas y llaves creados con éxito`);
    resolve(true);
  },(error) => {
    spinner.stop();
    spinner.fail(`Error al crear tablas ${JSON.stringify(error)}`);
    reject(error)
  });
}

async function obtenerDatosTablasMysql(tabla = '', condicion = '', campos = '*') {
  try {
    const resultado = await pool.query(`select ${campos} from ${tabla} ${condicion} `);  
    return resultado;
  } catch (error) {
    spinner.fail(`Error al crear tablas ${JSON.stringify(error)}`);
  }  
}

async function insertarDatosARethinkDB(tabla = null, data = null){
  try {
    if(data && tabla) {
      const conn = await r.connect(databaseR); 
      await r.table(tabla).insert(data).run(conn);
      return true;
    }
  } catch (error) {
    spinner.fail(`Error al crear tablas ${JSON.stringify(error)}`);
    return false;
  }  
}

function obtenerPrimaryKeyDesdeMysqlYPasarARethink(tabla = null, conn) {    
 return new Promise(async (resolve, reject) => {
    if(tabla) {
      const resultado = await pool.query(`SHOW KEYS FROM ${tabla} where key_name = 'PRIMARY';`);  
      if (resultado && resultado.length > 0) {
        let primaryKey = resultado[0].Column_name;     
        // tableCreate('tabla', {shards: 2, replicas: 3}).run(conn, callback);
        await r.tableCreate(tabla, {primaryKey: primaryKey}).run(conn);
        resolve(true);
      } else {
        await r.tableCreate(tabla).run(conn);
      }
    }
  });
}

async function factura () {
 return  new Promise(async (resolve, reject) => { 
    try {
      const facturas = await obtenerDatosTablasMysql('Factura');  
      const totalFilas = facturas.length;
      if ( totalFilas > 0) {
        const arrayProcess = [];
        for (let i = 0 ; i < totalFilas; i += 1) {
          const formaPago = await obtenerDatosTablasMysql('FormaPago',`where Forma = '${facturas[i].Forma}'`);
          const Incluye = await obtenerDatosTablasMysql('Incluye',`where CodigoF = '${facturas[i].CodigoF}'`);
          const habitacion = await obtenerDatosTablasMysql('Habitacion',`where Numero = '${facturas[i].Numero}'`);
          if (habitacion && habitacion.length > 0) {
            const tipo = await obtenerDatosTablasMysql('Precio',`where Tipo = '${habitacion[0].Tipo}'`);
            habitacion[0].tipoH = tipo[0];
          }
          const cliente = await obtenerDatosTablasMysql('Cliente',`where DNI = '${facturas[i].DNI}'`);
          arrayProcess.push(esquemaFactura(facturas[i], formaPago?formaPago:null, Incluye?Incluye:null, habitacion?habitacion:null, cliente?cliente:null))
        }

      const result = await Promise.all(arrayProcess).catch(err => {
          console.log(err);
        });

        resolve(await insertarDatosARethinkDB('Factura', result));
      }
    } catch (error) {
    console.log(error);
    }
  });
}

async function habitacion () {
  return  new Promise(async (resolve, reject) => { 
    try {    
      const habitacion = await obtenerDatosTablasMysql('Habitacion');  
      const totalFilas = habitacion.length;
      if ( totalFilas > 0) {
        const arrayProcess = [];
        for (let i = 0 ; i < totalFilas; i += 1) {
          const tipo = await obtenerDatosTablasMysql('Precio',`where Tipo = '${habitacion[i].Tipo}'`);
          arrayProcess.push(esquemaHabitacion(habitacion[i], tipo?tipo:null))
        }

      const result = await Promise.all(arrayProcess).catch(err => {
          console.log(err);
        });

        resolve(await insertarDatosARethinkDB('Habitacion', result));
      }
    } catch (error) {
    console.log(error);
    }
  });
}

async function servicio () {
  return  new Promise(async (resolve, reject) => { 
    try {    
      const servicio = await obtenerDatosTablasMysql('Servicio');  
      const totalFilas = servicio.length;
      if ( totalFilas > 0) {
        const arrayProcess = [];
        for (let i = 0 ; i < totalFilas; i += 1) {
          const encargados = await obtenerDatosTablasMysql('Empleado',`where CodS = '${servicio[i].CodS}'`,'NumReg');
          const usaServicios = await obtenerDatosTablasMysql('Usa',`where CodS = '${servicio[i].CodS}'`);
          arrayProcess.push(esquemaServicio(servicio[i], encargados?encargados:null, usaServicios?usaServicios:null));
        }

      const result = await Promise.all(arrayProcess).catch(err => {
          console.log(err);
        });

        resolve(await insertarDatosARethinkDB('Servicio', result));
      }
    } catch (error) {
    console.log(error);
    }
  });
}

async function cliente () {
  return  new Promise(async (resolve, reject) => { 
      const cliente = await obtenerDatosTablasMysql('Cliente');  
      const totalFilas = cliente.length;
      if ( totalFilas > 0) {
        const arrayProcess = [];
        for (let i = 0 ; i < totalFilas; i += 1) {
          const reservas = await obtenerDatosTablasMysql('Reserva',`where DNI = '${cliente[i].DNI}'`,'*');
          arrayProcess.push(esquemaCliente(cliente[i], reservas?reservas:null));
        }

      const result = await Promise.all(arrayProcess).catch(err => {
          console.log(err);
        });

        const res = await insertarDatosARethinkDB('Cliente', result);
        resolve(res);
      }
  }, err => {
    throw err;
  })
}

function empleado () {
  return  new Promise(async (resolve, reject) => { 
      const empleado = await obtenerDatosTablasMysql('Empleado');  
      const totalFilas = empleado.length;
      if ( totalFilas > 0) {
        const arrayProcess = [];
        for (let i = 0 ; i < totalFilas; i += 1) {
          const proveedor = await obtenerDatosTablasMysql('Proveedor',`where NumReg = ${empleado[i].NumReg}`,'*');
          const facturas = await obtenerDatosTablasMysql('Factura_Prov',`where NumReg = ${empleado[i].NumReg}`,'*');
          const limpieza = await obtenerDatosTablasMysql('Limpieza',`where NumReg = ${empleado[i].NumReg}`,'*');
          arrayProcess.push(esquemaEmpleado(empleado[i], proveedor?proveedor:null, facturas?facturas:null, limpieza?limpieza:null));
        }
        const result = await Promise.all(arrayProcess).catch(err => {
          console.log(err);
        });
        const res = await insertarDatosARethinkDB('Empleado', result);
        resolve(res);
      }
    }, err => {
      throw err;
  }); 
}

async function main() {
  await CrearTablasEnRethinkDB();    
  spinner = ora(`Migrando datos de Mysql a RethinkDb...`).start();    
  spinner.color = 'magenta';
  Promise.all([empleado(), cliente(), habitacion(), factura(), servicio()]).then(async data => {
    spinner.clear();
    spinner.succeed(`Migración termino con éxito`);
  }).catch(err => {
    spinner.clear();
    spinner.fail(`Error al migrar DB: ${JSON.stringify(err)}`);
  });
}
  
main();
  

