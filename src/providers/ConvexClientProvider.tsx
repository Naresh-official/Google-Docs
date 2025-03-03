"use client";

import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
	ConvexReactClient,
	Authenticated,
	Unauthenticated,
	AuthLoading,
} from "convex/react";
import { ClerkProvider, useAuth, SignIn } from "@clerk/clerk-react";
import FullScreenLoader from "@/components/FullScreenLoader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<Authenticated>{children}</Authenticated>
				<Unauthenticated>
					<div className="flex justify-center items-center min-h-screen">
						<SignIn />
					</div>
				</Unauthenticated>
				<AuthLoading>
					<FullScreenLoader label="Loading Authentication..." />
				</AuthLoading>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
