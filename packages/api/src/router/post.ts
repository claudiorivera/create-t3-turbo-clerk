import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
	all: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.post.findMany({ orderBy: { id: "desc" } });
	}),
	byId: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.post.findFirst({ where: { id: input.id } });
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
