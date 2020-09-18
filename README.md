# rehype-plugin-image-native-lazy-loading

![build](https://github.com/potato4d/rehype-plugin-image-native-lazy-loading/workflows/build/badge.svg) [![codecov](https://codecov.io/gh/potato4d/rehype-plugin-image-native-lazy-loading/branch/master/graph/badge.svg)](https://codecov.io/gh/potato4d/rehype-plugin-image-native-lazy-loading) ![Version](https://img.shields.io/npm/v/rehype-plugin-image-native-lazy-loading.svg?sanitize=true)

Native lazy loading plugin for Rehype.

## Installation

```bash
$ yarn add rehype-plugin-image-native-lazy-loading # or npm install
```

## Usage

### General Use

1. Add `loading="lazy"` to your markdown document

```javascript
import fs from 'fs'
import lazyLoadPlugin from 'rehype-plugin-image-native-lazy-loading'
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'

async function process(markdown: string) {
  return new Promise((resolve, reject) => {
    unified()
    .use(markdown)
    .use(remark2rehype)
    .use(lazyLoadPlugin)
    .use(html)
    .process(markdown, (err, file) => {
      if (err) {
        return reject(err)
      }
      return resolve(file.toString())
    })
  })
}

async function run() {
  const input = `# test
![potato4d](https://github.com/potato4d.png)`
  const output = await process(input)
  console.log(output) // `<h1>test</h1>\n<img alt="potato4d" loading="lazy" src="https://github.com/potato4d.png">`
}
```

2. Add `loading="lazy"` to your HTML document

```javascript

import fs from 'fs'
import lazyLoadPlugin from 'rehype-plugin-image-native-lazy-loading'
import unified from 'unified'
import parse from 'rehype-parse'
import slug from 'rehype-slug'
import stringify from 'rehype-stringify'

async function process(html: string) {
  return new Promise((resolve, reject) => {
    unified()
    .use(parse)
    .use(slug)
    .use(lazyLoadPlugin)
    .use(stringify)
    .process(html, (err, file) => {
      if (err) {
        return reject(err)
      }
      return resolve(file.toString())
    })
  })
}

async function run() {
  const input = `<h1>test</h1>\n<img alt="potato4d" src="https://github.com/potato4d.png">`
  const output = await process(input)
  console.log(output) // `<h1>test</h1>\n<img alt="potato4d" loading="lazy" src="https://github.com/potato4d.png">`

```

### Used with the Framework

#### `@nuxt/content`

in your nuxt.config.js

```javascript
export default {
  // ...
  content: {
    markdown: {
      rehypePlugins: [
        'rehype-plugin-image-native-lazy-loading'
      ]
    }
  },
  // ...
}
```

For more information, see [official document](https://content.nuxtjs.org/configuration#markdownrehypeplugins).

## Support browsers

- 19 Sep. 2020

[![Image from Gyazo](https://i.gyazo.com/ccc6d6f57f0e9599a5b1355a8f1f1e39.png)](https://gyazo.com/ccc6d6f57f0e9599a5b1355a8f1f1e39)

## LICENCE

MIT
