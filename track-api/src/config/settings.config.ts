import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

interface Overridable {
  [key: string]: string | undefined;
}

const overridable: Overridable = {
  DB_URL: undefined,
  JWT_SECRET: undefined,
  MEDIA_ROOT: path.join(process.cwd(), 'STORAGE'),
  API_PORT: undefined,
  ORIGIN_URL: undefined,
  IGDB_CLIENT_ID: undefined,
  IGDB_CLIENT_SECRET: undefined,
  JWT_EXPIRATION: "604800000", // 7 days,
  JWT_SECURE_COOKIE: "true",
  MAIL_API_KEY: undefined,
  MAIL_API_SECRET: undefined,
  ADMIN_EMAIL: "contact@playtracker.app",
  REPORT_EMAIL: "contact@playtracker.app",
  REPORT_NAME: "Admin",
};



for (const key of Object.keys(overridable)) {
  if (overridable[key] === undefined && process.env[key] === undefined) {
    console.error(`Environment variable ${key} is missing`);
    process.exit(1);
  }
  if (process.env[key] !== undefined) {
    overridable[key] = process.env[key];
  }
  else if (overridable[key] !== undefined ) {
    process.env[key] = overridable[key];
  }
}

