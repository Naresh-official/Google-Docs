"use client";
import {
	ClientSideSuspense,
	useOthers,
	useSelf,
} from "@liveblocks/react/suspense";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

function AvatarStack() {
	const users = useOthers();
	const currentUser = useSelf();

	if (users.length === 0) return null;

	return (
		<>
			<div className="flex flex-row-reverse items-center">
				{currentUser && (
					<Avatar className="z-10">
						<AvatarImage src={currentUser.info.avatar} />
						<AvatarFallback className="uppercase">
							{currentUser.info.name[0]}
						</AvatarFallback>
					</Avatar>
				)}
				<div className="flex relative -mr-2">
					{users.map(({ connectionId, info }) => (
						<Avatar key={connectionId}>
							<AvatarImage src={info.avatar} />
							<AvatarFallback className="uppercase">
								{info.name[0]}
							</AvatarFallback>
						</Avatar>
					))}
				</div>
			</div>
			<Separator
				orientation="vertical"
				className="h-10 w-0.5 bg-primary rounded-full"
			/>
		</>
	);
}

function UserAvatars() {
	return (
		<ClientSideSuspense fallback={null}>
			<AvatarStack />
		</ClientSideSuspense>
	);
}

export default UserAvatars;
