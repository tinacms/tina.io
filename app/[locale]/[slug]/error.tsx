'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('错误详情:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      digest: error.digest,
      ...Object.fromEntries(
        Object.entries(error).filter(
          ([key]) => !['message', 'name', 'stack', 'digest'].includes(key)
        )
      ),
    });
  }, [error]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>页面加载出错</h2>
      <p>错误信息: {error.message}</p>
      <button onClick={reset}>重试</button>
    </div>
  );
}
