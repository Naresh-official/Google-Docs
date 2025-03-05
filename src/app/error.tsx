"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";

function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center space-y-6">
			<div className="p-4 flex items-center justify-center bg-rose-100 rounded-full">
				<AlertTriangleIcon size={64} className="text-red-600" />
			</div>
			<h1 className="text-2xl font-medium text-rose-600">
				Oops Something Went Wrong
			</h1>
			<p>{error?.message}</p>
			<div className="space-x-4">
				<Button onClick={reset}>Try Again</Button>
				<Button variant="outline">
					<Link href="/">Go Back</Link>
				</Button>
			</div>
		</div>
	);
}

export default ErrorPage;
