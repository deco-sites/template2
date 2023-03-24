import Text from "$store/components/ui/Text.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import Button from "./Button.tsx";

export interface GridBanner {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  action: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text description */
    description: string;
    /** @description Button label */
    label?: string;
  };
}

function BannerItem(props: GridBanner) {
  const { alt, mobile, desktop, action } = props;

  return (
    <div class="relative w-full sm:w-1/3 overflow-hidden group ">
      <a href={action?.href ?? "#"} aria-label={action?.label}>
        <Picture class="w-full">
          <Source
            media="(max-width: 767px)"
            src={mobile}
            width={351}
            height={351}
          />
          <Source
            media="(min-width: 768px)"
            src={desktop}
            width={391}
            height={391}
          />
          <img
            class="object-cover w-full sm:h-full transition ease-in-out duration-500 group-hover:scale-150 group-hover:blur-sm"
            loading={"lazy"}
            src={desktop}
            alt={alt}
          />
        </Picture>
        {action && (
          <div class="absolute top-0 bottom-0 left-0 right-0  m-auto max-h-min w-[90%] flex flex-col justify-center items-center gap-4 p-4 rounded sm:(max-w-[90%]  fit-content transform-none) " // style={{ backdropFilter: "blur(8px)" }}
          >
            <Text
              variant="description"
              tone="highlight"
              class="text-[18px] sm:text-[22px] text-center"
            >
              {action.description}
            </Text>
            {action.label && (
              <Button variant="quaternary">{action.label}</Button>
            )}
          </div>
        )}
      </a>
    </div>
  );
}

export interface Props {
  gridBanners: GridBanner[];
}

export default function ThreeGridBanners({ gridBanners }: Props) {
  return (
    <div class="flex gap-[20px] flex-col mt-20 w-full max-content mx-auto px-[5%] sm:flex-row mb-14">
      {gridBanners.map((banner) => <BannerItem {...banner} />)}
    </div>
  );
}
