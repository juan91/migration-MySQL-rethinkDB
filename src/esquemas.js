module.exports = {
   esquemaFactura(fila, formaP = null, incluye = null, habitacion = null, cliente = null) {
    let servicios =  [];
    let datahabitacion = null;
    let Forma =  null;
    let dataCliente =  null;
  
    if (formaP && formaP.length > 0) {
      Forma = {
        forma: formaP[0].Forma,
        comision: formaP[0].comision
      }
    }
  
    if (incluye && incluye.length > 0) {
      incluye.forEach(element => {
        servicios.push({ codSe:element.CodS, coste:element.coste, fecha:element.fecha })  
      });
    }
    
    if (habitacion && habitacion.length > 0) {
      datahabitacion = { 
          Numero: habitacion[0].Numero,
          superficie: habitacion[0].superficie,
          bar:habitacion[0].bar,
          terraza:habitacion[0].terraza,
          puedesupletoria:habitacion[0].puedesupletoria,
          Tipo: habitacion[0].tipoH,
        };
    }

    if (cliente && cliente.length > 0) {
      dataCliente = {
        DNI: cliente[0].DNI,
        Nombre:cliente[0].Nombre,
        Apellidos: cliente[0].Apellidos,
        Domicilio: cliente[0].Domicilio,
        Telefono: cliente[0].Telefono,
      }
    }
  
    const esquemaFactura = {
      CodigoF: fila.CodigoF,
      entrada: fila.Entrada,
      salida: fila.Salida,
      cliente: dataCliente,
      total: fila.Total,
      supletoria: fila.supletoria,
      Habitacion: datahabitacion,
      Forma,
      servicios,
    };
    return esquemaFactura;
  },

  esquemaHabitacion(fila, tipo = null) {
     
    let dataTipos = null;

    if (tipo  && tipo.length > 0) {     
        dataTipos = { Tipo: tipo[0].Tipo, precio: tipo[0].precio }       
    }

    const esquemaHabitacion = {
      Numero: fila.Numero,
      superficie: fila.superficie,
      bar: fila.bar,
      terraza: fila.terraza,
      puedesupletoria: fila.puedesupletoria,
      Tipo: dataTipos,
    }
    return esquemaHabitacion;
  },

  esquemaServicio(fila, encargado = null, usaServicio = null) {
     
    let dataEncargado = [];
    let usaSer = [];

    if (encargado && encargado.length > 0) {
      encargado.forEach(element => {
        dataEncargado.push(element.NumReg);
      });      
    }

    if (usaServicio && usaServicio.length > 0) {
      usaServicio.forEach(element => {
        usaSer.push({ codServ: element.Servicio_CodS, fecha: element.fecha})  
      });      
    }

    const esquemaServicio = {
      CodS: fila.CodS,
      descripcion: fila.Descripcion,
      costeinterno: fila.costeinterno,
      usaServicio: usaSer,
      NumReg: fila.NumReg,
    }
    return esquemaServicio;
  },

  esquemaCliente(fila, reservas = null) {
     
    let dataResevas = [];

    if (reservas && reservas.length > 0) {
      reservas.forEach(element => {
        dataResevas.push({ entrada: element.Entrada, salida: element.Salida, numero:element.Numero })  
      });      
    }

    const esquemaCliente = {
      DNI: fila.DNI,
      Nombre: fila.Nombre,
      Apellidos: fila.Apellidos,
      Domicilio: fila.Domicilio,
      Telefono: fila.Telefono,
      reservas: dataResevas
    }
    return esquemaCliente;
  },

  esquemaEmpleado(fila, proveedor = null, facturas = null, limpiezas = null) {
   
    let datafacturas = [];
    let datalimpiezas = [];
    let dataProveedor = null;
    if (proveedor && proveedor.length > 0) {
      dataProveedor = {
        NIF: proveedor[0].NIF,
        nombre: proveedor[0].Nombre,
        direccion: proveedor[0].Direccion
      }
    }

    if (facturas && facturas.length > 0) {
      facturas.forEach(element => {
        datafacturas.push({ CodFP: element.CodFP, fecha: element.Fecha, importe: element.Importe })  
      });      
    }

    if (limpiezas && limpiezas.length > 0) {
      limpiezas.forEach(element => {
        datalimpiezas.push({ numero: element.Numero, fecha: element.Fecha})  
      });      
    }

    const esquemaEmpleado = {
      NumReg: fila.NumReg,
      nombre: fila.Nombre,
      incorporacion: fila.Incorporacion,
      sueldo: fila.Sueldo,
      proveedorEncargado: {
        dataProveedor,
        facturas: datafacturas
      },
      CodS: fila.CodS,
      habitacionAseo: limpiezas
    }
    return esquemaEmpleado;
  },

}