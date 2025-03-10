"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// TipTap Extensions
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

import useEditorStore from "@/store/useEditorStore";
import {
	FloatingToolbar,
	useLiveblocksExtension,
} from "@liveblocks/react-tiptap";
import { Threads } from "./Threads";

interface EditorProps {
	content?: string;
}

function Editor({ content }: EditorProps) {
	const { setEditor } = useEditorStore();
	const liveblocks = useLiveblocksExtension({
		initialContent: content,
	});

	const editor = useEditor({
		immediatelyRender: false,
		onCreate: ({ editor }) => setEditor(editor), // set the editor on the store when it's created
		onDestroy: () => setEditor(null),
		onUpdate: ({ editor }) => setEditor(editor),
		onSelectionUpdate: ({ editor }) => setEditor(editor),
		onTransaction: ({ editor }) => setEditor(editor),
		onFocus: ({ editor }) => setEditor(editor),
		onBlur: ({ editor }) => setEditor(editor),
		onContentError: ({ editor }) => setEditor(editor),
		extensions: [
			StarterKit.configure({
				history: false,
			}),
			TaskItem.configure({
				nested: true,
			}),
			TaskList,
			Table.configure({
				resizable: true,
			}),
			TableRow,
			TableHeader,
			TableCell,
			Image,
			ImageResize,
			Underline,
			FontFamily,
			TextStyle,
			Heading.configure({
				levels: [1, 2, 3],
			}),
			Highlight.configure({ multicolor: true }),
			Color,
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: "https://",
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			BulletList,
			OrderedList,
			// Liveblocks extension
			liveblocks,
		],
		content: content || "",
		editorProps: {
			attributes: {
				style: "padding-left:56px; padding-right:56px;",
				class: "focus:outline-none print:border-0 bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
			},
		},
	});
	return (
		<div className="size-full overflow-x-auto px-4 print:p-0 print:bg-white print:overflow-visible">
			<div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
				<EditorContent editor={editor} />
				<Threads editor={editor} />
				<FloatingToolbar editor={editor} />
			</div>
		</div>
	);
}

export default Editor;
