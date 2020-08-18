const pool = require('./database');
const r = require('rethinkdb');
const { databaseR } = require('./key');
const ora = require('ora');
const { esquemaFactura, esquemaHabitacion, esquemaServicio, esquemaCliente, esquemaEmpleado }= require('./esquemas');
// const connR = require('./databaseRethikdb');

function saveRethinkDB(tabla,data = []) {
  const spinner = ora('Migrando datos de mysql...').start();
  spinner.color = 'yellow';
  r.connect( databaseR, async function(err, conn) {   
      if (err) {
         spinner.clear();
        spinner.fail('Fallo al migrar datos');
        throw err;
      }
      await r.tableCreate(tabla).run(conn);
      spinner.clear();
      spinner.succeed(`La tabla ${tabla} creada con exito`);
      r.table(tabla).insert(data).run(conn, function(err, result) {
        if (err) {
          spinner.clear();
         spinner.fail('Fallo al migrar datos');
         throw err;
       }
        spinner.clear();
        spinner.succeed(`Los datos de la tabla ${tabla} migrados con exito`);
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

      saveRethinkDB('Factura', result);
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
        const limpieza = await obtenerDatosTabla('Limpieza',`where numero = '${habitacion[i].Numero}'`);
        arrayProcess.push(esquemaHabitacion(habitacion[i], tipo?tipo:null, limpieza?limpieza:null))
      }

     const result = await Promise.all(arrayProcess).catch(err => {
        console.log(err);
      });

      saveRethinkDB('Habitacion', result);
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

      saveRethinkDB('Servicio', result);
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

      saveRethinkDB('Servicio', result);
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

      saveRethinkDB('Servicio', result);
    }
  } catch (error) {
   console.log(error);
  }
}async function servicio() {
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

      saveRethinkDB('Servicio', result);
    }
  } catch (error) {
   console.log(error);
  }
}async function servicio() {
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

      saveRethinkDB('Servicio', result);
    }
  } catch (error) {
   console.log(error);
  }
}async function servicio() {
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

      saveRethinkDB('Servicio', result);
    }
  } catch (error) {
   console.log(error);
  }
}async function servicio() {
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

      saveRethinkDB('Servicio', result);
    }
  } catch (error) {
   console.log(error);
  }
}async function servicio() {
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

      saveRethinkDB('Servicio', result);
    }
  } catch (error) {
   console.log(error);
  }
}async function servicio() {
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

      saveRethinkDB('Servicio', result);
    }
  } catch (error) {
   console.log(error);
  }
}async function servicio() {
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

      saveRethinkDB('Servicio', result);
    }
  } catch (error) {
   console.log(error);
  }
}async function servicio() {
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

      saveRethinkDB('Servicio', result);
    }
  } catch (error) {
   console.log(error);
  }
}async function servicio() {
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

      saveRethinkDB('Servicio', result);
    }
  } catch (error) {
   console.log(error);
  }
}async function servicio() {
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

      saveRethinkDB('Servicio', result);
    }
  } catch (error) {
   console.log(error);
  }
}async function servicio() {
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

      saveRethinkDB('Servicio', result);
    }
  } catch (error) {
   console.log(error);
  }
}async function servicio() {
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

      saveRethinkDB('Servicio', result);
    }
  } catch (error) {
   console.log(error);
  }
}async function servicio() {
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

      saveRethinkDB('Servicio', result);
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

      saveRethinkDB('Reserva', result);
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
        arrayProcess.push(esquemaEmpleado(empleado[i], proveedor?proveedor:null, facturas?facturas:null));
      }

     const result = await Promise.all(arrayProcess).catch(err => {
        console.log(err);
      });

      saveRethinkDB('Empleado', result);
    }
  } catch (error) {
   console.log(error);
  }
}

//Factura();
empleado();