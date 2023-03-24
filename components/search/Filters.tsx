import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import type {
  Filter,
  FilterToggle,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";
import { useSignal } from "https://esm.sh/v111/@preact/signals@1.0.3/X-ZS8q/dist/signals";
import Button from "../ui/Button.tsx";
import Icon from "../ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  class?: string;
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map(({ label, value, url, selected, quantity }) => {
        if (key === "cor") {
          return (
            <a
              href={url}
              class="p-[1px] border-2 border-gray-secondary flex items-center justify-center rounded overflow-hidden"
            >
              <Avatar
                // deno-lint-ignore no-explicit-any
                content={value as any}
                disabled={selected}
                variant="color"
              />
            </a>
          );
        }

        if (key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={label}
                disabled={selected}
                variant="abbreviation"
              />
            </a>
          );
        }

        return (
          <a href={url} class="flex items-center gap-2">
            <input type="checkbox" checked={selected} class="hidden" />
            <Text variant="caption">{label}</Text>
            <Text tone="subdued" variant="caption">
              ({quantity})
            </Text>
          </a>
        );
      })}
    </ul>
  );
}

function FilterItem(filter: FilterToggle) {
  const open = useSignal(false || filter.key === "cor");

  return (
    <li class="flex flex-col">
      <div
        class="flex justify-between items-center w-full py-2"
        onClick={() => (open.value = !open.value)}
      >
        <Text variant="body" class="font-bold">
          {filter.label}
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
      <div class={`${open.value === true ? "flex" : "hidden"}`}>
        <FilterValues {...filter} />
      </div>
    </li>
  );
}

export default function Filters({ filters, class: _class = "" }: Props) {
  return (
    <ul class={`flex flex-col gap-2 p-4 ${_class}`}>
      {filters.filter(isToggle).map((filter) => <FilterItem {...filter} />)}
    </ul>
  );
}
