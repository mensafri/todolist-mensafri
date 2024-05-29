"use server";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export default async function deleteTodo(formData) {
	const id = formData.get("id");

	const { error } = supabase.from("todos").delete().match({ id });
	if (error) {
		console.error("Error deleting todo:", error);
		return;
	}
	revalidatePath("/");

	return { message: "Success" };
}
