import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
	args: {
		title: v.optional(v.string()),
		initialContent: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			throw new Error("Unauthorized");
		}
		const organizationId = user?.organisation_id ?? undefined;
		// returns the id of the newly created document
		return await ctx.db.insert("documents", {
			title: args.title || "Untitled Document",
			initialContent: args.initialContent,
			ownerId: user.subject,
			organizationId: (organizationId as string) || undefined,
		});
	},
});

// TODO Add a search query to search for documents by title

export const deleteDocumentById = mutation({
	args: {
		_id: v.id("documents"),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			throw new Error("Unauthorized");
		}
		const document = await ctx.db.get(args._id);
		if (document?.ownerId !== user.subject) {
			throw new Error("Unauthorized");
		}
		return await ctx.db.delete(args._id);
	},
});

export const rename = mutation({
	args: {
		_id: v.id("documents"),
		title: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			throw new Error("Unauthorized");
		}
		const document = await ctx.db.get(args._id);
		const isOwner = document?.ownerId === user.subject;
		const isOrganizationMember =
			document?.organizationId &&
			document?.organizationId === user.organisation_id;
		if (!isOwner && !isOrganizationMember) {
			throw new Error("Unauthorized");
		}
		return await ctx.db.patch(args._id, {
			title: args.title,
		});
	},
});

export const get = query({
	handler: async (ctx) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			throw new Error("Unauthorized");
		}
		const organizationId = user?.organisation_id ?? undefined;
		if (organizationId) {
			return await ctx.db
				.query("documents")
				.withIndex("organizationId", (q) =>
					q.eq("organizationId", organizationId as string)
				)
				.order("desc")
				.collect();
		}
		return await ctx.db
			.query("documents")
			.withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
			.order("desc")
			.collect();
	},
});

export const getById = query({
	args: {
		_id: v.id("documents"),
	},
	handler: async (ctx, args) => {
		const document = await ctx.db.get(args._id);
		if (!document) {
			throw new Error("Document not found");
		}
		return document;
	},
});
