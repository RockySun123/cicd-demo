# 0-1 搭建项目笔记

**pinia-plugin-persistedstate** -- 状态处理持久化，前端store数据可以存放在localStorage中

**eslint 依赖**

```sh
pnpm install -D eslint @eslint/create-config
```

根据依赖，生成eslint

```sh
npx eslint --init
```

package.json中,校验命令

```json
--cache 值检测改动过的代码
--max-warnings 0  最大告警数 0，超过0个警告，强制eslint 以错误状态推出

{
    "scripts":{
        "lint:eslint": "eslint --cache --max-warnings 0 {src,mock}/**/*.{vue,ts,tsx} --fix",
    }
}
```

**代码保存自动修复eslint 问题**
vscode
-- 设置
-- 命令面板
-- 输入 setting.json
-- 选择工作区的 Preferences: Open Workspace Settings (JSON)

会在代码根目录创建 .vscode 文件夹
文件夹内的settings.json 中添加内容：

```json
{
	"editor.codeActionsOnSave": {
		"source.fixAll.ts": true,
		"source.fixAll.eslint": true
	}
}
```

**安装 prettier 依赖**

```sh
pnpm install -D prettier
```

根目录创建 .prettier.js

```javascript
module.exports = {
	printWidth: 120, //单行长度
	tabWidth: 4, //tab键占用4个空格
	useTabs: true, // 使用空格代替tab缩进
	semi: true, //句末使用分号
	singleQuote: true, //使用单引号
	endOfLine: 'auto',
	tarilingComma: 'none', //对象最后一个属性末尾是否要逗号
};
```

package.json 添加 prettier 命令

```json
{
	"scripts": {
		"lint:prettier": "prettier --write **/*.{js,json,tsx,css,less,vue,html,md}"
	}
}
```

lint:eslint 和 lint:prettier 两个命令有冲突，需要配置
安装 eslint-config-prettier eslint-plugin-prettier 两个依赖

- eslint-config-prettier -- 关闭eslint中与eslint 相互冲突的规则
- eslint-plugin-prettier -- 赋予eslint 用prettier 格式化代码的能力

```sh
pnpm install -D eslint-config-prettier eslint-plugin-prettier
```

eslint.config.mjs 配置

```javascript
import globals from 'globals';
import jsConfig from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	{
		files: ['**/*.{js,mjs,cjs,ts,vue}'],
		languageOptions: {
			globals: globals.browser, // 使用浏览器环境的全局变量
			parser: tsParser, // 使用 TypeScript 解析器
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin, // 注册 TypeScript 插件
			vue: vuePlugin, // 注册 Vue 插件
			prettier: prettierPlugin, //prettier插件
		},
		rules: {
			// 启用 Prettier 检查作为 ESLint 规则
			'prettier/prettier': 'error',

			// 关闭与 Prettier 冲突的 ESLint 规则
			...prettierConfig.rules,

			// 通用规则
			'@typescript-eslint/no-unused-vars': 'off',
			indent: ['error', 4, { SwitchCase: 1 }],
			'no-debugger': 'off',
			semi: 'off',

			// TypeScript 特定规则
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-this-alias': 'off',

			// Vue 特定规则
			'vue/multi-word-component-names': [
				'error',
				{
					ignores: ['index', 'Header'], // 忽略的组件名
				},
			],
			'vue/no-unused-vars': 'off',
			'vue/no-template-shadow': 'off',
			'vue/require-v-for-key': 'off',
			'vue/no-textarea-mustache': 'off',
			'vue/no-v-html': 'off',
		},
	},
	// Vue 单文件组件的特定配置
	{
		files: ['**/*.vue'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				parser: tsParser, // 针对 <script setup lang="ts"> 使用 TypeScript 解析器
			},
		},
	},
	// JS 推荐配置扩展
	jsConfig.configs.recommended,
	//新版的eslint 不再支持 .eslintignore,忽略文件在这里配置
	{
		ignores: [
			'node_modules',
			'*.md',
			'.vscode',
			'.idea',
			'dist',
			'/public',
			'/docs',
			'.husky',
			'.local',
			'/bin',
			'Dockerfile',
		],
	},
];
```

**样式的格式化美化**
stylelint-config-standard

