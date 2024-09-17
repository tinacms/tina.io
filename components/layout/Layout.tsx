import React from 'react'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

interface LayoutProps {
  children: any | any[]
  color?: 'white' | 'secondary' | 'seafoam'
  sticky? : boolean
}

export const Layout = ({ children, color, sticky = true }: LayoutProps) => {
  const router = useRouter()

  return (
    <>
      <div className="flex flex-col min-h-screen blob-bg font-sans">
        <DefaultSeo
          openGraph={{
            url: 'https://tina.io' + router.asPath,
          }}
        />
        <div className="lg:pb-20">
          <Navbar sticky={sticky}/>
        </div>
        <div className="flex flex-col flex-1">{children}</div>
        <Footer />
      </div>
      <style jsx>{`
        .blob-bg {
          background-image: url("data:image/svg+xml,%3Csvg preserveAspectRatio='none' viewBox='0 0 194 109' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_566_318)'%3E%3Crect width='194' height='109' fill='white' /%3E%3Cmask id='mask0_566_318' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='194' height='109'%3E%3Crect width='194' height='109' fill='url(%23paint0_linear_566_318)' /%3E%3C/mask%3E%3Cg mask='url(%23mask0_566_318)'%3E%3Crect width='194' height='109' fill='url(%23paint1_linear_566_318)' /%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_566_318' x1='97' y1='0' x2='97' y2='109' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23D9D9D9' stop-opacity='0.45' /%3E%3Cstop offset='0.229052' stop-color='%23D9D9D9' stop-opacity='0.1678' /%3E%3Cstop offset='0.677779' stop-color='%23D9D9D9' stop-opacity='0.0513' /%3E%3Cstop offset='1' stop-color='%23D9D9D9' stop-opacity='0' /%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_566_318' x1='0' y1='54.5' x2='194' y2='54.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2353E9DD' /%3E%3Cstop offset='0.34375' stop-color='%2368D7E4' /%3E%3Cstop offset='0.59375' stop-color='%2359BFF2' /%3E%3Cstop offset='1' stop-color='%234BA8FF' /%3E%3C/linearGradient%3E%3CclipPath id='clip0_566_318'%3E%3Crect width='194' height='109' fill='white' /%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E ");
          background-repeat: no-repeat;
          background-position: top center;
          background-size: 100% 100%;
          background-attachment: fixed;
        }
      `}</style>
    </>
  )
}
