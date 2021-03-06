import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from "path"
import Components from 'unplugin-vue-components/vite'
//vant解析库
import { VantResolver } from 'unplugin-vue-components/resolvers'
//icon
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [ 
    vue(),
    Components({
      // 解析的ui库
      resolvers: [
        VantResolver(),
        IconsResolver({
          prefix: 'icon', // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
          // {prefix}-{collection}-{icon} 使用组件解析器时，您必须遵循名称转换才能正确推断图标。
          // alias: { park: 'icon-park' } 集合的别名
          enabledCollections: ['ep','bxs','pepicons','line-md','ic','icon-park-twotone', 'icon-park-solid'] // 这是可选的，默认启用 Iconify 支持的所有集合['mdi']
        }),
      ]
    }),
    Icons({
      // scale: 1, // 缩放
      compiler: 'vue3', // 编译方式
      // defaultClass: '', // 默认类名
      // defaultStyle: '', // 默认样式
      autoInstall: true
      // jsx: 'react' // jsx支持
    }),
  ],
  server: {			
    // open: true,
    host: '0.0.0.0',	// 本机的局域网IP
    port: 8080,  // 端口号，一般情况下为8080
    proxy: { 
      "/api/wy": { 
        target: "http://localhost:3000", 
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api\/wy/, "")
      },
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  resolve: {
    alias: {
      '@': join( __dirname, "src"),
    }
  },
  css: {
    preprocessorOptions: {
      //define global scss variable
      scss: {
        additionalData: `@import '@/assets/styles/variables.scss';`,
      }
    }
  }
})
