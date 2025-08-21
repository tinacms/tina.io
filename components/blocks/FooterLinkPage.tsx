"use client";

import { HeroBlock } from "./Hero/Hero";
import { ContentBlock } from "./Content/Content";
import { Container } from "./Container";

interface FooterLinkPageProps {
  data: {
    blocks: Array<{
      __typename: string;
      [key: string]: any;
    }>;
  };
}

export const FooterLinkPage = ({ data }: FooterLinkPageProps) => {
  if (!data?.blocks) {
    return null;
  }

  return (
    <div>
      {data.blocks.map((block, index) => {
        switch (block.__typename) {
          case "PageBlocksHero":
            return (
              <section key={index}>
                <Container width="wide" center>
                  <HeroBlock data={block} index={index} />
                </Container>
              </section>
            );
          case "PageBlocksContent":
            return (
              <section key={index} className="pb-16">
                <Container width="wide">
                  <ContentBlock data={block} />
                </Container>
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
