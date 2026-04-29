import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        // 自动导入 Element Plus 组合式API + 国际化
        ElementPlusResolver({
          importStyle: 'sass' // 统一配置为sass，适配主题定制
        })
      ],
      // 可选：自动导入Vue内置API（如ref、onMounted），无需手动import
      imports: ['vue', 'vue-router'],
      // 可选：生成类型声明文件，提升TS提示体验
      dts: './src/auto-imports.d.ts'
    }),
    Components({
      resolvers: [
        // Element Plus 组件自动导入 + 配置sass样式导入
        ElementPlusResolver({ 
          importStyle: 'sass' // 开启sass样式自动导入，支持主题定制
        }),
        // 自动导入 Element Plus 图标（解决Sun/Moon等图标导入报错）
        (componentName) => {
          if (componentName.startsWith('ElIcon')) {
            return {
              name: componentName.slice(5), // 截取ElIcon后的图标名（如ElIconSun → Sun）
              from: '@element-plus/icons-vue' // 图标库来源
            }
          }
        }
      ],
      // 可选：生成组件类型声明文件
      dts: './src/components.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
   server: {
    proxy: {
      '/api': {
        target: 'http://big-event-vue-api-t.itheima.net',
        changeOrigin: true,
      },
      '/my': {
        target: 'http://big-event-vue-api-t.itheima.net',
        changeOrigin: true,
      },
    },
  },
  // 可选：如需自定义Element Plus主题，添加scss预处理器配置
  css: {
    preprocessorOptions: {
      scss: {
        // 示例：自动导入自定义主题变量文件（需自行创建对应文件）
        // additionalData: `@use "@/styles/element-variables.scss" as *;`
      }
    }
  }
})