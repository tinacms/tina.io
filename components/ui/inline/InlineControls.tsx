import styled from 'styled-components'

export function InlineControls({ children }: any) {
  return <EditControls>{children}</EditControls>
}

const EditControls = styled.div`
  position: sticky;
  top: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  button {
    text-transform: none;
    opacity: 1;
  }
`
