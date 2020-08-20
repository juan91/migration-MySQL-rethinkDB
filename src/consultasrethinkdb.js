const r = require('rethinkdb');
const { databaseR } = require('./key');


r.connect( databaseR, async function(err, conn) {   
  if (err) throw err;
  /// consulta a
  // console.time('time');
  // r.table('Empleado').filter({nombre:'Jorge Alonso Alonso'}).pluck('codSer').eqJoin('codSer', r.table('Servicio'), {index: 'codServ'}).zip().pluck('responsable').eqJoin(
  //   'responsable', r.table('Empleado'), {index: 'NumReg'}
  // ).zip().pluck('nombre')
  // .run(conn, function(err, cursor){
  //     if (err) throw err;
  //     cursor.toArray(function(err, result) {
  //       console.log(JSON.stringify(result));
  //     });
  //     console.timeEnd('time');
  // });



  /// consulta b
  // console.time('time');
  // r.table('Factura').eqJoin('numeroHabitacion', r.table('Habitacion'), {index:'numero'}).zip()
  // .filter({salida: null})
  // .pluck('numero','tipo')
  // .orderBy('numero')
  // .run(conn, function(err, cursor){
  //     if (err) throw err;
  //     cursor.toArray(function(err, result) {
  //       console.log(JSON.stringify(result));
  //     });
  //     console.timeEnd('time');
  // });


    /// consulta d
    //{'hablimpieza':['Numero']}
    // console.time('time');
    // r.table('Empleado').pluck('NumReg', {'hablimpieza':['Numero']}).filter(data => {
    //   return data('hablimpieza').ne([])
    // }).map(data => {
    //   return {
    //     HabitacionesLimpiadas: data('hablimpieza').pluck('Numero').distinct().count(),
    //     Numreg: data('NumReg')
    //   }
    // }).filter(data => {
    //   return data('HabitacionesLimpiadas').eq(r.table('Habitacion').count())
    // }).eqJoin('Numreg', r.table('Empleado'), {index: 'NumReg'}).zip().pluck('nombre','sueldo','incorporacion')
    // .run(conn, function(err, cursor){
    //     if (err) throw err;
    //     cursor.toArray(function(err, result) {
    //      console.log(JSON.stringify(result));
    //     });
    //     console.timeEnd('time');
    // });


    /// consulta e

    // console.time('time');
    // r.table('Empleado').filter((data) => {
    //  return r.table('Servicio')('responsable').contains(data('NumReg')).not()
    // }).filter(data => {
    //   return data('proveedorEncargado')('facturas').ne([])
    // }).map(data => {
    //   return data('proveedorEncargado')('dataProveedor');
    // })
    // .run(conn, function(err, cursor){
    //     if (err) throw err;
    //     cursor.toArray(function(err, result) {
    //      console.log(JSON.stringify(result));
    //     });
    //     console.timeEnd('time');
    // });



    console.time('time');
    r.table('Factura').eqJoin('numeroHabitacion', r.table('Habitacion'), { index: 'numero' })
    .zip().pluck('DNI',{'tipo':['tipo']})
    .group('DNI').ungroup()
    .map(data => {
      return data('reduction')
    })
    .map(data => {
      return {
        cant: data('tipo').pluck('tipo').distinct().count(),
        DNI: data('DNI').distinct()(0),
      }
    })
    .filter(data => {
      return data('cant').eq(2)
    })
    .eqJoin('DNI', r.table('Cliente'), {index:'DNI'}).zip().pluck('Nombre','Apellidos','Domicilio','Telefono')
    .run(conn, function(err, cursor){
        if (err) throw err;
        cursor.toArray(function(err, result) {
         console.log(JSON.stringify(result));
        });
        console.timeEnd('time');
    });
});
