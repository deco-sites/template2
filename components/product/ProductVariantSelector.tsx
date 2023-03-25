import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
	product: Product;
}

function VariantSelector({ product }: Props) {
	const possibilities = useVariantPossibilities(product);
	const { url: currentUrl } = product;

	return (
		<ul class="flex flex-col gap-8">
			{Object.keys(possibilities).map((name) => (
				<li class="flex flex-col gap-2">
					<Text variant="caption">{name}</Text>
					<ul class="flex flex-row gap-2">
						{Object.entries(possibilities[name]).map(([url, value]) => (
							<li>
								<a href={url}>
									<Avatar
										// deno-lint-ignore no-explicit-any
										content={value as any}
										disabled={url === currentUrl}
										// variant={name === "COR" ? "color" : "abbreviation"}
										variant="idempotent"
										class="rounded-full border-1 border-accent text-accent flex items-center justify-center min-w-[32px] h-[32px] py-1.5 px-2.5"
									/>
								</a>
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	);
}

export default VariantSelector;
