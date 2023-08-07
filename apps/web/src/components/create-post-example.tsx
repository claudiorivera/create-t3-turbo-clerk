"use client";

import { z } from "zod";

import { api } from "~/utils/api";
import { Form, SubmitButton, useZodForm } from "~/components/form";

const validationSchema = z.object({
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
			content: "",
		},
	});

	return (
		<>
			<Form
				form={form}
				handleSubmit={async (values) => {
					await mutation.mutateAsync(values);
					form.reset();
				}}
				className="space-y-2"
			>
				<label className="flex flex-col">
					Content
					<textarea {...form.register("content")} className="border" />
					{form.formState.errors.content?.message && (
						<p className="text-red-700">
							{form.formState.errors.content?.message}
						</p>
					)}
				</label>
			</Form>
			<SubmitButton
				form={form} // If you place the submit button outside of the form, you need to specify the form to submit
			>
				Add post
			</SubmitButton>
		</>
	);
}
