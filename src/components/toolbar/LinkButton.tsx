"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useEditorStore from "@/store/useEditorStore";
import { Link2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

function LinkButton() {
	const { editor } = useEditorStore();
	const [value, setValue] = useState<string>(
		editor?.getAttributes("link").href || ""
	);
	const [isOpen, setIsOpen] = useState(false);
	const onChange = (href: string) => {
		editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
		setValue("");
	};

	return (
		<div>
			<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
				<DropdownMenuTrigger onClick={() => setIsOpen(true)} asChild>
					<Button
						variant={"ghost"}
						className="p-1.5 bg-gray-100 min-w-10 hover:border-gray-500 hover:border hover:bg-primary/20"
					>
						<Link2Icon style={{ color: value }} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="p-2 flex items-center gap-x-2">
					<Input
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="https://example.com"
						autoFocus
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								onChange(value);
								setIsOpen(false);
							}
						}}
					/>
					<Button
						onClick={() => {
							onChange(value);
							setIsOpen(false);
						}}
					>
						Apply
					</Button>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default LinkButton;
