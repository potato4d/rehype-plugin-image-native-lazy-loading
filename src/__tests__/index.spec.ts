import fs from 'fs'
import lazyLoadPlugin from '../'
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'

async function process(rawMarkdown: string) {
  return new Promise((resolve, reject) => {
    unified()
    .use(markdown)
    .use(remark2rehype)
    .use(lazyLoadPlugin)
    .use(html)
    .process(rawMarkdown, (err, file) => {
      if (err) {
        return reject(err)
      }
      return resolve(file.toString())
    })
  })
}

describe('index.ts', () => {
  test('変換後の <img> タグに対して loading="lazy" 属性が正しく付与されているか', () => {
    const content = fs.readFileSync(`${__dirname}/fixtures/content.md`, { encoding: 'utf-8' })
    const correct = fs.readFileSync(`${__dirname}/fixtures/correct.html`, { encoding: 'utf-8' })
    return process(content).then((result) => {
      expect(result + '\n').toBe(correct)
    })
  })
})
