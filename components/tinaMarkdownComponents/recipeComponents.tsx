import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prism-themes/themes/prism-night-owl.css'; 
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'; 
import 'prismjs/plugins/line-numbers/prism-line-numbers'; 
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';
import 'prismjs/plugins/line-highlight/prism-line-highlight'; 

export const codeBlockComponents = {
  code_block: ({ value, lang, children, highlightLines }) => {
    useEffect(() => {
      
      Prism.highlightAll();
    }, []);

    

    return (
      <pre className="line-numbers" data-line={highlightLines || ''}> 
        <code className={`language-${lang || 'jsx'}`}>
          {children || value || ''}
        </code>
      </pre>
    );
  },
};
