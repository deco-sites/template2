import ProductCard from "$store/components/product/ProductCard.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "preact/hooks";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
	title: string;
	products: LoaderReturnType<Product[] | null>;
	itemsPerPage?: number;
}

function ProductShelf({ title, products }: Props) {
	const id = useId();

	if (!products || products.length === 0) {
		return null;
	}

	return (
		<Container id={id} class="px-[5%] py-10">
			<div class="block w-full  text-center background-title py-8 mb-5 sm:(py-9 mb-6)">
				<Text
					variant="title"
					tone="highlight"
					class="font-black text-center sm:text-title-desktop"
				>
					{title}
				</Text>
			</div>

			<Slider
				class="gap-3 col-span-full row-start-2 row-end-5 pb-7 sm:gap-6"
				snap="snap-center sm:snap-start block first:ml-0 sm:first:ml-0 last:mr-0 sm:last:mr-0"
			>
				{products?.map((product) => (
					<div class="min-w-[168px] max-w-[170px] sm:min-w-[288px] sm:max-w-[288px]">
						<ProductCard product={product} />
					</div>
				))}
			</Slider>

			<>
				<div class="hidden relative sm:block z-10 col-start-1 row-start-3">
					<div class="absolute right-1/2">
						<Button variant="icon" data-slide="prev" aria-label="Previous item">
							<Icon size={20} id="icon-prev" strokeWidth={3} />
						</Button>
					</div>
				</div>
				<div class="hidden relative sm:block z-10 col-start-3 row-start-3">
					<div class="absolute left-1/2">
						<Button variant="icon" data-slide="next" aria-label="Next item">
							<Icon size={20} id="icon-next" strokeWidth={3} />
						</Button>
					</div>
				</div>
			</>

			<SliderControllerJS rootId={id} />
		</Container>
	);
}

export default ProductShelf;
