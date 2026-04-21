// biome-ignore lint/correctness/noUnusedImports: Required for JSX in TinaCMS admin
import React from 'react';

export const WarningBanner =
  ({ message }: { message: string }): React.FC<any> =>
  () => (
    <div className='relative w-full px-2 mb-5 last:mb-0'>
      <div className='flex items-start gap-2 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm'>
        <span className='text-yellow-600 text-base leading-none'>⚠️</span>
        <p className='text-gray-700 whitespace-normal break-words'>
          {message}
        </p>
      </div>
    </div>
  );
