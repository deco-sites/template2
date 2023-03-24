import Text from "$store/components/ui/Text.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";

export interface Props {
  /** @description desktop otimized image */
	desktop: LiveImage;
	/** @description mobile otimized image */
	mobile: LiveImage;
	/** @description Image's alt text */
	alt: string;
  /** @description when user clicks on the image, go to this link */
  href: string;
/** @description Image text title */
  title: string;
}

export default function BannerHorizontal(props: Props){
  const { alt, mobile, desktop, href, title } = props;
  return (
    <div class="relative max-content overflow-y-hidden px-[5%] mb-14 mx-auto">
      <a href={href ?? "#"} aria-label={alt}>
        <Picture class="w-full">
          <Source
            media="(max-width: 767px)"
            src={mobile}
            width={357}
            height={179}
          />
          <Source
            media="(min-width: 768px)"
            src={desktop}
            width={1280}
            height={256}
          />
          <img
            class="object-cover w-full sm:h-full"
            loading={"lazy"}
            src={desktop}
            alt={alt}
          />
        </Picture>

          <div
            class="absolute top-0 bottom-0 left-0 right-0  m-auto max-h-min w-[90%] flex flex-col justify-center items-center gap-4 p-4 rounded sm:(max-w-[90%]  fit-content transform-none)"
          >
            <Text variant="title" tone="highlight" class="font-black text-center sm:text-title-desktop">
              {title}
            </Text>
          </div>

      </a>
  </div>
  )
}