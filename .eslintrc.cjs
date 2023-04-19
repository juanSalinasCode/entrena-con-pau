module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'standard',
		'prettier',
		'plugin:prettier/recommended',
		'plugin:react/recommended',
	],
	globals: {
		MouseEvent: 'readonly',
	},
	plugins: ['prettier', 'react'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	overrides: [
		{
			files: ['*.js'],
			rules: {
				'prettier/prettier': 'error',
				'*': 'off',
			},
		},
	],
	rules: {},
};
