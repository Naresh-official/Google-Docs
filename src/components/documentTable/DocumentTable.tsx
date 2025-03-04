import { Id } from "../../../convex/_generated/dataModel";
import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import DocumentRow from "./DocumentRow";

interface DocumentTableProps {
	documents: {
		_id: Id<"documents">;
		_creationTime: number;
		initialContent?: string | undefined;
		roomId?: string | undefined;
		organizationId?: string | undefined;
		title: string;
		ownerId: string;
	}[];
}

function DocumentTable({ documents }: DocumentTableProps) {
	return (
		<div className="w-full max-w-5xl mx-auto p-4">
			<Table className="w-full my-4">
				<TableCaption>
					{documents.length ? (
						<p>Your Documents</p>
					) : (
						<p>No documents found</p>
					)}
				</TableCaption>
				<TableHeader className="w-full">
					<TableRow className="">
						<TableHead className="pl-20">Title</TableHead>
						<TableHead>Shared</TableHead>
						<TableHead className="text-center">
							Created At
						</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{documents?.map((doc) => (
						<DocumentRow key={doc._id} doc={doc} />
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default DocumentTable;
