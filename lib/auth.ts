import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export type AdminUser = {
  id: string;
  username: string;
  passwordHash: string;
  role: string;
};

const USERS_PATH = path.join(process.cwd(), 'data', 'users.json');

export function getUsers(): AdminUser[] {
  const raw = fs.readFileSync(USERS_PATH, 'utf-8');
  return JSON.parse(raw);
}

export async function validateCredentials(
  username: string,
  password: string
): Promise<AdminUser | null> {
  const users = getUsers();
  const user = users.find((u) => u.username === username);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  return valid ? user : null;
}
