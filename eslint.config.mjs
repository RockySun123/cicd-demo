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
	{
		//新版的eslint 不再支持 .eslintignore,忽略文件在这里配置
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
			'.commitlintrc.js',
			'eslint.config.mjs',
		],
	},
];
