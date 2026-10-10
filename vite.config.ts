import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin'

export default defineConfig(({ mode }) => {
  // No `npm run dev`, a senha de moderação vem do arquivo .env (no Netlify, das variáveis do projeto)
  const env = loadEnv(mode, process.cwd(), '')
  if (env.ADMIN_PASSWORD && !process.env.ADMIN_PASSWORD) process.env.ADMIN_PASSWORD = env.ADMIN_PASSWORD

  return {
    // O plugin do Netlify simula Functions e Blobs localmente
    // (só os recursos usados no site; os outros ficam desligados para o dev subir mais leve)
    plugins: [
      react(),
      tailwindcss(),
      netlify({
        edgeFunctions: { enabled: false },
        database: { enabled: false },
        images: { enabled: false },
        aiGateway: { enabled: false },
        geolocation: { enabled: false },
      }),
    ],
  }
})
