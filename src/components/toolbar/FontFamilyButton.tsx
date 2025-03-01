import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useEditorStore from "@/store/useEditorStore";

function FontFamilyButton() {
	const { editor } = useEditorStore();
	const fonts: {
		label: string;
		value: string;
	}[] = [
		{
			label: "Arial",
			value: "Arial",
		},
		{
			label: "Courier New",
			value: "Courier New",
		},
		{
			label: "Georgia",
			value: "Georgia",
		},
		{
			label: "Times New Roman",
			value: "Times New Roman",
		},
		{
			label: "Montserrat",
			value: "Montserrat",
		},
		{
			label: "Tahoma",
			value: "Tahoma",
		},
		{
			label: "Monaco",
			value: "Monaco",
		},
		{
			label: "Comic Sans MS",
			value: "Comic Sans MS",
		},
	];
	return (
		<div>
			<Select
				defaultValue="Arial"
				onValueChange={(value) =>
					editor?.chain().focus().setFontFamily(value).run()
				}
			>
				<SelectTrigger className="w-[180px] p-1.5 bg-gray-100 text-black hover:bg-primary/20 hover:border-gray-500 hover:border">
					<SelectValue placeholder="Font Family" />
				</SelectTrigger>
				<SelectContent>
					{fonts.map((font) => (
						<SelectItem
							key={font.value}
							value={font.value}
							style={{ fontFamily: font.value }}
						>
							{font.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

export default FontFamilyButton;
