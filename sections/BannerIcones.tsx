import Image from "deco-sites/std/components/Image.tsx";
import Text from "$store/components/ui/Text.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface BannerIcon {
	src: LiveImage;
	alt: string;
	title: string;
	description: string;
}

export interface Props {
	bannerIcons: BannerIcon[];
}

function BannerIcon(props: BannerIcon) {
	return (
		<div class="flex items-center flex-1">
			<figure class="h-[100px] mr-2.5 relative w-[35%]">
				<Image
					class="h-full object-contain w-full"
					src={props.src}
					alt={props.alt}
					width={111}
					height={100}
					loading="lazy"
				/>
			</figure>
      <div class="w-[75%] flex flex-col">
        <Text class="text-[14px] mb-1.5 sm:text-[16px] font-subtitle" tone="default-inverse">
          {props.title}
        </Text>
        <Text class="text-[14px] sm:text-[16px]" tone="default-inverse">
          {props.description}
        </Text>
      </div>
		</div>
	);
}

export default function BannerIcons({ bannerIcons }: Props) {
	return (
		<div class="w-full bg-gray-quaternary mb-14">
			<div class="max-content mx-auto py-10 px-[5%] w-full flex flex-col justify-between gap-5 sm:(gap-12 flex-row)">
				{bannerIcons.map((item) => (
					<BannerIcon {...item} />
				))}
			</div>
		</div>
	);
}
