import Button from "../components/ui/Button.tsx";
import Text from "../components/ui/Text.tsx";

const fiels = [
	{
		label: "NOME",
		id: "NOME",
		placeholder: "Seu nome completo...",
		required: true,
	},
	{
		label: "email",
		id: "email",
		placeholder: "Seu email...",
		required: true,
	},
	{
		label: "telefone",
		id: "telefone",
		placeholder: "Seu telefone...",
		required: false,
	},
	{
		label: "assunto",
		id: "assunto",
		placeholder: "O assunto...",
		required: true,
	},
	{
		label: "mensagem",
		id: "mensagem",
		placeholder: "A sua mensagem...",
		required: true,
	},
];

export default function FormAtendimento() {
	return (
		<div
			class={`mb-[3.75rem] flex flex-col px-[5%] mx-auto sm:max-w-[920px] 1xl:max-w-[1298px]`}
		>
			<Text
				variant="blank"
				class={`text-left text-[1.625rem] text-black mb-[1.625rem] font-extrabold font-title`}
			>
				Atendimento
			</Text>
			<form class="flex flex-col w-full">
				{fiels.map((field) => (
					<div class="flex flex-col mb-[1.25rem]">
						<label
							for={field.id}
							class="uppercase text-[0.75rem] mb-[0.188rem] block"
						>
							{field.label} {field.required && `*`}
						</label>
						<input
							id={field.id}
							placeholder={field.placeholder}
							class="w-full border-1 border-highlight rounded p-[0.625rem] h-[2.625rem] sm:h-[2.625rem]"
							required={field.required}
						/>
					</div>
				))}
				<Button variant="quaternary" class="h-[2.625rem]">
					Enviar mensagem
				</Button>
			</form>
		</div>
	);
}
