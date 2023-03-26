import Image from "deco-sites/std/components/Image.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";

import ProductSelector from "./ProductVariantSelector.tsx";
import Logger from "../../islands/Logger.tsx";

export interface Props {
	page: LoaderReturnType<ProductDetailsPage | null>;
}

function NotFound() {
	return (
		<div class="w-full flex justify-center items-center py-28">
			<div class="flex flex-col items-center justify-center gap-6">
				<Text variant="heading-2">Página não encontrada</Text>
				<a href="/">
					<Button>Voltar à página inicial</Button>
				</a>
			</div>
		</div>
	);
}

function Details({ page }: { page: ProductDetailsPage }) {
	const { breadcrumbList, product } = page;
	const { description, productID, offers, image: images, name, gtin } = product;
	const { price, listPrice, seller, installments } = useOffer(offers);
	const [front, back] = images ?? [];

	return (
		<Container class="py-5 px-[5%] sm:py-10">
			{/* <Logger message="Dados do produto" info={product} />
			<Logger message="Installments" info={installments} /> */}
			<div class="flex flex-col md:flex-row md:gap-6">
				{/* Image Gallery */}
				<div class="flex flex-row overflow-auto snap-x snap-mandatory scroll-smooth sm:gap-2 md:w-[65%]">
					{[front, back ?? front].map((img, index) => (
						<Image
							style={{ aspectRatio: "360 / 500" }}
							class="snap-center min-w-[100vw] sm:min-w-0 sm:w-auto sm:h-[600px]"
							sizes="(max-width: 640px) 100vw, 30vw"
							src={img.url!}
							alt={img.alternateName}
							width={360}
							height={500}
							// Preload LCP image for better web vitals
							preload={index === 0}
							loading={index === 0 ? "eager" : "lazy"}
						/>
					))}
				</div>
				{/* Product Info */}
				<div class="flex-auto pl-5 sm:px-0 md:w-[45%]">
					{/* Breadcrumb */}
					{/* <Breadcrumb
            itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
          /> */}
					{/* Code and name */}
					<div class="sm:mt-8">
						<div>
							<Text tone="subdued" variant="caption">
								Cod. {gtin}
							</Text>
						</div>
						<h1>
							<Text variant="blank" class="text-name-product font-name-product">
								{name}
							</Text>
						</h1>
					</div>
					{/* Prices */}
					<div class="mt-4 flex flex-col">
						<Text variant="caption" tone="price" class="font-black text-[20px]">
							{formatPrice(price, offers!.priceCurrency!)}
						</Text>
						{installments ? (
							<Text class="" variant="list-price" tone="subdued">
								{installments}
							</Text>
						) : (
							<Text class="line-through" variant="list-price" tone="subdued">
								{formatPrice(listPrice, offers!.priceCurrency!)}
							</Text>
						)}
					</div>
					{/* Sku Selector */}
					<div class="mt-4 sm:mt-6">
						<ProductSelector product={product} />
					</div>
					{/* Add to Cart and Favorites button */}
					<div class="mt-4 sm:mt-10 flex flex-col gap-2 md:flex-row md:gap-4">
						<div class="contents md:(block w-[40%])">
							<QuantitySelector
								// disabled={loading.value || isGift}
								quantity={1}
								// onChange={(quantity) =>
								//   updateItems({ orderItems: [{ index, quantity }] })}
							/>
						</div>
						<div class="contents md:(block w-[60%])">
							{seller && <AddToCartButton skuId={productID} sellerId={seller} />}
						</div>
						{/* <Button variant="secondary">
							<Icon id="Heart" width={20} height={20} strokeWidth={2} />{" "}
							Favoritar
						</Button> */}
					</div>
					<div class="flex flex-col gap-2 pb-10 border-b-1 border-highlight mt-8">
						<Text variant="body" class="text-[14px]">
							calcular frete e prazo
						</Text>
						<div class="flex">
							<input
								type="text"
								class="border border-black w-[70%] flex-1 p-2.5 h-[42px] outline-none md:h-12"
								name="cepText"
								id="cep-input"
								placeholder="CEP"
							/>
							<Button
								class="font-medium w-[30%] text-[14px] h-[42px]"
								variant="add-to-cart"
							>
								CALCULAR
							</Button>
						</div>
					</div>
					<div class="flex flex-col gap-2 pb-6 border-b-1 border-highlight mt-6">
						<Text variant="body" class="text-[14px]">
							compartilhar
						</Text>
						<div class="flex gap-3">
							<Button
								variant="icon"
								aria-label="Compartilhar no Facebook"
								as="a"
								href="#"
								target="_blank"
								class="px-0"
							>
								<Icon
									id="icon-facebook"
									width={20}
									height={20}
									strokeWidth={0.01}
								/>
							</Button>
							<Button
								variant="icon"
								aria-label="Compartilhar no WhatsApp"
								as="a"
								href="#"
								target="_blank"
								class="px-0"
							>
								<Icon
									id="icon-whatsapp"
									width={20}
									height={20}
									strokeWidth={0.01}
								/>
							</Button>
							<Button
								variant="icon"
								aria-label="Compartilhar no Twitter"
								as="a"
								href="#"
								target="_blank"
								class="px-0"
							>
								<Icon
									id="icon-twitter"
									width={20}
									height={20}
									strokeWidth={0.01}
								/>
							</Button>
						</div>
					</div>
					<div class="flex flex-col gap-2 pb-3.5 border-b-1 border-highlight mt-3.5">
						<Text variant="caption">
							{description && (
								<Text variant="body" class="font-light text-gray-quaternary">
									{description} Ad duis nulla consectetur magna consequat
									incididunt non sit eu culpa officia consequat eiusmod. In
									dolor excepteur excepteur adipisicing non est nostrud nulla
									mollit elit amet elit nostrud. Ipsum veniam ut cupidatat duis
									commodo fugiat sunt irure amet irure proident pariatur dolor.
									Minim minim occaecat esse eu. Dolore cillum eiusmod et tempor
									velit id cupidatat eu exercitation irure anim. Aliqua amet est
									irure eiusmod pariatur sit elit occaecat non qui quis
									consequat quis sit.{" "}
								</Text>
							)}
						</Text>
					</div>

					<div class="flex flex-col gap-2 pb-3.5 border-b-1 border-highlight mt-3.5">
						<details>
							<summary class="flex cursor-pointer">
								<Text variant="subtitle">Título 1</Text>
							</summary>
							<Text
								variant="body"
								class="font-light text-gray-quaternary mt-2.5 block"
							>
								Ad duis nulla consectetur magna consequat incididunt non sit eu
								culpa officia consequat eiusmod. In dolor excepteur excepteur
								adipisicing.... Ad duis nulla consectetur magna consequat
								incididunt non sit eu culpa officia consequat eiusmod. In dolor
								excepteur excepteur adipisicing....
							</Text>
						</details>
					</div>
					<div class="flex flex-col gap-2 pb-3.5 border-b-1 border-highlight mt-3.5">
						<details>
							<summary class="flex cursor-pointer">
								<Text variant="subtitle">Título 2</Text>
							</summary>
							<Text
								variant="body"
								class="font-light text-gray-quaternary mt-2.5 block"
							>
								Ad duis nulla consectetur magna consequat incididunt non sit eu
								culpa officia consequat eiusmod. In dolor excepteur excepteur
								adipisicing....
							</Text>
						</details>
					</div>
				</div>
			</div>
		</Container>
	);
}

function ProductDetails({ page }: Props) {
	if (page) {
		return <Details page={page} />;
	}

	return <NotFound />;
}

export default ProductDetails;
