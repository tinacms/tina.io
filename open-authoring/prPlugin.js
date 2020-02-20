import React from 'react'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import { Button as TinaButton } from '@tinacms/styles'
import { Input, TextArea } from '@tinacms/fields'
import { ModalBody, ModalActions, FieldMeta } from 'tinacms'
import GitIconSvg from '../public/svg/git-icon.svg'

const { createPR, fetchExistingPR } = require('./github/api/index')
const baseBranch = process.env.BASE_BRANCH

export class PRPlugin {
  constructor(baseRepoFullName, forkRepoFullName, accessToken) {
    this.__type = 'screen'
    this.name = 'Create Pull Request'
    this.Icon = GitIconSvg
    this.layout = 'popup'
    this.state = {
      responseMessage: '',
      fetchedPR: null,
    }

    const getHeadBranch = () => {
      return Cookies.get('head_branch') || 'master'
    }

    this.titleInput = React.createRef()
    this.bodyInput = React.createRef()

    this.checkForPR = () => {
      fetchExistingPR(
        baseRepoFullName,
        forkRepoFullName,
        getHeadBranch(),
        accessToken
      ).then(pull => {
        if (pull) {
          this.state.fetchedPR = pull
          this.name = 'Existing Pull Request'
        } else {
          this.state.fetchedPR = { id: null }
        }
      })
    }

    this.checkForPR()

    this.createPR = () => {
      createPR(
        baseRepoFullName,
        forkRepoFullName,
        getHeadBranch(),
        accessToken,
        this.titleInput.current.value,
        this.bodyInput.current.value
      )
        .then(response => {
          alert(`you made a PR!: ${response.data.html_url}`)
          this.checkForPR()
        })
        .catch(err => {
          alert(
            `PR failed (Has a PR already been created?): ${JSON.stringify(err)}`
          )
        })
    }

    this.Component = () => {
      return (
        <>
          <ModalBody padded>
            {!this.state.fetchedPR.id && (
              <>
                <ModalDescription>
                  Create a pull request from{' '}
                  <b>
                    {forkRepoFullName} - {getHeadBranch()}
                  </b>{' '}
                  into{' '}
                  <b>
                    {baseRepoFullName} - {baseBranch}
                  </b>
                  .{' '}
                  <a
                    target="_blank"
                    href={`https://github.com/${baseRepoFullName}/compare/${baseBranch}...${
                      forkRepoFullName.split('/')[0]
                    }:${getHeadBranch()}`}
                  >
                    View changes on GitHub
                  </a>
                  .
                </ModalDescription>
                <FieldMeta label="PR Title">
                  <Input type="text" ref={this.titleInput} />
                </FieldMeta>
                <FieldMeta label="PR Description">
                  <TextArea type="textarea" ref={this.bodyInput} />
                </FieldMeta>
                <div>{this.state.responseMessage}</div>
              </>
            )}
            {this.state.fetchedPR.id && (
              <div>
                <a
                  target="_blank"
                  href={`https://github.com/${baseRepoFullName}/compare/${baseBranch}...${
                    forkRepoFullName.split('/')[0]
                  }:${getHeadBranch()}`}
                >
                  See Changes
                </a>
                <p>A Pull request already exists.</p>
              </div>
            )}
            {!this.state.fetchedPR && <div>Loading...</div>}
          </ModalBody>
          <ModalActions>
            <TinaButton onClick={() => {}}>Cancel</TinaButton>
            <TinaButton primary onClick={this.createPR}>
              Create Pull Request
            </TinaButton>
          </ModalActions>
        </>
      )
    }
  }

  handleTitleInputChange(event) {
    this.state.userSetPRTitle = event.target.value
  }

  handleBodyInputChange(event) {
    this.state.userSetPRBody = event.target.value
  }
}

const ModalDescription = styled.p`
  margin-bottom: 1rem;

  b {
    font-weight: bold;
  }
`
