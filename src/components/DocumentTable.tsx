import { Building, CircleUser, EllipsisVertical } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Image from "next/image";

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
				<TableCaption>Your Documents</TableCaption>
				<TableHeader className="w-full">
					<TableRow className="flex items-center justify-around w-full">
						<TableHead>Title</TableHead>
						<TableHead>Shared</TableHead>
						<TableHead>Created At</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{documents?.map((doc) => (
						<div
							key={doc._id}
							className="flex items-center justify-between"
						>
							<TableRow className="flex-1 flex justify-between items-center">
								<TableCell className="font-medium w-1/3 flex gap-3 items-center">
									<Image
										src="logo.svg"
										alt="Document"
										width={30}
										height={30}
									/>
									{doc.title}
								</TableCell>
								<TableCell className="w-1/3 justify-items-center">
									{doc?.organizationId ? (
										<Building />
									) : (
										<CircleUser />
									)}
								</TableCell>
								<TableCell className="w-1/3 justify-items-center">
									<p>
										{new Date(
											doc?._creationTime
										).toDateString()}
									</p>
								</TableCell>
							</TableRow>
							<div className="w-10">
								<EllipsisVertical />
							</div>
						</div>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default DocumentTable;
