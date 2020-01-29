import React from 'react'
import styled from 'styled-components'
import Button from '../ui/Button_Legacy'
import { TinaWordmark, TwitterIcon, GithubIcon } from '../icons'
import { colors, textSizes, space, breakpoints } from '../styles/variables'

interface FooterProps {
	headerMenus?: Edge<HeaderMenuItem>[]
}

function Footer({ headerMenus }: FooterProps) {
	return (
		<Wrapper>
			<StyledFooterMain>
				<TinaWordmark />
				<StyledCommunityItems>
					<Button
						to='/teams'
						bgColor={`${colors.seafoam}`}
						textColor={`${colors.hunterOrange}`}
					>
						TINA FOR TEAMS
					</Button>
					<a href={metadata.social.twitter} target='_blank'>
						<TwitterIcon color={`${colors.seafoam}`} />
					</a>
					<a className='github' href={metadata.social.github} target='_blank'>
						<GithubIcon color={`${colors.seafoam}`} />
					</a>
				</StyledCommunityItems>
				<StyledNavItems>
					{headerMenus &&
						headerMenus.map(({ node }) => {
							if (node.external) {
								return (
									<Heading key={node.id} as='h3' size='h3'>
										<a
											href={node.href}
											target='_blank'
											rel='noopener noreferrer'
										>
											{node.label}
										</a>
									</Heading>
								)
							}
							return (
								<Heading key={node.id} as='h3' size='h3'>
									<Link getProps={isActive} to={node.href}>
										{node.label}
									</Link>
								</Heading>
							)
						})}
				</StyledNavItems>
			</StyledFooterMain>
			<StyledFooterSecondary>
				<EmailForm isFooter={true} />
				<span>
					<Heading as='h5' size='label'>
						<a href={metadata.licenseUrl} target='_blank'>
							License
						</a>
					</Heading>
					<Heading as='h5' size='label'>
						TinaCMS{new Date().getFullYear()}
					</Heading>
				</span>
			</StyledFooterSecondary>
		</Wrapper>
	)
}

export default Footer

const Wrapper = styled('footer')`
	background-color: ${colors.hunterOrange};
	svg {
		width: 100px;
	}
	a {
		color: ${colors.seafoam};
	}
	p {
		margin: 0;
		font-size: ${textSizes[300].fontSize}px;
		line-height: ${textSizes[300].lineHeight}px;
	}
`

const StyledFooterMain = styled('div')`
	padding: ${space.smallMobile}px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: minmax(50px, auto);
	grid-template-areas:
		'logo  social'
		'nav   social';
	@media (min-width: ${breakpoints.md}px) {
		grid-template-columns: 18% 18% auto;
		grid-template-areas: 'logo nav social';
	}
`

const StyledWordmark = styled('div')`
	grid-area: logo;
`

const StyledNavItems = styled('nav')`
	grid-area: nav;
	text-transform: uppercase;
	h3:not(:first-child) {
		margin-top: ${space.xxs}px;
	}
`

const StyledCommunityItems = styled('div')`
	grid-area: social;
	display: flex;
	justify-content: flex-end;
	align-items: baseline;
	> a:first-child {
		display: none;
	}
	> :not(:first-child) {
		margin-left: 20px;
	}
	svg {
		width: 28px;
	}
	a.github {
		svg {
			width: 24px;
		}
	}
	@media (min-width: ${breakpoints.md}px) {
		> a:first-child {
			display: flex;
		}
	}
`

const StyledFooterSecondary = styled('div')`
	grid-area: meta;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	padding: ${space.xSmallMobile}px ${space.smallMobile}px;
	background-color: ${colors.burntSienna};
	color: ${colors.seafoam};
	a {
		color: ${colors.seafoam};
	}
	span {
		margin-top: ${space.xSmallMobile}px;
		display: flex;
		justify-content: flex-end;
		color: #ee8d6e;
		h5 {
			font-size: 12px;
			margin-left: 8px;
		}
		a {
			color: inherit;
		}
	}
	@media (min-width: ${breakpoints.md}px) {
		h4:not(:last-child) {
			padding: 0 ${space.medMobile}px;
		}
		flex-direction: row;
		span {
			align-items: flex-end;
		}
	}
`
