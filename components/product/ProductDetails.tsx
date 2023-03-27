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
import type {
	ImageObject,
	ProductDetailsPage,
} from "deco-sites/std/commerce/types.ts";

import ProductSelector from "./ProductVariantSelector.tsx";
import Logger from "../../islands/Logger.tsx";
import { useId } from "preact/hooks";
import Slider from "$store/components/ui/Slider.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";

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

function Thumbs({ images }: { images: ImageObject[] }) {
	return (
		<div class="hidden flex-col gap-3 lg:flex">
			{/* <Slider
				class="col-span-full row-span-full scrollbar-none gap-3"
				alignMode="vertical"
				isThumb
			> */}
			{images.map((img, index) => (
				<div
					class="cursor-pointer thumb-active"
					data-slider-thumb-item={index}
					data-thumb-active={index === 0 ? "true" : "false"}
				>
					<Image
						style={{ aspectRatio: "1 / 1" }}
						// class="snap-center min-w-[100vw] sm:min-w-0 sm:w-auto sm:h-[600px]"
						class="w-full"
						sizes="(max-width: 150px) 100vw, 30vw"
						src={img.url!}
						alt={img.alternateName}
						width={150}
						height={150}
						// Preload LCP image for better web vitals
						preload={true}
						loading={"eager"}
					/>
				</div>
			))}
			{/* </Slider> */}
		</div>
	);
}

function Controls() {
	return (
		<>
			<div class="flex items-center justify-center z-10 col-start-1 row-start-2">
				<Button
					class="h-12 w-12"
					variant="icon"
					data-slide="prev"
					aria-label="Previous item"
				>
					<Icon
						class="text-default-inverse"
						size={20}
						id="ChevronLeft"
						strokeWidth={3}
					/>
				</Button>
			</div>
			<div class="flex items-center justify-center z-10 col-start-3 row-start-2">
				<Button
					class="h-12 w-12"
					variant="icon"
					data-slide="next"
					aria-label="Next item"
				>
					<Icon
						class="text-default-inverse"
						size={20}
						id="ChevronRight"
						strokeWidth={3}
					/>
				</Button>
			</div>
		</>
	);
}

function ProductImageItem({ img, lcp }: { img: ImageObject; lcp: boolean }) {
	return (
		<div class="relative h-[360px] min-w-[360px] lg:(h-[587px] min-w-[587px]) overflow-hidden">
			<Picture class="w-full" preload={lcp}>
				<Source
					media="(max-width: 767px)"
					fetchPriority={lcp ? "high" : "auto"}
					src={img.url!}
					width={360}
					height={360}
				/>
				<Source
					media="(min-width: 768px)"
					fetchPriority={lcp ? "high" : "auto"}
					src={img.url!}
					width={587}
					height={587}
				/>
				<img
					class="object-cover w-full sm:h-full"
					loading={lcp ? "eager" : "lazy"}
					src={img.url!}
					alt={img.alternateName}
					style={{ aspectRatio: "1 / 1" }}
				/>
			</Picture>
		</div>
	);
}

function ProductImageCarousel({ images }: { images: ImageObject[] }) {
	const id = useId();
	return (
		<div id={id} class="sm:gap-2 flex flex-row lg:max-w-[703px]">
			<Thumbs images={images} />
			<div class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_48px]">
				<Slider class="col-span-full row-span-full scrollbar-none gap-6">
					{images?.map((image, index) => (
						<ProductImageItem img={image} lcp={index === 0} />
					))}
				</Slider>

				<Controls />
				<SliderControllerJS rootId={id} thumbnailsActive />
			</div>
		</div>
	);
}

function Details({ page }: { page: ProductDetailsPage }) {
	const { breadcrumbList, product } = page;
	const { description, productID, offers, image: images, name, gtin } = product;
	const { price, listPrice, seller, installments } = useOffer(offers);
	const [front, back] = images ?? [];
	const imagesSlider = Array(4).fill(front) as ImageObject[];

	return (
		<Container class="py-5 px-[5%] sm:py-10">
			{/* <Logger message="Dados do produto" info={product} />
			<Logger message="Installments" info={installments} /> */}
			<div class="flex flex-col md:flex-row md:gap-6">
				{/* Image Gallery */}
				<div class="flex flex-row sm:gap-2 md:w-[65%] items-start">
					<ProductImageCarousel images={imagesSlider} />
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
							{seller && (
								<AddToCartButton skuId={productID} sellerId={seller} />
							)}
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
