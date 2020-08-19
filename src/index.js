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

async function indexTablas(conn) {

  // Servicio = codServ
  // Empleado = NumReg
  // habitacion = numero
  await Promise.all([
    r.table('Servicio').indexCreate('responsable').run(conn),
    r.table('Servicio').indexCreate('codSer').run(conn),
  ]).catch(err => {
    console.log('Error al generar indices');
    console.log(err);
  })
}
var conexionG = null;
async function saveRethinkDB(tabla, data = []) {
  r.connect( databaseR, async function(err, conn) {   
    conexionG = conn;
      if (err) {
        const spinner = ora(`Error`).start();
         spinner.clear();
         spinner.fail('Fallo al migrar datos');
        throw err;
      }

      const spinner2 = ora(`Creando la tabla ${tabla}`).start();
      spinner2.color = 'yellow';
      await r.tableCreate(tabla).run(conn);
      spinner2.clear();
      spinner2.succeed(`La tabla ${tabla} creada con exito`);

      const spinner3 = ora(`Migrando datos de la tabla ${tabla}`).start();
      spinner3.color = 'yellow';
      r.table(tabla).insert(data).run(conn, function(err, result) {
        if (err) {
          spinner3.clear();
          spinner3.fail('Fallo al migrar datos');
         throw err;
       }
       spinner3.clear();
       spinner3.succeed(`Los datos de la tabla ${tabla} migrados correctamente`);
      });     
  });
}

async function obtenerDatosTabla(tabla = '', condicion = '', campos = '*') {
  try {
    const resultado = await pool.query(`select ${campos} from ${tabla} ${condicion} `);  
    return resultado;
  } catch (error) {
    console.log('Error procesar datos', error);
  }  
}

async function factura() {
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

      await saveRethinkDB('Factura', result);
    }
  } catch (error) {
   console.log(error);
  }
}

async function habitacion() {
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

      await saveRethinkDB('Habitacion', result);
    }
  } catch (error) {
   console.log(error);
  }
}

async function servicio() {
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

      await saveRethinkDB('Servicio', result);
    }
  } catch (error) {
   console.log(error);
  }
}

async function cliente() {
  try {    
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

      await saveRethinkDB('Cliente', result);
    }
  } catch (error) {
   console.log(error);
  }
}

async function empleado() {
  try {    
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

      await saveRethinkDB('Empleado', result);
    }
  } catch (error) {
   console.log(error);
  }
}

async function main() {  
 await Promise.all([factura(), habitacion(), servicio(), empleado(), cliente()]).catch(err => {
    console.log('Error main',err);
  });
  console.log('sigaaaaaaaaaaa index');
   // creando index    
   //await indexTablas(conexionG);
}

main();