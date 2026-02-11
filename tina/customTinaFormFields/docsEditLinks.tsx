// biome-ignore lint/correctness/noUnusedImports: Required for JSX in TinaCMS admin
import React from 'react';

export const DocsEditLinks = () => (
  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm">
    <p className="mb-2 font-semibold text-gray-700">
      Edit the TinaDocs zones with visual editing:
    </p>
    <ul className="flex flex-col gap-1">
      <li>
        <a
          href="https://tina-docs-landing.vercel.app/admin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Tina Docs Landing
        </a>
      </li>
      <li>
        <a
          href="https://tina-docs-red.vercel.app/admin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Tina Docs
        </a>
      </li>
    </ul>
  </div>
);
