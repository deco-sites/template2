import ProductCard from "$store/components/product/ProductCard.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import { useId } from "preact/hooks";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import Button from "../ui/Button.tsx";
import Icon from "../ui/Icon.tsx";

export interface Props {
	title: string;
	products: LoaderReturnType<Product[] | null>;
	itemsPerPage?: number;
}

function ProductBuyTogether({ title, products }: Props) {
	const id = useId();

	if (!products || products.length === 0) {
		return null;
	}

	return (
		<Container id={id} class="px-[5%] py-10">
			<div class="block w-full text-center background-title py-8 mb-5 sm:(py-9 mb-6)">
				<Text
					variant="title"
					tone="highlight"
					class="font-black text-center sm:text-title-desktop"
				>
					{title}
				</Text>
			</div>

			<div class="flex flex-col items-center gap-4 md:(grid grid-cols-[22%_4%_22%_4%_22%_4%_22%] grid-rows-[1fr] grid-flow-col items-start gap-0)">
				{products?.map((product, index) => (
					<div
						class={`w-full order-${index * 2 + 1} md:(col-start-${
							index * 2 + 1
						})`}
					>
						<ProductCard product={product} buyTogether={true} />
					</div>
				))}
				<Button
					variant="blank"
					class="order-2 md:col-start-2 top-[33%] relative w-[28px] h-[28px] flex rounded-full mx-auto bg-gray-secondary"
				>
					<Icon id="Plus" width={15} height={15} strokeWidth={3} />
				</Button>
				<Button
					variant="blank"
					class="order-4 md:col-start-4 top-[33%] relative w-[28px] h-[28px] flex rounded-full mx-auto bg-gray-secondary"
				>
					<Icon id="Plus" width={15} height={15} strokeWidth={3} />
				</Button>
				<Button
					variant="blank"
					class="order-6 md:col-start-6 top-[33%] relative w-[28px] h-[28px] flex rounded-full mx-auto bg-gray-secondary"
				>
					=
				</Button>
				<div class="order-7 md:col-start-7 top-[10%] relative flex flex-col w-full ">
					<h4 class="text-[1.125rem] uppercase font-bold mb-[0.625rem] text-center md:text-left" >Compre os 3 produtos por</h4>
					<span class="block text-[2.375rem] uppercase font-bold mb-[0.625rem] text-center  md:text-left">R$ 98,97</span>
					
					<Button variant="quaternary" class="gap-2 group w-full mt-[1.25rem]">
						<Icon id="icon-cart" width={20} height={20} strokeWidth={3} class="group-hover:text-white" />
						Comprar Junto
					</Button>
				</div>
			</div>
		</Container>
	);
}

export default ProductBuyTogether;
