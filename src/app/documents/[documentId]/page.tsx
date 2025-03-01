import Editor from "@/components/toolbar/Editor";
import Toolbar from "@/components/toolbar/Toolbar";

interface DocumentIdPageProps {
	params: Promise<{ documentId: string }>;
}

async function DocumentIdPage({ params }: DocumentIdPageProps) {
	const { documentId } = await params;
	return (
		<div className="min-h-screen">
			<Toolbar />
			<Editor />
		</div>
	);
}

export default DocumentIdPage;
