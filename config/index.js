import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from './schema'
import 'dotenv/config'

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
const db = drizzle({ client: sql }, {schema: schema});

export default db;