import Text from "$store/components/ui/Text.tsx";

export interface Props {
	title?: string;
	content: {
		paragraph: string;
		divider?: boolean;
	}[];
}

export default function ContextText(props: Props) {
	return (
		<div class="my-[3.75rem] flex flex-col px-[5%] mx-auto sm:max-w-[920px] 1xl:max-w-[1298px]">
			{props.title && (
				<Text
					variant="title-section"
					class="text-center text-black mb-[1.875rem] font-title"
				>
					{props.title}
				</Text>
			)}
			{props.content.map((content) => (
				<div class="mb-[0.938rem]">
					<Text variant="description-section" class="text-black">
						{content.paragraph}
					</Text>
					{content.divider && (
						<hr class="mt-[0.938rem] border-1 bg-highlight border-highlight" />
					)}
				</div>
			))}
		</div>
	);
}
