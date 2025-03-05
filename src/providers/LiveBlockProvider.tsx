"use client";

import { ReactNode } from "react";
import {
	LiveblocksProvider,
	RoomProvider,
	ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ children }: { children: ReactNode }) {
	return (
		<LiveblocksProvider
			publicApiKey={
				"pk_dev_7QJcKrx_2s7YCkeVAM5OXHZ3H1JoPBXhTc8bjzgI9BGRQp7wP8GH7UnY7_u6r8qT"
			}
		>
			<RoomProvider id="my-room">
				<ClientSideSuspense fallback={<div>Loading…</div>}>
					{children}
				</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
