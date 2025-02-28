import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";

interface DocumentIdPageProps {
	params: Promise<{ documentId: string }>;
}

async function DocumentIdPage({ params }: DocumentIdPageProps) {
	const { documentId } = await params;
	return (
		<div>
			<Editor />
		</div>
	);
}

export default DocumentIdPage;
