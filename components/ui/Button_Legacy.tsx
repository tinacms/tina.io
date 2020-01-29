import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { colors, space } from '../styles/variables'
import { rgba } from 'polished'

interface ButtonProps {
	to: string
	bgColor: string
	textColor?: string
	height?: string
	key?: string
	isExternal?: boolean
}

const StyledButton = styled(Link)<ButtonProps>`
	width: max-content;
	transform: translate3d(0px, 0px, 0px);
	transition: transform 180ms ease-in;
	display: flex;
	align-items: center;
	background-color: ${props => props.bgColor};
	color: ${props => props.textColor};
	border-radius: 100px;
	cursor: pointer;
	text-transform: uppercase;
	height: ${props => props.height}px;
	padding: 0;
	&:hover,
	&:focus {
		text-decoration: none;
		transform: translate3d(-1px, -2px, 2px);
		transition: transform 180ms ease-out;
	}
	&:focus {
		box-shadow: 0 0 0 3px ${p => rgba(p.bgColor, 0.5)};
	}
	&:focus,
	&:active {
		outline: none;
	}
	&:active {
		filter: none;
	}
	h5 {
		padding: 0 ${space.md}px;
	}
`
const StyledExternalButton = styled('a')<ButtonProps>`
	width: max-content;
	transform: translate3d(0px, 0px, 0px);
	transition: transform 180ms ease-in;
	backface-visibility: hidden;
	display: flex;
	align-items: center;
	background-color: ${props => props.bgColor};
	color: ${props => props.textColor};
	border-radius: 100px;
	text-transform: uppercase;
	height: ${props => props.height}px;
	padding: 0;
	&:hover,
	&:focus {
		text-decoration: none;
		transform: translate3d(-1px, -2px, 2px);
		transition: transform 150ms ease-out;
	}
	&:focus {
		box-shadow: 0 0 0 3px ${p => rgba(p.bgColor, 0.5)};
	}
	&:focus,
	&:active {
		outline: none;
	}
	&:active {
		filter: none;
	}
	h5 {
		padding: 0 ${space.md}px;
	}
`

const Button: React.SFC<ButtonProps> = ({
	to,
	bgColor,
	textColor,
	height,
	children,
	isExternal
}) => {
	return isExternal ? (
		<StyledExternalButton
			to={to}
			href={`${to}`}
			target='_blank'
			bgColor={bgColor}
			textColor={textColor}
			height={height}
		>
			{/*TODO: update headings*/}
			<h5>{children}</h5>
		</StyledExternalButton>
	) : (
		<StyledButton
			to={to}
			bgColor={bgColor}
			textColor={textColor}
			height={height}
		>
			<h5>{children}</h5>
		</StyledButton>
	)
}

Button.defaultProps = {
	height: '45',
	bgColor: colors.hunterOrange,
	textColor: colors.seafoam
}

export default Button
