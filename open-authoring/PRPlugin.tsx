import React from 'react'
import GitIconSvg from '../public/svg/git-icon.svg'
import { PRModal } from './PRModal'
import { ScreenPlugin } from 'tinacms'

export class PRPlugin implements ScreenPlugin {
  __type: any
  name: any
  Component: any
  Icon: any
  layout: any

  constructor(baseRepoFullName, forkRepoFullName) {
    this.__type = 'screen'
    this.name = 'Pull Requests'
    this.Icon = GitIconSvg
    this.layout = 'popup'
    this.Component = () => {
      return (
        <PRModal
          baseRepoFullName={baseRepoFullName}
          forkRepoFullName={forkRepoFullName}
        />
      )
    }
  }
}
