import { Option, program } from 'commander';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
dotenv.config();

program
  .addOption(new Option('-p, --pseudo <string>', 'username of the user to update'))
  .addOption(new Option('-n, --new_password <string>', 'new password of the user to update'));

program.parse(process.argv);

const options = program.opts();
const pseudo = options.pseudo as string;
const new_password = options.new_password as string;

async function updatePassword(pseudo: string, new_password: string) {
  const hashedPassword = await bcrypt.hash(new_password, 10);

  try {
    await prisma.user.update({
      where: { username: pseudo },
      data: {
        password: hashedPassword,
      },
    });
    console.log(`Password updated for user ${pseudo}`);
    return true;
  } catch (error) {
    console.log('Error updating password:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
console.log('Updating password...');
void updatePassword(pseudo, new_password);
