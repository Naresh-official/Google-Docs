"use client";

import {
	BoldIcon,
	ItalicIcon,
	List,
	ListOrdered,
	ListTodoIcon,
	LucideIcon,
	MessageSquarePlusIcon,
	PrinterIcon,
	Redo2Icon,
	RemoveFormattingIcon,
	UnderlineIcon,
	Undo2Icon,
} from "lucide-react";
import ToolbarButton from "./ToolbarButton";
import useEditorStore from "@/store/useEditorStore";
import { Separator } from "../ui/separator";
import FontFamilyButton from "./FontFamilyButton";
import HeadingButton from "./HeadingButton";
import TextColorButton from "./TextColorButton";
import TextHighlightButton from "./TextHighlightButton";
import LinkButton from "./LinkButton";
import ImageButton from "./ImageButton";
import TextAlignButton from "./TextAlignButton";
import { printEditorContent } from "@/lib/printEditorContent";

function Toolbar() {
	const { editor } = useEditorStore();
	const sections: {
		label: string;
		icon: LucideIcon;
		onClick: () => void;
		isActive?: boolean;
	}[][] = [
		[
			{
				label: "Undo",
				icon: Undo2Icon,
				onClick: () => editor?.chain().focus().undo().run(),
			},
			{
				label: "Redo",
				icon: Redo2Icon,
				onClick: () => editor?.chain().focus().redo().run(),
			},
			{
				label: "Print",
				icon: PrinterIcon,
				onClick: () => printEditorContent(editor),
			},
		],
		[
			{
				label: "Bold",
				icon: BoldIcon,
				onClick: () => editor?.chain().focus().toggleBold().run(),
				isActive: editor?.isActive("bold"),
			},
			{
				label: "Italic",
				icon: ItalicIcon,
				onClick: () => editor?.chain().focus().toggleItalic().run(),
				isActive: editor?.isActive("italic"),
			},
			{
				label: "Underline",
				icon: UnderlineIcon,
				onClick: () => editor?.chain().focus().toggleUnderline().run(),
				isActive: editor?.isActive("underline"),
			},
		],
		[
			{
				label: "Comment",
				icon: MessageSquarePlusIcon,
				onClick: () => editor?.chain().addPendingComment().run(),
				isActive: editor?.isActive("liveblocksCommentMark"),
			},
			{
				label: "List Todo",
				icon: ListTodoIcon,
				onClick: () => editor?.chain().focus().toggleTaskList().run(),
				isActive: editor?.isActive("taskList"),
			},
			{
				label: "Remove Format",
				icon: RemoveFormattingIcon,
				onClick: () => editor?.chain().focus().unsetAllMarks().run(),
			},
		],
		[
			{
				label: "Bullet List",
				icon: List,
				onClick: () => editor?.chain().focus().toggleBulletList().run(),
				isActive: editor?.isActive("bulletList"),
			},
			{
				label: "Numbered List",
				icon: ListOrdered,
				onClick: () =>
					editor?.chain().focus().toggleOrderedList().run(),
				isActive: editor?.isActive("orderedList"),
			},
		],
	];
	return (
		<div className="bg-gray-300 px-4 py-2 rounded-full m-2 min-h-[40px] flex items-center gap-x-1 overflow-x-auto">
			{/* Undo , Redo , Print */}
			{sections?.[0].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			<Separator orientation="vertical" className="bg-primary mx-1 h-5" />
			{/* Text Styles */}
			<HeadingButton />
			<Separator orientation="vertical" className="bg-primary mx-1 h-5" />
			{/* Font Family */}
			<FontFamilyButton />
			<Separator orientation="vertical" className="bg-primary mx-1 h-5" />
			{/* Bold , Italic , Underline */}
			{sections?.[1].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			<Separator orientation="vertical" className="bg-primary mx-1 h-5" />
			{/* Text Color , Highlight */}
			<TextColorButton />
			<TextHighlightButton />
			<Separator orientation="vertical" className="bg-primary mx-1 h-5" />
			{/* Comment , Task , Clear Formating */}
			{sections?.[2].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			<Separator orientation="vertical" className="bg-primary mx-1 h-5" />
			{/* Link , Image Link */}
			<LinkButton />
			<ImageButton />
			<Separator orientation="vertical" className="bg-primary mx-1 h-5" />
			{/* Alignment */}
			<TextAlignButton />
			{sections?.[3].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			<Separator orientation="vertical" className="bg-primary mx-1 h-5" />
		</div>
	);
}

export default Toolbar;
