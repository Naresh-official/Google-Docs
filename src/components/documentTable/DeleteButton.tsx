import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

function DeleteButton({ documentId }: { documentId: Id<"documents"> }) {
	const deleteDocumentById = useMutation(api.documents.deleteDocumentById);

	const handleDelete = (documentId: Id<"documents">) => {
		deleteDocumentById({ _id: documentId });
	};
	return (
		<DropdownMenuItem asChild>
			<AlertDialog>
				<AlertDialogTrigger className="px-2 py-1.5 w-full flex items-center gap-2 text-start rounded-sm text-red-600 hover:bg-red-100">
					<Trash2 className="w-5 h-5" />
					Delete
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you absolutely sure?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently
							delete your Document and remove your data from our
							servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							className={cn(
								"bg-red-600",
								buttonVariants({
									variant: "destructive",
								})
							)}
							onClick={() => handleDelete(documentId)}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</DropdownMenuItem>
	);
}

export default DeleteButton;
