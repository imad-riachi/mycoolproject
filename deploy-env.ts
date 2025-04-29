import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const tempDir = '.vercel_env_temp'; // Temporary directory to store variable files

// Get Vercel credentials from environment
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_ORG_ID = process.env.VERCEL_ORG_ID;

// Validate Vercel credentials
if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID || !VERCEL_ORG_ID) {
  console.error('Error: Required Vercel credentials are missing');
  process.exit(1);
}

// Debug information
console.log(`Using Project ID: ${VERCEL_PROJECT_ID}`);
console.log(`Using Organization ID: ${VERCEL_ORG_ID}`);
console.log(`Token available: ${VERCEL_TOKEN ? 'Yes' : 'No'}`);

// We need to set the VERCEL_TOKEN environment variable for CLI to use it
process.env.VERCEL_PROJECT_ID = VERCEL_PROJECT_ID;
process.env.VERCEL_ORG_ID = VERCEL_ORG_ID;

// Ensure the directory exists
execSync(`mkdir -p ${tempDir}`);

// List of environment variables to set
const envVarKeys = [
  'POSTGRES_URL',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'AUTH_SECRET',
  'BASE_URL',
  'POSTHOG_API_KEY',
  'POSTHOG_HOST',
];

// Process each environment variable
envVarKeys.forEach((key) => {
  const val = process.env[key];

  if (key && val) {
    const tempFilePath = path.join(tempDir, key);
    writeFileSync(tempFilePath, val);

    console.log(`Checking if ${key} exists...`);
    try {
      // Using execSync with options object to pass environment variables
      const existingVarsResult = execSync('npx vercel env ls production', {
        encoding: 'utf-8',
        env: {
          ...process.env,
          VERCEL_TOKEN,
        },
      });

      if (existingVarsResult.includes(key)) {
        console.log(`Removing existing ${key}...`);
        execSync(`npx vercel env rm ${key} production -y`, {
          stdio: 'inherit',
          env: {
            ...process.env,
            VERCEL_TOKEN,
          },
        });
      } else {
        console.log(`${key} does not exist, skipping removal.`);
      }
    } catch (error) {
      console.log(`Skipping removal of ${key}, possibly no existing value.`);
      console.error(error);
    }

    console.log(`Setting ${key}...`);
    execSync(`npx vercel env add ${key} production < ${tempFilePath}`, {
      stdio: 'inherit',
      env: {
        ...process.env,
        VERCEL_TOKEN,
      },
    });

    execSync(`rm -f ${tempFilePath}`); // Clean up temp file
  } else {
    console.log(`Warning: Environment variable ${key} is not set or empty`);
  }
});

// Remove temp directory
execSync(`rm -rf ${tempDir}`);
