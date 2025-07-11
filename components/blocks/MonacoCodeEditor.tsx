import debounce from 'lodash/debounce';
import { useEffect, useRef, useState } from 'react';
import { wrapFieldsWithMeta } from 'tinacms';

const MonacoCodeEditor = wrapFieldsWithMeta(({ field, input, meta }) => {
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
  }, [localValue, updateTinaValue]);

  useEffect(() => {
    if (monacoInstance.current && input.value !== localValue) {
      monacoInstance.current.setValue(input.value || '');
      setLocalValue(input.value || '');
    }
  }, [input.value, localValue]);

  return (
    <div>
      <div ref={editorRef} style={{ height: '400px', width: '100%' }} />
    </div>
  );
});

export default MonacoCodeEditor;
