const r = require("rethinkdb");
const { databaseR } = require("./key");


r.connect( databaseR, async function(err, conn) {   
  if (err) throw err;
  /// consulta a
  // console.time("time");
  // r.table("Empleado").filter({nombre:"Jorge Alonso Alonso"}).pluck("CodS").eqJoin("CodS", r.table("Servicio"), {index: "CodS"}).zip().pluck("NumReg").eqJoin(
  //   "NumReg", r.table("Empleado"), {index: "NumReg"}
  // ).zip().pluck("nombre")
  // .run(conn, function(err, cursor){
  //     if (err) throw err;
  //     cursor.toArray(function(err, result) {
  //       console.log(JSON.stringify(result));
  //     });
  //     console.timeEnd("time");
  // });



  /// consulta b
  //  console.time("time");
  // r.table("Factura").filter({salida: null})
  // .pluck({"Habitacion":{"Tipo": {"Tipo": true, "precio":true}, "Numero": true}}).map(data => {
  //   return {
  //     numero: data("Habitacion")("Numero"),
  //     Tipo: data("Habitacion")("Tipo")("Tipo"),
  //     Precio: data("Habitacion")("Tipo")("precio")
  //   }
  // })
  // .run(conn, function(err, cursor){
  //     if (err) throw err;
  //     cursor.toArray(function(err, result) {
  //       console.log(JSON.stringify(result));
  //     });
  //     console.timeEnd("time");
  // });



//   console.time("time");
//   r.table("Factura").pluck({"cliente":{"DNI": true}}, {"Habitacion":{"Tipo":{"Tipo": true}}})
//   .filter(data => {
//     return data("Habitacion")("Tipo")("Tipo").eq("individual")
//   })
//   .distinct()
//   .do(individual => {
//     return r.table("Factura").pluck({"cliente":{"DNI": true,"Nombre": true,"Apellidos":true}}, {"Habitacion":{"Tipo":{"Tipo": true}}})
//     .filter(data => {
//       return data("Habitacion")("Tipo")("Tipo").eq("doble")
//     })
//     .distinct().filter(doble => {
//       return individual("cliente")("DNI").contains(doble("cliente")("DNI"))
//     })
//   })
//   .pluck("cliente")
// .run(conn, function(err, cursor){
//       if (err) throw err;
//       cursor.toArray(function(err, result) {
//        console.log(JSON.stringify(result));
//       });
//       console.timeEnd("time");
//   });
  

   // consulta d
    console.time("time");
    r.table("Empleado").pluck("NumReg", {"habitacionAseo":["Numero"]}).filter(data => {
      return data("habitacionAseo").ne([])
    }).map(data => {
      return {
        HabitacionesLimpiadas: data("habitacionAseo").pluck("Numero").distinct().count(),
        Numreg: data("NumReg")
      }
    }).filter(data => {
      return data("HabitacionesLimpiadas").eq(r.table("Habitacion").count())
    }).eqJoin("Numreg", r.table("Empleado"), {index: "NumReg"}).zip().pluck("nombre","sueldo","incorporacion")
    .run(conn, function(err, cursor){
        if (err) throw err;
        cursor.toArray(function(err, result) {
         console.log(JSON.stringify(result));
        });
        console.timeEnd("time");
    });


    /// consulta e

    // console.time("time");
    // r.table("Empleado").filter((data) => {
    //  return r.table("Servicio")("NumReg").contains(data("NumReg")).not()
    // }).filter(data => {
    //   return data("proveedorEncargado")("facturas").ne([])
    // }).map(data => {
    //   return {
    //     encargado: data('nombre'),
    //     nombre: data('proveedorEncargado')('dataProveedor')('nombre'),
    //     facturas: data('proveedorEncargado')('facturas'), 
    //   }
    // })
    // .run(conn, function(err, cursor){
    //     if (err) throw err;
    //     cursor.toArray(function(err, result) {
    //      console.log(JSON.stringify(result));
    //     });
    //     console.timeEnd("time");
    // });

 

});
