import { useMemo } from "preact/hooks";
import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { JSX } from "preact";
import Button from "../ui/Button.tsx";
import { useSignal } from "https://esm.sh/v111/@preact/signals@1.0.3/X-ZS8q/dist/signals";

const SORT_QUERY_PARAM = "sort";

// TODO: The search query should also be from a commerce schema
const options = [
	// { value: "", label: "Relevância" },
	{ value: "price:desc", label: "Maior Preço" },
	{ value: "price:asc", label: "Menor Preço" },
	{ value: "orders:desc", label: "Mais Pedidos" },
	{ value: "name:asc", label: "Nome (A -> Z)" },
	{ value: "name:desc", label: "Nome (Z -> A)" },
	{ value: "release:desc", label: "Lançamentos" },
	{ value: "discount:desc", label: "Maior Desconto" },
];

const useSort = () =>
	useMemo(() => {
		const urlSearchParams = new URLSearchParams(window.location?.search);
		return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
	}, []);

// TODO: Replace with "search utils"
const applySort = (value: string) => {
	const urlSearchParams = new URLSearchParams(window.location.search);

	urlSearchParams.set(SORT_QUERY_PARAM, value);
	window.location.search = urlSearchParams.toString();
};

function Sort() {
	const sort = useSort();
	const open = useSignal(false);

	return (
		<div class="flex-col gap-2 px-4">
			{/* <select
        id="sort"
        name="sort"
        onInput={applySort}
        class="w-min h-[36px] px-1 rounded m-2 text-button font-button text-default hover:bg-hover cursor-pointer outline-none"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value} selected={value === sort}>
            <Text variant="caption">{label}</Text>
          </option>
        ))}
      </select> */}
			<div
				class="flex justify-between items-center w-full"
				onClick={() => (open.value = !open.value)}
			>
				<Text variant="body" class="font-bold">
					Ordernar
				</Text>
				<Button variant="icon">
					<Icon
						class={open.value === true ? "hidden" : "block"}
						id="Plus"
						height={20}
						width={20}
						strokeWidth={1.5}
					/>
					<Icon
						class={open.value === true ? "block" : "hidden"}
						id="Minus"
						height={20}
						width={20}
						strokeWidth={1.5}
					/>
				</Button>
			</div>
			<div class={`flex flex-col ${open.value === true ? "flex" : "hidden"}`}>
				{options.map(({ value, label }) => (
					<div
						key={value}
						value={value}
						// selected={value === sort}
						class="flex gap-1.5 h-6"
            onClick={() => applySort(value)}
					>
						<div
							class={`w-[14px] h-[15px] border rounded text-[12px] flex justify-center items-center pt-0.5`}
						>
							{value === sort && `✔`}
						</div>
						<Text variant="caption">{label}</Text>
					</div>
				))}
			</div>
		</div>
	);
}

export default Sort;
