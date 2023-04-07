import Text from "$store/components/ui/Text.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { headerHeight } from "./constants.ts";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, image } = item;

  return (
    <li class="group flex items-center mx-9 py-6 relative">
      <a href={href} class="px-4">
        <Text
          class="group-hover:border-black border-solid border-b border-transparent"
          variant="menu"
        >
          {label}
        </Text>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`absolute invisible hover:visible group-hover:visible bg-default z-50 flex items-start justify-center gap-6 border-t-1 border-b-2 border-default  py-[0.625rem] px-[1.875rem] pb-[1.25rem] bg-gray-quaternary`}
            style={{ top: "72px", left: "55%", "transform": "translateX(-50%)"}}
          >
            {/* {image?.src && (
              <Image
                class="p-6"
                src={image.src}
                alt={image.alt}
                width={300}
                height={332}
                loading="lazy"
              />
            )} */}
            <ul class="flex flex-col items-start justify-center">
              {children.map((node) => (
                <li class="mt-4">
                  <a class="hover:underline" href={node.href}>
                    <Text variant="menu" tone="default-inverse">{node.label}</Text>
                  </a>

                  <ul class="flex flex-col gap-1 mt-1 empty-none">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <Text variant="caption" tone="default-inverse">{leaf.label}</Text>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
