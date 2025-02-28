import { CirclePicker, ColorResult } from "react-color";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useEditorStore from "@/store/useEditorStore";
import { Baseline } from "lucide-react";
import { Button } from "./ui/button";

function TextColorButton() {
	const { editor } = useEditorStore();
	const value = editor?.getAttributes("textStyle")?.color || "#000000";
	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setColor(color.hex).run();
	};
	const colors = [
		"#000000", // Black
		"#333333", // Dark Gray
		"#666666", // Gray
		"#999999", // Light Gray
		"#0B5394", // Dark Blue
		"#3C78D8", // Medium Blue
		"#6FA8DC", // Light Blue
		"#ADD8E6", // Sky Blue
		"#990000", // Dark Red
		"#CC0000", // Bright Red
		"#E06666", // Light Red
		"#38761D", // Dark Green
		"#6AA84F", // Bright Green
		"#93C47D", // Light Green
		"#674EA7", // Dark Purple
		"#8E7CC3", // Bright Purple
		"#E69138", // Dark Orange
		"#FFD966", // Gold (Yellowish Text)
	];

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Button
						variant={"ghost"}
						className="p-1.5 bg-gray-100 min-w-10 hover:border-gray-500 hover:border"
					>
						<Baseline style={{ color: value }} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<CirclePicker
							color={value}
							colors={colors}
							onChange={onChange}
						/>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default TextColorButton;
