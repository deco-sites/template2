import Text from "$store/components/ui/Text.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface ImageProp {
  src: LiveImage;
  width?: number;
  height?: number;
}

export interface Props {
  /** @description desktop otimized image */
  desktop: ImageProp;
  /** @description mobile otimized image */
  mobile: ImageProp;
  /** @description Image's alt text */
  alt: string;

  

  upperTitle: string;
  title: string;
  description: string;
  preload?: boolean;
  aspectRatio?: string;
}

export default function SectionBanner(props: Props){
  return (
    <div class="relative flex flex-col mb-[3.75rem]">
      <figure>
        <Picture class="w-full h-auto" preload={props.preload}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={props.preload ? "high" : "auto"}
            src={props.mobile.src}
            // width={397}
            // height={143}
            width={props.mobile.width ?? 397}
            height={props.mobile.height ?? 143}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={props.preload  ? "high" : "auto"}
            src={props.desktop.src}
            width={props.desktop.width ?? 1440}
            height={props.desktop.height ?? 518}
          />
          <img
            class="object-cover w-full sm:h-full"
            loading={props.preload ? "eager" : "lazy"}
            src={props.desktop.src}
            alt={props.alt}
            style={{ aspectRatio: props.aspectRatio ?? "1920/690"}}
          />
        </Picture>
      </figure>
      <div class="bg-gray-primary flex flex-col p-[1.875rem] h-[fit-content] sm:(absolute top-0 bottom-0 left-0 right-0 fit-content m-auto transform-none bg-transparent)">
        <Text variant="upper-title" class="text-highlight text-center mb-[0.313rem] sm:text-white sm:text-left">
          {props.upperTitle}
        </Text>
        <Text variant="title-section" class="text-highlight text-center mb-[0.625rem] font-title sm:text-white sm:text-left">
          {props.title}
        </Text>
        <Text variant="description-section" class="text-highlight text-center mb-[0.625rem] sm:text-white sm:text-left">
          {props.description}
        </Text>
      </div>
    </div>
  )
}