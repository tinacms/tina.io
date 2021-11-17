import styled from 'styled-components'

const VERSIONS = [
  {
    id: 'v-latest',
    url: 'https://tina.io',
    label: 'v.Latest',
  },
  {
    id: 'v-pre-beta',
    url: 'https://tinacms-site-next-burxzt849-tinacms.vercel.app',
    label: 'v.Pre-Beta',
  },
]

export const VersionSelect = () => {
  const selectedVersion =
    VERSIONS.find(
      v => typeof window !== 'undefined' && v.url == window.location.origin
    ) || VERSIONS[0]
  return (
    <SelectContainer>
      <SelectWrapper>
        <select
          aria-label="Version"
          onChange={e => {
            window.location.href = e.target.value
          }}
          value={selectedVersion.url}
        >
          {VERSIONS.map(version => (
            <option
              arial-label={`vLatest`}
              aria-current={selectedVersion.id == version.id}
              value={version.url}
              key={version.id}
            >
              {version.label}
            </option>
          ))}
        </select>
      </SelectWrapper>{' '}
    </SelectContainer>
  )
}

const SelectContainer = styled.div`
  margin-bottom: 1rem;
`

const SelectWrapper = styled.div`
  display: inline-block;
  position: relative;
`
