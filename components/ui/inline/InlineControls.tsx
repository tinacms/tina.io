import styled from 'styled-components'

export function InlineControls({ children }: any) {
  return <EditControls>{children}</EditControls>
}

const EditControls = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1.5rem;
  button {
    margin-right: 1rem;
    text-transform: none;
    opacity: 1;
  }
`
