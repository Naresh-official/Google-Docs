"use client";

import { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import {
	Building,
	CircleUser,
	EllipsisVertical,
	ExternalLink,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import RenameButton from "./RenameButton";
import DeleteButton from "./DeleteButton";
import { Id } from "../../../convex/_generated/dataModel";

export default function DocumentRow({
	doc,
}: {
	doc: {
		_id: Id<"documents">;
		_creationTime: number;
		organizationId?: string;
		title: string;
	};
}) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<TableRow>
			<TableCell className="font-medium flex gap-3 items-center">
				<Image src="logo.svg" alt="Document" width={30} height={30} />
				<Link href={`/documents/${doc._id}`}>{doc.title}</Link>
			</TableCell>
			<TableCell className="text-center">
				{doc.organizationId ? (
					<div className="flex items-center gap-2">
						<Building />
						Organisation
					</div>
				) : (
					<div className="flex items-center gap-2">
						<CircleUser />
						Personal
					</div>
				)}
			</TableCell>
			<TableCell className="text-center">
				{new Date(doc._creationTime).toDateString()}
			</TableCell>
			<TableCell className="text-center">
				<DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
					<DropdownMenuTrigger asChild>
						<EllipsisVertical className="hover:bg-gray-200 duration-200 transition-colors w-8 h-8 rounded-full p-1" />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<RenameButton
							title={doc.title}
							documentId={doc._id}
							closeMenu={() => setMenuOpen(false)}
						/>
						<DropdownMenuItem
							onClick={() =>
								window.open(`/documents/${doc._id}`, "_blank")
							}
							className="px-2 py-1.5 w-full flex items-center gap-2 text-start rounded-sm hover:bg-accent"
						>
							<ExternalLink className="w-5 h-5" />
							Open in new tab
						</DropdownMenuItem>
						<DeleteButton documentId={doc._id} />
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
}
