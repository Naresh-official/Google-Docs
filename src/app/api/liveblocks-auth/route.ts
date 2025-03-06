import { auth, currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { Liveblocks } from "@liveblocks/node";
import { LiveblocksError } from "@liveblocks/client";

const convex = new ConvexHttpClient(
	process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const liveblocks = new Liveblocks({
	secret: process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY as string,
});

export async function POST(req: Request) {
	try {
		const { sessionClaims, getToken } = await auth();
		if (!sessionClaims) {
			return new Response("Unauthorized", { status: 401 });
		}
		const user = await currentUser();
		if (!user) {
			return new Response("Unauthorized", { status: 401 });
		}
		const { room } = await req.json();
		const token = await getToken();
		if (!token) {
			return new Response("Unauthorized - No token", { status: 401 });
		}
		const document = await convex.query(api.documents.getById, {
			_id: room,
		});
		const isOwner = document.ownerId === user.id;
		const isOrganizationMember =
			document.organizationId &&
			document.organizationId === sessionClaims.org_id;

		if (!isOwner && !isOrganizationMember) {
			return new Response("Unauthorized", { status: 401 });
		}

		const session = liveblocks.prepareSession(user.id, {
			userInfo: {
				name:
					user.fullName ??
					user.primaryEmailAddress?.emailAddress ??
					"Anonymous",
				avatar: user.imageUrl,
			},
		});
		session.allow(room, session.FULL_ACCESS);
		const { body, status } = await session.authorize();
		return new Response(body, { status });
	} catch (error: unknown) {
		if (error instanceof LiveblocksError) {
			return new Response(`Error in LiveBlock : ${error.message}`, {
				status: 400,
			});
		}
		if (error instanceof Error) {
			return new Response(`Error : ${error.message}`, { status: 500 });
		}
		return new Response("Internal Server Error", { status: 500 });
	}
}
