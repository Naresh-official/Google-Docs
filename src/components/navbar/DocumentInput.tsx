"use client";
import { CloudUpload } from "lucide-react";
import { useState } from "react";

function DocumentInput() {
	const [value, setValue] = useState("Untitled Document");
	return (
		<div className="flex items-center gap-2 pt-2 text-muted-foreground">
			<input
				className="outline-none bg-transparent pl-1 w-40 hover:border-gray-300 border-2 rounded-md focus:border-gray-300 border-transparent border-dashed"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onClick={(e) => e.currentTarget.select()}
			/>
			<CloudUpload className="w-5 h-5" />
		</div>
	);
}

export default DocumentInput;
