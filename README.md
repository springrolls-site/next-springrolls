
# Project Name

Brief description of the project and its purpose.

## Table of Contents

- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Migrations](#migrations)
- [Password Hashing](#password-hashing)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- Next.js
- TypeScript
- PostgreSQL
- Prisma
- Docker

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js (optional, if you want to run locally without Docker)

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:springrolls-site/next-springrolls.git
   cd your_repository
   ```

2. Create a `.env` file from the example file:
   ```bash
   cp .env.example .env
   ```

3. Start the Docker containers:
   ```bash
   docker-compose up -d
   ```

4. Run the initial migrations:
   ```bash
   docker-compose exec app npx prisma migrate dev --name init
   ```

5. (Optional) Run the seed script to add initial data:
   ```bash
   docker-compose exec app npx ts-node seed.ts
   ```

## Usage

Access the application at [http://localhost:3000](http://localhost:3000).

### API Endpoints

- **GET** `/api/users`: Retrieve a list of users.

## Migrations

When making changes to the database schema:

1. Modify the `prisma/schema.prisma` file to reflect changes in the model.
2. Create a new migration:
   ```bash
   docker-compose exec app npx prisma migrate dev --name migration_name
   ```

3. (Optional) Update seed data by running the seed script:
   ```bash
   docker-compose exec app npx ts-node seed.ts
   ```

## Password Hashing

For password hashing, we are using `bcryptjs`. If you are using `bcryptjs` for password hashing, make sure to install its types for TypeScript:

```bash
docker-compose exec app npm install --save-dev @types/bcryptjs
```

## Contributing

Contributions are welcome. Please open an issue or a pull request.

## License

This project is licensed under the MIT License.
