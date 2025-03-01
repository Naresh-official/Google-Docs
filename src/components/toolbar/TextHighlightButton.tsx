import { CirclePicker, ColorResult } from "react-color";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useEditorStore from "@/store/useEditorStore";
import { Baseline, Highlighter } from "lucide-react";
import { Button } from "../ui/button";

function TextHighlightButton() {
	const { editor } = useEditorStore();
	const value = editor?.getAttributes("highlight")?.color || "#000000";
	const onChange = (color: ColorResult) => {
		editor?.chain().focus().toggleHighlight({ color: color.hex }).run();
	};
	const highlightColors = [
		"#FFF2CC", // Light Yellow
		"#FFEB3B", // Bright Yellow
		"#FFD966", // Golden Yellow
		"#FFC107", // Dark Yellow (Amber)
		"#D0E0E3", // Light Blue
		"#A4C2F4", // Sky Blue
		"#76D7C4", // Soft Teal
		"#00FFFF", // Bright Cyan
		"#D9EAD3", // Pale Green
		"#B6D7A8", // Light Green
		"#B3FF66", // Lime Green
		"#A8E6CF", // Soft Mint
		"#F4CCCC", // Light Pink
		"#FCE5CD", // Soft Peach
		"#FFABAB", // Light Coral
		"#FFB74D", // Bright Orange
		"#D7BDE2", // Lavender
		"#EDEDED", // Light Gray
	];

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant={"ghost"}
						className="p-1.5 bg-gray-100 min-w-10 hover:border-gray-500 hover:border hover:bg-primary/20"
					>
						<Highlighter style={{ color: value }} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<CirclePicker
							color={value}
							colors={highlightColors}
							onChange={onChange}
						/>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default TextHighlightButton;
