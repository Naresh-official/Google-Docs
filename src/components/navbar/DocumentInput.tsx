"use client";

import { CloudUpload, LoaderIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface DocumentInputProps {
	data: Doc<"documents">;
}

function DocumentInput({ data }: DocumentInputProps) {
	const [value, setValue] = useState<string>(data.title);
	const [isPending, setIsPending] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const renameDocument = useMutation(api.documents.rename);
	async function handleRename(event: React.FormEvent) {
		setIsPending(true);
		event.preventDefault();
		await renameDocument({ _id: data._id, title: value });
		inputRef.current?.blur();
		setIsPending(false);
	}

	return (
		<div className="flex items-center gap-2 pt-2 text-muted-foreground">
			<form onSubmit={handleRename}>
				<input
					className="outline-none bg-transparent pl-1 w-40 hover:border-gray-300 border-2 rounded-md focus:border-gray-300 border-transparent border-dashed"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onClick={(e) => e.currentTarget.select()}
					ref={inputRef}
				/>
			</form>
			{isPending ? (
				<LoaderIcon className="w-5 h-5 animate-spin" />
			) : (
				<CloudUpload className="w-5 h-5" />
			)}
		</div>
	);
}

export default DocumentInput;
