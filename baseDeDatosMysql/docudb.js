//factura
{
  codigoF: 1,
  entrada: "01/01/20100",
  salida:"04/01/2010",
  DNI:1111,
  total:360,
  supletoria:30,
  numeroHabitacion: 100,
  formaPago:[
    {
      forma: "efectivo",
      comision: 0
    }
  ],
  servicio:[1,2],
  habitacion: 100,  
}

//habitacion
{
  numero: 100,
  superficie:15,
  bar:"SI",
  terraza:"SI",
  puedesupletoria:"SI",
  tipo:{
    tipo: doble,
    precio:90
  },
  limpieza: [
    {
      NumReg: 1,
      fecha: "24/09/2010"
    },
    {
      NumReg: 2,
      fecha: "25/09/2010"
    }
  ]
}

//servicio
{
 codServ:1,
 descripcion: "tintoreri",
 costeinterno: 50
 usaServ: [
   {
    codServ:5,
    fecha: "24/09/2010"
   },
   {
    codServ:2,
    fecha: "24/09/2010"
   }, 
  ],
  responsable: numReg,
  asignado:[1,4]
}

//cliente
{
  DNI: 1111,
  Nombre: "Francisco",
  Apellidos: "Vilansó Rodríguez",
  Domicilio: "General Rodrigos 24",
  Telefono: 999666565,
  reservas: [
    {
      entrada: "23/10/1996",
      salida: "25/10/1996",
      habitacion:100
    }
  ]
},

//empleado
{
  NumReg:1,
  nombre: "Luisa Blanco Baroja",
  incorporacion: "23/10/1996",
  sueldo: 100,
}

