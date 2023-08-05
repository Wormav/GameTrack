import * as dotenv from 'dotenv';

dotenv.config();

interface Overridable {
  [key: string]: string | undefined;
}

const overridable: Overridable = {
  MEDIA_ROOT: `${__dirname}/STORAGE`,
  API_URL: undefined,
  API_PORT: undefined,
  ORIGIN_URL: undefined,
  IGDB_CLIENT_ID: undefined,
  IGDB_CLIENT_SECRET: undefined

};

for (const key of Object.keys(overridable)) {
  if (process.env[key] === undefined) {
    process.env[key] = overridable[key];
  }
}

