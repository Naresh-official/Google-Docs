import Editor from "@/components/Editor";
<<<<<<< HEAD
import Toolbar from "@/components/toolbar/Toolbar";
=======
import { Button } from "@/components/ui/button";
>>>>>>> 2050b34 (add(editor) : add tiptap editors and extenstions; update custom css for tiptap components)

interface DocumentIdPageProps {
	params: Promise<{ documentId: string }>;
}

async function DocumentIdPage({ params }: DocumentIdPageProps) {
	const { documentId } = await params;
	return (
<<<<<<< HEAD
		<div className="min-h-screen">
			<Toolbar />
=======
		<div>
>>>>>>> 2050b34 (add(editor) : add tiptap editors and extenstions; update custom css for tiptap components)
			<Editor />
		</div>
	);
}

export default DocumentIdPage;
