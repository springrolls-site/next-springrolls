
# Next Springrolls Site

A platform for content creators to consolidate links to other networks or services, monetize their content and services, and offer an interface where followers can interact through tips.

## Table of Contents

- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Migrations](#migrations)
- [Password Hashing](#password-hashing)
- [Common Issues](#common-issues)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js (optional, if you want to run the app locally without Docker)

## Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:springrolls-site/next-springrolls.git
   cd next-springrolls
   ```

2. **Create a `.env` file from the example file:**

   ```bash
   cp .env.example .env
   ```

   Make sure to set the correct values in your `.env` file, especially the `DATABASE_URL` variable.

   Use the following command to generate a random 32-character key:

   ```
   openssl rand -base64 32
   ```

   Set NEXTAUTH_SECRET in the .env file:

   ```
   NEXTAUTH_SECRET="your-generated-secret-key"
   ```

3. **Install dependencies locally (optional but recommended):**

   ```bash
   npm install
   ```

   This ensures your `package.json` and `package-lock.json` are up-to-date.

4. **Start the Docker containers:**

   ```bash
   docker-compose up -d --build
   ```

   The `--build` flag ensures the Docker image is rebuilt to include any new dependencies.

5. **Run initial migrations:**

   ```bash
   docker-compose exec app npx prisma migrate dev --name init
   ```

6. **(Optional) Run the seed script to add initial data:**

   ```bash
   docker-compose exec app npx ts-node seed.ts
   ```

## Usage

Access the application at [http://localhost:3000](http://localhost:3000).

### API Endpoints

- **GET** `/api/users`: Retrieve a list of users.

## Migrations

When making changes to the database schema:

1. **Modify the `prisma/schema.prisma` file** to reflect model changes.

2. **Create a new migration:**

   ```bash
   docker-compose exec app npx prisma migrate dev --name migration_name
   ```

3. **(Optional) Update seed data by running the seed script:**

   ```bash
   docker-compose exec app npx ts-node seed.ts
   ```

## Password Hashing

For password hashing, we use `bcryptjs`. Make sure to install both the package and its type definitions for TypeScript.

### Installing `bcryptjs` and its type definitions:

1. **Install `bcryptjs`:**

   ```bash
   docker-compose exec app npm install bcryptjs
   ```

2. **Install type definitions for `bcryptjs`:**

   ```bash
   docker-compose exec app npm install --save-dev @types/bcryptjs
   ```

3. **Rebuild the Docker image to include new dependencies:**

   ```bash
   docker-compose up -d --build
   ```

This ensures `bcryptjs` is available in both your local and Docker environments.

### 🚨 Steps to Follow When Rebuilding Containers 🚨

Each time you rebuild your containers, follow these steps to ensure that Prisma, migrations, and database seed data are correctly updated:

1. **Run Prisma migrations**  
   ```bash
   docker-compose exec app npx prisma migrate dev
   ```

2. **Install development dependencies (if new ones have been added)**  
   ```bash
   docker-compose exec app npm install --save-dev @types/bcryptjs
   ```

3. **Generate Prisma client**  
   ```bash
   docker-compose exec app npx prisma generate
   ```

4. **Load seed data**  
   ```bash
   docker-compose exec app npx ts-node seed.ts
   ```

5. **Restart the app container**  
   ```bash
   docker-compose restart app
   ```

### Note
Each step is necessary to ensure that all changes to the database schema and dependencies are synchronized within the app container.

## License

This project is licensed under the MIT License.
