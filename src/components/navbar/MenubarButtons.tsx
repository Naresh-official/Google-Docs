"use client";

import {
	Braces,
	FileCode,
	FilePlus,
	FileText,
	FileType,
	Printer,
	Redo2Icon,
	RemoveFormatting,
	Save,
	Table,
	TextCursorInput,
	Trash2,
	Undo2Icon,
} from "lucide-react";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/components/ui/menubar";
import useEditorStore from "@/store/useEditorStore";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { printEditorContent } from "@/lib/printEditorContent";

interface MenubarButtonsProps {
	inputRef: React.RefObject<HTMLInputElement>;
	documentId: string;
	title: string;
}

function MenubarButtons({ inputRef, documentId, title }: MenubarButtonsProps) {
	const { editor } = useEditorStore();
	const router = useRouter();

	const deleteDocumentById = useMutation(api.documents.deleteDocumentById);
	const create = useMutation(api.documents.create);

	const handleDelete = () => {
		deleteDocumentById({ _id: documentId as Id<"documents"> }).then(() =>
			router.push("/")
		);
	};

	const handleNewDocument = () => {
		create({ title: "Blank Document", initialContent: "" }).then(
			(documentId) => {
				router.push(`/documents/${documentId}`);
			}
		);
	};

	const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
		editor
			?.chain()
			.focus()
			.insertTable({
				rows,
				cols,
				withHeaderRow: false,
			})
			.run();
	};

	const onDownload = (blob: Blob, filename: string) => {
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		a.click();
	};

	const onSaveJson = () => {
		if (!editor) return;
		const content = editor.getJSON();
		const blob = new Blob([JSON.stringify(content)], {
			type: "application/json",
		});
		onDownload(blob, `${title}.json`);
	};

	const onSaveHtml = () => {
		if (!editor) return;
		const content = editor.getHTML();
		const blob = new Blob([content], {
			type: "text/html",
		});
		onDownload(blob, `${title}.html`);
	};

	const onSaveText = () => {
		if (!editor) return;
		const content = editor.getText();
		const blob = new Blob([content], {
			type: "text/plain",
		});
		onDownload(blob, `${title}.txt`);
	};

	return (
		<div className="text-sm">
			<Menubar className="ring-0 border-0 ring-offset-0 shadow-none p-0 m-0">
				<MenubarMenu>
					<MenubarTrigger className="text-sm p-1">
						File
					</MenubarTrigger>
					<MenubarContent>
						<MenubarSub>
							<MenubarSubTrigger>
								<Save className="w-5 h-5 mr-2" />
								Save
							</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarItem onClick={onSaveJson}>
									<Braces className="w-5 h-5 mr-2" />
									JSON
								</MenubarItem>
								<MenubarItem onClick={onSaveHtml}>
									<FileCode className="w-5 h-5 mr-2" />
									HTML
								</MenubarItem>
								<MenubarItem
									onClick={() => printEditorContent(editor)}
								>
									<FileText className="w-5 h-5 mr-2" />
									PDF
								</MenubarItem>
								<MenubarItem onClick={onSaveText}>
									<FileType className="w-5 h-5 mr-2" />
									Text
								</MenubarItem>
							</MenubarSubContent>
						</MenubarSub>
						<MenubarItem onClick={handleNewDocument}>
							<FilePlus className="w-5 h-5 mr-2" />
							New Document
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={() => inputRef.current?.click()}>
							<TextCursorInput className="w-5 h-5 mr-2" />
							Rename
						</MenubarItem>
						<MenubarItem onClick={handleDelete}>
							<Trash2 className="w-5 h-5 mr-2" />
							Remove
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={() => printEditorContent(editor)}>
							<Printer className="w-5 h-5 mr-2" />
							Print
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Edit</MenubarTrigger>
					<MenubarContent>
						<MenubarItem
							onClick={() => editor?.chain().focus().undo().run()}
						>
							<Undo2Icon className="w-5 h-5 mr-2" />
							Undo
						</MenubarItem>
						<MenubarItem
							onClick={() => editor?.chain().focus().redo().run()}
						>
							<Redo2Icon className="w-5 h-5 mr-2" />
							Redo
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Insert</MenubarTrigger>
					<MenubarContent>
						<MenubarSub>
							<MenubarSubTrigger>
								<Table className="w-5 h-5 mr-2" />
								Table
							</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarItem
									onClick={() =>
										insertTable({ rows: 2, cols: 2 })
									}
								>
									2x2
								</MenubarItem>
								<MenubarItem
									onClick={() =>
										insertTable({ rows: 3, cols: 3 })
									}
								>
									3x3
								</MenubarItem>
								<MenubarItem
									onClick={() =>
										insertTable({ rows: 4, cols: 4 })
									}
								>
									4x4
								</MenubarItem>
								<MenubarItem
									onClick={() =>
										insertTable({ rows: 5, cols: 5 })
									}
								>
									5x5
								</MenubarItem>
							</MenubarSubContent>
						</MenubarSub>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Format</MenubarTrigger>
					<MenubarContent>
						<MenubarItem
							onClick={() =>
								editor
									?.chain()
									.focus()
									.selectAll()
									.unsetAllMarks()
									.blur()
									.run()
							}
						>
							<RemoveFormatting className="w-5 h-5 mr-2" />
							Clear Formating
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	);
}

export default MenubarButtons;
