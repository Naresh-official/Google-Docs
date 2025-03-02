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
		// returns the id of the newly created document
		return await ctx.db.insert("documents", {
			title: args.title || "Untitled Document",
			initialContent: args.initialContent,
			ownerId: user.subject,
		});
	},
});

export const get = query({
	handler: async (ctx) => {
		return await ctx.db.query("documents").collect();
	},
});
