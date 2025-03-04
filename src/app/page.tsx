"use client";

import HomeNavbar from "@/components/HomeNavbar";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import FullScreenLoader from "@/components/FullScreenLoader";
import DocumentCarousel from "@/components/DocumentCarousel";
import DocumentTable from "@/components/documentTable/DocumentTable";

export default function Home() {
	const documents = useQuery(api.documents.get, {});
	if (!documents) return <FullScreenLoader label="Loading Documents..." />;

	return (
		<main className="min-h-screen">
			<HomeNavbar />
			<DocumentCarousel />
			<DocumentTable documents={documents} />
		</main>
	);
}
