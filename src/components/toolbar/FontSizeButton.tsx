"use client";
import useEditorStore from "@/store/useEditorStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

function FontSizeButton() {
	const { editor } = useEditorStore();
	const [value, setValue] = useState<string>("16");
	const [prevValue, setPrevValue] = useState<string>("16"); // Store previous valid value

	// Update font size when text selection changes
	useEffect(() => {
		if (!editor) return;

		// Function to update font size from selected text
		const updateFontSizeFromSelection = () => {
			const fontSize =
				editor.getAttributes("fontSize")?.fontSize?.replace("px", "") ||
				"16";
			if (fontSize !== value) {
				setValue(fontSize);
				setPrevValue(fontSize);
			}
		};

		// Listen for selection updates
		editor.on("selectionUpdate", updateFontSizeFromSelection);

		// Cleanup listener on unmount
		return () => {
			editor.off("selectionUpdate", updateFontSizeFromSelection);
		};
	}, [editor, value]);

	const updateFontSize = (fontSize: string) => {
		const size = parseInt(fontSize);

		// If out of bounds, reset to previous valid value
		if (isNaN(size) || size < 1 || size > 96) {
			setValue(prevValue);
			return;
		}

		editor?.chain().focus().setFontSize(`${size}px`).run();
		setPrevValue(fontSize); // Update previous valid value
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Allow user to type freely but don't apply change yet
		setValue(e.target.value);
	};

	const handleInputSubmit = () => {
		updateFontSize(value);
	};

	const handleIncrement = () => {
		const size = Math.min(parseInt(value) + 1, 96).toString();
		setValue(size);
		updateFontSize(size);
	};

	const handleDecrement = () => {
		const size = Math.max(parseInt(value) - 1, 1).toString();
		setValue(size);
		updateFontSize(size);
	};

	return (
		<div className="flex items-center gap-x-1">
			<Button
				variant="ghost"
				onClick={handleDecrement}
				className="w-7 h-7 hover:bg-primary/10"
			>
				<MinusIcon />
			</Button>
			<Input
				type="text"
				value={value}
				onChange={handleInputChange} // Allow typing freely
				onBlur={handleInputSubmit} // Apply change on blur
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleInputSubmit();
					}
				}}
				className="w-14 bg-gray-100 min-w-10 text-sm hover:border-gray-500 hover:border hover:bg-primary/20 text-center"
			/>
			<Button
				variant="ghost"
				onClick={handleIncrement}
				className="w-7 h-7 hover:bg-primary/10"
			>
				<PlusIcon />
			</Button>
		</div>
	);
}

export default FontSizeButton;
