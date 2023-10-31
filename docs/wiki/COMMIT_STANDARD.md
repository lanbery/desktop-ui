# Git Commit Standard

## Standard

> git commit -am 'feat: xxx'

| 类型     | 描述                                                   |
| -------- | ------------------------------------------------------ |
| build    | 编译相关的修改，例如发布版本、对项目构建或者依赖的改动 |
| chore    | 其他修改, 比如改变构建流程、或者增加依赖库、工具等     |
| ci       | 持续集成修改                                           |
| docs     | 文档修改                                               |
| feat     | 新特性、新功能                                         |
| fix      | 修改 bug                                               |
| perf     | 优化相关，比如提升性能、体验                           |
| refactor | 代码重构                                               |
| revert   | 回滚到上一个版本                                       |
| style    | 代码格式修改, 注意不是 css 修改                        |
| test     | 测试用例修改                                           |

# 集成步骤

## Eslint

```bash
#
touch .editorconfig

# eslint config file
touch .eslintrc.cjs

# add script to package.json
# "lint": "eslint .","lint:fix": "eslint . --fix"

touch .vscode/settings
# 集成 husky 和 lint-staged
pnpm add -D husky lint-staged

# 初始化pre-commit
pnpm run prepare
npx husky add .husky/pre-commit "npx lint-staged"

# 提交规范
pnpm add -D commitlint @commitlint/config-conventional cz-git czg

npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

### editorconfig

```editorconfig
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

### .eslintrc.cjs

```js
{
  "extends": "@antfu"
}
```

### VScode settings

```json
{
  "prettier.enable": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  /* i18n ally */
  "i18n-ally.localesPaths": "src/locales",
  "i18n-ally.sourceLanguage": "zh", // 根据此语言文件翻译其他语言文件的变量和内容
  "i18n-ally.keystyle": "nested",
  "i18n-ally.preferredDelimiter": "_",
  "i18n-ally.sortKeys": true,
  "i18n-ally.extract.keygenStrategy": "random",
  "i18n-ally.extract.keygenStyle": "PascalCase",
  "i18n-ally.enabledParsers": ["json", "js", "ts"],
  "i18n-ally.keysInUse": [],
  "i18n-ally.theme.annotationMissing": "red",
  "i18n-ally.theme.annotationMissingBorder": "red",
  "i18n-ally.theme.annotation": "#6495ED",
  "i18n-ally.theme.annotationBorder": "#6495ED",
  "i18n-ally.annotationMaxLength": 40,
  "i18n-ally.autoDetection": true,
  "cSpell.words": ["actived", "navitem", "navs", "WGTS"]
}
```

### 集成 husky 和 lint-staged

为了简化在项目提交前执行代码规范命令以及遗忘执行，保证代码格式的统一规范，我们需要在 git commit 是增加 git hook,在提交之前自动进行代码格式的校验与修复。

husky —— Git Hook 工具，可以设置在 git 各个阶段（pre-commit、commit-msg、pre-push 等）触发我们的命令
lint-staged —— 在 git 暂存的文件上运行 linters。

> package.json 增加

```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}": ["eslint --fix"]
  }
}
```

## 配置提交规范

> pnpm add -D commitlint @commitlint/config-conventional cz-git czg

> package.json

> npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'

```json
  "scripts": {
    "commit": "czg"
  }
```

```js
// @see: https://cz-git.qbenben.com/zh/guide
/** @type {import('cz-git').UserConfig} */

module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
        'release'
      ]
    ]
  },
  prompt: {
    messages: {
      // type: "Select the type of change that you're committing: ",
      // scope: 'Denote the SCOPE of this change (optional):',
      // customScope: 'Denote the SCOPE of this change:',
      // subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
      // body: 'Provide a LONGER description of the change (optional). Use ' | ' to break new line:\n',
      // breaking: 'List any BREAKING CHANGES (optional). Use ' | ' to break new line:\n',
      // footerPrefixsSelect: 'Select the ISSUES type of changeList by this change (optional):',
      // customFooterPrefixs: 'Input ISSUES prefix:',
      // footer: 'List any ISSUES by this change. E.g.: #31, #34:\n',
      // confirmCommit: 'Are you sure you want to proceed with the commit above?'

      // 中文版
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 ' | ' 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 ' | ' 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀（可选）:',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      {
        value: 'feat',
        name: 'feat:        A new feature',
        emoji: ' '
      },
      {
        value: 'fix',
        name: 'fix:         A bug fix',
        emoji: ' '
      },
      {
        value: 'docs',
        name: 'docs:        Documentation only changes',
        emoji: ' '
      },
      {
        value: 'style',
        name: 'style:       Changes that do not affect the meaning of the code',
        emoji: ' '
      },
      {
        value: 'refactor',
        name: 'refactor: ♻️   A code change that neither fixes a bug nor adds a feature',
        emoji: '♻️'
      },
      {
        value: 'perf',
        name: 'perf:     ⚡️  A code change that improves performance',
        emoji: '⚡️'
      },
      {
        value: 'test',
        name: 'test:     ✅  Adding missing tests or correcting existing tests',
        emoji: '✅'
      },
      {
        value: 'build',
        name: 'build:     ️   Changes that affect the build system or external dependencies',
        emoji: ' ️'
      },
      {
        value: 'ci',
        name: 'ci:          Changes to our CI configuration files and scripts',
        emoji: ' '
      },
      {
        value: 'chore',
        name: "chore:       Other changes that don't modify src or test files",
        emoji: ' '
      },
      {
        value: 'revert',
        name: 'revert:   ⏪️  Reverts a previous commit',
        emoji: '⏪️'
      }
      // 中文版
      // { value: '特性', name: '特性:      新增功能', emoji: ' ' },
      // { value: '修复', name: '修复:      修复缺陷', emoji: ' ' },
      // { value: '文档', name: '文档:      文档变更', emoji: ' ' },
      // { value: '格式', name: '格式:      代码格式（不影响功能，例如空格、分号等格式修正）', emoji: ' ' },
      // { value: '重构', name: '重构:   ♻️  代码重构（不包括 bug 修复、功能新增）', emoji: '♻️' },
      // { value: '性能', name: '性能:   ⚡️  性能优化', emoji: '⚡️' },
      // { value: '测试', name: '测试:   ✅  添加疏漏测试或已有测试改动', emoji: '✅' },
      // { value: '构建', name: '构建:    ️  构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）', emoji: ' ️' },
      // { value: '集成', name: '集成:      修改 CI 配置、脚本', emoji: ' ' },
      // { value: '回退', name: '回退:   ⏪️  回滚 commit', emoji: '⏪️' },
      // { value: '其他', name: '其他:      对构建过程或辅助工具和库的更改（不影响源文件、测试用例）', emoji: ' ' }
    ],
    useEmoji: true,
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixs: [
      { value: 'closed', name: 'closed:   ISSUES has been processed' }
    ],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: 'skip',
    customIssuePrefixsAlias: 'custom',
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: ''
  }
}
```
