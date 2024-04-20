# IIC2173 Arquitectura de Sistemas de Software: E1
Estudiantes:
* Beatriz Errázuriz
* Daniel Sebastián
* Diego Sfeir
* Eduardo Soto
* Joaquín Viñuela

## Instrucciones para Ejecutar Localmente

Para ejecutar localmente el proyecto, se debe tener sistema operativo Linux o MacOS, con Node.js y Postgresql instalados. Luego, se debe clonar el repositorio del proyecto y abrir una consola en el directorio de la API y otra en el directorio del Broker. En cada consola se debe ejecutar el comando `npm install` para actualizar las dependencias de cada una de las partes del proyecto. En el directorio de la API, se debe crear un archivo `.env` con las siguientes variables de entorno:

```
DATABASE_USER={user}
DATABASE_PASSWORD={password}
DATABASE_PORT=5432
DATABASE_NAME={db_name}
DATABASE_HOST=localhost
```

donde `{user}` y `{password}` son las credenciales de acceso a la base de datos, y `{db_name}` es el nombre de la base de datos. A continuación, se debe crear un usuario de postgres con el nombre de usuario y contraseña especificados, el cual a su vez debe tener una base de datos creada con el nombre especificado en el archivo `.env`.
Para ejecutar el proyecto se debe asegurar que Postgres se esté corriendo. Para ejecutar Postgres se puede usar el comando `sudo service postgresql start`. Luego, en la consola de la API se debe ejecutar el comando `npm run start:dev` para correr la API en modo desarrollo. Al hacerlo, se migrará la base de datos de manera automática, creando las tablas necearias para ejecutar el proyecto. A menos que se especifique en el archivo `.env`, la API correrá en el puerto 3000.


En el directorio del Broker, se debe crear un archivo `.env` con las siguientes variables de entorno:

```
HOST=broker.iic2173.org
PORT=9000
USERNAME=students
PASSWORD=iic2173-2024-1-students
API_URL=http://{api_host}:{api_port}/flights
```

donde `{api_host}` y `{api_port}` deben coincidir con las variables determinadas en la configuración de entorno de la API. Luego, para ejecutar el broker, se debe usar el comando `npm run dev`. Si la API no está corriendo cuando se escucha algún mensaje de parte del broker, el broker informará un error a la hora de tratar de redirigir la información a la API.
