/**
 ** copied from legacy Gatsby Site, please
 ** use the established CSS varaibles set up in
 ** GlobalStyle as much as possible
 */

/** Color values mapped by Aksara color ID. */
export const colors = {
	//Mint Green
	seafoam: '#E6FAF8',
	mintChocoChip: '#B4F4E0',
	greyWhite: '#f4f4f4',
	greyWhite02: '#E9E9EC',
	hunterOrange: '#EC4815',
	burntSienna: '#CE411D',
	link: '#000',
	linkHover: '#EC4815',
	lightPurple: '#302454',
	darkPurple: '#241748',
	grey: '#595959',
	darkGrey: '#404040',

	// Blue
	/** Blue01 - Glitter */
	blue01: '#e7f1fc',
	/** Blue02 - Pale Aqua */
	blue02: '#b9d7f8',
	/** Blue03 - Jordy Blue */
	blue03: '#8bbdf3',
	/** Blue04 - Blue Jeans */
	blue04: '#5ca3ef',
	/** Blue05 - Bleu de France */
	blue05: '#2e89ea',
	/** Blue06 - Brandeis Blue */
	blue06: '#006fe6',
	/** Blue07 - Absolute Zero */
	blue07: '#005bbd',
	/** Blue08 - Usafa Blue */
	blue08: '#004793',
	/** Blue09 - Dark Midnight Blue */
	blue09: '#003369',
	/** blue10 - Maastricht Blue */
	blue10: '#001f3f',

	// Indigo
	/** Indigo01 - Soap */
	indigo01: '#e7eaf4',
	/** Indigo02 - Light Steel Blue */
	indigo02: '#b9c0df',
	/** Indigo03 - Ceil */
	indigo03: '#8b97c9',
	/** Indigo04 - Glaucous */
	indigo04: '#5c6db4',
	/** Indigo05 - Pigment Blue */
	indigo05: '#2e449f',
	/** Indigo06 - Indigo */
	indigo06: '#001b8a',
	/** Indigo07 - Dark Imperial Blue */
	indigo07: '#001771',
	/** Indigo08 - Royal Blue */
	indigo08: '#001258',
	/** Indigo09 - Maastricht Blue */
	indigo09: '#000d3f',
	/** Indigo10 - Black Indigo */
	indigo10: '#000826',

	// Turquoise
	/** Turquoise01 - Bubbles */
	turquoise01: '#e7fafd',
	/** Turquoise02 - Diamond */
	turquoise02: '#b9f1f9',
	/** Turquoise03 - Pale Cyan */
	turquoise03: '#8be7f5',
	/** Turquoise04 - Sky Blue */
	turquoise04: '#5cdef1',
	/** Turquoise05 - Turquoise Surf */
	turquoise05: '#2ed5ed',
	/** Turquoise06 - Turquoise */
	turquoise06: '#00cce9',
	/** Turquoise07 - Bondi Blue */
	turquoise07: '#00a7bf',
	/** Turquoise08 - Teal */
	turquoise08: '#008295',
	/** Turquoise09 - Bubbles */
	turquoise09: '#005d6a',
	/** Turquoise10 - Bubbles */
	turquoise10: '#003840',

	// Green
	/** Green01 - Honeydew */
	green01: '#f2f8f0',
	/** Green02 - Timbrewolf */
	green02: '#daecd3',
	/** Green03 - Celadon */
	green03: '#c1e0b7',
	/** Green04 - Granny Smith Apple */
	green04: '#a9d49a',
	/** Green05 - Pistachio */
	green05: '#90c87d',
	/** Green06 - Green Bud */
	green06: '#78bc61',
	/** Green07 - Palm Leaf */
	green07: '#639a50',
	/** Green08 - Fern Green */
	green08: '#4d783e',
	/** Green09 - Mughal Green */
	green09: '#37562d',
	/** Green10 - Leather Jacket */
	green10: '#21341b',

	// Yellow
	/** Yellow01 - Seashell */
	yellow01: '#fff7ed',
	/** Yellow02 - Lumber */
	yellow02: '#ffe7ca',
	/** Yellow03 - Tuscan */
	yellow03: '#ffd7a8',
	/** Yellow04 - Topaz */
	yellow04: '#ffc885',
	/** Yellow05 - Rajah */
	yellow05: '#ffb862',
	/** Yellow06 - Yellow Orange */
	yellow06: '#ffa940',
	/** Yellow07 - Bronze */
	yellow07: '#d18b35',
	/** Yellow08 - Liver */
	yellow08: '#a36c29',
	/** Yellow09 - Drab */
	yellow09: '#744d1e',
	/** Yellow10 - Pullman */
	yellow10: '#462f12',

	// Red
	/** Red01 - Linen */
	red01: '#fce9e8',
	/** Red02 - Spanish Pink */
	red02: '#f7bfbc',
	/** Red03 - Salmon Pink */
	red03: '#f2958f',
	/** Red04 - Pastel */
	red04: '#ed6b63',
	/** Red05 - Vermilion */
	red05: '#e84136',
	/** Red06 - Crimson */
	red06: '#e3170a',
	/** Red07 - Orange */
	red07: '#ba1309',
	/** Red08 - Sangria */
	red08: '#910f07',
	/** Red09 - Rosewood */
	red09: '#680b05',
	/** Red10 - Bean */
	red10: '#3e0703',

	// Grey
	grey01: '#fafafa',
	grey02: '#edeeee',
	grey03: '#cacece',
	grey04: '#858e8d',
	grey05: '#626e6d',
	grey06: '#404e4d',
	grey07: '#293232',
	grey08: '#1e2423',
	grey09: '#121615',
	grey10: '#060807',

	// Helper colors
	white: '#fff',
	black: '#000'
}

