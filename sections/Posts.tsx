import Image from "deco-sites/std/components/Image.tsx";
import Text from "../components/ui/Text.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Post {
	title: string;
	description: string;
	alt: string;
	href: string;
	src: LiveImage;
}

export interface Props {
	titleSession: string;
	posts: Post[];
}

function Post(props: Post) {
	return (
		<a href={props.href} class="flex flex-col flex-1" alt={props.alt}>
			<figure class="relative w-full">
				<Image
					class="h-full object-cover w-full"
					src={props.src}
					alt={props.alt}
					width={357}
					height={236}
					loading="lazy"
				/>
			</figure>
			<div class="mt-5 text-center">
				<h2 class="text-[18px] font-title font-subtitle mb-2.5 sm:(text-[21px]">
					{props.title}
				</h2>
				<p class="text-description font-base mb-2.5 sm:text-[19px]"> {props.description}</p>
			</div>
		</a>
	);
}

export default function Posts(props: Props) {
	return (
		<div class="w-full mb-14">
			<div class="w-full">
				<div class="block w-full  text-center background-title py-8 mb-5 sm:(py-9 mb-6)">
					<Text
						variant="title"
						tone="highlight"
						class="font-black text-center sm:text-title-desktop"
					>
						{props.titleSession}
					</Text>
				</div>
				<div class="flex flex-col gap-5 max-content px-[5%] sm:flex-row">
					{props.posts.map((post) => (
						<Post {...post} />
					))}
				</div>
			</div>
		</div>
	);
}
