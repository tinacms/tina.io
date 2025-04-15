'use client';

import React from 'react'
import GitHubButton from 'react-github-btn'
import '../../styles/tailwind.css'

// TODO: Remove after the 18th of April if we choose not to revert the changes
export function CloudBanner() {
  return (
    <div
      className="
        relative z-10 w-full flex flex-col items-center justify-center 
        py-3 px-4 text-base leading-[1.2] 
        bg-[linear-gradient(90deg,white,#f2fdfc_33.3%,#e6faf8_100%)] 
        shadow-[0_0_8px_2px_rgba(0,0,0,0.03)] 
        border-b border-[#d1faf6] 
        text-[var(--color-tina-blue)]
        lg:flex-row lg:pl-8 lg:pr-10
      "
    >
      <div
        className="
          flex items-center mt-[0.3rem] mb-2 
          lg:mb-0
        "
      >
        <span className="pr-2 text-[#2296FE]">
          Loving Tina? ⭐️ us on{' '}
          <a
            href="https://github.com/tinacms/tinacms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            GitHub
          </a>
        </span>        
        <GitHubButton
          href="https://github.com/tinacms/tinacms"
          data-size="medium"
          data-show-count="true"
          aria-label="Star TinaCMS on GitHub"
        >
          Star
        </GitHubButton>
      </div>
    </div>
  )
}
