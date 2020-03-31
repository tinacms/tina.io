import { Form, useCMS, FieldMeta } from 'tinacms'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { color } from '@tinacms/styles'
import { getForkName } from '../open-authoring/repository'
import PRPlugin from './pull-request'

export const useOpenAuthoringToolbarPlugins = (
  form: Form<any>,
  editMode: boolean
) => {
  const cms = useCMS()

  useEffect(() => {
    const forkName = getForkName()
    const plugins = [
      {
        __type: 'toolbar:widget',
        name: 'current-fork',
        weight: 1,
        props: { forkName },
        component: ForkInfo,
      },
      // TODO
      PRPlugin(process.env.REPO_FULL_NAME, forkName),
    ] as any

    const removePlugins = () => {
      plugins.forEach(plugin => cms.plugins.remove(plugin))
    }

    if (editMode) {
      plugins.forEach(plugin => cms.plugins.add(plugin))
    } else {
      removePlugins()
    }

    return removePlugins
  }, [editMode, form])
}

const MetaLink = styled.a`
  display: block;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  color: ${color.primary('dark')};
`

const ForkInfo = ({ forkName }) => {
  return (
    <FieldMeta name={'Fork'}>
      <MetaLink target="_blank" href={`https://github.com/${forkName}`}>
        {forkName}
      </MetaLink>
    </FieldMeta>
  )
}
