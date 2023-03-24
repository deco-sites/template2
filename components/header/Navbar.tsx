import HeaderButton from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";

import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import HeaderSearchMenu from "$store/islands/HeaderSearchMenu.tsx";

function Navbar({
  items,
  searchbar,
}: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        class={`md:hidden flex flex-row justify-between items-center h-[${navbarHeight}] border-b-1 border-default w-full px-2 gap-2`}
      >
        <HeaderButton variant="menu" />

        <a
          href="/"
          class={`inline-flex items-center min-h-[${navbarHeight}]`}
          aria-label="Store logo"
        >
          <Icon id="LogoTemplateDois" width={150} height={50} />
        </a>

        <div class="flex gap-1">
          {/* <HeaderButton variant="search" /> */}
          <HeaderButton variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-end items-center border-b-1 border-default w-full px-[5%] max-width-header">
        <div class="flex justify-center items-center">
          {items.map((item, index) => {
            if (index === Math.ceil(items.length / 2)) {
              return (
                <div class="contents">
                  <div class="flex-none">
                    <a
                      href="/"
                      aria-label="Store logo"
                      class="block w-[180px]"
                    >
                      <Icon id="LogoTemplateDois" width={180} height={60} />
                    </a>
                  </div>
                  <NavItem item={item} />
                </div>
              );
            }
            return <NavItem item={item} />;
          })}
        </div>
        <div class="flex-none w-44 flex items-center justify-end gap-2">
          <HeaderButton variant="search" />
          <HeaderSearchMenu searchbar={searchbar} />
          <Button as="a" variant="icon" href="/login" aria-label="Log in">
            <Icon
              id="icon-account"
              width={33}
              height={33}
              strokeWidth={0.4}
              class="h-[2.8rem]"
            />
          </Button>
          <HeaderButton variant="cart" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
