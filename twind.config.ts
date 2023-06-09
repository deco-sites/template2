/**
 * WARNING: DO NOT USE ANY TWIND FUNCTIONS in here otherwise the
 * vscode-twind-intellisense plugin may stop working. To overcome
 * this issue, use animations and keyframes intead of twind's animation
 * function.
 */
import type { Options } from "$fresh/plugins/twind.ts";

const gridCols = ([arg]: string[]) => {
	const template = Number.isInteger(Number(arg))
		? `repeat(${arg}, minmax(0, 1fr))`
		: arg
		? arg.replace(/(^\[)|(\])$/g, "").replace(/_/g, " ")
		: arg;

	return {
		"grid-template-columns": template,
	};
};

const gridRows = ([arg]: string[]) => {
	const template = Number.isInteger(Number(arg))
		? `repeat(${arg}, minmax(0, 1fr))`
		: arg
		? arg.replace(/(^\[)|(\])$/g, "").replace(/_/g, " ")
		: arg;

	return {
		"grid-template-rows": template,
	};
};

const options: Omit<Options, "selfURL"> = {
	theme: {
		extend: {
			colors: {
				default: "#FFFFFF",
				header: "#FFFFFF",
				badge: "#8C3D3D", // shopping cart tem isso tambem
				footer: "#363636",
				interactive: "#161616",
				"interactive-inverse": "#FFFFFF",
				hover: "rgba(0, 0, 0, 0.04)",
				"hover-inverse": "rgba(255, 255, 255, 0.4)",
				topbar: "#f49d37",
				"gray-primary": "#efefef",
				"gray-secondary": "#d9d9d9",
				"gray-tertiary": "#828080",
				"gray-quaternary": "#363636",
				accent: "#8a4f7d",
				highlight: "#312f4f",
				"highlight-secondary": "#696d8c",
			},
			textColor: {
				default: "#000",
				"default-inverse": "#FFFFFF",
				subdued: "#66736C",
				"subdued-inverse": "#C6C6C6",
				price: "#000",
				"section-title": "#161616",
				positive: "#1A7346",
				critical: "#B44125",
				details: "#b8b08d",
				submenu: "#312f4f",
			},
			borderColor: {
				default: "#D4DBD7",
				"default-inverse": "#FFFFFF",
				interactive: "#161616",
				focus: "#3379EF",
				positive: "#1A7346",
				critical: "#B44125",
			},
			outline: {
				interactive: ["2px solid #8a4f7d", "2px"],
			},
			fontSize: {
				"heading-1": ["56px", "67.2px"],
				"heading-2": ["24px", "28.8px"],
				"heading-3": ["20px", "24px"],
				menu: ["16px", "20px"],
				button: ["14px", "18px"],
				body: ["16px", "20px"],
				caption: ["13px", "16px"],
				"list-price": ["14px", "34px"],
				title: ["38px", "1.2"],
				"title-desktop": ["2.4rem", "1.2"],
				description: ["16px", "1.5"],
				"description-desktop": ["1rem", "1.5"],
				"name-product": ["2.25rem", "1.2"],
				subtitle: ["18px", "1.2"],
				submenu: ["1rem", "50px"],
				"upper-title": ["0.9rem", "1"],
				"title-section": ["2.375rem", "1.2"],
				"description-section": ["1rem", "1.5"],
			},
			fontWeight: {
				"heading-1": "500",
				"heading-2": "500",
				"heading-3": "500",
				menu: "400",
				base: "400",
				button: "700",
				body: "400",
				caption: "400",
				"list-price": "400",
				title: "900",
				"title-desktop": "900",
				subtitle: "600",
				description: "400",
				"name-product": "900",
				submenu: "700",
				"upper-title": "600",
				"title-section": "900",
				"description-section": "400",
			},
			animation: {
				"slide-left": "slide-left-frame 0.4s ease normal",
				"slide-right": "slide-right-frame 0.4s ease normal",
				"slide-bottom": "slide-bottom-frame 0.4s ease normal",
				"slide-to-hide": "slide-hide-element 0.4s ease normal",
				"fade-out": "fade-out 500ms ease-out both",
				"fade-in": "fade-in 500ms cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
			},
			keyframes: {
				"slide-left-frame": {
					from: { transform: "translateX(100%)" },
					to: { transform: "translateX(0)" },
				},
				"slide-right-frame": {
					from: { transform: "translateX(-100%)" },
					to: { transform: "translateX(0)" },
				},
				"slide-bottom-frame": {
					from: { transform: "translateY(100%)" },
					to: { transform: "translateY(0)" },
				},
				"slide-hide-element": {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(100%)" },
				},
				"fade-out": {
					from: {
						opacity: 1,
					},
					to: {
						opacity: 0,
						visibility: "hidden",
						pointerEvents: "none",
					},
				},
				"fade-in": {
					from: {
						opacity: 0,
					},
					to: {
						opacity: 1,
					},
				}
			},
			boxShadow: {
				sm: "0px 1px 3px 0px #00000014",
				default: "0px 1px 4px 0px #0000001F",
				md: "0px 1px 5px 0px #00000024",
				lg: "0px 4px 10px 0px #0000001F",
				modal: "0 0 13px 0 rgba(0,0,0,.32941176470588235)",
			},
		},
		fontFamily: {
			sans: ["Roboto", "sans-serif"],
			serif: ["inherit", "serif"],
			title: ["Noto Sans", "sans-serif"],
		},
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"1xl": "1440px",
			"2xl": "1536px",
		},
	},
	preflight: (preflight) => ({
		...preflight,

		// Stick footer to the bottom of the page
		body: {
			display: "flex",
			flexDirection: "column",
			minHeight: "100vh",
		},
		'section[data-manifest-key="./sections/Footer.tsx"]': {
			marginTop: "auto",
		},

		// Prevent scroll when modal is open
		"body[no-scroll]": {
			overflow: "hidden",
			height: "100vh",
		},
	}),
	plugins: {
		backdrop: {
			"&::backdrop": {
				background: "rgba(0, 0, 0, 0.5)",
			},
		},
		"scroll-snap-center": {
			"scroll-snap-align": "center",
		},
		"scroll-x-mandatory": {
			"scroll-snap-type": "x mandatory",
		},
		"snap-x": {
			"scroll-snap-type": "x var(--tw-scroll-snap-strictness)",
		},
		"snap-mandatory": {
			"--tw-scroll-snap-strictness": "mandatory",
		},
		fill: (parts) => ({ fill: parts.join("-") }),
		"max-h-min": {
			"max-height": "min-content",
		},
		snap: ([mod]) => ({ "scroll-snap-align": mod }),
		"grid-cols": gridCols,
		"grid-rows": gridRows,
		"scroll-smooth": {
			"scroll-behavior": "smooth",
			"-webkit-overflow-scrolling": "touch",
		},
		"scrollbar-none": {
			"scrollbar-width": "none",
			"-ms-overflow-style": "none",
			"&::-webkit-scrollbar": {
				display: "none",
			},
		},
		"background-title": {
			background:
				"radial-gradient(circle,transparent 20%, #fff 20%,#fff  80%,transparent 80%,transparent),radial-gradient(circle,transparent 20%,#fff  20%,#fff  80%,transparent 80%,transparent) 25px 25px,linear-gradient(#efefef 2px,transparent 2px) 0 -1px,linear-gradient(90deg,#efefef 2px,#fff  2px) -1px 0",
			"background-size": "50px 50px,50px 50px,25px 25px,25px 25px",
		},
		"fit-content": {
			width: "fit-content",
		},
		"transform-center": {
			left: "50%",
			transform: "translateX(-50%)",
		},
		"transform-none": {
			transform: "translate(0,0)",
		},
		"max-width-header": {
			"max-width": "calc(1368px + 10%)",
		},
		"max-content": {
			"max-width": "calc(1368px + 10%)",
		},
		"blur-sm": {
			filter: "blur(4px)",
		},
		"line-clamp-2": {
			overflow: "hidden",
			display: "-webkit-box",
			"-webkit-box-orient": "vertical",
			"-webkit-line-clamp": "2",
		},
		"thumb-active": {
			'&[data-thumb-active="true"]': {
				filter: "brightness(0.7)",
			},
			transition: "all 0.4s ease",
		},
		"empty-none": {
			"&:empty": {
				display: "none",
			},
		},
		"transition-default": {
			transition: "all 0.4s ease",
		},
	},
};

export default options;
