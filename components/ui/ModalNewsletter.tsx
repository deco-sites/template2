import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import Button from "./Button.tsx";
import { useRef, useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

export interface Props {
	title: string;
	description: string;
	image: LiveImage;
	/** @description mobile otimized image */
	alt: string;
}

const key = "modal-newsletter";
const ACCEPTED = "viwed";
const DELAY_ANIMATION_TIME = 550;

export default function ModalNewsletter(props: Props) {
	const modalRef = useRef(null);
	const modalOpen = useSignal(false);
	const delayToClose = useSignal(false);

	useEffect(() => {
		function verify() {
			const consent = globalThis.localStorage.getItem(key);

			if (consent !== ACCEPTED) {
				modalOpen.value = true;
				delayToClose.value = true;
			}
		}

		globalThis.addEventListener("scroll", verify, { once: true });

		return () => globalThis.removeEventListener("scroll", verify);
	}, []);

	function onClose() {
		modalOpen.value = false;
		setTimeout(() => {
			delayToClose.value = false;
		}, DELAY_ANIMATION_TIME);
	}

	function submit() {
		globalThis.localStorage.setItem(key, ACCEPTED);
		onClose();
	}

	const modalClass = modalOpen.value || delayToClose.value ? `` : `hidden`;

	return (
		<>
			<div
				ref={modalRef}
				class={`w-screen h-screen max-h-full flex items-center justify-center fixed top-0 left-0 z-50 bg-black bg-opacity-50 transition-default ${modalClass} ${
					modalOpen.value ? `animate-fade-in` : `animate-fade-out`
				}`}
			>
				<div class="max-h-[500px] w-[90%] md:w-[50vw] bg-white shadow-modal rounded overflow-hidden">
					<div class="relative flex">
						<Button
							variant="blank"
							class="absolute top-0 right-0 w-[1.875rem] h-[1.875rem] flex rounded-full m-[0.625rem] bg-[#f3f4f6] text-[1.563rem] text-[#9ca3bb] z-20 cursor-pointer box-border items-center justify-center"
							onClick={onClose}
							alt="Fechar modal de newsletter"
						>
							×
						</Button>
						<div class="w-full min-h-[500px] absolute md:(relative w-[50%])">
							<Image
								src={props.image}
								alt={props.alt}
								width={341}
								height={500}
								class="object-cover object-center h-full w-full md:(absolute top-0 left-0)"
								loading="lazy"
							/>
						</div>
						<div class="flex flex-col z-10 p-[1.875rem] min-h-[500px] md:(w-[50%])">
							<h2 class="text-[1.75rem] leading-[1.875rem] text-center mb-[0.938rem] text-default font-semibold">
								{props.title}
							</h2>
							<p class="text-[0.875rem] leading-[1.5] text-center mb-[0.938rem] text-default">
								{props.description}
							</p>

							<form
								class="flex flex-col"
								onSubmit={(ev) => {
									ev.preventDefault();
									submit();
								}}
							>
								<label
									for="newsletter-mail"
									class="text-[0.75rem] mb-[0.188rem] block font-semibold"
								>
									Email
								</label>
								<input
									id="newsletter-mail"
									class="w-full p-[0.625rem] h-[2.625rem] sm:h-[2.625rem] bg-gray-primary"
									required={true}
									type="email"
								/>
								<Button
									variant="newsletter"
									class="mt-[1.25rem]"
									type="submit"
									alt="Enviar email via modal newsletter"
								>
									Enviar
								</Button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
