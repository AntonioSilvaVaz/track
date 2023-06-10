module.exports = {
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint', 'react-hooks'],
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'rules': {
    'quotes': ['error', 'single'] // you can remove if you want
    // Add your custom rules here
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
}