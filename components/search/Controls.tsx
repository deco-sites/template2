import Container from "$store/components/ui/Container.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import Text from "../ui/Text.tsx";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
}

function NotFound() {
  return <div />;
}

function Controls({ page }: { page: ProductListingPage }) {
  const open = useSignal(false);
  const filters = page?.filters;
  const breadcrumb = page?.breadcrumb;

  return (
    <div class="flex flex-col justify-between mb-4 md:mb-0 md:p-0 sm:gap-4">
      <div class="w-full background-title h-60 mb-5 flex items-center justify-center">
        <div class="flex w-full px-[5%] items-center justify-center max-content mx-auto">
          <Text
            tone="highlight"
            variant="title"
            class="font-black text-center sm:text-title-desktop"
          >
            Produtos
          </Text>
        </div>
      </div>
      <div class="flex flex-row items-center max-content px-[5%] mb-14 mx-auto w-full md:mb-0">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
      </div>
      <div class="flex flex-row max-content px-[5%] items-center md:hidden">
        <Button
          variant="quaternary"
          onClick={() => {
            open.value = true;
          }}
          class="w-full font-medium"
        >
          <Icon id="icon-filter" width={20} height={20} />
          Filtros
        </Button>
      </div>

      <Modal
        title="Filtros"
        mode="sidebar-right"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <div class="pb-8">
          <Filters filters={filters} />
          <Sort />
        </div>
      </Modal>
    </div>
  );
}

function SearchControls({ page }: Props) {
  if (!page || !page.filters || page.filters.length === 0) {
    return <NotFound />;
  }

  return <Controls page={page} />;
}

export default SearchControls;
