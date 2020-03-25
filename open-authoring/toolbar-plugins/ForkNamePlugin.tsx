import { FieldMeta } from 'tinacms'
import styled from 'styled-components'
import { color } from '@tinacms/styles'

export const ForkNamePlugin = (forkName: string) => ({
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
})

const MetaLink = styled.a`
  display: block;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  color: ${color.primary('dark')};
`
