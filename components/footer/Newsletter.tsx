import Text from "$store/components/ui/Text.tsx";
import Icon from "../ui/Icon.tsx";

function Newsletter() {
	return (
		<div class="flex flex-col items-center gap-2.5">
			<div class="flex flex-col gap-2 max-w-[400px]">
				<Text variant="heading-2" tone="default-inverse" class="text-[2.375rem]">
					Newsletter
				</Text>
			</div>
			<form class="relative flex flex-row items-center gap-2 font-body text-body w-full sm:w-[408px]">
				<input
					class="py-2 px-3 flex-grow bg-footer rounded text-default-inverse border-1 border-default"
					placeholder="Seu e-mail"
				/>
				<button
					class="py-2 px-3 bg-interactive-inverse rounded"
					type="bgutton" // prevent form's default behavior
				>
					<Icon id="icon-next" width={20} height={20} strokeWidth={2} />
				</button>
			</form>
			<div class="flex flex-col gap-2 max-w-[400px]">
				<Text variant="caption" tone="default-inverse">
					Lorem ipsum dolor sit amet
				</Text>
			</div>
		</div>
	);
}

export default Newsletter;
