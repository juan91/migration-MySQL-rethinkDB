const r = require('rethinkdb');
const { databaseR } = require('./key');


r.connect( databaseR, async function(err, conn) {   
  if (err) throw err;
  /// consulta 1
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



  /// consulta 2
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


    /// consulta 4
    //{'hablimpieza':['Numero']}
    console.time('time');
    r.table('Empleado').pluck('NumReg', {'hablimpieza':['Numero']}).filter(data => {
      return data('hablimpieza').ne([])
    }).map(data => {
      return {
        HabitacionesLimpiadas: data('hablimpieza').pluck('Numero').distinct().count(),
        Numreg: data('NumReg')
      }
    }).filter(data => {
      return data('HabitacionesLimpiadas').eq(r.table('Habitacion').count())
    }).eqJoin('Numreg', r.table('Empleado'), {index: 'NumReg'}).zip().pluck('nombre','sueldo','incorporacion')
    .run(conn, function(err, cursor){
        if (err) throw err;
        cursor.toArray(function(err, result) {
         console.log(JSON.stringify(result));
        });
        console.timeEnd('time');
    });


//   r.table('Servicio').merge(function (servicio) {
//     return {
//         empleados: r.table('Empleado').getAll(r.args(servicio('asignado')), {index:'NumReg'}).coerceTo('array')
//     }
// }).run(conn, function(err, cursor){
//   if (err) throw err;
//   cursor.toArray(function(err, result) {
//     console.log(JSON.stringify(result));
//   });
// });

  // r.table("Empleado").filter({ nombre: 'Jorge Alonso Alonso' }).run(conn, function(err, cursor) {
  //   if (err) throw err;
  //   cursor.toArray(function(err, result) {
  //       if (err) throw err;
  //       console.log(result[0].NumReg);
  //       r.table("Servicio").filter(r.row('asignado').contains(result[0].NumReg)).pluck('responsable').run(conn, function(err, cursor) {
  //         if (err) throw err;
  //         cursor.toArray(function(err, result) {
  //           r.table("Empleado").filter({NumReg:result[0].responsable}).run(conn, function(err, cursor) {
  //             cursor.toArray(function(err, result) {
  //               delete result[0].proveedorEncargado;
  //               console.log(result);
  //             });
  //           });
  //         });
  //       });
  //   });
  // });


});
