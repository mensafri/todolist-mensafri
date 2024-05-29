"use server";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export default async function deleteTodo(formData) {
	const id = formData.get("id");

	// Menggunakan await untuk menunggu hasil operasi delete()
	const { error } = await supabase
		.from("todos")
		.delete()
		.eq("id", id.toString());

	if (error) {
		console.error("Error deleting todo:", error.message); // Perbaiki pemanggilan error.message
		return { error: "Error deleting todo" }; // Mengembalikan pesan error jika terjadi kesalahan
	}

	revalidatePath("/");

	return { message: "Success" };
}
