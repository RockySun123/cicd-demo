import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
//引入mock依赖
import { viteMockServe } from 'vite-plugin-mock';
//自动按需引入
import AutoImport from 'unplugin-auto-import/vite';
//element-plus 组件库
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
//引入icons
import IconsResolver from 'unplugin-icons/resolver';
//按需引入 Element-plus 样式
import ElementPlus from 'unplugin-element-plus/vite';
//自动注册组件
import Components from 'unplugin-vue-components/vite';
//图标按需引入
import Icons from 'unplugin-icons/vite';
//构建分析
import { visualizer } from 'rollup-plugin-visualizer';
//gzip压缩
// import ViteCompression from 'vite-plugin-compression';
//brotli压缩
//@ts-ignore
import BrotliPlugin from 'rollup-plugin-brotli';
//动态注入cnd
import { createHtmlPlugin } from 'vite-plugin-html';
//外链形式
import externalGlobals from 'rollup-plugin-external-globals';
//类似webpackchunname,指定文件打包合并
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';

const globals = externalGlobals({
	jquery: 'jquery',
	lodash: 'lodash',
	moment: 'moment',
});

// vite 开发环境基于 es6 打包
// vite 生产环境基于 rollup 打包

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	//获取当前工作目录
	const root = process.cwd();
	//获取环境变量
	const env = loadEnv(mode, root);
	console.log(env);
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
			//mock配置,开启mock服务
			viteMockServe({
				//如果接口为 /mock/xxx 以mock 开头就会被拦截响应配置的内容
				mockPath: 'mock', //数据模拟需要拦截的请求起始 URL
				enable: true, //本地环境是否开启 mock 功能
			}),
			//按需引入Element-plus 组件样式
			//开启 Element-plus 组件库，自动引入 css
			ElementPlus({}),
			//配置element-plus 自动引入组件
			AutoImport({
				//对组件按需引入
				resolvers: [ElementPlusResolver(), IconsResolver()],
				//将生成的 .d.ts 放入指定目录下
				dts: fileURLToPath(new URL('./types/auto-imports.d.ts', import.meta.url)),
			}),
			//自动注册组件，
			Components({
				resolvers: [ElementPlusResolver(), IconsResolver()],
				//将注册的组件 生成的 .d.ts 放入指定目录下
				dts: fileURLToPath(new URL('./types/components.d.ts', import.meta.url)),
				dirs: [fileURLToPath(new URL('./src/components', import.meta.url))],
				include: [/\.vue$/, /\.vue\?/],
			}),
			Icons({
				autoInstall: true, //是否自动安装
			}),
			manualChunksPlugin(),
			//gzip压缩
			// ViteCompression({
			// 	threshold: 1024 * 20, //大于20kb的才会压缩
			// 	algorithm: 'gzip',//压缩算法,
			// 	ext: '.gz', //压缩后缀
			// }),

			//brotli压缩
			BrotliPlugin({
				//大于20kb的才会压缩
				threshold: 1024 * 20,
			}),
			createHtmlPlugin({
				//可能会导致 告警 commonjs 与 es 模块冲突
				inject: {
					tags: [
						{
							tag: 'script',
							attrs: {
								src: 'https://code.jquery.com/jquery-3.7.1.min.js',
								defer: true,
							},
						},
						{
							tag: 'script',
							attrs: {
								src: 'https://cdn.jsdelivr.net/npm/moment@2.30.1/moment.min.js',
								defer: true,
							},
						},
						{
							tag: 'script',
							attrs: {
								src: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
								defer: true,
							},
						},
					],
				},
			}),
		],
		//运行后本地预览的服务器
		server: {
			//是否启用https
			https: undefined,
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
					//发起请求将 /api 替换为 ''
					// rewrite:(path)=>path.replace(/^\/api/,''),
				},
			},
		},
		//打包配置
		build: {
			//关闭 sorcemap 报错不会映射到源码
			sourcemap: false,
			//打包大小超出 400ßkb 提示告警
			chunkSizeWarningLimit: 600,
			rollupOptions: {
				//打包入口文件，根目录下的 index.html
				//也就是项目从哪个文件开始打包
				input: {
					index: fileURLToPath(new URL('./index.html', import.meta.url)),
				},
				experimentalLogSideEffects: false, //检查副作用
				treeshake: {
					preset: 'recommended',
				},

				//不需要打包的文件
				external: ['jquery', 'lodash', 'moment'],
				//构建分析
				plugins: [visualizer({ open: true }), globals],

				//静态资源分类打包
				output: {
					format: 'esm',
					chunkFileNames: 'static/js/[name]-[hash].js', //代码分割后文件名
					entryFileNames: 'static/js/[name]-[hash:6].js', //入口文件名
					assetFileNames: 'static/[ext]/[name]-[hash].[ext]', //静态资源文件名

					//老版本打包处理chunk
					manualChunks: (id) => {
						if (id.includes('node_modules')) {
							if (id.includes('vue')) {
								return 'vue';
							} else if (id.includes('element-plus')) {
								return 'element-plus';
							} else {
								return 'vender'; //其他第三方库打包为一个 vender.js文件
							}
						}
					},

					experimentalMinChunkSize: 20 * 1024, //最小chunk大小，低于则合并chunk文件
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
		//css 预处理
		//引入less变量
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true, //支持less的js功能
					additionalData: `@import '@/styles/variable.less';`,
				},
			},
		},
	};
});
