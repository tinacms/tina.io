import React from 'react';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import TinaIconSvg from '../../../public/svg/tina-icon.svg';
import { Button, ButtonGroup } from '../../ui';
import { DynamicLink } from '../../ui/DynamicLink';

export const SocialBlock = (props) => {
  return (
    <ButtonGroup>
      {props.tina && (
        <DynamicLink href={props.tina} passHref>
          <Button color="white">
            <TinaIconSvg
              // @ts-ignore
              style={{
                color: '#EC4815',
                height: '1.675rem',
                width: 'auto',
                margin: '0 0.5rem 0 0.125rem',
              }}
            />{' '}
            Discussion
          </Button>
        </DynamicLink>
      )}
      {props.discord && (
        <DynamicLink href={props.discord} passHref>
          <Button color="white">
            <FaDiscord
              style={{
                color: '#5865f2',
                height: '1.5rem',
                width: 'auto',
                margin: '0 0.5rem 0 0.125rem',
              }}
            />{' '}
            Discord
          </Button>
        </DynamicLink>
      )}
      {props.github && (
        <DynamicLink href={props.github} passHref>
          <Button color="white">
            <FaGithub
              style={{
                color: '#24292e',
                height: '1.5rem',
                width: 'auto',
                margin: '0 0.5rem 0 0.125rem',
              }}
            />{' '}
            GitHub
          </Button>
        </DynamicLink>
      )}
      {props.twitter && (
        <DynamicLink href={props.twitter} passHref>
          <Button color="white">
            <FaTwitter
              style={{
                color: '#1DA1F2',
                height: '1.5rem',
                width: 'auto',
                margin: '0 0.5rem 0 0.125rem',
              }}
            />{' '}
            Twitter
          </Button>
        </DynamicLink>
      )}
    </ButtonGroup>
  );
};
