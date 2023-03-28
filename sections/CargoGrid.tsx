import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  items: {
    /** @description desktop otimized image */
    desktop?: LiveImage;
    /** @description mobile otimized image */
    mobile: LiveImage;
    /** @description Image's alt text */
    alt: string;
    titleItem: string;
    subtitleItem: string;
    description: string;
  }[]
}

export default function CargoGrid(props: Props){
  return (
    <div class="flex flex-row mb-[3.75rem] mx-auto px-[5%] gap-12">
      {props.items.map((item) => (
        <div class="flex-1 flex flex-col items-center justify-center">
          <div class="max-w-[240px] mb-[2.5rem] overflow-hidden rounded-full">
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={item.mobile}
                width={160}
                height={160}
              />
              <Source
                media="(min-width: 768px)"
                src={item.desktop ?? item.mobile}
                width={240}
                height={240}
              />
              <img
                class="w-full h-auto"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={item.mobile}
                alt={item.alt}
                decoding="async"
                loading="lazy"
                style={{ aspectRatio: "1/1" }}
              />
            </Picture>
          </div>
          <div class="flex flex-col items-center">
            <h3 class="text-[1.125rem] text-black font-bold leading-[1.5] text-center">
              {item.titleItem}
            </h3>
            <span class="text-highlight uppercase text-[0.875rem] text-center">
              {item.subtitleItem}
            </span>
            <p class="text-[0.875rem] mt-[1.25rem] mb-[0.625rem] leading-[1.5] text-center">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}