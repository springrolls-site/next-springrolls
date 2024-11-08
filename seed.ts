import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  // Encriptar contraseñas
  const password1 = await bcrypt.hash('password1', saltRounds);
  const password2 = await bcrypt.hash('password2', saltRounds);

  // Crear usuarios de prueba con contraseñas encriptadas
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      username: 'User One',
      password: password1,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      username: 'User Two',
      password: password2,
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
