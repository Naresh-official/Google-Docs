import Editor from "@/components/Editor";
import Navbar from "@/components/navbar/Navbar";
import Toolbar from "@/components/toolbar/Toolbar";
import { Room } from "@/providers/LiveBlockProvider";

interface DocumentIdPageProps {
	params: Promise<{ documentId: string }>;
}

async function DocumentIdPage({ params }: DocumentIdPageProps) {
	const { documentId } = await params;
	return (
		<div className="min-h-screen">
			<Room>
				<Navbar />
				<Toolbar />
				<Editor />
			</Room>
		</div>
	);
}

export default DocumentIdPage;
