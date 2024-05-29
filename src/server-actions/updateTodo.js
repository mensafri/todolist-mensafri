"use server";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export default async function updateTodo(formData) {
	const id = formData.get("id");
	const title = formData.get("title");
	const description = formData.get("description");
	const is_completed = formData.get("is_completed");

	const { error } = await supabase
		.from("todos")
		.update({ title, description, is_completed })
		.eq("id", id);
	if (error) {
		console.error("Error updating todo:", error);
		return;
	}
	revalidatePath("/");

	return { message: "Success" };
}
