// biome-ignore lint/correctness/noUnusedImports: Required for JSX in TinaCMS admin
import React from 'react';

export const DocsEditLinks = () => (
  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm m-auto mb-4">
    <p className="mb-2 font-semibold text-gray-700 text-wrap wrap-break-word">
      ℹ️ TinaDocs website visual editing needs to be done via the below URLs:
    </p>
    <ul className="flex flex-col gap-1">
      <li>
        <a
          href="https://tina-docs-landing.vercel.app/tinadocs/admin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          TinaDocs Landing
        </a>
      </li>
      <li>
        <a
          href="https://tina-docs-red.vercel.app/tinadocs/admin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          TinaDocs Documentation
        </a>
      </li>
    </ul>
  </div>
);