export const systemFonts =
	"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"

export const fonts = {
	system: systemFonts,
	sansSerif: `'Inter', ${systemFonts}`,
	monospace:
		"'SF Mono', Inconsolata, Menlo, Monaco, Consolas, 'Courier New', Courier, monospace;"
}

/** Heading size values mapped by size number.
 *
 * HACK for responsive mobile style overrides live
 * in components/foundations/reset/styles/base.ts
 * Below are type styles > 768
 */
export const headingSizes = {
	h1: {
		fontSize: 64,
		lineHeight: 83,
		letterSpacing: 0.1
	},
	h2: {
		fontSize: 32,
		lineHeight: 45,
		letterSpacing: 0.1
	},
	h3: {
		fontSize: 24,
		lineHeight: 32,
		letterSpacing: 0.12
	},
	h4: {
		fontSize: 16,
		lineHeight: 22,
		letterSpacing: 0.1
	},
	label: {
		fontSize: 16,
		lineHeight: 20,
		letterSpacing: 0.12
	},
	body: {
		fontSize: 18,
		lineHeight: 25,
		letterSpacing: 0.12
	},
	900: {
		fontSize: 42,
		lineHeight: 48,
		letterSpacing: -0.2
	},
	800: {
		fontSize: 35,
		lineHeight: 40,
		letterSpacing: -0.2
	},
	700: {
		fontSize: 29,
		lineHeight: 32,
		letterSpacing: -0.2
	},
	600: {
		fontSize: 24,
		lineHeight: 28,
		letterSpacing: -0.05
	},
	500: {
		fontSize: 20,
		lineHeight: 24,
		letterSpacing: -0.05
	},
	400: {
		fontSize: 16,
		lineHeight: 20,
		letterSpacing: -0.05
	},
	300: {
		fontSize: 14,
		lineHeight: 20,
		letterSpacing: -0.05
	},
	200: {
		fontSize: 12,
		lineHeight: 16,
		letterSpacing: 0
	},
	100: {
		fontSize: 12,
		lineHeight: 16,
		letterSpacing: 0.5
	}
}

/** Text size values mapped by size number. */
export const textSizes = {
	500: {
		fontSize: 20,
		lineHeight: 24
	},
	400: {
		fontSize: 16,
		lineHeight: 20
	},
	300: {
		fontSize: 14,
		lineHeight: 20
	},
	200: {
		fontSize: 12,
		lineHeight: 16
	}
}

/** Text size values mapped by size number. */
export const paragraphSizes = {
	400: {
		fontSize: 16,
		lineHeight: 24
	},
	300: {
		fontSize: 14,
		lineHeight: 24
	}
}

/** Space values (in px) mapped by size designators */
export const space = {
	/** Equivalent to 2px */
	xxxs: 2,
	/** Equivalent to 4px */
	xxs: 4,
	/** Equivalent to 8px */
	xs: 8,
	/** Equivalent to 12px */
	sm: 12,
	/** Equivalent to 16px */
	md: 16,
	/** Equivalent to 24px */
	lg: 24,
	/** Equivalent to 32px */
	xl: 32,
	/** Equivalent to 48px */
	xxl: 48,

	/** TINA specific styles */
	xSmallDesktop: 20,
	xSmallMobile: 12,
	smallDesktop: 32,
	smallMobile: 24,
	medDesktop: 54,
	medMobile: 46,
	lrgDesktop: 72,
	lrgMobile: 60,
	xlDekstop: 180,
	xlMobile: 120
}

/** Breakpoint values (in px) mapped by size designators */
export const breakpoints = {
	/** 0px to 319px */
	xs: 0,
	/** 320px to 767px */
	sm: 320,
	iphonePlus: 414,
	/** 768px to 1023px */
	md: 768,
	/** 1024px to 1439px */
	lg: 1024,
	desktop: 1280,
	/** 1440px and above */
	xl: 1440
}

export const layerIndexes = {
	base: 0,
	flat: 1,
	floating: 2,
	stickyNav: 8,
	overlay: 16,
	dialog: 24,
	popout: 32
}

export const dimensions = {
	widths: {
		sidebar: {
			sm: 240,
			md: 280,
			lg: 225
		},
		containerPadding: space.lg
	},
	heights: {
		header: 64
	}
}
