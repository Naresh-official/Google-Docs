"use client";

import useEditorStore from "@/store/useEditorStore";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type Level } from "@tiptap/extension-heading";
import { useEffect, useState } from "react";

function HeadingButton() {
	const { editor } = useEditorStore();
	const [currentHeading, setCurrentHeading] = useState("0");

	const headings = [
		{ label: "Normal", value: 0, fontSize: "16px" },
		{ label: "Heading 1", value: 1, fontSize: "32px" },
		{ label: "Heading 2", value: 2, fontSize: "24px" },
		{ label: "Heading 3", value: 3, fontSize: "20px" },
		{ label: "Heading 4", value: 4, fontSize: "18px" },
	];

	useEffect(() => {
		if (!editor) return;

		const updateHeading = () => {
			let found = false;
			for (const heading of headings) {
				if (editor.isActive("heading", { level: heading.value })) {
					setCurrentHeading(heading.value.toString());
					found = true;
					break;
				}
			}
			if (!found) setCurrentHeading("0");
		};

		editor.on("selectionUpdate", updateHeading);
		editor.on("transaction", updateHeading);

		return () => {
			editor.off("selectionUpdate", updateHeading);
			editor.off("transaction", updateHeading);
		};
	}, [editor]);

	return (
		<div>
			<Select
				value={currentHeading}
				onValueChange={(value) => {
					if (value === "0") {
						editor?.chain().focus().setParagraph().run();
					} else {
						editor
							?.chain()
							.focus()
							.setHeading({ level: parseInt(value) as Level })
							.run();
					}
				}}
			>
				<SelectTrigger className="w-[180px] p-1.5 bg-gray-100 text-black">
					<SelectValue placeholder="Text Styles" />
				</SelectTrigger>
				<SelectContent>
					{headings.map((head) => (
						<SelectItem
							key={head.value}
							value={head.value.toString()}
							style={{ fontSize: head.fontSize }}
						>
							{head.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

export default HeadingButton;
