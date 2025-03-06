import { Editor } from "@tiptap/react";

export const printEditorContent = (editor: Editor | null) => {
	if (!editor) return;

	const printWindow = window.open("", "_blank");
	if (!printWindow) return;

	const content = editor.getHTML();

	printWindow.document.write(`
		<html>
		<head>
			<title>Print Document</title>
			<style>
				@page {
					margin: 0; /* Remove default print margins */
				}
				body {
					margin: 0; /* Ensure no margins */
					font-family: Arial, sans-serif;
					padding: 56px;
				}
        mark {
          padding: 4px 4px;
          border-radius: 10px;
        }
          h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          line-height: 1.1;
          margin-top: 2.5rem;
          text-wrap: pretty;
        }

        h1,
        h2 {
          margin-bottom: 1.5rem;
        }

        h1 {
          font-size: 32px;
        }

        h2 {
          font-size: 24px;
        }

        h3 {
          font-size: 20px;
        }

        h4,
        h5,
        h6 {
          font-size: 18px;
        }
        ul,
        ol {
          padding: 0 1rem;
        }
        ul li {
          list-style-type: disc;
          p {
            margin-top: 0.25em;
            margin-bottom: 0.25em;
          }
        }
        ol li {
          list-style-type: decimal;
          p {
            margin-top: 0.25em;
            margin-bottom: 0.25em;
          }
        }
			</style>
		</head>
		<body>${content}</body>
		</html>
	`);

	printWindow.document.close();

	printWindow.onload = () => {
		printWindow.print();
		printWindow.close();
	};
};
