import React from "react";
import styled from "styled-components";

const SocialBar = () => {
  return (
    <SocialSection>
      <SocialItem>
        <a
          href={`${metadata.social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon color={`${colors.hunterOrange}`} />
          <Heading as="h5" size="label" color={`${colors.hunterOrange}`}>
            Tweet us
          </Heading>
        </a>
        <span className="dotted-line" />
      </SocialItem>
      <SocialItem>
        <a
          href={`${metadata.social.github}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon color={`${colors.hunterOrange}`} />
          <Heading as="h5" size="label" color={`${colors.hunterOrange}`}>
            Fork us
          </Heading>
        </a>
        <span className="dotted-line" />
      </SocialItem>
      <SocialItem>
        <a
          href={`${metadata.social.slack}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SlackIcon color={`${colors.hunterOrange}`} />
          <Heading as="h5" size="label" color={`${colors.hunterOrange}`}>
            Slack us
          </Heading>
        </a>
        <span className="dotted-line" />
      </SocialItem>
      <SocialItem>
        <a
          href={`${metadata.social.forum}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ForumIcon color={`${colors.hunterOrange}`} />
          <Heading as="h5" size="label" color={`${colors.hunterOrange}`}>
            Ask us
          </Heading>
        </a>
      </SocialItem>
    </SocialSection>
  );
};

const SocialSection = styled("section")`
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-row-gap: 22px;
  justify-content: center;
  margin: 145px 0 65px 0;
  @media (min-width: ${breakpoints.md}px) {
    margin-top: 260px;
    grid-template-rows: unset;
    grid-template-columns: repeat(4, auto);
    grid-column-gap: 20px;
    width: 700px;
    margin: 260px auto 165px auto;
  }
  @media (min-width: ${breakpoints.lg}px) {
    grid-column-gap: 32px;
  }
`;

const SocialItem = styled("div")`
  width: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    svg {
      transform: scale3d(1, 1, 1);
      transition: transform 180ms ease-in;
    }
  }
  a:hover,
  a:focus {
    outline: none;
    text-decoration: none;
    svg {
      transform: scale3d(1.1, 1.1, 1.1);
      transition: transform 250ms ease-out;
    }
  }
  a:focus {
    text-decoration: underline;
  }
  svg {
    width: 66px;
    margin-bottom: 15px;
  }
  h5 {
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  span.dotted-line {
    display: block;
    height: 30px;
    border-left: 2px dotted ${colors.hunterOrange};
  }
  @media (min-width: ${breakpoints.md}px) {
    flex-direction: row;
    width: unset;
    align-items: flex-end;
    h5 {
      margin-bottom: 0;
    }
    span.dotted-line {
      height: 1px;
      width: 57px;
      border-left: unset;
      border-top: 3px dotted ${colors.hunterOrange};
      padding-bottom: 8px;
      margin-left: 20px;
    }
  }
  @media (min-width: ${breakpoints.lg}px) {
    span.dotted-line {
      margin-left: 32px;
    }
  }
`;

export default SocialBar;
