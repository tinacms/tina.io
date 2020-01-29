import React from 'react'
import App from 'next/app'
import { withTina } from 'tinacms'
import { GitClient } from '@tinacms/git-client'

export default withTina(App, {
  cms: {
    apis: {
      git: new GitClient('http://localhost:3000/___tina'),
    },
  },
  sidebar: {
    hidden: process.env.NODE_ENV === 'production',
  },
})
