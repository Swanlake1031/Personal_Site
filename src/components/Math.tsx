import 'katex/dist/katex.min.css'
import katex from 'katex'
import React from 'react'

export function Math({ tex, display=false }: { tex: string; display?: boolean }) {
  const html = katex.renderToString(tex, { displayMode: display, throwOnError: false })
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}


