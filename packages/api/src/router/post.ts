import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

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
	create: publicProcedure
		.input(
			z.object({
				content: z.string(),
				userId: z.string().nullish(),
			}),
		)
		.mutation(({ ctx, input }) => {
			if (!input.userId)
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "userId is required",
				});

			return ctx.prisma.post.create({
				data: {
					content: input.content,
					user: {
						connectOrCreate: {
							where: { id: input.userId },
							create: {
								id: input.userId,
							},
						},
					},
				},
			});
		}),
});
