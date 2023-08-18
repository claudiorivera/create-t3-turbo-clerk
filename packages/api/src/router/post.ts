import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
	all: publicProcedure.query(async ({ ctx }) => {
		const posts = await ctx.prisma.post.findMany({ orderBy: { id: "desc" } });

		const postsWithClerkUsers = await Promise.all(
			posts.map(async (post) => {
				const clerkUser = await ctx.clerk.users.getUser(post.userId);

				return {
					...post,
					user: {
						...clerkUser,
					},
				};
			}),
		);

		return postsWithClerkUsers;
	}),
	mine: protectedProcedure.query(async ({ ctx }) => {
		const posts = await ctx.prisma.post.findMany({
			where: {
				userId: ctx.auth.userId,
			},
			orderBy: { id: "desc" },
		});

		const user = await ctx.clerk.users.getUser(ctx.auth.userId);

		return posts.map((post) => ({
			...post,
			user: {
				...user,
			},
		}));
	}),
	byId: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const post = await ctx.prisma.post.findFirst({ where: { id: input.id } });

			if (!post)
				throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });

			const clerkUser = await ctx.clerk.users.getUser(post.userId);

			return {
				...post,
				user: {
					...clerkUser,
				},
			};
		}),
	delete: protectedProcedure
		.input(z.string())
		.mutation(async ({ ctx, input }) => {
			const post = await ctx.prisma.post.findFirst({
				where: { id: input },
				select: { userId: true },
			});

			if (!post)
				throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });

			const isAuthorizedToDelete =
				ctx.auth.userId === post.userId || ctx.auth.orgRole === "admin";

			if (!isAuthorizedToDelete)
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You are not authorized to delete this post",
				});

			return ctx.prisma.post.delete({ where: { id: input } });
		}),
	create: protectedProcedure
		.input(
			z.object({
				title: z.string().min(1, "Title must be at least 1 character"),
				content: z.string().min(1, "Content must be at least 1 character"),
			}),
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.post.create({
				data: {
					title: input.title,
					content: input.content,
					user: {
						connectOrCreate: {
							where: { id: ctx.auth.userId },
							create: {
								id: ctx.auth.userId,
							},
						},
					},
				},
			});
		}),
});
