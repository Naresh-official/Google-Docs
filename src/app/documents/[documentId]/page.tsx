import Editor from "@/components/Editor";
import Navbar from "@/components/navbar/Navbar";
import Toolbar from "@/components/toolbar/Toolbar";
import { Room } from "@/providers/LiveBlockProvider";

async function DocumentIdPage() {
	return (
		<Room>
			<div className="min-h-screen">
				<Navbar />
				<Toolbar />
				<Editor />
			</div>
		</Room>
	);
}

export default DocumentIdPage;
