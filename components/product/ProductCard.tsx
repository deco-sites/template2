import Image from "deco-sites/std/components/Image.tsx";
import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import Logger from "../../islands/Logger.tsx";

/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
function Sizes(product: Product) {
	const possibilities = useVariantPossibilities(product);
	const options = Object.entries(
		possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {}
	);

	return (
		<ul class="flex justify-center items-center gap-2">
			{options.map(([url, value]) => (
				<a href={url}>
					<Avatar
						class="bg-default"
						variant="abbreviation"
						content={value}
						disabled={url === product.url}
					/>
				</a>
			))}
		</ul>
	);
}

interface Props {
	product: Product;
	/** Preload card image */
	preload?: boolean;
}

function ProductCard({ product, preload }: Props) {
	const { url, productID, name, image: images, offers } = product;
	const [front, back] = images ?? [];
	const { listPrice, price, seller, installments } = useOffer(offers);

	

	return (
		<div id={`product-card-${productID}`} class="w-full group flex flex-col justify-start min-h-[365px]">
			<Logger message="Dados do produto no productCard" info={product} />

			<a href={url} aria-label="product link">
				<div class="relative w-full mb-2.5">
					<Image
						src={front.url!}
						alt={front.alternateName}
						width={168}
						height={168}
						class="w-full group-hover:hidden"
						preload={preload}
						loading={preload ? "eager" : "lazy"}
						sizes="(max-width: 640px) 50vw, 20vw"
					/>
					<Image
						src={back?.url ?? front.url!}
						alt={back?.alternateName ?? front.alternateName}
						width={168}
						height={168}
						class="w-full hidden group-hover:block"
						sizes="(max-width: 640px) 50vw, 20vw"
					/>
				</div>
			</a>

			<div class="flex flex-col">
        <div class="h-[60px]">
          <Text
            class="line-clamp-2 flex-1 font-bold uppercase leading-7"
            variant="body"
          >
            {name}
          </Text>
        </div>
				<div class="flex flex-col mt-4 min-h-[70px]">
					<Text variant="caption" tone="price" class="font-black text-[16px]">
						{formatPrice(price, offers!.priceCurrency!)}
					</Text>
					{installments ? (
						<Text class="" variant="list-price" tone="subdued">
							{installments}
							{/* {formatPrice(installments, offers!.priceCurrency!)} */}
						</Text>
					) : (
						<Text class="line-through" variant="list-price" tone="subdued">
							{formatPrice(listPrice, offers!.priceCurrency!)}
						</Text>
					)}
				</div>
				{seller && (
					<div
						class="w-full mt-auto"
						style={{
							backgroundColor: "rgba(255, 255, 255, 0.2)",
							backdropFilter: "blur(2px)",
						}}
					>
						{/* <Sizes {...product} /> */}
						<Button
							as="a"
							href={product.url}
							variant="quaternary"
							class="w-full"
						>
							Comprar
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export default ProductCard;
