import React from 'react'
import type { TinaTemplate } from '@tinacms/cli'
import { Container } from './Container'
import { useWindowWidth } from '@react-hook/window-size'

const Logo = ({ data, index, windowWidth = 1000 }) => {
  const scaleFactor = windowWidth > 1200 ? 1 : windowWidth > 600 ? 0.75 : 0.5

  return (
    <a
      href={data.link}
      title={data.name}
      target="_blank"
      className="block flex-none transition ease-out duration-150 hover:opacity-70 cursor-pointer"
      style={{
        width: data.size ? data.size * scaleFactor : 200 * scaleFactor,
      }}
    >
      <img
        src={data.logo}
        className="block w-full h-auto m-0"
        alt={data.name}
      />
    </a>
  )
}

function getWindowSize() {
  if (typeof window === 'undefined') {
    return { width: 1000, height: 800 }
  }
  const { innerWidth, innerHeight } = window
  return { width: innerWidth, height: innerHeight }
}

export function LogoGridBlock({ data, index }) {
  const [windowSize, setWindowSize] = React.useState(getWindowSize())

  React.useEffect(() => {
    setWindowSize(getWindowSize())

    function handleWindowResize() {
      setWindowSize(getWindowSize())
    }

    if (!window) return

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return (
    <section
      key={'feature-grid-' + index}
      className={
        'relative z-10 py-16 lg:py-24 bg-gradient-to-br from-blue-800 via-blue-900 to-blue-1000'
      }
    >
      <Container width="wide">
        <div className="flex flex-col items-center">
          {data.title && (
            <h3 className="font-tuner inline-block text-center text-3xl lg:text-4xl lg:leading-tight bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 bg-clip-text text-transparent mb-6 lg:mb-8">
              {data.title}
            </h3>
          )}
          <div className="w-full flex items-center flex-wrap justify-center gap-10 md:gap-16 lg:gap-20">
            {data.items &&
              data.items.map((data, index) => {
                return (
                  <Logo
                    data={data}
                    index={index}
                    windowWidth={windowSize.width}
                  />
                )
              })}
          </div>
        </div>
      </Container>
    </section>
  )
}
