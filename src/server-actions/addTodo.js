"use server";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export default async function addTodo(formData) {
	const title = formData.get("title");
	const description = formData.get("description");

	const { error } = await supabase.from("todos").insert({
		title,
		description,
	});

	if (error) {
		console.error("Error adding todo:", error);
		return null;
	}

	revalidatePath("/");

	return { message: "Success" };
}
