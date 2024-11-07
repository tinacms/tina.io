import { wrapFieldsWithMeta } from 'tinacms';
import React, { useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';

export const RecipeBlock = {
  name: 'recipeBlock',
  label: 'Recipe Block',
  fields: [
    {
      name: 'title',
      label: 'Heading Title',
      type: 'string',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'string',
    },
    {
      type: 'string',
      name: 'code',
      label: 'Code',
      ui: {
        component: wrapFieldsWithMeta(({ field, input, meta }) => {
          const editorRef = useRef<HTMLDivElement | null>(null);
          const monacoInstance = useRef(null);
          const [localValue, setLocalValue] = useState(input.value || '');

         
          const updateTinaValue = debounce((value) => {
            input.onChange(value);
          }, 300);

          useEffect(() => {
            const loadMonaco = async () => {
              const monaco = await import('monaco-editor');
              if (editorRef.current && !monacoInstance.current) {
                monacoInstance.current = monaco.editor.create(editorRef.current, {
                  value: localValue,
                  language: 'javascript', 
                  theme: 'vs-dark',
                  automaticLayout: true,
                });

                monacoInstance.current.onDidChangeModelContent(() => {
                  const value = monacoInstance.current?.getValue() || '';
                  setLocalValue(value);  
                  updateTinaValue(value);
                });
              }
            };

            if (typeof window !== 'undefined') {
              loadMonaco();
            }

            return () => {
              monacoInstance.current?.dispose();
            };
          }, []);

          useEffect(() => {
            // Sync editor with TinaCMS when the TinaCMS value changes (e.g., on load)
            if (monacoInstance.current && input.value !== localValue) {
              monacoInstance.current.setValue(input.value || '');
              setLocalValue(input.value || '');
            }
          }, [input.value]);

          return (
            <div>
              <div ref={editorRef} style={{ height: '400px', width: '100%' }} />
              {meta.dirty && <p>Unsaved changes</p>}
            </div>
          );
        }),
      },
    },
    {
      name: 'instruction',
      label: 'Instruction',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.header };
        },
      },
      fields: [
        {
          name: 'header',
          label: 'Header',
          type: 'string',
        },
        {
          name: 'itemDescription',
          label: 'Item Description',
          type: 'string',
        },
        {
          name: 'codeLineStart',
          label: 'Code Line Start',
          type: 'number',
          description: 'Enter negative values to highlight from 0 to your end number',
        },
        {
          name: 'codeLineEnd',
          label: 'Code Line End',
          type: 'number',
          description: 'Highlighting will not work if end number is greater than start number',
        },
      ],
    },
  ],
};
