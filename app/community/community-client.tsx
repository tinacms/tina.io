'use client';

import { MarkdownContent, RichTextWrapper } from 'components/layout';
import { SocialLinks } from 'components/ui';
import Image from 'next/image';
import { EmailForm } from '@/component/modals/EmailForm';

import { BODY, PAGE_TITLE, SECTION_TITLE } from '@/component/styles/typography';
export default function CommunityPageClient(data) {
  return (
    <div className="flex flex-col">
      <div className="text-center my-10">
        <h1 className={PAGE_TITLE}>{data.headline}</h1>
      </div>

      {/* Info Section */}
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-8 my-16 px-6 lg:px-20">
        {/* Info Content */}
        <div className="space-y-6">
          <h2 className={SECTION_TITLE}>{data.supporting_headline}</h2>
          <hr className="block border-none bg-[url('/svg/hr.svg')] bg-no-repeat bg-[length:auto_100%] h-[10px] w-full my-8" />
          <RichTextWrapper>
            <div className={BODY}>
              <MarkdownContent content={data.supporting_body} />
            </div>
          </RichTextWrapper>

          <SocialLinks
            links={{
              tina: 'https://github.com/tinacms/tinacms/discussions',
              discord: 'https://discord.com/invite/zumN63Ybpf',
              github: 'https://github.com/tinacms/tinacms',
              twitter: 'https://twitter.com/tinacms',
            }}
          />
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
      <div className="py-12">
        <div className="text-center px-6 lg:px-20">
          <h2 className={`${SECTION_TITLE} mb-2`}>{data.newsletter_header}</h2>
          <p className={`${BODY} mt-2`}>{data.newsletter_cta}</p>
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
