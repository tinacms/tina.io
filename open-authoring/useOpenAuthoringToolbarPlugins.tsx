import { Form, useCMS, FieldMeta } from 'tinacms'
import { useEffect, useState } from 'react'
import { PRPlugin } from './PRPlugin'
import styled from 'styled-components'
import { color } from '@tinacms/styles'
import { getForkName } from './utils/repository'

const useFormState = (form, subscription) => {
  const [state, setState] = useState(form.finalForm.getState())
  useEffect(() => {
    form.subscribe(setState, subscription)
  }, [form])

  return state
}

export const useOpenAuthoringToolbarPlugins = (
  form: Form<any>,
  editMode: boolean
) => {
  const cms = useCMS()
  const formState = useFormState(form, { dirty: true, submitting: true })

  useEffect(() => {
    const forkName = getForkName()
    const plugins = [
      {
        __type: 'toolbar:git',
        name: 'current-fork',
        component: () => {
          return (
            <FieldMeta name={'Fork'}>
              <MetaLink target="_blank" href={`https://github.com/${forkName}`}>
                {forkName}
              </MetaLink>
            </FieldMeta>
          )
        },
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
  }, [editMode, form, formState])
}

const MetaLink = styled.a`
  display: block;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  color: ${color.primary('dark')};
`
