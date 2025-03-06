"use client";

import Editor from "@/components/Editor";
import Navbar from "@/components/navbar/Navbar";
import Toolbar from "@/components/toolbar/Toolbar";
import { Room } from "@/providers/LiveBlockProvider";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface DocumentProps {
	preloadedDocument: Preloaded<typeof api.documents.getById>;
}

function Document({ preloadedDocument }: DocumentProps) {
	const document = usePreloadedQuery(preloadedDocument);
	return (
		<Room>
			<div className="min-h-screen">
				<Navbar data={document} />
				<Toolbar />
				<Editor content={document.initialContent} />
			</div>
		</Room>
	);
}

export default Document;
