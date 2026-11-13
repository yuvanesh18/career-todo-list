import crypto from 'node:crypto';

const SECRET_KEY = process.env.AUTH_SECRET || 'career-pulse-super-secret-key-2026';

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const testHash = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(testHash, 'hex'));
  } catch {
    return false;
  }
}

export function generateToken(userId: string): string {
  const timestamp = Date.now();
  const payload = `${userId}:${timestamp}`;
  const signature = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64');
}

export function verifyToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');
    if (parts.length < 3) return null;
    const userId = parts[0];
    const timestamp = parts[1];
    const signature = parts[2];

    const expectedSig = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(`${userId}:${timestamp}`)
      .digest('hex');

    if (signature !== expectedSig) return null;
    return userId;
  } catch {
    return null;
  }
}
