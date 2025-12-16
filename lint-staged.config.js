export default {
  '*.{js,ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
  '*.{css,scss,html,md,json}': ['prettier --write'],
  '*.{css,scss,vue}': ['stylelint --fix']
}
