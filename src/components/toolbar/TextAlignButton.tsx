"use client";

import useEditorStore from "@/store/useEditorStore";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

function TextAlignButton() {
	const { editor } = useEditorStore();
	const [currentAlignment, setCurrentAlignment] = useState("left");

	const alignments = [
		{ label: "Left", value: "left", icon: AlignLeft },
		{ label: "Center", value: "center", icon: AlignCenter },
		{ label: "Right", value: "right", icon: AlignRight },
		{ label: "Justify", value: "justify", icon: AlignJustify },
	];

	useEffect(() => {
		if (!editor) return;

		const updateAlignment = () => {
			let active = false;
			for (const align of alignments) {
				if (editor.isActive({ textAlign: align.value })) {
					setCurrentAlignment(align.value);
					active = true;
					break;
				}
			}
			if (!active) setCurrentAlignment("left");
		};

		editor.on("selectionUpdate", updateAlignment);
		editor.on("transaction", updateAlignment);

		return () => {
			editor.off("selectionUpdate", updateAlignment);
			editor.off("transaction", updateAlignment);
		};
	}, [editor]);

	return (
		<div>
			<Select
				value={currentAlignment}
				onValueChange={(value) => {
					editor?.chain().focus().setTextAlign(value).run();
				}}
			>
				<SelectTrigger
					className="p-1.5 bg-gray-100 text-black hover:bg-primary/20 hover:border-gray-500 hover:border"
					title="Text Alignment"
				>
					<SelectValue placeholder="Text Alignment" />
				</SelectTrigger>
				<SelectContent className="min-w-10 flex flex-row items-center gap-2">
					{alignments.map((align) => (
						<SelectItem
							key={align.value}
							value={align.value}
							aria-label={align.label}
							title={align.label}
						>
							<align.icon />
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

export default TextAlignButton;
