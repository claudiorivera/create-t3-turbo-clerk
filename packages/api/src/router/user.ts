import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
	all: protectedProcedure.query(({ ctx }) => {
		return ctx.clerk.users.getUserList();
	}),
	byId: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
		return ctx.clerk.users.getUser(input);
	}),
});
