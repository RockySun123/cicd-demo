import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig(
  ({ mode }: ConfigEnv): UserConfig => {
    //获取当前工作目录
    const root = process.cwd()
    //获取环境变量
    const env = loadEnv(mode, root)
    console.log(env)
    return {
      //项目根目录
      root,
      //项目部署的基础路径
      base: '/',
      publicDir: fileURLToPath(new URL('./public', import.meta.url)), //无需处理的静态资源位置
      assetsInclude: fileURLToPath(new URL('./src/assets', import.meta.url)), //需要处理的静态资源位置
      plugins: [
        //vue 模版文件编译插件
        vue(),
        //jsx 文件编译插件
        vueJsx(),
      ],
      //运行后本地预览的服务器
      server: {
        //是否启用https
        https: false,
        //指定服务器应该监听哪个IP地址。0.0.0.0或true，监听所有地址，包括局域网和公网地址
        host: true,
        //端口号
        port: 9000,
        // 自动打开浏览器
        open: false,
        // 热更新
        // hot: true,
        // 是否开启CORS跨域
        cors: true,
        // 关闭浏览器窗口
        // close: false,
        // 静态资源路径
        // assetsDir: 'assets',
        // 代理
        proxy: {
          [env.VITE_APP_API_BASEURL]: {
            target: 'https://localhost:9000',
            //改变 Host Header
            changeOrigin: true,
            //发起请求将 /api 替换为 ''
            // rewrite:(path)=>path.replace(/^\/api/,''),
          },
          [env.VITE_APP_MOCK_BASEURL]: {
            target: 'https://localhost:9000',
            changeOrigin: true,
          },
        },
      },
      //打包配置
      build: {
        //关闭 sorcemap 报错不会映射到源码
        sourcemap: false,
        //打包大小超出 400ßkb 提示告警
        chunkSizeWarningLimit: 400,
        rollupOptions: {
          //打包入口文件，根目录下的 index.html
          //也就是项目从哪个文件开始打包
          input: {
            index: fileURLToPath(new URL('./index.html', import.meta.url)),
          },
          //静态资源分类打包
          output: {
            format: 'esm',
            chunkFileNames: 'static/js/[name]-[hash].js',
            entryFileNames: 'static/js/[name]-[hash].js',
            assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          },
        },
      },
      //配置别名
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
          '#': fileURLToPath(new URL('./types', import.meta.url)),
        },
      },
    }
  },
)
