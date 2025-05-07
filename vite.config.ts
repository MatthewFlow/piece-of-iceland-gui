import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname, 'env');

  const baseEnv = path.join(envDir, `.env`);
  const modeEnv = path.join(envDir, `.env.${mode}`);

  const envVars = Object.assign(
    dotenv.config({ path: baseEnv }).parsed || {},
    dotenv.config({ path: modeEnv }).parsed || {}
  );

  dotenvExpand.expand({ parsed: envVars });

  return {
    plugins: [react()],
    define: {
      'import.meta.env': JSON.stringify(envVars),
    },
    envPrefix: 'VITE_',
  };
});
