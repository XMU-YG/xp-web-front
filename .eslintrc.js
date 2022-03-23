module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: ['off', 2],
    'prettier/prettier': 'error',
    quotes: [2, 'single'],
    semi: [2, 'never'],
    'no-unused-vars': [1, { vars: 'all', args: 'after-used' }],
    'no-const-assign': 2, //禁止修改const声明的变量
    'no-catch-shadow': 2, //禁止catch子句参数与外部作用域变量同名
    'no-class-assign': 2, //禁止给类赋值
    'no-cond-assign': 2, //禁止在条件表达式中使用赋值语句
    'no-dupe-keys': 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-args': 2, //函数参数不能重复
    'no-duplicate-case': 2, //switch中的case标签不能重复
    'no-empty': 2, //块语句中的内容不能为空
    'no-implicit-coercion': 1 //禁止隐式转换
  }
}
