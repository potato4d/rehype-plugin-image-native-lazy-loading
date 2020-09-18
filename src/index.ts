import { Processor, Transformer } from 'unified'
import { Node } from 'unist'
import visit from 'unist-util-visit'
import hast from 'hast'

function lazyloadPlugin(this: Processor): Transformer {
  function visitor(el: hast.Element) {
    if (el.tagName !== 'img') {
      return
    }
    el.properties = {
      ...(el.properties || {}),
      loading: 'lazy'
    }
  }

  function transformer(htmlAST: Node): Node {
    visit<hast.Element>(htmlAST, 'element', visitor)
    return htmlAST
  }

  return transformer
}

export default lazyloadPlugin
module.exports = lazyloadPlugin
