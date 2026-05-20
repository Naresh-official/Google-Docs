# Google Docs Clone

A real-time, collaborative document editing platform inspired by Google Docs. This project leverages modern web technologies to provide seamless real-time collaboration, document management, and rich text editing.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (React 19)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database & Backend:** [Convex](https://www.convex.dev/)
- **Real-time Collaboration:** [Liveblocks](https://liveblocks.io/) (with Yjs)
- **Rich Text Editor:** [Tiptap](https://tiptap.dev/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)

## 📂 Project Structure & Routes

### Main Routes
- **`/` (Home):** The dashboard where users can view their recent documents, search for documents, and create new ones from blank or templates.
- **`/documents/[documentId]`:** The core document editor page where the real-time collaborative editing takes place.

### API Routes
- **`/api/liveblocks-auth`:** Authenticates users connecting to Liveblocks rooms, ensuring that only authorized users can join and edit a specific document.

## 🛠 Important Libraries

- **`@clerk/nextjs`**: Handles user authentication, registration, and session management.
- **`convex`**: A serverless backend and database providing real-time data syncing for document metadata (titles, owners, organization IDs).
- **`@liveblocks/react`, `@liveblocks/node`**: Powers multiplayer features including live cursors, presence, real-time syncing of the document content, and commenting/threads.
- **`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-collaboration`**: The headless rich-text editor framework integrated with Liveblocks (via Yjs) for conflict-free collaborative editing.
- **`zustand`**: Lightweight state management for handling global UI states.
- **`lucide-react`**: Beautiful and consistent iconography.

## 🔗 Third-Party Services

1. **Clerk:** Used for managing user identities. The application uses Clerk to authenticate users before they can access their dashboard or any documents.
2. **Convex:** Used as the primary database to store document metadata. When a document is created, its initial state, title, and ownership details are stored in Convex.
3. **Liveblocks:** Manages the WebSocket connections for real-time collaboration. The actual content of the document being actively edited is synced through Liveblocks rooms.

## 🎨 UI Components

The UI is built using **Tailwind CSS** for utility-first styling and **Radix UI** for accessible, unstyled component primitives. Key components include:

- **`Editor` (`src/components/Editor.tsx`):** The core Tiptap editor instance configured with necessary extensions (formatting, tables, tasks, collaboration).
- **`HomeNavbar` & `DocumentNavbar`:** Navigation bars for the dashboard and document editing views respectively.
- **`Toolbar` (`src/components/toolbar`):** The rich-text formatting toolbar (bold, italic, alignment, font selection, colors) that interacts with the Tiptap editor.
- **`TemplateCarousel` (`src/components/TemplateCarousel.tsx`):** A carousel component for selecting document templates on the home page.
- **`Threads` (`src/components/Threads.tsx`):** Liveblocks-powered inline commenting and threading system within the document.
- **`ui` (`src/components/ui`):** Reusable, atomic UI components (Buttons, Dialogs, Dropdowns, Inputs) built with Radix UI and Tailwind.

## 🔄 Application Flow & Working

1. **Authentication:** A user accesses the application and is prompted to log in via Clerk.
2. **Dashboard:** Once authenticated, the user lands on the Home (`/`) page. The app fetches the user's documents from **Convex**.
3. **Document Creation:** The user can create a new blank document or choose a template from the `TemplateCarousel`. This triggers a Convex mutation to create a new document record in the database.
4. **Entering the Editor:** The user is routed to `/documents/[documentId]`.
5. **Real-time Connection:**
   - The application calls the `/api/liveblocks-auth` endpoint to get a secure token.
   - A Liveblocks `RoomProvider` connects the user to a specific room matching the `documentId`.
6. **Collaborative Editing:**
   - The **Tiptap** editor initializes with the `@tiptap/extension-collaboration` extension.
   - Any keystrokes, formatting changes, or cursor movements are broadcasted via Liveblocks to all other users in the same room instantly.
7. **Commenting:** Users can highlight text and add comments using the Liveblocks Thread functionality, which is rendered using the `Threads` component.
8. **Persistence:** While active typing is synced via Liveblocks, the final document state and metadata are periodically synced back to Convex for long-term storage.

## 🚀 Getting Started

### Prerequisites

You need Node.js installed and accounts/API keys for Clerk, Convex, and Liveblocks.

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables. Create a `.env.local` file based on `.env.example`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   NEXT_PUBLIC_CONVEX_URL=...
   NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=...
   NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY=...
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.
