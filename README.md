# MIGRANDO UNA BASE DE DATOS DE MYSQL A RETHINKDB

La base de datos corresponde a la de una [Hotel](https://github.com/juan91/migration-MySQL-rethinkDB/tree/master/baseDeDatosMysql)

El Script migra la base de datos desde MySQL a una base de datos NoSQL orientada a documentos como es RETHINKDB


# Requerimientos

Para iniciar es necesario tener instalado lo siguiente:

- [Git](https://git-scm.com/book/es/v2/Inicio---Sobre-el-Control-de-Versiones-Instalaci%C3%B3n-de-Git)
- [Nodejs10.X](https://nodejs.org/en/download/releases/)
- [Docker](https://docs.docker.com/install/)
- [Docker-compose](https://docs.docker.com/compose/install/)


# Instalar Mysql y cargar datos
- npm run up:db (utiliza sudo en caso de no tener permisos)

# Instalar RethinkDB
- [Rethinkdb](https://rethinkdb.com/docs/install/)

# Migrar base de datos desde MySQL a RethinkDB
- npm run start

# realizar consultar
hay 5 consultas correspondientes al hotel
- Las consultas hechas mysql se cuentrán en src/consultasMysql.js
- Las consultas hechas rethinkdb se cuentrán en src/consultasrethinkdb.js
- para ejecutar las consulta de mysql: npm run cm
- para ejecutar las consulta de rethinkdb: npm run cr