```sh
pnpm install -D stylelint stylelint-config-standard

pnpm install -D stylelint-config-prettier stylelint-config-html stylelint-order stylelint-less postcss-html postcss-less stylelint-config-standard-vue

```

vue项目推荐的配置

- stylelint-config-prettier -- 关闭 prettier 冲突的配置
- stylelint-config-html -- 支持检查html
- stylelint-order --支持样式的排序
- stylelint-less -- 检查less文件
- postcss-html
- postcss-less
- stylelint-config-standard-vue

.stylelintrc.js

```javascript
module.exports = {
	// 指定文件匹配范围
	overrides: [
		{
			files: ['**/*.{css,scss,less,vue,html}'], // 处理的文件类型
			customSyntax: 'postcss-html', // 用于解析 HTML 和 Vue 文件的样式块
		},
	],
	extends: [
		'stylelint-config-standard-vue', // Vue 推荐配置
		'stylelint-config-html', // HTML 支持
		'stylelint-config-prettier', // 关闭与 Prettier 冲突的规则
	],
	plugins: ['stylelint-order'], // 启用排序插件
	rules: {
		// 规则定义

		// 属性排序规则
		'order/properties-order': [
			[
				// 定义属性分组
				{
					groupName: 'positioning',
					properties: ['position', 'top', 'right', 'bottom', 'left', 'z-index'],
				},
				{
					groupName: 'box-model',
					properties: [
						'display',
						'flex',
						'flex-grow',
						'flex-shrink',
						'flex-basis',
						'width',
						'height',
						'margin',
						'padding',
						'border',
						'box-shadow',
					],
				},
				{
					groupName: 'typography',
					properties: ['font', 'font-size', 'font-weight', 'line-height', 'color', 'text-align'],
				},
			],
			{ unspecified: 'bottom' }, // 未指定的属性排在末尾
		],

		// 使用双引号
		'string-quotes': 'double',

		// 禁止无效的 0 单位
		'length-zero-no-unit': true,

		// 禁止空规则
		'block-no-empty': true,

		// 禁止颜色命名
		'color-named': 'never',

		// 使用16进制颜色的缩写
		'color-hex-length': 'short',

		// 禁止未知的自定义属性
		'property-no-unknown': [
			true,
			{
				ignoreProperties: ['/^my-/'], // 允许以 "my-" 开头的自定义属性
			},
		],

		// 使用 BEM 命名规范（示例规则，按需启用）
		'selector-class-pattern': '^[a-z0-9\\-]+(__[a-z0-9]+)?(--[a-z0-9]+)?$',

		// 禁止使用 ID 选择器
		'selector-max-id': 0,

		// 限制嵌套深度（建议 3 层）
		'max-nesting-depth': 3,

		// 禁止超过80字符的行长度（仅样式部分）
		'line-length': [80, { ignore: ['comments'] }],
	},
};
```

**配置 husky**

```sh
pnpm install -D husky
```

初始化 husky

```sh
npx husky init
```

安装依赖 lint-staged -- 在哪些阶段，校验代码

```sh
pnpm install -D lint-staged
```

package.json中

```json
{
	"scripts": {
		"lint:lint-staged": "lint-staged"
	},
	"lint-staged": {
		"*.{js,mjs,cjs,ts,vue}": ["eslint --fix", "prettier --write"],
		"*.{css,scss,less,vue,html,md}": ["stylelint --fix"],
		"{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write-parser json"],
		"package.json": ["prettier --write"],
		"*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
		"*.md": ["prettier --write"]
	}
}
```

指定 husky 钩子 pre-commit -- 在代码提交之前，执行 lint-staged 命令
.husky/pre-commit 手动添加

```sh
echo "检查代码..."
pnpm lint-staged
```

**配置代码提交规范**
两个依赖

- @commitlint/cli
- @commitlint/config-conventional

创建对应的文件 .commitlintrc.js

