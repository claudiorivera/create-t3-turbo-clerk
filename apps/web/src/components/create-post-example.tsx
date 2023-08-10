"use client";

import { z } from "zod";

import { api } from "~/utils/api";
import { Form, SubmitButton, useZodForm } from "~/components/form";

const validationSchema = z.object({
	title: z.string().min(1).max(100),
	content: z.string().min(1).max(280),
});

export function CreatePostExample() {
	const utils = api.useContext().post;

	const mutation = api.post.create.useMutation({
		onSuccess: async () => {
			await utils.all.invalidate();
		},
	});

	const form = useZodForm({
		schema: validationSchema,
		defaultValues: {
			title: "",
			content: "",
		},
	});

	return (
		<div className="mt-auto">
			<Form
				form={form}
				handleSubmit={async (values) => {
					await mutation.mutateAsync(values);
					form.reset();
				}}
				className="flex flex-col gap-4"
			>
				<label className="flex flex-col">
					<div>Title</div>
					<input
						type="text"
						{...form.register("title")}
						className="rounded border border-gray-500 p-2"
						placeholder="Title"
					/>
					{form.formState.errors.title?.message && (
						<p className="text-red-700">
							{form.formState.errors.title?.message}
						</p>
					)}
				</label>
				<label className="flex flex-col">
					<div>Content</div>
					<textarea
						{...form.register("content")}
						className="rounded border border-gray-500 p-2"
					/>
					{form.formState.errors.content?.message && (
						<p className="text-red-700">
							{form.formState.errors.content?.message}
						</p>
					)}
				</label>
				<SubmitButton>
					<button className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
						Submit
					</button>
				</SubmitButton>
			</Form>
		</div>
	);
}
