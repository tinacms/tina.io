interface ContainerProps {
  children?: any
  width?: 'medium' | 'narrow' | 'wide'
  center?: boolean
}

export const Container = ({
  width = 'medium',
  center = false,
  children,
}: ContainerProps) => {
  return (
    <>
      <div className={['container', width, center ? 'center' : ''].join(' ')}>
        {children}
      </div>
      <style jsx>{`
        .container {
          margin: 0 auto;
          padding: 0 var(--container-padding);
        }

        .wide {
          max-width: 1500px;
        }

        .medium {
          max-width: 1240px;
        }

        .narrow {
          max-width: 740px;
        }

        .center {
          text-align: center;
        }
      `}</style>
    </>
  )
}
