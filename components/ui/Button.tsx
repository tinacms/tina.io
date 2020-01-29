import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
	font-size: 0.8725rem;
	border-radius: 2rem;
	cursor: pointer;
	transition: all 150ms ease-out;
	border: 1px solid black;

	&:hover,
	&:focus {
		transform: translate3d(-1px, -1px, 0);
	}
`

export default Button
