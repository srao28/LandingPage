import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const paths = [
  path.join(__dirname, '.env'),
  path.join(process.cwd(), '.env'),
  path.resolve('.env'),
];
const envPath = paths.find((p) => existsSync(p));
if (envPath) {
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    console.warn('load-env:', result.error.message);
  }
}
