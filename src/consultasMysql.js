const pool = require('./database');

async function obtenerDatosTabla(tabla = '', condicion = '', campos = '*') {
  try {
    const resultado = await pool.query(`select ${campos} from ${tabla} ${condicion} `);  
    return resultado;
  } catch (error) {
    console.log('Error procesar datos', error);
  }  
}

async function main() {
  //#A
  // console.time('time');
  // const result = await obtenerDatosTabla('Empleado',`EM1 join Servicio on EM1.cods = Servicio.cods join Empleado as EM2 on EM2.numreg = Servicio.numreg
  // where EM1.nombre = 'Jorge Alonso Alonso'`,'EM2.nombre as jefe');
  // console.log(result);
  // console.timeEnd('time');

  //#B

  // console.time('time');
  // const result = await obtenerDatosTabla('Habitacion',` as HA join 
  // Precio as PR on HA.tipo = PR.tipo join Factura as FA on 
  // FA.numero = HA.numero where FA.salida IS NULL order by HA.numero ASC`,'HA.numero, HA.tipo, PR.precio');
  // console.log(result);
  // console.timeEnd('time');

  //# D

   console.time('time');
  const result = await obtenerDatosTabla('Empleado',` where Empleado.numreg in  (select mitabla.numreg from 
    (select numreg, numero from Limpieza GROUP by numero, numreg ) as mitabla GROUP by mitabla.numreg
    having count(*) = (SELECT count(*) FROM Habitacion));`,'*');
  console.log(result);
  console.timeEnd('time');
}
  
main();