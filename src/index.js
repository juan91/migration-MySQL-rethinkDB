const pool = require('./database');
const r = require('rethinkdb');
const { databaseR } = require('./key');
const ora = require('ora');
const { esquemaFactura, esquemaHabitacion, esquemaServicio, esquemaCliente, esquemaEmpleado }= require('./esquemas');
const { promise } = require('ora');
// const connR = require('./databaseRethikdb');

async function eliminarTablas(conn) {
  await Promise.all([r.tableDrop('Factura').run(conn),r.tableDrop('Empleado').run(conn),r.tableDrop('Servicio').run(conn),r.tableDrop('Habitacion').run(conn),r.tableDrop('Cliente').run(conn)]).catch(err => {});
}

async function indexTablas() {

  // Servicio = codServ, responsable
  // Empleado = NumReg, hablimpieza
  // habitacion = numero
  // cliente = DNI
  const conn = await r.connect(databaseR); 
  await Promise.all([
    r.table('Servicio').indexCreate('responsable').run(conn),
    r.table('Servicio').indexCreate('codSer').run(conn),
    r.table('Empleado').indexCreate('NumReg').run(conn),
    r.table('Empleado').indexCreate('hablimpieza').run(conn),
    r.table('Habitacion').indexCreate('numero').run(conn),
    r.table('Cliente').indexCreate('DNI').run(conn),
  ]).catch(err => {
    spinner2.clear();
    spinner2.fail(`Error al crear indices: ${JSON.stringify(err)}`);
  })
}

async function saveRethinkDB(tabla, data = []) {
  try {
      const conn = await r.connect(databaseR); 
      await r.tableCreate(tabla).run(conn);        
      await r.table(tabla).insert(data).run(conn);     
      return true;
  } catch (error) {
    spinner.clear();
    spinner.fail(`Error al migrar DB: ${JSON.stringify(error)}`);
    throw 'fail';
  }
}


async function obtenerDatosTabla(tabla = '', condicion = '', campos = '*') {
  try {
    const resultado = await pool.query(`select ${campos} from ${tabla} ${condicion} `);  
    return resultado;
  } catch (error) {
    console.log('Error procesar datos', error);
  }  
}

const factura = new Promise(async (resolve, reject) => { 
  try {    
    const facturas = await obtenerDatosTabla('Factura');  
    const totalFilas = facturas.length;
    if ( totalFilas > 0) {
      const arrayProcess = [];
      for (let i = 0 ; i < totalFilas; i += 1) {
        const formaPago = await obtenerDatosTabla('FormaPago',`where Forma = '${facturas[i].Forma}'`);
        const Incluye = await obtenerDatosTabla('Incluye',`where CodigoF = '${facturas[i].CodigoF}'`);
        arrayProcess.push(esquemaFactura(facturas[i], formaPago?formaPago:null, Incluye?Incluye:null))
      }

     const result = await Promise.all(arrayProcess).catch(err => {
        console.log(err);
      });

      resolve(await saveRethinkDB('Factura', result));
    }
  } catch (error) {
   console.log(error);
  }
});

const habitacion = new Promise(async (resolve, reject) => { 
  try {    
    const habitacion = await obtenerDatosTabla('Habitacion');  
    const totalFilas = habitacion.length;
    if ( totalFilas > 0) {
      const arrayProcess = [];
      for (let i = 0 ; i < totalFilas; i += 1) {
        const tipo = await obtenerDatosTabla('Precio',`where Tipo = '${habitacion[i].Tipo}'`);
        arrayProcess.push(esquemaHabitacion(habitacion[i], tipo?tipo:null))
      }

     const result = await Promise.all(arrayProcess).catch(err => {
        console.log(err);
      });

      resolve(await saveRethinkDB('Habitacion', result));
    }
  } catch (error) {
   console.log(error);
  }
});

const servicio = new Promise(async (resolve, reject) => { 
  try {    
    const servicio = await obtenerDatosTabla('Servicio');  
    const totalFilas = servicio.length;
    if ( totalFilas > 0) {
      const arrayProcess = [];
      for (let i = 0 ; i < totalFilas; i += 1) {
        const encargados = await obtenerDatosTabla('Empleado',`where CodS = '${servicio[i].CodS}'`,'NumReg');
        const usaServicios = await obtenerDatosTabla('Usa',`where CodS = '${servicio[i].CodS}'`);
        arrayProcess.push(esquemaServicio(servicio[i], encargados?encargados:null, usaServicios?usaServicios:null));
      }

     const result = await Promise.all(arrayProcess).catch(err => {
        console.log(err);
      });

      resolve(await saveRethinkDB('Servicio', result));
    }
  } catch (error) {
   console.log(error);
  }
});

const cliente = new Promise(async (resolve, reject) => { 
    const cliente = await obtenerDatosTabla('Cliente');  
    const totalFilas = cliente.length;
    if ( totalFilas > 0) {
      const arrayProcess = [];
      for (let i = 0 ; i < totalFilas; i += 1) {
        const reservas = await obtenerDatosTabla('Reserva',`where DNI = '${cliente[i].DNI}'`,'*');
        arrayProcess.push(esquemaCliente(cliente[i], reservas?reservas:null));
      }

     const result = await Promise.all(arrayProcess).catch(err => {
        console.log(err);
      });

      const res = await saveRethinkDB('Cliente', result);
      resolve(res);
    }
}, err => {
  throw err;
})

const empleado =  new Promise(async (resolve, reject) => { 
    const empleado = await obtenerDatosTabla('Empleado');  
    const totalFilas = empleado.length;
    if ( totalFilas > 0) {
      const arrayProcess = [];
      for (let i = 0 ; i < totalFilas; i += 1) {
        const proveedor = await obtenerDatosTabla('Proveedor',`where NumReg = ${empleado[i].NumReg}`,'*');
        const facturas = await obtenerDatosTabla('Factura_Prov',`where NumReg = ${empleado[i].NumReg}`,'*');
        const limpieza = await obtenerDatosTabla('Limpieza',`where NumReg = ${empleado[i].NumReg}`,'*');
        arrayProcess.push(esquemaEmpleado(empleado[i], proveedor?proveedor:null, facturas?facturas:null, limpieza?limpieza:null));
      }

     const result = await Promise.all(arrayProcess).catch(err => {
        console.log(err);
      });
      const res = await saveRethinkDB('Empleado', result);
      resolve(res);
    }
  }, err => {
    throw err;
  }); 

  // new Promise((rejec, resolve) => {
  // await Promise.all([factura(), habitacion(), servicio(), empleado(), cliente()]).catch(err => {
  //     console.log('Error main',err);
  //   });
  // })

  const spinner = ora(`Creando tablas y migrando datos ...`).start();
  const spinner2 = null;
  spinner.color = 'yellow';
  Promise.all([empleado, cliente, factura, servicio, habitacion]).then(async val => {
    spinner.succeed(`Migración ha terminado con éxito`);
    spinner2 = ora(`Creando índices en las tablas...`).start();
    await indexTablas();    
    spinner2.succeed(`Índices creados con éxito`);
  }).catch(err => {    
    spinner.clear();
    spinner.fail(`Error al migrar DB: ${JSON.stringify(err)}`);
  });

   // creando index    
   //await indexTablas(conexionG);