```javascript
module.exports = {
	extends: ['@commitlint/config-conventional'],
	'header-max-length': [2, 'always', 72], //提交信息的header (type+subject)最大长度
	'body-max-length': [2, 'always', 100], //限制提交消息正文（body）的最大长度。
	'subject-empty': [2, 'never'], //信息类型不能为空
	'type-empty': [2, 'never'], //提交信息的类型按照rules进行

	//   // 强制提交信息小写
	//   'subject-case': [2, 'always', 'lowerCase'],
	//   // 提交信息长度限制
	//   'header-max-length': [2, 'always', 72],
	//   // 强制提交信息正文部分以空行开始
	//   'body-leading-blank': [2, 'always'],
	//   // 强制提交信息尾部部分以空行开始
	//   'footer-leading-blank': [2, 'always'],
	//   // 强制指定作用域
	//   'scope-enum': [
	//     2,
	//     'always',
	//     ['ui', 'backend', 'auth', 'api']
	//   ],

	rules: {
		// 自定义规则，可以按需调整
		'type-enum': [
			2,
			'always',
			[
				'feat', // 新功能
				'fix', // 修复bug
				'docs', // 文档变更
				'style', // 样式代码格式（非功能性更改）
				'refactor', // 代码重构
				'perf', // 性能优化
				'test', // 增加测试
				'build', // 构建系统或外部依赖的更改
				'ci', // CI 配置
				'chore', // 杂务（不影响代码功能的更改）
				'revert', // 回滚
			],
		],
		'subject-case': [
			2,
			'never',
			['sentence-case', 'start-case', 'pascal-case', 'upper-case'], // 禁止特定格式
		],
	},
};
```

.husky/pre-commit
需要改为

```sh
echo "检查代码..."
npx commitlint --edit $1
pnpm lint-staged
```

### mock

安装依赖
mockjs vite-plugin-mock

```sh
pnpm install -D mockjs vite-plugin-mock
```

**配置 element-plus**
不要全部引入，要按需引入
需要安装unplugin-vue-components 和 unplugin-auto-import这两款插件

```sh
pnpm install -D unplugin-vue-components unplugin-auto-import
```

手动导入，开箱即用 tree-shaking
安装 unplugin-element-plus

```sh
pnpm install -D unplugin-element-plus
```

自动导入图标
unplugin-icons 和 unplugin-auto-import 从 iconify 中自动导入任何图标集

```sh
pnpm install -D unplugin-icons
```

# 打包优化

### vite 开发环境是 es6 打包，生产环境是 rollup 打包

**默认打包文件过多**
rollup 将每个模块文件都打包成一个单独的js文件，包括css文件，不会对chunk进行合并

**问题：导致加载时将过长，影响首屏加载**

- 同域名下，网络请求数量会有限制，比如一次批量6个请求，必须要请求资源释放才会进行新的请求，总体加载时间更长，
  其中过多的css文件，也会阻塞html的渲染
- 老版本vite 2.8之前，配合的rollup版本是3.5以下的，策略很简单，就是可以将第三方库打包为 vendor.js
  项目中的文件打包为一个单独的文件比如 bundle.js
    1. vendor.js，bundle.js 文件体积过大，影响首屏加载
    2. 有可能用户不会访问的模块，也会打包到 bundle.js 文件中，也影响首屏加载时间
    3. 更改某一个模块，bundle重新打包，会改变 bundle hansh值，影响用户缓存文件

```ts
//vite v2.8, 配置 build.rollupOptions.output.manualChunks 来自定义 chunk 分割策略
export default defineConfig({
	//...
	build: {
		output: {
			manualChunks(id) {
				if (id.includes('node_modules')) {
					return 'vendor';
				} else {
					return 'bundle';
				}
			},
		},
	},
	//...
});
```

**优化方案：**
监控分析vite 打包后的文件
rollup-plugin-visualizer

```sh
pnpm install -D rollup-plugin-visualizer
```

vite 配置

```ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
	//...
	build: {
		rollupOptions: {
			plugins: [visualizer({ open: true })],
			output: {
				//...
			},
		},
	},
	//...
});
```

**最终方案**
类似webpack 方案：

- webpack splitChunks.minSize 设置最小文件阈值，低于阈值的chunk文件则合并，否则打包为单独的文件

vite 中，rollup 3.3 版本以上，设置 output.experimentalMinChunkSize 最小chunk文件大小，低于阈值的chunk文件则合并

