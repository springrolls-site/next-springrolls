
# Next Springrolls Site

Una plataforma para que los creadores de contenido consoliden sus enlaces a otras redes o servicios, moneticen su contenido y servicios, y ofrezcan una interfaz donde los seguidores puedan interactuar a través de propinas.

## Tabla de Contenidos

- [Tecnologías](#tecnologías)
- [Prerequisitos](#prerequisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Migraciones](#migraciones)
- [Hash de Contraseñas](#hash-de-contraseñas)
- [Problemas Comunes](#problemas-comunes)
- [Contribuyendo](#contribuyendo)
- [Licencia](#licencia)

## Tecnologías

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)

## Prerequisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js (opcional, si deseas ejecutar la aplicación localmente sin Docker)

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone git@github.com:springrolls-site/next-springrolls.git
   cd next-springrolls
   ```

2. **Crear un archivo `.env` a partir del ejemplo:**

   ```bash
   cp .env.example .env
   ```

   Asegúrate de configurar los valores correctos en tu archivo `.env`, especialmente la variable `DATABASE_URL`.

3. **Instalar dependencias localmente (opcional pero recomendado):**

   ```bash
   npm install
   ```

   Esto asegura que tu `package.json` y `package-lock.json` estén actualizados.

4. **Iniciar los contenedores de Docker:**

   ```bash
   docker-compose up -d --build
   ```

   La bandera `--build` asegura que la imagen de Docker se reconstruya, incluyendo cualquier nueva dependencia.

5. **Ejecutar las migraciones iniciales:**

   ```bash
   docker-compose exec app npx prisma migrate dev --name init
   ```

6. **(Opcional) Ejecutar el script de seed para agregar datos iniciales:**

   ```bash
   docker-compose exec app npx ts-node seed.ts
   ```

## Uso

Accede a la aplicación en [http://localhost:3000](http://localhost:3000).

### Endpoints de la API

- **GET** `/api/users`: Recupera una lista de usuarios.

## Migraciones

Cuando realices cambios en el esquema de la base de datos:

1. **Modificar el archivo `prisma/schema.prisma`** para reflejar los cambios en el modelo.

2. **Crear una nueva migración:**

   ```bash
   docker-compose exec app npx prisma migrate dev --name nombre_de_migracion
   ```

3. **(Opcional) Actualizar los datos de seed ejecutando el script de seed:**

   ```bash
   docker-compose exec app npx ts-node seed.ts
   ```

## Hash de Contraseñas

Para el hash de contraseñas, estamos utilizando `bcryptjs`. Asegúrate de instalar tanto el paquete como sus definiciones de tipo para TypeScript.

### Instalación de `bcryptjs` y sus definiciones de tipo:

1. **Instalar `bcryptjs`:**

   ```bash
   docker-compose exec app npm install bcryptjs
   ```

2. **Instalar las definiciones de tipo para `bcryptjs`:**

   ```bash
   docker-compose exec app npm install --save-dev @types/bcryptjs
   ```

3. **Reconstruir la imagen de Docker para incluir las nuevas dependencias:**

   ```bash
   docker-compose up -d --build
   ```

Esto asegurará que `bcryptjs` esté disponible tanto en tu entorno local como dentro del contenedor Docker.

## Problemas Comunes

### Puerto 5432 ya está en uso

Si encuentras un error como:

```
Error starting userland proxy: listen tcp4 0.0.0.0:5432: bind: address already in use
```

Esto significa que el puerto predeterminado de PostgreSQL `5432` ya está en uso en tu máquina.

#### Opciones de Solución:

1. **Detener el servicio local de PostgreSQL:**

   - **macOS con Homebrew:**

     ```bash
     brew services stop postgresql
     ```

   - **Ubuntu/Debian:**

     ```bash
     sudo service postgresql stop
     ```

   - **Windows:**

     - Detén el servicio de PostgreSQL desde la consola de servicios (`services.msc`).

2. **Cambiar el mapeo de puertos en `docker-compose.yml`:**

   Actualiza el servicio `db` para mapear a un puerto diferente, por ejemplo, `5433`:

   ```yaml
   services:
     db:
       image: postgres:13
       ports:
         - '5433:5432'
       # ... resto de la configuración
   ```

   Luego, actualiza tu archivo `.env` o la configuración de la base de datos para usar el nuevo puerto:

   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5433/mydb
   ```

### Error "Cannot find module 'bcryptjs'"

Si encuentras un error como:

```
Error: Cannot find module 'bcryptjs'
```

Asegúrate de que `bcryptjs` esté instalado correctamente en tu proyecto.

#### Solución:

1. **Instalar `bcryptjs`:**

   ```bash
   docker-compose exec app npm install bcryptjs
   ```

2. **Instalar las definiciones de tipo para TypeScript:**

   ```bash
   docker-compose exec app npm install --save-dev @types/bcryptjs
   ```

3. **Reconstruir la imagen de Docker:**

   ```bash
   docker-compose up -d --build
   ```

4. **Ejecutar nuevamente el script de seed:**

   ```bash
   docker-compose exec app npx ts-node seed.ts
   ```

## Contribuyendo

Las contribuciones son bienvenidas. Por favor, abre un issue o una pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
