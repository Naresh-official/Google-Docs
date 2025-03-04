"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { TextCursorInput } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

function RenameButton({
	title,
	documentId,
	closeMenu,
}: {
	title: string;
	documentId: Id<"documents">;
	closeMenu: () => void;
}) {
	const [newTitle, setNewTitle] = useState(title);
	const [open, setOpen] = useState(false);
	const rename = useMutation(api.documents.rename);
	function handleRename(event: React.FormEvent) {
		event.preventDefault();
		rename({ _id: documentId, title: newTitle });
		closeMenu();
		setOpen(false);
	}
	return (
		<DropdownMenuItem asChild>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger
					onClick={() => setOpen(true)}
					className="px-2 py-1.5 w-full flex items-center gap-2 text-start rounded-sm hover:bg-accent"
				>
					<TextCursorInput className="w-5 h-5" />
					Rename
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Rename Document</DialogTitle>
					</DialogHeader>
					<div>
						<form className="flex gap-2" onSubmit={handleRename}>
							<Input
								value={newTitle}
								onChange={(e) => setNewTitle(e.target.value)}
							/>
							<Button type="submit">Save</Button>
						</form>
					</div>
				</DialogContent>
			</Dialog>
		</DropdownMenuItem>
	);
}

export default RenameButton;
