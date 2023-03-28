import Text from "$store/components/ui/Text.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
	upperTitle: string;
	title: string;
	description: string;
	/** @description desktop otimized image */
	desktop: LiveImage;
	/** @description mobile otimized image */
	mobile: LiveImage;
	/** @description Image's alt text */
	alt: string;
}

export default function ContentSideBySide(props: Props) {
	return (
		<div class="mb-[3.75rem] px-[5%] mx-auto sm:max-w-[920px] 1xl:max-w-[1298px]">
			<div class="flex flex-col gap-[2.5rem] justify-between items-center md:flex-row">
				<div class="md:w-1/2">
					<Picture>
						<Source
							media="(max-width: 767px)"
							src={props.mobile}
							width={188}
							height={188}
						/>
						<Source
							media="(min-width: 768px)"
							src={props.desktop}
							width={393}
							height={393}
						/>
						<img
							class="w-full h-auto"
							sizes="(max-width: 640px) 100vw, 30vw"
							src={props.desktop}
							alt={props.alt}
							decoding="async"
							loading="lazy"
							style={{ aspectRatio: "1/1" }}
						/>
					</Picture>
				</div>
				<div class="flex flex-col md:pl-[3rem] md:w-1/2">
					<Text variant="upper-title" class="text-black mb-[0.313rem]">
						{props.upperTitle}
					</Text>
					<Text
						variant="title-section"
						class="text-black  mb-[0.625rem] font-title "
					>
						{props.title}
					</Text>
					<Text variant="description-section" class="text-black  mb-[0.625rem]">
						{props.description}
					</Text>
				</div>
			</div>
		</div>
	);
}
