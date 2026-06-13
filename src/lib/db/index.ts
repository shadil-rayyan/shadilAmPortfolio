import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Create the Neon client with optional fetch timeout
const sql = neon(process.env.DATABASE_URL!, {
  fetch: async (input, init) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout
    try {
      return await fetch(input, { ...init, signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }
  },
});

export const db = drizzle(sql, { schema });