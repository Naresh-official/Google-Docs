"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
	LiveblocksProvider,
	RoomProvider,
	ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import FullScreenLoader from "@/components/FullScreenLoader";
import { getUsers } from "@/app/documents/[documentId]/actions";

type User = { id: string; name: string; avatar: string };

export function Room({ children }: { children: ReactNode }) {
	const params = useParams();
	const [users, setUsers] = useState<User[]>([]);

	const fetchUsers = useMemo(
		() => async () => {
			try {
				const list = await getUsers();
				setUsers(list);
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.error(error.message);
				} else {
					console.error(error);
				}
			}
		},
		[]
	);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return (
		<LiveblocksProvider
			throttle={16}
			authEndpoint="/api/liveblocks-auth"
			resolveUsers={({ userIds }) => {
				return userIds.map(
					(userId) =>
						users.find((user) => user.id === userId) ?? undefined
				);
			}}
			resolveMentionSuggestions={({ text }) => {
				let filteredUsers = users;
				if (text) {
					filteredUsers = users.filter((user) =>
						user.name.toLowerCase().includes(text.toLowerCase())
					);
				}
				return filteredUsers.map((user) => user.id);
			}}
			resolveRoomsInfo={() => []}
		>
			<RoomProvider id={params.documentId as string}>
				<ClientSideSuspense
					fallback={<FullScreenLoader label="Room Loading..." />}
				>
					{children}
				</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
