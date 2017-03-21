# babel-preset-es2015-node5

> Babel preset to make node@5 fully ES2015 compatible.

[![](https://img.shields.io/npm/v/babel-preset-es2015-node5.svg)](https://npmjs.org/package/babel-preset-es2015-node5)
[![](https://img.shields.io/travis/alekseykulikov/babel-preset-es2015-node5.svg)](https://travis-ci.org/alekseykulikov/babel-preset-es2015-node5)
[![](http://img.shields.io/npm/dm/babel-preset-es2015-node5.svg)](https://npmjs.org/package/babel-preset-es2015-node5)

Node@5 has great [ES2015 support](https://nodejs.org/en/docs/es6/),
this module just adds missing features:
- destructuring assignment ([transform-es2015-destructuring](http://babeljs.io/docs/plugins/transform-es2015-destructuring/))
- rest & default parameters ([transform-es2015-parameters](http://babeljs.io/docs/plugins/transform-es2015-parameters/))
- modules ([transform-es2015-modules-commonjs](http://babeljs.io/docs/plugins/transform-es2015-modules-commonjs/))
- unicode & sticky regular expressions ([transform-es2015-sticky-regex](http://babeljs.io/docs/plugins/transform-es2015-sticky-regex/) & [transform-es2015-unicode-regex](http://babeljs.io/docs/plugins/transform-es2015-unicode-regex/))
- better function name support ([transform-es2015-function-name](http://babeljs.io/docs/plugins/transform-es2015-function-name/))
- fix reserved words in shorthand properties [transform-es2015-shorthand-properties](https://github.com/alekseykulikov/babel-preset-es2015-node5/issues/10)

## Install

    npm install --save-dev babel-preset-es2015-node5

## Usage

Read ["Configuring Babel 6" article](http://www.2ality.com/2015/11/configuring-babel6.html)
for more information about babel@6 configuration.

### Via `.babelrc` (recommended)

**.babelrc**

```json
{
  "presets": ["es2015-node5"]
}
```

### Via CLI

    babel script.js --presets es2015-node5

### Via Node API

```js
require('babel-core').transform('code', {
  presets: ['es2015-node5'],
})
```

## License

[MIT](./LICENSE)
