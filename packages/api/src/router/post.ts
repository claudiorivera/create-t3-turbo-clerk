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
	delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
		return ctx.prisma.post.delete({ where: { id: input } });
	}),
	create: protectedProcedure
		.input(
			z.object({
				content: z.string(),
			}),
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.post.create({
				data: {
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
