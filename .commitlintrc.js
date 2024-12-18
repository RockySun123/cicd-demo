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
		// 'subject-case': [
		// 	2,
		// 	'never',
		// 	['sentence-case', 'start-case', 'pascal-case', 'upper-case'], // 禁止特定格式
		// ],
	},
};
