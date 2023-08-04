import React from 'react'
import { Highlight, themes, Prism as rootPrism } from 'prism-react-renderer'

//import 'prismjs/components/prism-bash'
;(typeof global !== 'undefined' ? global : window).Prism = rootPrism
require('prismjs/components/prism-bash')
require('prismjs/components/prism-diff')
require('prismjs/components/prism-css')
require('prismjs/components/prism-json')

export const Prism = (props: {
  value: string
  lang?: string
  theme?: keyof typeof themes
}) => {
  return (
    <Highlight
      theme={themes[props.theme || 'github']}
      code={props.value}
      language={props.lang || ''}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
