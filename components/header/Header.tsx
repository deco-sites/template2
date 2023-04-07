import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { ClientConfigVTEX } from "deco-sites/std/functions/vtexConfig.ts";
import { useEffect, useRef, useState } from "preact/hooks";
import { RefObject } from "preact";

import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import { useUI } from "$store/sdk/useUI.ts";

export interface NavItem {
	label: string;
	href: string;
	children?: Array<{
		label: string;
		href: string;
		children?: Array<{
			label: string;
			href: string;
		}>;
	}>;
	image?: {
		src?: Image;
		alt?: string;
	};
}

export interface Props {
	alerts: string[];
	/** @title Search Bar */
	searchbar?: SearchbarProps;
	/**
	 * @title Navigation items
	 * @description Navigation items used both on mobile and desktop menus
	 */
	navItems?: NavItem[];

	/**
	 * @title Product suggestions
	 * @description Product suggestions displayed on search
	 */
	products?: LoaderReturnType<Product[] | null>;

	/**
	 * @title Enable Top Search terms
	 */
	suggestions?: LoaderReturnType<Suggestion | null>;

	/**
	 * @description vtex config used for search autocompletion;
	 */
	configVTEX?: LoaderReturnType<ClientConfigVTEX>;
}

function Header({
	alerts,
	searchbar: _searchbar,
	products,
	navItems = [],
	suggestions,
	configVTEX,
}: Props) {
	const searchbar = { ..._searchbar, products, suggestions, configVTEX };
	const [scrollingMode, setScrollingMode] = useState(window.pageYOffset > 0);
	const menuRef: RefObject<HTMLDivElement> = useRef(null);
	const [isNotHome, setIsNotHome] = useState(true);
	const { displaySearchbar } = useUI();

	// lógica do scrolling mode
	function handleScroll() {
		const menu = menuRef.current;
		if (menu && window.pageYOffset > 0) {
			setScrollingMode(true);
		} else if (menu) {
			setScrollingMode(false);
		}
	}

	useEffect(() => {
		globalThis.addEventListener("scroll", handleScroll);
		setIsNotHome(globalThis.location.pathname !== "/");
	}, []);

	const topDistance = scrollingMode ? "top-0 bg-white" : "top-[38px]";
	const headerClass = isNotHome ? `h-[87px] sm:h-[${headerHeight}]` : "";

	return (
		// <header class={`h-[87px] sm:h-[${headerHeight}]`}>
		<header class={`${headerClass}`}>
			<div class="bg-default w-full">
				<Alert alerts={alerts} />
				<div
					class={`fixed w-full z-50 ${topDistance} transition-default hover:bg-white`}
					ref={menuRef}
				>
					<Navbar items={navItems} searchbar={searchbar} />
				</div>
			</div>

			<Modals menu={{ items: navItems }} searchbar={searchbar} />
		</header>
	);
}

export default Header;
