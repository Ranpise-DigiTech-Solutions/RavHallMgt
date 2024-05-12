import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode })=> {
  const env = loadEnv(mode, process.cwd(), '')
  return {
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  define: {
    __APP_ENV__: JSON.stringify(env.APP_ENV),
  },
  react: {
    // Disable Fast Refresh
    fastRefresh: false,
  },
  }
})
  
