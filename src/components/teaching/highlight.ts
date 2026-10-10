// Realce de sintaxe mínimo para os exemplos de Java e PHP (sem dependências)
export type Lang = 'java' | 'php'

const KEYWORDS: Record<Lang, Set<string>> = {
  java: new Set([
    'abstract', 'class', 'double', 'else', 'extends', 'final', 'for', 'if', 'implements', 'import', 'int',
    'interface', 'new', 'private', 'protected', 'public', 'return', 'static', 'super', 'this', 'throw', 'void',
    'boolean', 'true', 'false', 'null',
  ]),
  php: new Set([
    'abstract', 'array', 'as', 'bool', 'class', 'echo', 'else', 'extends', 'float', 'foreach', 'function', 'if',
    'implements', 'int', 'interface', 'new', 'parent', 'private', 'protected', 'public', 'return', 'self',
    'static', 'string', 'throw', 'void', 'true', 'false', 'null',
  ]),
}

const TOKEN =
  /(<\?php)|(\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(\$[A-Za-z_]\w*)|(@[A-Za-z_]\w*)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)/g

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const wrap = (cls: string, s: string) => `<span class="${cls}">${escape(s)}</span>`

export function highlight(code: string, lang: Lang) {
  let html = ''
  let last = 0
  for (const m of code.matchAll(TOKEN)) {
    const index = m.index ?? 0
    html += escape(code.slice(last, index))
    const [text, tag, comment, str, variable, annotation, num, word] = m
    if (tag) html += wrap('tok-tag', text)
    else if (comment) html += wrap('tok-comment', text)
    else if (str) html += wrap('tok-string', text)
    else if (variable) html += wrap('tok-var', text)
    else if (annotation) html += wrap('tok-annotation', text)
    else if (num) html += wrap('tok-number', text)
    else if (word) {
      const next = code[index + text.length]
      if (KEYWORDS[lang].has(word)) html += wrap('tok-keyword', text)
      else if (next === '(') html += wrap('tok-fn', text)
      else if (/^[A-Z]/.test(word)) html += wrap('tok-type', text)
      else html += escape(text)
    }
    last = index + text.length
  }
  return html + escape(code.slice(last))
}
