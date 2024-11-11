import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  // Encriptar contraseñas
  const password1 = await bcrypt.hash('password1', saltRounds);
  const password2 = await bcrypt.hash('password2', saltRounds);

  // Obtener o crear el rol PREMIUM
  const premiumRole = await prisma.role.upsert({
    where: { name: 'PREMIUM' },
    update: {},
    create: {
      name: 'PREMIUM',
    },
  });

  // Crear usuarios de prueba con contraseñas encriptadas y asignarles roles
  const user1 = await prisma.user.create({
    data: {
      email: 'pino.jose@gmail.com',
      username: 'User One',
      password: password1,
      roles: {
        create: [{ roleId: premiumRole.id }],
      },
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
