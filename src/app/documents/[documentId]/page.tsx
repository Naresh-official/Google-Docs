import { auth } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { Id } from "../../../../convex/_generated/dataModel";
import Document from "./Document";

interface DocumentIdPageProps {
	params: Promise<{ documentId: string }>;
}

async function DocumentIdPage({ params }: DocumentIdPageProps) {
	const { documentId } = await params;
	const { getToken } = await auth();
	const token = (await getToken({ template: "convex" })) ?? undefined;
	if (!token) {
		throw new Error("Unauthorized");
	}
	const preloadedDocument = await preloadQuery(
		api.documents.getById,
		{
			_id: documentId as Id<"documents">,
		},
		{ token }
	);
	return <Document preloadedDocument={preloadedDocument} />;
}

export default DocumentIdPage;
