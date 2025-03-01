"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useEditorStore from "@/store/useEditorStore";
import { ImagePlus, Upload } from "lucide-react";

function ImageButton() {
	const { editor } = useEditorStore();
	const [isOpen, setIsOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState("");

	const setImage = useCallback(
		(src: string) => {
			if (editor) {
				editor.chain().focus().setImage({ src }).run();
			}
		},
		[editor]
	);

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger onClick={() => setIsOpen(true)} asChild>
				<Button
					variant="ghost"
					className="p-1.5 bg-gray-100 min-w-10 hover:border-gray-500 hover:border hover:bg-primary/20"
				>
					<ImagePlus />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2 flex flex-col gap-2 w-60">
				<Button
					variant={"outline"}
					onClick={() => {
						setIsOpen(false);
						const input = document.createElement("input");
						input.type = "file";
						input.accept = "image/*";
						input.onchange = (e) => {
							const file = (e.target as HTMLInputElement)
								.files?.[0];
							if (file) {
								const reader = new FileReader();
								reader.onload = () => {
									setImage(String(reader.result));
								};
								reader.readAsDataURL(file);
							}
						};
						input.click();
					}}
					className="text-sm"
				>
					<Upload />
					Upload from Computer
				</Button>
				<div className="flex flex-col gap-2 items-end">
					<Input
						placeholder="Paste image URL"
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setImage(imageUrl);
								setImageUrl("");
								setIsOpen(false);
							}
						}}
						autoFocus
					/>
					<Button
						onClick={() => {
							setImage(imageUrl);
							setImageUrl("");
							setIsOpen(false);
						}}
					>
						Apply
					</Button>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default ImageButton;