```ts
export default defineConfig({
	//...
	build: {
		rollupOptions: {
			experimentalLogSideEffects: true, //检查文件是否有副作用，发现副作用会打印到控制台
			output: {
				experimentalMinChunkSize: 20 * 1024, //最小chunk阈值 20kb
			},
		},
	},
	//...
});
```

**注意 vite 版本和 rollup 版本是否支持 experimentalMinChunkSize**
可以查看当前vite版本和rollup版本是否支持 experimentalMinChunkSize

- node_modules/vite/package.json 查看rollup 是否低于 3.3版本，低于则升级 vite 版本
- 只有文件没有改变入口加载时执行副作用才会合并，所以配合 experimentalLogSideEffects: true 检查

综上，vite 目前还是对 有副作用的模块，会单独打包成一个文件，无法合并

- 配合 rollup 的 treeshake配置，是否除屑优化（tree-shaking）,并微调优化过程
    - treeshake 预设默认为false，生成更大的bundle，但可能提高构建性能
    - 预设值也可以为 'smallest' | 'safest' | 'recommended'
      smallest: 尽可能小的bundle，但可能增加构建时间,尽可能减小代码提及，但可能会删除第三方代码
      safest: 最小的bundle，但可能增加构建时间
      recommended: 推荐，默认值

```ts
export default defineConfig({
	build: {
		rollupOptions: {
			treeshake: {
				preset: 'recommended',
			},
		},
	},
});
```

**对于不许要打包的文件**
比如 jQuery,lodash,moment 等，可以使用外链的形式打包，避免打包到 bundle.js 文件中

使用 rollup-plugin-external 插件

```sh
pnpm install -D rollup-plugin-external-globals
```

vite.config.ts

```ts
import externalGlobals from 'rollup-plugin-external-globals';

const globals = {
	jquery: 'jquery',
	lodash: 'lodash',
	moment: 'moment',
};

export default defineConfig({
	//...
	build: {
		//...
		rollupOptions: {
			external: ['jquery', 'lodash', 'moment'],
			plugins: [/*...,*/ globals],
		},
	},
	//...
});
```

html中，类似cdn形式引入

```html
<script src="http://cdn/xxxxx/jquery.min.js"></script>
<script src="http://cdn/xxxxx/lodash.min.js"></script>
<script src="http://cdn/xxxxx/moment.min.js"></script>
```

或者通过注入html插件 vite-plugin-html

```sh
pnpm install -D vite-plugin-html
```

```ts
import { createHtmlPlugin } from 'vite-plugin-html';
export default defineConfig({
	plugins: [
		createHtmlPlugin({
			inject: {
				//注入cdn 链接
				tags: [
					{
						tag: 'script',
						attrs: {
							src: 'https://code.jquery.com/jquery-3.7.1.min.js',
							deder: true,
						},
						injectTo: 'body',
					},
					{
						tag: 'script',
						attrs: {
							src: 'https://cdn.jsdelivr.net/npm/moment@2.30.1/moment.min.js',
							deder: true,
						},
						injectTo: 'body',
					},
					{
						tag: 'script',
						attrs: {
							src: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
							deder: true,
						},
						injectTo: 'body',
					},
				],
			},
		}),
	],
});
```

**代码压缩**
gzip 压缩 vite-plugin-compression
brotli 压缩 rollup-plugin-brotli

```sh
pnpm install -D vite-plugin-compression
```

或

```sh
pnpm install -D rollup-plugin-brotli
```

gzip配置

```ts
import ViteCompression from 'vite-plugin-compression';
export default defineConfig({
	plugins: [
		ViteCompression({
			threshold: 1024 * 20, //大于20kb的才会被压缩
			algorithm: 'gzip', //压缩算法
			ext: 'gz', //压缩文件后缀
		}),
	],
});
```

brotli 配置

```ts
import Brotli from 'rollup-plugin-brotli';
export default defineConfig({
	plugins: [
		Brotli({
			threshold: 1024 * 20, //大于20kb的才会被压缩
			quality: 5, //压缩等级
		}),
	],
});
```

**关于打包文件的hash值**
文件有变化，hash值会改变，文件没有变化，hash值不会改变
可以指定hash长度
比如

```ts
entryFileNames: 'static/js/entry-[hash:8].js',//入口文件名
```
