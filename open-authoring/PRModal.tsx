import { Button as RawTinaButton } from '@tinacms/styles'
import { Input, TextArea } from '@tinacms/fields'
import { ModalBody, ModalActions, FieldMeta } from 'tinacms'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { fetchExistingPR, createPR as createGithubPR } from './github/api'
import { getHeadBranch } from './utils/cookieHelpers'

const BASE_BRANCH = process.env.BASE_BRANCH

interface Props {
  baseRepoFullName: string
  forkRepoFullName: string
}

export const PRModal = ({ forkRepoFullName, baseRepoFullName }: Props) => {
  const [responseMessage, setResponseMessage] = useState('')
  const [fetchedPR, setFetchedPR] = useState(undefined)

  const titleInput = React.createRef() as any
  const bodyInput = React.createRef() as any

  const checkForPR = () => {
    fetchExistingPR(baseRepoFullName, forkRepoFullName, getHeadBranch()).then(
      pull => {
        if (pull) {
          setFetchedPR(pull)
        } else {
          setFetchedPR({ id: null })
        }
      }
    )
  }

  const createPR = () => {
    createGithubPR(
      baseRepoFullName,
      forkRepoFullName,
      getHeadBranch(),
      titleInput.current.value,
      bodyInput.current.value
    )
      .then(response => {
        checkForPR() // TODO - can we use PR from response instead of refetching?
      })
      .catch(err => {
        setResponseMessage(
          `Pull Request failed, are you sure you have any changes?`
        )
      })
  }

  useEffect(() => {
    checkForPR()
  }, [])

  if (!fetchedPR) {
    return (
      <PrModalBody>
        <ModalDescription>
          <p>Loading...</p>
        </ModalDescription>
      </PrModalBody>
    )
  }

  return (
    <>
      <PrModalBody>
        {!fetchedPR.id && (
          <>
            <ModalDescription>
              Create a pull request from{' '}
              <b>
                {forkRepoFullName} - {getHeadBranch()}
              </b>{' '}
              into{' '}
              <b>
                {baseRepoFullName} - {BASE_BRANCH}
              </b>
              .{' '}
              <a
                target="_blank"
                href={`https://github.com/${baseRepoFullName}/compare/${BASE_BRANCH}...${
                  forkRepoFullName.split('/')[0]
                }:${getHeadBranch()}`}
              >
                View changes on GitHub
              </a>
              .
            </ModalDescription>
            <FieldMeta label="PR Title" name="title">
              <Input type="text" ref={titleInput} />
            </FieldMeta>
            <FieldMeta label="PR Description" name="description">
              <TextArea ref={bodyInput} />
            </FieldMeta>
            <div>{responseMessage}</div>
          </>
        )}
        {fetchedPR.id && (
          <ModalDescription>
            You've created a pull request from{' '}
            <b>
              {forkRepoFullName} - {getHeadBranch()}
            </b>{' '}
            into{' '}
            <b>
              {baseRepoFullName} - {BASE_BRANCH}
            </b>
            .
          </ModalDescription>
        )}
        {!fetchedPR && <div>Loading...</div>}
      </PrModalBody>
      <ModalActions>
        {!fetchedPR.id && (
          <TinaButton primary onClick={createPR}>
            Create Pull Request
          </TinaButton>
        )}
        {fetchedPR && fetchedPR.html_url && (
          <>
            <TinaButton
              as="a"
              href={`https://github.com/${baseRepoFullName}/compare/${BASE_BRANCH}...${
                forkRepoFullName.split('/')[0]
              }:${getHeadBranch()}`}
              target="_blank"
            >
              View Diff
            </TinaButton>
            <TinaButton
              as="a"
              primary
              href={fetchedPR.html_url}
              target="_blank"
            >
              View Pull Request
            </TinaButton>
          </>
        )}
      </ModalActions>
    </>
  )
}

const TinaButton = styled(RawTinaButton)`
  height: auto;
  padding-top: 0.8125rem;
  padding-bottom: 0.8125rem;
  text-decoration: none;
  line-height: 1;
`

const ModalDescription = styled.p`
  margin-bottom: 1rem;

  b {
    font-weight: bold;
  }
`

const PrModalBody = styled(ModalBody)`
  padding: 1.25rem 1.25rem 0 1.25rem;
`
