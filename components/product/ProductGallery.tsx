import ProductCard from "$store/components/product/ProductCard.tsx";
import Container from "$store/components/ui/Container.tsx";
import Button from "$store/components/ui/Button.tsx";
import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import Filters from "$store/islands/Filters.tsx";
import Sort from "$store/islands/Sort.tsx";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <Text>Not Found!</Text>
    </div>
  );
}

function Gallery({ page }: { page: ProductListingPage }) {
  const filters = page?.filters;
  return (
    <Container class="px-[5%] sm:py-10 md:(flex gap-16 w-full)">
      <div class="hidden flex-col md:(flex mt-0 p-0 w-[15%])">
        <Filters filters={filters} />
        <Sort />
      </div>
      <div class="flex-col md:(w-[85%])">
        <div class="relative grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10 items-center">
          {page.products?.map((product, index) => (
            <div class="w-full list-none">
              <ProductCard product={product} preload={index === 0} />
            </div>
          ))}
        </div>

        <div class="flex flex-row items-center justify-center gap-2 my-4">
          <a rel="prev" href={page.pageInfo.previousPage ?? "#"}>
            <Button disabled={!page.pageInfo.previousPage} variant="icon">
              <Icon id="ChevronLeft" width={20} height={20} strokeWidth={2} />
            </Button>
          </a>
          <Text variant="caption">{page.pageInfo.currentPage + 1}</Text>
          <a rel="next" href={page.pageInfo.nextPage ?? "#"}>
            <Button disabled={!page.pageInfo.nextPage} variant="icon">
              <Icon id="ChevronRight" width={20} height={20} strokeWidth={2} />
            </Button>
          </a>
        </div>
      </div>
    </Container>
  );
}

function ProductGallery({ page }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Gallery page={page} />;
}

export default ProductGallery;
