import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {			
    host: '0.0.0.0',	// 本机的局域网IP
    port: 8080,  // 端口号，一般情况下为8080
  }
})
