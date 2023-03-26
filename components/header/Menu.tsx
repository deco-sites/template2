import Icon from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useSignal } from "@preact/signals";
import type { INavItem } from "./NavItem.tsx";

export interface Props {
	items: INavItem[];
}

const DELAY_ANIMATION_TIME = 650;

function MenuItem({ item, level = 0 }: { item: INavItem; level?: number }) {
	const open = useSignal(false);
	const delayToClose = useSignal(false);
	const hasChildren = Array.isArray(item.children) && item.children.length > 0;

	const title = (
		<Text
			class="flex-grow min-h-[40px] flex items-center justify-start"
			variant={level === 0 ? "menu" : "caption"}
			tone="highlight"
		>
			{item.label}
		</Text>
	);

	const titleSubmenu = (
		<div class="flex px-[5%] h-[50px] w-full items-center justify-center border-b-1 border-highlight border-opacity-[0.15]">
			<Button
				variant="icon"
				class="mr-auto"
				onClick={() => {
					open.value = false;
					setTimeout(() => {
						delayToClose.value = false;
					}, DELAY_ANIMATION_TIME);
				}}
			>
				<Icon
					id="ChevronLeft"
					width={20}
					height={20}
					strokeWidth={2}
					class="text-highlight"
				/>
			</Button>
			<Text
				class="flex opacity-40 mr-auto -ml-[35px]"
				variant="submenu"
				tone="highlight"
			>
				{item.label}
			</Text>
		</div>
	);

	return (
		<li>
			<div
				class={`flex justify-between items-center w-full py-2 px-4 border-b-1 border-highlight border-opacity-[0.15]  ${
					level > 0 ? "pl-2" : ""
				}`}
				onClick={() => {
					if (hasChildren) {
						open.value = true;
						delayToClose.value = true;
					}
				}}
			>
				{hasChildren ? (
					title
				) : (
					<a class="w-full inline-block" href={item.href}>
						{title}
					</a>
				)}

				{hasChildren && (
					<Button variant="icon" class="opacity-[0.5]">
						<Icon
							class={"block"}
							id="ChevronRight"
							height={20}
							width={20}
							strokeWidth={1.5}
						/>
					</Button>
				)}
			</div>

			{hasChildren && (
				<ul class={`flex-col px-4 ${open.value === true ? "flex" : "hidden"}`}>
					{/* <li>
            <a href={item.href} class="w-full py-2 pl-2 inline-block">
              <Text class="underline" variant="caption">
                Ver todos
              </Text>
            </a>
          </li> */}
					{item.children!.map((node) => (
						<MenuItem item={node} level={level + 1} />
					))}
				</ul>
			)}
			{hasChildren && (open.value === true || delayToClose.value === true) && (
				<div
					class={`${
						open.value === true ? "animate-slide-left" : "animate-slide-to-hide"
					} w-full h-full z-[${level + 1}] absolute top-0 left-0 bg-white`}
					style={{
						animationFillMode: "forwards",
					}}
				>
					{titleSubmenu}
					<ul class={`flex-col px-4`}>
						{/* <li>
            <a href={item.href} class="w-full py-2 pl-2 inline-block">
              <Text class="underline" variant="caption">
                Ver todos
              </Text>
            </a>
          </li> */}
						{item.children!.map((node) => (
							<MenuItem item={node} level={level + 1} />
						))}
					</ul>
				</div>
			)}
		</li>
	);
}

function Menu({ items }: Props) {
	return (
		<>
			<ul class="flex flex-col overflow-x-hidden">
				{items.map((item) => (
					<MenuItem item={item} />
				))}
			</ul>

			<ul class="flex flex-col">
				<li>
					<a
						class="flex items-center gap-4 px-[20px] py-[13px] border-b-1 border-highlight border-opacity-[0.15]"
						href="https://www.deco.cx"
					>
						<Icon id="icon-cart" width={20} height={20} strokeWidth={2} />
						<Text variant="menu" tone="highlight">
							Carrinho
						</Text>
					</a>
				</li>
				{/* <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="Heart" width={20} height={20} strokeWidth={2} />
            <Text variant="caption">Lista de desejos</Text>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="MapPin" width={20} height={20} strokeWidth={2} />
            <Text variant="caption">Nossas lojas</Text>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="Phone" width={20} height={20} strokeWidth={2} />
            <Text variant="caption">Fale conosco</Text>
          </a>
        </li> */}
				<li>
					<a
						class="flex items-center gap-4 px-[20px] py-[13px] border-b-1 border-highlight border-opacity-[0.15]"
						href="https://www.deco.cx"
					>
						<Icon id="icon-account" width={20} height={20} strokeWidth={2} />
						<Text variant="menu" tone="highlight">
							Minha conta
						</Text>
					</a>
				</li>
			</ul>
		</>
	);
}

export default Menu;
