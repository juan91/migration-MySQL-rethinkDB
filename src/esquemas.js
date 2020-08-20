module.exports = {
   esquemaFactura(fila, formaP = null, incluye = null) {
    let servicios =  [];
    let formaPago =  null;
  
    if (formaP && formaP.length > 0) {
      formaPago = {
        forma: formaP[0].Forma,
        comision: formaP[0].comision
      }
    }
  
    if (incluye && incluye.length > 0) {
      incluye.forEach(element => {
        servicios.push({ codSe:element.CodS, coste:element.coste, fecha:element.fecha })  
      });
      
    }
    const esquemaFactura = {
      codigoF: fila.CodigoF,
      entrada: fila.Entrada,
      salida:fila.Salida,
      DNI:fila.DNI,
      total:fila.Total,
      supletoria:fila.supletoria,
      numeroHabitacion: fila.Numero,
      formaPago,
      servicios,
    };
    return esquemaFactura;
  },

  esquemaHabitacion(fila, tipo = null) {
     
    let dataTipos = null;

    if (tipo  && tipo.length > 0) {     
        dataTipos = { tipo: tipo[0].Tipo, precio: tipo[0].precio }       
    }

    const esquemaHabitacion = {
      numero: fila.Numero,
      superficie: fila.superficie,
      bar: fila.bar,
      terraza: fila.terraza,
      puedesupletoria: fila.puedesupletoria,
      tipo: dataTipos,
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
      codServ: fila.CodS,
      descripcion: fila.Descripcion,
      costeinterno: fila.costeinterno,
      usaServicio: usaSer,
      responsable: fila.NumReg,
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
      codSer: fila.CodS,
      habitacionAseo: limpiezas
    }
    return esquemaEmpleado;
  },

}