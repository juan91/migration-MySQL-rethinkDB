module.exports = {
   esquemaFactura(fila, formaP = null, incluye = null) {
    let servicios =  [];
    let formaPago =  null;
  
    if (formaP && forma.length > 0) {
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

  esquemaHabitacion(fila, tipos = null, limpiezas = null) {
     
    let dataTipos = [];
    let dataLimpiza = [];

    if (tipos && tipos.length > 0) {
      tipos.forEach(element => {
        dataTipos.push({ tipo: element.Tipo, precio: element.precio})  
      });      
    }

    if (limpiezas && limpiezas.length > 0) {
      limpiezas.forEach(element => {
        dataLimpiza.push({ NumReg: element.NumReg, fecha: element.Fecha})  
      });      
    }
    const esquemaHabitacion = {
      numero: fila.Numero,
      superficie: fila.superficie,
      bar: fila.bar,
      terraza: fila.terraza,
      puedesupletoria: fila.puedesupletoria,
      tipo: dataTipos,
      limpieza: dataLimpiza,
    }
    return esquemaHabitacion;
  },

  esquemaServicio(fila, encargado = null, usaServicio = null) {
     
    let dataEncargado = [];
    let usaSer = [];

    if (encargado && encargado.length > 0) {
      encargado.forEach(element => {
        dataEncargado.push({ tipo: element.NumReg})  
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
      asignado: dataEncargado
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

  esquemaEmpleado(fila, proveedor = null, facturas = null) {
   
    let datafacturas = [];
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

    const esquemaEmpleado = {
      NumReg: fila.NumReg,
      nombre: fila.Nombre,
      incorporacion: fila.Incorporacion,
      sueldo: fila.Sueldo,
      proveedorEncargado: {
        dataProveedor,
        facturas: datafacturas
      },
    }
    return esquemaEmpleado;
  },

}