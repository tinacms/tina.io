'use client';

import { MarkdownContent, RichTextWrapper } from 'components/layout';
import { EmailForm } from 'components/modals/AppRouterEmailForm';
import { ButtonGroup, LinkButton } from 'components/ui';
import Image from 'next/image';
import TinaIconSvg from 'public/svg/tina-icon.svg';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';

export default function CommunityPageClient(data) {
  return (
    <div className="flex flex-col">
      <div className="text-center my-10">
        <h1 className="text-5xl font-tuner bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-transparent bg-clip-text">
          {data.headline}
        </h1>
      </div>

      {/* Info Section */}
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-8 my-16 px-6 lg:px-20">
        {/* Info Content */}
        <div className="space-y-6">
          <h2 className="text-4xl font-tuner bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-transparent bg-clip-text">
            {data.supporting_headline}
          </h2>
          <hr className="block border-none bg-[url('/svg/hr.svg')] bg-no-repeat bg-[length:auto_100%] h-[10px] w-full my-8" />
          <RichTextWrapper>
            <div className="text-gray-700 tracking-wide leading-relaxed">
              <MarkdownContent content={data.supporting_body} />
            </div>
          </RichTextWrapper>

          <ButtonGroup>
            <LinkButton
              color="white"
              link={'https://github.com/tinacms/tinacms/discussions'}
            >
              <TinaIconSvg
                // @ts-ignore
                style={{
                  fill: '#EC4815',
                  height: '1.675rem',
                  width: 'auto',
                  margin: '0 0.675rem 0 0.125rem',
                }}
              />{' '}
              Discussion
            </LinkButton>
            <LinkButton
              link={'https://discord.com/invite/zumN63Ybpf'}
              color="white"
            >
              <FaDiscord
                style={{
                  color: '#5865f2',
                  height: '1.5rem',
                  width: 'auto',
                  margin: '0 0.675rem 0 0.125rem',
                }}
              />{' '}
              Discord
            </LinkButton>
            <LinkButton
              link={'https://github.com/tinacms/tinacms'}
              color="white"
            >
              <FaGithub
                style={{
                  color: '#24292e',
                  height: '1.5rem',
                  width: 'auto',
                  margin: '0 0.675rem 0 0.125rem',
                }}
              />{' '}
              GitHub
            </LinkButton>
            <LinkButton link={'https://twitter.com/tinacms'} color="white">
              <FaTwitter
                style={{
                  color: '#1DA1F2',
                  height: '1.5rem',
                  width: 'auto',
                  margin: '0 0.675rem 0 0.125rem',
                }}
              />{' '}
              Twitter
            </LinkButton>
          </ButtonGroup>
        </div>

        {/* Info Image */}
        <div className="flex justify-center">
          <Image
            src={data.img.src}
            alt={data.img.alt}
            height={600}
            width={600}
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-green-100 py-12">
        <div className="text-center px-6 lg:px-20">
          <h2 className="text-4xl font-tuner bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-transparent bg-clip-text">
            {data.newsletter_header}
          </h2>
          <p className="text-gray-600 mt-2">{data.newsletter_cta}</p>
          <div className="flex justify-center mt-6">
            <div className="w-full">
              <EmailForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
