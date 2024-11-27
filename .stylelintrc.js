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
